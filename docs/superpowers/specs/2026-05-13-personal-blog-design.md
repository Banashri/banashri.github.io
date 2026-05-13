# Personal Blog — Design Spec

## Overview

A personal blog for Banashri, hosted on GitHub Pages at `banashri.github.io`. Pure static HTML + CSS with minimal vanilla JS. No frameworks, no build tools, no dependencies. The site must be lightweight, responsive, elegant, and fast — every page under 25KB (excluding images), every navigation click under 20ms after first load.

## Visual Design

**Aesthetic:** Clean & minimal with generous whitespace and elegant typography.

**Typography:**
- Headings: Cormorant Garamond (serif, weight 300/400) — loaded from Google Fonts
- Body: Inter (sans-serif, weight 300/400/500) — loaded from Google Fonts
- Monospace: system default (for code snippets if needed)

**Color palette:**
- Background: `#fafaf8` (warm off-white)
- Text primary: `#2c2c2c`
- Text secondary: `#666` / `#888`
- Text muted: `#aaa` / `#bbb`
- Borders: `#e8e6e1` / `#eee`
- Accent surface: `#f4f3ef` (quote blocks, hover cards)
- Tag pill border: `#ddd`, text `#999`
- Active tag/button: `#2c2c2c` background, `#fff` text
- Book status "Read": `#e8f5e9` bg, `#4caf50` text
- Book status "Reading": `#fff3e0` bg, `#ff9800` text
- Book status "Want to Read": `#e3f2fd` bg, `#2196f3` text

**Spacing:** Generous — 60px horizontal padding on desktop, 24px on mobile. Section padding 60-80px vertical.

**Transitions:** Subtle — 0.2-0.3s for hover effects, opacity changes, transforms.

## Pages

### 1. Home (`index.html`)

- **Nav bar** (shared across all pages)
- **Hero section:** Centered heading "Hello, I'm Banashri", thin divider, subtitle paragraph
- **Featured quote:** Full-width accent band with serif italic quote and attribution
- **Recent posts:** 3 most recent blog post cards (same format as blog listing)
- **Footer** (shared across all pages)

### 2. About Me (`about.html`)

- Photo (left) + text (right) layout, stacks vertically on mobile
- Photo placeholder: 200x240px with rounded corners
- Bio text: 2-3 paragraphs, relaxed line-height (1.9)

### 3. Blog Listing (`blog.html`)

- Page title + subtitle
- **Tag filter bar:** Row of pill-shaped buttons (All, plus all tags used across posts). "All" is active by default. Clicking a tag filters the post list — shows only posts with that tag. Only one tag active at a time. Filtering is instant (JS show/hide, no page reload).
- **Post cards:** Each card is a clickable link to the full post, containing:
  - Thumbnail image (180x120px, left side)
  - Date (uppercase, small, muted)
  - Title (serif, 24px)
  - Excerpt (2 lines, muted)
  - Tag pills
  - `data-tags` attribute on each card (space-separated tag list, used by JS filter)
- Cards stack vertically, image goes above text on mobile

**Adding a new post to the listing:** Copy a `<!-- POST TEMPLATE -->` block, update href, thumbnail, date, title, excerpt, tags, and `data-tags`.

### 4. Blog Post (`posts/*.html`)

Each post is a standalone HTML file with the full page structure (nav, content, footer).

**Layout:**
- "← Back to Blog" link at top
- Centered header: date, title (42px serif), tag pills, thin divider
- Content area (max-width 720px, centered):
  - Paragraphs: 16px, color `#444`, line-height 1.9
  - Subheadings: `<h2>`, 28px serif
  - Images: full-width with rounded corners, `loading="lazy"`, followed by optional `<p class="image-caption">` (centered, italic, muted)
  - Blockquotes: serif italic, left border accent
  - Lists, bold, italic — standard HTML elements styled
- **Prev/Next navigation** at the bottom (optional — omit if not applicable)
- Footer

**Post template** (`posts/template.html`): A ready-to-copy file with all the boilerplate. Placeholder comments mark where to fill in title, date, tags, and content. Includes example paragraph, image, blockquote, and heading so the author sees the formatting.

### 5. Photos (`photos.html`)

- Page title
- **Grid gallery:** CSS grid, 3 columns on desktop, 2 on mobile
  - Each item is an `<img>` inside a container with `aspect-ratio: 1` (square crop via `object-fit: cover`)
  - Some items can span 2 rows for variety (class `tall`)
  - Hover: slight scale-up (1.02) + subtle shadow
  - All images: `loading="lazy"`
- **Lightbox:** Clicking an image opens a full-screen overlay with:
  - Dark semi-transparent backdrop
  - The image displayed at its natural aspect ratio, max-width/max-height constrained to viewport
  - Close button (X) in top-right corner
  - Click backdrop or press Escape to close
  - Prev/Next arrows to navigate between images
  - Implemented in `main.js`, no dependencies

**Adding a photo:** Place image in `images/photos/`, add an `<img>` tag inside the gallery grid (copy the `<!-- PHOTO TEMPLATE -->` comment block).

### 6. Books I've Read (`books.html`)

- Page title
- **Filter tabs:** All / Read / Reading / Want to Read — same pill-button style as blog tags
- **Book cards:** Vertical list, each card contains:
  - Book cover image (70x100px, left side) or placeholder
  - Title (serif, 20px)
  - Author (muted, 13px)
  - Status badge (pill with color per status)
  - Optional: one-line personal note/review
  - `data-status` attribute for JS filtering
