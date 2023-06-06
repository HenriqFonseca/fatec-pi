const quizPerguntas = [
    {
        pergunta: 'QUAL A ESCALA MAIOR DE C?',
        alternativas: ['C - D - E - F# - G - A - B', 'C - D - E - F - G - A - Bb', 'C - D - E - F - G - A - B', 'C - D - Eb - F - G - A - B'],
        correta: 3,
        nivel: 1
    },
    {
        pergunta: 'QUAL A ESCALA MENOR DE G?',
        alternativas: ['G - A - Bb - C - D - Eb - F#', 'G - A - Bb - C - D - Eb - F', 'G - A - B - C - D - E - F#', 'G - A - B - C - D - E - F'],
        correta: 2,
        nivel: 1
    },
    {
        pergunta: 'INTERVALO DE TERÇA MAIOR DA NOTA G:',
        alternativas: ['A', 'C', 'B', 'C#'],
        correta: 3,
        nivel: 1
    }, 
    {
        pergunta: 'INTERVALO DE SEXTA MENOR DA NOTA C#:',
        alternativas: ['A', 'G#', 'Bb', 'Db'],
        correta: 1,
        nivel: 1
    },
    {
        pergunta: 'QUAL É O ENARMÔNICO DE Bb?',
        alternativas: ['Ax', 'Ab', 'Cbb', 'Gx'],
        correta: 3,
        nivel: 2
    },
    {
        pergunta: 'INTERVALO DE SÉTIMA DIMINUTA DA NOTA D',
        alternativas: ['C', 'Db', 'C#', 'Cb'],
        correta: 4,
        nivel: 2
    },
    {
        pergunta: 'TRÍADE MAIOR DA NOTA Gb',
        alternativas: ['G - B - C', 'A - C# - E', 'Gb - B - D', 'Gb - Bb - Db'],
        correta: 4,
        nivel: 2
    },
    {
        pergunta: 'TRÍADE MENOR DA NOTA A',
        alternativas: ['A - C - E', 'A - C# - E', 'A - Cb - Eb', 'A - D - E'],
        correta: 1,
        nivel: 2
    },
    {
        pergunta: 'TRÍADE AUMENTADA DA NOTA B',
        alternativas: ['B - D - F', 'B - Dx - Fx', 'B - D# - F#', 'B - D# - Fx'],
        correta: 4,
        nivel: 3
    },
    {
        pergunta: 'TRÍADE DIMINUTA DA NOTA Eb',
        alternativas: ['Eb - G - Bb', 'Eb - G# - B', 'Eb - G - B', 'Eb - Gb - Bbb'],
        correta: 4,
        nivel: 3
    },
    {
        pergunta: 'TETRADE MAIOR COM SÉTIMA MAIOR DA NOTA F',
        alternativas: ['F - A - C - Eb', 'F - A - C - E', 'F - A - C - D', 'F - G - A - C'],
        correta: 2,
        nivel: 3
    },
    {
        pergunta: 'TÉTRADE MENOR COM SEXTA MAIOR DA NOTA D',
        alternativas: ['D - F# - A - B', 'D - F - A - C', 'D - F# - A - C#', 'D - F - A - B'],
        correta: 4,
        nivel: 3
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
