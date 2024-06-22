const searchBtn = document.getElementById("searchBtn");


searchBtn.addEventListener('click', (e) => {
    const searchBar = document.getElementById("searchbar");
    const myObj = { 
        search: searchBar.value
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
        if (data.resturants) {
            for(let i = 0; i < data.resturants.length; i++){
                createRestaurantElement(data.resturants[i].restaurantIMG,  data.resturants[i].restaurantName, data.resturants[i].address,data.resturants[i].bestSellers)
            }
        } else {
            console.error('Restaurants not found in the response');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});



function createRestaurantElement(restaurantIMG, restaurantName, address, bestSellers) {
    // Create the main container div
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
    editButton.setAttribute('onclick', `sendData3('${restaurantName}')`);

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

    // Create the create review button
    const createReviewButton = document.createElement('button');
    createReviewButton.className = 'button-container';
    createReviewButton.textContent = 'Create Review';

    // Append all elements to their respective parents
    textContainerDiv.appendChild(nameFontDiv);
    textContainerDiv.appendChild(editButton);
    textContainerDiv.appendChild(detailsFontDiv);
    textContainerDiv.appendChild(viewReviewsButton);
    textContainerDiv.appendChild(createReviewButton);

    establishmentContainerDiv.appendChild(restoImageDiv);
    establishmentContainerDiv.appendChild(textContainerDiv);

    establishmentDiv.appendChild(establishmentContainerDiv);

    // Append the final establishment div to the results container
    const resultsContainer = document.querySelector('.results');
    resultsContainer.appendChild(establishmentDiv);
}

function sendData(resturantName) {
    const message = resturantName;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = 'view-establishment-reviews?message=' + encodedMessage;
}

function sendData2(resturantName) {
    const message = resturantName;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = 'create-review?message=' + encodedMessage;
}

function sendData3(resturantName) {
    const message = resturantName;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = 'edit-details?message=' + encodedMessage;
}
