const checklists = {
  footing: [
    "Check soil compaction",
    "Check steel placement",
    "Formwork secured",
  ],
  framing: [
    "Wall studs spacing",
    "Bracing installed",
    "Roof frame connections",
  ],
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
  const level = document.getElementById("quizLevel").value;
  const quizForm = document.getElementById("quizForm");
  quizForm.innerHTML = "";
  if (quizzes[level]) {
    quizzes[level].forEach((q, index) => {
      quizForm.innerHTML += `<p>${q.q}</p>`;
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
      Your Answer: ${userAnswer} ${
      correct ? "✅" : `❌ (Correct: ${q.a})`
    }</p>`;
  });
  showPage("quizResultsSection");
}

function showPage(id) {
  document.querySelectorAll(".page").forEach((p) => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const checklistBtn = document.getElementById("btnChecklist");
  const quizBtn = document.getElementById("btnQuiz");

  checklistBtn.addEventListener("click", () => {
    showPage("checklistSection");
  });

  quizBtn.addEventListener("click", () => {
    showPage("quizSection");
  });
});
