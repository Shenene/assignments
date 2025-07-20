"use strict";

// ========== REPORT ISSUE PAGE ==========
const nextToLocationBtn = document.getElementById("next-to-location");
const issueButtons = document.querySelectorAll(".issue-options button");
const otherBtn = document.getElementById("btn-other");
const otherDesc = document.getElementById("other-desc");
const otherInput = document.getElementById("other-issue-detail");
const charCount = document.getElementById("char-count");
const maxChars = 120;
const photoInput = document.getElementById("upload-photo");
const dropArea = document.getElementById("img-upload-container");
const photoPreview = document.getElementById("photo-preview");
const photoModal = document.getElementById("photo-modal");
const modalPhoto = document.getElementById("modal-photo");
const closeModal = document.getElementById("close-modal");
const keepPhotoBtn = document.getElementById("keep-photo");
const discardPhotoBtn = document.getElementById("discard-photo");

// Hide the "other" field by default
if (otherDesc) otherDesc.style.display = "none";

// Listen for button clicks (show/hide Other)
if (issueButtons.length) {
  issueButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      issueButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      if (btn === otherBtn && otherDesc && charCount && otherInput) {
        otherDesc.style.display = "block";
        charCount.textContent = `${maxChars - otherInput.value.length} characters left`;
        otherInput.focus();
      } else if (otherDesc) {
        otherDesc.style.display = "none";
      }
    });
  });
}

// Character count for "Other"
if (otherInput && charCount) {
  otherInput.addEventListener("input", function () {
    const remaining = maxChars - otherInput.value.length;
    charCount.textContent = `${remaining} characters left`;
  });
}

// ---- IMAGE HANDLING ----
// Only rely on the <label> to trigger file picker! DO NOT add click event to dropArea.

// Helper: Open modal with photo for confirmation
function showModalWithFile(file) {
  if (!file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    modalPhoto.src = e.target.result;
    photoModal.style.display = "flex";
    window._pendingPhoto = e.target.result; // temp store, not in sessionStorage yet!
  };
  reader.readAsDataURL(file);
}

// File input change
if (photoInput) {
  photoInput.addEventListener("change", () => {
    if (photoInput.files && photoInput.files[0]) {
      showModalWithFile(photoInput.files[0]);
    }
  });
}

// Drag & drop events for dropArea
if (dropArea) {
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(
      eventName,
      (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      false
    );
  });
  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add("drag-active"), false);
  });
  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove("drag-active"), false);
  });
  dropArea.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Also update the file input for consistency!
      photoInput.files = files;
      showModalWithFile(files[0]);
    }
  });
}

// Keep photo (save to sessionStorage, show preview, hide modal)
if (keepPhotoBtn) {
  keepPhotoBtn.addEventListener("click", () => {
    if (window._pendingPhoto) {
      photoPreview.src = window._pendingPhoto;
      photoPreview.style.display = "block";
      sessionStorage.setItem("report_photo", window._pendingPhoto);
      photoModal.style.display = "none";
      // Optionally update UI: show "Change photo" etc
    }
  });
}

// Discard photo
if (discardPhotoBtn) {
  discardPhotoBtn.addEventListener("click", () => {
    photoInput.value = "";
    window._pendingPhoto = null;
    photoModal.style.display = "none";
    photoPreview.src = "";
    photoPreview.style.display = "none";
    sessionStorage.removeItem("report_photo");
  });
}

// Also close modal with "X" (same as discard)
if (closeModal) {
  closeModal.addEventListener("click", () => {
    discardPhotoBtn.click();
  });
}

// Next button: Save issue and photo to sessionStorage
if (nextToLocationBtn && issueButtons.length) {
  nextToLocationBtn.addEventListener("click", function (e) {
    let selected = "";
    issueButtons.forEach((btn) => {
      if (btn.classList.contains("selected")) selected = btn.textContent.trim();
    });

    if (selected.toLowerCase() === "other" && otherInput) {
      selected = otherInput.value.trim() || "other";
    }
    sessionStorage.setItem("report_issue", selected);

    // Already saved photo in sessionStorage when user clicked Keep
    // So just continue to next page
    // If no photo, make sure to clear sessionStorage
    if (!sessionStorage.getItem("report_photo")) {
      sessionStorage.removeItem("report_photo");
    }
    // Default: let the link go to location.html
  });
}

// ==== LOCATION PAGE ====
const nextToPreviewBtn = document.getElementById("next-to-preview");
const locationInput = document.getElementById("location-search");

if (nextToPreviewBtn && locationInput) {
  nextToPreviewBtn.addEventListener("click", function (e) {
    const locationVal = locationInput.value.trim();
    sessionStorage.setItem("report_location", locationVal);
    // Normal navigation to preview.html
  });
}

// ===== PREVIEW PAGE =====

const reportIntro = document.getElementById("report-intro");
const reportAddress = document.getElementById("report-address");
const photoSection = document.getElementById("photo-section");
const reportPhoto = document.getElementById("report-photo");

// Get saved data from sessionStorage
const savedIssue = sessionStorage.getItem("report_issue");
const savedLocation = sessionStorage.getItem("report_location");
const savedPhoto = sessionStorage.getItem("report_photo");

// Debug: log to see what's in storage (optional, remove when working)
console.log("savedIssue:", savedIssue);
console.log("savedLocation:", savedLocation);
console.log("savedPhoto:", savedPhoto);

// Set the issue summary
if (reportIntro) {
  reportIntro.textContent = savedIssue ? `You're about to report a ${savedIssue.toLowerCase()} at` : "No issue selected";
}
// Set the location
if (reportAddress) {
  reportAddress.textContent = savedLocation || "[No address provided]";
}
// Set the uploaded photo, if it exists
if (savedPhoto && photoSection && reportPhoto) {
  reportPhoto.src = savedPhoto;
  photoSection.style.display = "block";
} else if (photoSection) {
  photoSection.style.display = "none";
}

//

// // OTHER INPUT - REPORT ISSUE SCREENS
// // Using the following classes/id's
// const buttons = document.querySelectorAll(".issue-options button");
// const otherBtn = document.getElementById("btn-other");
// const otherDesc = document.getElementById("other-desc");

// // Hide the 'other' field by default"
// otherDesc.style.display = "none";

// // Used the forEach loop to loop through all buttons in .issue-options
// buttons.forEach((btn) => {
//   btn.addEventListener("click", function () {
//     // Remove highlight from all
//     buttons.forEach((b) => b.classList.remove("selected"));
//     // Add highlight to clicked
//     btn.classList.add("selected");

//     // Show input only if 'Other' is clicked
//     if (btn === otherBtn) {
//       otherDesc.style.display = "block";
//       // Move the focus to the input section
//       otherDesc.querySelector("input").focus();
//     } else {
//       otherDesc.style.display = "none";
//       otherDesc.querySelector("input").value = "";
//     }
//   });
// });

// // ⁡⁢⁣CHARACTER COUNT - OTHER INPUT - REPORT ISSUE SCREENS
// const otherInput = document.getElementById("other-issue-detail");
// const charCount = document.getElementById("char-count");
// const maxChars = 120;

// otherInput.addEventListener("input", function () {
//   const remaining = maxChars - otherInput.value.length;
//   charCount.textContent = `${remaining} characters left`;
// });
