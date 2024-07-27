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

async function confirmDetails(){
    let restoBestSellers = document.getElementById("details-bestseller").value;
    restoBestSellers = restoBestSellers.split('\n').map(item => item.trim());

    const restoAdd = document.getElementById("details-address").value;

    const restoName = document.getElementById("name").textContent

    try {
        const myObj = {
            restoName: restoName,
            restoAdd: restoAdd,
            restoBestSellers: restoBestSellers
        }

        const jString = JSON.stringify(myObj);

        const response = await fetch("/changeRestoDetails", {
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.status == 200){
            window.location.href = "/view-establishment";
        }
        else{
            showCustomAlert("Error");

        }
    } catch (error) {
        showCustomAlert("Error");
    }
}

function showCustomAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

async function deleteResto(){
    const myObj = { 
        type: "resto",
        id: document.getElementById("id").value
    };
    
    const jString = JSON.stringify(myObj);
    

    const response = await fetch("/delete",{
        method: 'POST',
        body: jString,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.status == 200){
        window.location.href = "/view-establishment";
    }
    else{
        alert("Error");
    }
}
