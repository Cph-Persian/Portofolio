// Helper: select
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Persisted settings
const STORAGE_KEYS = { theme: 'theme', lang: 'lang' };

const getStored = (key, fallback) => {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
};
const setStored = (key, value) => {
  try { localStorage.setItem(key, value); } catch {}
};

// i18n dictionary
const I18N = {
  da: {
    'nav.projects': 'Projekter',
    'nav.about': 'Om mig',
    'nav.contact': 'Kontakt',
    'hero.firstName': 'Persian',
    'hero.lastName': 'Moradi',
    'hero.subtitle': 'Multimediedesign-studerende · Frontend og webudvikling',
    'hero.intro': 'Jeg skaber elegante, funktionelle og hurtige digitale oplevelser – fra idé og prototypning til frontend-implementering.',
    'hero.portrait': 'Portræt',
    'cta.viewProjects': 'Se projekter',
    'cta.contactMe': 'Kontakt mig',
    'projects.title': 'Udvalgte projekter',
    'projects.subtitle': 'Et udvalg fra 1 – 3 semester. Klik for detaljer eller demo.',
    'projects.wp.title': 'Wordpress Website - 2 semester',
    'projects.wp.desc': 'Design et WordPress website til en håndværker - Flow 1 projekt',
    'projects.nature.title': 'Naturnat Hjemmeside - 2 semester',
    'projects.nature.desc': 'Webdesign med Bootstrap og JavaScript integration',
    'projects.exam.title': 'Eksamensprojekt - 2 semester',
    'projects.exam.desc': 'Jeres produkt er en webbaseret multimedieproduktion (website, web-app)',
    'projects.twitter.title': 'Pipper (x) Projekt - 3 semester',
    'projects.twitter.desc': 'Det bliver en meget simplificeret udgave af X, men forhåbentligt kan i komme i mål med et produkt, som minder bare lidt om det rigtige X.',
    'projects.details': 'Detaljer',
    'projects.demo': 'Demo',
    'about.title': 'Om mig',
    'about.subtitle': 'Kompetencer, erfaring og mål',
    'about.body': 'Jeg er multimediedesign-studerende med passion for frontend-udvikling. Jeg arbejder med moderne teknologier og designmetoder for at skabe intuitive, hurtige og tilgængelige løsninger. Mine interesser ligger i frontend-udvikling, UI/UX design og prototyping.',
    'about.skills.label': 'Kompetencer:',
    'about.skills.value': 'HTML, CSS, JavaScript, UI/UX, prototyping',
    'about.tools.label': 'Værktøjer:',
    'about.tools.value': 'Figma, Git/GitHub, Adobe, Office package',
    'about.goals.label': 'Mål:',
    'about.goals.value': 'Top-up i webudvikling, fordybelse i frontend-udvikling',
    'contact.title': 'Kontaktinformation',
    'contact.subtitle': 'Jeg er altid åben for nye muligheder og spændende projekter. Tag endelig kontakt – jeg svarer typisk inden for 24 timer.',
    'contact.email.label': 'Email',
    'contact.phone.label': 'Telefon',
    'contact.location.label': 'Lokation',
    'contact.location.value': 'København, Danmark',
    'contact.cta.title': 'Klar til at samarbejde?',
    'contact.cta.desc': 'Download mit CV eller ring uformelt for at diskutere muligheder.',
    'contact.cta.download': 'Download CV',
    'contact.cta.email': 'Kontakt mig',
    'footer.name': 'Persian Moradi',
    'footer.rights': 'Alle rettigheder forbeholdes.',
    'footer.email': 'Email'
  },
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.firstName': 'Persian',
    'hero.lastName': 'Moradi',
    'hero.subtitle': 'Multimedia Design student · Frontend & Web Development',
    'hero.intro': 'I craft elegant, functional and fast digital experiences – from idea and prototyping to frontend implementation.',
    'hero.portrait': 'Portrait',
    'cta.viewProjects': 'View projects',
    'cta.contactMe': 'Contact me',
    'projects.title': 'Selected projects',
    'projects.subtitle': 'A selection from 1st – 3rd semester. Click for details or demo.',
    'projects.wp.title': 'WordPress Website - 2nd semester',
    'projects.wp.desc': 'Design a WordPress website for a craftsman - Flow 1 project',
    'projects.nature.title': 'Naturnat Website - 2nd semester',
    'projects.nature.desc': 'Web design with Bootstrap and JavaScript integration',
    'projects.exam.title': 'Exam project - 2nd semester',
    'projects.exam.desc': 'Your product is a web-based multimedia production (website, web app)',
    'projects.twitter.title': 'Pipper (x) Project - 3rd semester',
    'projects.twitter.desc': 'A very simplified version of X, aiming for a product that resembles the real X.',
    'projects.details': 'Details',
    'projects.demo': 'Demo',
    'about.title': 'About me',
    'about.subtitle': 'Skills, experience and goals',
    'about.body': 'I am a Multimedia Design student with a passion for frontend development. I work with modern technologies and design methods to create intuitive, fast and accessible solutions. My interests lie in frontend development, UI/UX design and prototyping.',
    'about.skills.label': 'Skills:',
    'about.skills.value': 'HTML, CSS, JavaScript, UI/UX, prototyping',
    'about.tools.label': 'Tools:',
    'about.tools.value': 'Figma, Git/GitHub, Adobe, Office package',
    'about.goals.label': 'Goals:',
    'about.goals.value': 'Top-up in web development, deepening frontend expertise',
    'contact.title': 'Contact information',
    'contact.subtitle': 'I am always open to new opportunities and exciting projects. Feel free to reach out – I typically respond within 24 hours.',
    'contact.email.label': 'Email',
    'contact.phone.label': 'Phone',
    'contact.location.label': 'Location',
    'contact.location.value': 'Copenhagen, Denmark',
    'contact.cta.title': 'Ready to collaborate?',
    'contact.cta.desc': 'Download my CV or call informally to discuss opportunities.',
    'contact.cta.download': 'Download CV',
    'contact.cta.email': 'Email me',
    'footer.name': 'Persian Moradi',
    'footer.rights': 'All rights reserved.',
    'footer.email': 'Email'
  }
};

