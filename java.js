// Menu hambúrguer
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax no scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.image-background');
    if (background) {
        background.style.transform = `rotate(-5deg) translateY(${scrolled * 0.1}px)`;
    }
});

// Redirecionamento com notificação
function redirectToLink(url) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            window.open(url, '_blank');
        }, 1000);
    } else {
        window.open(url, '_blank');
    }
}

// Linha do tempo aleatória
function activateRandomDot() {
    const dots = document.querySelectorAll('.timeline-dot');
    dots.forEach(dot => dot.classList.remove('active'));
    const randomIndex = Math.floor(Math.random() * dots.length);
    if (dots[randomIndex]) {
        dots[randomIndex].classList.add('active');
    }
}
setInterval(activateRandomDot, 3000);
activateRandomDot();

// Carrossel da timeline
let currentSlide = 0;
const timeline = document.getElementById('timelineItems');
const items = document.querySelectorAll('.timeline-item');
const totalItems = items.length;
const itemsPerView = window.innerWidth > 768 ? 3 : 1;
const maxSlides = Math.ceil(totalItems / itemsPerView) - 1;

function createIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i <= maxSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.onclick = () => goToSlide(i);
        indicatorsContainer.appendChild(indicator);
    }
}

function goToSlide(slideIndex) {
    currentSlide = Math.max(0, Math.min(maxSlides, slideIndex));
    const itemWidth = items[0].offsetWidth + 20;
    const offset = -currentSlide * itemWidth * itemsPerView;
    timeline.style.transform = `translateX(${offset}px)`;
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function scrollCarousel(direction) {
    const newSlide = currentSlide + direction;
    goToSlide(newSlide);
}

// Suporte para touch
const container = document.querySelector('.timeline-container');
let startX = 0;
let endX = 0;

if (container) {
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) scrollCarousel(1);
            else scrollCarousel(-1);
        }
    });
}

// Inicialização
window.addEventListener('load', () => {
    createIndicators();
    goToSlide(0);
});
window.addEventListener('resize', () => {
    createIndicators();
    goToSlide(0);
});


const toggle = document.getElementById("toggle-mode");

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", toggle.checked);
});







