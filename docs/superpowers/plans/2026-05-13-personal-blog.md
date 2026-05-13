# Personal Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal blog for Banashri as a pure static HTML+CSS site with 7 pages, blog post system, photo lightbox, tag filtering, and mobile-responsive navigation.

**Architecture:** Pure static HTML — every page is a standalone `.html` file. A single shared `css/style.css` handles all styling. A single `js/main.js` provides three interactive features: blog/book tag filtering, photo lightbox, and mobile hamburger menu. Blog posts live as individual HTML files in `posts/`. No build step, no frameworks, no dependencies beyond Google Fonts.

**Tech Stack:** HTML5, CSS3 (flexbox, grid, media queries), vanilla JavaScript (ES6), Google Fonts (Cormorant Garamond + Inter)

---

## File Map

| File | Responsibility |
|------|---------------|
| `css/style.css` | All styling — layout, typography, colors, responsive breakpoints, transitions |
| `js/main.js` | Tag/status filtering, photo lightbox, mobile hamburger menu |
| `index.html` | Home page — hero, featured quote, recent posts |
| `about.html` | About Me — photo + bio |
| `blog.html` | Blog listing — tag filter bar + post cards linking to `posts/*.html` |
| `photos.html` | Photo gallery grid with lightbox |
| `books.html` | Books list with status filter |
| `life-events.html` | Vertical timeline |
| `quotes.html` | Quote card grid |
| `posts/template.html` | Copy-paste template for new blog posts |
| `posts/the-art-of-slowing-down.html` | Sample blog post 1 |
| `posts/weekend-in-mountains.html` | Sample blog post 2 |

---

### Task 1: Create CSS Foundation

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Create the complete stylesheet**

