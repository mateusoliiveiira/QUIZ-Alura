// Banco de dados com perguntas e respostas
const quizData = [
    {
        question: "O que é HTML?",
        a: "HTML é um software para edição de vídeos e imagens em um computador.",
        b: "HTML é uma linguagem de programação usada para criar aplicativos móveis e desktop.",
        c: "HTML (HyperText Markup Language) é uma linguagem de marcação usada para criar e estruturar o conteúdo das páginas web.",
        d: "HTML é um protocolo de comunicação usado para transmitir dados entre computadores em uma rede.",
        correct: "c"
    },
    {
        question: "O que é CSS?",
        a: "CSS é uma linguagem de programação usada para criar aplicações interativas na web.",
        b: "CSS é um sistema de gerenciamento de banco de dados usado para armazenar informações de usuários.",
        c: "CSS (Cascading Style Sheets) é uma linguagem usada para definir o estilo e a aparência de páginas web, incluindo layout, cores e fontes.",
        d: "CSS é uma ferramenta para compilar código em diferentes linguagens de programação.",
        correct: "c"
    },
    {
        question: "O que é uma variável em programação?",
        a: "Um espaço de armazenamento para dados que pode ser alterado durante a execução do programa.",
        b: "Uma variável é uma função que executa cálculos matemáticos complexos.",
        c: "Uma variável é um tipo de erro que ocorre quando o código não é escrito corretamente.",
        d: "Uma variável é uma ferramenta física usada para compilar o código-fonte.",
        correct: "a"
    },
    {
        question: "O que é um script?",
        a: "Um script é um tipo de software antivírus que protege seu computador contra malware.",
        b: "Um script é um tipo de hardware que melhora o desempenho gráfico do seu computador.",
        c: "Um script é um conjunto de instruções escritas em uma linguagem de programação que é executado por um interpretador para realizar tarefas automatizadas.",
        d: "Um script é um componente físico de um computador, como um processador ou uma placa de vídeo.",
        correct: "c"
    },
    {
        question: "Qual é a principal função de uma função em programação?",
        a: "Uma função é usada para alterar o layout de uma página web.",
        b: "Uma função é responsável por criar e gerenciar arquivos de configuração.",
        c: "Uma função é uma ferramenta para editar imagens e vídeos.",
        d: "Uma função é um bloco de código que realiza uma tarefa específica e pode ser reutilizado em diferentes partes do programa.",
        correct: "d"
    },
    {
        question: "O que é um loop em programação?",
        a: "Um loop é um comando que executa tarefas em paralelo em múltiplos computadores.",
        b: "Um loop é uma estrutura de dados que armazena grandes quantidades de texto.",
        c: "Um loop é uma estrutura de controle que permite a repetição de um bloco de código várias vezes até que uma condição seja atendida.",
        d: "Um loop é uma ferramenta que permite a visualização de gráficos e relatórios.",
        correct: "c"
    },
    {
        question: "O que é um if em programação?",
        a: "Um if é uma estrutura de controle condicional que executa um bloco de código somente se uma condição específica for verdadeira.",
        b: "Um if é uma ferramenta para desenhar gráficos em programas de visualização de dados.",
        c: "Um if é um tipo de banco de dados utilizado para armazenar informações de usuários.",
        d: "Um if é uma biblioteca de código que fornece funções matemáticas avançadas.",
        correct: "a"
    }
];

const quiz = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const resultsEl = document.getElementById('results');
let currentQuiz = 0;
let score = 0;
let userAnswers = []; // Array para armazenar as respostas do usuário

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

// Função para processar as respostas ao final do quiz
function processResults() {
    quiz.innerHTML = "";
    resultsEl.innerHTML = `
        <h2>Você respondeu corretamente ${score} de ${quizData.length} perguntas.</h2>
        <ul id="answers-summary"></ul>
        <button id="restart">Recomeçar</button>
    `;
    
    const answersSummary = document.getElementById('answers-summary');

    quizData.forEach((data, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === data.correct;
        const correctAnswerText = data[data.correct];
        const answerText = `
            <li>
                <strong>Pergunta ${index + 1}:</strong> ${data.question}<br>
                <strong>Resposta sua:</strong> <span class="${isCorrect ? 'correct' : 'incorrect'}">${data[userAnswer]}</span><br>
                <strong>Resposta correta:</strong> ${correctAnswerText}
            </li>
        `;
        answersSummary.innerHTML += answerText;
    });

    // Adiciona evento ao botão de recomeçar
    const restartBtn = document.getElementById('restart');
    restartBtn.addEventListener('click', restartQuiz);
}

// Função para reiniciar o quiz
function restartQuiz() {
    currentQuiz = 0;
    score = 0;
    userAnswers = []; // Limpa as respostas do usuário
    resultsEl.innerHTML = "";
    submitBtn.style.display = 'block'; // Mostra o botão de enviar novamente
    loadQuiz();
}

submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelected();
    
    if (selectedAnswer) {
        userAnswers.push(selectedAnswer); // Armazena a resposta do usuário
        
        if (selectedAnswer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            processResults();
            submitBtn.style.display = 'none'; // Esconde o botão de enviar quando o quiz termina
        }
    }
});

// Carregar o primeiro quiz
loadQuiz();
