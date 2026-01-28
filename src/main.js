document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок
    lucide.createIcons();

    // 2. Мобильное меню
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    function toggleMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    burger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) toggleMenu();
        });
    });

    // 3. Эффект хедера и Reveal при скролле
    const header = document.querySelector('.header');
    const reveals = document.querySelectorAll('.reveal');

    function handleScroll() {
        // Хедер
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        // Анимация появления
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Запуск при загрузке

    // 4. Hero Анимация (Текст и Мышь)
    const title = document.getElementById('hero-title');
    if (title) {
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    }

    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        const circles = document.querySelectorAll('.hero__circle');
        circles.forEach((c, i) => {
            c.style.transform = `translate(${moveX * (i + 1)}px, ${moveY * (i + 1)}px)`;
        });
    });

    // 5. Слайдер Блога
    const track = document.getElementById('slider-track');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (track && nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => track.scrollBy({ left: 350, behavior: 'smooth' }));
        prevBtn.addEventListener('click', () => track.scrollBy({ left: -350, behavior: 'smooth' }));
    }

    // 6. Форма контактов и Капча
    const form = document.getElementById('contact-form');
    if (form) {
        let captchaAns;
        const qElem = document.getElementById('captcha-question');
        const phoneInp = document.getElementById('user_phone');
        
        function genCaptcha() {
            const n1 = Math.floor(Math.random() * 10) + 1;
            const n2 = Math.floor(Math.random() * 10) + 1;
            captchaAns = n1 + n2;
            qElem.textContent = `${n1} + ${n2}`;
        }
        
        genCaptcha();

        phoneInp.addEventListener('input', (e) => e.target.value = e.target.value.replace(/\D/g, ''));

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const userAns = parseInt(document.getElementById('captcha-answer').value);
            const resp = document.getElementById('form-response');
            
            if (userAns !== captchaAns) {
                resp.className = 'form-response error';
                resp.textContent = 'Неверно! Попробуйте еще раз.';
                genCaptcha();
                return;
            }

            const btn = form.querySelector('button');
            btn.disabled = true;
            btn.textContent = 'Отправка...';

            setTimeout(() => {
                resp.className = 'form-response success';
                resp.textContent = 'Успешно отправлено!';
                form.reset();
                genCaptcha();
                btn.disabled = false;
                btn.textContent = 'Запросить доступ';
            }, 1500);
        });
    }

    // 7. Cookie Popup Logic
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieBtn = document.getElementById('cookie-accept');

    if (!localStorage.getItem('yield_cookies_accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('visible');
        }, 2000);
    }

    cookieBtn.addEventListener('click', () => {
        localStorage.setItem('yield_cookies_accepted', 'true');
        cookiePopup.classList.remove('visible');
    });
});