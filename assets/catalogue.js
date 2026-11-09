/* Public, static product catalogue. No admin panel, login, database or backend required. */
(function(){
  const products = () => Array.isArray(window.GIFTX_PRODUCTS) ? window.GIFTX_PRODUCTS : [];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function card(p){return `<article class="card product-item" data-category="${esc(p.category)}"><div class="card-img"><img loading="lazy" src="${esc(p.image)}" alt="${esc(p.name)}"></div><div class="card-body"><span class="product-tag">${esc(p.tag || 'Corporate Gifts')}</span><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><a class="link-orange" href="product-detail.html?id=${encodeURIComponent(p.id)}">View Product →</a></div></article>`;}
  function render(){
    const grid=document.getElementById('productGrid'); if(!grid)return;
    const search=document.getElementById('productSearch'); const count=document.getElementById('productCount'); const empty=document.getElementById('noProducts');
    let category='all';
    function update(){const q=(search?.value||'').trim().toLowerCase();const shown=products().filter(p=>(category==='all'||p.category===category)&&(!q||[p.name,p.description,p.tag,p.category].join(' ').toLowerCase().includes(q)));grid.innerHTML=shown.map(card).join('');if(count)count.textContent=`Showing ${shown.length} of ${products().length} products`;if(empty)empty.hidden=shown.length!==0;}
    document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');category=btn.dataset.filter;update();}));
    search?.addEventListener('input',update); update();
  }
  function renderDetail(){
    const root=document.getElementById('productDetail'); if(!root)return;
    const id=new URLSearchParams(location.search).get('id'); const p=products().find(x=>x.id===id) || products()[0];
    if(!p){root.innerHTML='<p>Product not found. <a href="products.html">Browse all products</a>.</p>';return;}
    const msg=encodeURIComponent(`Hello GiftXIndia, I would like a quotation for ${p.name}. Please share pricing and bulk order details.`);
    root.innerHTML=`<div class="detail-image"><img src="${esc(p.image)}" alt="${esc(p.name)}"></div><div><div class="eyebrow">${esc(p.tag||'Corporate Gift')}</div><h1 style="font-size:clamp(32px,5vw,48px);line-height:1.1;margin:12px 0">${esc(p.name)}</h1><p style="color:var(--muted)">${esc(p.description)}</p><p>${esc(p.details||'Custom branding and bulk order options are available.')}</p><div class="specs"><div class="spec"><b>MOQ</b><br>As per product selection</div><div class="spec"><b>Branding</b><br>Logo customization available</div><div class="spec"><b>Packaging</b><br>Custom gift packaging options</div><div class="spec"><b>Delivery</b><br>Pan India support</div></div><h3>Ideal For</h3><p>Employee rewards, client appreciation, onboarding kits, conferences, festive celebrations and corporate events.</p><div class="hero-actions"><a class="btn btn-orange" href="quote.html?product=${encodeURIComponent(p.name)}">Request a Quote</a><a class="btn btn-outline" target="_blank" rel="noopener" href="https://wa.me/919892440999?text=${msg}">WhatsApp Enquiry</a><a class="btn btn-outline" href="products.html">All Products</a></div></div>`;
    document.title=`${p.name} | GiftXIndia™`;
  }
  window.GiftXCatalogue={render,renderDetail};
  document.addEventListener('DOMContentLoaded',render);
})();
