const btnTocar = document.querySelector('#btn-tocar');

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

btnTocar.addEventListener('click', async () => {    

    btnTocar.innerHTML = `<span class="material-symbols-outlined">pause_circle</span> TOCANDO`;
    btnTocar.classList.add('playing');
    
    await playNote(currentNote);
    
    btnTocar.innerHTML = `<span class="material-symbols-outlined">play_circle</span> TOCAR`;
    btnTocar.classList.remove('playing');
})

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

function unselectAllNotes() {
    for(let noteElement of notesElement){
        noteElement.classList.remove('selected');
    }
}

let rightAnswers = 0;
let level = 1;
let wrongAnswers = 0;

function selectNote(element){
    unselectAllNotes();
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

    level++;
}

function rightAnswer() {
    alert('right')

    rightAnswers++;   
}

function wrongAnswer() {
    wrongAnswers++;
}