const quizTitle = document.getElementById("quiz-title");
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
    options: ["Genoa", "Verona", "Venice", "Milan"],
    answer: "Verona"
  },
  {
    question: "Who is Juliet's cousin known for his temper?",
    options: ["Romeo", "Tybalt", "Benvolio", "Mercutio"],
    answer: "Tybalt"
  },
  {
    question: "Who secretly marries Romeo and Juliet?",
    options: ["Friar Laurence", "The Nurse", "Lord Capulet", "Prince Escalus"],
    answer: "Friar Laurence"
  },
  {
    question: "How does Juliet die?",
    options: ["Poison", "Sword wound", "Dagger", "Illness"],
    answer: "Dagger"
  },
  {
    question: "What causes the fight that leads to Mercutio's death?",
    options: ["Romeo's insult", "Tybalt's challenge", "The Capulet ball", "Paris's jealousy"],
    answer: "Tybalt's challenge"
  }
],

"Sense and Sensibility": [
  {
    question: "Who wrote Sense and Sensibility?",
    options: ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "Louisa May Alcott"],
    answer: "Jane Austen"
  },
  {
    question: "Which sister represents 'sense'?",
    options: ["Elinor", "Marianne", "Margaret", "Lucy"],
    answer: "Elinor"
  },
  {
    question: "Why must the Dashwood family leave their home?",
    options: ["They are evicted by creditors", "It is inherited by a male relative", "The property is sold", "They choose to move to London"],
    answer: "It is inherited by a male relative"
  },
  {
    question: "Who breaks Marianne's heart?",
    options: ["Edward Ferrars", "John Willoughby", "Colonel Brandon", "Robert Ferrars"],
    answer: "John Willoughby"
  },
  {
    question: "What theme is strongly explored in the novel?",
    options: ["Emotional restraint vs passion", "Gothic horror", "Industrial Revolution", "Political revolution"],
    answer: "Emotional restraint vs passion"
  }
]
};

const bookTitle = localStorage.getItem("activityBook");
if (!bookTitle || !quizzes[bookTitle]) {
  quizContainer.innerHTML = "<p>Sorry, no quiz available for this book.</p>";
} else {
  quizTitle.textContent = `${bookTitle} Quiz`;
  currentQuiz = quizzes[bookTitle];
  showQuestion();
}

function showQuestion() {
  const q = currentQuiz[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  nextBtn.classList.add("hidden");

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add('option-btn');

    btn.onclick = () => {
      [...optionsEl.children].forEach(b => {
        b.disabled = true;

        if (b.textContent === q.answer) {
          b.style.backgroundColor = "green";
          b.style.color = "white";
          b.innerHTML += " ✔️"; 
        }
        else if (b === btn) {
          b.style.backgroundColor = "red";
          b.style.color = "white";
          b.innerHTML += " ❌"; 
        }
      });

      if (option === q.answer) {
        score++;
      }

      nextBtn.classList.remove("hidden");
    };

    optionsEl.appendChild(btn);
  });
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < currentQuiz.length) {
    showQuestion();
  } else {

    questionEl.textContent = "🎉 Quiz Finished!";
    optionsEl.innerHTML = "";
    nextBtn.classList.add("hidden");
    scoreEl.classList.remove("hidden");

    const percentage = (score / currentQuiz.length) * 100;
    let stars = "";
    if (percentage === 100) {
      stars = "🌟🌟🌟"; 
    } else if (percentage >= 50) {
      stars = "🌟🌟";
    } else {
      stars = "🌟"; 
    }

    scoreEl.innerHTML = `<strong>Your score:</strong> ${score} / ${currentQuiz.length} <br/> ${stars}`;
    quizContainer.style.backgroundColor = "#e7f4d8";
    quizContainer.style.transition = "background 0.5s ease";
    quizContainer.classList.add("finished");
  }
});


