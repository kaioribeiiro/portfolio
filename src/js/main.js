// =============================================================================
// main.js — Lógica de interação do portfólio
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------------------
    // 1. TOGGLE DE TEMA (Claro / Escuro) com persistência em localStorage
    // -------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const iconSun  = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');

    function setTheme(isLight) {
        document.body.classList.toggle('light-mode', isLight);
        if (iconSun)  iconSun.style.display  = isLight ? 'block' : 'none';
        if (iconMoon) iconMoon.style.display = isLight ? 'none'  : 'block';
        try {
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
        } catch (_) {}
    }

    try {
        if (localStorage.getItem('portfolio-theme') === 'light') {
            setTheme(true);
        }
    } catch (_) {}

    themeToggleBtn?.addEventListener('click', () => {
        setTheme(!document.body.classList.contains('light-mode'));
    });

    // -------------------------------------------------------------------------
    // 2. NAVEGAÇÃO SUAVE IMEDIATA (clique nos links âncora)
    // -------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href     = this.getAttribute('href');
            const targetEl = href && href !== '#' ? document.querySelector(href) : null;

            if (!targetEl) return;

            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // -------------------------------------------------------------------------
    // 3. INTERNACIONALIZAÇÃO (PT-BR / EN)
    // -------------------------------------------------------------------------
    const translations = {
        pt: {
            'nav-home':        'HOME',
            'nav-sobre':       'SOBRE',
            'nav-projetos':    'PROJETOS',
            'nav-contato':     'CONTATO',
            'hero-subtitle':   'ENGENHEIRO DE SOFTWARE',
            'btn-projetos':    'Ver Projetos',
            'tech-title':      'TECH ARSENAL (BUT NOT LIMITED TO...)',
            'sobre-title':     'Sobre <span>Mim</span>',
            'sobre-p1':        'Sou estudante de <strong>Engenharia de Software na Jala University</strong>, com foco em desenvolvimento <strong>Backend e Full Stack</strong>, arquitetura de sistemas e <strong>Cloud Computing</strong>. Minha paixão é transformar problemas complexos em aplicações escaláveis e de alto desempenho, combinando código limpo, APIs bem estruturadas e interfaces dinâmicas.',
            'sobre-p2':        'Na prática, desenvolvo e testo soluções ponta a ponta utilizando <strong>Java (Spring Boot)</strong>, <strong>C#</strong>, <strong>Python</strong>, <strong>JavaScript</strong>, <strong>React</strong> e bancos de dados <strong>SQL</strong>, além de atuar com construção e automação de testes de <strong>APIs REST</strong>. Também exploro infraestrutura moderna com <strong>Docker</strong> e serviços da <strong>AWS</strong> para compreender todo o ciclo de vida, integração e deploy das aplicações.',
            'sobre-p3':        'Movido por disciplina e aprendizado contínuo, aprimoro constantemente meu inglês e minhas habilidades de comunicação, organização e trabalho em equipe, buscando oportunidades para agregar valor em projetos reais de engenharia de software. Quando não estou programando, gosto de jogar futebol e assistir animes — atividades que mantêm meu equilíbrio, foco e criatividade.',
            'stat1-title':     'Arquitetura & Clean Code',
            'stat1-desc':      'Boas Práticas & Escalabilidade',
            'stat2-title':     'Full Stack & Cloud',
            'stat2-desc':      'APIs REST, Docker & AWS',
            'stat3-title':     'Qualidade & Performance',
            'stat3-desc':      'Soluções Rápidas & Testáveis',
            'projetos-title':  'Meus <span>Projetos</span>',
            'proj1-badge':     'QA & Testes Automatizados de API',
            'proj1-title':     'Condo Garcia — Gestão de Manutenção Condominial',
            'proj1-desc':      'Neste projeto, atuei na Engenharia de Qualidade de Software (QA) e na automação de testes de API de uma plataforma completa voltada para conectar moradores, síndicos, prestadores de serviço e administradores.',
            'proj2-title':     'Em Construção',
            'proj2-desc':      'Outro projeto focado em performance e arquitetura robusta. Em breve os detalhes completos do repositório estarão disponíveis.',
            'contato-title':   'Entre em <span>Contato</span>',
            'contato-subtitle':'Sinta-se à vontade para me mandar uma mensagem para conversarmos sobre tecnologia, projetos ou oportunidades.',
            'footer-text':     '&copy; 2026 Kaio Ribeiro. Todos os direitos reservados.',
        },
        en: {
            'nav-home':        'HOME',
            'nav-sobre':       'ABOUT',
            'nav-projetos':    'PROJECTS',
            'nav-contato':     'CONTACT',
            'hero-subtitle':   'SOFTWARE ENGINEER',
            'btn-projetos':    'View projects',
            'tech-title':      'TECH ARSENAL (BUT NOT LIMITED TO...)',
            'sobre-title':     'About <span>Me</span>',
            'sobre-p1':        'I am a <strong>Software Engineering student at Jala University</strong>, focused on <strong>Backend and Full Stack</strong> development, systems architecture, and <strong>Cloud Computing</strong>. My passion is turning complex problems into scalable, high-performance applications by combining clean code, well-structured APIs, and dynamic interfaces.',
            'sobre-p2':        'In practice, I build and test end-to-end solutions using <strong>Java (Spring Boot)</strong>, <strong>C#</strong>, <strong>Python</strong>, <strong>JavaScript</strong>, <strong>React</strong>, and <strong>SQL</strong> databases, alongside building and automating tests for <strong>REST APIs</strong>. I also explore modern infrastructure with <strong>Docker</strong> and <strong>AWS</strong> services to understand the full application lifecycle, integration, and deployment.',
            'sobre-p3':        'Driven by discipline and continuous learning, I constantly sharpen my English and my communication, organization, and teamwork skills, seeking opportunities to add real value to software engineering projects. When I\'m not coding, I enjoy playing soccer and watching anime — activities that keep my balance, focus, and creativity sharp.',
            'stat1-title':     'Architecture & Clean Code',
            'stat1-desc':      'Best Practices & Scalability',
            'stat2-title':     'Full Stack & Cloud',
            'stat2-desc':      'REST APIs, Docker & AWS',
            'stat3-title':     'Quality & Performance',
            'stat3-desc':      'Fast & Testable Solutions',
            'projetos-title':  'My <span>Projects</span>',
            'proj1-badge':     'QA & Automated API Testing',
            'proj1-title':     'Condo Garcia — Condominium Maintenance Management',
            'proj1-desc':      'In this project, I worked in Software Quality Engineering (QA) and API test automation for a complete platform designed to connect residents, building managers, service providers, and administrators.',
            'proj2-title':     'Under Construction',
            'proj2-desc':      'Another project focused on performance and robust architecture. Full repository details will be available soon.',
            'contato-title':   'Get in <span>Touch</span>',
            'contato-subtitle':'Feel free to send me a message to chat about technology, projects, or opportunities.',
            'footer-text':     '&copy; 2026 Kaio Ribeiro. All rights reserved.',
        },
    };

    /** Mapa chave → seletor CSS do elemento alvo */
    const elementSelectors = {
        'nav-home':         '.nav-links li:nth-child(1) a',
        'nav-sobre':        '.nav-links li:nth-child(2) a',
        'nav-projetos':     '.nav-links li:nth-child(3) a',
        'nav-contato':      '.nav-links li:nth-child(4) a',
        'hero-subtitle':    '.hero-subtitle',
        'btn-projetos':     '.hero-buttons .btn-primary',
        'tech-title':       '.tech-title',
        'sobre-title':      '#sobre .section-title',
        'sobre-p1':         '#sobre .sobre-text:nth-of-type(1)',
        'sobre-p2':         '#sobre .sobre-text:nth-of-type(2)',
        'sobre-p3':         '#sobre .sobre-text:nth-of-type(3)',
        'stat1-title':      '#sobre .stat-item:nth-child(1) h3',
        'stat1-desc':       '#sobre .stat-item:nth-child(1) p',
        'stat2-title':      '#sobre .stat-item:nth-child(2) h3',
        'stat2-desc':       '#sobre .stat-item:nth-child(2) p',
        'stat3-title':      '#sobre .stat-item:nth-child(3) h3',
        'stat3-desc':       '#sobre .stat-item:nth-child(3) p',
        'projetos-title':   '#projetos .section-title',
        'proj1-badge':      '#projetos .projeto-card:nth-child(1) .projeto-badge',
        'proj1-title':      '#projetos .projeto-card:nth-child(1) h3',
        'proj1-desc':       '#projetos .projeto-card:nth-child(1) p',
        'proj2-title':      '#projetos .projeto-card:nth-child(2) h3',
        'proj2-desc':       '#projetos .projeto-card:nth-child(2) p',
        'contato-title':    '#contato .section-title',
        'contato-subtitle': '.contact-subtitle',
        'footer-text':      '.site-footer p',
    };

    /** Aplica as traduções ao DOM para um dado locale */
    function applyTranslations(lang) {
        const strings = translations[lang];
        if (!strings) return;
        Object.entries(elementSelectors).forEach(([key, selector]) => {
            const el = document.querySelector(selector);
            if (el && strings[key]) el.innerHTML = strings[key];
        });
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
        try {
            localStorage.setItem('portfolio-lang', lang);
        } catch (_) {}
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyTranslations(btn.textContent.trim().toLowerCase());
        });
    });

    try {
        const savedLang = localStorage.getItem('portfolio-lang');
        if (savedLang && translations[savedLang]) {
            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.toggle('active', b.textContent.trim().toLowerCase() === savedLang);
            });
            applyTranslations(savedLang);
        }
    } catch (_) {}

    // -------------------------------------------------------------------------
    // 4. EVENTOS DE SCROLL (otimizados com requestAnimationFrame — 60/120fps)
    // -------------------------------------------------------------------------
    const header      = document.querySelector('.header');
    const topControls = document.querySelector('.top-right-controls');
    const progressBar = document.getElementById('scroll-progress-bar');
    let lastScrollY   = window.scrollY;
    let scrollTicking = false;

    function onScrollUpdate() {
        const currentScrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // 4a. Header auto-hide ao rolar para baixo
        const isScrollingDown = currentScrollY > 80 && currentScrollY > lastScrollY;
        header?.classList.toggle('header--hidden', isScrollingDown);
        topControls?.classList.toggle('controls--hidden', isScrollingDown);
        lastScrollY = currentScrollY;

        // 4b. Barra de progresso
        if (progressBar) {
            progressBar.style.width = docHeight > 0
                ? `${(currentScrollY / docHeight) * 100}%`
                : '0%';
        }

        scrollTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(onScrollUpdate);
            scrollTicking = true;
        }
    }, { passive: true });

    onScrollUpdate();

    // -------------------------------------------------------------------------
    // 5. ACTIVE LINK NA NAVBAR (IntersectionObserver leve)
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('main > section[id]');
    const navLinks = document.querySelectorAll('.nav-links li a');

    /** Atualiza o link ativo na navbar */
    function setActiveLink(id) {
        navLinks.forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
        });
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, { threshold: 0.25 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // -------------------------------------------------------------------------
    // 6. CARROSSEL DE IMAGENS DOS PROJETOS + LIGHTBOX (TELA CHEIA)
    // -------------------------------------------------------------------------
    const AUTOPLAY_DELAY_MS = 3500;
    const lightbox          = document.getElementById('image-lightbox');
    const lightboxImg       = lightbox?.querySelector('.lightbox-img');
    const lightboxClose     = lightbox?.querySelector('.lightbox-close');
    const lightboxPrev      = lightbox?.querySelector('.lightbox-btn--prev');
    const lightboxNext      = lightbox?.querySelector('.lightbox-btn--next');
    let activeCarouselCtrl  = null;

    function updateLightboxImage(slideEl) {
        if (!lightboxImg || !slideEl) return;
        lightboxImg.src = slideEl.src;
        lightboxImg.alt = slideEl.alt || '';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    lightboxClose?.addEventListener('click', closeLightbox);

    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    lightboxPrev?.addEventListener('click', (e) => {
        e.stopPropagation();
        activeCarouselCtrl?.prev();
    });

    lightboxNext?.addEventListener('click', (e) => {
        e.stopPropagation();
        activeCarouselCtrl?.next();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox?.classList.contains('active')) return;
        if (e.key === 'Escape')     closeLightbox();
        if (e.key === 'ArrowLeft')  activeCarouselCtrl?.prev();
        if (e.key === 'ArrowRight') activeCarouselCtrl?.next();
    });

    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const slides  = carousel.querySelectorAll('.carousel-slide');
        const dots    = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.carousel-btn--prev');
        const nextBtn = carousel.querySelector('.carousel-btn--next');
        let currentIndex = 0;
        let autoplayTimer = null;

        if (!slides.length) return;

        function showSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
            dots.forEach((dot, i)     => dot.classList.toggle('active', i === currentIndex));
            if (lightbox?.classList.contains('active') && activeCarouselCtrl === ctrl) {
                updateLightboxImage(slides[currentIndex]);
            }
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(() => {
                showSlide(currentIndex + 1);
            }, AUTOPLAY_DELAY_MS);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        const ctrl = {
            prev() { showSlide(currentIndex - 1); startAutoplay(); },
            next() { showSlide(currentIndex + 1); startAutoplay(); },
        };

        prevBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            ctrl.prev();
        });

        nextBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            ctrl.next();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(index);
                startAutoplay();
            });
        });

        // Suporte a swipe (arrastar com o dedo) para celular e tablet
        let touchStartX = 0;
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            const diffX = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diffX) > 40) {
                if (diffX < 0) ctrl.next();
                else ctrl.prev();
            }
        }, { passive: true });

        // Clicar na imagem abre em tela cheia (Lightbox)
        carousel.addEventListener('click', () => {
            if (!lightbox) return;
            activeCarouselCtrl = ctrl;
            updateLightboxImage(slides[currentIndex]);
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });

        startAutoplay();
    });

});
