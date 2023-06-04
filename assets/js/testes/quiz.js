const quizPerguntas = [
    {
        pergunta: 'AS NOTAS G e Bb ESTÃO SEPARADAS PELA DISTÂNCIA DE:',
        alternativas: ['1 SEMITOM', '1 TOM', '1 TOM E MEIO', '2 TONS'],
        correta: 3,
        nivel: 1
    },
    {
        pergunta: 'O que é legal 1?',
        alternativas: ['Não sei1', 'Sei lá1', 'Pão1'],
        correta: 2,
        nivel: 2
    },
    {
        pergunta: 'O que é legal 2?',
        alternativas: ['Não sei2', 'Sei lá2', 'Pão2'],
        correta: 3,
        nivel: 3
    },
    {
        pergunta: 'O que é legal 3?',
        alternativas: ['Não sei3', 'Sei lá3', 'Pão3'],
        correta: 1,
        nivel: 2
    },
]

const numeroPerguntaEle = document.querySelector('#numero-pergunta');
const tituloPerguntaEle = document.querySelector('#quiz-pergunta');
const respostasPerguntaEle = document.querySelector('#quiz-respostas');

let numeroPerguntaAtual = 1;

function limparAreaAlternativas() {
    respostasPerguntaEle.innerHTML = '';
}

function carregarPerguntaAtual(){
    
    numeroPerguntaEle.innerText = `PERGUNTA ${numeroPerguntaAtual}`;
    
    let perguntaAtual = quizPerguntas[numeroPerguntaAtual - 1]
    
    tituloPerguntaEle.classList.remove('nivel-atual')
    tituloPerguntaEle.innerText = perguntaAtual.pergunta;

    limparAreaAlternativas();

    perguntaAtual.alternativas.forEach((alternativa, i) => {
        let botao = document.createElement('button');
        botao.classList.add('btn');
        botao.innerText = alternativa;
        botao.onclick = () => {responder(i)}
        respostasPerguntaEle.appendChild(botao)
    })
}

let certas = {1: 0, 2: 0, 3: 0};

function responder(resposta) {
    let perguntaAtual = quizPerguntas[numeroPerguntaAtual - 1]
    let nivelAtual = perguntaAtual.nivel

    if(resposta == perguntaAtual.correta - 1){
        certas[nivelAtual]++;
    } else {
        if(nivelAtual !== 3){
            for(var i = 3; i > nivelAtual; i--){
                if(certas[i] > 0){
                    certas[i]--;
                    break;
                }
            }
        }
        
    }

    proximaPergunta();
}

function proximaPergunta() {
    numeroPerguntaAtual++;

    if(numeroPerguntaAtual > quizPerguntas.length){
        return telaFinal();
    }


    carregarPerguntaAtual();
}

function telaFinal() {
    let nivelFinal;
    if(certas[1] > (certas[2] + certas[3]) / 2 || certas[1] + certas[2] + certas[3] == 0){
        nivelFinal = "Teoria 1"
    } else if(certas[2] > (certas[1] + certas[3]) / 2){
        nivelFinal = "Teoria 2"
    } else if(certas[3] > (certas[1] + certas[2]) / 2){
        nivelFinal = "Teoria 3"
    }
    
    numeroPerguntaEle.innerText = 'Seu nível é';
    tituloPerguntaEle.innerText = nivelFinal;

    tituloPerguntaEle.classList.add('nivel-atual')

    limparAreaAlternativas();
    respostasPerguntaEle.innerHTML = `
    <button class="btn" onclick="tentarNovamente()">REINICIAR TESTE</button>
    `
}

function tentarNovamente() {
    numeroPerguntaAtual = 1;
    certas = {1: 0, 2: 0, 3: 0};
    carregarPerguntaAtual();
}

window.onload = () => {
    carregarPerguntaAtual();
}
