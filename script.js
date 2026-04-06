// ===== INITIALIZE =====
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
  initJourneyTabs();
  initProjectCarousel();
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
  const storedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', storedTheme);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
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
    header.classList.toggle('scrolled', window.scrollY > 80);
  });

  // Mobile toggle with body scroll lock
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  // Close mobile nav on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
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

// ===== CURSOR GLOW =====
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
    scrollBtn.classList.toggle('visible', window.scrollY > 500);
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

// ===== JOURNEY TABS =====
function initJourneyTabs() {
  const tabs = document.querySelectorAll('.journey-tab');
  const panels = document.querySelectorAll('.journey-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active panel
      panels.forEach(p => p.classList.remove('active'));
      const targetPanel = document.getElementById(`panel-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      // Re-render icons for newly visible content
      lucide.createIcons();
    });
  });
}

// ===== PROJECT CAROUSEL =====
function initProjectCarousel() {
  const track = document.getElementById('carouselTrack');
  const cards = track.querySelectorAll('.carousel-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  let currentIndex = 0;
  const totalCards = cards.length;

  // Create dots
  for (let i = 0; i < totalCards; i++) {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to project ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left → next
        currentIndex = (currentIndex + 1) % totalCards;
      } else {
        // Swipe right → prev
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      }
      updateCarousel();
    }
  }, { passive: true });

  // Auto-advance every 5 seconds
  let autoPlay = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  }, 5000);

  // Pause auto-play on hover
  track.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCarousel();
    }, 5000);
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
