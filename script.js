/* ============================================================
   AWS ENTRENA ARGENTINA – CORRIENTES DIGITAL
   script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky header shadow ───────────────────────────
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Mobile nav ─────────────────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav  = document.getElementById('mobileNav');

  menuToggle?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    const spans = menuToggle.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
    }
  });

  mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
    });
  });

  // ── Floating CTA ───────────────────────────────────
  const floatingCta = document.getElementById('floatingCta');
  const heroSection = document.getElementById('hero');
  const ctaObserver = new IntersectionObserver(
    ([e]) => floatingCta?.classList.toggle('visible', !e.isIntersecting),
    { threshold: 0.2 }
  );
  if (heroSection) ctaObserver.observe(heroSection);

  // ── FAQ Accordion ──────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-question').forEach(q => {
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling?.classList.remove('open');
      });
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling?.classList.add('open');
      }
    });
  });

  // ── Scroll reveal ──────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('revealed'), i * 70);
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );
  revealEls.forEach(el => revealObs.observe(el));

  // ── Animated Particles ─────────────────────────────
  const container = document.getElementById('particles');
  if (container) {
    // Corrientes palette: rojo, celeste, blanco
    const colors = ['#C0392B', '#75AADB', 'rgba(255,255,255,.6)', '#F9D000', '#C0392B'];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size  = Math.random() * 3.5 + 1;
      const left  = Math.random() * 100;
      const delay = Math.random() * 18;
      const dur   = 14 + Math.random() * 14;
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `width:${size}px;height:${size}px;left:${left}%;background:${color};animation-duration:${dur}s;animation-delay:${delay}s;opacity:0;border-radius:50%;`;
      container.appendChild(p);
    }
  }

  // ── Smooth scroll for anchor links ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' });
      }
    });
  });

  // ── Active nav link on scroll ──────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const secObs   = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.style.color = '#FAC005';
            }
          });
        }
      });
    },
    { threshold: 0.45 }
  );
  sections.forEach(s => secObs.observe(s));

});
