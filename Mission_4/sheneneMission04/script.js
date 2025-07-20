"use strict";

// ======= REPORT ISSUE PAGE (ISSUE SELECTION, OTHER, CHAR COUNT) =======
const nextToLocationBtn = document.getElementById("next-to-location");
const issueButtons = document.querySelectorAll(".issue-options button");
const otherBtn = document.getElementById("btn-other");
const otherDesc = document.getElementById("other-desc");
const otherInput = document.getElementById("other-issue-detail");
const charCount = document.getElementById("char-count");
const maxChars = 120;

if (otherDesc) otherDesc.style.display = "none";
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
if (otherInput && charCount) {
  otherInput.addEventListener("input", function () {
    const remaining = maxChars - otherInput.value.length;
    charCount.textContent = `${remaining} characters left`;
  });
}

// ======= IMAGE UPLOAD, MODAL PREVIEW, REMOVE =======
const photoInput = document.getElementById("upload-photo");
const uploadLabel = document.getElementById("upload-label");
const imagePreviewBox = document.getElementById("image-preview-box");
const dropArea = document.getElementById("img-upload-container");

const photoModal = document.getElementById("photo-modal");
const modalPhoto = document.getElementById("modal-photo");
const closeModal = document.getElementById("close-modal");
const keepPhotoBtn = document.getElementById("keep-photo");
const discardPhotoBtn = document.getElementById("discard-photo");

let pendingPhotoDataURL = null;

// Keyboard: allow label to trigger file input with Enter/Space
if (uploadLabel) {
  uploadLabel.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      photoInput.click();
      e.preventDefault();
    }
  });
}

// File input: open modal preview
if (photoInput) {
  photoInput.addEventListener("change", () => {
    if (photoInput.files && photoInput.files[0]) {
      handleFile(photoInput.files[0]);
    }
  });
}

// Drag & drop support
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
      handleFile(files[0]);
      // Sync file input for consistency
      const dt = new DataTransfer();
      dt.items.add(files[0]);
      photoInput.files = dt.files;
    }
  });
}

// Handle image file: show modal
function handleFile(file) {
  if (!file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    pendingPhotoDataURL = e.target.result;
    modalPhoto.src = pendingPhotoDataURL;
    photoModal.style.display = "flex";
    // Keyboard focus on modal for accessibility
    keepPhotoBtn.focus();
  };
  reader.readAsDataURL(file);
}

// Modal controls
if (closeModal) closeModal.onclick = () => discardPhotoBtn.click();
if (discardPhotoBtn)
  discardPhotoBtn.onclick = () => {
    photoInput.value = "";
    pendingPhotoDataURL = null;
    photoModal.style.display = "none";
  };
if (keepPhotoBtn)
  keepPhotoBtn.onclick = () => {
    // Clear previous preview
    imagePreviewBox.innerHTML = "";

    // Add image
    const img = document.createElement("img");
    img.src = pendingPhotoDataURL;
    img.alt = "Selected image preview";
    img.setAttribute("tabindex", "0");

    // Remove button (accessible)
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "&times;";
    removeBtn.className = "remove-image-btn";
    removeBtn.setAttribute("aria-label", "Remove image");
    removeBtn.setAttribute("tabindex", "0");
    removeBtn.onclick = () => {
      imagePreviewBox.style.display = "none";
      imagePreviewBox.innerHTML = "";
      uploadLabel.style.display = "";
      photoInput.value = "";
      pendingPhotoDataURL = null;
      sessionStorage.removeItem("report_photo");
      uploadLabel.focus();
    };

    imagePreviewBox.appendChild(removeBtn);
    imagePreviewBox.appendChild(img);

    // Show preview, hide upload prompt
    imagePreviewBox.style.display = "block";
    uploadLabel.style.display = "none";

    // Save for next page
    sessionStorage.setItem("report_photo", pendingPhotoDataURL);

    photoModal.style.display = "none";
    // Keyboard focus on "remove image" button for accessibility
    removeBtn.focus();
  };

// Restore photo from sessionStorage (if user comes back)
window.addEventListener("DOMContentLoaded", () => {
  const savedPhoto = sessionStorage.getItem("report_photo");
  if (savedPhoto) {
    imagePreviewBox.innerHTML = "";
    const img = document.createElement("img");
    img.src = savedPhoto;
    img.alt = "Selected image preview";
    img.setAttribute("tabindex", "0");

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "&times;";
    removeBtn.className = "remove-image-btn";
    removeBtn.setAttribute("aria-label", "Remove image");
    removeBtn.setAttribute("tabindex", "0");
    removeBtn.onclick = () => {
      imagePreviewBox.style.display = "none";
      imagePreviewBox.innerHTML = "";
      uploadLabel.style.display = "";
      photoInput.value = "";
      pendingPhotoDataURL = null;
      sessionStorage.removeItem("report_photo");
      uploadLabel.focus();
    };

    imagePreviewBox.appendChild(removeBtn);
    imagePreviewBox.appendChild(img);
    imagePreviewBox.style.display = "block";
    uploadLabel.style.display = "none";
  }
});

// ====== SAVE TO SESSIONSTORAGE ON NEXT ======
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

    // Already saved photo in sessionStorage
    if (!sessionStorage.getItem("report_photo")) {
      sessionStorage.removeItem("report_photo");
    }
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
