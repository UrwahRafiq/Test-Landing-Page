// preloader animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const perText = document.querySelector('.percentage');
    const progressBar = document.querySelector('.progress-bar');
    const page2 = document.querySelector('#preloader-page');

    // current percentage
    let p = 0;

    // animation till page loads
    // runs code again and again with a specified time gap
    const interval = setInterval(() => {
        if (p < 100) {
            p++;
            perText.textContent = `Loading ${p}%`;
            progressBar.style.width = p + '%';
        }
        else {
            clearInterval(interval);

            // add class to swipe up
            preloader.classList.add('preloader-swipe-up');
            page2.classList.add('preloader-swipe-up');
        }
    }, 10);

    // start carsousel animation when section is in view
    // set a timer for this code to run
    setTimeout(() => {
        const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            document.querySelector('.carousel').classList.toggle('animate', entry.isIntersecting);
         });
        }, { threshold: 0.2 });

    observer.observe(document.getElementById('technologies'));
        }, 100);
});

// back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    // height of webpage - viewport height / 2 to get halfway point
    const halfway = (document.documentElement.scrollHeight - window.innerHeight) / 2;

    if(window.scrollY > halfway) {
        backToTop.classList.add('visible');
    }
    else {
        backToTop.classList.remove('visible');
    }
});

// clone content for carousel
// const carousel = document.querySelector('.carousel');
// const group = document.querySelector('.group');

// // clone and append group
// for(let i = 0; i < 6; i++) {
//     const clone = group.cloneNode(true);
//     carousel.appendChild(clone);
// }

// scroll animation for header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if(window.scrollY > 0) {
        header.classList.add('header-scrolled');
    }
    else {
        header.classList.remove('header-scrolled');
    }
});

// scrollspy 
const navLinks = document.querySelectorAll('#dropdown li a');

window.addEventListener('scroll',() => {
    // scroll position
    let s = window.scrollY + 150; //150px buffer

    if (s < 200) {
        navLinks.forEach(l => l.classList.remove('active'));
        return;
    }

    navLinks.forEach(link => {
        //                 #about               "about"
        const secID = link.getAttribute('href').substring(1);
        // looks for a section with that specific id
        const section = document.getElementById(secID);

        if (section) {
            const secTop = section.offsetTop;
            const secHeight = section.offsetHeight;

            if (s >= secTop && s < (secTop + secHeight)) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    })
});

// hero section parallax
window.addEventListener('scroll', () => {
    const heroSection = document.getElementById('bg-image');
    let scrollPos = window.scrollY;

    heroSection.style.setProperty('--y-offset', `${scrollPos * 0.5}px`);
});

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

const navButton = document.querySelector('#menu-icon');
const crossBtn = document.querySelector('#cross-icon');
const dropDown = document.getElementById('dropdown');

// toggle dropdown on click of nav button
navButton.addEventListener('click', (e) => {
    // prevents event from travelling any further up or down the DOM tree
    e.stopPropagation();
    dropDown.classList.toggle('show');
    navButton.style.display = 'none';
    crossBtn.style.display = 'block';
});

crossBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropDown.classList.remove('show');
    crossBtn.style.display = 'none';
    navButton.style.display = 'block';
});

// close dropdown when clicking a link
dropDown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        dropDown.classList.remove('show');
        crossBtn.style.display = 'none';
        navButton.style.display = 'block';
    });
});

// close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if(!navButton.contains(e.target) && !dropDown.contains(e.target)) {
        dropDown.classList.remove('show');
        crossBtn.style.display = 'none';
        navButton.style.display = 'block';
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