"use strict";

//------------------------ Login in & Form Validation  ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }

      form.classList.add("was-validated");
    });
  });
});
//------------------------ Stars Rating's Code ------------------------
document.querySelectorAll(".star-rating:not(.readonly) label").forEach((star) => {
  star.addEventListener("click", function () {
    this.style.transform = "scale(1.2)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 200);
  });
});

const form = document.getElementById("signupForm");
const password = document.getElementById("signupPassword");
const confirm1 = document.getElementById("signupConfirm");

form.addEventListener("submit", (e) => {
  // const password = form.signupPassword.value
  // const confirm = form.signupConfirm.value
  if (password.value !== confirm1.value) {
    confirm1.setCustomValidity("passwords do not match");
  } else {
    confirm1.setCustomValidity("");
  }
  if (!form.checkValidity()) {
    e.preventDefault();
    // e.stopPropagation()
  }
  form.classList.add("was-validated");
});
//------------------------ Login in & Form Validation  ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }

      form.classList.add("was-validated");
    });
  });
});