```css
/* ===== RESET & BASE ===== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #fafaf8;
  color: #2c2c2c;
  font-weight: 300;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }
button { font-family: inherit; cursor: pointer; }
ul, ol { list-style: none; }

/* ===== NAVIGATION ===== */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 60px;
  border-bottom: 1px solid #e8e6e1;
  background: #fafaf8;
}
.nav-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px;
  font-weight: 300;
  letter-spacing: 4px;
  color: #2c2c2c;
}
.nav-links { display: flex; gap: 32px; }
.nav-links a {
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 400;
  color: #888;
  transition: color 0.3s;
}
.nav-links a:hover,
.nav-links a.active { color: #2c2c2c; }

/* Hamburger button — hidden on desktop */
.hamburger {
  display: none;
  background: none;
  border: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: #2c2c2c;
  transition: transform 0.3s, opacity 0.3s;
}

/* Mobile menu overlay */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background: #fafaf8;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  transition: right 0.3s ease;
}
.mobile-menu.open { right: 0; }
.mobile-menu a {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 300;
  letter-spacing: 3px;
  color: #888;
  transition: color 0.3s;
}
.mobile-menu a:hover,
.mobile-menu a.active { color: #2c2c2c; }
.mobile-menu-close {
  position: absolute;
  top: 28px;
  right: 28px;
  background: none;
  border: none;
  font-size: 28px;
  color: #2c2c2c;
  cursor: pointer;
}

/* ===== FOOTER ===== */
.footer {
  text-align: center;
  padding: 40px;
  border-top: 1px solid #e8e6e1;
  font-size: 12px;
  color: #bbb;
  letter-spacing: 1px;
}

/* ===== HOME — HERO ===== */
.hero {
  text-align: center;
  padding: 100px 40px 80px;
  max-width: 700px;
  margin: 0 auto;
}
.hero h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 52px;
  font-weight: 300;
  line-height: 1.2;
  color: #2c2c2c;
  margin-bottom: 20px;
}
.hero p {
  font-size: 16px;
  color: #777;
  line-height: 1.8;
  max-width: 500px;
  margin: 0 auto;
}
.hero-divider {
  width: 40px;
  height: 1px;
  background: #ccc;
  margin: 30px auto;
}

/* ===== HOME — FEATURED QUOTE ===== */
.quote-accent {
  text-align: center;
  padding: 50px 40px;
  background: #f4f3ef;
  border-top: 1px solid #e8e6e1;
  border-bottom: 1px solid #e8e6e1;
}
.quote-accent blockquote {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-style: italic;
  color: #555;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}
.quote-accent cite {
  display: block;
  margin-top: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  color: #aaa;
  font-style: normal;
  text-transform: uppercase;
}

/* ===== SECTION TITLES ===== */
.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 16px;
  color: #2c2c2c;
}
.section-subtitle {
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-bottom: 40px;
}

/* ===== TAG / STATUS FILTER ===== */
.filter-bar {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
}
.filter-btn {
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #888;
  border: 1px solid #ddd;
  padding: 6px 16px;
  border-radius: 20px;
  background: transparent;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
}
.filter-btn.active,
.filter-btn:hover {
  background: #2c2c2c;
  color: #fff;
  border-color: #2c2c2c;
}

/* ===== BLOG LISTING ===== */
.blog-page { max-width: 900px; margin: 0 auto; padding: 60px 40px; }

.post-card {
  display: flex;
  gap: 24px;
  padding: 32px 0;
  border-bottom: 1px solid #eee;
  transition: opacity 0.2s;
}
.post-card:hover { opacity: 0.7; }
.post-card:last-child { border-bottom: none; }
.post-card.hidden { display: none; }

.post-thumb {
  width: 180px;
  height: 120px;
  border-radius: 4px;
  flex-shrink: 0;
  object-fit: cover;
  background: linear-gradient(135deg, #e8e6e1 0%, #d5d0c8 100%);
}
.post-body { flex: 1; }
.post-date {
  font-size: 11px;
  color: #aaa;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
  text-transform: uppercase;
}
.post-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 400;
  color: #2c2c2c;
  margin-bottom: 8px;
  line-height: 1.3;
}
.post-excerpt {
  font-size: 14px;
  color: #888;
  line-height: 1.7;
  margin-bottom: 12px;
}
.post-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.tag {
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #999;
  border: 1px solid #ddd;
  padding: 3px 10px;
  border-radius: 20px;
}

/* ===== BLOG POST (individual) ===== */
.post-page { max-width: 720px; margin: 0 auto; padding: 60px 40px 80px; }

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 40px;
  transition: color 0.2s;
}
.back-link:hover { color: #2c2c2c; }

.post-header { text-align: center; margin-bottom: 50px; }
.post-header .post-date { margin-bottom: 16px; }
.post-header h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 42px;
  font-weight: 300;
  line-height: 1.25;
  margin-bottom: 20px;
}
.post-header .post-tags { justify-content: center; }
.post-divider {
  width: 40px;
  height: 1px;
  background: #ccc;
  margin: 30px auto 0;
}

.post-content p {
  font-size: 16px;
  color: #444;
  line-height: 1.9;
  margin-bottom: 24px;
}
.post-content h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 400;
  margin: 48px 0 20px;
  color: #2c2c2c;
}
.post-content blockquote {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-style: italic;
  color: #555;
  border-left: 2px solid #ddd;
  padding: 12px 0 12px 28px;
  margin: 32px 0;
  line-height: 1.6;
}
.post-content img {
  width: 100%;
  border-radius: 4px;
  margin: 32px 0 12px;
}
.post-content .image-caption {
  text-align: center;
  font-size: 12px;
  color: #aaa;
  margin-bottom: 32px;
  font-style: italic;
}
.post-content ul,
.post-content ol {
  padding-left: 24px;
  margin-bottom: 24px;
}
.post-content li {
  font-size: 16px;
  color: #444;
  line-height: 1.9;
  list-style: disc;
}
.post-content ol li { list-style: decimal; }

.post-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}
.post-nav a {
  color: #888;
  font-size: 13px;
  letter-spacing: 1px;
  transition: color 0.2s;
}
.post-nav a:hover { color: #2c2c2c; }
.post-nav .nav-label {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #bbb;
  display: block;
  margin-bottom: 4px;
}

/* ===== ABOUT ===== */
.about-section {
  max-width: 750px;
  margin: 0 auto;
  padding: 80px 40px;
  display: flex;
  gap: 50px;
  align-items: flex-start;
}
.about-photo {
  width: 200px;
  height: 240px;
  border-radius: 4px;
  flex-shrink: 0;
  object-fit: cover;
  background: linear-gradient(135deg, #e8e6e1 0%, #d5d0c8 100%);
}
.about-text h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 300;
  margin-bottom: 20px;
}
.about-text p {
  font-size: 15px;
  color: #666;
  line-height: 1.9;
  margin-bottom: 16px;
}

/* ===== PHOTO GALLERY ===== */
.gallery-section { padding: 60px 60px 80px; max-width: 1000px; margin: 0 auto; }
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.gallery-item {
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  background: linear-gradient(135deg, #e0ddd6 0%, #ccc8be 100%);
}
.gallery-item:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gallery-item.tall {
  grid-row: span 2;
  aspect-ratio: auto;
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.lightbox.open {
  opacity: 1;
  pointer-events: auto;
}
.lightbox img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 4px;
}
.lightbox-close {
  position: absolute;
  top: 20px; right: 24px;
  background: none;
  border: none;
  color: #fff;
  font-size: 32px;
  cursor: pointer;
  z-index: 2001;
  line-height: 1;
}
.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  font-size: 36px;
  cursor: pointer;
  padding: 16px;
  z-index: 2001;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.lightbox-prev:hover,
.lightbox-next:hover { opacity: 1; }
.lightbox-prev { left: 16px; }
.lightbox-next { right: 16px; }

/* ===== BOOKS ===== */
.books-section { padding: 60px 60px 80px; max-width: 900px; margin: 0 auto; }
.book-list { display: flex; flex-direction: column; gap: 24px; }
.book-item {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 24px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #eee;
  transition: box-shadow 0.3s;
}
.book-item:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
.book-item.hidden { display: none; }
.book-cover {
  width: 70px;
  height: 100px;
  border-radius: 3px;
  flex-shrink: 0;
  object-fit: cover;
  background: linear-gradient(135deg, #e8e4dc 0%, #d8d2c6 100%);
}
.book-info h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 4px;
}
.book-author { font-size: 13px; color: #999; margin-bottom: 8px; }
.book-note { font-size: 13px; color: #777; margin-top: 8px; line-height: 1.6; font-style: italic; }
.book-status {
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
}
.status-read { background: #e8f5e9; color: #4caf50; }
.status-reading { background: #fff3e0; color: #ff9800; }
.status-want { background: #e3f2fd; color: #2196f3; }

/* ===== TIMELINE ===== */
.timeline-section { padding: 60px 60px 80px; max-width: 700px; margin: 0 auto; }
.timeline { position: relative; padding-left: 40px; }
.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #ddd;
}
.timeline-item { position: relative; margin-bottom: 40px; }
.timeline-item:last-child { margin-bottom: 0; }
.timeline-dot {
  position: absolute;
  left: -36px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2c2c2c;
  border: 2px solid #fafaf8;
}
.timeline-year {
  font-size: 12px;
  letter-spacing: 2px;
  color: #aaa;
  margin-bottom: 6px;
  text-transform: uppercase;
}
.timeline-event {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-weight: 400;
  color: #2c2c2c;
  margin-bottom: 6px;
}
.timeline-desc { font-size: 14px; color: #888; line-height: 1.6; }

/* ===== QUOTES ===== */
.quotes-section { padding: 60px 60px 80px; max-width: 800px; margin: 0 auto; }
.quotes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.quote-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 30px;
  transition: box-shadow 0.3s;
}
.quote-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
.quote-card blockquote {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-style: italic;
  color: #444;
  line-height: 1.6;
  margin-bottom: 16px;
  border: none;
  padding: 0;
}
.quote-card cite {
  font-size: 12px;
  color: #aaa;
  letter-spacing: 1px;
  font-style: normal;
  text-transform: uppercase;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .nav { padding: 20px 24px; }
  .nav-links { display: none; }
  .hamburger { display: flex; }

  .hero { padding: 60px 24px 50px; }
  .hero h1 { font-size: 36px; }

  .blog-page { padding: 40px 20px; }
  .post-card { flex-direction: column; }
  .post-thumb { width: 100%; height: 180px; }

  .post-page { padding: 40px 20px; }
  .post-header h1 { font-size: 30px; }
  .post-nav { flex-direction: column; gap: 20px; }

  .about-section {
    flex-direction: column;
    padding: 50px 24px;
    gap: 30px;
  }
  .about-photo { width: 150px; height: 180px; }

  .gallery-section { padding: 40px 20px; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }

  .books-section { padding: 40px 20px; }

  .timeline-section { padding: 40px 20px; }

  .quotes-section { padding: 40px 20px; }
  .quotes-grid { grid-template-columns: 1fr; }

  .filter-bar { margin-bottom: 30px; }
}
```

