// Управление sticky-navbar при прокрутке
window.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', function () {
      const navbarSticky = document.getElementById('navbar');     // Sticky navbar
      const mainNavbar = document.querySelector('.navbar');       // Главный navbar
      const hero = document.querySelector('.hero');
      const heroBottom = hero.getBoundingClientRect().bottom;
  
      if (heroBottom < 0) {
        // Показываем sticky navbar
        navbarSticky.classList.add('visible-navbar');
        navbarSticky.classList.remove('hidden-navbar');
        mainNavbar.style.display = 'none';
      } else {
        // Показываем главный navbar
        navbarSticky.classList.add('hidden-navbar');
        navbarSticky.classList.remove('visible-navbar');
        mainNavbar.style.display = 'flex';
      }
    });
  
    // Логика активации отдельных секций при клике
    const sections = document.querySelectorAll('.section');
    const toggleBtn = document.getElementById('toggleAll');
    let expanded = false;
  
    // Клик по отдельной секции
    sections.forEach(section => {
      section.addEventListener('click', () => {
        section.classList.toggle('active');
      });
    });
  
    // Кнопка "Развернуть/Свернуть все"
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
  
    // Оценка со звездами
    const stars = document.querySelectorAll('#star-select span');
    const emailInput = document.getElementById('email-input');
    const submitBtn = document.getElementById('submit-rating');
    const ratingMessage = document.getElementById('rating-message');
  
    let selectedRating = 0;
  
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
  
    function highlightStars(count) {
      stars.forEach((star, i) => {
        star.textContent = i < count ? '★' : '☆';
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
      // Простая валидация email
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  });
  
