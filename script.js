// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.add("hidden");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu after clicking a link
      mobileMenu.classList.add("hidden");
    }
  });
});

// Initialize EmailJS
(function () {
  emailjs.init("tmieiu124Ber32QOE"); // Your public key
})();

// Contact form handling with EmailJS
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const location = document.getElementById("location").value;
    const message = document.getElementById("message").value;

    // Basic validation
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare template parameters
    const templateParams = {
      name: name,
      email: email,
      location: location || "Not specified",
      message: message,
    };

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs
      .send("service_pwhta18", "template_tac2nkv", templateParams)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert(
          "Thank you! Your message has been sent successfully. We'll get back to you soon!"
        );

        // Reset form
        document.getElementById("contact-form").reset();
      })
      .catch(function (error) {
        console.log("FAILED...", error);
        alert(
          "Sorry, there was an error sending your message. Please try again or contact us directly."
        );
      })
      .finally(function () {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
