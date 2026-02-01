/**
 * Matrix Rain Animation
 * Creates the iconic falling green characters effect
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    initMatrixRain();
  });

  function initMatrixRain() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (mix of katakana, numbers, and symbols)
    const matrixChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const chars = matrixChars.split('');

    // Configuration
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Array to track the y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start above the screen
    }

    // Color variations
    const colors = [
      'rgba(0, 255, 65, 0.9)',   // Bright green
      'rgba(0, 255, 65, 0.7)',   // Medium green
      'rgba(0, 255, 65, 0.5)',   // Dim green
      'rgba(0, 200, 50, 0.8)',   // Darker green
      'rgba(0, 212, 255, 0.8)',  // Cyan accent
    ];

    // Animation function
    function draw() {
      // Semi-transparent black background for fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font
      ctx.font = fontSize + 'px monospace';

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Random color (mostly green, occasional cyan)
        const colorIndex = Math.random() > 0.95 ? 4 : Math.floor(Math.random() * 4);
        ctx.fillStyle = colors[colorIndex];

        // First character is brighter (head of the drop)
        if (Math.random() > 0.98) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        }

        // Draw the character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        // Reset drop when it reaches bottom or randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    }

    // Run animation at ~30fps for performance
    setInterval(draw, 33);

    // Handle visibility change to pause/resume animation
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        canvas.style.display = 'none';
      } else {
        canvas.style.display = 'block';
      }
    });
  }

  // Add typing effect to elements with class 'typing-effect'
  function addTypingEffect() {
    const elements = document.querySelectorAll('.typing-effect');
    elements.forEach(function(el) {
      const text = el.textContent;
      el.textContent = '';
      let i = 0;
      const typeInterval = setInterval(function() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);
    });
  }

  // Add glitch effect on hover for specific elements
  function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-hover');
    glitchElements.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        el.classList.add('glitching');
        setTimeout(function() {
          el.classList.remove('glitching');
        }, 500);
      });
    });
  }

  // Initialize effects after page load
  window.addEventListener('load', function() {
    addTypingEffect();
    addGlitchEffect();

    // Add terminal cursor effect to the page title
    const pageTitle = document.querySelector('.page-heading h1, .post-heading h1');
    if (pageTitle) {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      cursor.innerHTML = '_';
      cursor.style.cssText = 'animation: cursor-blink 1s infinite; margin-left: 5px;';
      pageTitle.appendChild(cursor);
    }
  });
})();
