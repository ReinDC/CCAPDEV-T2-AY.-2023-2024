const form = document.getElementById('registerform');


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    if (checkPasswords()) {
        const myObj = { 
            profilePic: formData.get("profile"),
            username: formData.get("username"),
            password: formData.get("password"),
            type: formData.get("type"),
            description: formData.get("desc")
        };

        const jString = JSON.stringify(myObj);

        try {
            const response = await fetch("/submit-form-register", {
                method: 'POST',
                body: jString,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                window.location.href = "/view-establishment";
            } else if (response.status === 409) {
                showCustomAlert("Account already exists.");
            } else {
                showCustomAlert("Error.");
                console.log(response.status);
            }
        } catch (error) {
            console.error(error);
            showCustomAlert("An unexpected error occurred.");
        }
    } 
    
    else{
        showCustomAlert("Passwords do not match.");
    }
});

function check(){
    const formData = new FormData(form);
    const description = formData.get("desc");
    console.log(description);
}            

function checkPasswords() {

    const formData = new FormData(form);

    const password = formData.get("password");
    const confirmPassword = formData.get("password-re");

    if(password !== confirmPassword) {
        return false;
    }
    else{
        return true;
    }
}

function showCustomAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
}