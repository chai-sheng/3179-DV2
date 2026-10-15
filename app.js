'use strict';

// Static, local-data Vega-Lite story. All filters are processed in the browser.
const chartFiles = [
  '01-observation-map','02-cluster-map','03-species-bars','04-season-heatmap',
  '05-habitat-seasons','06-latitude-boxplot','07-reporting-trend','08-species-mix',
  '09-evidence-treemap','10-migration-habitats','11-habitat-alluvial'
];
const views = new Map();
let observations = [];
const byId = id => document.getElementById(id);

async function jsonFile(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.json();
}

function chartWidth(element) {
  const minimum = {'chart-04':420, 'chart-05':640, 'chart-07':420, 'chart-11':580};
  return Math.max(minimum[element.id] || 240, Math.floor(element.getBoundingClientRect().width));
}

async function drawChart(file) {
  const id = file.slice(0, 2);
  const target = byId(`chart-${id}`);
  try {
    if (['04','05','07','11'].includes(id)) {
      target.classList.add('scrollable-chart');
      target.tabIndex = 0;
    }
    const spec = await jsonFile(`specs/${file}.json`);
    const narrow = chartWidth(target) < 420;
    spec.width = chartWidth(target);
    // Preserve readable month labels and the plotted area on small screens.
    if (id === '05' && narrow) {
      spec.encoding.y.axis.labelLimit = 130;
      spec.encoding.y.axis.labelFontSize = 9;
      spec.encoding.x.axis.labelFontSize = 9;
    }
    if (id === '03' && narrow) {
      spec.encoding.y.axis.labelLimit = 100;
      spec.encoding.y.axis.labelFontSize = 10;
    }
    if (id === '11' && narrow) {
      spec.layer.filter(layer => layer.mark.type === 'text').forEach(layer => {
        layer.mark.fontSize = 9;
      });
    }
    target.replaceChildren();
    const result = await vegaEmbed(target, spec, {
      actions: false,
      renderer: 'svg',
      tooltip: {theme: 'light', sanitize: value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]))}
    });
    views.set(id, result.view);
    if (id === '01' || id === '02') await applyMapSignals(result.view);
    if (id === '04') await result.view.signal('heatSpecies', byId('heat-species').value).runAsync();
    if (id === '10') await result.view.signal('habitatSpecies', byId('habitat-species').value).runAsync();
    target.setAttribute('aria-label', spec.description);
  } catch (error) {
    console.error(`Could not draw chart ${id}`, error);
    target.replaceChildren();
    const message = document.createElement('p');
    message.className = 'chart-error';
    message.textContent = 'This chart could not load. Refresh the page to try again.';
    const source = document.createElement('a');
    source.href = `specs/${file}.json`;
    source.textContent = 'Open the chart specification';
    message.append(source);
    target.append(message);
  }
}

function mapSelection() {
  return {species:byId('map-species').value, year:byId('map-year').value, season:byId('map-season').value};
}

function selectedRecord(record, selection) {
  const periodMatches = selection.year === 'all' ? record.year <= 2025 : record.year === Number(selection.year);
  const speciesMatches = selection.species === 'All' || record.species === selection.species;
  const seasons = {summer:[12,1,2], autumn:[3,4,5], winter:[6,7,8], spring:[9,10,11]};
  const seasonMatches = selection.season === 'All' || seasons[selection.season].includes(record.month);
  return periodMatches && speciesMatches && seasonMatches;
}

function updateCount() {
  const selection = mapSelection();
  const count = observations.filter(record => selectedRecord(record, selection)).length;
  const period = selection.year === 'all' ? '2016–2025 baseline' : selection.year === '2026' ? '2026 · partial to 19 July' : selection.year;
  let text = `${count.toLocaleString()} ${count === 1 ? 'record' : 'records'} · ${period}`;
  if (selection.species !== 'All') text += ` · ${selection.species}`;
  if (selection.season !== 'All') text += ` · ${selection.season}`;
  if (!count) text += ' · No records match these filters; this does not imply whale absence.';
  byId('map-count').textContent = text;
}

async function applyMapSignals(view) {
  const selection = mapSelection();
  return view.signal('speciesChoice', selection.species)
    .signal('yearChoice', selection.year)
    .signal('seasonChoice', selection.season).runAsync();
}

async function updateMaps() {
  updateCount();
  const updates = ['01','02'].filter(id => views.has(id)).map(id => applyMapSignals(views.get(id)));
  await Promise.all(updates);
}

async function start() {
  ['map-species','map-year','map-season'].forEach(id => byId(id).addEventListener('change', updateMaps));
  byId('reset-maps').addEventListener('click', () => {
    byId('map-species').value = 'All';
    byId('map-year').value = 'all';
    byId('map-season').value = 'All';
    updateMaps();
  });
  byId('heat-species').addEventListener('change', async event => {
    if (views.has('04')) await views.get('04').signal('heatSpecies', event.target.value).runAsync();
  });
  byId('habitat-species').addEventListener('change', async event => {
    if (views.has('10')) await views.get('10').signal('habitatSpecies', event.target.value).runAsync();
  });
  const dataReady = jsonFile('data/observations.json').then(data => {observations=data;updateCount();}).catch(error => {
    console.error(error);
    byId('map-count').textContent = 'Observation totals could not load. Please refresh.';
  });
  await Promise.all([dataReady, ...chartFiles.map(drawChart)]);
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      for (const [id, view] of views) view.width(chartWidth(byId(`chart-${id}`))).resize().runAsync();
    }, 160);
  });
}

start();
