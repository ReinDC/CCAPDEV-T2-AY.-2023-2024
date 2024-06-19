function sendData(resturantName) {
    const message = resturantName;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = 'view-establishment-reviews?message=' + encodedMessage;
}

async function getIMG(resturantName){
    try {
        const myObj = { 
            resturant: resturantName
        };

        const jString = JSON.stringify(myObj);
        
        const response = await fetch("/get-image", {
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.status === 200){
            window.location.href = "/view-establishment";
        }

    } catch (error) {
        console.error(err);
    }
}