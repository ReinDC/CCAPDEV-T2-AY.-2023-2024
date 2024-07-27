const form = document.getElementById('loginform');

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('unauthenticated')) {
        showCustomAlert('You need to be logged in to access that.');
    }
});


form.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const formData = new FormData(form);

    const myObj = { 
        username: formData.get("username"),
        password: formData.get("password")
    };


    const jString = JSON.stringify(myObj);


    try {
        const response = await fetch("/submit-form-login", {
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.status)
        if(response.status === 200){
            window.location.href = "/view-establishment";
        }
        
        else{
            showCustomAlert("Login Error, check your username and password. Try again");
        }

    } catch (error) {
        console.error(err);
    }

})

function showCustomAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
}
