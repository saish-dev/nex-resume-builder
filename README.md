# Nex Resume

A résumé builder that runs entirely in the browser. Fill in the form on the left and the US Letter preview on the right updates as you type.

## Features

- Three templates: Classic (serif, centred header), Modern (sans with a sidebar) and Compact (dense, fits more).
- Five accent colours.
- A live page counter and page-break markers, so you can see when the résumé spills onto a second page.
- Autosave to `localStorage`. Nothing leaves your browser.
- **Save as PDF** uses the browser's print dialog with a print stylesheet that shows only the résumé.
- **Export JSON / Import JSON** to back up your résumé or move it to another device.
- Phone layout with Edit / Preview tabs.

## Running locally

There is no build step. Serve the folder with any static server:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from disk also works.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Page structure and toolbar |
| `styles.css` | App styles, the three résumé templates and the print stylesheet |
| `app.js` | State, editor, live preview, import/export and autosave |

## Deploying

Any static host works. For GitHub Pages, enable Pages in the repository settings and publish from the root of the default branch.
