const form = document.getElementById('registerform');

function checkForm(){
    const formData = new FormData(form);
    
    if(formData.get("username").trim() === "" || formData.get("password").trim() === "" || formData.get("email").trim() === "" 
        || formData.get("passwordre").trim() === "") {
        alert("Please fill in all fields.");
        return false;
    } else {
        if(checkPasswords()){
            return true;
        }
        else{
            alert("Please enter the same password.");
            return false;
        }
    } 
}