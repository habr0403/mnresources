
(() => {
  const data = window.PORTAL_SEARCH_DATA || [];
  const form = document.getElementById('globalSearchForm');
  const input = document.getElementById('globalSearch');
  const area = document.getElementById('searchArea');
  const results = document.getElementById('globalResults');
  const count = document.getElementById('globalCount');
  const clear = document.getElementById('clearGlobal');
  const escapeHTML = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const route = item => `${item.section}.html?q=${encodeURIComponent(item.q || item.name)}`;
  function search(q){
    const needle=q.trim().toLowerCase();
    if(!needle){area.hidden=true;results.innerHTML='';count.textContent='';return;}
    const terms=needle.split(/\s+/).filter(Boolean);
    const scored=data.map(item=>{
      const hay=[item.name,item.summary,item.meta,item.kind].join(' ').toLowerCase();
      const score=terms.reduce((n,t)=>n+(hay.includes(t)?1:0),0)+(item.name.toLowerCase().includes(needle)?2:0);
      return {item,score};
    }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.item.name.localeCompare(b.item.name));
    const visible=scored.slice(0,30);
    area.hidden=false;
    count.textContent=`${scored.length} match${scored.length===1?'':'es'} found across housing/treatment, benefits, and recovery meetings${scored.length>30?' — showing the first 30':''}.`;
    results.innerHTML=visible.length?visible.map(({item})=>`<article class="search-result"><div><span class="result-type">${escapeHTML(item.kind)}</span><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.summary)}</p>${item.meta?`<div class="result-meta">${escapeHTML(item.meta)}</div>`:''}</div><a href="${route(item)}">Open →</a></article>`).join(''):'<article class="search-result"><div><h3>No close match</h3><p>Try a broader term such as housing, treatment, food, disability, alcohol, opioids, women, or IOP.</p></div></article>';
    area.scrollIntoView({behavior:'smooth',block:'start'});
  }
  form.addEventListener('submit',e=>{e.preventDefault();search(input.value)});
  document.querySelectorAll('[data-q]').forEach(btn=>btn.addEventListener('click',()=>{input.value=btn.dataset.q;search(input.value)}));
  clear.addEventListener('click',()=>{input.value='';area.hidden=true;results.innerHTML='';input.focus()});
})();
