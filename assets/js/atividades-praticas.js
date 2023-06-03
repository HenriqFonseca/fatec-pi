const atividades = document.querySelectorAll('.atividades > .atividade');
const answerPadding = 20; // px

// questions.forEach((question, i)=> {

//     let questionElement = question.children[0];
//     let answerElement = question.children[1]

//     questionElement.onclick = () => {
//         removeActiveFromAll();
//         question.classList.add('active');

//         let answerElementHeight = answerElement.style.height;

//         if(answerElementHeight == 0){
//             answerElement.style.height = answerElement.scrollHeight + 'px'
//         } else {
//             answerElement.style.height = ''
//         }
//     }
// })

// function removeActiveFromAll() {
//     questions.forEach((question) => {
//         question.classList.remove('active')
//     })
// }

let contador = 0;

window.onload = () => {
    setActive(atividades[contador])

    contador++;
}

const changeElement = () => {
    if(contador > atividades.length - 1){
        contador = 0; 
    }

    setActive(atividades[contador]);
    contador++;
}

let changeElementInterval = setInterval(() => {
   changeElement();
}, 7000)


atividades.forEach((atividade, i) => {
    const nomeAtividade = atividade.children[0];

    nomeAtividade.onclick = () => {
        setActive(atividade, i);
    }
})

function setActive(element, index) {
   
    removeActiveFromAll();

    element.classList.add('active');

    const descAtividade = element.children[1];

    if(index !== undefined) {
        clearInterval(changeElementInterval);
        changeElementInterval = setInterval(changeElement, 7000)
        
        if(index == contador - 1){
            descAtividade.style.height = descAtividade.scrollHeight + 'px';
            return -1
        }

        contador = index + 1;
    }

    descAtividade.style.height = descAtividade.scrollHeight + answerPadding +  'px';
}

function removeActiveFromAll() {
    atividades.forEach((atividade) => {
        atividade.classList.remove('active')
        const descAtividade = atividade.children[1];
        descAtividade.style.height = '';
        
    })
}
