const questions = [
    { question: 'Which HTML tag is best for creating a clickable link to another webpage?', options: ['<a>', '<link>', '<href>', '<url>'], correct: 0 },
    { question: 'In a basic webpage, which language is primarily used to define the structure and content of the page?', options: ['HTML', 'CSS', 'JavaScript', 'Python'], correct: 0 },
    { question: 'In CSS, which property is used to change the text color of an element?', options: ['color', 'text-color', 'font-color', 'background-color'], correct: 0 },
    { question: 'Which of the following is the best place to add a small JavaScript snippet that should run after the page content has loaded?', options: ['<head>', '<body>', '<footer>', '<header>'], correct: 1 },
    { question: 'What does the HTML <img> tag need in order to display an image from a file?', options: ['src', 'alt', 'title', 'width'], correct: 0 },
    // Add 5 more for 10 total questions
    { question: 'In CSS, what does the font-size property control?', options: ['The size of the text', 'The color of the text', 'The spacing between lines', 'The style of the text'], correct: 0 },
    { question: 'Which JavaScript statement is used to display a message in the browser’s console for debugging?', options: ['console.log()', 'console.print()', 'console.display()', 'console.show()'], correct: 0 },
    { question: 'In HTML, which tag is most appropriate for the main heading of a page?', options: ['<h1>', '<h2>', '<h3>', '<h4>'], correct: 0 },
    { question: 'Which CSS selector will apply styles to all <p> elements on a page?', options: ['p', 'h1', 'div', 'span'], correct: 0 },
    { question: 'Python is a?', options: ['Bird', 'Snake', 'Programming Language', 'Fruit'], correct: 2 }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const elements = {
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    nextBtn: document.getElementById('next-btn'),
    feedback: document.getElementById('feedback'),
    scoreEl: document.getElementById('score'),
    questionCounter: document.getElementById('question-counter'),
    progressFill: document.getElementById('progress-fill'),
    quizContent: document.getElementById('quiz-content'),
    endScreen: document.getElementById('end-screen'),
    finalScore: document.getElementById('final-score'),
    finalFeedback: document.getElementById('final-feedback'),
    restartBtn: document.getElementById('restart-btn')
};

function loadQuestion() {
    const q = questions[currentQuestion];
    elements.questionText.textContent = q.question;
    elements.optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option');
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        elements.optionsContainer.appendChild(btn);
    });
    elements.nextBtn.disabled = true;
    elements.feedback.textContent = '';
    elements.feedback.className = 'feedback';
    updateHUD();
}

function selectAnswer(index) {
    if (selectedAnswer !== null) return;
    selectedAnswer = index;
    const q = questions[currentQuestion];
    Array.from(elements.optionsContainer.children).forEach((opt, i) => {
        if (i === q.correct) opt.classList.add('correct');
        else if (i === index && index !== q.correct) opt.classList.add('incorrect');
    });
    if (index === q.correct) {
        score++;
        elements.feedback.textContent = 'Correct!';
        elements.feedback.classList.add('correct');
    } else {
        elements.feedback.textContent = `Wrong! Correct is ${q.options[q.correct]}`;
        elements.feedback.classList.add('incorrect');
    }
    elements.nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    selectedAnswer = null;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showEndScreen();
    }
}

function updateHUD() {
    elements.scoreEl.textContent = `Score: ${score}`;
    elements.questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    const progress = ((currentQuestion) / questions.length) * 100;
    elements.progressFill.style.width = `${progress}%`;
}

function showEndScreen() {
    elements.quizContent.classList.add('hidden');
    elements.endScreen.classList.remove('hidden');
    elements.finalScore.textContent = `Final Score: ${score} / ${questions.length}`;
    const percentage = (score / questions.length) * 100;
    if (percentage >= 70) {
        elements.finalFeedback.textContent = 'Excellent! You aced the quiz!';
    } else if (percentage >= 50) {
        elements.finalFeedback.textContent = 'Good job! Keep practicing.';
    } else {
        elements.finalFeedback.textContent = 'Better luck next time!';
    }
}

elements.nextBtn.onclick = nextQuestion;
elements.restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    elements.endScreen.classList.add('hidden');
    elements.quizContent.classList.remove('hidden');
    loadQuestion();
};

loadQuestion(); // Start the quiz
