const seletoresTexto = [ 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

let zoom = 0;

function aumentarTexto(){
    mudarTamanhoSeletores(4);
    
}

function diminuirTexto(){
    mudarTamanhoSeletores(-4);
}

const mudarTamanhoSeletores = (quantidade) => {
    zoom = quantidade > 0 ? zoom+=1 : zoom-=1;

    if(zoom > 2) zoom = 2;
    else if(zoom < -2) zoom = -2;


    if(zoom != 2 && zoom != -2){
        seletoresTexto.forEach((seletor) => {
            const seletorElemento = document.querySelectorAll(seletor);
            seletorElemento.forEach((elemento) => {
                let tamanhoComputado = parseFloat(window.getComputedStyle(elemento, null).getPropertyValue('font-size').replace('px', ''))
                elemento.style.fontSize = (tamanhoComputado + quantidade) + 'px';
            })
        })
    }
}

function ferramentaAcessibilidade(ferramenta){
    switch(ferramenta){
        case 'aumentar-texto':
            aumentarTexto();
            break;
        case 'diminuir-texto':
            diminuirTexto();
            break;
    }
    
}

// Criação do elemento de ferramentas de acessibilidade no body

let acessibilityToolElement = document.createElement('div');
acessibilityToolElement.id = 'acessibilidade-card';

acessibilityToolElement.innerHTML = `
<img src="../assets/img/acessibilidade.png" class="icon">
<button onclick="ferramentaAcessibilidade('aumentar-texto')">+A</button>
<button onclick="ferramentaAcessibilidade('diminuir-texto')">-A</button>
`;

document.body.appendChild(acessibilityToolElement);