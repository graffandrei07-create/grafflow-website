document.addEventListener('DOMContentLoaded', () => {

    // BURGER MENU
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // SERVICE CARDS
    document.querySelectorAll('.service-card[data-filter]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = card.dataset.filter;
            const portfolioSection = document.getElementById('portfolio');
            document.querySelectorAll('.category-tile').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.filter === filter) btn.classList.add('active');
            });
            document.querySelectorAll('.portfolio-card').forEach(pc => {
                if (filter === 'all' || pc.dataset.category === filter) {
                    pc.classList.remove('hidden');
                } else {
                    pc.classList.add('hidden');
                }
            });
            portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // PORTFOLIO CATEGORY TILES
    const categoryTiles = document.querySelectorAll('.category-tile');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    categoryTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            categoryTiles.forEach(t => t.classList.remove('active'));
            tile.classList.add('active');
            const filter = tile.dataset.filter;
            portfolioCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ROI CALCULATOR
    const calcBtn = document.getElementById('calcBtn');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const revenue = parseFloat(document.getElementById('revenue').value) || 0;
            const clients = parseFloat(document.getElementById('clients').value) || 0;
            const conversion = parseFloat(document.getElementById('conversion').value) || 0;
            const visitors = parseFloat(document.getElementById('visitors').value) || 0;
            const currentIncome = revenue * clients;
            const potentialClients = Math.floor(visitors * (conversion / 100));
            const potentialIncome = revenue * potentialClients;
            const loss = potentialIncome - currentIncome;
            const lossYear = loss * 12;
            document.getElementById('lossMonth').textContent = loss > 0 ? loss.toLocaleString('ru-RU') + ' ₽' : '0 ₽';
            document.getElementById('lossYear').textContent = lossYear > 0 ? lossYear.toLocaleString('ru-RU') + ' ₽' : '0 ₽';
            document.getElementById('potentialIncome').textContent = potentialIncome.toLocaleString('ru-RU') + ' ₽';
        });
    }

    // QUIZ
    const quizSteps = document.querySelectorAll('.quiz__step');
    const quizResult = document.getElementById('quizResult');
    const quizResultText = document.getElementById('quizResultText');
    const quizProgress = document.getElementById('quizProgress');
    let currentStep = 1;
    const totalSteps = 5;
    const answers = {};

    quizSteps.forEach(step => {
        step.querySelectorAll('.quiz__option').forEach(option => {
            option.addEventListener('click', () => {
                const stepNum = parseInt(step.dataset.step);
                answers[stepNum] = option.dataset.value;
                step.classList.remove('active');
                currentStep++;
                if (currentStep <= totalSteps) {
                    document.querySelector('[data-step="' + currentStep + '"]').classList.add('active');
                } else {
                    showQuizResult();
                }
                quizProgress.style.width = (currentStep / totalSteps * 100) + '%';
            });
        });
    });

    function showQuizResult() {
        quizResult.classList.add('active');
        let result = '';
        if (answers[1] === 'sell' && answers[3] === 'yes') {
            result = 'Вам подойдёт интернет-магазин с интеграцией CRM.';
        } else if (answers[1] === 'sell') {
            result = 'Рекомендую лендинг с формой заявки и калькулятором.';
        } else if (answers[1] === 'info') {
            result = 'Корпоративный сайт с блогом — лучший вариант.';
        } else if (answers[1] === 'brand') {
            result = 'Брендбук + лендинг создадут сильный фирменный стиль.';
        } else {
            result = 'Многостраничный сайт с формами сбора заявок.';
        }
        if (answers[4] === 'low') {
            result += ' При бюджете до 30 000 ₽ оптимален лендинг.';
        } else if (answers[4] === 'mid') {
            result += ' Бюджет 30-100 тыс. позволяет индивидуальный дизайн.';
        } else {
            result += ' С бюджетом 100+ тыс. можно реализовать премиум.';
        }
        quizResultText.textContent = result;
    }

    // CONTACT FORM
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            formSuccess.classList.add('active');
        });
    }

    // FAQ ACCORDION
    document.querySelectorAll('.faq__question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });

    // COOKIE BANNER
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    if (cookieBanner && cookieAccept) {
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieBanner.classList.add('active');
        }
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('active');
        });
    }

    // THEME TOGGLE
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') document.body.classList.add('light');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light');
            localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
        });
    }

    // TYPING ANIMATION
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        const words = ['цифровые продукты', 'сайты', 'брендбуки', 'дашборды', 'презентации'];
        let wordIndex = 0, charIndex = 0, isDeleting = false;

        function typeWriter() {
            const current = words[wordIndex];
            if (isDeleting) {
                typingElement.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }
            let delay = isDeleting ? 50 : 100;
            if (!isDeleting && charIndex === current.length) { delay = 2000; isDeleting = true; }
            else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 500; }
            setTimeout(typeWriter, delay);
        }
        typeWriter();
    }

    // TELEGRAM CHAT
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    if (chatToggle && chatWindow && chatClose) {
        chatToggle.addEventListener('click', () => chatWindow.classList.toggle('active'));
        chatClose.addEventListener('click', () => chatWindow.classList.remove('active'));
    }

    // CALLBACK MODAL
    const callbackBtn = document.getElementById('callbackBtn');
    const callbackModal = document.getElementById('callbackModal');
    const callbackClose = document.getElementById('callbackClose');
    const callbackForm = document.getElementById('callbackForm');

    if (callbackBtn && callbackModal && callbackClose && callbackForm) {
        callbackBtn.addEventListener('click', () => callbackModal.classList.add('active'));
        callbackClose.addEventListener('click', () => callbackModal.classList.remove('active'));
        callbackModal.addEventListener('click', (e) => { if (e.target === callbackModal) callbackModal.classList.remove('active'); });

        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо! Мы перезвоним вам!');
            callbackModal.classList.remove('active');
            callbackForm.reset();
        });
    }

    // PROMO MODAL
    const promoModal = document.getElementById('promoModal');
    const promoClose = document.getElementById('promoClose');
    if (promoModal && promoClose) {
        if (!localStorage.getItem('promoShown')) {
            setTimeout(() => { promoModal.classList.add('active'); }, 8000);
        }
        promoClose.addEventListener('click', () => {
            promoModal.classList.remove('active');
            localStorage.setItem('promoShown', 'true');
        });
        promoModal.addEventListener('click', (e) => {
            if (e.target === promoModal) {
                promoModal.classList.remove('active');
                localStorage.setItem('promoShown', 'true');
            }
        });
    }

    // PROMO TIMER
    const timerKey = 'promoTimerStart';
    if (!localStorage.getItem(timerKey)) localStorage.setItem(timerKey, Date.now());
    const startTime = parseInt(localStorage.getItem(timerKey));
    const endTime = startTime + 7 * 24 * 60 * 60 * 1000;

    function updateTimer() {
        const now = Date.now();
        const diff = Math.max(0, endTime - now);
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        const daysEl = document.getElementById('timerDays');
        const hoursEl = document.getElementById('timerHours');
        const minutesEl = document.getElementById('timerMinutes');
        const secondsEl = document.getElementById('timerSeconds');
        if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
    }
    updateTimer();
    setInterval(updateTimer, 1000);

    // CHECKLIST BANNER
    const checklistBanner = document.getElementById('checklistBanner');
    const checklistClose = document.getElementById('checklistClose');
    const checklistForm = document.getElementById('checklistForm');

    if (checklistBanner && checklistClose && checklistForm) {
        if (!localStorage.getItem('checklistDismissed')) {
            setTimeout(() => checklistBanner.classList.add('active'), 5000);
        }
        checklistClose.addEventListener('click', () => {
            checklistBanner.classList.remove('active');
            localStorage.setItem('checklistDismissed', 'true');
        });
        checklistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Чек-лист отправлен на вашу почту!');
            checklistBanner.classList.remove('active');
            localStorage.setItem('checklistDismissed', 'true');
        });
    }

    // HEADER SCROLL EFFECT
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });

    // SCROLL TO TOP
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // SCROLL ANIMATIONS
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .pricing-card, .timeline__item, .category-tile').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.classList.contains('service-card') || this.classList.contains('portfolio-card')) return;
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
