// =========================================================
// script.js: CS Quiz with field selection
// Vanilla JavaScript, no libraries.
// =========================================================

// ---------------------------------------------------------
// 1. QUIZ DATA
// Each field has its own list of questions.
// Add a new field by adding a new key and an array of questions.
// ---------------------------------------------------------
const quizData = {
    "Data Structures": [
        {
            question: "Which data structure follows the Last In, First Out (LIFO) rule?",
            answers: [
                { text: "Queue", correct: false },
                { text: "Stack", correct: true },
                { text: "Linked list", correct: false },
                { text: "Tree", correct: false },
            ],
        },
        {
            question: "What is the average time complexity of a hash table lookup?",
            answers: [
                { text: "O(n)", correct: false },
                { text: "O(log n)", correct: false },
                { text: "O(1)", correct: true },
                { text: "O(n²)", correct: false },
            ],
        },
        {
            question: "Which data structure does breadth-first search (BFS) typically use?",
            answers: [
                { text: "Stack", correct: false },
                { text: "Queue", correct: true },
                { text: "Heap", correct: false },
                { text: "Hash table", correct: false },
            ],
        },
        {
            question: "What is the worst-case time complexity of quicksort?",
            answers: [
                { text: "O(n log n)", correct: false },
                { text: "O(n)", correct: false },
                { text: "O(n²)", correct: true },
                { text: "O(log n)", correct: false },
            ],
        },
        {
            question: "What is the maximum number of children a node can have in a binary tree?",
            answers: [
                { text: "1", correct: false },
                { text: "2", correct: true },
                { text: "3", correct: false },
                { text: "Unlimited", correct: false },
            ],
        },
    ],

    "Networking": [
        {
            question: "Which OSI layer is responsible for routing packets between networks?",
            answers: [
                { text: "Transport layer", correct: false },
                { text: "Data link layer", correct: false },
                { text: "Network layer", correct: true },
                { text: "Application layer", correct: false },
            ],
        },
        {
            question: "What is the default port for HTTPS?",
            answers: [
                { text: "80", correct: false },
                { text: "21", correct: false },
                { text: "443", correct: true },
                { text: "22", correct: false },
            ],
        },
        {
            question: "What is the main job of DNS?",
            answers: [
                { text: "Encrypting web traffic", correct: false },
                { text: "Translating domain names into IP addresses", correct: true },
                { text: "Assigning MAC addresses", correct: false },
                { text: "Filtering packets by content", correct: false },
            ],
        },
        {
            question: "Which transport protocol is connectionless?",
            answers: [
                { text: "TCP", correct: false },
                { text: "UDP", correct: true },
                { text: "HTTP", correct: false },
                { text: "FTP", correct: false },
            ],
        },
        {
            question: "How many usable host addresses are in a /24 network?",
            answers: [
                { text: "256", correct: false },
                { text: "255", correct: false },
                { text: "254", correct: true },
                { text: "128", correct: false },
            ],
        },
    ],

    "Web Development": [
        {
            question: "Which HTML tag creates the largest heading?",
            answers: [
                { text: "<h6>", correct: false },
                { text: "<h1>", correct: true },
                { text: "<header>", correct: false },
                { text: "<heading>", correct: false },
            ],
        },
        {
            question: "Which CSS property changes the color of text?",
            answers: [
                { text: "font-style", correct: false },
                { text: "text-align", correct: false },
                { text: "color", correct: true },
                { text: "background", correct: false },
            ],
        },
        {
            question: "What does JSON stand for?",
            answers: [
                { text: "JavaScript Object Notation", correct: true },
                { text: "Java Standard Output Network", correct: false },
                { text: "JavaScript Online Node", correct: false },
                { text: "Joined Structured Object Naming", correct: false },
            ],
        },
        {
            question: "Which JavaScript method attaches an event handler to an element?",
            answers: [
                { text: "addEventListener", correct: true },
                { text: "createElement", correct: false },
                { text: "querySelectorAll", correct: false },
                { text: "appendChild", correct: false },
            ],
        },
        {
            question: "Which HTTP method is typically used to retrieve data from a server?",
            answers: [
                { text: "POST", correct: false },
                { text: "DELETE", correct: false },
                { text: "GET", correct: true },
                { text: "PUT", correct: false },
            ],
        },
    ],

    "Artificial Intelligence": [
        {
            question: "What is machine learning?",
            answers: [
                { text: "Writing every rule by hand", correct: false },
                { text: "Systems that learn patterns from data", correct: true },
                { text: "Storing large files in the cloud", correct: false },
                { text: "A type of computer hardware", correct: false },
            ],
        },
        {
            question: "What does overfitting mean?",
            answers: [
                { text: "The model performs poorly on training data", correct: false },
                { text: "The model learns the training data too closely and generalizes poorly", correct: true },
                { text: "The model trains too quickly", correct: false },
                { text: "The model uses too little data", correct: false },
            ],
        },
        {
            question: "Why do we split data into training and test sets?",
            answers: [
                { text: "To make training faster", correct: false },
                { text: "To reduce the file size", correct: false },
                { text: "To evaluate performance on data the model has not seen", correct: true },
                { text: "To remove missing values", correct: false },
            ],
        },
        {
            question: "What is the purpose of an activation function in a neural network?",
            answers: [
                { text: "To store the training data", correct: false },
                { text: "To introduce non-linearity", correct: true },
                { text: "To count the number of layers", correct: false },
                { text: "To delete weak connections", correct: false },
            ],
        },
        {
            question: "Which metric measures the proportion of correct predictions?",
            answers: [
                { text: "Accuracy", correct: true },
                { text: "Latency", correct: false },
                { text: "Throughput", correct: false },
                { text: "Bandwidth", correct: false },
            ],
        },
    ],
};

