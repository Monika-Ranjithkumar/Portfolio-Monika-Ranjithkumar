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

      // Check if EmailJS SDK is initialized
      if (window.emailjs) {
        // Send email via emailjs
        // Replace with your service_id, template_id, and make sure form fields match your template variables
        // Default Template variables: from_name, from_email, subject, message
        emailjs.sendForm('service_default', 'template_default', this)
          .then(function() {
            handleSuccess();
          }, function(error) {
            console.error('EmailJS Error:', error);
            handleError();
          });
      } else {
        // Simulate successful dispatch for local demonstration if EmailJS API keys are missing/not set up
        console.warn("EmailJS is not initialized or script not loaded. Simulating email dispatch.");
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
      
      function handleError() {
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnText;
        alert("Failed to send message. Please try again or reach out directly at monikathangamani2006@gmail.com");
      }
    });
  }
});