- [ ] **Step 2: Verify directory and commit**

Run: `ls css/style.css`

Expected: file exists

```bash
git add css/style.css
git commit -m "feat: add complete stylesheet"
```

---

### Task 2: Create JavaScript (main.js)

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Create the complete JS file**

```javascript
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
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: add main.js — filtering, lightbox, mobile menu"
```

---

### Task 3: Create Home Page (index.html)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create the home page**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Banashri</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="index.html" class="nav-logo">Banashri</a>
    <div class="nav-links">
      <a href="index.html" class="active">Home</a>
      <a href="about.html">About</a>
      <a href="blog.html">Blog</a>
      <a href="photos.html">Photos</a>
      <a href="books.html">Books</a>
      <a href="life-events.html">Life</a>
      <a href="quotes.html">Quotes</a>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <a href="index.html" class="active">Home</a>
    <a href="about.html">About</a>
    <a href="blog.html">Blog</a>
    <a href="photos.html">Photos</a>
    <a href="books.html">Books</a>
    <a href="life-events.html">Life</a>
    <a href="quotes.html">Quotes</a>
  </div>

  <section class="hero">
    <h1>Hello, I'm Banashri</h1>
    <div class="hero-divider"></div>
    <p>Welcome to my little corner of the internet. A place for stories, photos, books, and the moments that shape a life.</p>
  </section>

  <section class="quote-accent">
    <blockquote>"The only way to do great work is to love what you do."</blockquote>
    <cite>Steve Jobs</cite>
  </section>

  <section class="blog-page">
    <h2 class="section-title">Recent Writing</h2>

    <a href="posts/the-art-of-slowing-down.html" class="post-card">
      <div class="post-thumb"></div>
      <div class="post-body">
        <div class="post-date">May 10, 2026</div>
        <div class="post-title">The Art of Slowing Down</div>
        <div class="post-excerpt">Sometimes the best thing you can do is nothing at all. In a world that celebrates hustle, I've been learning to find peace in stillness...</div>
        <div class="post-tags"><span class="tag">Reflections</span><span class="tag">Life</span></div>
      </div>
    </a>

    <a href="posts/weekend-in-mountains.html" class="post-card">
      <div class="post-thumb"></div>
      <div class="post-body">
        <div class="post-date">April 22, 2026</div>
        <div class="post-title">Weekend in the Mountains</div>
        <div class="post-excerpt">A quiet escape to the hills, where the air smells like pine and the only sound is the wind through the trees...</div>
        <div class="post-tags"><span class="tag">Travel</span></div>
      </div>
    </a>

  </section>

  <footer class="footer">Banashri &middot; 2026</footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Run: `open index.html`