// ---------------------------------------------------------
// 2. DOM ELEMENTS
// ---------------------------------------------------------
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const fieldGrid = document.getElementById("field-grid");
const fieldNameText = document.getElementById("field-name");
const resultFieldText = document.getElementById("result-field");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// ---------------------------------------------------------
// 3. STATE
// ---------------------------------------------------------
let selectedField = "";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// ---------------------------------------------------------
// 4. SETUP
// ---------------------------------------------------------
restartButton.addEventListener("click", showStartScreen);

// Build one button per field from the quizData keys
function buildFieldButtons() {
    fieldGrid.innerHTML = "";

    Object.keys(quizData).forEach((fieldName) => {
        const button = document.createElement("button");
        button.textContent = fieldName;
        button.classList.add("field-btn");
        button.addEventListener("click", () => startQuiz(fieldName));
        fieldGrid.appendChild(button);
    });
}

// ---------------------------------------------------------
// 5. SCREEN CONTROL
// ---------------------------------------------------------
function showScreen(screen) {
    [startScreen, quizScreen, resultScreen].forEach((s) => {
        s.classList.toggle("active", s === screen);
    });
}

function showStartScreen() {
    showScreen(startScreen);
}

// ---------------------------------------------------------
// 6. QUIZ FLOW
// ---------------------------------------------------------
function startQuiz(fieldName) {
    selectedField = fieldName;
    currentQuestions = quizData[fieldName];
    currentQuestionIndex = 0;
    score = 0;

    fieldNameText.textContent = fieldName;
    resultFieldText.textContent = fieldName;
    totalQuestionsSpan.textContent = currentQuestions.length;
    maxScoreSpan.textContent = currentQuestions.length;
    scoreSpan.textContent = score;

    showScreen(quizScreen);
    showQuestion();
}

function showQuestion() {
    answersDisabled = false;

    const current = currentQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    progressBar.style.width = (currentQuestionIndex / currentQuestions.length) * 100 + "%";
    questionText.textContent = current.question;

    answersContainer.innerHTML = "";

    current.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = String(answer.correct);
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    // Ignore extra clicks while feedback is showing
    if (answersDisabled) return;
    answersDisabled = true;

    const selectedButton = event.currentTarget;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Highlight the correct answer in green and the rest in red
    Array.from(answersContainer.children).forEach((button) => {
        button.classList.add(button.dataset.correct === "true" ? "correct" : "incorrect");
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    // Pause so the student can see the feedback, then continue
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    showScreen(resultScreen);

    progressBar.style.width = "100%";
    finalScoreSpan.textContent = score;

    const percentage = (score / currentQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect, you're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Excellent, great job!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good, keep going!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad, you can do better!";
    } else {
        resultMessage.textContent = "Keep studying, you'll get better!";
    }
}

// ---------------------------------------------------------
// 7. START
// ---------------------------------------------------------
buildFieldButtons();