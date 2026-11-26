import { viewOverview, viewCountries, viewCountry, viewCompare, viewCharts, viewAbout } from './views.js';

const root = document.getElementById('view');

function parseHash() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, qs] = raw.split('?');
  const parts = path.split('/').filter(Boolean);
  return { parts, query: new URLSearchParams(qs || '') };
}

function setActive(name) {
  document.querySelectorAll('.mainnav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === name);
  });
}

function route() {
  const { parts, query } = parseHash();
  const head = parts[0] || '';
  window.scrollTo(0, 0);
  if (head === '' ) { setActive('overview'); viewOverview(root); }
  else if (head === 'countries') { setActive('countries'); viewCountries(root, query); }
  else if (head === 'country' && parts[1]) { setActive('countries'); viewCountry(root, parts[1]); }
  else if (head === 'compare') { setActive('compare'); viewCompare(root, query); }
  else if (head === 'charts') { setActive('charts'); viewCharts(root, query); }
  else if (head === 'about') { setActive('about'); viewAbout(root); }
  else {
    setActive('');
    root.innerHTML = `<h1>Page not found</h1><p class="lede">That page is not in the Atlas.</p>
      <p><a class="btn" href="#/">Go to the overview</a></p>`;
  }
  root.focus({ preventScroll: true });
}

window.addEventListener('hashchange', route);
route();
