
// CHANGE ACCORDINGLY FOR OWNERS REPONSE

const form = document.getElementById('responseSubmission');
const postBtn = document.getElementById('postBtn');
const alertOKBtn = document.getElementById('alertOKBtn');

postBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    

    const myObj = { 
        reviewID: formData.get('reviewID'),
        resturantID: formData.get('resturantID'),
        responseTitle: formData.get('responseTitle'),
        responseContent: formData.get('responseContent')
    };

    const jString = JSON.stringify(myObj);

    try{
        // MAKE SUBMIT-RESPONSE IN INDEXROUTER.JS
        const response = await fetch("/submit-response",{
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            showCustomAlert("Response posted!");
            
        }
        else{
            showCustomAlert("Error: " + (await response.json().message));
        }

    }catch(error){
        console.error(error);
        showCustomAlert("An unexpected error occurred.")
    }
    
    
});

function showCustomAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
    window.location.href = "/view-establishment"
}
