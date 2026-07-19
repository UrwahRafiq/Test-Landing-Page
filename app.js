// indicator logic
const indicator = document.querySelector('.indicator');

// documentElement -> <html> tag
// total height of webpage - size of viewport
const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener('scroll', () => {

    const percentage = (scrollY / docHeight) * 100;

    indicator.style.width = percentage + '%';
});

// marquee
const marquee = document.getElementById('marquee');
marquee.innerHTML += marquee.innerHTML;

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

// testimonial Slider
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.slider-container');
    const track = document.querySelector('.slider-track');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    //functions for: 1. change active dot color
    //2. next slide
    // 3. prev slide
    // 4. auto play
    // 5. stop autoplay

    let index = 0;
    const total = testimonials.length;
    let autoplay;

    // shifts container to correct slide and updates dot color
    function updateSlider(){
        // show slide at current index [0, 1, 2] => [0%, -100%, -200%]
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide(){
        // proceed to next slide and %total resets index to 0 when at the end, creating a loop
        index = (index + 1) % total;
        updateSlider();
    }

    function prevSlide(){
        // + total is needed to ensure value stays in the positive
        index = (index - 1 + total) % total;
        updateSlider();
    }

    //execute nextSlide() function every 5s
    function startAutoplay(){
        autoplay = setInterval(nextSlide, 2000);
    }

    // prevents autoplay when user is scrolling
    function stopAutoplay(){
        clearInterval(autoplay);
    }

    // Event listeners for: dots click, button clicks, mouse enter and exit (for autoplay)
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });

    // dot's position is identified and index is set to that position
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            index = i;
            updateSlider();
            stopAutoplay();
            startAutoplay();
        })
    });

    const quoteSection = document.querySelector('#quote');

    quoteSection.addEventListener('mouseenter', stopAutoplay);
    quoteSection.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
});