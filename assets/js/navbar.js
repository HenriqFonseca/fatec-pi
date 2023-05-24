const menuToggleButton = document.querySelector('#menu-toggle');
const menuToggleIcon = document.querySelector('#menu-toggle-icon')
const linksWrapper = document.querySelector('#links-wrapper');

menuToggleButton.addEventListener('click', () => {
    linksWrapper.classList.toggle('menu-open');
    menuToggleIcon.innerText = menuToggleIcon.innerText == 'menu' ? 'close' : 'menu';
})