const form = document.getElementById('loginform');


form.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    

    if(checkForm()){
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

            if(response.status === 200){
                window.location.href = "/view-establishment";
            }

            else if(response.status === 404){
                // alert("Account not found, please check username and password or sign up")
                showCustomAlert("Account not found, please check username and password or sign up");
            }

            else{
                alert("Error")
            }

        } catch (error) {
            console.error(err);
        }
    }

})

function checkForm() {
    const formData = new FormData(form);

    if (formData.get("username").trim() === "" || formData.get("password").trim() === ""){
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
