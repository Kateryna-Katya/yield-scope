// Инициализация иконок Lucide
lucide.createIcons();

// Эффект хедера при скролле
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// Плавная навигация (уже работает через CSS, но добавим для контроля)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
    // Анимация появления заголовка
function initHeroAnimation() {
    const title = document.getElementById('hero-title');
    
    // Плавное появление текста
    setTimeout(() => {
        title.style.transition = 'all 0.8s ease-out';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 200);

    // Микро-движение фона за мышью
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const circles = document.querySelectorAll('.hero__circle');
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.5;
            circle.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    lucide.createIcons(); // Переинициализация для новых иконок в Hero
});
    // Функция для анимации элементов при скролле
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Вызываем один раз при загрузке, чтобы проверить видимые элементы
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    initHeroAnimation();
    lucide.createIcons();
});
    // Логика слайдера
function initSlider() {
    const track = document.getElementById('slider-track');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    if (!track || !nextBtn || !prevBtn) return;

    const scrollAmount = 350; // На сколько пикселей скроллить за раз

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    // Бесконечный скролл (опционально) или скрытие кнопок
    track.addEventListener('scroll', () => {
        const isEnd = track.scrollLeft + track.offsetWidth >= track.scrollWidth - 5;
        const isStart = track.scrollLeft <= 5;
        
        prevBtn.style.opacity = isStart ? '0.5' : '1';
        nextBtn.style.opacity = isEnd ? '0.5' : '1';
    });
}

// Обновите DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    revealOnScroll();
    initSlider(); // Добавляем инициализацию слайдера
    lucide.createIcons();
});
    // --- Логика формы и капчи ---
let captchaAnswer;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    document.getElementById('captcha-question').textContent = `${num1} + ${num2}`;
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const phoneInput = document.getElementById('user_phone');
    const responseDiv = document.getElementById('form-response');
    const submitBtn = document.getElementById('submit-btn');

    generateCaptcha();

    // Валидация телефона (только цифры)
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userAnswer = parseInt(document.getElementById('captcha-answer').value);
        
        // Проверка капчи
        if (userAnswer !== captchaAnswer) {
            responseDiv.className = 'form-response error';
            responseDiv.textContent = 'Ошибка капчи. Попробуйте еще раз.';
            generateCaptcha();
            return;
        }

        // Имитация AJAX
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        setTimeout(() => {
            responseDiv.className = 'form-response success';
            responseDiv.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
            form.reset();
            generateCaptcha();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Запросить доступ';
            
            // Скрыть сообщение через 5 секунд
            setTimeout(() => { responseDiv.style.display = 'none'; }, 5000);
        }, 1500);
    });
}

// Добавить в DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    revealOnScroll();
    initSlider();
    initContactForm(); // Инициализация формы
    lucide.createIcons();
});
});