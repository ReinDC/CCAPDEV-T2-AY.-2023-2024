const searchBtn = document.getElementById("searchBtn");
const searchbar = document.getElementById("searchbar");

searchbar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        getSearchData();
    }
});

searchBtn.addEventListener('click', (e) => {
    getSearchData();
});


function getSearchData(){
    const searchBar = document.getElementById("searchbar");

    if (searchbar.value.trim() === "") {
        showCustomAlert("Please enter a search term.")
        searchbar.focus();
        return true;
    }

    const searchTerm = getSelectedValue();

    const myObj = { 
        search: searchTerm,
        searchTerm: searchBar.value
    };
    const jString = JSON.stringify(myObj);

    fetch("/search", {
        method: 'POST',
        body: jString,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse JSON from response
    })
    .then(data => {
        const resultsContainer = document.querySelector('.results');
        const parentContainer = document.querySelector('.parent-container');
        let hasNotDeleted = false; 
        
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('transparent-text');

        parentContainer.style.display = 'flex';

        

        for(let i = 0; i < data.resturants.length; i++){
            const resturant = data.resturants[i];
            const resturantIMG = resturant.resturantIMG;
            const resturantName = resturant.resturantName;
            const address = resturant.address;
            const bestSellers = resturant.bestSellers;
            const ownerID = resturant.ownerID;
            const userID = data.userID;
            if(!resturant.deleted){
                hasNotDeleted = true;
                createRestaurantElement(resturantIMG, resturantName, address, bestSellers, ownerID, userID);
            } 
            // else {
            //     const searchbar = document.getElementById("searchbar");

            //     parentContainer.style.display = 'flex';
        
            //     resultsContainer.textContent = "No restaurants with '" + searchBar.value + "' found.";
            //     resultsContainer.classList.add('transparent-text');
            //     searchBar.value = '';
            // }
            if(!hasNotDeleted){
                resultsContainer.textContent = "No restaurants with '" + searchBar.value + "' found.";
                resultsContainer.classList.add('transparent-text');
                searchBar.value = '';
            }
        }
    })
    .catch(error => {
        const parentContainer = document.querySelector('.parent-container');
        const resultsContainer = document.querySelector('.results');
        const searchbar = document.getElementById("searchbar");

        parentContainer.style.display = 'flex';

        resultsContainer.textContent = "No restaurants with '" + searchBar.value + "' found.";
        resultsContainer.classList.add('transparent-text');
        searchBar.value = '';
    });
}



function createRestaurantElement(restaurantIMG, restaurantName, address, bestSellers, ownerID, userID) {
    const resultsContainer = document.querySelector('.results');

    const inputElement = document.createElement('input');

    const establishmentDiv = document.createElement('div');
    establishmentDiv.className = 'establishment';

    // Create the container div
    const establishmentContainerDiv = document.createElement('div');
    establishmentContainerDiv.className = 'establishment-container';

    // Create the restaurant image div
    const restoImageDiv = document.createElement('div');
    restoImageDiv.className = 'resto-image';

    const img = document.createElement('img');
    img.src = restaurantIMG;
    restoImageDiv.appendChild(img);

    // Create the text container div
    const textContainerDiv = document.createElement('div');
    textContainerDiv.className = 'text-container';

    // Create the restaurant name div
    const nameFontDiv = document.createElement('div');
    nameFontDiv.className = 'name-font';
    nameFontDiv.textContent = restaurantName;

    // Create the edit button
    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.textContent = 'Edit';
    if(ownerID != userID){
        editButton.setAttribute("hidden", "")
    }
    editButton.onclick = function sendData3() {
        const name = restaurantName;
        const encodedMessage = encodeURIComponent(name);
        window.location.href = 'edit-details?name=' + encodedMessage;
    };
    

    // Create the details container
    const detailsFontDiv = document.createElement('div');
    detailsFontDiv.className = 'details-font';

    const detailsAddressP = document.createElement('p');
    detailsAddressP.className = 'details-address';
    detailsAddressP.textContent = address;

    const detailsBestSellerDiv = document.createElement('div');
    detailsBestSellerDiv.className = 'details-bestseller';
    detailsBestSellerDiv.textContent = 'Best sellers';

    const ul = document.createElement('ul');
    bestSellers.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
    detailsBestSellerDiv.appendChild(ul);

    detailsFontDiv.appendChild(detailsAddressP);
    detailsFontDiv.appendChild(detailsBestSellerDiv);

    // Create the view reviews button
    const viewReviewsButton = document.createElement('button');
    viewReviewsButton.className = 'button-container';
    viewReviewsButton.textContent = 'View Establishment Reviews';
    viewReviewsButton.onclick = function sendData() {
        const name = restaurantName;
        const encodedMessage = encodeURIComponent(name);
        window.location.href = 'view-establishment-reviews?name=' + encodedMessage;
    };

    // Create the create review button
    const createReviewButton = document.createElement('button');
    createReviewButton.className = 'button-container';
    createReviewButton.textContent = 'Create Review';
    createReviewButton.onclick = function sendData2() {
        const name = restaurantName;
        const encodedMessage = encodeURIComponent(name);
        window.location.href = 'create-review?name=' + encodedMessage;
    };
    

    // Append all elements to their respective parents
    textContainerDiv.appendChild(nameFontDiv);
    textContainerDiv.appendChild(editButton);
    textContainerDiv.appendChild(detailsFontDiv);
    textContainerDiv.appendChild(viewReviewsButton);
    textContainerDiv.appendChild(createReviewButton);

    establishmentContainerDiv.appendChild(restoImageDiv);
    establishmentContainerDiv.appendChild(textContainerDiv);

    establishmentDiv.appendChild(establishmentContainerDiv);

    resultsContainer.appendChild(establishmentDiv);
}

function showCustomAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

function getSelectedValue() {
    const radios = document.getElementsByName('search');
    let selectedValue;
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }
    return selectedValue;
}