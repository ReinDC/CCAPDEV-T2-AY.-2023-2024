function editDetails() {
    // Convert address to textarea
    var address = document.getElementById('details-address');
    var addressTextarea = document.createElement('textarea');
    addressTextarea.id = 'details-address';
    addressTextarea.className = 'details-address';
    addressTextarea.value = address.innerText;
    address.parentNode.replaceChild(addressTextarea, address);

    // Convert bestseller to textarea
    // Convert bestsellers list to textarea
    var bestseller = document.getElementById('details-bestseller');
    var bestsellerTextarea = document.createElement('textarea');
    bestsellerTextarea.id = 'details-bestseller';
    bestsellerTextarea.className = 'details-bestseller';

    // Extract the text content from each <li> element within the <ul> and join them with new lines
    var bestsellerText = Array.from(bestseller.getElementsByTagName('li'))
        .map(li => li.innerText)
        .join('\n');

    // Set the value of the textarea to the extracted text
    bestsellerTextarea.value = bestsellerText;

    // Replace the original div with the textarea
    bestseller.parentNode.replaceChild(bestsellerTextarea, bestseller);

    // Add flexbox layout to the details container
    document.getElementById('details-container').style.display = 'flex';
    document.getElementById('details-container').style.flexDirection = 'column';
    document.getElementById('details-container').style.gap = '10px';
}

function goBack() {
    window.history.back();
}