Verify: nav bar shows with all 7 links, hero section centered, quote band visible, two recent post cards shown, footer at bottom. Resize browser to mobile width — hamburger icon appears, clicking it opens full-screen menu.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add home page"
```

---

### Task 4: Create About Page (about.html)

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create the about page**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About — Banashri</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="index.html" class="nav-logo">Banashri</a>
    <div class="nav-links">
      <a href="index.html">Home</a>
      <a href="about.html" class="active">About</a>
      <a href="blog.html">Blog</a>
      <a href="photos.html">Photos</a>
      <a href="books.html">Books</a>
      <a href="life-events.html">Life</a>
      <a href="quotes.html">Quotes</a>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <a href="index.html">Home</a>
    <a href="about.html" class="active">About</a>
    <a href="blog.html">Blog</a>
    <a href="photos.html">Photos</a>
    <a href="books.html">Books</a>
    <a href="life-events.html">Life</a>
    <a href="quotes.html">Quotes</a>
  </div>

  <section class="about-section">
    <div class="about-photo"></div>
    <div class="about-text">
      <h2>About Me</h2>
      <p>A few words about who I am, what I care about, and why I started this space. This is where your personal story goes — whatever feels right to share.</p>
      <p>I believe in the quiet moments, in good books, long walks, and conversations that matter. This blog is my way of holding onto the things I don't want to forget.</p>
      <p>When I'm not writing, you'll find me exploring new places, trying a recipe I found online, or curled up with a book and a cup of tea.</p>
    </div>
  </section>

  <footer class="footer">Banashri &middot; 2026</footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser, verify layout and nav**

Run: `open about.html`

Verify: "About" link is active in nav. Photo placeholder on left, text on right. On mobile, stacks vertically. All nav links point to correct pages.

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: add about page"
```

---

### Task 5: Create Blog Listing Page (blog.html)

**Files:**
- Create: `blog.html`

- [ ] **Step 1: Create the blog listing page**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — Banashri</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="index.html" class="nav-logo">Banashri</a>
    <div class="nav-links">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="blog.html" class="active">Blog</a>
      <a href="photos.html">Photos</a>
      <a href="books.html">Books</a>
      <a href="life-events.html">Life</a>
      <a href="quotes.html">Quotes</a>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="blog.html" class="active">Blog</a>
    <a href="photos.html">Photos</a>
    <a href="books.html">Books</a>
    <a href="life-events.html">Life</a>
    <a href="quotes.html">Quotes</a>
  </div>

  <section class="blog-page">
    <h2 class="section-title">Blog</h2>
    <p class="section-subtitle">Thoughts, stories, and things I've learned along the way.</p>

    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="reflections">Reflections</button>
      <button class="filter-btn" data-filter="travel">Travel</button>
      <button class="filter-btn" data-filter="books">Books</button>
      <button class="filter-btn" data-filter="food">Food</button>
      <button class="filter-btn" data-filter="life">Life</button>
    </div>

    <!-- POST TEMPLATE — copy this block to add a new post:
    <a href="posts/YOUR-POST-SLUG.html" class="post-card" data-tags="tag1 tag2">
      <div class="post-thumb"></div>
      <div class="post-body">
        <div class="post-date">Month Day, Year</div>
        <div class="post-title">Your Post Title</div>
        <div class="post-excerpt">A short excerpt or summary of your post...</div>
        <div class="post-tags"><span class="tag">Tag1</span></div>
      </div>
    </a>
    -->

    <a href="posts/the-art-of-slowing-down.html" class="post-card" data-tags="reflections life">
      <div class="post-thumb"></div>
      <div class="post-body">
        <div class="post-date">May 10, 2026</div>
        <div class="post-title">The Art of Slowing Down</div>
        <div class="post-excerpt">Sometimes the best thing you can do is nothing at all. In a world that celebrates hustle, I've been learning to find peace in stillness...</div>
        <div class="post-tags"><span class="tag">Reflections</span><span class="tag">Life</span></div>
      </div>
    </a>

    <a href="posts/weekend-in-mountains.html" class="post-card" data-tags="travel">
      <div class="post-thumb"></div>
      <div class="post-body">
        <div class="post-date">April 22, 2026</div>
        <div class="post-title">Weekend in the Mountains</div>
        <div class="post-excerpt">A quiet escape to the hills, where the air smells like pine and the only sound is the wind through the trees. Sometimes you need to get away...</div>
        <div class="post-tags"><span class="tag">Travel</span></div>
      </div>
    </a>

  </section>

  <footer class="footer">Banashri &middot; 2026</footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser, verify filtering**

Run: `open blog.html`

Verify: All posts visible by default. Click "Reflections" — only first post shows. Click "Travel" — only second post shows. Click "All" — both show. Post cards are clickable links to `posts/*.html`.

- [ ] **Step 3: Commit**

```bash
git add blog.html
git commit -m "feat: add blog listing page with tag filtering"
```

---

### Task 6: Create Blog Post Template and Sample Posts

**Files:**
- Create: `posts/template.html`
- Create: `posts/the-art-of-slowing-down.html`
- Create: `posts/weekend-in-mountains.html`