- Cards are full-width rows with subtle border, white background, rounded corners
- Hover: subtle shadow lift

**Adding a book:** Copy the `<!-- BOOK TEMPLATE -->` block in `books.html`, fill in title, author, cover image path, status, and optional note.

### 7. Life Events (`life-events.html`)

- Page title
- **Vertical timeline:**
  - Thin vertical line on the left
  - Each event has: dot on the line, year label (small, uppercase, muted), event title (serif, 22px), description paragraph (muted, 14px)
  - Events listed in reverse chronological order (newest at top)

**Adding an event:** Copy the `<!-- EVENT TEMPLATE -->` block, fill in year, title, and description.

### 8. Quotes (`quotes.html`)

- Page title
- **Two-column card grid** (single column on mobile)
- Each quote card:
  - White background, subtle border, rounded corners
  - Quote text (serif, italic, 18px)
  - Attribution (small, uppercase, muted)
  - Hover: subtle shadow lift

**Adding a quote:** Copy the `<!-- QUOTE TEMPLATE -->` block, fill in quote text and author.

## Shared Components

### Navigation Bar

- Fixed at top of every page (not sticky — scrolls with content)
- Left: site name "Banashri" (Cormorant Garamond, 26px, letter-spacing 4px)
- Right: page links (Inter, 13px, uppercase, letter-spacing 1.5px)
- Active page link: `#2c2c2c` (dark). Others: `#888` (muted). Hover transitions to dark.
- Border-bottom: 1px solid `#e8e6e1`
- **Mobile (≤768px):** Hamburger icon (3 lines) replaces links. Tapping it slides in a full-height overlay from the right with vertically stacked links. Close button (X) in top-right. Links close the menu on click.
- Every nav link must point to the correct page and work from any file depth (use relative paths: `../index.html` from posts, `index.html` from root pages).

### Footer

- Centered text: "Banashri · 2026"
- Top border: 1px solid `#e8e6e1`
- Padding: 40px
- Font: 12px, muted, letter-spacing 1px

## Interactive Features (main.js)

All JS in a single file `js/main.js`. No external dependencies. ~100-150 lines total.

### 1. Tag/Status Filtering (blog + books pages)

- On page load, read all unique `data-tags` (or `data-status`) values from cards
- Dynamically generate filter buttons (or use pre-defined ones in HTML)
- Clicking a filter: add `active` class to button, show matching cards, hide non-matching
- "All" button shows everything
- Transition: cards fade in/out with CSS `opacity` + `display`

### 2. Photo Lightbox

- Create overlay elements dynamically (not in HTML)
- Clicking a gallery image: show overlay with that image
- Navigation: left/right arrows cycle through gallery images
- Close: click backdrop, click X button, press Escape key
- Prevent body scroll when lightbox is open
- Accessible: trap focus in lightbox, aria-labels on close/nav buttons

### 3. Mobile Menu

- Hamburger button visible only on mobile (≤768px via CSS)
- Click: slide-in overlay panel from right
- Panel contains all nav links, vertically stacked, centered
- Close: X button or clicking a link
- Prevent body scroll when menu is open

## File Structure

```
banashri.github.io/
├── index.html
├── about.html
├── blog.html
├── photos.html
├── books.html
├── life-events.html
├── quotes.html
├── posts/
│   ├── template.html
│   ├── the-art-of-slowing-down.html
│   └── weekend-in-mountains.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── photos/           (gallery images)
    ├── books/            (book cover images)
    └── posts/            (blog post images, subfolder per post)
```

## Performance Requirements

- No page larger than 25KB excluding images
- Single CSS file, loaded on every page, cached after first visit
- Single JS file, loaded on every page, cached after first visit
- Google Fonts loaded via `<link>` with `display=swap` (text renders immediately, fonts swap in)
- All `<img>` tags use `loading="lazy"` except above-the-fold hero/nav images
- No render-blocking JS — `main.js` loaded with `defer` attribute

## Responsive Breakpoints

- **Desktop:** >768px — full layout, horizontal nav, multi-column grids
- **Mobile:** ≤768px — stacked layout, hamburger menu, single/two-column grids, reduced padding

## Functional Requirements — Navigation & Buttons

Every interactive element must work correctly:

1. **All 7 nav links** on every page point to the correct page and work from both root (`./about.html`) and posts depth (`../about.html`)
2. **Active state** on the current page's nav link
3. **Mobile hamburger** opens/closes the menu overlay, all links work
4. **Blog tag filter** buttons filter posts instantly, "All" resets
5. **Book status filter** buttons filter books by read/reading/want-to-read
6. **Photo lightbox** opens on click, navigates with arrows, closes with X/Escape/backdrop
7. **Blog post links** on the listing page navigate to the correct post file
8. **"Back to Blog" link** on each post navigates back to `blog.html`
9. **Prev/Next links** on posts navigate to adjacent posts (or are hidden if none)
10. **All hover states** provide visual feedback (opacity, shadow, color transitions)

## Sample Content

Include 2 sample blog posts with placeholder images, 4 sample books, 5 sample quotes, 4 sample life events, and 6 sample photos (using placeholder backgrounds). This gives the user a populated site to start from.
