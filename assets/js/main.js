/**
 * Bharanidharan Boopalan — Senior Software Engineer Portfolio
 * Interactive UI Controller: Theme Toggle, Project Filter, Clipboard & Animations
 */
(function ($) {
  "use strict";

  var nav = $('nav');
  var navHeight = nav.outerHeight() || 76;

  /*--/ Dark / Light Theme Persistence & Toggle /--*/
  var rootEl = document.documentElement;
  var themeToggleBtn = document.getElementById('themeToggle');
  var savedTheme = null;
  try {
    savedTheme = localStorage.getItem('portfolio-theme');
  } catch (e) {
    savedTheme = null;
  }

  if (savedTheme === 'light' || savedTheme === 'dark') {
    rootEl.setAttribute('data-theme', savedTheme);
  } else {
    rootEl.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      var currentTheme = rootEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      rootEl.setAttribute('data-theme', nextTheme);
      try {
        localStorage.setItem('portfolio-theme', nextTheme);
      } catch (e) {
        // ignore storage errors
      }
    });
  }

  /*--/ Navbar Toggler /--*/
  $('.navbar-toggler').on('click', function () {
    if (!$('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  });

  /*--/ Smooth Scrolling for Anchor Links /--*/
  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
    if (
      location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
      location.hostname === this.hostname
    ) {
      var hashId = decodeURIComponent(this.hash.slice(1));
      var targetEl = document.getElementById(hashId);
      if (targetEl) {
        var scrollto = $(targetEl).offset().top - navHeight + 8;
        $('html, body').animate({
          scrollTop: scrollto
        }, 700, "easeInOutExpo");
        return false;
      }
    }
  });

  // Close responsive menu when a scroll trigger link is clicked
  $('.js-scroll').on("click", function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: navHeight + 24
  });

  /*--/ Navbar Menu Reduce & Back-to-Top /--*/
  $(window).trigger('scroll');
  $(window).on('scroll', function () {
    var pixels = 40;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-expand-md').addClass('navbar-reduce');
      $('.navbar-expand-md').removeClass('navbar-trans');
    } else {
      $('.navbar-expand-md').addClass('navbar-trans');
      $('.navbar-expand-md').removeClass('navbar-reduce');
    }
    if ($(window).scrollTop() > 240) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 800, 'easeInOutExpo');
    return false;
  });

  /*--/ Star Counter /--*/
  if ($('.counter').length && $.fn.counterUp) {
    $('.counter').counterUp({
      delay: 12,
      time: 1400
    });
  }

  /*--/ Hero Typed Subtitle /--*/
  if ($('.text-slider').length === 1 && typeof Typed !== 'undefined') {
    var typedStrings = $('.text-slider-items').text();
    new Typed('.text-slider', {
      strings: typedStrings.split(','),
      typeSpeed: 55,
      loop: true,
      backDelay: 1600,
      backSpeed: 28
    });
  }

  /*--/ Project Category Filter /--*/
  var filterButtons = document.querySelectorAll('.project-filter-bar .filter-btn');
  var projectItems = document.querySelectorAll('#projectsGrid .project-card-col');

  function applyProjectFilter(filterValue) {
    projectItems.forEach(function (card) {
      var categories = (card.getAttribute('data-category') || '').split(/\s+/);
      if (filterValue === 'all' || categories.indexOf(filterValue) !== -1) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  }

  if (filterButtons.length && projectItems.length) {
    // Initialize with the currently active filter button ("featured")
    var activeBtn = document.querySelector('.project-filter-bar .filter-btn.active');
    if (activeBtn) {
      applyProjectFilter(activeBtn.getAttribute('data-filter') || 'featured');
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        var selectedFilter = btn.getAttribute('data-filter') || 'all';
        applyProjectFilter(selectedFilter);
      });
    });
  }

  /*--/ Copy Email to Clipboard /--*/
  var copyEmailBtn = document.getElementById('copyEmailBtn');
  var copyEmailText = document.getElementById('copyEmailText');
  if (copyEmailBtn && copyEmailText) {
    copyEmailBtn.addEventListener('click', function () {
      var email = 'bharanidharan19519@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          copyEmailText.textContent = 'Copied to Clipboard!';
          setTimeout(function () {
            copyEmailText.textContent = 'Copy Email Address';
          }, 2200);
        });
      } else {
        var tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        copyEmailText.textContent = 'Copied to Clipboard!';
        setTimeout(function () {
          copyEmailText.textContent = 'Copy Email Address';
        }, 2200);
      }
    });
  }

  /*--/ Scroll Reveal Animation via IntersectionObserver /--*/
  var revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

})(jQuery);
