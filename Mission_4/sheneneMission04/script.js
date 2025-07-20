"use strict";

// Using the following classes/id's
const buttons = document.querySelectorAll(".issue-options button");
const otherBtn = document.getElementById("btn-other");
const otherDesc = document.getElementById("other-desc");

// Hide my 'other' box by default"
otherDesc.style.display = "none";

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove highlight from all
    buttons.forEach((b) => b.classList.remove("selected"));
    // Add highlight to clicked
    btn.classList.add("selected");

    // Show input only if 'Other' is clicked
    if (btn === otherBtn) {
      otherDesc.style.display = "block";
      // Move the focus to the input section
      otherDesc.querySelector("input").focus();
    } else {
      otherDesc.style.display = "none";
      otherDesc.querySelector("input").value = "";
    }
  });
});
