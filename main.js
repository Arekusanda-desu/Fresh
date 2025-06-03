document.addEventListener('DOMContentLoaded', function () {
  // Navbar sticky logic
  window.addEventListener('scroll', function () {
    const navbarSticky = document.getElementById('navbar');
    const mainNavbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    if (!navbarSticky || !mainNavbar || !hero) return;

    const heroBottom = hero.getBoundingClientRect().bottom;

    if (heroBottom < 0) {
      navbarSticky.classList.add('visible-navbar');
      navbarSticky.classList.remove('hidden-navbar');
      mainNavbar.style.display = 'none';
    } else {
      navbarSticky.classList.add('hidden-navbar');
      navbarSticky.classList.remove('visible-navbar');
      mainNavbar.style.display = 'flex';
    }
  });

  // Rozwijanie sekcji
  const sections = document.querySelectorAll('.section');
  const toggleBtn = document.getElementById('toggleAll');
  let expanded = false;

  sections.forEach(section => {
    section.addEventListener('click', () => {
      section.classList.toggle('active');
    });
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      expanded = !expanded;
      sections.forEach(section => {
        if (expanded) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
      toggleBtn.textContent = expanded ? 'Zwiń wszystko' : 'Rozwiń wszystko';
    });
  }

  // Oceny gwiazdkowe
  const stars = document.querySelectorAll('#star-select span');
  const emailInput = document.getElementById('email-input');
  const submitBtn = document.getElementById('submit-rating');
  const ratingMessage = document.getElementById('rating-message');
  let selectedRating = 0;

  function highlightStars(count) {
    stars.forEach((star, i) => {
      star.textContent = i < count ? '★' : '☆';
    });
  }

  if (stars.length > 0) {
    stars.forEach((star, index) => {
      star.addEventListener('mouseover', () => {
        highlightStars(index + 1);
      });

      star.addEventListener('mouseout', () => {
        highlightStars(selectedRating);
      });

      star.addEventListener('click', () => {
        selectedRating = index + 1;
        highlightStars(selectedRating);
      });
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const email = emailInput.value.trim();
      if (!email || !validateEmail(email)) {
        alert("Podaj poprawny adres e-mail.");
        return;
      }
      if (selectedRating === 0) {
        alert("Wybierz ocenę (liczbę gwiazdek).");
        return;
      }

      console.log("Ocena:", selectedRating);
      console.log("Email:", email);

      ratingMessage.style.display = "block";
      emailInput.value = "";
      selectedRating = 0;
      highlightStars(0);
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Koszyk: licznik
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const counter = document.getElementById('cart-count');
  if (counter && cart.length > 0) {
    counter.textContent = cart.length;
    counter.classList.remove('hidden');
  }
});

// Modal koszyk
function toggleCartModal() {
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.classList.toggle('hidden');
    loadCartModal();
  }
}

function loadCartModal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cartContent');
  const counter = document.getElementById('cart-count');

  if (!container) return;

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center">Koszyk jest pusty.</p>';
    if (counter) counter.classList.add('hidden');
  } else {
    if (counter) {
      counter.textContent = cart.length;
      counter.classList.remove('hidden');
    }

    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'flex justify-between items-center bg-gray-100 p-3 rounded';
      div.innerHTML = `
        <div>
          <h3 class="font-semibold">${item.name}</h3>
          <p class="text-sm text-gray-600">${item.price}</p>
        </div>
        <button onclick="removeFromCart(${index})" class="text-red-600 hover:text-red-800 text-sm">Usuń</button>
      `;
      container.appendChild(div);
    });
  }
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCartModal();
}

function clearCart() {
  localStorage.removeItem('cart');
  loadCartModal();
}
