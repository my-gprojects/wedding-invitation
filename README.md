# Faiza & Galang — Wedding Invitation

Standalone, **editable** HTML invitation (your own copy — not an iframe of Canva).

Visual assets & music are duplicated into `assets/` so you can change text,
layout, and styling freely in `index.html`, `styles.css`, and `script.js`.

## Run

```bash
cd faiza-galang-invitation
python3 -m http.server 5500
```

- http://127.0.0.1:5500/
- http://127.0.0.1:5500/?t=Budi+Santoso

## Edit where?

| File | What to change |
|------|----------------|
| `index.html` | Text, sections, image paths (marked with `EDIT:` comments) |
| `styles.css` | Colors, spacing, animations |
| `script.js` | Countdown date, music, RSVP behavior |
| `assets/` | Photos, graphics, `music.mp3` |

## Guest name

`?t=Nama+Tamu` → shown on cover + inside + prefilled RSVP.

## Notes

- Archive of the original Canva site (reference only): `../faiza-galang-canva-site/`
- Music: Dan + Shay — Speechless (Acoustic)
