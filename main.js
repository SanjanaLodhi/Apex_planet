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




document.addEventListener('DOMContentLoaded', function() {
  
    const contactForm = document.querySelector('.contact form');
    
    if (contactForm) {
       
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const numberInput = contactForm.querySelector('input[type="number"]');
        const messageInput = contactForm.querySelector('textarea');
        const submitBtn = contactForm.querySelector('input[type="submit"]');

        const nameError = createErrorElement();
        const emailError = createErrorElement();
        const numberError = createErrorElement();
        const messageError = createErrorElement();

        
        nameInput.insertAdjacentElement('afterend', nameError);
        emailInput.insertAdjacentElement('afterend', emailError);
        numberInput.insertAdjacentElement('afterend', numberError);
        messageInput.insertAdjacentElement('afterend', messageError);

       
        nameInput.addEventListener('input', () => validateName());
        emailInput.addEventListener('input', () => validateEmail());
        numberInput.addEventListener('input', () => validateNumber());
        messageInput.addEventListener('input', () => validateMessage());


        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isNumberValid = validateNumber();  
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isNumberValid && isMessageValid) {  
          
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
                clearAllErrors();
            }
        });


        function validateName() {
            if (nameInput.value.trim() === '') {
                showError(nameInput, nameError, 'Name is required');
                return false;
            } else if (nameInput.value.trim().length < 3) {
                showError(nameInput, nameError, 'Name must be at least 3 characters');
                return false;
            } else {
                clearError(nameInput, nameError);
                return true;
            }
        }

        function validateEmail() {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email === '') {
                showError(emailInput, emailError, 'Email is required');
                return false;
            } else if (!emailRegex.test(email)) {
                showError(emailInput, emailError, 'Please enter a valid email');
                return false;
            } else {
                clearError(emailInput, emailError);
                return true;
            }
        }

        function validateNumber() {
            const number = numberInput.value.trim();
            const numberRegex = /^\d{10}$/;
            
            if (number === '') {
                showError(numberInput, numberError, 'Phone number is required');
                return false;
            } else if (!numberRegex.test(number)) {
                showError(numberInput, numberError, 'Please enter a valid 10-digit number');
                return false;
            } else {
                clearError(numberInput, numberError);
                return true;
            }
        }

        function validateMessage() {
            if (messageInput.value.trim() === '') {
                showError(messageInput, messageError, 'Message is required');
                return false;
            } else if (messageInput.value.trim().length < 0) {
                showError(messageInput, messageError, 'Message must be at least 10 characters');
                return false;
            } else {
                clearError(messageInput, messageError);
                return true;
            }
        }

        
        function createErrorElement() {
            const error = document.createElement('p');
            error.className = 'error-message';
            error.style.color = '#ff4d4d';
            error.style.marginTop = '5px';
            error.style.fontSize = '0.9rem';
            return error;
        }

        function showError(input, errorElement, message) {
            input.classList.add('error');
            errorElement.textContent = message;
        }

        function clearError(input, errorElement) {
            input.classList.remove('error');
            errorElement.textContent = '';
        }

        function clearAllErrors() {
            [nameInput, emailInput, numberInput, messageInput].forEach(input => {  
                input.classList.remove('error');
            });
            [nameError, emailError, numberError, messageError].forEach(error => {  
                error.textContent = '';
            });
        }
    }

   
    function Alert() {
        alert("Thank you for your interest! Our shop is coming soon.");
    }
});



const flowers = [
  { id: 1, name: "Rose Bouquet", price: 500, image: "rose.jpg" },
  { id: 2, name: "Tulip Bundle", price: 400, image: "tulip.jpg" },
  { id: 3, name: "Sunflower Pack", price: 350, image: "sunflower.webp" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function renderFlowers() {
  const flowerGrid = document.getElementById("flowerGrid");
  flowerGrid.innerHTML = flowers.map(flower => `
    <div class="flower-card">
      <img src="images/${flower.image}" alt="${flower.name}">
      <h3>${flower.name}</h3>
      <p>₹${flower.price}</p>
      <button class="add-to-cart" onclick="addToCart(${flower.id})">Add to Cart</button>
    </div>
  `).join("");
}


function addToCart(flowerId) {
  const flower = flowers.find(f => f.id === flowerId);
  cart.push(flower);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}


function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = cart.map((item, index) => `
    <li>
      ${item.name} - ₹${item.price}
      <span class="remove-item" onclick="removeItem(${index})">×</span>
    </li>
  `).join("");

  document.getElementById("cartCount").textContent = cart.length;
  document.getElementById("cartTotal").textContent = cart.reduce((sum, item) => sum + item.price, 0);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}


renderFlowers();
updateCart();