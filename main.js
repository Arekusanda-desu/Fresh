window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    const hero = document.querySelector('.hero');
    const heroBottom = hero.getBoundingClientRect().bottom;
  
    if (heroBottom < 0) {
      navbar.classList.add('visible-navbar');
      navbar.classList.remove('hidden-navbar');
    } else {
      navbar.classList.add('hidden-navbar');
      navbar.classList.remove('visible-navbar');
    }
  });

  window.addEventListener('scroll', function () {
    const navbarSticky = document.getElementById('navbar'); 
    const mainNavbar = document.querySelector('.navbar');  
    const hero = document.querySelector('.hero');
    const heroBottom = hero.getBoundingClientRect().bottom;
  
    if (heroBottom < 0) {
      navbarSticky.style.display = 'block';    
      mainNavbar.style.display = 'none';       
      navbarSticky.style.display = 'none';      
      mainNavbar.style.display = 'flex';       
    }
  });

  const sections = document.querySelectorAll('.section');
  const toggleBtn = document.getElementById('toggleAll');
  let expanded = false;

  sections.forEach(section => {
    section.addEventListener('click', () => {
      section.classList.toggle('active');
    });
  });

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
