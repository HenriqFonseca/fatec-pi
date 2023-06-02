const btnTocar = document.querySelector('#btn-tocar');
const btnTocarReferencia = document.querySelector('#btn-tocar-referencia');

let currentNote;

window.onload = () => {
    selectRandomNote();
}

const selectRandomNote = () => {
    let noteEntries = Object.entries(audioNotesFiles);
    let noteIndex = Math.floor(Math.random(noteEntries.length) * 10);
    randomNote = noteEntries[noteIndex];
    currentNote = randomNote[0];
}

if(btnTocarReferencia){
    btnTocarReferencia.addEventListener('click', async () => {
        btnTocarReferencia.innerHTML = `<span class="material-symbols-outlined">pause_circle</span> TOCANDO`;
        btnTocarReferencia.classList.add('playing');
        btnTocarReferencia.setAttribute('data-status', 'playing');
        disableAllNotesButtons();
        
        await playNote('a');
        
        btnTocarReferencia.innerHTML = `<span class="material-symbols-outlined">play_circle</span> TOCAR LÁ`;
        btnTocarReferencia.classList.remove('playing');
        btnTocarReferencia.setAttribute('data-status', 'play');
        ableAllNotesButtons();
    })
}

if(btnTocar){
    btnTocar.addEventListener('click', async () => {   

        if(btnTocar.getAttribute('data-status') == 'play-again'){
            restartGame();
            return -1;
        }
    
        if(btnTocar.getAttribute('data-status') == 'playing') return -1;
    
        btnTocar.innerHTML = `<span class="material-symbols-outlined">pause_circle</span> TOCANDO`;
        btnTocar.classList.add('playing');
        btnTocar.setAttribute('data-status', 'playing');
        disableAllNotesButtons();
        
        await playNote(currentNote);
        
        btnTocar.innerHTML = `<span class="material-symbols-outlined">play_circle</span> TOCAR`;
        btnTocar.classList.remove('playing');
        btnTocar.setAttribute('data-status', 'play');
        ableAllNotesButtons();
    })
    
}

const path = '../../assets/audios/notas/';

function playNote(note) {
    return new Promise(res => {
        let arquivo = audioNotesFiles[note];
        let audio = new Audio(path + arquivo);
        audio.play();
        audio.onended = res;
    })
}

const audioNotesFiles = {
    'c': 'c.wav',
    'c#': 'db.wav',
    'd': 'd.wav',
    'd#': 'eb.wav',
    'e': 'e.wav',
    'f': 'f.wav',
    'f#': 'gb.wav', 
    'g': 'g.wav',
    'g#': 'ab.wav',
    'a': 'a.wav',
    'a#': 'bb.wav',
    'b': 'b.wav' 
}

// Funcionamento das opções de notas
const notesElement = document.querySelectorAll('.notes-container > .note');

for(let noteElement of notesElement){
    noteElement.addEventListener('click', () => {
        selectNote(noteElement);
    })
}

let currentSelectedNote;

function unselectAllNotesButtons() {
    for(let noteElement of notesElement){
        noteElement.classList.remove('selected');
        noteElement.classList.remove('wrong');
        noteElement.classList.remove('right');
        noteElement.disabled = false;
    }
}

function disableAllNotesButtons() {
    for(let noteElement of notesElement){
        noteElement.disabled = 'disable';
    }
}

function ableAllNotesButtons() {
    for(let noteElement of notesElement){
        noteElement.disabled = false;
    }
}

function selectNote(element){
    let elementNote = element.getAttribute('data-note');
    
    if(elementNote == currentNote) {
        element.classList.add('right')
        rightAnswer();
    } else {
        element.classList.add('wrong')
        wrongAnswer();
    }

    currentSelectedNote = elementNote
    element.classList.add('selected');

    disableAllNotesButtons();


    // Muda o botão tocar/tocando para "jogar novamente"
    btnTocar.setAttribute('data-status', 'play-again');
    btnTocar.innerText = 'JOGAR DE NOVO';
    btnTocarReferencia.disabled = 'disable';
    
}

const testeTitle = document.querySelector('#teste-title');

function rightAnswer() {
    testeTitle.innerText = 'VOCÊ ACERTOU';
}

function wrongAnswer() {
    testeTitle.innerText = 'A NOTA NÃO ERA ESSA';
    
    for(let noteElement of notesElement){
        if(noteElement.getAttribute('data-note') == currentNote){
            noteElement.classList.add('right')
        }
    }
}

function restartGame() {
    selectRandomNote();

    testeTitle.innerText = 'QUE NOTA É ESSA?';
    unselectAllNotesButtons();

    btnTocar.innerHTML = `<span class="material-symbols-outlined">play_circle</span> TOCAR`;
    btnTocar.classList.remove('playing');
    btnTocar.setAttribute('data-status', 'play');

    btnTocarReferencia.disabled = false;
} 