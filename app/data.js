// Meridian Atlas — curated reference dataset (compiled November 2026).
// Base figures are rounded published estimates for 2024 (population, land area,
// GDP in current US$). Derived figures — GDP per capita and population density —
// are computed from the base figures in code, so every number on the site is
// internally consistent. Rates (life expectancy, median age, urban share,
// literacy, CO2 per capita) are rounded reference values; see the About view
// for definitions and notes. This file is the site's only data source.

export const INDICATORS = [
  { key: 'population', label: 'Population', unit: 'people', format: 'pop', higher: true },
  { key: 'gdp', label: 'GDP', unit: 'US$ bn', format: 'usd', higher: true },
  { key: 'gdpPerCapita', label: 'GDP per capita', unit: 'US$', format: 'usd0', higher: true },
  { key: 'lifeExpectancy', label: 'Life expectancy', unit: 'years', format: 'dec1', higher: true },
  { key: 'medianAge', label: 'Median age', unit: 'years', format: 'dec1', higher: null },
  { key: 'urbanPct', label: 'Urban population', unit: '%', format: 'pct', higher: null },
  { key: 'literacyPct', label: 'Adult literacy', unit: '%', format: 'pct', higher: true },
  { key: 'density', label: 'Population density', unit: 'people/km²', format: 'dec1', higher: null },
  { key: 'co2PerCapita', label: 'CO₂ per capita', unit: 'tonnes', format: 'dec1', higher: false },
  { key: 'area', label: 'Land area', unit: 'thousand km²', format: 'int', higher: null },
];

