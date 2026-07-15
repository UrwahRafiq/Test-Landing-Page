const navButton = document.querySelector('#nav-toggle');
const dropDown = document.querySelector('#dropdown');

navButton.addEventListener('click', () => {
    dropDown.classList.toggle('show');
});