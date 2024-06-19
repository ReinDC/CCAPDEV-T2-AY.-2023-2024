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
                alert("Not found")
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
        alert("Please fill in all fields.");
        return false;
    }
    else{
        return true;
    }
}