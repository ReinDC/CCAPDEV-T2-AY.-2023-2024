function changePFP() {
    document.getElementById('customAlert').style.display = 'block';
    const customAlertDiv = document.querySelector(".custom-alert-content")
    customAlertDiv.innerHTML = '';

    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Enter link here';

    const alertMessage = document.createElement('p');
    alertMessage.textContent = 'Enter Link';

    const okBtn = document.createElement('button');
    okBtn.textContent = 'Ok';
    okBtn.onclick = function() {
        closeCustomAlert(newInput.value);
    };
    

    customAlertDiv.appendChild(alertMessage);
    customAlertDiv.appendChild(newInput);
    customAlertDiv.appendChild(okBtn);
}

async function closeCustomAlert(link) {
    document.getElementById('customAlert').style.display = 'none';

    if(link != ""){
        const profileContainer = document.getElementById("pfp");

        const myObj = { link: link };

        const jString = JSON.stringify(myObj);
        
        const response = await fetch("/changepfp", {
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.status == 200){
            profileContainer.src = link;
            alert("Successfully changed your profile picture");
        }
        else if(response.status == 500){
            alert("Please enter a valid url.");
        }
        
        else{
            alert("Error, there was a problem changing your profile picture.");
        }
    }
}

async function confirmChanges(){
    const descContainer = document.getElementById("profile-description");
    const myObj = { desc: descContainer.value };
    const jString = JSON.stringify(myObj);


    const response = await fetch("/changeDesc",{
        method: 'POST',
        body: jString,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.status == 200){
        window.location.href = "/user-profile";
        alert("Successfully changed your user profile");
    }
    else{
        alert("Error, there was a problem changing your profile picture.");
    }
}