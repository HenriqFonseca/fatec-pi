const atividadesSlides = [
    {
        titulo: 'APRESENTAÇÕES',
        desc: 'Recorrentemente fazemos apresentações com os nossos alunos, formando diversos tipos de bandas personalizadas para cada nível musical.', 
        imgFile: 'apresentacoes.jpg'
    },
    {
        titulo: 'RECITAIS',
        desc: 'Evolua de forma prática através de nossos recitais', 
        imgFile: 'recitais.jpg'
    },
    {
        titulo: 'AUDIÇÕES',
        desc: 'Realize audições e coloque em prática suas habilidades', 
        imgFile: 'audicoes.jpg'
    }
]

let currentSlide = 1;

const showroomElement = document.querySelector('.atividades-showroom');
const tituloElement = document.querySelector('#atividades-titulo');
const descElement = document.querySelector('#atividades-desc');

const imgsPath = "/assets/img/index/atividades-praticas"; 

window.onload = () => { mostrarSlideAtual() }

setInterval(passarSlide, 10000)

function passarSlide() {
    if(currentSlide > atividadesSlides.length){
        currentSlide = 1;
    }

    mostrarSlideAtual()

    currentSlide++;
}

function mostrarSlideAtual() {
    let actualSlideObject = atividadesSlides[currentSlide - 1];
    tituloElement.innerText = actualSlideObject.titulo;
    descElement.innerText = actualSlideObject.desc;
    showroomElement.style.backgroundImage = `url(${imgsPath}/${actualSlideObject.imgFile})`;
}