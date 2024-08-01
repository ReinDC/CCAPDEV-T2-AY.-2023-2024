const helpfulBtn = document.getElementById("helpful");
const notHelpfulBtn = document.getElementById("not-helpful");
const searchbar = document.getElementById("searchbar");
const reviewContainerDiv = document.querySelector(".review-container");


searchbar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        filter();
    }
});

document.addEventListener('DOMContentLoaded', (e) => {
    const messageDiv = document.getElementById('name');
    getIMG(messageDiv.textContent);
    
    const myObj = {
        resturantName: messageDiv.textContent
    }


    const jString = JSON.stringify(myObj);

    fetch("get-reviews", {
        method: "POST",
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
    .then(data =>{
        reviewContainerDiv.innerHTML = "";

        for(let i = 0; i < data.reviews.length; i++){
            const review = data.reviews[i]
            const responses = data.responses;
            const users = data.users;
            const responseLength = data.responses.length;
            let responseIndex = -1, j, usersIndex = -1;


            // console.log(responses);
            // console.log(review);
            // console.log(data.user);

            if(responseLength > i){
                for(j = 0; j < responseLength; j++){
                    if(review.reviewID == responses[j].reviewID){
                        responseIndex = j;
                        break;
                    }
                }
            }
            

            for(j = 0; data.users.length; j++){
                if(review.reviewerID == users[j].userID){
                    usersIndex = j;
                    break;
                }

            }

            if(data.user){
                createReview(review, data.responses[responseIndex], data.users[usersIndex], data.user.userID, data.resturant);
            } else{
                createReview(review, data.responses[responseIndex], data.users[usersIndex], 0, data.resturant);
            }
        }

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});


function markHelpful(reviewID) {
    const myObj = { 
        reviewID: reviewID
    };
    
    const jString = JSON.stringify(myObj);

    fetch("/mark-helpful", { 
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
        if (data.count !== undefined) {
            const helpfulBtn = document.getElementById(`helpfulBtn${reviewID}`);
            helpfulBtn.innerText = "Helpful (" + data.count + ')';
        } else {
            console.error('Review not found');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function markNotHelpful(reviewID){
    const myObj = { 
        reviewID: reviewID,
    };
    
    const jString = JSON.stringify(myObj);

    fetch("/mark-nothelpful", { 
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
        if (data.count !== undefined) {
            const notHelpfulBtn = document.getElementById(`notHelpfulBtn${reviewID}`);
            notHelpfulBtn.innerText = "Not Helpful (" + data.count + ')';
        } else {
            console.error('Review not found');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function getIMG(resturantName){
    const myObj = { 
        resturantName: resturantName
    };

    const jString = JSON.stringify(myObj);
    
    fetch("/get-image", {
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
        if (data.imgLink) {
            const imgElement = document.getElementById('restoMage');
            imgElement.src = data.imgLink;
        } else {
            console.error('Image link not found in the response');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function sendData(reviewID) {
    const message = reviewID;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = 'edit-review?message=' + encodedMessage;
}

function filter(){
    const messageDiv = document.getElementById('name');
    const searchBarValue = document.getElementById("searchbar").value;
    let radioBtnValue = getSelectedValue();

    if (searchbar.value.trim() === "") {
        showCustomAlert("Please enter a search term.")
        searchbar.focus(); // Set focus back to the search bar
    }

    else{
        const myObj = {
            searchTerm: radioBtnValue,
            search: searchBarValue,
            resturantName: messageDiv.textContent,
        };
    
        const jString = JSON.stringify(myObj);
        
        fetch("/reviews-search", {
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
            reviewContainerDiv.innerHTML = "";
            for(let i = 0; i < data.reviews.length; i++){
                const user = data.users[i];
                const review = data.reviews[i]
    
                createReviewElement( 
                    user.profpic,
                    user.username,
                    review.reviewID,
                    review.reviewTitle, 
                    review.reviewContent, 
                    review.isRecommended, 
                    review.helpfulCount, 
                    review.notHelpfulCount
                );
            }
        })
        .catch(error => {
            console.log(error);
            console.log("\nNo reviews found with the search term.")
            const searchbar = document.getElementById("searchbar");
            const realContainer = document.querySelector(".review-container");
            realContainer.innerHTML = ""
            const reviewContainer = document.createElement('div');
            reviewContainer.className = 'estab-reviews-container';
            reviewContainer.style.cssText = "align-items: center; border-radius: 0px;"
            reviewContainer.classList.add('transparent-text');
            reviewContainer.innerText = "No review/s found with the "+ radioBtnValue +': ' + searchbar.value + '.'
    
            realContainer.appendChild(reviewContainer);
        });
    }
}


function createReviewElement(profpic, username, reviewID, reviewTitle, reviewContent, isRecommended, helpfulCount, notHelpfulCount) {
    const reviewContainer = document.createElement('div');
    reviewContainer.className = 'estab-reviews-container';
  
    const reviewProfile = document.createElement('div');
    reviewProfile.className = 'review-profile';
  
    const imgBox = document.createElement('div');
    imgBox.className = 'img-box';
    const img = document.createElement('img');
    img.src = profpic;
    imgBox.appendChild(img);
  
    const titleAndNameBox = document.createElement('div');
    titleAndNameBox.className = 'title-and-name-box';
  
    const titleText = document.createElement('div');
    titleText.className = 'title-text';
    titleText.textContent = reviewTitle;
  
    const nameText = document.createElement('div');
    nameText.className = 'name-text';
    nameText.textContent = 'By: ' + username;
  
    titleAndNameBox.appendChild(titleText);
    titleAndNameBox.appendChild(nameText);
  
    const reco = document.createElement('div');
    
    const recoText = document.createElement('div');
    recoText.className = 'reco-text';
    if(isRecommended){
        reco.className = 'reco';
        recoText.textContent = '⭐ Recommended';
    }
    else{
        reco.className = 'not-reco';
        recoText.textContent = '👎 Not recommended';
    }
    reco.appendChild(recoText);
  
    reviewProfile.appendChild(imgBox);
    reviewProfile.appendChild(titleAndNameBox);
    reviewProfile.appendChild(reco);
  
    const textContainerReview = document.createElement('div');
    textContainerReview.className = 'text-container-review';
    const textarea = document.createElement('textarea');
    textarea.readOnly = true;
    textarea.name = 'review';
    textarea.rows = 10;
    textarea.cols = 10;
    textarea.textContent = reviewContent;
    textContainerReview.appendChild(textarea);
  
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
  
    const helpfulButton = document.createElement('button');
    helpfulButton.className = 'button-btn';
    helpfulButton.id = "helpfulBtn" + reviewID;
    helpfulButton.textContent = 'Helpful (' + helpfulCount + ')';
    helpfulButton.onclick = function() {
        markHelpful(reviewID);
    };
  
    const notHelpfulButton = document.createElement('button');
    notHelpfulButton.className = 'button-btn';
    notHelpfulButton.id = "notHelpfulBtn" + reviewID;
    notHelpfulButton.textContent = 'Not Helpful (' + notHelpfulCount + ')';
    notHelpfulButton.onclick = function() {
        markNotHelpful(reviewID);
    };
  
    const editButton = document.createElement('button');
    editButton.className = 'button-btn';
    editButton.innerText = "Edit";
    editButton.onclick = function(){
        sendData(reviewID);
    }
    
    buttonContainer.appendChild(helpfulButton);
    buttonContainer.appendChild(notHelpfulButton);
    buttonContainer.appendChild(editButton);
  
    reviewContainer.appendChild(reviewProfile);
    reviewContainer.appendChild(textContainerReview);
    reviewContainer.appendChild(buttonContainer);
    const realContainer = document.querySelector(".review-container");
    realContainer.appendChild(reviewContainer);
}


function createReview(review, response, user, currentUserID, resturant){
    const reviewContainer = document.createElement('div');
    reviewContainer.className = 'estab-reviews-container';
    const reviewProfile = document.createElement('div');
    reviewProfile.className = 'review-profile';

    const imgBox = document.createElement('div');
    imgBox.className = 'img-box';
    const img = document.createElement('img');
    img.src = user.profpic;
    imgBox.appendChild(img);

    const titleAndNameBox = document.createElement('div');
    titleAndNameBox.className = 'title-and-name-box';

    const titleText = document.createElement('div');
    titleText.className = 'title-text';
    titleText.textContent = review.reviewTitle;

    const nameText = document.createElement('div');
    nameText.className = 'name-text';
    nameText.textContent = 'By: ' + user.username;

    titleAndNameBox.appendChild(titleText);
    titleAndNameBox.appendChild(nameText);

    const reco = document.createElement('div');

    const recoText = document.createElement('div');
    recoText.className = 'reco-text';
    if(review.isRecommended){
        reco.className = 'reco';
        recoText.textContent = '⭐ Recommended';
    }
    else{
        reco.className = 'not-reco';
        recoText.textContent = '👎 Not recommended';
    }
    reco.appendChild(recoText);

    reviewProfile.appendChild(imgBox);
    reviewProfile.appendChild(titleAndNameBox);
    reviewProfile.appendChild(reco);

    const textContainerReview = document.createElement('div');
    textContainerReview.className = 'text-container-review';
    const textarea = document.createElement('textarea');
    textarea.readOnly = true;
    textarea.name = 'review';
    textarea.rows = 10;
    textarea.cols = 10;
    textarea.textContent = review.reviewContent;
    textContainerReview.appendChild(textarea);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const helpfulButton = document.createElement('button');
    helpfulButton.className = 'button-btn';
    helpfulButton.id = "helpfulBtn" + review.reviewID;
    helpfulButton.textContent = 'Helpful (' + review.helpfulCount + ')';
    helpfulButton.onclick = function() {
        markHelpful(review.reviewID);
    };

    const notHelpfulButton = document.createElement('button');
    notHelpfulButton.className = 'button-btn';
    notHelpfulButton.id = "notHelpfulBtn" + review.reviewID;
    notHelpfulButton.textContent = 'Not Helpful (' + review.notHelpfulCount + ')';
    notHelpfulButton.onclick = function() {
        markNotHelpful(review.reviewID);
    };
    const editButton = document.createElement('button');
    editButton.className = 'button-btn';
    editButton.innerText = "Edit";
    if(review.reviewerID != currentUserID){
        editButton.style.display = "none";

    }
    editButton.onclick = function(){
        sendData(review.reviewID);
    }


    const respondBtn = document.createElement('button');
    respondBtn.className = "button-btn";
    respondBtn.innerText = "Respond";
    if(resturant.ownerID != currentUserID){
        respondBtn.style.display = "none";
    }
    respondBtn.onclick = function(){
        respondToReview(review.reviewID, resturant.resturantID);
    }


    buttonContainer.appendChild(helpfulButton);
    buttonContainer.appendChild(notHelpfulButton);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(respondBtn);


    reviewContainer.appendChild(reviewProfile);
    reviewContainer.appendChild(textContainerReview);
    reviewContainer.appendChild(buttonContainer);

    const realContainer = document.querySelector(".review-container");
    realContainer.appendChild(reviewContainer);
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

function showCustomAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

function respondToReview(reviewID, resturantID){
    window.location.href = `owner-response?reviewID=${reviewID}&resturantID=${resturantID}`;
}
