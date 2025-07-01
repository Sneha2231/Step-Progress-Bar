const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progress-bar");
const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options-box");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const questions = [
  {
    question: "👉 What does HTML stand for?",
    options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Mark Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "👉 What is the role of CSS in front-end development?",
    options: ["Structure content", "Style content", "Add interactivity"],
    answer: "Style content"
  },
  {
    question: "👉 Difference between let, var, and const?",
    options: ["They all are same", "Scope and reassignment differences", "Used in different browsers"],
    answer: "Scope and reassignment differences"
  },
  {
    question: "👉 What is responsive design?",
    options: ["Designs that work only on desktop", "Adapts layout to screen size", "Fixed layout forever"],
    answer: "Adapts layout to screen size"
  },
  {
    question: "👉 Which are JS front-end libraries?",
    options: ["Laravel, Flask, Django", "React, Angular, Vue", "C++, Python, Java"],
    answer: "React, Angular, Vue"
  }
];

let currentStep = 0;
let answered = false;

function updateUI() {
  steps.forEach((step, i) => step.classList.toggle("active", i <= currentStep));
  progressBar.style.width = `${(currentStep / (steps.length - 1)) * 100}%`;

  const q = questions[currentStep];
  questionBox.textContent = q.question;
  feedback.textContent = "";
  answered = false;

  // Render options
  optionsBox.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = opt;
    btn.addEventListener("click", () => checkAnswer(btn, q.answer));
    optionsBox.appendChild(btn);
  });

  prevBtn.disabled = currentStep === 0;
  nextBtn.disabled = currentStep === steps.length - 1;
}

function checkAnswer(btn, correctAnswer) {
  if (answered) return;
  answered = true;

  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent === correctAnswer) b.classList.add("correct");
  });

  if (btn.textContent === correctAnswer) {
    btn.classList.add("correct");
    feedback.textContent = " 👍🏻Correct!";
    feedback.style.color = "#ff4d4d";
  } else {
    btn.classList.add("wrong");
    feedback.textContent = "❌ Wrong Answer!";
    feedback.style.color = "#ff4d4d";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentStep < questions.length - 1) {
    currentStep++;
    updateUI();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    updateUI();
  }
});

updateUI();