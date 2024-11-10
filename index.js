console.log("hello");

let result = {
    "tag": "",
    "free": true,
    "role": false,
    "user": "riyaponn",
    "email": "riyaponn@gmail.com",
    "score": 0.64,
    "state": "deliverable",
    "domain": "gmail.com",
    "reason": "valid_mailbox",
    "mx_found": true,
    "catch_all": null,
    "disposable": false,
    "smtp_check": true,
    "did_you_mean": "",
    "format_valid": true
};

// Select the Submit button and result container from the DOM
const submitBtn = document.getElementById("Submitbtn");
const resultContainer = document.getElementById("resultConti");
const refreshBtn = document.getElementById("refreshBtn");

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked");
    resultContainer.innerHTML = '<img src="loading.svg" alt="Loading...">';

    let key = "ema_live_yKq30mhoGuo0fxAKHC8fCRX4HSbhMiehPHR8Yt1U";
    let email = document.getElementById("Email").value; // Use the correct ID "Email"

    let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;
    try {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        let apiResult = await res.json();
        let str = ``;
        let connectButtonHTML = '';

        for (let key in apiResult) {
            if (apiResult[key] !== "" && apiResult[key] !== " ") {
                str += `<div>${key}: ${apiResult[key]}</div>`;
            }
        }

        // If email is deliverable, add a "Connect" button
        if (apiResult.state === "deliverable") {
            connectButtonHTML = `<button id="connectBtn">Connect to Email</button>`;
        }

        console.log(str);

        // Display the result in the result container
        resultContainer.innerHTML = str + connectButtonHTML;

        // Event listener for the "Connect" button
        const connectBtn = document.getElementById("connectBtn");
        if (connectBtn) {
            connectBtn.addEventListener("click", () => {
                // Open the default email client with a pre-filled message
                const subject = "Subject of the email"; // You can customize the subject
                const body = "Body of the email"; // You can add content for the email body
                window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            });
        }
    } catch (error) {
        console.error("Error fetching the API:", error);
        resultContainer.innerHTML = `<div style="color: red;">Failed to retrieve data. Please try again later.</div>`;
    }
});
refreshBtn.addEventListener("click", () => {
    // Clear the input field
    document.getElementById("Email").value = '';

    // Clear the result container
    resultContainer.innerHTML = '';

    // Optionally, reset any other UI elements
});
