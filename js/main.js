/**
 * Hacker Theme - Interactive Effects
 * John Lauron Portfolio
 */

(function() {
    'use strict';

    // ===================================
    // MATRIX RAIN EFFECT
    // ===================================
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()/*-+=%$#@!&';
    const charArray = chars.split('');

    // Column settings
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];

    // Initialize drops
    function initDrops() {
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
    }
    initDrops();
    window.addEventListener('resize', initDrops);

    // Draw matrix rain
    function drawMatrix() {
        // Semi-transparent black to create trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Green text
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = charArray[Math.floor(Math.random() * charArray.length)];

            // Draw character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            // Reset drop when it goes off screen
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Move drop down
            drops[i]++;
        }
    }

    // Animation loop
    setInterval(drawMatrix, 50);

    // ===================================
    // HAMBURGER MENU TOGGLE
    // ===================================
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            nav.classList.toggle('open');
        });

        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                nav.classList.remove('open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
                menuBtn.classList.remove('open');
                nav.classList.remove('open');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                menuBtn.classList.remove('open');
                nav.classList.remove('open');
            }
        });
    }

    // ===================================
    // CURRENT TIME DISPLAY
    // ===================================
    const timeElement = document.getElementById('current-time');

    function updateTime() {
        if (timeElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    updateTime();
    setInterval(updateTime, 1000);

    // ===================================
    // TYPING EFFECT FOR TERMINAL COMMANDS
    // ===================================
    const commands = document.querySelectorAll('.terminal__command');

    commands.forEach((cmd, index) => {
        const text = cmd.textContent;
        cmd.textContent = '';
        cmd.style.visibility = 'visible';

        let charIndex = 0;
        const delay = index * 500; // Stagger each command

        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    cmd.textContent += text[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, delay);
    });

    // ===================================
    // GLITCH EFFECT INTENSIFY ON HOVER
    // ===================================
    const glitchElement = document.querySelector('.glitch');

    if (glitchElement) {
        glitchElement.addEventListener('mouseenter', () => {
            glitchElement.style.animation = 'none';
            void glitchElement.offsetWidth; // Trigger reflow
            glitchElement.style.animation = null;
        });
    }

    // ===================================
    // KONAMI CODE EASTER EGG
    // ===================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        document.body.style.transition = 'filter 0.5s';
        document.body.style.filter = 'hue-rotate(180deg)';

        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);

        // Create a temporary message
        const msg = document.createElement('div');
        msg.textContent = '> ACCESS GRANTED';
        msg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 65, 0.2);
            border: 2px solid #00ff41;
            padding: 2rem 4rem;
            font-size: 2rem;
            font-family: 'Fira Code', monospace;
            color: #00ff41;
            text-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
            z-index: 9999;
            animation: fadeIn 0.5s ease;
        `;
        document.body.appendChild(msg);

        setTimeout(() => {
            msg.remove();
        }, 2500);
    }

    // ===================================
    // SMOOTH SCROLL BEHAVIOR
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===================================
    // CONSOLE EASTER EGG
    // ===================================
    console.log('%c ██╗ ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ ', 'color: #00ff41; font-size: 12px;');
    console.log('%c ██║ ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗', 'color: #00ff41; font-size: 12px;');
    console.log('%c ███████║███████║██║     █████╔╝ █████╗  ██║  ██║', 'color: #00ff41; font-size: 12px;');
    console.log('%c ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██║  ██║', 'color: #00ff41; font-size: 12px;');
    console.log('%c ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██████╔╝', 'color: #00ff41; font-size: 12px;');
    console.log('%c ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ ', 'color: #00ff41; font-size: 12px;');
    console.log('%c Welcome to my portfolio! Try the Konami code for a surprise.', 'color: #00d4ff; font-size: 14px;');

})();
