# national-stats-explorer
[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/sy782783-ctrl/national-stats-explorer/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/sy782783-ctrl/national-stats-explorer/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Meridian Atlas is a world statistics explorer over a curated dataset of 32 countries, in plain static files — no build step and no network requests. It has five working views reached through hash routes: an overview dashboard with headline totals, live canvas charts and region cards; a country table you can search, filter by region and sort by any column; a full profile per country with ranks on ten indicators and bars against the Atlas average; a head-to-head comparison of any two countries; and a chart explorer that ranks every country on any indicator. Base figures (population, land area, GDP) are rounded 2024 estimates; GDP per capita and population density are computed from them in the browser, so the totals, tables, charts and profiles always agree. A methodology page defines every indicator and explains how the numbers are built.

## Run it

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Then open `out/app/index.html` in a browser. Or serve the source directly with any static server, e.g. `python3 -m http.server --directory app`, and open `index.html#/` (swap in `#/countries`, `#/country/JPN`, `#/compare`, `#/charts` or `#/about` for the other views).

---
<sub>Entered on [make.fun](https://make.fun/?ref=nwwvrp8c&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
