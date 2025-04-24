const bookSelection = document.getElementById("book-selection");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

let current = 0;
let score = 0;
let currentQuiz = [];

const quizzes = {
  "Romeo and Juliet": [
    {
      question: "Where is Romeo and Juliet set?",
      options: ["London", "Verona", "Paris", "Dublin"],
      answer: "Verona"
    },
    {
      question: "Who is Juliet’s cousin?",
      options: ["Romeo", "Tybalt", "Benvolio", "Mercutio"],
      answer: "Tybalt"
    }
  ],
  "Sense and Sensibility": [
    {
      question: "Who wrote Sense and Sensibility?",
      options: ["Jane Austen", "Emily Brontë", "Charles Dickens", "Louisa May Alcott"],
      answer: "Jane Austen"
    },
    {
      question: "What theme is explored in the novel?",
      options: ["Industrial Revolution", "Emotional restraint vs passion", "Gothic horror", "Detective mystery"],
      answer: "Emotional restraint vs passion"
    }
  ]
};

function loadBookChoices() {
  const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];

  if (bookshelf.length === 0) {
    bookSelection.innerHTML = "<p>You have no books in your library yet.</p>";
    return;
  }

  bookshelf.forEach(book => {
    const card = document.createElement("div");
    card.className = "book";
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}" />
      <h2>${book.title}</h2>
      <button onclick="startQuiz('${book.title}')">Take Quiz</button>
    `;
    bookSelection.appendChild(card);
  });
}

window.startQuiz = function(title) {
  if (!quizzes[title]) {
    alert("No quiz available for this book yet!");
    return;
  }

  currentQuiz = quizzes[title];
  current = 0;
  score = 0;

  bookSelection.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  scoreEl.classList.add("hidden");

  showQuestion();
};

function showQuestion() {
  const q = currentQuiz[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      if (option === q.answer) score++;
      nextBtn.classList.remove("hidden");
      [...optionsEl.children].forEach(b => b.disabled = true);
      btn.style.backgroundColor = option === q.answer ? "green" : "red";
    };
    optionsEl.appendChild(btn);
  });
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < currentQuiz.length) {
    showQuestion();
    nextBtn.classList.add("hidden");
  } else {
    questionEl.textContent = "Quiz Finished!";
    optionsEl.innerHTML = "";
    nextBtn.classList.add("hidden");
    scoreEl.classList.remove("hidden");
    scoreEl.textContent = `Your score: ${score} / ${currentQuiz.length}`;
  }
});

loadBookChoices();
