import { COUNTRIES, INDICATORS, REGIONS, byCode, rankOf, worldAverage, totals, formatValue, formatAxis } from './data.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const indicator = (key) => INDICATORS.find((i) => i.key === key);

export const REGION_COLORS = {
  Africa: '#c8871a', Asia: '#0f6a5c', Europe: '#3d6db5',
  'North America': '#7a4fa3', 'South America': '#b4443c', Oceania: '#2e8b9a',
};

/* ---------- canvas horizontal bar chart ---------- */
export function barChart(canvas, rows, key, opts = {}) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.clientWidth || 520;
  const rowH = opts.rowH || 26;
  const labelW = opts.labelW || 118;
  const H = rows.length * rowH + 8;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.height = `${H}px`;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);
  const max = Math.max(...rows.map((r) => r.value)) * 1.02 || 1;
  const barX = labelW, barW = W - labelW - 64;
  ctx.font = '12px "Avenir Next", "Segoe UI", system-ui, sans-serif';
  rows.forEach((r, i) => {
    const y = i * rowH + 4;
    ctx.fillStyle = '#43536e';
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText(r.label, labelW - 8, y + rowH / 2, labelW - 12);
    ctx.fillStyle = '#efe9d8';
    roundRect(ctx, barX, y + 3, barW, rowH - 8, 5); ctx.fill();
    ctx.fillStyle = r.color || '#0f6a5c';
    roundRect(ctx, barX, y + 3, Math.max(3, (r.value / max) * barW), rowH - 8, 5); ctx.fill();
    ctx.fillStyle = '#17233b';
    ctx.textAlign = 'left';
    ctx.fillText(formatAxis(key, r.value), barX + (r.value / max) * barW + 7, y + rowH / 2);
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ---------- overview ---------- */
export function viewOverview(root) {
  const t = totals();
  const topPop = [...COUNTRIES].sort((a, b) => b.population - a.population).slice(0, 10);
  const topWealth = [...COUNTRIES].sort((a, b) => b.gdpPerCapita - a.gdpPerCapita).slice(0, 8);
  // Deterministic spotlight: rotates by day of year so it is stable per visit day.
  const day = Math.floor(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()) / 86400000);
  const spot = COUNTRIES[day % COUNTRIES.length];
  const regionRows = REGIONS.map((r) => {
    const cs = COUNTRIES.filter((c) => c.region === r);
    return { name: r, count: cs.length, pop: cs.reduce((s, c) => s + c.population, 0), gdp: cs.reduce((s, c) => s + c.gdp, 0) };
  }).sort((a, b) => b.pop - a.pop);
  const maxRegionPop = regionRows[0].pop;

  root.innerHTML = `
    <p class="eyebrow">A world statistics explorer</p>
    <h1>The world in numbers</h1>
    <p class="lede">Meridian Atlas tracks the vital statistics of ${t.countries} countries across ${t.regions} regions —
    how many people, how much they produce, how long they live. Every figure is one click from the country behind it,
    and every chart is drawn live from the same dataset as the tables.</p>

    <section class="kpis" aria-label="Headline totals">
      <div class="kpi"><div class="k-label">Countries tracked</div><div class="k-value">${t.countries}</div><div class="k-note">across ${t.regions} regions</div></div>
      <div class="kpi"><div class="k-label">Combined population</div><div class="k-value">${(t.population / 1000).toFixed(2)} bn</div><div class="k-note">people in the dataset</div></div>
      <div class="kpi"><div class="k-label">Combined GDP</div><div class="k-value">$${(t.gdp / 1000).toFixed(1)} tn</div><div class="k-note">current US dollars</div></div>
      <div class="kpi"><div class="k-label">Average life expectancy</div><div class="k-value">${worldAverage('lifeExpectancy').toFixed(1)} yrs</div><div class="k-note">population-weighted mean</div></div>
    </section>

    <div class="grid-2">
      <section class="card">
        <h3>Most populous countries</h3>
        <canvas class="chart" id="ch-pop" role="img" aria-label="Bar chart of the ten most populous countries"></canvas>
        <p class="chart-note">India and China together hold ${(100 * (1451 + 1408) / t.population).toFixed(0)}% of the dataset's people.
        Full ranking in the <a href="#/countries">country table</a>.</p>
      </section>
      <section class="card">
        <h3>Richest per person — GDP per capita</h3>
        <canvas class="chart" id="ch-wealth" role="img" aria-label="Bar chart of the eight highest GDP per capita countries"></canvas>
        <p class="chart-note">Computed on the site from GDP ÷ population, so it always matches the table.
        Try the <a href="#/charts">chart explorer</a> for every indicator.</p>
      </section>
    </div>

    <h2>Regions at a glance</h2>
    <div class="grid-3">
      ${regionRows.map((r) => `
        <a class="card region-card" href="#/countries?region=${encodeURIComponent(r.name)}">
          <div class="r-name" style="color:${REGION_COLORS[r.name]}">${esc(r.name)}</div>
          <div class="r-meta">${r.count} countries · ${formatValue('population', r.pop)} people · ${formatValue('gdp', r.gdp)} GDP</div>
          <div class="region-bar"><i style="width:${(100 * r.pop / maxRegionPop).toFixed(1)}%"></i></div>
        </a>`).join('')}
    </div>

    <h2>Country spotlight</h2>
    <section class="card spotlight">
      <div>
        <p class="eyebrow">Rotates daily</p>
        <h3 style="font-size:1.5rem;margin:.2rem 0">${esc(spot.name)}</h3>
        <p class="big-fact">${esc(spot.name)} (capital ${esc(spot.capital)}) is home to ${formatValue('population', spot.population)} people —
        rank #${rankOf(spot, 'population')} of ${t.countries} by population — with a life expectancy of
        ${formatValue('lifeExpectancy', spot.lifeExpectancy)} and GDP per capita of ${formatValue('gdpPerCapita', spot.gdpPerCapita)}.</p>
        <p><a class="btn" href="#/country/${spot.code}">Open the full profile</a>
        <a class="btn ghost" href="#/compare?a=${spot.code}">Compare it</a></p>
      </div>
      <div class="stat-grid" style="grid-template-columns:1fr 1fr;margin:0">
        <div class="stat"><div class="s-label">Population</div><div class="s-value">${formatValue('population', spot.population)}</div><div class="s-rank">#${rankOf(spot, 'population')} of ${t.countries}</div></div>
        <div class="stat"><div class="s-label">GDP</div><div class="s-value">${formatValue('gdp', spot.gdp)}</div><div class="s-rank">#${rankOf(spot, 'gdp')} of ${t.countries}</div></div>
        <div class="stat"><div class="s-label">Life expectancy</div><div class="s-value">${formatValue('lifeExpectancy', spot.lifeExpectancy)}</div><div class="s-rank">#${rankOf(spot, 'lifeExpectancy')} of ${t.countries}</div></div>
        <div class="stat"><div class="s-label">Density</div><div class="s-value">${formatValue('density', spot.density)}</div><div class="s-rank">#${rankOf(spot, 'density')} of ${t.countries}</div></div>
      </div>
    </section>`;

  barChart(root.querySelector('#ch-pop'), topPop.map((c) => ({ label: c.name, value: c.population, color: REGION_COLORS[c.region] })), 'population');
  barChart(root.querySelector('#ch-wealth'), topWealth.map((c) => ({ label: c.name, value: c.gdpPerCapita, color: REGION_COLORS[c.region] })), 'gdpPerCapita');
}

/* ---------- countries table ---------- */
const TABLE_COLS = ['name', 'population', 'gdp', 'gdpPerCapita', 'lifeExpectancy', 'medianAge', 'urbanPct', 'literacyPct', 'density'];

export function viewCountries(root, query) {
  const state = {
    q: query.get('q') || '',
    region: query.get('region') || 'All',
    sort: query.get('sort') || 'population',
    dir: query.get('dir') === 'asc' ? 1 : -1,
  };

  function render() {
    let rows = COUNTRIES.filter((c) =>
      (state.region === 'All' || c.region === state.region) &&
      (c.name.toLowerCase().includes(state.q.toLowerCase()) || c.capital.toLowerCase().includes(state.q.toLowerCase())));
    rows = [...rows].sort((a, b) => {
      const k = state.sort;
      const va = k === 'name' ? a.name : a[k];
      const vb = k === 'name' ? b.name : b[k];
      return (va < vb ? -1 : va > vb ? 1 : 0) * state.dir;
    });

    root.innerHTML = `
      <p class="eyebrow">The dataset</p>
      <h1>Countries</h1>
      <p class="lede">All ${COUNTRIES.length} countries in the Atlas. Click a column heading to sort, click a row for the full profile.</p>
      <form class="controls" id="tbl-controls">
        <label class="field grow">Search name or capital
          <input type="search" id="f-q" value="${esc(state.q)}" placeholder="e.g. japan, cairo, ottawa…" autocomplete="off">
        </label>
        <label class="field">Region
          <select id="f-region">
            <option ${state.region === 'All' ? 'selected' : ''}>All</option>
            ${REGIONS.map((r) => `<option ${state.region === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}
          </select>
        </label>
      </form>
      <p class="muted" id="tbl-count" aria-live="polite">${rows.length} of ${COUNTRIES.length} countries shown</p>
      <div class="table-wrap">
        <table class="data">
          <thead><tr>${TABLE_COLS.map((k) => {
            const label = k === 'name' ? 'Country' : indicator(k).label;
            const arrow = state.sort === k ? (state.dir === -1 ? ' ↓' : ' ↑') : '';
            return `<th data-sort="${k}" scope="col">${esc(label)}<span class="arrow">${arrow}</span></th>`;
          }).join('')}</tr></thead>
          <tbody>
            ${rows.map((c) => `<tr data-code="${c.code}" tabindex="0" aria-label="${esc(c.name)} profile">
              <td><strong>${esc(c.name)}</strong><br><span class="muted">${esc(c.capital)} · ${esc(c.region)}</span></td>
              ${TABLE_COLS.slice(1).map((k) => `<td class="num">${formatValue(k, c[k])}</td>`).join('')}
            </tr>`).join('') || `<tr><td colspan="${TABLE_COLS.length}"><div class="empty">No country matches that search. <button class="btn ghost" id="tbl-reset" type="button">Clear filters</button></div></td></tr>`}
          </tbody>
        </table>
      </div>
      <p class="chart-note">GDP per capita and density are computed from the base figures (GDP ÷ population, population ÷ land area); see <a href="#/about">About the data</a>.</p>`;

    root.querySelector('#f-q').addEventListener('input', (e) => { state.q = e.target.value; renderSoft(); });
    root.querySelector('#f-region').addEventListener('change', (e) => { state.region = e.target.value; render(); });
    root.querySelectorAll('th[data-sort]').forEach((th) => th.addEventListener('click', () => {
      const k = th.dataset.sort;
      if (state.sort === k) state.dir *= -1; else { state.sort = k; state.dir = k === 'name' ? 1 : -1; }
      render();
    }));
    root.querySelectorAll('tr[data-code]').forEach((tr) => {
      const go = () => { location.hash = `#/country/${tr.dataset.code}`; };
      tr.addEventListener('click', go);
      tr.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
    });
    const reset = root.querySelector('#tbl-reset');
    if (reset) reset.addEventListener('click', () => { state.q = ''; state.region = 'All'; render(); });
  }

  // Re-render only the table body + count on search typing, keeping input focus.
  function renderSoft() {
    const active = document.activeElement;
    render();
    const input = root.querySelector('#f-q');
    if (active && active.id === 'f-q' && input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  }

  render();
}

