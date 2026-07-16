/* ==========================================================================
   Monika B R - Premium Portfolio - EmailJS Form Handler
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contactForm");
  const formSubmitBtn = document.getElementById("formSubmitBtn");
  const successModalEl = document.getElementById("successModal");
  let successModal = null;
  
  if (successModalEl && typeof bootstrap !== "undefined") {
    successModal = new bootstrap.Modal(successModalEl);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();
      
      // Basic validation
      const name = document.getElementById("formName").value.trim();
      const email = document.getElementById("formEmail").value.trim();
      const subject = document.getElementById("formSubject").value.trim();
      const message = document.getElementById("formMessage").value.trim();
      
      if (!name || !email || !subject || !message) {
        alert("Please fill out all fields.");
        return;
      }
      
      // Update button state to sending
      const originalBtnText = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

      // Check if Web3Forms Access Key is provided in the form
      const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
      const accessKey = accessKeyInput ? accessKeyInput.value.trim() : "";

      if (accessKey && accessKey !== "YOUR_ACCESS_KEY_HERE" && accessKey !== "") {
        // Prepare data for Web3Forms API
        const formData = new FormData(contactForm);
        
        // Convert FormData to JSON (Web3Forms supports JSON which returns cleaner responses)
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: json
        })
        .then(async (response) => {
          let jsonResponse = await response.json();
          if (response.status === 200) {
            handleSuccess();
          } else {
            console.error("Web3Forms Error Response:", jsonResponse);
            handleError(jsonResponse.message || "Failed to send message.");
          }
        })
        .catch(error => {
          console.error("Network error during submission:", error);
          handleError("Network error. Please check your internet connection.");
        });
      } else {
        // Simulate successful dispatch for local demonstration if Web3Forms API keys are missing/not set up
        console.warn("Web3Forms Access Key is missing. Simulating email dispatch.");
        setTimeout(() => {
          handleSuccess();
        }, 1500);
      }
      
      function handleSuccess() {
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnText;
        contactForm.reset();
        
        // Show success animation modal
        if (successModal) {
          successModal.show();
        } else {
          alert("Thank you! Your message has been sent successfully.");
        }
      }
      
      function handleError(errorMsg) {
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnText;
        alert(errorMsg || "Failed to send message. Please try again or reach out directly at monikathangamani2006@gmail.com");
      }
    });
  }
});
