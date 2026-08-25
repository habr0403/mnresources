(() => {
  'use strict';

  const DATA = window.RESOURCE_DATA || { meta: {}, resources: [], guides: {} };
  const resources = DATA.resources || [];
  const guides = DATA.guides || {};

  const TYPE_INFO = {
    all: { label: 'All resources', icon: '⌕' },
    housing: { label: 'Affordable & Supportive Housing', short: 'Housing', icon: '⌂' },
    treatment: { label: 'Residential Treatment', short: 'Treatment', icon: '✚' },
    iop: { label: 'IOP & Outpatient', short: 'IOP', icon: '◫' },
    sober: { label: 'Sober & Recovery Housing', short: 'Recovery housing', icon: '♢' },
    reentry: { label: 'Reentry & Second-Chance', short: 'Reentry', icon: '↗' },
    access: { label: 'County & Statewide Access', short: 'Access points', icon: '◎' }
  };

  const STORAGE = {
    tracker: 'mn-resource-tracker-v1',
    checklists: 'mn-resource-checklists-v1',
    profile: 'mn-resource-profile-v1'
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const escapeHTML = (value = '') => String(value)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  const normalize = (value = '') => String(value).toLowerCase().replace(/[’‘]/g, "'").trim();
  const nonempty = value => value !== null && value !== undefined && String(value).trim() !== '';
  const validUrl = value => /^https?:\/\//i.test(String(value || '').trim());
  const phoneHref = phone => `tel:${String(phone || '').replace(/[^\d+]/g, '')}`;
  const csvEscape = value => `"${String(value ?? '').replaceAll('"', '""')}"`;

  let state = {
    query: '', type: 'all', location: 'all', population: 'all', feature: 'all',
    sort: 'relevance', favoritesOnly: false, visible: 24, compact: false
  };
  let compareIds = new Set();
  let tracker = loadJSON(STORAGE.tracker, {});
  let checklistState = loadJSON(STORAGE.checklists, {});
  let profileState = loadJSON(STORAGE.profile, {});
  let filteredResources = resources.slice();

  function loadJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch { return fallback; }
  }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function resourceById(id) { return resources.find(r => r.id === id); }
  function locationLabel(r) { return [r.city, r.county && r.county !== r.city ? r.county : '', r.region].filter(nonempty).join(' • ') || 'Minnesota'; }
  function matchesPopulation(text, value) {
    const patterns = {
      women: /\bwomen\b|\bwoman\b|female|mothers?|pregnant|postpartum/i,
      men: /(^|[^a-z])men([^a-z]|$)|\bmale\b|fathers?/i,
      'co-ed': /co-?ed|all genders?|mixed gender/i,
      children: /children|child|family|families|parenting|pregnant|postpartum/i,
      youth: /youth|young adult|adolescent|teen/i,
      veteran: /veteran|military/i,
      lgbtq: /lgbtq|transgender|nonbinary|queer/i,
      justice: /justice|incarcerat|criminal|reentry|re-entry|correction|felon/i
    };
    return patterns[value] ? patterns[value].test(text) : text.includes(value);
  }
  function matchesFeature(text, value) {
    const patterns = {
      eviction: /eviction|rental barrier|screening barrier/i,
      criminal: /criminal|felon|incarcerat|justice|reentry|re-entry|correction/i,
      'low income': /low income|affordable|subsid|section 8|housing support|public housing/i,
      pregnant: /pregnant|postpartum|parenting|mothers?/i,
      children: /children|child|family treatment|parenting/i,
      'co-occurring': /co-occurring|mental health|dual diagnosis/i,
      mat: /(^|[^a-z])mat([^a-z]|$)|suboxone|buprenorphine|methadone|naltrexone|vivitrol|sublocade/i,
      telehealth: /telehealth|virtual/i,
      lgbtq: /lgbtq|transgender|nonbinary|queer/i,
      veteran: /veteran|military/i,
      youth: /youth|young adult|adolescent|teen/i
    };
    return patterns[value] ? patterns[value].test(text) : text.includes(value);
  }
  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
  }
  function downloadText(filename, content, mime = 'text/plain;charset=utf-8') {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.append(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
  function scrollToDirectory() { $('#directory').scrollIntoView({ behavior: 'smooth', block: 'start' }); }

  function init() {
    renderHeroStats();
    renderCategories();
    renderPaths();
    populateFilters();
    bindGlobalEvents();
    renderTools();
    const portalParams = new URLSearchParams(window.location.search);
    const portalQuery = (portalParams.get('q') || '').trim();
    const portalType = (portalParams.get('type') || '').trim();
    if (portalQuery) { state.query = portalQuery; $('#directorySearch').value = portalQuery; $('#heroSearch').value = portalQuery; }
    if (portalType && TYPE_INFO[portalType]) { state.type = portalType; $('#typeFilter').value = portalType; }
    applyFilters();
    renderTracker();
    $('#footerDataDate').textContent = `${DATA.meta.generated || 'Workbook data'} • ${DATA.meta.total || resources.length} directory records`;
  }

  function renderHeroStats() {
    const items = [
      ['housing', 'Housing'], ['treatment', 'Treatment'], ['iop', 'IOP'],
      ['sober', 'Recovery homes'], ['reentry', 'Reentry'], ['access', 'Access points']
    ];
    $('#heroStats').innerHTML = items.map(([type, label]) => `
      <div class="stat-card"><strong>${DATA.meta.counts?.[type] ?? resources.filter(r => r.type === type).length}</strong><span>${escapeHTML(label)}</span></div>
    `).join('');
  }

  function renderCategories() {
    const types = ['housing', 'treatment', 'iop', 'sober', 'reentry', 'access'];
    $('#categoryGrid').innerHTML = types.map(type => {
      const info = TYPE_INFO[type];
      const count = resources.filter(r => r.type === type).length;
      const descriptions = {
        housing: 'Affordable, supportive, nonprofit, and barrier-aware options.',
        treatment: 'Residential SUD programs and specialty placement details.',
        iop: 'Outpatient programs, telehealth, MAT, insurance, and schedules.',
        sober: 'Recovery residences with gender and certification information.',
        reentry: 'Housing and support for justice-involved applicants.',
        access: 'County, statewide, and population-specific entry points.'
      };
      return `<button class="category-card" data-type="${type}" type="button">
        <span class="category-icon" aria-hidden="true">${info.icon}</span>
        <strong>${escapeHTML(info.short)}</strong>
        <small>${escapeHTML(descriptions[type])}</small>
        <span class="category-count">${count} resources →</span>
      </button>`;
    }).join('');
  }

  function renderPaths() {
    const paths = [
      { title: 'I need somewhere safe right now', text: 'Start with county or statewide access points for shelter, coordinated entry, crisis housing, and emergency assistance.', type: 'access', query: 'shelter emergency coordinated entry' },
      { title: 'I need affordable long-term housing', text: 'Search affordable, subsidized, nonprofit, supportive, and housing-authority pathways.', type: 'housing', query: 'affordable low income supportive' },
      { title: 'I have an eviction or rental barrier', text: 'Prioritize programs that review barriers case-by-case, nonprofit housing, and Beyond Backgrounds leads.', type: 'housing', query: 'eviction barrier case-by-case Beyond Backgrounds' },
      { title: 'I need residential treatment', text: 'Compare population fit, co-occurring care, children, pregnancy, detox requirements, and admission steps.', type: 'treatment', query: '' },
      { title: 'I need IOP or outpatient care', text: 'Filter IOP programs by location, telehealth, MAT, insurance, schedule, and housing availability.', type: 'iop', query: '' },
      { title: 'I need recovery housing after treatment', text: 'Review sober homes and recovery residences, then verify fees, openings, rules, and MAT policies.', type: 'sober', query: '' },
      { title: 'I have a criminal background', text: 'Start with reentry and second-chance programs that explicitly serve justice-involved people.', type: 'reentry', query: '' },
      { title: 'I am helping a woman with children', text: 'Search programs that mention women, pregnant or parenting services, and children allowed in residence.', type: 'all', query: 'women children pregnant parenting' },
      { title: 'I need help planning the entire search', text: 'Use the housing profile, application packet, call scripts, document checklist, and 30-day action plan.', action: 'tools' }
    ];
    $('#pathGrid').innerHTML = paths.map((p, i) => `<article class="path-card">
      <div class="path-number">${i + 1}</div><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.text)}</p>
      <button type="button" data-path-type="${p.type || ''}" data-path-query="${escapeHTML(p.query || '')}" data-path-action="${p.action || ''}">Start here →</button>
    </article>`).join('');
  }

  function populateFilters() {
    const typeSelect = $('#typeFilter');
    ['housing', 'treatment', 'iop', 'sober', 'reentry', 'access'].forEach(type => {
      typeSelect.insertAdjacentHTML('beforeend', `<option value="${type}">${escapeHTML(TYPE_INFO[type].label)}</option>`);
    });

    const locations = new Set();
    resources.forEach(r => [r.city, r.county, r.region].filter(v => nonempty(v) && normalize(v) !== 'minnesota').forEach(v => locations.add(v)));
    [...locations].sort((a, b) => a.localeCompare(b)).forEach(loc => {
      $('#locationFilter').insertAdjacentHTML('beforeend', `<option value="${escapeHTML(normalize(loc))}">${escapeHTML(loc)}</option>`);
    });

    const populations = [
      ['women', 'Women'], ['men', 'Men'], ['co-ed', 'Co-ed / all genders'], ['children', 'Families / children'],
      ['youth', 'Youth / young adults'], ['veteran', 'Veterans'], ['lgbtq', 'LGBTQ+'], ['justice', 'Justice-involved']
    ];
    populations.forEach(([value, label]) => $('#populationFilter').insertAdjacentHTML('beforeend', `<option value="${value}">${label}</option>`));
  }

  function bindGlobalEvents() {
    $('#menuButton').addEventListener('click', () => {
      const open = $('#primaryNav').classList.toggle('open');
      $('#menuButton').setAttribute('aria-expanded', String(open));
    });
    $$('#primaryNav a').forEach(a => a.addEventListener('click', () => $('#primaryNav').classList.remove('open')));

    $('#heroSearchForm').addEventListener('submit', e => {
      e.preventDefault();
      state.query = $('#heroSearch').value.trim();
      $('#directorySearch').value = state.query;
      state.visible = 24;
      applyFilters(); scrollToDirectory();
    });
    $('#directorySearch').addEventListener('input', e => {
      state.query = e.target.value.trim(); state.visible = 24; applyFilters();
    });
    $('#clearSearch').addEventListener('click', () => {
      state.query = ''; $('#directorySearch').value = ''; $('#heroSearch').value = ''; applyFilters();
    });
    $('#filterToggle').addEventListener('click', () => {
      const open = $('#filterPanel').classList.toggle('open');
      $('#filterToggle').setAttribute('aria-expanded', String(open));
    });
    ['type', 'location', 'population', 'feature', 'sort'].forEach(name => {
      $(`#${name}Filter`).addEventListener('change', e => {
        state[name] = e.target.value; state.visible = 24; applyFilters();
      });
    });
    $('#favoritesToggle').addEventListener('click', () => {
      state.favoritesOnly = !state.favoritesOnly;
      $('#favoritesToggle').setAttribute('aria-pressed', String(state.favoritesOnly));
      $('#favoritesToggle').textContent = state.favoritesOnly ? '♥ Favorites only' : '♡ Favorites';
      state.visible = 24; applyFilters();
    });
    $('#resetFilters').addEventListener('click', resetFilters);
    $('#emptyReset').addEventListener('click', resetFilters);
    $('#loadMore').addEventListener('click', () => { state.visible += 24; renderResults(); });
    $('#cardViewButton').addEventListener('click', () => setView(false));
    $('#listViewButton').addEventListener('click', () => setView(true));
    $('#printButton').addEventListener('click', () => window.print());
    $('#exportButton').addEventListener('click', exportResults);

    $('#categoryGrid').addEventListener('click', e => {
      const card = e.target.closest('[data-type]'); if (!card) return;
      state.type = card.dataset.type; $('#typeFilter').value = state.type; state.visible = 24; applyFilters(); scrollToDirectory();
    });
    $('#pathGrid').addEventListener('click', e => {
      const button = e.target.closest('button'); if (!button) return;
      if (button.dataset.pathAction === 'tools') { $('#tools').scrollIntoView({ behavior: 'smooth' }); return; }
      state.type = button.dataset.pathType || 'all'; state.query = button.dataset.pathQuery || '';
      $('#typeFilter').value = state.type; $('#directorySearch').value = state.query; state.visible = 24;
      applyFilters(); scrollToDirectory();
    });
    $('#activeFilters').addEventListener('click', e => {
      const btn = e.target.closest('[data-clear-filter]'); if (!btn) return;
      const key = btn.dataset.clearFilter;
      if (key === 'query') { state.query = ''; $('#directorySearch').value = ''; }
      else if (key === 'favoritesOnly') { state.favoritesOnly = false; $('#favoritesToggle').setAttribute('aria-pressed', 'false'); $('#favoritesToggle').textContent = '♡ Favorites'; }
      else { state[key] = 'all'; const el = $(`#${key}Filter`); if (el) el.value = 'all'; }
      state.visible = 24; applyFilters();
    });

    $('#resourceGrid').addEventListener('click', handleResourceClick);
    $('#resourceGrid').addEventListener('change', handleCompareChange);
    $('#clearCompare').addEventListener('click', () => { compareIds.clear(); updateCompareUI(); renderResults(); });
    $('#openCompare').addEventListener('click', openCompareDialog);
    $('#resourceDialog').addEventListener('click', dialogBackdropClose);
    $('#compareDialog').addEventListener('click', dialogBackdropClose);
    $$('.dialog-close').forEach(btn => btn.addEventListener('click', e => e.target.closest('dialog').close()));

    $('.tool-tabs').addEventListener('click', e => {
      const tab = e.target.closest('[role="tab"]'); if (!tab) return;
      $$('.tool-tabs [role="tab"]').forEach(t => t.setAttribute('aria-selected', String(t === tab)));
      $$('.tool-panel').forEach(panel => panel.hidden = panel.id !== tab.getAttribute('aria-controls'));
    });

    $('#exportTracker').addEventListener('click', exportTracker);
    $('#clearTracker').addEventListener('click', () => {
      if (!confirm('Clear every saved resource, status, follow-up date, and note from this browser?')) return;
      tracker = {}; saveJSON(STORAGE.tracker, tracker); renderTracker(); renderResults(); showToast('Tracker cleared');
    });
    $('#trackerBody').addEventListener('input', handleTrackerEdit);
    $('#trackerBody').addEventListener('change', handleTrackerEdit);
    $('#trackerBody').addEventListener('click', e => {
      const remove = e.target.closest('[data-remove-track]'); if (!remove) return;
      delete tracker[remove.dataset.removeTrack]; saveJSON(STORAGE.tracker, tracker); renderTracker(); renderResults();
    });
  }

  function setView(compact) {
    state.compact = compact;
    $('#resourceGrid').classList.toggle('compact', compact);
    $('#cardViewButton').classList.toggle('active', !compact);
    $('#listViewButton').classList.toggle('active', compact);
    $('#cardViewButton').setAttribute('aria-pressed', String(!compact));
    $('#listViewButton').setAttribute('aria-pressed', String(compact));
  }

  function resetFilters() {
    state = { ...state, query: '', type: 'all', location: 'all', population: 'all', feature: 'all', sort: 'relevance', favoritesOnly: false, visible: 24 };
    $('#directorySearch').value = ''; $('#heroSearch').value = '';
    ['type', 'location', 'population', 'feature', 'sort'].forEach(name => $(`#${name}Filter`).value = state[name]);
    $('#favoritesToggle').setAttribute('aria-pressed', 'false'); $('#favoritesToggle').textContent = '♡ Favorites';
    applyFilters();
  }

  function applyFilters() {
    const query = normalize(state.query);
    const queryTerms = query.split(/\s+/).filter(Boolean);
    filteredResources = resources.filter(r => {
      const text = r.searchText || normalize(JSON.stringify(r));
      if (state.type !== 'all' && r.type !== state.type) return false;
      if (state.location !== 'all' && !normalize([r.city, r.county, r.region].join(' ')).includes(state.location)) return false;
      if (state.population !== 'all' && !matchesPopulation(text, state.population)) return false;
      if (state.feature !== 'all' && !matchesFeature(text, state.feature)) return false;
      if (state.favoritesOnly && !tracker[r.id]?.favorite) return false;
      if (queryTerms.length && !queryTerms.every(term => text.includes(term))) return false;
      return true;
    });

    const priorityRank = { high: 0, medium: 1, low: 2 };
    filteredResources.sort((a, b) => {
      if (state.sort === 'name') return a.name.localeCompare(b.name);
      if (state.sort === 'location') return locationLabel(a).localeCompare(locationLabel(b));
      if (state.sort === 'priority') return (priorityRank[normalize(a.priority)] ?? 9) - (priorityRank[normalize(b.priority)] ?? 9) || a.name.localeCompare(b.name);
      if (queryTerms.length) {
        const score = r => queryTerms.reduce((sum, term) => sum + (normalize(r.name).includes(term) ? 5 : 0) + (normalize(r.city).includes(term) ? 3 : 0) + ((r.searchText || '').split(term).length - 1), 0);
        return score(b) - score(a) || a.name.localeCompare(b.name);
      }
      return (priorityRank[normalize(a.priority)] ?? 5) - (priorityRank[normalize(b.priority)] ?? 5) || a.name.localeCompare(b.name);
    });

    updateFilterUI(); renderResults();
  }

  function updateFilterUI() {
    const active = [];
    if (state.query) active.push(['query', `Search: ${state.query}`]);
    if (state.type !== 'all') active.push(['type', TYPE_INFO[state.type].short]);
    if (state.location !== 'all') active.push(['location', $('#locationFilter').selectedOptions[0]?.text || state.location]);
    if (state.population !== 'all') active.push(['population', $('#populationFilter').selectedOptions[0]?.text || state.population]);
    if (state.feature !== 'all') active.push(['feature', $('#featureFilter').selectedOptions[0]?.text || state.feature]);
    if (state.favoritesOnly) active.push(['favoritesOnly', 'Favorites only']);
    $('#activeFilterCount').textContent = active.length;
    $('#activeFilters').innerHTML = active.map(([key, label]) => `<span class="filter-chip">${escapeHTML(label)}<button type="button" aria-label="Remove ${escapeHTML(label)}" data-clear-filter="${key}">×</button></span>`).join('');
    $('#resultCount').textContent = filteredResources.length.toLocaleString();
    $('#resultLabel').textContent = filteredResources.length === 1 ? 'resource' : 'resources';
  }

  function renderResults() {
    const shown = filteredResources.slice(0, state.visible);
    $('#resourceGrid').innerHTML = shown.map(resourceCardHTML).join('');
    $('#emptyState').hidden = filteredResources.length !== 0;
    $('#loadMore').hidden = state.visible >= filteredResources.length || filteredResources.length === 0;
    $('#loadMore').textContent = `Show more (${Math.min(24, filteredResources.length - state.visible)} remaining)`;
    updateCompareUI();
  }

  function resourceCardHTML(r) {
    const track = tracker[r.id] || {};
    const tags = [...new Set((r.tags || []).filter(nonempty))].slice(0, 4);
    const contactAvailable = r.phone || r.email || validUrl(r.website);
    return `<article class="resource-card" data-resource-id="${r.id}">
      <div class="resource-topline">
        <span class="type-badge type-${r.type}">${TYPE_INFO[r.type]?.icon || '•'} ${escapeHTML(TYPE_INFO[r.type]?.short || r.typeLabel)}</span>
        <button class="icon-button ${track.favorite ? 'saved' : ''}" type="button" data-favorite="${r.id}" aria-label="${track.favorite ? 'Remove from' : 'Add to'} favorites" title="Save to tracker">${track.favorite ? '♥' : '♡'}</button>
      </div>
      <h3>${escapeHTML(r.name)}</h3>
      <div class="resource-location">⌖ <span>${escapeHTML(locationLabel(r))}</span></div>
      <p class="resource-summary">${escapeHTML(r.summary || r.category || 'Open for full program details.')}</p>
      ${tags.length ? `<div class="tag-row">${tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>` : ''}
      ${r.firstStep ? `<div class="first-step"><strong>Best first step:</strong> ${escapeHTML(r.firstStep)}</div>` : ''}
      <div class="resource-actions">
        <button class="button button-primary" type="button" data-details="${r.id}">View details</button>
        ${contactAvailable ? `<button class="button button-light" type="button" data-contact="${r.id}">Contact</button>` : ''}
      </div>
      <label class="compare-check"><input type="checkbox" data-compare="${r.id}" ${compareIds.has(r.id) ? 'checked' : ''}> Compare this resource</label>
    </article>`;
  }

  function handleResourceClick(e) {
    const favorite = e.target.closest('[data-favorite]');
    if (favorite) { toggleFavorite(favorite.dataset.favorite); return; }
    const details = e.target.closest('[data-details]');
    if (details) { openResourceDialog(details.dataset.details); return; }
    const contact = e.target.closest('[data-contact]');
    if (contact) { openResourceDialog(contact.dataset.contact, true); }
  }

  function toggleFavorite(id) {
    const current = tracker[id] || {};
    current.favorite = !current.favorite;
    if (current.favorite && !current.status) current.status = 'Saved';
    if (!current.favorite && !current.notes && !current.followup && (!current.status || current.status === 'Saved')) delete tracker[id];
    else tracker[id] = current;
    saveJSON(STORAGE.tracker, tracker);
    renderResults(); renderTracker(); showToast(current.favorite ? 'Saved to tracker' : 'Removed from favorites');
  }

  function handleCompareChange(e) {
    const input = e.target.closest('[data-compare]'); if (!input) return;
    const id = input.dataset.compare;
    if (input.checked) {
      if (compareIds.size >= 4) { input.checked = false; showToast('You can compare up to 4 resources'); return; }
      compareIds.add(id);
    } else compareIds.delete(id);
    updateCompareUI();
  }

  function updateCompareUI() {
    $('#compareCount').textContent = compareIds.size;
    $('#compareTray').hidden = compareIds.size === 0;
    $('#openCompare').disabled = compareIds.size < 2;
  }

  function dialogBackdropClose(e) { if (e.target === e.currentTarget) e.currentTarget.close(); }

  function openResourceDialog(id, focusContact = false) {
    const r = resourceById(id); if (!r) return;
    const t = tracker[id] || {};
    const details = (r.details || []).filter(d => nonempty(d.value));
    const tags = [...new Set((r.tags || []).filter(nonempty))];
    $('#resourceDialogContent').innerHTML = `
      <span class="dialog-kicker">${escapeHTML(r.typeLabel || TYPE_INFO[r.type]?.label)}</span>
      <h2 class="dialog-title">${escapeHTML(r.name)}</h2>
      <div class="dialog-meta"><span>⌖ ${escapeHTML(locationLabel(r))}</span>${r.address ? `<span>${escapeHTML(r.address)}</span>` : ''}${r.priority ? `<span>Priority: ${escapeHTML(r.priority)}</span>` : ''}</div>
      ${tags.length ? `<div class="tag-row">${tags.map(tg => `<span class="tag">${escapeHTML(tg)}</span>`).join('')}</div>` : ''}
      ${r.summary ? `<div class="dialog-summary">${escapeHTML(r.summary)}</div>` : ''}
      ${r.firstStep ? `<p><strong>Best first step:</strong> ${escapeHTML(r.firstStep)}</p>` : ''}
      <div class="dialog-contact" id="dialogContact">
        ${r.phone ? `<a class="button button-primary" href="${phoneHref(r.phone)}">Call ${escapeHTML(r.phone)}</a>` : ''}
        ${r.email ? `<a class="button button-light" href="mailto:${encodeURIComponent(r.email)}">Email</a>` : ''}
        ${validUrl(r.website) ? `<a class="button button-light" href="${escapeHTML(r.website)}" target="_blank" rel="noopener noreferrer">Open official source ↗</a>` : ''}
      </div>
      ${details.length ? `<div class="dialog-detail-list">${details.map(d => `<div class="dialog-detail"><strong>${escapeHTML(d.label)}</strong><span>${linkifyValue(d.value)}</span></div>`).join('')}</div>` : ''}
      <div class="tracking-box">
        <h3>Save and track this resource</h3>
        <div class="tracking-grid">
          <div><label for="dialogStatus">Status</label><select id="dialogStatus">${statusOptions(t.status || 'Saved')}</select></div>
          <div><label for="dialogFollowup">Next follow-up</label><input id="dialogFollowup" type="date" value="${escapeHTML(t.followup || '')}"></div>
          <div class="full"><label for="dialogNotes">Notes</label><textarea id="dialogNotes" placeholder="Contact name, availability, documents needed, next action…">${escapeHTML(t.notes || '')}</textarea></div>
          <div class="full"><button class="button button-primary" type="button" id="saveDialogTracking">Save to tracker</button></div>
        </div>
      </div>`;
    $('#saveDialogTracking').addEventListener('click', () => {
      tracker[id] = {
        ...(tracker[id] || {}), favorite: true,
        status: $('#dialogStatus').value,
        followup: $('#dialogFollowup').value,
        notes: $('#dialogNotes').value.trim(), updated: new Date().toISOString()
      };
      saveJSON(STORAGE.tracker, tracker); renderTracker(); renderResults(); showToast('Tracker updated');
    });
    $('#resourceDialog').showModal();
    if (focusContact) setTimeout(() => $('#dialogContact a, #dialogContact button')?.focus(), 50);
  }

  function linkifyValue(value) {
    const text = String(value || '');
    return validUrl(text) ? `<a href="${escapeHTML(text)}" target="_blank" rel="noopener noreferrer">Open source ↗</a>` : escapeHTML(text);
  }

  function statusOptions(selected) {
    const statuses = ['Saved', 'Called', 'Assessment scheduled', 'Applied / referral sent', 'Waitlist', 'Follow-up needed', 'Accepted / placed', 'Not a fit', 'Closed'];
    return statuses.map(s => `<option ${s === selected ? 'selected' : ''}>${escapeHTML(s)}</option>`).join('');
  }

  function openCompareDialog() {
    const items = [...compareIds].map(resourceById).filter(Boolean);
    if (items.length < 2) return;
    const fields = [
      ['Location', r => locationLabel(r)], ['Type', r => r.typeLabel], ['Population', r => r.population],
      ['Category / level', r => r.category], ['Phone', r => r.phone], ['Address', r => r.address],
      ['Summary', r => r.summary], ['Best first step', r => r.firstStep],
      ['Tags', r => (r.tags || []).join(', ')], ['Official source', r => r.website]
    ];
    $('#compareDialogContent').innerHTML = `<span class="dialog-kicker">Side-by-side review</span><h2 class="dialog-title">Compare resources</h2>
      <div class="table-scroll"><table class="compare-table"><thead><tr><th>Field</th>${items.map(r => `<th>${escapeHTML(r.name)}</th>`).join('')}</tr></thead>
      <tbody>${fields.map(([label, getter]) => `<tr><th>${escapeHTML(label)}</th>${items.map(r => {
        const val = getter(r) || '—'; return `<td>${label === 'Official source' && validUrl(val) ? `<a href="${escapeHTML(val)}" target="_blank" rel="noopener noreferrer">Open source ↗</a>` : escapeHTML(val)}</td>`;
      }).join('')}</tr>`).join('')}</tbody></table></div>`;
    $('#compareDialog').showModal();
  }

  function exportResults() {
    const headers = ['Program', 'Resource Type', 'City', 'County / Area', 'Population', 'Category / Level', 'Phone', 'Email', 'Address', 'Best First Step', 'Website'];
    const rows = filteredResources.map(r => [r.name, r.typeLabel, r.city, r.county || r.region, r.population, r.category, r.phone, r.email, r.address, r.firstStep, r.website]);
    downloadText('mn-resource-search-results.csv', [headers, ...rows].map(row => row.map(csvEscape).join(',')).join('\n'), 'text/csv;charset=utf-8');
    showToast(`Exported ${rows.length} resources`);
  }

  function renderTracker() {
    const entries = Object.entries(tracker).map(([id, data]) => ({ resource: resourceById(id), id, data })).filter(x => x.resource);
    $('#trackerCount').textContent = entries.length;
    const statusCounts = {};
    entries.forEach(({ data }) => { const s = data.status || 'Saved'; statusCounts[s] = (statusCounts[s] || 0) + 1; });
    const stats = [
      ['Total saved', entries.length], ['Called', statusCounts['Called'] || 0],
      ['Applied / referred', statusCounts['Applied / referral sent'] || 0], ['Waitlist', statusCounts['Waitlist'] || 0],
      ['Accepted / placed', statusCounts['Accepted / placed'] || 0]
    ];
    $('#trackerSummary').innerHTML = stats.map(([label, count]) => `<div class="tracker-stat"><strong>${count}</strong><span>${escapeHTML(label)}</span></div>`).join('');
    $('#emptyTracker').hidden = entries.length > 0;
    $('#trackerBody').innerHTML = entries.map(({ resource: r, id, data }) => `<tr data-track-row="${id}">
      <td class="tracker-resource"><strong>${escapeHTML(r.name)}</strong><small>${escapeHTML(locationLabel(r))}</small></td>
      <td>${escapeHTML(TYPE_INFO[r.type]?.short || r.typeLabel)}</td>
      <td><select data-track-field="status">${statusOptions(data.status || 'Saved')}</select></td>
      <td><input type="date" data-track-field="followup" value="${escapeHTML(data.followup || '')}"></td>
      <td><textarea data-track-field="notes" placeholder="Notes and next step…">${escapeHTML(data.notes || '')}</textarea></td>
      <td><button class="icon-button" type="button" data-remove-track="${id}" aria-label="Remove ${escapeHTML(r.name)} from tracker">×</button></td>
    </tr>`).join('');
  }

  function handleTrackerEdit(e) {
    const field = e.target.dataset.trackField; if (!field) return;
    const row = e.target.closest('[data-track-row]'); const id = row?.dataset.trackRow; if (!id) return;
    tracker[id] = { ...(tracker[id] || {}), favorite: true, [field]: e.target.value, updated: new Date().toISOString() };
    saveJSON(STORAGE.tracker, tracker);
    if (field === 'status') renderTracker();
  }

  function exportTracker() {
    const entries = Object.entries(tracker).map(([id, data]) => ({ r: resourceById(id), data })).filter(x => x.r);
    const headers = ['Program', 'Type', 'Location', 'Phone', 'Status', 'Next Follow-up', 'Notes', 'Website'];
    const rows = entries.map(({ r, data }) => [r.name, r.typeLabel, locationLabel(r), r.phone, data.status || 'Saved', data.followup || '', data.notes || '', r.website]);
    downloadText('mn-housing-resource-tracker.csv', [headers, ...rows].map(row => row.map(csvEscape).join(',')).join('\n'), 'text/csv;charset=utf-8');
    showToast('Tracker exported');
  }

  function renderTools() {
    renderChecklists(); renderGuides(); renderScripts(); renderProfile(); renderDefinitions();
  }

  function renderChecklists() {
    const checklistConfigs = [
      { id: 'documents', title: 'Documents checklist', description: 'Prepare the most common application and eligibility documents.', items: (guides.documentsChecklist || []).map(x => ({ label: x.Column1 || x['Document / Task'], detail: x['Why it helps'] || x['Why It Matters'] })).filter(x => x.label) },
      { id: 'referral', title: 'IOP referral call checklist', description: 'Verify the information that changes most often before making a referral.', items: (guides.referralChecklist || []).map(x => ({ label: x, detail: '' })) },
      { id: 'packet', title: 'Housing application packet', description: 'Build a complete master packet and track what is missing.', items: (guides.applicationPacket || []).map(x => ({ label: x['Document / Task'], detail: [x.Category, x['Why It Matters']].filter(Boolean).join(' — ') })).filter(x => x.label) },
      { id: 'action', title: '30-day housing action plan', description: 'A structured month of housing work, one step at a time.', items: (guides.actionPlan || []).map(x => ({ label: `Day ${x.Day}: ${x.Action}`, detail: x.Purpose })).filter(x => x.label) }
    ];
    $('#tool-checklists').innerHTML = `<div class="tool-grid">${checklistConfigs.map(config => checklistHTML(config)).join('')}</div>`;
    $('#tool-checklists').addEventListener('change', e => {
      const input = e.target.closest('[data-checklist-key]'); if (!input) return;
      checklistState[input.dataset.checklistKey] = input.checked;
      saveJSON(STORAGE.checklists, checklistState);
      updateChecklistProgress(input.closest('.tool-card'));
    });
    $$('.tool-card', $('#tool-checklists')).forEach(updateChecklistProgress);
  }

  function checklistHTML(config) {
    return `<section class="tool-card" data-checklist="${config.id}">
      <div class="tool-card-header"><h3>${escapeHTML(config.title)}</h3><p>${escapeHTML(config.description)}</p><div class="progress-bar"><span></span></div><small class="progress-label">0% complete</small></div>
      <div class="tool-card-body"><ul class="checklist">${config.items.map((item, i) => {
        const key = `${config.id}-${i}`; return `<li><input id="${key}" type="checkbox" data-checklist-key="${key}" ${checklistState[key] ? 'checked' : ''}><label for="${key}">${escapeHTML(item.label)}${item.detail ? `<small>${escapeHTML(item.detail)}</small>` : ''}</label></li>`;
      }).join('')}</ul></div></section>`;
  }

  function updateChecklistProgress(card) {
    const boxes = $$('input[type="checkbox"]', card); const checked = boxes.filter(x => x.checked).length;
    const pct = boxes.length ? Math.round((checked / boxes.length) * 100) : 0;
    $('.progress-bar > span', card).style.width = `${pct}%`;
    $('.progress-label', card).textContent = `${pct}% complete • ${checked} of ${boxes.length}`;
  }

  function renderGuides() {
    const sections = [
      ['Housing program guide', guides.programGuide || [], 'Program / Tool'],
      ['Tenant screening rights & strategy', guides.screeningRights || [], 'Topic'],
      ['Treatment verification guide', guides.verificationGuide || [], 'Field'],
      ['Program types', guides.programTypes || [], 'Program/Option'],
      ['Specialty placement filters', guides.specialtyFilters || [], 'Category'],
      ['Search plan', guides.searchPlan || [], 'Action']
    ];
    $('#tool-guides').innerHTML = `<div class="accordion-list">${sections.map(([title, rows, titleKey]) => `<details><summary>${escapeHTML(title)} <span>${rows.length} items</span></summary><div class="accordion-content"><div class="accordion-list">${rows.map(row => rowAccordion(row, row[titleKey] || Object.values(row)[0])).join('')}</div></div></details>`).join('')}</div>`;
  }

  function rowAccordion(row, title) {
    const entries = Object.entries(row).filter(([k, v]) => nonempty(v) && v !== title);
    return `<details><summary>${escapeHTML(title || 'Details')}</summary><div class="accordion-content"><div class="detail-grid">${entries.map(([k, v]) => `<div class="detail-item"><strong>${escapeHTML(k)}</strong>${linkifyValue(v)}</div>`).join('')}</div></div></details>`;
  }

  function renderScripts() {
    const scripts = guides.callScripts || [];
    const questionRows = guides.callQuestions || [];
    $('#tool-scripts').innerHTML = `<div class="tool-grid">
      <section class="tool-card"><div class="tool-card-header"><h3>Ready-to-use call scripts</h3><p>Copy, personalize, and use before paying application fees or making referrals.</p></div><div class="tool-card-body"><div class="accordion-list">${scripts.map((row, i) => {
        const situation = row.Situation || Object.values(row)[0]; const script = row.Script || Object.values(row)[1] || '';
        return `<article class="script-card"><h4>${escapeHTML(situation)}</h4><blockquote>${escapeHTML(script)}</blockquote><button class="copy-button" type="button" data-copy-script="${i}">Copy script</button></article>`;
      }).join('')}</div></div></section>
      <section class="tool-card"><div class="tool-card-header"><h3>Call question bank</h3><p>Record exact answers, who answered, and the date.</p></div><div class="tool-card-body"><div class="accordion-list">${questionRows.map(row => rowAccordion(row, row['Question to Ask'])).join('')}</div></div></section>
    </div>`;
    $('#tool-scripts').addEventListener('click', async e => {
      const btn = e.target.closest('[data-copy-script]'); if (!btn) return;
      const script = scripts[Number(btn.dataset.copyScript)]?.Script || '';
      try { await navigator.clipboard.writeText(script); showToast('Script copied'); }
      catch { showToast('Select and copy the script manually'); }
    });
  }

  function renderProfile() {
    const fields = guides.profileFields || [];
    let lastSection = '';
    $('#tool-profile').innerHTML = `<div class="tool-card"><div class="tool-card-header"><h3>Client housing profile</h3><p>Complete this before searching. Information stays in this browser and is not uploaded.</p></div><div class="tool-card-body"><form class="profile-form" id="profileForm">${fields.map((f, i) => {
      const heading = f.section !== lastSection ? `<h4 class="profile-section">${escapeHTML(f.section)}</h4>` : '';
      lastSection = f.section;
      const key = `field-${i}`; const value = profileState[key] || '';
      const long = /notes|areas|source|barrier|needs|supports|must-haves|deal breakers|status/i.test(f.label);
      return `${heading}<div class="form-field"><label for="${key}">${escapeHTML(f.label)}</label>${long ? `<textarea id="${key}" data-profile-key="${key}">${escapeHTML(value)}</textarea>` : `<input id="${key}" data-profile-key="${key}" value="${escapeHTML(value)}">`}</div>`;
    }).join('')}<div class="form-actions"><button class="button button-primary" type="button" id="saveProfile">Save profile</button><button class="button button-light" type="button" id="printProfile">Print profile</button><button class="button button-danger-ghost" type="button" id="clearProfile">Clear profile</button></div></form></div></div>`;
    $('#profileForm').addEventListener('input', e => {
      if (!e.target.dataset.profileKey) return; profileState[e.target.dataset.profileKey] = e.target.value; saveJSON(STORAGE.profile, profileState);
    });
    $('#saveProfile').addEventListener('click', () => { saveJSON(STORAGE.profile, profileState); showToast('Profile saved on this device'); });
    $('#printProfile').addEventListener('click', printProfile);
    $('#clearProfile').addEventListener('click', () => {
      if (!confirm('Clear the saved housing profile from this browser?')) return;
      profileState = {}; saveJSON(STORAGE.profile, profileState); renderProfile(); showToast('Profile cleared');
    });
  }

  function printProfile() {
    const fields = guides.profileFields || [];
    const rows = fields.map((f, i) => `<tr><th>${escapeHTML(f.label)}</th><td>${escapeHTML(profileState[`field-${i}`] || '')}</td></tr>`).join('');
    const win = window.open('', '_blank');
    win.document.write(`<!doctype html><html><head><title>Client Housing Profile</title><style>body{font-family:Arial,sans-serif;margin:32px;color:#17323a}h1{margin-bottom:4px}p{color:#60757a}table{width:100%;border-collapse:collapse;margin-top:24px}th,td{border:1px solid #cfdcde;padding:9px;text-align:left;vertical-align:top}th{width:34%;background:#f1f6f6}</style></head><body><h1>Client Housing Profile</h1><p>Generated from the Minnesota Housing & Recovery Resource Navigator.</p><table>${rows}</table><script>window.print()<\/script></body></html>`);
    win.document.close();
  }

  function renderDefinitions() {
    const defs = guides.definitions || [];
    const supports = guides.searchSupport || [];
    $('#tool-definitions').innerHTML = `<div class="tool-grid">
      <section class="tool-card"><div class="tool-card-header"><h3>Definitions & acronyms</h3><p>Plain-language housing, treatment, and public-benefit terminology.</p></div><div class="tool-card-body"><div class="accordion-list">${defs.map(row => rowAccordion(row, row.Term)).join('')}</div></div></section>
      <section class="tool-card"><div class="tool-card-header"><h3>Search & support resources</h3><p>Navigation programs that can help with barriers, applications, and reentry.</p></div><div class="tool-card-body"><div class="accordion-list">${supports.map(row => rowAccordion(row, row.Resource)).join('')}</div></div></section>
    </div>`;
  }

  init();
})();