/* ---------- country detail ---------- */
export function viewCountry(root, code) {
  const c = byCode(code);
  if (!c) {
    root.innerHTML = `<h1>Country not found</h1><p class="lede">No country with code “${esc(code)}” is in the Atlas.</p><p><a class="btn" href="#/countries">Back to the country table</a></p>`;
    return;
  }
  const t = totals();
  const profileKeys = ['population', 'gdpPerCapita', 'lifeExpectancy', 'literacyPct', 'urbanPct'];
  const maxOf = (k) => Math.max(...COUNTRIES.map((x) => x[k]));

  root.innerHTML = `
    <p class="crumb"><a href="#/countries">Countries</a> · <a href="#/countries?region=${encodeURIComponent(c.region)}">${esc(c.region)}</a></p>
    <p class="eyebrow">${esc(c.region)} · capital ${esc(c.capital)}</p>
    <h1>${esc(c.name)}</h1>
    <p class="lede">${esc(c.name)} ranks #${rankOf(c, 'population')} of ${t.countries} by population and #${rankOf(c, 'gdp')} by GDP in the Atlas dataset.
    The bars below place it against the population-weighted average of all ${t.countries} countries (black tick).</p>

    <section class="stat-grid" aria-label="${esc(c.name)} headline statistics">
      ${INDICATORS.map((i) => `
        <div class="stat"><div class="s-label">${esc(i.label)}</div>
        <div class="s-value">${formatValue(i.key, c[i.key])}</div>
        <div class="s-rank">rank #${rankOf(c, i.key)} of ${t.countries}</div></div>`).join('')}
    </section>

    <div class="grid-2">
      <section class="card">
        <h3>Profile vs the Atlas average</h3>
        ${profileKeys.map((k) => {
          const avg = worldAverage(k);
          const pct = Math.min(100, (c[k] / maxOf(k)) * 100);
          const avgPct = Math.min(100, (avg / maxOf(k)) * 100);
          return `<div class="vs-row">
            <span class="vs-label">${esc(indicator(k).label)}</span>
            <span class="vs-track"><span class="vs-fill" style="width:${pct.toFixed(1)}%"></span><span class="vs-avg" style="left:${avgPct.toFixed(1)}%"></span></span>
            <span class="vs-val">${formatValue(k, c[k])}</span>
          </div>`;
        }).join('')}
        <div class="legend"><span><span class="sw" style="background:var(--accent)"></span>${esc(c.name)}</span><span><span class="sw" style="background:var(--ink)"></span>Atlas average</span></div>
      </section>
      <section class="card">
        <h3>Where it stands</h3>
        <p class="big-fact">${esc(c.name)} holds ${(100 * c.population / t.population).toFixed(1)}% of the dataset's population
        and produces ${(100 * c.gdp / t.gdp).toFixed(1)}% of its combined GDP.</p>
        <p class="big-fact">Its people live, on average, to ${formatValue('lifeExpectancy', c.lifeExpectancy)} —
        ${c.lifeExpectancy >= worldAverage('lifeExpectancy') ? 'above' : 'below'} the Atlas average of ${worldAverage('lifeExpectancy').toFixed(1)} years —
        and ${formatValue('urbanPct', c.urbanPct)} of them live in towns and cities.</p>
        <p><a class="btn" href="#/compare?a=${c.code}">Compare ${esc(c.name)} with…</a>
        <a class="btn ghost" href="#/charts?indicator=population">See it in the charts</a></p>
      </section>
    </div>

    <h2>Neighbours in the table</h2>
    <div class="grid-3">
      ${[...COUNTRIES].filter((x) => x.region === c.region && x.code !== c.code)
        .sort((a, b) => Math.abs(a.population - c.population) - Math.abs(b.population - c.population)).slice(0, 3)
        .map((x) => `<a class="card region-card" href="#/country/${x.code}">
          <div class="r-name">${esc(x.name)}</div>
          <div class="r-meta">${esc(x.capital)} · ${formatValue('population', x.population)} people · ${formatValue('gdpPerCapita', x.gdpPerCapita)} per capita</div>
        </a>`).join('')}
    </div>`;
}

/* ---------- compare ---------- */
export function viewCompare(root, query) {
  let a = byCode(query.get('a')) || byCode('USA');
  let b = byCode(query.get('b')) || byCode('CHN');
  if (a.code === b.code) b = byCode('CHN').code === a.code ? byCode('USA') : byCode('CHN');

  function options(sel) {
    return COUNTRIES.map((c) => `<option value="${c.code}" ${c.code === sel.code ? 'selected' : ''}>${esc(c.name)}</option>`).join('');
  }
  function winner(k) {
    const ind = indicator(k);
    if (ind.higher === null || a[k] === b[k]) return 0;
    const aWins = ind.higher ? a[k] > b[k] : a[k] < b[k];
    return aWins ? 1 : 2;
  }

  function render() {
    root.innerHTML = `
      <p class="eyebrow">Head to head</p>
      <h1>Compare two countries</h1>
      <p class="lede">Pick any two countries in the Atlas. For indicators where “more” (or, for CO₂, “less”) is usually
      read as better, the stronger figure is highlighted — the rest is left for you to judge.</p>
      <form class="controls">
        <label class="field grow">Country A <select id="cmp-a">${options(a)}</select></label>
        <label class="field grow">Country B <select id="cmp-b">${options(b)}</select></label>
      </form>
      <div class="vs-head">
        <div class="vs-side"><span class="pill">${esc(a.region)}</span><h3 style="font-size:1.3rem;margin:.35rem 0 0">${esc(a.name)}</h3><div class="muted">Capital ${esc(a.capital)}</div></div>
        <div class="vs-mid">vs</div>
        <div class="vs-side"><span class="pill gold">${esc(b.region)}</span><h3 style="font-size:1.3rem;margin:.35rem 0 0">${esc(b.name)}</h3><div class="muted">Capital ${esc(b.capital)}</div></div>
      </div>
      <table class="compare">
        <tbody>
        ${INDICATORS.map((i) => {
          const w = winner(i.key);
          return `<tr><td>${esc(i.label)}</td>
            <td class="${w === 1 ? 'win' : ''}">${formatValue(i.key, a[i.key])}</td>
            <td class="${w === 2 ? 'win' : ''}">${formatValue(i.key, b[i.key])}</td></tr>`;
        }).join('')}
        </tbody>
      </table>
      <section class="card" style="margin-top:.9rem">
        <h3>Population and GDP, side by side</h3>
        <canvas class="chart" id="cmp-chart" role="img" aria-label="Grouped bar chart comparing the two countries"></canvas>
        <div class="legend"><span><span class="sw" style="background:var(--accent)"></span>${esc(a.name)}</span><span><span class="sw" style="background:var(--gold)"></span>${esc(b.name)}</span></div>
      </section>
      <p style="margin-top:1rem"><a class="btn ghost" href="#/country/${a.code}">${esc(a.name)} profile</a>
      <a class="btn ghost" href="#/country/${b.code}">${esc(b.name)} profile</a></p>`;

    root.querySelector('#cmp-a').addEventListener('change', (e) => { a = byCode(e.target.value); if (a.code === b.code) b = COUNTRIES.find((c) => c.code !== a.code); render(); });
    root.querySelector('#cmp-b').addEventListener('change', (e) => { b = byCode(e.target.value); if (a.code === b.code) a = COUNTRIES.find((c) => c.code !== b.code); render(); });
    drawGrouped(root.querySelector('#cmp-chart'), a, b);
  }

  function drawGrouped(canvas, x, y) {
    const rows = [
      { label: 'Population', key: 'population' },
      { label: 'GDP', key: 'gdp' },
    ];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.clientWidth || 520, H = rows.length * 64 + 10;
    canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.height = `${H}px`;
    const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
    ctx.font = '12px "Avenir Next", "Segoe UI", system-ui, sans-serif';
    rows.forEach((r, i) => {
      const max = Math.max(x[r.key], y[r.key]) * 1.02;
      const baseY = i * 64 + 8, barW = W - 118 - 70;
      ctx.fillStyle = '#43536e'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText(r.label, 110, baseY + 20, 104);
      ctx.fillStyle = '#0f6a5c'; roundRect(ctx, 118, baseY + 2, Math.max(3, (x[r.key] / max) * barW), 15, 5); ctx.fill();
      ctx.fillStyle = '#c8871a'; roundRect(ctx, 118, baseY + 24, Math.max(3, (y[r.key] / max) * barW), 15, 5); ctx.fill();
      ctx.fillStyle = '#17233b'; ctx.textAlign = 'left';
      ctx.fillText(formatAxis(r.key, x[r.key]), 122 + (x[r.key] / max) * barW, baseY + 10);
      ctx.fillText(formatAxis(r.key, y[r.key]), 122 + (y[r.key] / max) * barW, baseY + 32);
    });
  }

  render();
}

/* ---------- charts explorer ---------- */
export function viewCharts(root, query) {
  const state = { key: INDICATORS.some((i) => i.key === query.get('indicator')) ? query.get('indicator') : 'gdpPerCapita', region: 'All' };
  function render() {
    const rows = COUNTRIES
      .filter((c) => state.region === 'All' || c.region === state.region)
      .map((c) => ({ label: c.name, value: c[state.key], color: REGION_COLORS[c.region], code: c.code }))
      .sort((a, b) => b.value - a.value);
    const ind = indicator(state.key);
    root.innerHTML = `
      <p class="eyebrow">Chart explorer</p>
      <h1>Every country, one indicator</h1>
      <p class="lede">Choose an indicator and the chart redraws from the dataset — the same numbers as the
      <a href="#/countries">country table</a>, ranked. Click any bar's country in the table below the chart to open its profile.</p>
      <form class="controls">
        <label class="field grow">Indicator
          <select id="ch-key">${INDICATORS.map((i) => `<option value="${i.key}" ${i.key === state.key ? 'selected' : ''}>${esc(i.label)} (${esc(i.unit)})</option>`).join('')}</select>
        </label>
        <label class="field">Region
          <select id="ch-region"><option ${state.region === 'All' ? 'selected' : ''}>All</option>${REGIONS.map((r) => `<option ${state.region === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}</select>
        </label>
      </form>
      <section class="card">
        <h3>${esc(ind.label)} — ranked</h3>
        <canvas class="chart" id="ch-main" role="img" aria-label="Ranked bar chart of ${esc(ind.label)}"></canvas>
        <div class="legend">${REGIONS.map((r) => `<span><span class="sw" style="background:${REGION_COLORS[r]}"></span>${esc(r)}</span>`).join('')}</div>
        <p class="chart-note">Top: <strong>${esc(rows[0].label)}</strong> at ${formatValue(state.key, rows[0].value)};
        bottom: <strong>${esc(rows[rows.length - 1].label)}</strong> at ${formatValue(state.key, rows[rows.length - 1].value)}.
        Atlas average: ${formatValue(state.key, worldAverage(state.key))}.</p>
      </section>
      <div class="table-wrap" style="margin-top:.9rem">
        <table class="data" style="min-width:420px">
          <thead><tr><th scope="col">#</th><th scope="col">Country</th><th scope="col">${esc(ind.label)}</th></tr></thead>
          <tbody>${rows.map((r, i) => `<tr data-code="${r.code}" tabindex="0"><td>${i + 1}</td><td><strong>${esc(r.label)}</strong></td><td class="num">${formatValue(state.key, r.value)}</td></tr>`).join('')}</tbody>
        </table>
      </div>`;
    root.querySelector('#ch-key').addEventListener('change', (e) => { state.key = e.target.value; render(); });
    root.querySelector('#ch-region').addEventListener('change', (e) => { state.region = e.target.value; render(); });
    root.querySelectorAll('tr[data-code]').forEach((tr) => tr.addEventListener('click', () => { location.hash = `#/country/${tr.dataset.code}`; }));
    barChart(root.querySelector('#ch-main'), rows, state.key, { rowH: 24 });
  }
  render();
}

/* ---------- about ---------- */
export function viewAbout(root) {
  const t = totals();
  root.innerHTML = `
    <p class="eyebrow">Methodology</p>
    <h1>About the data</h1>
    <p class="lede">Meridian Atlas is a curated reference dataset, compiled in November 2026 for exploring and comparing
    countries. It is deliberately small — ${t.countries} countries that together hold ${(t.population / 1000).toFixed(2)} billion people —
    and deliberately consistent: every derived figure is computed from the base figures on the site itself.</p>

    <section class="card">
      <h3>How the numbers are built</h3>
      <dl class="defs">
        <dt>Base figures</dt>
        <dd>Population, land area and GDP are rounded published estimates for 2024, of the kind issued by national
        statistics offices and international agencies (UN population estimates, World Bank national accounts).
        They are rounded on purpose: the Atlas is for comparison and exploration, not for quoting to the last digit.</dd>
        <dt>Derived figures (computed on the site)</dt>
        <dd>GDP per capita = GDP ÷ population, and population density = population ÷ land area. Because they are
        calculated from the base figures in your browser, the overview totals, tables, charts and profiles can never
        disagree with each other.</dd>
        <dt>Rates</dt>
        <dd>Life expectancy, median age, urban share, adult literacy and CO₂ per capita are rounded reference values
        for the same period. Averages labelled “Atlas average” are population-weighted across the ${t.countries} countries,
        except totals (population, GDP, area), which are simple sums or means as labelled.</dd>
        <dt>Rankings</dt>
        <dd>“Rank #n of ${t.countries}” always means rank within this dataset, highest first — not a world ranking.</dd>
      </dl>
    </section>

    <div class="grid-2" style="margin-top:.9rem">
      <section class="card">
        <h3>Indicator definitions</h3>
        <dl class="defs">
          ${INDICATORS.map((i) => `<dt>${esc(i.label)}</dt><dd>${{
            population: 'People usually resident in the country, mid-year estimate, in millions.',
            gdp: 'Gross domestic product in current US dollars — the market value of final goods and services produced in a year.',
            gdpPerCapita: 'GDP divided by population: a rough yardstick of average economic output per person, not of anyone’s income.',
            lifeExpectancy: 'Years a newborn would be expected to live at current mortality rates.',
            medianAge: 'The age that splits the population in half — half older, half younger.',
            urbanPct: 'Share of the population living in towns and cities, by each country’s own definition.',
            literacyPct: 'Share of adults (15+) who can read and write a short statement about everyday life.',
            density: 'Population divided by land area — a national average that hides empty deserts and crowded deltas alike.',
            co2PerCapita: 'Territorial carbon dioxide emissions from fuel combustion, tonnes per person per year.',
            area: 'Land area in thousands of square kilometres, excluding inland waters where sources separate them.',
          }[i.key]}</dd>`).join('')}
        </dl>
      </section>
      <section class="card">
        <h3>Reading the Atlas honestly</h3>
        <p>Averages hide distributions: a country’s GDP per capita is not its typical wage, and a national density
        says nothing about its emptiest province. Figures for a few countries rest on estimates with wider error
        bars than most. Where two countries sit within a rounding step of each other, treat them as tied.</p>
        <p>The Atlas is an original, self-contained explorer: its design, text and dataset were made for this site,
        it loads nothing from the network, and it keeps working with the connection off.</p>
        <p><a class="btn" href="#/countries">Browse the countries</a> <a class="btn ghost" href="#/compare">Compare two</a></p>
      </section>
    </div>`;
}
