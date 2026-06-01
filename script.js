document.addEventListener('DOMContentLoaded', function () {

  setTimeout(function () {
    document.getElementById('hero-content').classList.add('visible');
  }, 300);

  window.addEventListener('scroll', function () {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 80);
  });

  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.car-card').forEach(function (card) {
    observer.observe(card);
  });

  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.car-card').forEach(function (card) {
        card.classList.toggle('hidden', filter !== 'all' && card.getAttribute('data-type') !== filter);
      });
    });
  });

  document.querySelectorAll('.card-footer .btn-dark').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var label   = btn.closest('.car-card').querySelector('.card-label');
      var carName = label.querySelector('span').textContent + ' ' + label.querySelector('strong').textContent;
      var price   = btn.closest('.car-card').querySelector('.price').textContent;
      alert(carName + '\n' + price + '\n\nVisit your nearest VW dealership to book a test drive!');
    });
  });

  var emailInput = document.querySelector('.newsletter input');
  var subBtn     = document.querySelector('.newsletter .btn');
  if (subBtn) {
    subBtn.addEventListener('click', function () {
      var email = emailInput.value.trim();
      if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return; }
      alert('Subscribed successfully!');
      emailInput.value = '';
    });
  }

  document.querySelector('.scroll-down').addEventListener('click', function () {
    document.getElementById('models').scrollIntoView({ behavior: 'smooth' });
  });

});
