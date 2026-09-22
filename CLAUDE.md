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
# Run local dev server
hugo server -D
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

