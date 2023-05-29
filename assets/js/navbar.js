/* Responsive menu */

const menuToggleButton = document.querySelector('#menu-toggle');
const menuToggleIcon = document.querySelector('#menu-toggle-icon')
const linksWrapper = document.querySelector('#links-wrapper');

menuToggleButton.addEventListener('click', () => {
    linksWrapper.classList.toggle('menu-open');
    menuToggleIcon.innerText = menuToggleIcon.innerText == 'menu' ? 'close' : 'menu';
})

/* Change background color when navbar is out of position */

const navbarElement = document.querySelector('.navbar');

document.addEventListener('scroll', (e) => {
    
    let top = (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0);

    navbarElement.style.background = top > 120 ? 'rgba(0, 0, 0, .5)' : 'rgba(0, 0, 0, 0)';
    navbarElement.style.backdropFilter = top > 120 ? 'blur(40px)' : 'blur(0)';
})