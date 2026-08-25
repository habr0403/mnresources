(() => {
  const resources = window.RECOVERY_RESOURCES || [];
  const terms = window.MEETING_TERMS || [];
  const sourceNotes = window.SOURCE_NOTES || [];
  const state = {
    search: '', concern: '', pathway: '', access: '', audience: '', region: '', savedOnly: false,
    saved: new Set(JSON.parse(localStorage.getItem('mnRecoverySaved') || '[]'))
  };

  const el = id => document.getElementById(id);
  const resourceGrid = el('resourceGrid');
  const resultCount = el('resultCount');
  const savedCount = el('savedCount');
  const activeFilters = el('activeFilters');

  const uniqueSorted = key => [...new Set(resources.flatMap(r => r[key] || []))].sort((a,b) => a.localeCompare(b));
  const populate = (id, values) => {
    const select = el(id);
    values.forEach(value => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      select.appendChild(opt);
    });
  };

  populate('concernFilter', uniqueSorted('concerns'));
  populate('pathwayFilter', uniqueSorted('pathway'));
  populate('accessFilter', uniqueSorted('access'));
  populate('audienceFilter', uniqueSorted('audience'));
  populate('regionFilter', uniqueSorted('region'));

  const stats = [
    [resources.length, 'recovery resources'],
    [uniqueSorted('concerns').length, 'addiction / concern categories'],
    [uniqueSorted('pathway').length, 'recovery approaches'],
    [resources.filter(r => r.access.some(a => a.toLowerCase().includes('minnesota in-person'))).length, 'resources with confirmed MN in-person access']
  ];
  el('statsGrid').innerHTML = stats.map(([n,label]) => `<div class="stat-card"><strong>${n}</strong><span>${label}</span></div>`).join('');

  const normalize = value => (value || '').toLowerCase();
  const searchableText = r => normalize([
    r.name, r.abbreviation, r.summary, r.fit, r.spirituality, r.localStatus,
    ...r.concerns, ...r.pathway, ...r.access, ...r.audience, ...r.region
  ].join(' '));

  function filteredResources() {
    return resources.filter(r => {
      if (state.savedOnly && !state.saved.has(r.id)) return false;
      if (state.search && !searchableText(r).includes(normalize(state.search))) return false;
      if (state.concern && !r.concerns.includes(state.concern)) return false;
      if (state.pathway && !r.pathway.includes(state.pathway)) return false;
      if (state.access && !r.access.includes(state.access)) return false;
      if (state.audience && !r.audience.includes(state.audience)) return false;
      if (state.region && !r.region.includes(state.region)) return false;
      return true;
    });
  }

  function card(r) {
    const concernTags = r.concerns.slice(0, 3).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
    const pathTag = `<span class="tag pathway">${escapeHtml(r.pathway[0])}</span>`;
    const more = r.concerns.length > 3 ? `<span class="tag">+${r.concerns.length - 3} more</span>` : '';
    const saved = state.saved.has(r.id);
    return `
      <article class="resource-card" data-id="${r.id}">
        <div class="card-top">
          <span class="abbr">${escapeHtml(r.abbreviation)}</span>
          <div class="card-title">
            <h3>${escapeHtml(r.name)}</h3>
            <span class="local-status">${escapeHtml(r.localStatus)}</span>
          </div>
          <button class="save-btn ${saved ? 'saved' : ''}" data-save="${r.id}" type="button" aria-label="${saved ? 'Remove from saved' : 'Save'} ${escapeHtml(r.name)}">${saved ? '♥' : '♡'}</button>
        </div>
        <p>${escapeHtml(r.summary)}</p>
        <div class="tag-row">${pathTag}${concernTags}${more}</div>
        <div class="card-footer">
          <a class="btn btn-primary" href="${r.url}" target="_blank" rel="noopener noreferrer">Official meeting finder ↗</a>
          <button class="details-btn" data-detail="${r.id}" type="button">Details</button>
        </div>
      </article>`;
  }

  function render() {
    const items = filteredResources();
    resourceGrid.innerHTML = items.map(card).join('');
    resultCount.textContent = `${items.length} ${items.length === 1 ? 'option' : 'options'}`;
    savedCount.textContent = state.saved.size;
    el('emptyState').hidden = items.length !== 0;
    el('savedOnlyBtn').classList.toggle('active', state.savedOnly);
    renderActiveFilters();
  }

  function renderActiveFilters() {
    const pairs = [
      ['Search', state.search], ['Concern', state.concern], ['Pathway', state.pathway],
      ['Access', state.access], ['Audience', state.audience], ['Region', state.region],
      ['Saved only', state.savedOnly ? 'Yes' : '']
    ].filter(([,value]) => value);
    activeFilters.innerHTML = pairs.map(([label,value]) => `<span class="filter-chip">${escapeHtml(label)}: ${escapeHtml(value)}</span>`).join('');
  }

  function clearAll() {
    state.search = state.concern = state.pathway = state.access = state.audience = state.region = '';
    state.savedOnly = false;
    el('searchInput').value = '';
    ['concernFilter','pathwayFilter','accessFilter','audienceFilter','regionFilter'].forEach(id => el(id).value = '');
    render();
  }

  function saveToggle(id) {
    state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
    localStorage.setItem('mnRecoverySaved', JSON.stringify([...state.saved]));
    render();
  }

  function showDetail(id) {
    const r = resources.find(x => x.id === id);
    if (!r) return;
    el('dialogContent').innerHTML = `
      <div class="dialog-body">
        <div class="dialog-head">
          <span class="abbr">${escapeHtml(r.abbreviation)}</span>
          <h2>${escapeHtml(r.name)}</h2>
          <p>${escapeHtml(r.summary)}</p>
        </div>
        <div class="detail-grid">
          <div class="detail-box"><strong>Best fit when</strong><span>${escapeHtml(r.fit)}</span></div>
          <div class="detail-box"><strong>Spiritual / philosophical tone</strong><span>${escapeHtml(r.spirituality)}</span></div>
          <div class="detail-box"><strong>Access</strong><span>${escapeHtml(r.access.join(' • '))}</span></div>
          <div class="detail-box"><strong>Regions</strong><span>${escapeHtml(r.region.join(' • '))}</span></div>
          <div class="detail-box"><strong>Who it is for</strong><span>${escapeHtml(r.audience.join(' • '))}</span></div>
          <div class="detail-box"><strong>Source</strong><span>${escapeHtml(r.sourceLabel)}</span></div>
        </div>
        <strong>Concerns this resource may fit</strong>
        <div class="tag-row" style="margin-top:8px">${r.concerns.map(c => `<span class="tag">${escapeHtml(c)}</span>`).join('')}</div>
        <div class="dialog-actions">
          <a class="btn btn-primary" href="${r.url}" target="_blank" rel="noopener noreferrer">Open official finder ↗</a>
          <button class="btn btn-secondary" type="button" data-dialog-save="${r.id}">${state.saved.has(r.id) ? '♥ Saved' : '♡ Save this resource'}</button>
        </div>
      </div>`;
    el('detailDialog').showModal();
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));
  }

  el('searchInput').addEventListener('input', e => { state.search = e.target.value.trim(); render(); });
  [['concernFilter','concern'],['pathwayFilter','pathway'],['accessFilter','access'],['audienceFilter','audience'],['regionFilter','region']].forEach(([id,key]) => {
    el(id).addEventListener('change', e => { state[key] = e.target.value; render(); });
  });
  el('clearFilters').addEventListener('click', clearAll);
  el('emptyClear').addEventListener('click', clearAll);
  el('savedOnlyBtn').addEventListener('click', () => { state.savedOnly = !state.savedOnly; render(); });
  el('printBtn').addEventListener('click', () => window.print());
  el('surpriseBtn').addEventListener('click', () => {
    clearAll();
    state.pathway = 'All pathways / Peer recovery';
    el('pathwayFilter').value = state.pathway;
    render();
    el('directory').scrollIntoView({behavior:'smooth'});
  });

  el('quickGrid').addEventListener('click', e => {
    const concernBtn = e.target.closest('[data-quick]');
    const audienceBtn = e.target.closest('[data-audience-quick]');
    if (!concernBtn && !audienceBtn) return;
    clearAll();
    if (concernBtn) {
      state.concern = concernBtn.dataset.quick;
      el('concernFilter').value = state.concern;
    }
    if (audienceBtn) {
      state.audience = audienceBtn.dataset.audienceQuick;
      el('audienceFilter').value = state.audience;
    }
    render();
    el('directory').scrollIntoView({behavior:'smooth'});
  });

  resourceGrid.addEventListener('click', e => {
    const save = e.target.closest('[data-save]');
    if (save) return saveToggle(save.dataset.save);
    const detail = e.target.closest('[data-detail]');
    if (detail) showDetail(detail.dataset.detail);
  });

  el('dialogClose').addEventListener('click', () => el('detailDialog').close());
  el('detailDialog').addEventListener('click', e => {
    if (e.target === el('detailDialog')) el('detailDialog').close();
    const s = e.target.closest('[data-dialog-save]');
    if (s) { saveToggle(s.dataset.dialogSave); el('detailDialog').close(); showDetail(s.dataset.dialogSave); }
  });

  el('termsList').innerHTML = terms.map(([term, desc], i) => `
    <div class="term-item ${i === 0 ? 'open' : ''}">
      <button class="term-button" type="button"><span>${escapeHtml(term)}</span><span>${i === 0 ? '−' : '+'}</span></button>
      <div class="term-desc">${escapeHtml(desc)}</div>
    </div>`).join('');
  el('termsList').addEventListener('click', e => {
    const btn = e.target.closest('.term-button');
    if (!btn) return;
    const item = btn.parentElement;
    item.classList.toggle('open');
    btn.lastElementChild.textContent = item.classList.contains('open') ? '−' : '+';
  });

  el('sourceNotes').innerHTML = sourceNotes.map((note, i) => `<div class="source-note"><strong>${String(i+1).padStart(2,'0')}</strong><br>${escapeHtml(note)}</div>`).join('');

  el('exportBtn').addEventListener('click', () => {
    const items = filteredResources();
    const rows = [['Name','Abbreviation','Concerns','Pathway','Access','Region','Official Finder']];
    items.forEach(r => rows.push([r.name,r.abbreviation,r.concerns.join('; '),r.pathway.join('; '),r.access.join('; '),r.region.join('; '),r.url]));
    const csv = rows.map(row => row.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'minnesota-recovery-meetings-visible.csv'; a.click();
    URL.revokeObjectURL(url);
  });

  const portalParams = new URLSearchParams(window.location.search);
  const portalQuery = (portalParams.get('q') || '').trim();
  const portalConcern = (portalParams.get('concern') || '').trim();
  if (portalQuery) { state.search = portalQuery; el('searchInput').value = portalQuery; }
  if (portalConcern && [...el('concernFilter').options].some(o => o.value === portalConcern)) { state.concern = portalConcern; el('concernFilter').value = portalConcern; }
  render();
})();
