// form submit
document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('inputName').value;
    const vacancy = document.getElementById('inputVacancy').value;
    const level = document.getElementById('selectLevel').value;
    const hardskills = document.getElementById('customRange1').value;
    const softskills = document.getElementById('customRange2').value;
    const pcd = document.getElementById('flexSwitchCheckPcd').value;
    const former = document.getElementById('flexSwitchCheckFormer').value;
    const comment = document.getElementById('textareaComment').value;

    const data = {
        name: name,
        vacancy: vacancy,
        level: level,
        hardskills: hardskills,
        softskills: softskills,
        pcd: pcd,
        former: former,
        comment: comment
    };

    fetch('https://httpbin.org/post', { // POST test
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            //console.log('Sucesso:', result); 
            let pcd = (data.pcd === "on") ? "Y" : "N"
            let former = (data.former === "on") ? "Y" : "N"
            let hardskills = data.hardskills + ' STARS'
            let softskills = data.softskills + ' STARS'

            let msg = "#### DATA SENT ####" + "\n"
            msg += "# NOME: " + data.name + " #\n"
            msg += "# VAGA: " + data.vacancy + " #\n"
            msg += "# NÍVEL: " + data.level + " #\n"
            msg += "# HARDSKILLS: " + hardskills + " #\n"
            msg += "# SOFTSKILLS: " + softskills + " #\n"
            msg += "# PCD: " + pcd + " #\n"
            msg += "# FORMER: " + former + " #\n"
            msg += "# COMMENT: " + data.comment + " #\n"

            alert(msg);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar os dados.');
        });
});

// ratings
const rangeInput1 = document.getElementById('customRange1');
const rangeValue1 = document.getElementById('customRangeSpan1');

const rangeInput2 = document.getElementById('customRange2');
const rangeValue2 = document.getElementById('customRangeSpan2');

rangeInput1.addEventListener('input', function () {
    const stars = '★'.repeat(this.value);
    rangeValue1.textContent = stars;
});

rangeInput2.addEventListener('input', function () {
    const stars = '★'.repeat(this.value);
    rangeValue2.textContent = stars;
});

// Data format
function formatarData() {
    const hoje = new Date();

    const diasSemana = [
        "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
        "Quinta-feira", "Sexta-feira", "Sábado"
    ];

    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const diaSemana = diasSemana[hoje.getDay()];
    const dia = hoje.getDate();
    const mes = meses[hoje.getMonth()];
    const ano = hoje.getFullYear();

    return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
}

// Insert data into HTML
document.getElementById('formatted-date').textContent = formatarData();

//click to genarate
document.getElementById('btn-suggest-ai').addEventListener('click', function (event) {

    let response = getQuestionsAI();
    document.getElementById('question').innerHTML = response.question;
    document.getElementById('keywords').innerHTML = response.keywords;
})

const questionsAi = [
    {
        question: "O que é HTML?",
        keywords: ["estrutura", "paginas web", "tags"]
    },
    {
        question: "O que é CSS e para que serve?",
        keywords: ["estilo", "layout", "design"]
    },
    {
        question: "O que é JavaScript e como ele é usado no desenvolvimento web?",
        keywords: ["interatividade", "programação", "dinâmica"]
    },
    {
        question: "Qual a diferença entre front-end e back-end?",
        keywords: ["interface", "servidor", "banco de dados"]
    },
    {
        question: "O que é um navegador web?",
        keywords: ["exibir", "sites", "interpretar"]
    }
];


function getQuestionsAI() {
    const index = Math.floor(Math.random() * questionsAi.length);
    const questionSelected = questionsAi[index];

    return questionSelected;
}