- [ ] **Step 1: Create the post template**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>POST TITLE — Banashri</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="../index.html" class="nav-logo">Banashri</a>
    <div class="nav-links">
      <a href="../index.html">Home</a>
      <a href="../about.html">About</a>
      <a href="../blog.html" class="active">Blog</a>
      <a href="../photos.html">Photos</a>
      <a href="../books.html">Books</a>
      <a href="../life-events.html">Life</a>
      <a href="../quotes.html">Quotes</a>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <a href="../index.html">Home</a>
    <a href="../about.html">About</a>
    <a href="../blog.html" class="active">Blog</a>
    <a href="../photos.html">Photos</a>
    <a href="../books.html">Books</a>
    <a href="../life-events.html">Life</a>
    <a href="../quotes.html">Quotes</a>
  </div>

  <article class="post-page">
    <a href="../blog.html" class="back-link">&larr; Back to Blog</a>

    <div class="post-header">
      <div class="post-date">Month Day, Year</div>
      <h1>Your Post Title Here</h1>
      <div class="post-tags">
        <span class="tag">Tag1</span>
        <span class="tag">Tag2</span>
      </div>
      <div class="post-divider"></div>
    </div>

    <div class="post-content">
      <p>Write your first paragraph here. This is the opening of your blog post.</p>

      <h2>A Section Heading</h2>

      <p>More text goes here. You can write as much as you want.</p>

      <!-- To add an image:
      <img src="../images/posts/your-post-name/image.jpg" alt="Description" loading="lazy">
      <p class="image-caption">Caption for the image</p>
      -->

      <blockquote>"A quote that inspires this section."</blockquote>

      <p>Final thoughts to wrap up the post.</p>
    </div>

    <!-- Optional: previous/next post navigation
    <div class="post-nav">
      <a href="previous-post.html">
        <span class="nav-label">&larr; Previous</span>
        Previous Post Title
      </a>
      <a href="next-post.html" style="text-align:right;">
        <span class="nav-label">Next &rarr;</span>
        Next Post Title
      </a>
    </div>
    -->
  </article>

  <footer class="footer">Banashri &middot; 2026</footer>

  <script src="../js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Create sample post 1 — The Art of Slowing Down**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Art of Slowing Down — Banashri</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="../index.html" class="nav-logo">Banashri</a>
    <div class="nav-links">
      <a href="../index.html">Home</a>
      <a href="../about.html">About</a>
      <a href="../blog.html" class="active">Blog</a>
      <a href="../photos.html">Photos</a>
      <a href="../books.html">Books</a>
      <a href="../life-events.html">Life</a>
      <a href="../quotes.html">Quotes</a>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <a href="../index.html">Home</a>
    <a href="../about.html">About</a>
    <a href="../blog.html" class="active">Blog</a>
    <a href="../photos.html">Photos</a>
    <a href="../books.html">Books</a>
    <a href="../life-events.html">Life</a>
    <a href="../quotes.html">Quotes</a>
  </div>

  <article class="post-page">
    <a href="../blog.html" class="back-link">&larr; Back to Blog</a>

    <div class="post-header">
      <div class="post-date">May 10, 2026</div>
      <h1>The Art of Slowing Down</h1>
      <div class="post-tags">
        <span class="tag">Reflections</span>
        <span class="tag">Life</span>
      </div>
      <div class="post-divider"></div>
    </div>

    <div class="post-content">
      <p>There's a particular kind of exhaustion that comes not from doing too much, but from never feeling like you've done enough. I lived in that space for years — always running, always planning the next thing before the current thing was finished.</p>

      <p>Last month, I spent a weekend doing absolutely nothing. No plans, no agenda, no guilt. Just me, a book, a window, and the sound of rain. It was the most productive weekend I've had in years.</p>

      <h2>The Myth of Productivity</h2>

      <p>We've been sold this idea that every minute needs to be optimised, that rest is earned and not given. But the older I get, the more I realise that the best things in life happen in the margins — in the unplanned hours, the aimless walks, the conversations that go nowhere and everywhere at once.</p>

      <blockquote>"Almost everything will work again if you unplug it for a few minutes, including you."</blockquote>

      <p>I'm not suggesting we abandon ambition. I'm suggesting we stop confusing motion with progress. Sometimes sitting still is the bravest thing you can do.</p>

      <h2>What I've Learned</h2>

      <p>The world doesn't fall apart when you take a break. Your inbox will wait. The tasks will still be there. But the sunset won't — it's happening right now, and you're either watching it or you're not.</p>

      <p>I'm learning to choose the sunset more often.</p>
    </div>

    <div class="post-nav">
      <div></div>
      <a href="weekend-in-mountains.html" style="text-align:right;">
        <span class="nav-label">Next &rarr;</span>
        Weekend in the Mountains
      </a>
    </div>
  </article>

  <footer class="footer">Banashri &middot; 2026</footer>

  <script src="../js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: Create sample post 2 — Weekend in the Mountains**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weekend in the Mountains — Banashri</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="../index.html" class="nav-logo">Banashri</a>
    <div class="nav-links">
      <a href="../index.html">Home</a>
      <a href="../about.html">About</a>
      <a href="../blog.html" class="active">Blog</a>
      <a href="../photos.html">Photos</a>
      <a href="../books.html">Books</a>
      <a href="../life-events.html">Life</a>
      <a href="../quotes.html">Quotes</a>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <a href="../index.html">Home</a>
    <a href="../about.html">About</a>
    <a href="../blog.html" class="active">Blog</a>
    <a href="../photos.html">Photos</a>
    <a href="../books.html">Books</a>
    <a href="../life-events.html">Life</a>
    <a href="../quotes.html">Quotes</a>
  </div>

  <article class="post-page">
    <a href="../blog.html" class="back-link">&larr; Back to Blog</a>

    <div class="post-header">
      <div class="post-date">April 22, 2026</div>
      <h1>Weekend in the Mountains</h1>
      <div class="post-tags">
        <span class="tag">Travel</span>
      </div>
      <div class="post-divider"></div>
    </div>

    <div class="post-content">
      <p>There's something about mountains that puts everything into perspective. The noise of daily life fades the moment you start climbing, replaced by the sound of your own breathing and the crunch of gravel under your feet.</p>

      <p>I drove up on Friday evening, windows down, watching the landscape shift from concrete to green. By the time I reached the small town at the base of the hills, the air had changed. Cooler, cleaner, carrying the scent of pine and wet earth.</p>

      <h2>The First Morning</h2>

      <p>I woke up before dawn — not to an alarm, but to silence. The kind of silence that's so complete it wakes you up. I wrapped myself in a blanket and sat on the porch, watching the sky turn from deep blue to soft pink to gold.</p>

      <blockquote>"The mountains are calling and I must go."</blockquote>

      <p>There was a trail behind the guesthouse that wound through a forest of deodar trees. I walked for an hour without seeing another person. Just me, the trees, and the occasional bird call echoing through the canopy.</p>

      <h2>Coming Home</h2>

      <p>The drive back felt different. Not sad, exactly, but aware. Aware that these moments of escape aren't escapes at all — they're returns. Returns to the version of yourself that the city buries under deadlines and notifications.</p>

      <p>I'm already planning my next trip.</p>
    </div>

    <div class="post-nav">
      <a href="the-art-of-slowing-down.html">
        <span class="nav-label">&larr; Previous</span>
        The Art of Slowing Down
      </a>
      <div></div>
    </div>
  </article>

  <footer class="footer">Banashri &middot; 2026</footer>

  <script src="../js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 4: Open in browser, verify full flow**

