// ----- LOAD FOOTER FROM FOOTER.HTML -----
fetch('components/footer.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('footer-area').innerHTML = data;

        // Contact form form submission handling
        const form = document.getElementById("contactForm");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nameInput = document.getElementById("name");
            const mobileInput = document.getElementById("mobile");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");
            const statusDiv = document.getElementById("formStatus");

            const name = nameInput.value.trim();
            const mobile = mobileInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Validate each field
            const nameValid = name.length >= 3;
            const mobileValid = /^\d+$/.test(mobile) && mobile.length === 10;
            const emailValid = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
            const messageValid = message.length >= 10;

            // Reset borders first
            nameInput.style.removeProperty("border");
            mobileInput.style.removeProperty("border");
            emailInput.style.removeProperty("border");
            messageInput.style.removeProperty("border");

            // Highlight incorrect fields
            if (!nameValid) nameInput.style.setProperty("border", "1px solid red", "important");
            if (!mobileValid) mobileInput.style.setProperty("border", "1px solid red", "important");
            if (!emailValid) emailInput.style.setProperty("border", "1px solid red", "important");
            if (!messageValid) messageInput.style.setProperty("border", "1px solid red", "important");

            // Any field invalid → show common error
            if (!nameValid || !mobileValid || !emailValid || !messageValid) {
                statusDiv.style.color = "red";
                statusDiv.innerHTML = "<i class='bi bi-exclamation-circle' style='color:red;'></i> Please fill all the details correctly.";
                return;
            }

            // -------------------
            // All fields valid → send to Google Sheet
            // -------------------
            const formData = {
                name: name,
                email: email,
                mobile: mobile,
                message: message
            };

            fetch("https://script.google.com/macros/s/AKfycbzb9hj0sDDtMWOISVjA2esiyPt4MX5DXL1mD-7ZEFjOY59B6SdbroYm-WIABvzL0-2k8g/exec", {
                method: "POST",
                body: JSON.stringify(formData)
            })
                .then(res => res.text())
                .then(data => {
                    console.log("Saved to Google Sheet:", data);
                    console.log("Email sent successfully");

                    // SUCCESS MESSAGE + GREEN ICON
                    statusDiv.style.color = "lightgreen";
                    statusDiv.innerHTML = "<i class='bi bi-check2-circle' style='color:limegreen;'></i> Form submitted successfully!";

                    // Reset form fields
                    form.reset();
                })
                .catch(err => {
                    console.error("Error:", err);
                    statusDiv.style.color = "red";
                    statusDiv.innerHTML = "<i class='bi bi-exclamation-circle' style='color:red;'></i> Something went wrong. Please try again.";
                });
        });

    });