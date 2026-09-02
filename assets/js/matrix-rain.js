/**
 * Hacker theme interactivity:
 *  - Matrix rain background (toggleable, persisted, respects reduced motion)
 *  - Terminal typing effect on page subtitles
 *  - Scroll-reveal fade-ins
 *  - Terminal cursor appended to page titles
 */

(function() {
  'use strict';

  var MATRIX_PREF_KEY = 'matrix-effect-enabled';
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = null;
  var animationTimer = null;
  var resizeHandler = null;
  var visibilityHandler = null;

  /* ---------- Matrix rain ---------- */

  function safeGetPreference() {
    try {
      var saved = localStorage.getItem(MATRIX_PREF_KEY);
      return saved === null ? true : saved === 'true';
    } catch (e) {
      return true;
    }
  }

  function isMatrixEnabled() {
    if (prefersReducedMotion) return false;
    return safeGetPreference();
  }

  function updateMatrixToggleUI(enabled) {
    var toggles = document.querySelectorAll('[data-matrix-toggle]');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].textContent = enabled ? 'Matrix Effect: ON' : 'Matrix Effect: OFF';
      toggles[i].setAttribute('aria-pressed', String(enabled));
    }
  }

  function setMatrixPreference(enabled) {
    try {
      localStorage.setItem(MATRIX_PREF_KEY, String(enabled));
    } catch (e) {
      /* storage unavailable — fall back to in-memory only */
    }
    updateMatrixToggleUI(enabled);
  }

  function startMatrixRain() {
    if (canvas) return;

    canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);

    var ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    resizeHandler = resizeCanvas;
    window.addEventListener('resize', resizeHandler);

    var matrixChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    var chars = matrixChars.split('');

    var fontSize = window.innerWidth < 768 ? 12 : 14;
    var columns = Math.floor(canvas.width / fontSize);

    var drops = [];
    for (var c = 0; c < columns; c++) {
      drops[c] = Math.random() * -100;
    }

    var colors = [
      'rgba(0, 255, 65, 0.9)',
      'rgba(0, 255, 65, 0.7)',
      'rgba(0, 255, 65, 0.5)',
      'rgba(0, 200, 50, 0.8)',
      'rgba(0, 212, 255, 0.8)'
    ];

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      for (var i = 0; i < drops.length; i++) {
        var char = chars[Math.floor(Math.random() * chars.length)];
        var colorIndex = Math.random() > 0.95 ? 4 : Math.floor(Math.random() * 4);
        ctx.fillStyle = colors[colorIndex];

        if (Math.random() > 0.98) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        }

        var x = i * fontSize;
        var y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    animationTimer = setInterval(draw, 33);

    visibilityHandler = function() {
      if (!canvas) return;
      canvas.style.display = document.hidden ? 'none' : 'block';
    };
    document.addEventListener('visibilitychange', visibilityHandler);
  }

  function stopMatrixRain() {
    if (animationTimer) {
      clearInterval(animationTimer);
      animationTimer = null;
    }
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler);
      resizeHandler = null;
    }
    if (visibilityHandler) {
      document.removeEventListener('visibilitychange', visibilityHandler);
      visibilityHandler = null;
    }
    if (canvas) {
      canvas.remove();
      canvas = null;
    }
  }

  function applyMatrixSetting(enabled) {
    if (enabled) {
      startMatrixRain();
    } else {
      stopMatrixRain();
    }
    setMatrixPreference(enabled);
  }

  function initMatrixToggle() {
    updateMatrixToggleUI(isMatrixEnabled());

    var toggles = document.querySelectorAll('[data-matrix-toggle]');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener('click', function() {
        applyMatrixSetting(!isMatrixEnabled());
      });
    }
  }

  /* ---------- Typing effect ---------- */

  function typeElement(el, speed) {
    var text = el.textContent;
    el.textContent = '';
    el.setAttribute('aria-label', text);
    var i = 0;
    var timer = setInterval(function() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed || 25);
  }

  function initTyping() {
    if (prefersReducedMotion) return;

    var subtitles = document.querySelectorAll('.page-subheading');
    for (var i = 0; i < subtitles.length; i++) {
      typeElement(subtitles[i], 22);
    }

    var custom = document.querySelectorAll('.typing-effect');
    for (var j = 0; j < custom.length; j++) {
      typeElement(custom[j], 30);
    }
  }

  /* ---------- Scroll reveal ---------- */

  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('revealed');
      }
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    for (var j = 0; j < elements.length; j++) {
      observer.observe(elements[j]);
    }
  }

  /* ---------- Terminal cursor ---------- */

  function initTerminalCursor() {
    var pageTitle = document.querySelector('.page-heading h1, .post-heading h1');
    if (pageTitle && !prefersReducedMotion) {
      var cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      cursor.innerHTML = '_';
      pageTitle.appendChild(cursor);
    }
  }

  /* ---------- Boot ---------- */

  document.addEventListener('DOMContentLoaded', function() {
    if (isMatrixEnabled()) {
      startMatrixRain();
    }
    initMatrixToggle();
    initTyping();
    initScrollReveal();
    initTerminalCursor();
  });
})();
