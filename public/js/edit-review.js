const recoBtn = document.getElementById("recoBtn");
const notRecoBtn = document.getElementById("notRecoBtn");
const reviewID = document.getElementById("reviewID").value;
let isRecommended = true;

recoBtn.addEventListener("click", (e) =>{
    isRecommended = true;
})
notRecoBtn.addEventListener("click", (e) =>{
    isRecommended = false;
})

function goBack() {
    window.history.back();
}

async function confirmChanges(){    
    const title = document.querySelector(".title-textarea").value;
    const content = document.querySelector(".review-textarea").value;
    const myObj = { 
        reviewTitle: title,
        reviewContent: content,
        isRecommended: isRecommended,
        reviewID: reviewID
    };

    const jString = JSON.stringify(myObj);

    try {
        const response = await fetch("/review-edit", {
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.status === 200){
            showCustomAlert("Successfully edited!")
        }

        else{
            showCustomAlert("Error");
        }

    } catch (error) {
        console.error(err);
    }

}

function showCustomAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
    window.location = "/view-establishment"
}


async function deleteReview(){
    const myObj = { 
        type: "review",
        id: reviewID
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
        alert("Error, there was a problem changing your profile picture.");
    }
}

function reco(){
    document.getElementById("notRecoBtn").style.backgroundColor = "#a5a5a5";
    document.getElementById("recoBtn").style.backgroundColor = "#96A677";
}

function notreco(){
    document.getElementById("recoBtn").style.backgroundColor = "#a5a5a5";
    document.getElementById("notRecoBtn").style.backgroundColor = "#CE6A85";
}