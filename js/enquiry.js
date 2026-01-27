document.getElementById("enquiryForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear old errors
    document.querySelectorAll(".error-text").forEach(el => el.style.display = "none");

    let hasError = false;

    function showError(id, message) {
        const errorEl = document.getElementById(id);
        errorEl.innerHTML = "<i class='bi bi-exclamation-circle' style='color:red;'></i> " + message;
        errorEl.style.display = "block";
        hasError = true;
    }

    const company = document.getElementById("enq_company").value.trim();
    const name = document.getElementById("enq_name").value.trim();
    const phone = document.getElementById("enq_phone").value.trim();
    const email = document.getElementById("enq_email").value.trim();
    const message = document.getElementById("enq_message").value.trim();

    const products = [];
    document.querySelectorAll("input[name='products']:checked").forEach((item) => {
        products.push(item.value);
    });

    // === VALIDATION ===
    if (company.length < 3) showError("err_company", "Company name must have at least 3 characters.");
    if (name.length < 3) showError("err_name", "Full name must have at least 3 characters.");
    if (!/^[0-9]+$/.test(phone)) showError("err_phone", "Phone number must contain only numbers.");
    if (email === "") showError("err_email", "Email is required.");
    else if (!email.includes("@") || !email.includes(".") || email.length < 5)
        showError("err_email", "Enter a valid email address.");
    if (products.length === 0) showError("err_products", "Select at least one product.");

    if (hasError) return;

    // === FORM DATA ===
    const formData = {
        company,
        name,
        phone,
        email,
        products: products.join(", "),
        message
    };

    console.log("Form Data Submitted: ", formData);

    // ======================================
    // 🚀 Show Loader Overlay
    // ======================================
    document.getElementById("loadingOverlay").style.display = "flex";

    // === SEND TO GOOGLE SHEET ===
    fetch("https://script.google.com/macros/s/AKfycbyyrcOesUCU4Mef-nGrbZJKFMxoThfnVrJtFPut_VsRuK2bHjA3cSCVKGeF34g_ZoD7zw/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(() => {
        // Hide Loader
        document.getElementById("loadingOverlay").style.display = "none";

        // Show Success Toast
        const toast = new bootstrap.Toast(document.getElementById("successToast"));
        toast.show();

        // Reset Form
        document.getElementById("enquiryForm").reset();
    })
    .catch(err => {
        console.error("Error:", err);

        // Hide Loader
        document.getElementById("loadingOverlay").style.display = "none";

        // Show Error Toast
        const toast = new bootstrap.Toast(document.getElementById("errorToast"));
        toast.show();
    });
});