// population: millions · area: thousand km² · gdp: US$ billions
export const COUNTRIES = [
  { code: 'CHN', name: 'China', capital: 'Beijing', region: 'Asia', population: 1408, area: 9597, gdp: 18500, lifeExpectancy: 78.6, medianAge: 39.7, urbanPct: 65, literacyPct: 97, co2PerCapita: 8.0 },
  { code: 'IND', name: 'India', capital: 'New Delhi', region: 'Asia', population: 1451, area: 3287, gdp: 3910, lifeExpectancy: 72.0, medianAge: 28.8, urbanPct: 36, literacyPct: 78, co2PerCapita: 2.0 },
  { code: 'USA', name: 'United States', capital: 'Washington, D.C.', region: 'North America', population: 340, area: 9834, gdp: 29160, lifeExpectancy: 79.5, medianAge: 38.5, urbanPct: 83, literacyPct: 99, co2PerCapita: 13.8 },
  { code: 'IDN', name: 'Indonesia', capital: 'Jakarta', region: 'Asia', population: 283, area: 1905, gdp: 1396, lifeExpectancy: 71.1, medianAge: 30.4, urbanPct: 58, literacyPct: 96, co2PerCapita: 2.3 },
  { code: 'PAK', name: 'Pakistan', capital: 'Islamabad', region: 'Asia', population: 251, area: 881, gdp: 375, lifeExpectancy: 67.6, medianAge: 20.8, urbanPct: 38, literacyPct: 59, co2PerCapita: 1.0 },
  { code: 'NGA', name: 'Nigeria', capital: 'Abuja', region: 'Africa', population: 233, area: 924, gdp: 188, lifeExpectancy: 54.6, medianAge: 18.1, urbanPct: 54, literacyPct: 62, co2PerCapita: 0.6 },
  { code: 'BRA', name: 'Brazil', capital: 'Brasília', region: 'South America', population: 216, area: 8516, gdp: 2171, lifeExpectancy: 76.4, medianAge: 34.8, urbanPct: 88, literacyPct: 94, co2PerCapita: 2.2 },
  { code: 'BGD', name: 'Bangladesh', capital: 'Dhaka', region: 'Asia', population: 175, area: 148, gdp: 437, lifeExpectancy: 74.7, medianAge: 28.2, urbanPct: 41, literacyPct: 75, co2PerCapita: 0.6 },
  { code: 'RUS', name: 'Russia', capital: 'Moscow', region: 'Europe', population: 144, area: 17098, gdp: 2021, lifeExpectancy: 72.4, medianAge: 40.3, urbanPct: 75, literacyPct: 100, co2PerCapita: 11.4 },
  { code: 'MEX', name: 'Mexico', capital: 'Mexico City', region: 'North America', population: 130, area: 1964, gdp: 1810, lifeExpectancy: 75.2, medianAge: 30.1, urbanPct: 81, literacyPct: 95, co2PerCapita: 3.5 },
  { code: 'JPN', name: 'Japan', capital: 'Tokyo', region: 'Asia', population: 124, area: 378, gdp: 4026, lifeExpectancy: 84.9, medianAge: 49.1, urbanPct: 92, literacyPct: 99, co2PerCapita: 8.5 },
  { code: 'ETH', name: 'Ethiopia', capital: 'Addis Ababa', region: 'Africa', population: 129, area: 1104, gdp: 163, lifeExpectancy: 67.2, medianAge: 19.1, urbanPct: 24, literacyPct: 52, co2PerCapita: 0.1 },
  { code: 'PHL', name: 'Philippines', capital: 'Manila', region: 'Asia', population: 115, area: 300, gdp: 437, lifeExpectancy: 72.2, medianAge: 25.3, urbanPct: 48, literacyPct: 96, co2PerCapita: 1.3 },
  { code: 'EGY', name: 'Egypt', capital: 'Cairo', region: 'Africa', population: 117, area: 1002, gdp: 380, lifeExpectancy: 71.8, medianAge: 24.8, urbanPct: 43, literacyPct: 71, co2PerCapita: 2.4 },
  { code: 'VNM', name: 'Vietnam', capital: 'Hanoi', region: 'Asia', population: 101, area: 331, gdp: 430, lifeExpectancy: 74.6, medianAge: 32.5, urbanPct: 40, literacyPct: 95, co2PerCapita: 3.9 },
  { code: 'COD', name: 'DR Congo', capital: 'Kinshasa', region: 'Africa', population: 109, area: 2345, gdp: 71, lifeExpectancy: 61.9, medianAge: 16.9, urbanPct: 47, literacyPct: 77, co2PerCapita: 0.1 },
  { code: 'TUR', name: 'Türkiye', capital: 'Ankara', region: 'Asia', population: 85, area: 784, gdp: 1300, lifeExpectancy: 77.2, medianAge: 33.5, urbanPct: 77, literacyPct: 97, co2PerCapita: 4.6 },
  { code: 'IRN', name: 'Iran', capital: 'Tehran', region: 'Asia', population: 91, area: 1648, gdp: 401, lifeExpectancy: 77.7, medianAge: 33.4, urbanPct: 77, literacyPct: 89, co2PerCapita: 7.1 },
  { code: 'THA', name: 'Thailand', capital: 'Bangkok', region: 'Asia', population: 72, area: 513, gdp: 515, lifeExpectancy: 80.1, medianAge: 41.1, urbanPct: 54, literacyPct: 94, co2PerCapita: 3.7 },
  { code: 'GBR', name: 'United Kingdom', capital: 'London', region: 'Europe', population: 68, area: 244, gdp: 3580, lifeExpectancy: 81.8, medianAge: 40.6, urbanPct: 84, literacyPct: 99, co2PerCapita: 4.8 },
  { code: 'FRA', name: 'France', capital: 'Paris', region: 'Europe', population: 66, area: 552, gdp: 3052, lifeExpectancy: 82.9, medianAge: 42.6, urbanPct: 81, literacyPct: 99, co2PerCapita: 4.3 },
  { code: 'DEU', name: 'Germany', capital: 'Berlin', region: 'Europe', population: 84, area: 358, gdp: 4710, lifeExpectancy: 81.7, medianAge: 45.3, urbanPct: 78, literacyPct: 99, co2PerCapita: 7.0 },
  { code: 'ITA', name: 'Italy', capital: 'Rome', region: 'Europe', population: 59, area: 301, gdp: 2300, lifeExpectancy: 83.7, medianAge: 48.0, urbanPct: 72, literacyPct: 99, co2PerCapita: 5.3 },
  { code: 'ZAF', name: 'South Africa', capital: 'Pretoria', region: 'Africa', population: 63, area: 1221, gdp: 403, lifeExpectancy: 66.1, medianAge: 28.6, urbanPct: 68, literacyPct: 90, co2PerCapita: 7.3 },
  { code: 'KOR', name: 'South Korea', capital: 'Seoul', region: 'Asia', population: 52, area: 100, gdp: 1760, lifeExpectancy: 84.3, medianAge: 45.0, urbanPct: 81, literacyPct: 98, co2PerCapita: 11.6 },
  { code: 'ESP', name: 'Spain', capital: 'Madrid', region: 'Europe', population: 48, area: 506, gdp: 1620, lifeExpectancy: 83.9, medianAge: 45.3, urbanPct: 81, literacyPct: 98, co2PerCapita: 4.9 },
  { code: 'CAN', name: 'Canada', capital: 'Ottawa', region: 'North America', population: 41, area: 9985, gdp: 2240, lifeExpectancy: 82.6, medianAge: 41.8, urbanPct: 81, literacyPct: 99, co2PerCapita: 13.6 },
  { code: 'AUS', name: 'Australia', capital: 'Canberra', region: 'Oceania', population: 27, area: 7692, gdp: 1790, lifeExpectancy: 83.5, medianAge: 38.1, urbanPct: 86, literacyPct: 99, co2PerCapita: 14.8 },
  { code: 'ARG', name: 'Argentina', capital: 'Buenos Aires', region: 'South America', population: 46, area: 2780, gdp: 633, lifeExpectancy: 77.7, medianAge: 32.4, urbanPct: 92, literacyPct: 98, co2PerCapita: 3.6 },
  { code: 'POL', name: 'Poland', capital: 'Warsaw', region: 'Europe', population: 38, area: 313, gdp: 844, lifeExpectancy: 78.6, medianAge: 42.2, urbanPct: 60, literacyPct: 99, co2PerCapita: 7.9 },
  { code: 'KEN', name: 'Kenya', capital: 'Nairobi', region: 'Africa', population: 56, area: 580, gdp: 107, lifeExpectancy: 63.6, medianAge: 19.9, urbanPct: 29, literacyPct: 82, co2PerCapita: 0.4 },
  { code: 'SAU', name: 'Saudi Arabia', capital: 'Riyadh', region: 'Asia', population: 33, area: 2150, gdp: 1069, lifeExpectancy: 79.0, medianAge: 30.8, urbanPct: 85, literacyPct: 96, co2PerCapita: 15.9 },
];

