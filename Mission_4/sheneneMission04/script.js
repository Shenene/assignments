"use strict";

// ======= ⁡⁣⁢⁢REPORT ISSUE PAGE (ISSUE SELECTION, OTHER, CHAR COUNT)⁡ =======
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

// ======= ⁡⁣⁢⁢IMAGE UPLOAD, MODAL PREVIEW, REMOVE⁡ =======
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

// Show upload or preview based on state
function setUploadState(hasImage) {
  if (hasImage) {
    uploadLabel.style.display = "none";
    imagePreviewBox.style.display = "block";
  } else {
    uploadLabel.style.display = "";
    imagePreviewBox.style.display = "none";
  }
}

// ⁡⁢⁢⁣Acce⁡⁢⁢⁣ssibility⁡
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

// ⁡⁣⁢⁢Drag & drop support⁡
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
    imagePreviewBox.innerHTML = "";

    // Add image
    const img = document.createElement("img");
    img.src = pendingPhotoDataURL;
    img.alt = "Selected image preview";
    img.setAttribute("tabindex", "0");

    // ⁡⁢⁢⁣Accessibility⁡
    // Remove button (accessible)
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "&times;";
    removeBtn.className = "remove-image-btn";
    removeBtn.setAttribute("aria-label", "Remove image");
    removeBtn.setAttribute("tabindex", "0");
    removeBtn.onclick = () => {
      setUploadState(false);
      imagePreviewBox.innerHTML = "";
      photoInput.value = "";
      pendingPhotoDataURL = null;
      sessionStorage.removeItem("report_photo");
      uploadLabel.focus();
    };

    imagePreviewBox.appendChild(removeBtn);
    imagePreviewBox.appendChild(img);

    setUploadState(true);

    // Save for next page
    sessionStorage.setItem("report_photo", pendingPhotoDataURL);

    photoModal.style.display = "none";
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
      setUploadState(false);
      imagePreviewBox.innerHTML = "";
      photoInput.value = "";
      pendingPhotoDataURL = null;
      sessionStorage.removeItem("report_photo");
      uploadLabel.focus();
    };

    imagePreviewBox.appendChild(removeBtn);
    imagePreviewBox.appendChild(img);

    setUploadState(true);
  } else {
    setUploadState(false);
  }
});

// ====== ⁡⁣⁢⁢SAVE TO SESSIONSTORAGE ON NEXT⁡ ======
if (nextToLocationBtn && issueButtons.length) {
  nextToLocationBtn.addEventListener("click", function (e) {
    let selected = "";
    issueButtons.forEach((btn) => {
      if (btn.classList.contains("selected")) selected = btn.textContent.trim();
    });

    // If "Other" is selected, require input
    if (selected.toLowerCase() === "other" && otherInput) {
      if (!otherInput.value.trim()) {
        otherInput.focus();
        // Show error only once
        if (!document.getElementById("other-error")) {
          const err = document.createElement("div");
          err.textContent = "Please describe the issue.";
          err.style.color = "red";
          err.style.fontSize = "0.98em";
          err.id = "other-error";
          otherDesc.appendChild(err);
        }
        e.preventDefault();
        return;
      } else {
        // Remove error if previously added
        const prevErr = document.getElementById("other-error");
        if (prevErr) prevErr.remove();
        selected = otherInput.value.trim(); // Save user text!
      }
    }

    sessionStorage.setItem("report_issue", selected);

    // Already saved photo in sessionStorage
    if (!sessionStorage.getItem("report_photo")) {
      sessionStorage.removeItem("report_photo");
    }
  });
}

if (otherInput) {
  otherInput.addEventListener("blur", function () {
    if (!otherInput.value.trim() && otherDesc.style.display === "block") {
      if (!document.getElementById("other-error")) {
        const err = document.createElement("div");
        err.textContent = "Please describe the issue.";
        err.style.color = "red";
        err.style.fontSize = "0.98em";
        err.id = "other-error";
        otherDesc.appendChild(err);
      }
    } else {
      const prevErr = document.getElementById("other-error");
      if (prevErr) prevErr.remove();
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
function getIssueSummary(issueText) {
  if (!issueText) return "No issue selected";
  const text = issueText.trim().toLowerCase();
  if (text === "flickering light") return "You're about to report a flickering light at";
  if (text === "completely off") return "You're about to report a light that is completely off at";
  if (text === "pole damaged") return "You're about to report a damaged pole at";
  return `You're about to report: "${issueText}" at`;
}

if (reportIntro) {
  reportIntro.textContent = getIssueSummary(savedIssue);
}

// Set the location
if (reportAddress) {
  reportAddress.textContent = savedLocation || "[No address provided]";
}
// Show the uploaded photo or "No photo attached" fallback
const photoPlaceholder = document.getElementById("photo-placeholder");

if (photoSection && reportPhoto && photoPlaceholder) {
  if (savedPhoto) {
    reportPhoto.src = savedPhoto;
    reportPhoto.style.display = "block";
    photoPlaceholder.style.display = "none";
    photoSection.style.display = "flex";
  } else {
    reportPhoto.style.display = "none";
    photoPlaceholder.style.display = "flex";
    photoSection.style.display = "flex";
  }
}

// REPORT ID - CONFIRMATION PAGE
// PREVIEW PAGE: Send Report ⁡⁣⁢⁢(generate report ID and save to sessionStorage)⁡
const sendReportBtn = document.querySelector(".send-report-button");
if (sendReportBtn) {
  sendReportBtn.addEventListener("click", function () {
    // Generate a unique report ID
    const reportId = "FIXIT-" + Math.random().toString(36).substr(2, 8).toUpperCase();
    sessionStorage.setItem("report_id", reportId);
    window.location.href = "confirmation.html";
  });
}

// Reference outside so all code can access it!
const reportIdSpan = document.getElementById("report-id");

// CONFIRMATION PAGE: Display Report ID
window.addEventListener("DOMContentLoaded", function () {
  const reportId = sessionStorage.getItem("report_id");
  if (reportIdSpan && reportId) {
    reportIdSpan.textContent = reportId;
  }
});

// Copy to clipboard
const copyBtn = document.getElementById("copy-report-id");
const copySuccess = document.getElementById("copy-success");
if (copyBtn && reportIdSpan) {
  copyBtn.addEventListener("click", function () {
    // Only try copying if there's something to copy
    if (reportIdSpan.textContent) {
      navigator.clipboard.writeText(reportIdSpan.textContent).then(() => {
        copySuccess.style.display = "inline";
        setTimeout(() => (copySuccess.style.display = "none"), 1200);
      });
    }
  });
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
