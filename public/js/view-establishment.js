function sendData(resturantName) {
    const message = resturantName;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = 'view-establishment-reviews?message=' + encodedMessage;
}
