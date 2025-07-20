"use strict";

// ⁡⁢⁣⁡⁢⁣⁢OTHER INPUT - REPORT ISSUE SCREENS - * UPDATED *⁡
// Using the following classes/id's
const buttons = document.querySelectorAll(".issue-options button");
const otherBtn = document.getElementById("btn-other");
const otherDesc = document.getElementById("other-desc");
const otherInput = document.getElementById("other-issue-detail");
const charCount = document.getElementById("char-count");
const maxChars = 120;

// Hide the "other" field by default
otherDesc.style.display = "none";

// Listen for button clicks
buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove highlight from all
    buttons.forEach((b) => b.classList.remove("selected"));
    // Add highlight to clicked
    btn.classList.add("selected");

    // Condition
    if (btn === otherBtn) {
      otherDesc.style.display = "block";

      // Update character count and focus input
      charCount.textContent = `${maxChars - otherInput.value.length} characters left`;
      otherInput.focus();
    } else {
      otherDesc.style.display = "none";
    }
  });
});

// ⁡⁢⁣⁢CHARACTER COUNT - OTHER INPUT - REPORT ISSUE SCREENS⁡
// Live update of character count
otherInput.addEventListener("input", function () {
  const remaining = maxChars - otherInput.value.length;
  charCount.textContent = `${remaining} characters left`;
});

//
//

// // ⁡⁢⁣⁢OTHER INPUT - REPORT ISSUE SCREENS⁡
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

// // ⁡⁢⁣⁢CHARACTER COUNT - OTHER INPUT - REPORT ISSUE SCR⁡⁢⁣⁢EENS⁡
// const otherInput = document.getElementById("other-issue-detail");
// const charCount = document.getElementById("char-count");
// const maxChars = 120;

// otherInput.addEventListener("input", function () {
//   const remaining = maxChars - otherInput.value.length;
//   charCount.textContent = `${remaining} characters left`;
// });
