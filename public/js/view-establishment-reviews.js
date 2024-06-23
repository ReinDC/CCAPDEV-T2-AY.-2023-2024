const helpfulBtn = document.getElementById("helpful");
const notHelpfulBtn = document.getElementById("not-helpful");

document.addEventListener('DOMContentLoaded', (e) => {
    const messageDiv = document.getElementById('name');
    getIMG(messageDiv.textContent.trim());
});


function markHelpful(userID){
    const myObj = { 
        userID: userID
    };
    
    const jString = JSON.stringify(myObj);

    fetch("/mark-helpful", {
        method: 'POST',
        body: jString,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

function markNotHelpful(userID){
    fetch('/mark-helpful')

}

function getIMG(resturantName){
    const myObj = { 
        resturant: resturantName
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


