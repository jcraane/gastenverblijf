# B&B Puur Geluk Berghem - Website

## Project overview
Static website for our guesthouse (gastenverblijf / B&B) in Berghem, Netherlands. Built with Hugo and the Ananke theme. The site is in Dutch. Work in progress.

**URL:** https://puurgelukberghem.nl/

## Tech stack
- **Static site generator:** Hugo
- **Theme:** Ananke (git submodule in `themes/ananke/`)
- **Language:** Dutch (nl)
- **Content format:** Markdown with Hugo shortcodes

## Project structure
The repo root is the Hugo site root.
- `content/` - Page content (Markdown)
- `layouts/` - Custom layout overrides, partials and shortcodes
- `assets/` - CSS (`ananke/css/custom.css`) and JS (`js/parallax.js`, fingerprinted)
- `static/` - Static files; `static/images` is also mounted as `assets/images` so photos go through Hugo image processing
- `hugo.toml` - Hugo configuration
- `docs/` - Build output (publishDir), published as the live site
- `documentatie/` - Internal project notes (not published)

## Development commands
```bash
# Run local dev server (always --renderToMemory; otherwise it overwrites docs/ with a dev build)
hugo server -D --renderToMemory
Sire can be accessed at http://localhost:1313/

# Build the site
hugo
```

## Key pages
- `_index.md` - Homepage
- `gastenverblijf.md` - About the guesthouse
- `activiteiten.md` - Activities guide
- `omgeving.md` - Surroundings
- `reserveren.md` - Booking calendar (Bedandbreakfast.nl iBook), practical info and FAQ. Prices are deliberately not on the site: the booking calendar is the single source of truth (`/tarieven/` redirects here)
- `contact.md` - Contact form (uses JavaScript mailto)

## Custom shortcodes
- `activity-card.html` - Card component for activities
- `activity-grid.html` - Grid layout for activity cards
- `form-mailto.html` - Contact form with mailto
- `split.html` - Split layout component
- `image-grid.html` / `grid-image.html` - Lightbox photo grid (`cols`, `show`, `gallery` params)
- `feature-list.html` / `feature-item.html` - Icon list (`icon` param, see `_partials/icon.html`)
- `faq.html` - Collapsible FAQ item
- `contact-item.html` - Contact detail row with icon

## Images & hero
- Always render photos through `_partials/img.html` (resized WebP + srcset); never link the multi-MB originals directly
- Page banner comes from front matter: `featured_image`, `hero_position` (object-position), `hero_subtitle` (short tagline), `hero_buttons` (home). `description` is SEO-only and not shown
- Custom CSS is compiled by LibSass: wrap arithmetic inside `clamp()`/`min()`/`max()` in `calc()`

## Guidelines
- All content must be in Dutch
- Keep the site simple and static - no backend
- Follow Hugo and Ananke theme conventions
- Custom CSS goes in `assets/ananke/css/custom.css`


## Performance
- Goal (Lighthouse, mobile): performance ≥ 95 and 100 for accessibility, best practices and SEO on every page. Reserveren is the exception: its layout shift and third-party cookie warnings come from the Bedandbreakfast.nl iframe
- No third-party requests of our own: Montserrat is self-hosted (`static/fonts/`, preloaded) and GLightbox is vendored in `assets/vendor/` and only loaded on pages with a gallery
- Hero images are processed at WebP q65; keep new photos going through `img.html`
- Measure against a compressed local build (`hugo -d /tmp/x && npx serve /tmp/x`) or the live site; `python -m http.server` doesn't gzip and makes CSS look 5× heavier
- Never build with `--cleanDestinationDir` without checking `docs/`; `static/CNAME` must stay so the custom domain survives a clean build

## Analytics & search
- GoatCounter (cookieless) is loaded from `_partials/analytics.html` only in production builds and only when `params.goatcounter` is set in `hugo.toml`; `count.js` is vendored in `assets/vendor/goatcounter/`
- Click events: add `data-goatcounter-click="<name>"` (+ `data-goatcounter-referrer` for the source page). Naming: `cta-<menu|hero|banner>-<target>`, `contactformulier-verzenden`; `email-klik` and `uitgaand-<host>` are added automatically by `assets/js/parallax.js`
- Bookings themselves happen inside the Bedandbreakfast.nl iframe and can't be tracked here; take booking numbers from the Bedandbreakfast.nl dashboard
- If analytics changes, keep the privacy statement (`content/privacy.md`) in sync
