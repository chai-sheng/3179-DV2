# Whale watching data for FIT3179 DV2

Two independent sources, downloaded 15 October 2026. This pack contains real source records, not invented data.

## Dataset A - community observations
File: 01_whale_observations.csv (3,082 records).
Source: iNaturalist Research-grade Observations Marine Subset, Marine Biological Association, via OBIS.
Dataset page: https://obis.org/dataset/eaea291a-1e1d-4382-b86f-ac3cc15b8d5a
Publisher: https://www.dassh.ac.uk/ipt/resource?r=inaturalist-marine
Citation: iNaturalist contributors, iNaturalist (2026). iNaturalist Research-grade Observations Marine Subset. Version 2.0. Marine Biological Association. Occurrence dataset. https://doi.org/10.17031/0bbcjx
Archive release: 1 September 2026. Source observations created on or before 20 July 2026; this is not a live feed.
Extract dates: 2016-06-08 to 2026-07-19. Search requested 2016-01-01 through 2026-10-15.
Geographic window: longitude 110 to 156 E; latitude 46 to 10 S, around mainland Australia and Tasmania. This rectangle is not an Australian EEZ boundary and excludes external territories.
Species counts: {'Blue whale': 7, 'Humpback whale': 2726, 'Southern right whale': 300, 'Sperm whale': 49}. The species column rolls subspecies up to species; scientific_name preserves the exact accepted identification. All seven blue-whale records here are identified as the pygmy blue subspecies, and 360 humpback records carry a subspecies name.
License: source collection CC BY-NC 4.0. Retain record_license and observer_credit, source URLs and the dataset citation. Photographs were not downloaded and have separate licenses.

All API results were retrieved for these four species within the stated query. Unique occurrence IDs were checked; no source observations were deleted. An observation is not a unique whale, a tourist, a trip or a live encounter. Multiple observers can record one animal. The sample is opportunistic and uncorrected for observer effort. Research grade describes community-supported identification, not representative sampling.
The text-only needs_nonlive_review flag identifies 11 possible dead/stranded/remains mentions. It is not a validated live/dead classifier, and unflagged records can also be unsuitable for live whale-watching claims. Retain these observations for an explicitly labelled occurrence story; manually review observation links before using them as live encounters.
Use 2016-2025 for complete calendar-year comparisons. Keep the 321 observations in 2026 separate and visibly mark them partial. Blue whale data are sparse (7 records); do not infer a blue-whale season or absence from this sample.
coast_group is a transparent grouping of supplied state_province: East = NSW/Queensland/Jervis Bay; West = WA; South = SA/Victoria/Tasmania; North = NT. 497 records have no mapped state and remain Unassigned. Do not silently allocate these to a coast or treat coastal groups as official marine regions.

## Dataset B - important whale habitats
Files: 02_whale_bia.geojson and 02_whale_bia_attributes.csv (44 unique source OBJECTIDs).
These are two formats of ONE dataset, not a third independent source.
Publisher: DCCEEW, Commonwealth of Australia. License: CC BY; retain attribution and access date.
Source: https://www.dcceew.gov.au/environment/marine/bias
Download portal: https://fed.dcceew.gov.au/datasets/erin::biologically-important-areas-for-protected-marine-species/about
Service: https://gis.environment.gov.au/gispub/rest/services/marine/BiologicallyImportantAreas/MapServer
Queried whale layers: 70, 71, 73, 74, 75, 77, 78, 79. Two repeat appearances across renderer layers were deduplicated by OBJECTID (46 returned features -> 44 records). Counts are records, not distinct biological populations or an ecological importance score. Multi-part polygons may represent many separated places.
The service was queried on the access date, but underlying surveys and species reviews have different ages. Preserve DATE_CREATED, REVIEW_DATE and SOURCE_DESC. Do not describe all records as surveyed in 2026.
Geometry is WGS84 and simplified on the server at 0.01 degrees with four decimal places, for a small overview map. Do not calculate exact habitat areas, distances, legal boundaries, or fine-scale overlaps from this simplified export. Source shape area/length fields in angular units were omitted to prevent misuse.
BIAs identify ecological importance. They are NOT automatically legally protected marine parks and are NOT complete species ranges. Blank season text means unspecified, not zero activity. Reproduction can include more than calving.
02_selected_season_windows.csv translates a few explicit month windows into start/end months and preserves the original prose and OBJECTID. Other seasonal statements remain unparsed. Split any November-May interval at the calendar boundary; do not collapse it to a shorter within-year interval. A seasonal note is not a guaranteed whale-watching timetable.
Pygmy blue whale is a blue-whale subspecies; retain that distinction. Do not merge the BIA category blindly with species-level observations.

## Use in the visualisation
Read the PDF chart plan before implementing the sketch. All miniature chart shapes in the sketch are layout placeholders, not computed findings.
Use local relative file paths in Vega/Vega-Lite and host them with readable JSON on GitHub Pages. Download the smaller files in this pack, not the global 1 GB iNaturalist archive.
For seasonal analysis use known month values. Compare within-coast percentages with visible sample sizes, including a note for Unassigned records. Low reporting is not whale absence. Do not connect independent sightings into migration tracks. Use DCCEEW season and migration descriptions for explicitly schematic direction arrows.
The story compares seasons and species and explains conservation. Neither dataset measures whale-watching tourists, revenue, boat trips, population abundance, or the causal impact of protection. A quantitative tourism claim needs another suitable source.
Keep source credits, author, date, and AI acknowledgement in the website footer. Draw your assessed sketch yourself on A4; digitally created sketches receive zero for that component in the supplied rubric.


Website correction: BIA 473 is June–October (higher numbers). Hervey Bay is BIA 59, July–November. Website season windows were rechecked individually.

Website geometry: interior rings are assigned to the smallest containing exterior, zero-area rings are omitted, and winding is normalised for Vega/D3 spherical rendering. The overview is clipped to 109–158°E and 47–9°S. This does not support precise area or boundary calculations.
