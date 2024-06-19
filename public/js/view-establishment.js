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
