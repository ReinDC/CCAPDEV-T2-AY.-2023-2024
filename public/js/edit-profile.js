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

function closeCustomAlert(link) {
    document.getElementById('customAlert').style.display = 'none';
    if(link != ""){
        const profileContainer = document.getElementById("pfp");
        profileContainer.src = link;
    }
}

function confirmChanges(){
    window.location.href = "/user-profile";
}