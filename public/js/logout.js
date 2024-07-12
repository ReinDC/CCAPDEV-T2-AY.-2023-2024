async function logout() {
    try {
        const response = await fetch("/sign-out", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            window.location = "/login";
        } else {
            alert("Logout Failed");
        }
    } catch (error) {
        console.error('Error during logout:', error);
        alert("Logout Failed");
    }
}

function goBack() {
    window.history.back();
}

