const result = document.getElementById("result");
let orginalcaptcha = "";

function generatecaptcha() {

    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let captcha = "";

    for (let i = 0; i < 4; i++) {

        captcha += chars.charAt(Math.random() * chars.length);

    }

    document.getElementById("captcha").innerText = captcha;

    orginalcaptcha = captcha;

}

async function loginform(e) {
    e.preventDefault();
    localStorage.clear();
    let email = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let captcha = document.getElementById('captchavalue').value;

    const result = document.getElementById("result");
    if (!email || !password) {
        result.style.color = "#e11d48";
        result.innerText = "Email and password are required";
        return;
    }

    if (captcha !== orginalcaptcha) {
        result.style.color = "#e11d48";
        result.innerText = "Invalid Captcha!";
        generatecaptcha();
        return;
    }
    localStorage.clear();
    result.style.color = "var(--nav-light-blue)";
    result.innerText = "Authenticating...";

    const response = await fetch('/api/login', {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            username: email,

            password: password,

        })

    });

    const data = await response.json();

    if (!response.ok) {
        result.style.color = "#e11d48";
        result.innerText = data.message || "Login failed";
        if (typeof generatecaptcha === "function") generatecaptcha();
        return;
    }


    console.log(data.token);

    window.location.href = "api/auth/dashboard";

}

async function resetform(e) {

    e.preventDefault();

    let email = document.getElementById('username').value;

    const response = await fetch('/api/reset', {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: email,
        })

    });

    const data = await response.json();

    console.log(data);


}

async function signupform(e) {
    e.preventDefault();

    // 1. Get elements and values
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('samepassword').value;
    const resultDisplay = document.getElementById('result');

    // 2. Client-side Validation: Check if passwords match
    if (password !== confirmPassword) {
        resultDisplay.style.color = "#e11d48"; // Red error color
        resultDisplay.innerText = "❌ Passwords do not match!";
        return;
    }

    try {
        // Show a loading state
        resultDisplay.style.color = "var(--nav-light-blue)";
        resultDisplay.innerText = "Processing registration...";

        // 3. Send the request to your backend
        const response = await fetch('/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });

        const data = await response.json();

        // 4. Handle the server response
        if (response.ok) {
            resultDisplay.style.color = "#059669"; // Green success color
            resultDisplay.innerText = "✅ Registration Successful! Redirecting to login...";

            // Wait 2 seconds so the user can see the success message, then redirect
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);

        } else {
            resultDisplay.style.color = "#e11d48";
            resultDisplay.innerText = "❌ " + (data.message || "Signup failed. Please try again.");
        }

        console.log("Server response:", data);

    } catch (error) {
        console.error("Network error:", error);
        resultDisplay.style.color = "#e11d48";
        resultDisplay.innerText = "❌ Connection error. Is the server running?";
    }
}