Run: `open blog.html`

Verify: Click the first post card → opens `posts/the-art-of-slowing-down.html`. Verify "← Back to Blog" link returns to blog.html. Verify "Next →" links to second post. On second post, verify "← Previous" links to first. All nav links use `../` prefix and work correctly.

- [ ] **Step 5: Commit**

```bash
git add posts/
git commit -m "feat: add blog post template and 2 sample posts"
```

---

### Task 7: Create Photos Page (photos.html)

**Files:**
- Create: `photos.html`

- [ ] **Step 1: Create the photos page with placeholder gallery**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Photos — Banashri</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="index.html" class="nav-logo">Banashri</a>
    <div class="nav-links">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="blog.html">Blog</a>
      <a href="photos.html" class="active">Photos</a>
      <a href="books.html">Books</a>
      <a href="life-events.html">Life</a>
      <a href="quotes.html">Quotes</a>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="blog.html">Blog</a>
    <a href="photos.html" class="active">Photos</a>
    <a href="books.html">Books</a>
    <a href="life-events.html">Life</a>
    <a href="quotes.html">Quotes</a>
  </div>

  <section class="gallery-section">
    <h2 class="section-title">Photos</h2>
    <p class="section-subtitle">Moments captured along the way.</p>

    <div class="gallery-grid">

      <!-- PHOTO TEMPLATE — copy this block to add a new photo:
      <div class="gallery-item">
        <img src="images/photos/YOUR-PHOTO.jpg" alt="Description" loading="lazy">
      </div>
      -->

      <div class="gallery-item">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" alt="Mountain landscape" loading="lazy">
      </div>
      <div class="gallery-item tall">
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=800&fit=crop" alt="Forest path" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop" alt="Beach sunset" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop" alt="Starry night mountains" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop" alt="Lake reflection" loading="lazy">
      </div>
      <div class="gallery-item">
        <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop" alt="Misty valley" loading="lazy">
      </div>

    </div>
  </section>

  <footer class="footer">Banashri &middot; 2026</footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser, verify gallery and lightbox**

Run: `open photos.html`

Verify: Grid shows 6 photos (loaded from Unsplash). One tall item spans 2 rows. Click a photo — lightbox opens with dark overlay. Click left/right arrows or use keyboard arrows — cycles through photos. Press Escape or click backdrop — lightbox closes. On mobile, grid shows 2 columns.

- [ ] **Step 3: Commit**

```bash
git add photos.html
git commit -m "feat: add photos page with gallery and lightbox"
```

---

### Task 8: Create Books Page (books.html)

**Files:**
- Create: `books.html`

