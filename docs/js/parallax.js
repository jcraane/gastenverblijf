(function() {
  'use strict';

  var navWrapper = document.getElementById('site-nav-wrapper');
  var heroHeader = document.getElementById('hero-header');
  var heroContent = document.getElementById('hero-content');

  if (!navWrapper) return;

  // Set CSS variables for sticky bar heights
  function updateHeights() {
    var navHeight = navWrapper.offsetHeight;
    document.documentElement.style.setProperty('--nav-height', navHeight + 'px');

    var activityNav = document.querySelector('.activity-nav');
    if (activityNav) {
      document.documentElement.style.setProperty('--activity-nav-height', activityNav.offsetHeight + 'px');
    }
  }

  updateHeights();
  window.addEventListener('resize', updateHeights);

  // Hamburger toggle
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      updateHeights();
    });

    // Close menu when a nav link is clicked (e.g. same-page anchors)
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        updateHeights();
      });
    });
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

    // Toggle solid nav background when scrolled past the hero
    if (scrolled > heroHeight - navHeight) {
      navWrapper.classList.add('site-nav-wrapper--scrolled');
    } else {
      navWrapper.classList.remove('site-nav-wrapper--scrolled');
    }

    // Skip visual effects when user prefers reduced motion
    if (prefersReducedMotion) return;

    // Parallax: shift background slower than scroll
    if (scrolled <= heroHeight) {
      var offset = scrolled * 0.35;
      heroHeader.style.backgroundPosition = 'center calc(50% + ' + offset + 'px)';
    }

    // Fade out hero title and description
    if (heroContent) {
      var fadeStart = 50;
      var fadeEnd = heroHeight * 0.55;

      if (scrolled <= fadeStart) {
        heroContent.style.opacity = '1';
      } else if (scrolled >= fadeEnd) {
        heroContent.style.opacity = '0';
      } else {
        var opacity = 1 - ((scrolled - fadeStart) / (fadeEnd - fadeStart));
        heroContent.style.opacity = opacity.toString();
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Run once on load in case the page starts scrolled (back button, anchor link)
  update();
})();
