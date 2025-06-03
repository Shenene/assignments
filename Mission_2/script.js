// ------ C H E C K L I S T   S E C T I O N ------ //
//
// ------ Checklists ------ //
const checklists = {
  "IFO Foundation": ["Timber Subfloor", "Footings/bearers/joists size/spacings correct (1.5kPa)", "Pile Size (125 sq min)", "Min/Max pile height", "Solid Blocking @ joist mid-span", "Subfloor bracing calcs", "Anchor/Braced piles", "Stainless Steel fixings to exposed, < 600mm to GL", "Subfloor ventilation (min 3500mm²/m²)", "Min 450mm crawl space", "DPC to pile < 300mm high", "Driven Piles"],
  "ICB Masonry Concrete Block": [],
  "ISF Floor slab": ["Raft Slab", "Conventional Slab", "Geotech Report", "Good Ground in accordance with NZS3604", "Producer Statement", "Ground level to FL clearance", "Check soil compaction", "Check steel placement", "Formwork secured", "SED for Drain Bridging (if applicable)"],
  "IFG Framing": ["Wall studs spacing", "Bracing installed", "Roof frame connections"],
  "ICA Cavity Wrap": [],
  "ICL Cladding": [],
  "IPB IPP Preline (Building & Plumbing)": [],
  "IPL Postline": [],
  "ITK Waterproofing": [],
  "IF Final": ["Smoke alarms fitted", "Handrails secured", "Energy compliance docs"],
};

// ------ Loading Checklists ------ //
function loadChecklist() {
  const type = document.getElementById("inspectionType").value; // Using/Accessing ...
  const container = document.getElementById("checklistContainer"); // Using/Accessing ...
  container.innerHTML = ""; // Reset the container (clear content)
  if (checklists[type]) {
    // check if there is a checklist array for the selected inspection type.
    checklists[type].forEach((item) => {
      // loop through each item in the checklist.
      container.innerHTML += `<label><input type="checkbox"> ${item}</label><br/>`; // each item has a checkbox and label
    });
  }
}
//
// ------ Q U I Z   S E C T I O N ------ //
//
// ------ Quiz Questions ------//
const quizzes = {
  beginner: [
    {
      q: "What does a footing inspection check?",
      a: "foundation",
      options: ["foundation", "roof", "walls"],
    },
    {
      q: "R-value measures:",
      a: "insulation",
      options: ["plumbing", "insulation", "strength"],
    },
  ],
  intermediate: [
    {
      q: "Minimum ceiling height in habitable rooms?",
      a: "2.4m",
      options: ["2.1m", "2.4m", "2.7m"],
    },
  ],
};
//
// ------ Quiz Form ------//
function loadQuiz() {
  const level = document.getElementById("quizLevel").value; // Using/Accessing ...
  const quizForm = document.getElementById("quizForm"); // Using/Accessing ...
  quizForm.innerHTML = ""; // clears previously shown quiz content
  if (quizzes[level]) {
    // check if quiz array available for selected level (e.g. is data available for beginner level, etc)
    quizzes[level].forEach((q, index) => {
      // Loop through each question in the selected quiz level's array.
      // 'q' is the current question object.
      // 'index' is the question's position in the array (0, 1, 2, ...).
      quizForm.innerHTML += `<p>${q.q}</p>`; // addition assignment operator used.
      q.options.forEach((opt) => {
        // loop through each answer option.
        quizForm.innerHTML += `
          <label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br/>`; // adds the radio button & labels to the form
      });
    });
  }
}
//
// ------ Quiz Results ------//
function gradeQuiz() {
  const level = document.getElementById("quizLevel").value; // Using/Accessing ...
  const form = document.forms["quizForm"]; // Using/Accessing ...
  const results = document.getElementById("quizResults"); // Using/Accessing ...
  results.innerHTML = ""; // clears existing results before showing new ones.
  if (!quizzes[level]) return; // if there is no quiz for this level, return (exits the function).
  quizzes[level].forEach((q, i) => {
    // Loops through each question for the selected level. (q = current quiz question and i= index number of the question).
    const userAnswer = form[`q${i}`]?.value || "None"; // if the user don't select anything and click submit it will say None.
    const correct = userAnswer === q.a; // check if user's answer matches the correct one.
    results.innerHTML += `
      <p>${q.q}<br> 
      Your Answer: ${userAnswer} ${correct ? "✅" : `❌ (Correct: ${q.a})`}</p>`; //  displays the question and evaluates the user's answer.
  });
  showPage("quizResultsSection");
}

// ----Class for hiding pages ---- //
function showPage(id) {
  document.querySelectorAll(".page").forEach((p) => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ----Click Events - Event Listeners ---- //
const checklistBtn = document.getElementById("btnChecklist");
const quizBtn = document.getElementById("btnQuiz");
const homeButtons = document.querySelectorAll(".btn-home");

checklistBtn.addEventListener("click", () => {
  showPage("checklistSection");
});

quizBtn.addEventListener("click", () => {
  showPage("quizSection");
});

homeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    showPage("homeSection");
  });
});

// ----Auto Set Home Page as Default on Load ----
// homeButtons.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     showPage("homeSection");
//   });
// });

// showPage("homeSection");