- [ ] **Step 1: Create the books page**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Books — Banashri</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="index.html" class="nav-logo">Banashri</a>
    <div class="nav-links">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="blog.html">Blog</a>
      <a href="photos.html">Photos</a>
      <a href="books.html" class="active">Books</a>
      <a href="life-events.html">Life</a>
      <a href="quotes.html">Quotes</a>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="blog.html">Blog</a>
    <a href="photos.html">Photos</a>
    <a href="books.html" class="active">Books</a>
    <a href="life-events.html">Life</a>
    <a href="quotes.html">Quotes</a>
  </div>

  <section class="books-section">
    <h2 class="section-title">Books I've Read</h2>
    <p class="section-subtitle">A collection of books that have shaped my thinking.</p>

    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="read">Read</button>
      <button class="filter-btn" data-filter="reading">Reading</button>
      <button class="filter-btn" data-filter="want">Want to Read</button>
    </div>

    <div class="book-list">

      <!-- BOOK TEMPLATE — copy this block to add a new book:
      <div class="book-item" data-status="read">
        <div class="book-cover"></div>
        <div class="book-info">
          <h3>Book Title</h3>
          <div class="book-author">Author Name</div>
          <span class="book-status status-read">Read</span>
          <p class="book-note">A short personal note about the book.</p>
        </div>
      </div>
      -->

      <div class="book-item" data-status="read">
        <div class="book-cover"></div>
        <div class="book-info">
          <h3>Sapiens</h3>
          <div class="book-author">Yuval Noah Harari</div>
          <span class="book-status status-read">Read</span>
          <p class="book-note">Changed how I think about human history and the stories we tell ourselves.</p>
        </div>
      </div>

      <div class="book-item" data-status="reading">
        <div class="book-cover"></div>
        <div class="book-info">
          <h3>The Alchemist</h3>
          <div class="book-author">Paulo Coelho</div>
          <span class="book-status status-reading">Reading</span>
        </div>
      </div>

      <div class="book-item" data-status="read">
        <div class="book-cover"></div>
        <div class="book-info">
          <h3>Atomic Habits</h3>
          <div class="book-author">James Clear</div>
          <span class="book-status status-read">Read</span>
          <p class="book-note">Practical and life-changing. I revisit the core ideas constantly.</p>
        </div>
      </div>

      <div class="book-item" data-status="want">
        <div class="book-cover"></div>
        <div class="book-info">
          <h3>Educated</h3>
          <div class="book-author">Tara Westover</div>
          <span class="book-status status-want">Want to Read</span>
        </div>
      </div>

    </div>
  </section>

  <footer class="footer">Banashri &middot; 2026</footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser, verify filtering**

Run: `open books.html`

Verify: All 4 books visible. Click "Read" — shows Sapiens and Atomic Habits. Click "Reading" — shows The Alchemist only. Click "Want to Read" — shows Educated. Click "All" — shows all. Book status badges have correct colors (green/orange/blue).

- [ ] **Step 3: Commit**

```bash
git add books.html
git commit -m "feat: add books page with status filtering"
```

---

### Task 9: Create Life Events Page (life-events.html)

**Files:**
- Create: `life-events.html`

- [ ] **Step 1: Create the life events page**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Life Events — Banashri</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="index.html" class="nav-logo">Banashri</a>
    <div class="nav-links">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="blog.html">Blog</a>
      <a href="photos.html">Photos</a>
      <a href="books.html">Books</a>
      <a href="life-events.html" class="active">Life</a>
      <a href="quotes.html">Quotes</a>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="blog.html">Blog</a>
    <a href="photos.html">Photos</a>
    <a href="books.html">Books</a>
    <a href="life-events.html" class="active">Life</a>
    <a href="quotes.html">Quotes</a>
  </div>

  <section class="timeline-section">
    <h2 class="section-title">Life Events</h2>
    <p class="section-subtitle">Milestones and moments that shaped the journey.</p>

    <div class="timeline">

      <!-- EVENT TEMPLATE — copy this block to add a new event:
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-year">Year</div>
        <div class="timeline-event">Event Title</div>
        <div class="timeline-desc">A brief description of this milestone.</div>
      </div>
      -->

      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-year">2025</div>
        <div class="timeline-event">Started This Blog</div>
        <div class="timeline-desc">Finally created a space to share my thoughts, photos, and the books that have shaped me.</div>
      </div>

      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-year">2024</div>
        <div class="timeline-event">Started a New Chapter</div>
        <div class="timeline-desc">Moved to a new city, new beginnings, new stories to tell.</div>
      </div>

      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-year">2022</div>
        <div class="timeline-event">Graduated</div>
        <div class="timeline-desc">Completed my degree — years of hard work, late nights, and growth.</div>
      </div>

      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-year">2019</div>
        <div class="timeline-event">First Solo Trip</div>
        <div class="timeline-desc">Traveled alone for the first time. Learned more about myself in a week than in a year.</div>
      </div>

    </div>
  </section>

  <footer class="footer">Banashri &middot; 2026</footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Run: `open life-events.html`

Verify: Timeline displays vertically with dots connected by a line. 4 events in reverse chronological order. Nav shows "Life" as active. All nav links work.

- [ ] **Step 3: Commit**

```bash
git add life-events.html
git commit -m "feat: add life events timeline page"
```

---

### Task 10: Create Quotes Page (quotes.html)

**Files:**
- Create: `quotes.html`

