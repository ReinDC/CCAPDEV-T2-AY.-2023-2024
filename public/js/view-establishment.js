function sendName(resturantName, actionType) {
    const name = resturantName;
    const encodedMessage = encodeURIComponent(name);
    let url = '';

    switch(actionType) {
        case 'view':
            url = 'view-establishment-reviews?name=';
            break;
        case 'review':
            url = 'create-review?name=';
            break;
        case 'edit':
            url = 'edit-details?name=';
            break;
        default:
            console.error('Invalid action type');
            return;
    }

    window.location.href = url + encodedMessage;
}

