const navButton = document.getElementById('nav-toggle');
const dropDown = document.getElementById('dropdown');

// toggle dropdown on click of nav button
navButton.addEventListener('click', (e) => {
    e.stopPropagation();
    dropDown.classList.toggle('show');
    console.log('clicked');
});

// close dropdown when clicking a link
dropDown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        dropDown.classList.remove('show');
    });
});

// close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if(!navButton.contains(e.target) && !dropDown.contains(e.target)) {
        dropDown.classList.remove('show');
    }
});

// Initialize AOS (Animate On Scroll) Lib
document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
});