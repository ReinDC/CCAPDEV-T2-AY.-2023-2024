const helpfulBtn = document.getElementById("helpful");
const notHelpfulBtn = document.getElementById("not-helpful");

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
        reviewID: reviewID
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

        const btnID = "notHelpfulBtn" + reviewID;
        if (data.count !== undefined) {
            const notHelpfulBtn = document.getElementById(btnID);
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


