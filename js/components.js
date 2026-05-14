(function () {
  var scriptEl = document.querySelector('script[src$="components.js"]');
  var base = scriptEl.getAttribute('src').replace('js/components.js', '');

  var path = window.location.pathname;
  var pages = [
    { href: 'index.html',       label: 'Home',      match: ['/index.html', '/'] },
    { href: 'about.html',       label: 'About',     match: ['/about.html'] },
    { href: 'blog.html',        label: 'Blog',      match: ['/blog.html', '/posts/'] },
    { href: 'photos.html',      label: 'Photos',    match: ['/photos.html'] },
    { href: 'books.html',       label: 'Books',     match: ['/books.html', '/reviews/'] },
    { href: 'life-events.html', label: 'Life',      match: ['/life-events.html'] },
    { href: 'quotes.html',      label: 'Quotes',    match: ['/quotes.html'] },
    { href: 'languages.html',   label: 'Languages', match: ['/languages.html', '/languages/'] }
  ];

  function isActive(pg) {
    for (var i = 0; i < pg.match.length; i++) {
      if (path === pg.match[i] || path.indexOf(pg.match[i]) !== -1) return true;
    }
    return false;
  }

  function buildLinks(tag) {
    return pages.map(function (pg) {
      var cls = isActive(pg) ? ' class="active"' : '';
      return '<' + tag + ' href="' + base + pg.href + '"' + cls + '>' + pg.label + '</' + tag + '>';
    }).join('\n      ');
  }

  var nav = document.getElementById('main-nav');
  if (nav) {
    nav.className = 'nav';
    nav.innerHTML =
      '<a href="' + base + 'index.html" class="nav-logo">banashris</a>\n' +
      '    <div class="nav-links">\n      ' + buildLinks('a') + '\n    </div>\n' +
      '    <button class="hamburger" aria-label="Menu">\n' +
      '      <span></span><span></span><span></span>\n' +
      '    </button>';
  }

  var menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.className = 'mobile-menu';
    menu.innerHTML =
      '<button class="mobile-menu-close" aria-label="Close menu">&times;</button>\n    ' +
      buildLinks('a');
  }

  var footer = document.getElementById('main-footer');
  if (footer) {
    footer.className = 'footer';
    footer.textContent = 'Banashri · 2026';
  }
})();
