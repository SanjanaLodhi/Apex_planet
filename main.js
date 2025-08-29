const products = [
        {
          id: 1,
          name: "Rose Bouquet",
          price: 50.0,
          category: "bouquet",
          image: "images/rose.jpg",
          description:
            "A classic bouquet of a dozen red roses, symbolizing love and passion.",
        },
        {
          id: 2,
          name: "Tulip Bundle",
          price: 40.0,
          category: "bouquet",
          image: "images/tulip.jpg",
          description: "A cheerful bundle of fresh pink and yellow tulips.",
        },
        {
          id: 3,
          name: "Sunflower Pack",
          price: 35.0,
          category: "bouquet",
          image: "images/sunflower.jpg",
          description: "Bright and sunny sunflowers to light up anyone's day.",
        },
        {
          id: 4,
          name: "Orchid Arrangement",
          price: 65.0,
          category: "arrangement",
          image: "images/Orchid.jpg",
          description:
            "Elegant orchid arrangement perfect for home or office decoration.",
        },
        {
          id: 5,
          name: "Spring Medley",
          price: 55.0,
          category: "seasonal",
          image: "images/Spring Medley.jpg",
          description:
            "A seasonal mix of the freshest spring flowers available.",
        },
        {
          id: 6,
          name: "Bridal Bouquet",
          price: 120.0,
          category: "wedding",
          image: "images/Bridal.jpg",
          description: "Exquisite bridal bouquet with white roses and lilies.",
        },
      ];

      // Cart functionality
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // DOM Elements
      const productsGrid = document.getElementById("products-grid");
      const cartCount = document.getElementById("cart-count");
      const cartItems = document.getElementById("cart-items");
      const cartTotal = document.getElementById("cart-total");
      const emptyCartMessage = document.getElementById("empty-cart-message");
      const checkoutBtn = document.getElementById("checkout-btn");
      const checkoutForm = document.getElementById("checkout-form");
      const filterBtns = document.querySelectorAll(".filter-btn");
      const mobileMenuBtn = document.getElementById("mobile-menu-btn");
      const navLinks = document.getElementById("nav-links");

      // Contact form elements
      const contactForm = document.getElementById("contactForm");
      const successAlert = document.getElementById("success-alert");
      const errorAlert = document.getElementById("error-alert");
      const contactNameInput = document.getElementById("contact-name");
      const contactEmailInput = document.getElementById("contact-email");
      const contactNumberInput = document.getElementById("contact-number");
      const contactMessageInput = document.getElementById("contact-message");

      // Initialize the application
      function init() {
        renderProducts();
        updateCartUI();
        setupEventListeners();
        setupContactFormValidation();
      }

      // Render products to the page
      function renderProducts(filter = "all") {
        productsGrid.innerHTML = "";

        const filteredProducts =
          filter === "all"
            ? products
            : products.filter((product) => product.category === filter);

        filteredProducts.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.className = "product-card";
          productCard.innerHTML = `
                    <img src="${product.image}" alt="${
            product.name
          }" class="product-image" loading="lazy">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${
                          product.description
                        }</p>
                        <p class="product-price">$${product.price.toFixed(
                          2
                        )}</p>
                        <button class="btn add-to-cart" data-id="${
                          product.id
                        }">Add to Cart</button>
                    </div>
                `;
          productsGrid.appendChild(productCard);
        });
      }

      // Add product to cart
      function addToCart(productId) {
        const product = products.find((p) => p.id === productId);
        const existingItem = cart.find((item) => item.id === productId);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update UI
        updateCartUI();

        // Show feedback
        alert(`${product.name} added to cart!`);
      }

      // Update cart UI
      function updateCartUI() {
        // Update cart count
        const totalItems = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        cartCount.textContent = totalItems;

        // Update cart items
        if (cart.length === 0) {
          emptyCartMessage.classList.remove("hidden");
          cartItems.innerHTML = "";
          cartTotal.textContent = "Total: $0.00";
          return;
        }

        emptyCartMessage.classList.add("hidden");
        cartItems.innerHTML = "";

        let total = 0;

        cart.forEach((item) => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;

          const cartItem = document.createElement("div");
          cartItem.className = "cart-item";
          cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${
            item.name
          }" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>$${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease" data-id="${
                          item.id
                        }">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${
                          item.id
                        }">+</button>
                        <button class="quantity-btn remove" data-id="${
                          item.id
                        }"><i class="fas fa-trash"></i></button>
                    </div>
                `;
          cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
      }

      // Update item quantity in cart
      function updateQuantity(productId, change) {
        const item = cart.find((item) => item.id === productId);

        if (item) {
          item.quantity += change;

          if (item.quantity <= 0) {
            cart = cart.filter((item) => item.id !== productId);
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartUI();
        }
      }

      // Remove item from cart
      function removeFromCart(productId) {
        cart = cart.filter((item) => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
      }

      // Setup contact form validation
      function setupContactFormValidation() {
        // Add input event listeners to all contact form fields
        contactNameInput.addEventListener("input", function () {
          if (contactNameInput.value.trim() !== "") {
            hideError("name-error");
          }
        });

        contactEmailInput.addEventListener("input", function () {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailPattern.test(contactEmailInput.value.trim())) {
            hideError("email-error");
          }
        });

        contactNumberInput.addEventListener("input", function () {
          if (
            contactNumberInput.value.trim() !== "" &&
            !isNaN(contactNumberInput.value) &&
            contactNumberInput.value.length >= 10
          ) {
            hideError("number-error");
          }
        });

        contactMessageInput.addEventListener("input", function () {
          if (contactMessageInput.value.trim() !== "") {
            hideError("message-error");
          }
        });

        contactForm.addEventListener("submit", function (e) {
          e.preventDefault();

          // Reset previous errors
          hideAllErrors();
          hideAlert(successAlert);
          hideAlert(errorAlert);

          // Validate form
          const isValid = validateContactForm();

          if (isValid) {
            // Show success alert
            showAlert(successAlert);

            // Reset form
            contactForm.reset();
          } else {
            // Show error alert
            showAlert(errorAlert);
          }
        });
      }

      // Validate contact form
      function validateContactForm() {
        let isValid = true;

        // Validate name
        const name = contactNameInput.value.trim();
        if (name === "") {
          showError("name-error");
          isValid = false;
        }

        // Validate email
        const email = contactEmailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          showError("email-error");
          isValid = false;
        }

        // Validate number
        const number = contactNumberInput.value.trim();
        if (number === "" || isNaN(number) || number.length < 10) {
          showError("number-error");
          isValid = false;
        }

        // Validate message
        const message = contactMessageInput.value.trim();
        if (message === "") {
          showError("message-error");
          isValid = false;
        }

        return isValid;
      }

      function showError(id) {
        const errorElement = document.getElementById(id);
        errorElement.style.display = "block";
      }

      function hideError(id) {
        const errorElement = document.getElementById(id);
        errorElement.style.display = "none";
      }

      function hideAllErrors() {
        const errors = document.querySelectorAll(".error-message");
        errors.forEach((error) => {
          error.style.display = "none";
        });
      }

      function showAlert(alert) {
        alert.classList.add("show");

        // Auto-hide after 5 seconds
        setTimeout(() => {
          hideAlert(alert);
        }, 5000);
      }

      function hideAlert(alert) {
        alert.classList.remove("show");
      }

      // Setup event listeners
      function setupEventListeners() {
        // Mobile menu toggle
        mobileMenuBtn.addEventListener("click", () => {
          navLinks.classList.toggle("active");
        });

        // Filter buttons
        filterBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            renderProducts(btn.dataset.filter);
          });
        });

        // Add to cart buttons (delegation)
        document.addEventListener("click", (e) => {
          if (e.target.classList.contains("add-to-cart")) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
          }

          // Cart quantity controls
          if (e.target.classList.contains("increase")) {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, 1);
          }

          if (e.target.classList.contains("decrease")) {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, -1);
          }

          if (
            e.target.classList.contains("remove") ||
            e.target.closest(".remove")
          ) {
            const productId = parseInt(
              e.target.dataset.id || e.target.closest(".remove").dataset.id
            );
            removeFromCart(productId);
          }
        });

        // Checkout button
        checkoutBtn.addEventListener("click", () => {
          document.getElementById("cart").classList.add("hidden");
          document.getElementById("checkout").classList.remove("hidden");
        });

        // Checkout form submission
        checkoutForm.addEventListener("submit", (e) => {
          e.preventDefault();

          // In a real application, you would process the payment here
          alert("Order placed successfully! Thank you for your purchase.");

          // Clear cart
          cart = [];
          localStorage.removeItem("cart");
          updateCartUI();

          // Return to products
          document.getElementById("checkout").classList.add("hidden");
          document.getElementById("cart").classList.add("hidden");
          window.location.href = "#products";
        });

        // Navigation smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              // Close mobile menu if open
              navLinks.classList.remove("active");

              // Scroll to element
              window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: "smooth",
              });
            }
          });
        });
      }

      // Initialize the app when DOM is loaded
      document.addEventListener("DOMContentLoaded", init);
