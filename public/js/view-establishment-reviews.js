const helpfulBtn = document.getElementById("helpful");
const notHelpfulBtn = document.getElementById("not-helpful");
const searchbar = document.getElementById("searchbar");

searchbar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        filter();
    }
});

document.addEventListener('DOMContentLoaded', (e) => {
    const messageDiv = document.getElementById('name');
    getIMG(messageDiv.textContent);

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
    const reviewContainerDiv = document.querySelector(".review-container");
    reviewContainerDiv.innerHTML = "";

    const myObj = {
        reviewTitle: searchBarValue,
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
            console.log(review.isRecommended)

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
        const searchbar = document.getElementById("searchbar");
        const realContainer = document.querySelector(".review-container");
        realContainer.innerHTML = ""
        const reviewContainer = document.createElement('div');
        reviewContainer.className = 'estab-reviews-container';
        reviewContainer.style.cssText = "align-items: center; border-radius: 0px;"
        reviewContainer.classList.add('transparent-text');
        reviewContainer.innerText = "No review/s found with the title: " + searchbar.value + '.'


        realContainer.appendChild(reviewContainer);
    });
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

