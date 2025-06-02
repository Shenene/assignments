// ------ C H E C K L I S T   S E C T I O N ------ //
const checklists = {
  footing: ["Check soil compaction", "Check steel placement", "Formwork secured"],
  framing: ["Wall studs spacing", "Bracing installed", "Roof frame connections"],
  final: ["Smoke alarms fitted", "Handrails secured", "Energy compliance docs"],
};

function loadChecklist() {
  const type = document.getElementById("inspectionType").value;
  const container = document.getElementById("checklistContainer");
  container.innerHTML = "";
  if (checklists[type]) {
    checklists[type].forEach((item) => {
      container.innerHTML += `<label><input type="checkbox"> ${item}</label><br/>`;
    });
  }
}

// ------ Q U I Z   S E C T I O N ------ //

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

function loadQuiz() {
  const level = document.getElementById("quizLevel").value; // Using / Accessing ...
  const quizForm = document.getElementById("quizForm"); // Using / Accessing ...
  quizForm.innerHTML = ""; // clears previously shown quiz content
  if (quizzes[level]) {
    // check if quiz array available for selected level (e.g. is data available for beginner level, etc)
    quizzes[level].forEach((q, index) => {
      // Loop through each question in the selected quiz level's array.
      // 'q' is the current question object.
      // 'index' is the question's position in the array (0, 1, 2, ...).
      // This block runs once per question to render it and its answer options.
      quizForm.innerHTML += `<p>${q.q}</p>`; // addition assignment operator used.
      q.options.forEach((opt) => {
        quizForm.innerHTML += `
          <label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br/>`;
      });
    });
  }
}

function gradeQuiz() {
  const level = document.getElementById("quizLevel").value;
  const form = document.forms["quizForm"];
  const results = document.getElementById("quizResults");
  results.innerHTML = "";
  if (!quizzes[level]) return;
  quizzes[level].forEach((q, i) => {
    const userAnswer = form[`q${i}`]?.value || "None";
    const correct = userAnswer === q.a;
    results.innerHTML += `
      <p>${q.q}<br>
      Your Answer: ${userAnswer} ${correct ? "✅" : `❌ (Correct: ${q.a})`}</p>`;
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