export const REGIONS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

// Attach derived figures so every view reads the same numbers.
for (const c of COUNTRIES) {
  c.gdpPerCapita = Math.round((c.gdp * 1e9) / (c.population * 1e6));
  c.density = Math.round(((c.population * 1e6) / (c.area * 1e3)) * 10) / 10;
}

export function byCode(code) {
  return COUNTRIES.find((c) => c.code === String(code || '').toUpperCase()) || null;
}

export function rankOf(country, key) {
  const sorted = [...COUNTRIES].sort((a, b) => b[key] - a[key]);
  return sorted.findIndex((c) => c.code === country.code) + 1;
}

export function worldAverage(key) {
  if (key === 'population' || key === 'gdp' || key === 'area') {
    return COUNTRIES.reduce((s, c) => s + c[key], 0) / COUNTRIES.length;
  }
  // Population-weighted mean for rates and per-person figures.
  const totalPop = COUNTRIES.reduce((s, c) => s + c.population, 0);
  return COUNTRIES.reduce((s, c) => s + c[key] * c.population, 0) / totalPop;
}

export function totals() {
  return {
    countries: COUNTRIES.length,
    population: COUNTRIES.reduce((s, c) => s + c.population, 0),
    gdp: COUNTRIES.reduce((s, c) => s + c.gdp, 0),
    regions: REGIONS.length,
  };
}

const fmtInt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const fmt1 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function formatValue(key, v) {
  if (v == null || Number.isNaN(v)) return '—';
  switch (key) {
    case 'population':
      return v >= 1000 ? `${(v / 1000).toFixed(2)} bn` : `${fmt1.format(v)} m`;
    case 'gdp':
      return v >= 1000 ? `$${(v / 1000).toFixed(2)} tn` : `$${fmtInt.format(v)} bn`;
    case 'gdpPerCapita':
      return `$${fmtInt.format(v)}`;
    case 'area':
      return `${fmtInt.format(v * 1000)} km²`;
    case 'density':
      return `${fmt1.format(v)}/km²`;
    case 'urbanPct':
    case 'literacyPct':
      return `${fmtInt.format(v)}%`;
    case 'lifeExpectancy':
    case 'medianAge':
      return `${fmt1.format(v)} yrs`;
    case 'co2PerCapita':
      return `${fmt1.format(v)} t`;
    default:
      return fmt1.format(v);
  }
}

export function formatAxis(key, v) {
  switch (key) {
    case 'population': return v >= 1000 ? `${(v / 1000).toFixed(1)}bn` : `${Math.round(v)}m`;
    case 'gdp': return v >= 1000 ? `$${(v / 1000).toFixed(1)}tn` : `$${Math.round(v)}bn`;
    case 'gdpPerCapita': return `$${Math.round(v / 1000)}k`;
    case 'area': return `${Math.round(v / 100) / 10}m km²`;
    case 'density': return `${Math.round(v)}`;
    default: return `${Math.round(v * 10) / 10}`;
  }
}
