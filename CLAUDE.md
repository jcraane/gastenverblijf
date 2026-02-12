# B&B Klein Geluk Berghem - Website

## Project overview
Static website for our guesthouse (gastenverblijf / B&B) in Berghem, Netherlands. Built with Hugo and the Ananke theme. The site is in Dutch. Work in progress.

**URL:** https://gastenverblijfberghem.nl/

## Tech stack
- **Static site generator:** Hugo
- **Theme:** Ananke (git submodule in `gastenverblijf/themes/ananke/`)
- **Language:** Dutch (nl)
- **Content format:** Markdown with Hugo shortcodes

## Project structure
- `gastenverblijf/` - Hugo site root
  - `content/` - Page content (Markdown)
  - `layouts/` - Custom layout overrides and shortcodes
  - `assets/` - CSS and other processed assets
  - `static/` - Static files (images, etc.)
  - `data/` - Hugo data files
  - `hugo.toml` - Hugo configuration
- `docs/` - Internal project notes (not published)

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
- `tarieven.md` - Rates/pricing
- `activiteiten.md` - Activities guide
- `omgeving.md` - Surroundings
- `contact.md` - Contact form (uses JavaScript mailto)

## Custom shortcodes
- `activity-card.html` - Card component for activities
- `activity-grid.html` - Grid layout for activity cards
- `form-mailto.html` - Contact form with mailto
- `split.html` - Split layout component

## Guidelines
- All content must be in Dutch
- Keep the site simple and static - no backend
- Follow Hugo and Ananke theme conventions
- Custom CSS goes in `assets/ananke/css/custom.css`
