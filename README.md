# Following the Whales — GitHub Pages package

This is the complete interactive website, with 11 Vega-Lite charts, three map idioms and two independent data sources. All chart libraries, fonts, data and readable JSON specifications are included locally.

## Publish for the assignment

1. Unzip this package.
2. Create or open your GitHub repository.
3. Upload the contents, preserving all folders. `index.html` must be at the repository root.
4. Open Settings → Pages. Choose Deploy from a branch, then main and / (root), and save.
5. Wait for GitHub to provide the public Pages URL. Open it and check the charts before submitting.

The private working preview is at https://whale-watching-australia.tinybat16.chatgpt.site . The assignment requires your public GitHub Pages URL.

## Open locally

Do not double-click index.html: browsers block JSON loading from file URLs. Run this in the unzipped folder instead:

    python3 -m http.server 8000

Then open http://localhost:8000 in a browser.

## Included

- index.html, styles.css, app.js: the story and interactions.
- specs/: all 11 human-readable Vega-Lite JSON specifications.
- data/: the compact chart datasets, basemap, habitat geometry and derived layouts.
- downloads/: original observation CSV with observer credits, habitat attributes, source manifest, methods and drawing reference.
- assets/: pinned visualisation libraries, fonts, decorative SVGs and licence notices.

## Controls

Species, period and Australian-season controls above the first maps affect charts 01 and 02 only. The heatmap and habitat map have their own species selectors. Reset restores the first maps to the 2016–2025 baseline. Wide charts scroll on small screens.

## What was checked

All 11 Vega-Lite specifications were compiled and rendered to SVG. Source totals, unique record IDs, derived treemap areas, alluvial counts, polygon winding, map filters, the heatmap selector, habitat selectors and local file links were checked. The 3,082 records include a 2,761-record baseline and 321 partial-2026 observations. Full-page browser layout and direct mouse/touch behaviour could not be tested in the creation environment; check the published page in your browser.

## Before submitting

Review the author name (currently Cheng Chai Sheng), story text, citations and AI acknowledgement. Draw the assessed A4 sketch by hand using the digital drawing reference as a guide. The brief states that a digital sketch does not earn the sketch marks. Complete the submission template with the public GitHub Pages URL, your domain explanation, the hand-drawn sketch PDF and a full-page screenshot.

## Data cautions and credits

Observations are not unique whales, tourist totals, vessel trips or guaranteed live encounters. This is a selected geographic extract, not a national census. Most charts use 2016–2025; partial 2026 is selectable on the maps only. BIAs are ecologically important habitats, not automatically protected areas. Migration arrows are schematic, not telemetry. See downloads/data-methods.md for details.

Sources: iNaturalist contributors / Marine Biological Association via OBIS (doi:10.17031/0bbcjx; collection CC BY-NC 4.0 and individual record licences), and Australian Government DCCEEW Biologically Important Areas (CC BY). Natural Earth basemap: public domain. Individual observer credits are retained in the CSV. Vega/Vega-Lite/Vega-Embed: BSD-3-Clause. Fonts: SIL Open Font License.

Created 15 October 2026. OpenAI ChatGPT assisted with research, data preparation, design and code.
