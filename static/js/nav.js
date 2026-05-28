(function () {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav__link');
  const searchLink = document.querySelector('.searchLink');
  const searchDiv = document.getElementById('searchDiv');

  function setScrolledState() {
    if (!header || !nav) return;
    header.classList.toggle('is-scrolled', window.scrollY > nav.offsetHeight);
  }

  function closeMobileNav() {
    if (!navLinks || !hamburger) return;
    navLinks.classList.add('hide');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }

  function openMobileNav() {
    if (!navLinks || !hamburger) return;
    navLinks.classList.remove('hide');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = !navLinks.classList.contains('hide');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    navLinks.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 767px)').matches) {
          closeMobileNav();
        }
      });
    });
  }

  if (searchLink && searchDiv) {
    searchLink.addEventListener('click', function (event) {
      event.preventDefault();
      const isHidden = searchDiv.hasAttribute('hidden');
      if (isHidden) {
        searchDiv.removeAttribute('hidden');
        const input = searchDiv.querySelector('input');
        if (input) input.focus();
      } else {
        searchDiv.setAttribute('hidden', '');
      }
    });
  }

  window.addEventListener('scroll', setScrolledState, { passive: true });
  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 768px)').matches) {
      if (navLinks) navLinks.classList.remove('hide');
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
      }
    } else {
      closeMobileNav();
    }
    setScrolledState();
  });

  setScrolledState();
})();