function applyTranslations(lang) {
  const dict = I18N[lang] || I18N.da;
  $$('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = dict[key];
    if (typeof val === 'string') {
      el.textContent = val;
    }
  });
  document.documentElement.setAttribute('lang', lang);

  // Re-render about cloud when language changes
  renderAboutCloud(dict);
}

let cloudController = null;

function startCloudMotion(wrap) {
  const tags = Array.from(wrap.querySelectorAll('.cloud__tag'));
  if (tags.length === 0) return null;

  const state = tags.map((el, idx) => {
    const rect = el.getBoundingClientRect();
    const parentRect = wrap.getBoundingClientRect();
    // Initial pos from transform translate
    const m = /translate\(([-0-9.]+)px,\s*([-0-9.]+)px\)/.exec(el.style.transform || '');
    const x0 = m ? parseFloat(m[1]) : Math.random() * Math.max(0, wrap.clientWidth - rect.width);
    const y0 = m ? parseFloat(m[2]) : Math.random() * Math.max(0, wrap.clientHeight - rect.height);
    const speed = 20 + Math.random() * 50; // px per second
    const angle = Math.random() * Math.PI * 2;
    return {
      el,
      w: rect.width,
      h: rect.height,
      x: x0,
      y: y0,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed
    };
  });

  let last = performance.now();

  const bounds = () => ({ width: wrap.clientWidth, height: wrap.clientHeight });
  let b = bounds();
  const onResize = () => { b = bounds(); };
  window.addEventListener('resize', onResize);

  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); // cap delta
    last = now;

    state.forEach((s) => {
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      // Bounce on bounds
      if (s.x <= 0) { s.x = 0; s.vx = Math.abs(s.vx); }
      if (s.y <= 0) { s.y = 0; s.vy = Math.abs(s.vy); }
      if (s.x + s.w >= b.width) { s.x = b.width - s.w; s.vx = -Math.abs(s.vx); }
      if (s.y + s.h >= b.height) { s.y = b.height - s.h; s.vy = -Math.abs(s.vy); }

      s.el.style.transform = `translate(${s.x}px, ${s.y}px)`;
    });

    controller.rafId = requestAnimationFrame(tick);
  };

  const controller = {
    rafId: requestAnimationFrame(tick),
    kill() {
      cancelAnimationFrame(this.rafId);
      window.removeEventListener('resize', onResize);
    }
  };

  return controller;
}

function renderAboutCloud(dict) {
  const host = document.getElementById('aboutCloud');
  if (!host) return;

  // Stop previous animation
  if (cloudController) { cloudController.kill(); cloudController = null; }

  // Extract data from dict
  const skills = (dict['about.skills.value'] || '').split(',').map(s => s.trim()).filter(Boolean);
  const tools = (dict['about.tools.value'] || '').split(',').map(s => s.trim()).filter(Boolean);
  const goals = (dict['about.goals.value'] || '').split(',').map(s => s.trim()).filter(Boolean);

  host.innerHTML = '<div class="cloud__wrap"></div>';
  const wrap = host.querySelector('.cloud__wrap');

  const tags = [];
  skills.forEach(t => tags.push({ text: t, cls: 'cloud__tag', type: 'skill' }));
  tools.forEach(t => tags.push({ text: t, cls: 'cloud__tag cloud__tag--tool', type: 'tool' }));
  goals.forEach(t => tags.push({ text: t, cls: 'cloud__tag cloud__tag--goal', type: 'goal' }));

  const width = wrap.clientWidth;
  const height = wrap.clientHeight;

  tags.forEach((tag) => {
    const el = document.createElement('div');
    el.className = tag.cls;
    el.textContent = tag.text;
    wrap.appendChild(el);
    const rect = el.getBoundingClientRect();
    const x = Math.random() * Math.max(0, width - rect.width);
    const y = Math.random() * Math.max(0, height - rect.height);
    el.style.transform = `translate(${x}px, ${y}px)`;
  });

  // Start physics-like floating within bounds
  cloudController = startCloudMotion(wrap);
}

