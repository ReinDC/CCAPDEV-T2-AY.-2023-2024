
// CHANGE ACCORDINGLY FOR OWNERS REPONSE

const form = document.getElementById('reviewSubmission');
const postBtn = document.getElementById('postBtn');
const recoBtn = document.getElementById('recoBtn');
const notRecoBtn = document.getElementById('notRecoBtn');


recoBtn.addEventListener('click', () => {
    document.getElementById('isRecommended').value = 'true';
})

notRecoBtn.addEventListener('click', () => {
    document.getElementById('isRecommended').value = 'false';
})


postBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    

    const myObj = { 
        reviewID: formData.get('reviewID'),
        reviewerID: formData.get('reviewerID'),
        resturantID: formData.get('resturantID'),
        reviewContent: formData.get('reviewContent'),
        reviewTitle: formData.get('reviewTitle'),
        isRecommended: formData.get('isRecommended') === "true",
        helpfulCount: parseInt(formData.get('helpfulCount'), 10),
        notHelpfulCount: parseInt(formData.get('notHelpfulCount'), 10)
    };

    const jString = JSON.stringify(myObj);

    try{
        const response = await fetch("/submit-review",{
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            window.location.href="/view-establishment";
        }
        else{
            showCustomAlert("Error: " + (await response.json().message));
        }

    }catch(error){
        console.error(error);
        showCustomAlert("An unexpected error occurred.")
    }
    function showCustomAlert(message) {
        document.getElementById('alertMessage').textContent = message;
        document.getElementById('customAlert').style.display = 'block';
    }
    
    function closeCustomAlert() {
        document.getElementById('customAlert').style.display = 'none';
    }
    
});
