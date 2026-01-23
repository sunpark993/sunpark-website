document.getElementById("contactFormSection").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("cf_name");
    const email = document.getElementById("cf_email");
    const mobile = document.getElementById("cf_mobile");
    const message = document.getElementById("cf_message");

    const overlay = document.getElementById("loadingOverlay");

    // Clear errors
    document.querySelectorAll(".error-text").forEach(e => e.remove());
    [name, email, mobile, message].forEach(f => f.classList.remove("error-input"));

    let valid = true;

    function showError(field, msg) {
        field.classList.add("error-input");
        const error = document.createElement("div");
        error.className = "error-text";
        error.innerText = msg;
        field.insertAdjacentElement("afterend", error);
        valid = false;
    }

    // Validation
    if (name.value.trim().length < 3) showError(name, "Name must be at least 3 characters");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) showError(email, "Enter a valid email");
    if (!/^[0-9]+$/.test(mobile.value.trim())) showError(mobile, "Enter a valid mobile number");
    if (message.value.trim().length < 16) showError(message, "Message must be at least 16 characters");

    if (valid) {

        // 🔥 Show Overlay Loader
        overlay.style.display = "flex";

        const formData = {
            name: name.value.trim(),
            email: email.value.trim(),
            mobile: mobile.value.trim(),
            message: message.value.trim()
        };

        fetch("https://script.google.com/macros/s/AKfycbzb9hj0sDDtMWOISVjA2esiyPt4MX5DXL1mD-7ZEFjOY59B6SdbroYm-WIABvzL0-2k8g/exec", {
            method: "POST",
            body: JSON.stringify(formData)
        })
            .then(res => res.text())
            .then(data => {

                // 🔥 Hide overlay
                overlay.style.display = "none";

                const successToast = new bootstrap.Toast(document.getElementById("successToast"));
                successToast.show();

                document.getElementById("contactFormSection").reset();
            })
            .catch(err => {

                // 🔥 Hide overlay
                overlay.style.display = "none";

                const errorToast = new bootstrap.Toast(document.getElementById("errorToast"));
                errorToast.show();
            });
    }
});
