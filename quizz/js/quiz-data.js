// Banco de dados com perguntas e respostas
const quizData = [
    {
        question: "Qual é a capital do Brasil?",
        a: "São Paulo",
        b: "Rio de Janeiro",
        c: "Brasília",
        d: "Salvador",
        correct: "c"
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        a: "Terra",
        b: "Júpiter",
        c: "Marte",
        d: "Saturno",
        correct: "b"
    },
    {
        question: "Quantos continentes existem no mundo?",
        a: "5",
        b: "6",
        c: "7",
        d: "8",
        correct: "c"
    }
];

const quiz = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const resultsEl = document.getElementById('results');
let currentQuiz = 0;
let score = 0;

// Função para carregar as perguntas
function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    
    quiz.innerHTML = `
        <div class="question">${currentQuizData.question}</div>
        <label><input type="radio" name="answer" value="a"> ${currentQuizData.a}</label><br>
        <label><input type="radio" name="answer" value="b"> ${currentQuizData.b}</label><br>
        <label><input type="radio" name="answer" value="c"> ${currentQuizData.c}</label><br>
        <label><input type="radio" name="answer" value="d"> ${currentQuizData.d}</label>
    `;
}

// Função para obter a resposta selecionada
function getSelected() {
    const answers = document.getElementsByName('answer');
    let selectedAnswer;
    answers.forEach(answer => {
        if (answer.checked) {
            selectedAnswer = answer.value;
        }
    });
    return selectedAnswer;
}

// Função para reiniciar o quiz
function restartQuiz() {
    currentQuiz = 0;
    score = 0;
    resultsEl.innerHTML = "";
    submitBtn.style.display = 'block'; // Mostra o botão de enviar novamente
    loadQuiz();
}

submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelected();
    
    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = "";
            resultsEl.innerHTML = `
                <h2>Você respondeu corretamente ${score} de ${quizData.length} perguntas.</h2>
                <button id="restart">Recomeçar</button>
            `;
            submitBtn.style.display = 'none'; // Esconde o botão de enviar quando o quiz termina
            
            // Adiciona evento ao botão de recomeçar
            const restartBtn = document.getElementById('restart');
            restartBtn.addEventListener('click', restartQuiz);
        }
    }
});

// Carregar o primeiro quiz
loadQuiz();
