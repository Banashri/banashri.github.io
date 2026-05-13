document.addEventListener('DOMContentLoaded', function () {

  // ===== MOBILE MENU =====
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var mobileClose = document.querySelector('.mobile-menu-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMobileMenu);
    }

    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // ===== TAG / STATUS FILTERING =====
  var filterBtns = document.querySelectorAll('.filter-btn');
  var filterableCards = document.querySelectorAll('[data-tags], [data-status]');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filterValue = btn.getAttribute('data-filter');

      filterableCards.forEach(function (card) {
        if (filterValue === 'all') {
          card.classList.remove('hidden');
          return;
        }

        var tags = card.getAttribute('data-tags');
        var status = card.getAttribute('data-status');
        var match = false;

        if (tags) {
          match = tags.split(' ').indexOf(filterValue) !== -1;
        }
        if (status) {
          match = status === filterValue;
        }

        if (match) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ===== PHOTO LIGHTBOX =====
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;

  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Image viewer');
  lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Previous image">&#8249;</button>' +
    '<img src="" alt="Full size photo">' +
    '<button class="lightbox-next" aria-label="Next image">&#8250;</button>';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector('img');
  var lightboxClose = lightbox.querySelector('.lightbox-close');
  var lightboxPrev = lightbox.querySelector('.lightbox-prev');
  var lightboxNext = lightbox.querySelector('.lightbox-next');
  var currentIndex = 0;

  function getImageSrc(item) {
    var img = item.querySelector('img');
    return img ? img.src : '';
  }

  function openLightbox(index) {
    currentIndex = index;
    var src = getImageSrc(galleryItems[currentIndex]);
    if (!src) return;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = getImageSrc(galleryItems[currentIndex]);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImg.src = getImageSrc(galleryItems[currentIndex]);
  }

  galleryItems.forEach(function (item, idx) {
    item.addEventListener('click', function () {
      openLightbox(idx);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrev);
  lightboxNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

});
