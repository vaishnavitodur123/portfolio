// ===== INITIALIZE LUCIDE ICONS =====
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initLoader();
  initThemeToggle();
  initNavigation();
  initTypingEffect();
  initScrollReveal();
  initCountUp();
  initCursorGlow();
  initScrollTop();
  initContactForm();
});

// ===== LOADING SCREEN =====
function initLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1800);
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Check stored theme
  const storedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', storedTheme);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);

    // Re-render icons for theme change
    lucide.createIcons();
  });
}

// ===== NAVIGATION =====
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks.querySelectorAll('a');

  // Scroll header effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = navLinks.querySelector(`a[href="#${sectionId}"]`);

      if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        links.forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    });
  });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
  const element = document.getElementById('typingText');
  const titles = [
    'PHP Laravel Developer',
    'Backend Developer',
    'Web Developer',
    'Problem Solver'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      element.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      element.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 2000);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ===== COUNT UP ANIMATION =====
function initCountUp() {
  const counters = document.querySelectorAll('.hero-stat-number');
  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-count'));
          let current = 0;
          const increment = target / 40;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + '+';
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, 50);
        });
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ===== CURSOR GLOW (Desktop Only) =====
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');

  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      });
    });
  } else {
    glow.style.display = 'none';
  }
}

// ===== SCROLL TO TOP =====
function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span style="display:flex;align-items:center;gap:8px;justify-content:center;">✓ Message Sent!</span>';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.pointerEvents = 'auto';
      form.reset();
      lucide.createIcons();
    }, 3000);
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
