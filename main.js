function toggleMenu() {
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('show');
}

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


function showAlert() {
    alert("Thank you for your interest! Our shop is coming soon.");
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});