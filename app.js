const navButton = document.getElementById('nav-toggle');
const dropDown = document.getElementById('dropdown');

navButton.addEventListener('click', () => {
    dropDown.classList.toggle('show');
    console.log('clicked');
});