function applyTheme(theme) {
  const normalized = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', normalized);
  const themeBtn = $('#themeToggle');
  if (themeBtn) {
    themeBtn.textContent = normalized === 'light' ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', normalized === 'light' ? 'Skift til mørkt tema' : 'Skift til lyst tema');
    themeBtn.setAttribute('title', normalized === 'light' ? 'Skift til mørkt tema' : 'Skift til lyst tema');
  }
}

function initPreferences() {
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = getStored(STORAGE_KEYS.theme, prefersLight ? 'light' : 'dark');
  const initialLang = getStored(STORAGE_KEYS.lang, (document.documentElement.getAttribute('lang') || 'da'));

  // Init UI states
  applyTheme(initialTheme);
  applyTranslations(initialLang);

  const langSelect = $('#langSelect');
  if (langSelect) {
    langSelect.value = initialLang;
    langSelect.addEventListener('change', () => {
      const lang = langSelect.value === 'en' ? 'en' : 'da';
      setStored(STORAGE_KEYS.lang, lang);
      applyTranslations(lang);
    });
  }

  const themeToggle = $('#themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      setStored(STORAGE_KEYS.theme, next);
      applyTheme(next);
    });
  }

  // Render about cloud initially if present
  renderAboutCloud(I18N[initialLang] || I18N.da);
}

// Mobile menu toggle
const toggleBtn = $('.nav__toggle');
const navMenu = $('#navMenu');
if (toggleBtn && navMenu) {
  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('is-open');
  });
}

// Smooth scroll for anchor links
$$('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const target = targetId && $(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navMenu?.classList.remove('is-open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Year in footer
$('#year').textContent = new Date().getFullYear();

// Scroll til top knap
const scrollTopBtn = $('#scrollTop');
if (scrollTopBtn) {
  // Vis/skjul knap baseret på scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }
  });

  // Scroll til top når knappen klikkes
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Simple form validation + fake submit
const form = $('#contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name');
    const email = $('#email');
    const message = $('#message');

    let valid = true;
    const setError = (el, msg) => {
      const error = el.parentElement.querySelector('.form__error');
      if (error) error.textContent = msg;
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg) valid = false;
    };

    setError(name, name.value.trim() ? '' : 'Udfyld venligst dit navn');
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    setError(email, emailOk ? '' : 'Angiv en gyldig email');
    setError(message, message.value.trim() ? '' : 'Skriv venligst en besked');

    if (valid) {
      const success = $('.form__success');
      if (success) {
        success.hidden = false;
        form.reset();
        setTimeout(() => (success.hidden = true), 4000);
      }
    }
  });
}

// GSAP animations
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  // Header reveal on scroll
  let lastY = window.scrollY;
  const header = $('#header');
  ScrollTrigger.create({
    start: 0,
    onUpdate: () => {
      const y = window.scrollY;
      if (!header) return;
      const isUp = y < lastY;
      header.style.transform = isUp ? 'translateY(0)' : 'translateY(-10px)';
      header.style.transition = 'transform 260ms ease';
      
      // Tilføj scrolled klasse baseret på scroll position
      if (y > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastY = y;
    }
  });

  // Hero entrance med forbedrede animationer
  gsap.from('.hero__content > *', { 
    opacity: 0, 
    y: 40, 
    duration: 1.2, 
    stagger: 0.12, 
    ease: 'power3.out' 
  });
  
  gsap.from('.hero__photo img', { 
    opacity: 0, 
    scale: 1.1, 
    rotation: 2,
    duration: 1.4, 
    ease: 'power3.out' 
  });

  // Floating animation på hero billede
  gsap.to('.hero__photo img', {
    y: -10,
    duration: 3,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1
  });

  // Parallax på hero-billede
  gsap.to('.hero__photo img', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Cards on scroll
  $$('.project').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      }
    });

    // Parallax på projektbilleder
    const img = card.querySelector('.card__media img');
    if (img) {
      gsap.to(img, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    }
  });

  // Stats bounce-in med forbedrede animationer
  $$('.stat').forEach((stat) => {
    gsap.from(stat, {
      opacity: 0,
      y: 30,
      scale: 0.9,
      rotation: 5,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: stat, start: 'top 85%' }
    });
  });

  // Kontakt paneler animation
  $$('.panel').forEach((panel, i) => {
    gsap.from(panel, {
      opacity: 0,
      x: i % 2 === 0 ? -30 : 30,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: panel, start: 'top 85%' }
    });
  });

  // Scroll top knap animation
  const scrollTopBtn = $('#scrollTop');
  if (scrollTopBtn) {
    gsap.from(scrollTopBtn, {
      scale: 0,
      rotation: 180,
      duration: 0.5,
      ease: 'back.out(1.7)',
      delay: 1
    });
  }
}

// Initialize preferences after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPreferences);
} else {
  initPreferences();
}


