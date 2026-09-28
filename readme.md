Run the project by using

```bash
hugo server --renderToMemory
```

Always use `--renderToMemory`: without it the dev server writes its development build (livereload script, `noindex`) into `docs/`, which is the published site. Open http://localhost:1313/.

Publish with a fresh production build right before committing:

```bash
hugo
```

## Gastenmap (printed guest folder)

The A4 book for the laminated folder in the guesthouse lives in `gastenmap/` and has its own Hugo environment, so it never ends up in `docs/`.

First time on a machine: the wifi details and phone number are not in git (the repo is public). Create them from the template:

```bash
cp gastenmap/private.example.yaml gastenmap/data/private.yaml
```

Fill in `gastenmap/data/private.yaml`. It's gitignored, so keep a backup elsewhere. Without it the book prints yellow placeholders instead.

Run it:

```bash
hugo server -e gastenmap --renderToMemory
```

Open http://localhost:1313/ in Chrome and print (⌘P): A4, double-sided (long edge), margins *Default*, headers and footers *off*, background graphics *on*. The bar at the top shows the page count, open placeholders and any page that overflows. Scan the wifi QR code once before laminating.

Content:

- `gastenmap/data/gastenmap.yaml` – welcome, house rules, how things work, emergency numbers, departure checklist. `[[...]]` marks text still to fill in and prints highlighted.
- `gastenmap/data/routes.yaml` – walking and cycling routes; maps in `gastenmap/assets/routes/`.
- `data/activiteiten.yaml` – activities, shared with the Activiteiten page on the site.

A static copy can be built with `hugo -e gastenmap`; it goes to `gastenmap/public/` (gitignored). Don't publish it anywhere: it contains the wifi password.

## todo

**Slot**

- https://nuki.io/nl-nl/producten/universal-cylinder-2e-generatie
- https://www.coolblue.nl/product/966301/nuki-smart-lock-pro-keypad-2-0.html
