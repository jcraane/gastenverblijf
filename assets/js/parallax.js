(function() {
  'use strict';

  var navWrapper = document.getElementById('site-nav-wrapper');
  var heroHeader = document.getElementById('hero-header');
  var heroContent = document.getElementById('hero-content');
  var heroImg = heroHeader ? heroHeader.querySelector('.hero__img') : null;
  var subNav = document.querySelector('.activity-nav');

  if (!navWrapper) return;

  // Set CSS variables for sticky bar heights
  function updateHeights() {
    document.documentElement.style.setProperty('--nav-height', navWrapper.offsetHeight + 'px');

    if (subNav) {
      document.documentElement.style.setProperty('--activity-nav-height', subNav.offsetHeight + 'px');
    }
  }

  updateHeights();
  window.addEventListener('resize', updateHeights);

  // Hamburger toggle
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  function setMenuOpen(isOpen) {
    navMenu.classList.toggle('is-open', isOpen);
    navWrapper.classList.toggle('site-nav-wrapper--open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      setMenuOpen(!navMenu.classList.contains('is-open'));
    });

    // Close menu when a nav link is clicked (e.g. same-page anchors)
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() { setMenuOpen(false); });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        setMenuOpen(false);
        navToggle.focus();
      }
    });
  }

  // "Bekijk alle foto's": open the lightbox gallery at its first photo
  document.querySelectorAll('[data-open-gallery]').forEach(function(button) {
    button.addEventListener('click', function() {
      var name = button.getAttribute('data-open-gallery');
      var first = document.querySelector('.glightbox[data-gallery="' + name + '"]');
      if (first) first.click();
    });
  });

  // Sub navigation: highlight the last section whose top has scrolled past the sticky bars
  if (subNav) {
    var links = Array.prototype.slice.call(subNav.querySelectorAll('a[href^="#"]'));
    var targets = links
      .map(function(link) { return document.getElementById(link.getAttribute('href').slice(1)); });
    var activeLink = null;
    var subNavTicking = false;

    var updateActive = function() {
      subNavTicking = false;
      var threshold = subNav.getBoundingClientRect().bottom + window.innerHeight * 0.25;
      var current = null;

      targets.forEach(function(target, i) {
        if (target && target.getBoundingClientRect().top <= threshold) current = links[i];
      });

      // At the very bottom the last sections can't reach the threshold
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = links[links.length - 1];
      }

      if (current === activeLink) return;
      if (activeLink) activeLink.classList.remove('is-active');
      if (current) {
        current.classList.add('is-active');
        // Keep the active link in view on the horizontally scrolling mobile bar
        if (subNav.scrollWidth > subNav.clientWidth) {
          subNav.scrollTo({ left: current.offsetLeft - 16, behavior: 'smooth' });
        }
      }
      activeLink = current;
    };

    window.addEventListener('scroll', function() {
      if (!subNavTicking) {
        requestAnimationFrame(updateActive);
        subNavTicking = true;
      }
    }, { passive: true });
    updateActive();
  }

  // No hero image — nav stays solid, nothing else to do
  if (!heroHeader) {
    navWrapper.classList.add('site-nav-wrapper--solid');
    return;
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    ticking = false;

    var scrolled = window.scrollY;
    var heroHeight = heroHeader.offsetHeight;
    var navHeight = navWrapper.offsetHeight;

    // Switch to the light, solid nav once the hero has scrolled out from under it
    navWrapper.classList.toggle('site-nav-wrapper--scrolled', scrolled > heroHeight - navHeight);

    // Skip visual effects when user prefers reduced motion
    if (prefersReducedMotion) return;

    // Parallax: move the photo slower than the page
    if (heroImg && scrolled <= heroHeight) {
      heroImg.style.transform = 'translate3d(0, ' + (scrolled * 0.3) + 'px, 0)';
    }

    // Fade out hero title and subtitle
    if (heroContent) {
      var fadeStart = 30;
      var fadeEnd = heroHeight * 0.6;

      if (scrolled <= fadeStart) {
        heroContent.style.opacity = '1';
      } else if (scrolled >= fadeEnd) {
        heroContent.style.opacity = '0';
      } else {
        heroContent.style.opacity = (1 - ((scrolled - fadeStart) / (fadeEnd - fadeStart))).toString();
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Run once on load in case the page starts scrolled (back button, anchor link)
  update();
})();