- [ ] **Step 1: Create the quotes page**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quotes — Banashri</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="index.html" class="nav-logo">Banashri</a>
    <div class="nav-links">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="blog.html">Blog</a>
      <a href="photos.html">Photos</a>
      <a href="books.html">Books</a>
      <a href="life-events.html">Life</a>
      <a href="quotes.html" class="active">Quotes</a>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="blog.html">Blog</a>
    <a href="photos.html">Photos</a>
    <a href="books.html">Books</a>
    <a href="life-events.html">Life</a>
    <a href="quotes.html" class="active">Quotes</a>
  </div>

  <section class="quotes-section">
    <h2 class="section-title">Quotes I Live By</h2>
    <p class="section-subtitle">Words that have stayed with me.</p>

    <div class="quotes-grid">

      <!-- QUOTE TEMPLATE — copy this block to add a new quote:
      <div class="quote-card">
        <blockquote>"Your quote text here."</blockquote>
        <cite>Author Name</cite>
      </div>
      -->

      <div class="quote-card">
        <blockquote>"In the middle of difficulty lies opportunity."</blockquote>
        <cite>Albert Einstein</cite>
      </div>

      <div class="quote-card">
        <blockquote>"Not all those who wander are lost."</blockquote>
        <cite>J.R.R. Tolkien</cite>
      </div>

      <div class="quote-card">
        <blockquote>"The unexamined life is not worth living."</blockquote>
        <cite>Socrates</cite>
      </div>

      <div class="quote-card">
        <blockquote>"Be yourself; everyone else is already taken."</blockquote>
        <cite>Oscar Wilde</cite>
      </div>

      <div class="quote-card">
        <blockquote>"The only impossible journey is the one you never begin."</blockquote>
        <cite>Tony Robbins</cite>
      </div>

    </div>
  </section>

  <footer class="footer">Banashri &middot; 2026</footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Run: `open quotes.html`

Verify: 5 quote cards in a 2-column grid. Hover produces subtle shadow. On mobile, single column. "Quotes" is active in nav.

- [ ] **Step 3: Commit**

```bash
git add quotes.html
git commit -m "feat: add quotes page"
```

---

### Task 11: Create Image Directories

**Files:**
- Create: `images/photos/.gitkeep`
- Create: `images/books/.gitkeep`
- Create: `images/posts/.gitkeep`

- [ ] **Step 1: Create placeholder directories**

```bash
mkdir -p images/photos images/books images/posts
touch images/photos/.gitkeep images/books/.gitkeep images/posts/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add images/
git commit -m "feat: add image directory structure"
```

---

### Task 12: Full Integration Verification

No files to create — this task verifies everything works end to end.

- [ ] **Step 1: Start a local server**

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser.

- [ ] **Step 2: Verify every nav link on every page**

Walk through each page and click every nav link:
- From `index.html`: click all 7 nav links → each loads the correct page
- From `about.html`: click all 7 nav links → correct pages
- From `blog.html`: click all 7 nav links → correct pages
- From `photos.html`: click all 7 nav links → correct pages
- From `books.html`: click all 7 nav links → correct pages
- From `life-events.html`: click all 7 nav links → correct pages
- From `quotes.html`: click all 7 nav links → correct pages
- From `posts/the-art-of-slowing-down.html`: click all 7 nav links → correct pages (uses `../` paths)
- From `posts/weekend-in-mountains.html`: click all 7 nav links → correct pages

- [ ] **Step 3: Verify blog flow**

1. Go to `blog.html`
2. Click "Reflections" filter → only first post visible
3. Click "Travel" → only second post visible
4. Click "All" → both visible
5. Click first post card → navigates to `posts/the-art-of-slowing-down.html`
6. Click "← Back to Blog" → returns to `blog.html`
7. Click second post card → navigates to `posts/weekend-in-mountains.html`
8. Click "← Previous" → goes to first post
9. Click "Next →" on first post → goes to second post

- [ ] **Step 4: Verify photo lightbox**

1. Go to `photos.html`
2. Click any photo → lightbox opens, dark overlay, image centered
3. Click right arrow → next photo
4. Click left arrow → previous photo
5. Press Escape → lightbox closes
6. Click a photo again → opens lightbox
7. Click backdrop (outside image) → lightbox closes

- [ ] **Step 5: Verify books filtering**

1. Go to `books.html`
2. Click "Read" → Sapiens and Atomic Habits visible
3. Click "Reading" → The Alchemist visible
4. Click "Want to Read" → Educated visible
5. Click "All" → all 4 visible

- [ ] **Step 6: Verify mobile responsiveness**

1. Open browser DevTools → toggle device toolbar (mobile view)
2. On any page: hamburger icon visible, nav links hidden
3. Click hamburger → full-screen menu slides in
4. Click a link → navigates and menu closes
5. Check all pages render without horizontal scroll
6. Blog post cards stack vertically (image on top)
7. Photo grid shows 2 columns
8. Quotes grid shows 1 column

- [ ] **Step 7: Verify the site name links to home**

On every page, click "Banashri" in the top-left → navigates to `index.html`.

- [ ] **Step 8: Stop the server and commit any fixes**

If any issues were found and fixed in earlier tasks, commit them:
```bash
git add -A
git commit -m "fix: integration fixes from full verification"
```
