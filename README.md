# Nex Resume

A résumé builder that runs entirely in the browser. Build your résumé section by section in the **Content** panel, tune the design in the **Customize** panel, and watch the page update as you go.

## Content

- Personal details with a photo upload (cropped to a square and stored in the browser).
- Section cards you can drag to reorder (or focus the grip and use the arrow keys), hide from the résumé, rename or delete.
- Entries inside each section that expand into a form, can be reordered and hidden, and have a rich-text description (bold, italic, underline, bulleted and numbered lists).
- **Add content** offers 14 section types: Profile, Professional experience, Education, Skills, Languages, Projects, Certificates, Courses, Awards, Organisations, Publications, Interests, References and any number of Custom sections.

## Customize

- Six templates (Harbor, Atlas, Meridian, Folio, Ledger, Quill) as starting points.
- One column, or two columns with the sidebar left or right, an adjustable sidebar width, and a per-section choice of column.
- US Letter or A4.
- Font size, line height, page margins and spacing between entries and sections.
- Accent colour (eight presets or any custom colour) and where it is used: name, job title, headings, heading lines, dates, icons, links. Optional coloured header and tinted sidebar.
- Eight typefaces, six heading styles, header alignment, contact detail separators, photo shape and size, date placement and subtitle style.

## Other features

- Page counter with page-break markers, plus zoom controls for the preview.
- Autosave to `localStorage`. Nothing leaves your browser.
- **Download PDF** uses the browser's print dialog; a print stylesheet shows only the résumé at the chosen paper size.
- **Export / Import** a JSON file to back up your résumé or move it to another device.
- Phone layout with Content, Customize and Preview tabs.

## Running locally

There is no build step. Serve the folder with any static server:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Page structure, toolbar and the Add content dialog |
| `styles.css` | App styles, the résumé sheet styles and the print stylesheet |
| `app.js` | Section types, templates, state, editor panels, live preview, import/export and autosave |

## Deploying

Any static host works. For GitHub Pages, enable Pages in the repository settings and publish from the root of `main`.
