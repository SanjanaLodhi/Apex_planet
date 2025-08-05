// load-navbar.js
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('body').insertAdjacentHTML('afterbegin', data);
        // Initialize mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    });