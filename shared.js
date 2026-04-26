// Brain Co-Manager shared.js v1777216167
// ── SHARED NAV ──
function renderNav(activePage) {
  const pages = [
    { id: 'about',    label: 'אודותינו',  href: 'about.html' },
    { id: 'process',  label: 'התהליך',    href: 'process.html' },
    { id: 'uses',     label: 'שימושים',   href: 'uses.html' },
    { id: 'roi',      label: 'ROI',        href: 'roi.html' },
    { id: 'smb',      label: 'SMB',        href: 'smb.html' },
    { id: 'investors', label: 'משקיעים', href: 'investors.html', submenu: [
      { label: 'מנוע בתוך מנוע', href: 'investors-engine.html' },
      { label: 'הוכחת שווי Brain', href: 'investors-value.html' },
      { label: 'Go to Market', href: 'investors-gtm.html' },
      { label: 'מתחרים', href: 'investors-competition.html' },
      { label: 'קרנות VC', href: 'investors-vc.html' },
      { label: 'שאלות תשובות', href: 'investors-faq.html' },
    ]},
    { id: 'pricing',  label: 'מחירים',    href: 'pricing.html' },
    { id: 'demo',     label: 'Demo',       href: 'demo.html', cta: true },
    { id: 'articles', label: 'מאמרים',    href: 'articles.html' },
    { id: 'jobs',     label: 'דרושים',    href: 'jobs.html' },
  ];
  const desktopLinks = pages.map(p => {
    if (p.submenu) {
      const sub = p.submenu.map(s => `<a href="${s.href}" class="nav-sub-link">${s.label}</a>`).join('');
      return `<div class="nav-dropdown${p.id===activePage?' active':''}"><a href="${p.href}" class="nav-link">${p.label} ▾</a><div class="nav-dropdown-menu">${sub}</div></div><span class="sep">|</span>`;
    }
    if (p.cta) return `<a href="${p.href}" class="nav-demo${p.id===activePage?' active':''}">${p.label}</a><span class="sep">|</span>`;
    return `<a href="${p.href}" class="nav-link${p.id===activePage?' active':''}">${p.label}</a><span class="sep">|</span>`;
  }).join('');
  const mobileLinks = pages.map(p => {
    if (p.submenu) {
      const sub = p.submenu.map(s => `<a href="${s.href}" class="nav-sub-mobile">${s.label}</a>`).join('');
      return `<a href="${p.href}" class="${p.id===activePage?' active':''}">${p.label}</a>${sub}`;
    }
    return `<a href="${p.href}" class="${p.cta?'nav-demo':''}${p.id===activePage?' active':''}">${p.label}</a>`;
  }).join('');

  document.getElementById('nav-placeholder').innerHTML = `
    <nav>
      <div class="nav-left">
        <a href="https://wa.me/972" class="nav-icon" title="WhatsApp">💬</a>
        <a href="#" class="nav-icon" title="YouTube">▶</a>
        <button class="nav-mobile-btn" id="nav-hamburger" aria-label="תפריט">☰</button>
      </div>
      <div class="nav-links">${desktopLinks}</div>
      <a href="index.html" class="nav-logo"><img src="Brain2SPARK_LTD__1_.png" alt="Brain2Spark" style="height:38px;width:auto;display:block;"></a>
    </nav>
    <div class="nav-mobile-menu" id="nav-mobile-menu">${mobileLinks}</div>`;

  document.getElementById('nav-hamburger').onclick = function() {
    const m = document.getElementById('nav-mobile-menu');
    m.classList.toggle('open');
    this.textContent = m.classList.contains('open') ? '✕' : '☰';
  };
}

// ── PARTICLES ──
function initParticles() {
  const c = document.getElementById('bg');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, pts = [];
  function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  function Pt() {
    this.x = Math.random()*W; this.y = Math.random()*H;
    this.vx = (Math.random()-.5)*.22; this.vy = (Math.random()-.5)*.22;
    this.r = Math.random()*1.2+.2; this.a = Math.random()*.32+.06;
    this.col = Math.random()>.6?'#2d9cff':Math.random()>.5?'#00d4aa':'#1a6fc4';
  }
  for (let i=0;i<90;i++) pts.push(new Pt());
  function draw() {
    ctx.clearRect(0,0,W,H);
    pts.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.col; ctx.globalAlpha=p.a; ctx.fill(); ctx.globalAlpha=1;
    });
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++) {
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if(d<115){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle=`rgba(45,156,255,${.055*(1-d/115)})`; ctx.lineWidth=.5; ctx.stroke();}
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ── SCROLL REVEAL ──
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:.1});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── NAV SCROLL ──
function initNavScroll() {
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if(nav) nav.style.background = window.scrollY>40 ? 'rgba(2,13,26,0.98)' : 'rgba(2,13,26,0.92)';
  });
}

// ── FLOATING BOT WIDGET ──
function initBot() {
  const TOTAL = 13;
  let state = {}, flowIndex = [], stepMap = {};
  function fn() { return state.name ? state.name.split(' ')[0] : ''; }

  // Bot CSS
  const style = document.createElement('style');
  style.textContent = `
    .bot-fab{position:fixed;left:24px;bottom:24px;z-index:9999;cursor:pointer;
      width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#0C447C,#2d9cff);
      box-shadow:0 4px 24px rgba(45,156,255,0.5);display:flex;align-items:center;justify-content:center;
      border:none;transition:all .25s;animation:botPulse 3s ease-in-out infinite;}
    .bot-fab:hover{transform:scale(1.08);box-shadow:0 6px 32px rgba(45,156,255,0.7);}
    @keyframes botPulse{0%,100%{box-shadow:0 4px 24px rgba(45,156,255,0.5);}50%{box-shadow:0 4px 36px rgba(45,156,255,0.8);}}
    .bot-fab-av{width:36px;height:36px;}
    .bot-notif{position:absolute;top:-4px;right:-4px;width:18px;height:18px;border-radius:50%;
      background:#E24B4A;display:flex;align-items:center;justify-content:center;
      font-size:10px;font-weight:700;color:#fff;font-family:Heebo,sans-serif;}
    .bot-window{position:fixed;left:0;top:0;bottom:0;z-index:9999;width:min(96vw,440px);height:100vh;
      background:#020d1a;border-right:1px solid rgba(45,156,255,0.25);
      display:flex;flex-direction:column;overflow:hidden;
      box-shadow:6px 0 40px rgba(0,0,0,0.7);
      transform:translateX(-100%);opacity:0;pointer-events:none;
      transition:transform .35s cubic-bezier(.4,0,.2,1),opacity .25s ease;}
    .bot-window.open{transform:translateX(0);opacity:1;pointer-events:all;}
    .bot-head{background:#041428;padding:16px 20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(45,156,255,0.15);}
    .bot-head-av{width:38px;height:38px;flex-shrink:0;}
    .bot-head-name{font-size:15px;font-weight:700;color:#eaf4ff;font-family:Heebo,sans-serif;}
    .bot-head-sub{font-size:11px;color:#7ec8ff;font-family:Heebo,sans-serif;}
    .bot-head-dot{width:8px;height:8px;border-radius:50%;background:#1D9E75;box-shadow:0 0 8px #1D9E75;margin-right:auto;}
    .bot-close{background:none;border:none;color:rgba(126,200,255,0.6);cursor:pointer;font-size:20px;padding:0 4px;}
    .bot-prog{background:#0a2540;padding:8px 18px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(45,156,255,0.1);}
    .bot-prog-lbl{font-size:11px;color:#7ec8ff;white-space:nowrap;font-family:Heebo,sans-serif;}
    .bot-prog-track{flex:1;height:3px;background:rgba(45,156,255,0.15);border-radius:2px;overflow:hidden;}
    .bot-prog-fill{height:100%;background:linear-gradient(90deg,#1a6fc4,#00d4aa);transition:width .5s;}
    .bot-msgs{flex:1;overflow-y:auto;padding:20px 18px;display:flex;flex-direction:column;gap:12px;background:#020d1a;}
    .bot-msgs::-webkit-scrollbar{width:4px;}
    .bot-msgs::-webkit-scrollbar-thumb{background:rgba(45,156,255,0.3);border-radius:2px;}
    .bot-row{display:flex;gap:8px;align-items:flex-end;direction:rtl;}
    .bot-row.user{flex-direction:row-reverse;}
    .bot-av-sm{width:26px;height:26px;flex-shrink:0;}
    .bot-bubble{max-width:85%;padding:12px 16px;font-size:16px;line-height:1.75;border-radius:16px;font-family:Heebo,sans-serif;direction:rtl;}
    .bot-bubble.bot{background:#0a2540;color:#eaf4ff;border:1px solid rgba(45,156,255,0.2);border-radius:16px 16px 16px 4px;}
    .bot-bubble.user{background:#0C447C;color:#E6F1FB;border-radius:16px 16px 4px 16px;}
    .bot-typing{background:#0a2540;border:1px solid rgba(45,156,255,0.18);border-radius:16px 16px 16px 4px;
      padding:12px 16px;display:flex;gap:5px;align-items:center;width:60px;}
    .bot-dot{width:6px;height:6px;border-radius:50%;background:#7ec8ff;animation:bdot 1.2s infinite;}
    .bot-dot:nth-child(2){animation-delay:.2s;}.bot-dot:nth-child(3){animation-delay:.4s;}
    @keyframes bdot{0%,80%,100%{opacity:.3;transform:translateY(0);}40%{opacity:1;transform:translateY(-5px);}}
    .bot-opts{display:flex;flex-direction:column;gap:7px;padding:0 18px 10px;direction:rtl;}
    .bot-opt{padding:10px 18px;font-size:14px;background:#020d1a;border:1.5px solid #1a6fc4;
      color:#7ec8ff;border-radius:22px;cursor:pointer;text-align:right;font-family:Heebo,sans-serif;
      transition:all .18s;}
    .bot-opt:hover{background:#0C447C;color:#eaf4ff;}
    .bot-opt:disabled{opacity:.35;cursor:default;}
    .bot-input-row{display:flex;gap:8px;padding:14px 18px;background:#041428;border-top:1px solid rgba(45,156,255,0.12);}
    .bot-input{flex:1;padding:11px 16px;font-size:15px;font-family:Heebo,sans-serif;
      background:#020d1a;border:1px solid rgba(45,156,255,0.25);border-radius:20px;
      color:#eaf4ff;outline:none;direction:rtl;}
    .bot-input:focus{border-color:#2d9cff;}
    .bot-send{padding:11px 18px;background:#0C447C;color:#eaf4ff;border:none;border-radius:20px;
      font-size:14px;font-weight:700;font-family:Heebo,sans-serif;cursor:pointer;transition:background .18s;}
    .bot-send:hover{background:#185FA5;}
    .bot-sum{background:#041428;border:1px solid rgba(45,156,255,0.2);border-radius:14px;
      padding:14px 16px;margin:0 18px 10px;font-size:13px;direction:rtl;}
    .bot-sum-row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(45,156,255,0.08);}
    .bot-sum-row:last-child{border-bottom:none;}
    .bot-sum-k{color:#7ec8ff;}.bot-sum-v{font-weight:600;color:#eaf4ff;font-family:Heebo,sans-serif;}
    .bot-restart{display:block;margin:6px auto 10px;padding:8px 20px;font-size:12px;font-family:Heebo,sans-serif;
      background:transparent;border:1px solid rgba(45,156,255,0.25);color:#7ec8ff;border-radius:18px;cursor:pointer;}
    .bot-restart:hover{background:#041428;}
    .bot-cal{background:#041428;border:1px solid rgba(45,156,255,0.2);border-radius:12px;padding:12px;margin:0 14px 8px;}
    .bot-cal p{font-size:11.5px;color:#7ec8ff;margin-bottom:8px;font-family:Heebo,sans-serif;direction:rtl;}
    .bot-cal-btn{display:block;width:100%;padding:9px;font-size:12px;font-weight:700;font-family:Heebo,sans-serif;
      background:#0C447C;color:#eaf4ff;border:none;border-radius:8px;cursor:pointer;}
    .bot-cal-btn:hover{background:#185FA5;}
  `;
  document.head.appendChild(style);

  // Avatar SVG (small)
  const AV = `<svg class="bot-av-sm" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bm" cx="45%" cy="35%" r="55%"><stop offset="0%" stop-color="#3a6fa0"/><stop offset="100%" stop-color="#0a1e35"/></radialGradient>
      <filter id="bg"><feGaussianBlur stdDeviation="2"/></filter>
    </defs>
    <rect x="18" y="22" width="44" height="36" rx="10" fill="url(#bm)" stroke="#1a6fc4" stroke-width="1"/>
    <rect x="18" y="22" width="2" height="36" rx="1" fill="rgba(45,156,255,0.6)"/>
    <rect x="60" y="22" width="2" height="36" rx="1" fill="rgba(45,156,255,0.4)"/>
    <rect x="24" y="29" width="13" height="9" rx="3" fill="#020d1a" stroke="#1a6fc4" stroke-width="0.8"/>
    <ellipse cx="30" cy="33.5" rx="4.5" ry="3.5" fill="#00d4aa" filter="url(#bg)" opacity="0.9"/>
    <ellipse cx="30" cy="33.5" rx="2.5" ry="2" fill="#7fffee"/>
    <circle cx="30" cy="33.5" r="1" fill="white"/>
    <rect x="43" y="29" width="13" height="9" rx="3" fill="#020d1a" stroke="#1a6fc4" stroke-width="0.8"/>
    <ellipse cx="49" cy="33.5" rx="4.5" ry="3.5" fill="#00d4aa" filter="url(#bg)" opacity="0.9"/>
    <ellipse cx="49" cy="33.5" rx="2.5" ry="2" fill="#7fffee"/>
    <circle cx="49" cy="33.5" r="1" fill="white"/>
    <rect x="24" y="44" width="32" height="7" rx="3" fill="#020d1a" stroke="#0e3a6e" stroke-width="0.8"/>
    <rect x="28" y="17" width="24" height="6" rx="2.5" fill="#0a1e35" stroke="#0e3a6e" stroke-width="0.8"/>
    <rect x="38" y="13" width="4" height="5" rx="2" fill="#1a6fc4"/>
    <circle cx="40" cy="11" r="3" fill="#2d9cff" opacity="0.9"/>
    <rect x="7" y="30" width="11" height="16" rx="5" fill="#0a1e35" stroke="#0e3a6e" stroke-width="0.8"/>
    <rect x="62" y="30" width="11" height="16" rx="5" fill="#0a1e35" stroke="#0e3a6e" stroke-width="0.8"/>
  </svg>`;

  // FAB button
  const fab = document.createElement('button');
  fab.className = 'bot-fab';
  fab.innerHTML = `<svg class="bot-fab-av" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="fm" cx="45%" cy="35%" r="55%"><stop offset="0%" stop-color="#3a6fa0"/><stop offset="100%" stop-color="#0a1e35"/></radialGradient></defs>
    <rect x="15" y="18" width="50" height="40" rx="12" fill="url(#fm)" stroke="#2d9cff" stroke-width="1.5"/>
    <rect x="20" y="25" width="15" height="10" rx="3.5" fill="#020d1a" stroke="#1a6fc4" stroke-width="1"/>
    <ellipse cx="27" cy="30" rx="5.5" ry="4" fill="#00d4aa" opacity="0.9"/>
    <ellipse cx="27" cy="30" rx="3" ry="2.5" fill="#7fffee"/>
    <circle cx="27" cy="30" r="1.2" fill="white"/>
    <rect x="45" y="25" width="15" height="10" rx="3.5" fill="#020d1a" stroke="#1a6fc4" stroke-width="1"/>
    <ellipse cx="52" cy="30" rx="5.5" ry="4" fill="#00d4aa" opacity="0.9"/>
    <ellipse cx="52" cy="30" rx="3" ry="2.5" fill="#7fffee"/>
    <circle cx="52" cy="30" r="1.2" fill="white"/>
    <rect x="20" y="42" width="40" height="8" rx="4" fill="#020d1a" stroke="#0e3a6e" stroke-width="1"/>
    <rect x="33" y="13" width="14" height="6" rx="2.5" fill="#0a1e35" stroke="#0e3a6e" stroke-width="1"/>
    <rect x="39" y="9" width="3" height="5" rx="1.5" fill="#2d9cff"/>
    <circle cx="40" cy="7" r="3.5" fill="#2d9cff" opacity="0.9"/>
    <rect x="5" y="28" width="10" height="18" rx="5" fill="#0a1e35" stroke="#0e3a6e" stroke-width="1"/>
    <rect x="65" y="28" width="10" height="18" rx="5" fill="#0a1e35" stroke="#0e3a6e" stroke-width="1"/>
  </svg><div class="bot-notif">1</div>`;
  document.body.appendChild(fab);

  // Window
  const win = document.createElement('div');
  win.className = 'bot-window';
  win.innerHTML = `
    <div class="bot-head">
      ${AV}
      <div><div class="bot-head-name">Brain – Manager-Co</div><div class="bot-head-sub">בוט מכירות ארגוני</div></div>
      <div class="bot-head-dot"></div>
      <button class="bot-close" id="bot-close">✕</button>
    </div>
    <div class="bot-prog"><span class="bot-prog-lbl" id="bp-lbl">שלב 1 / ${TOTAL}</span><div class="bot-prog-track"><div class="bot-prog-fill" id="bp-fill" style="width:8%"></div></div></div>
    <div class="bot-msgs" id="bot-msgs"></div>`;
  document.body.appendChild(win);

  const MSG = document.getElementById('bot-msgs');
  const FILL = document.getElementById('bp-fill');
  const PLBL = document.getElementById('bp-lbl');

  fab.onclick = () => {
    win.classList.toggle('open');
    fab.querySelector('.bot-notif').style.display='none';
    if(win.classList.contains('open') && MSG.children.length===0) runStep(0);
  };
  document.getElementById('bot-close').onclick = () => win.classList.remove('open');

  function updProg(step) {
    FILL.style.width = Math.round((step/TOTAL)*100)+'%';
    PLBL.textContent = 'שלב '+step+' / '+TOTAL;
  }

  function addBot(text, delay) {
    delay=delay||0;
    return new Promise(res=>{
      const tr=document.createElement('div'); tr.className='bot-row';
      tr.innerHTML=`${AV}<div class="bot-typing"><div class="bot-dot"></div><div class="bot-dot"></div><div class="bot-dot"></div></div>`;
      MSG.appendChild(tr); MSG.scrollTop=MSG.scrollHeight;
      setTimeout(()=>{
        tr.remove();
        const r=document.createElement('div'); r.className='bot-row';
        r.innerHTML=`${AV}<div class="bot-bubble bot">${text.replace(/\n/g,'<br>')}</div>`;
        MSG.appendChild(r); MSG.scrollTop=MSG.scrollHeight; res();
      }, delay+800);
    });
  }

  function addUser(text) {
    const r=document.createElement('div'); r.className='bot-row user';
    r.innerHTML=`<div class="bot-bubble user">${text}</div>`;
    MSG.appendChild(r); MSG.scrollTop=MSG.scrollHeight;
  }

  function addOpts(opts, onSel) {
    const w=document.createElement('div'); w.className='bot-opts';
    opts.forEach(o=>{
      const b=document.createElement('button'); b.className='bot-opt'; b.textContent=o;
      b.onclick=()=>{w.querySelectorAll('.bot-opt').forEach(x=>x.disabled=true);onSel(o);};
      w.appendChild(b);
    });
    MSG.appendChild(w); MSG.scrollTop=MSG.scrollHeight;
  }

  function addInput(ph, onSub) {
    const r=document.createElement('div'); r.className='bot-input-row';
    const inp=document.createElement('input'); inp.className='bot-input'; inp.placeholder=ph; inp.type='text';
    const btn=document.createElement('button'); btn.className='bot-send'; btn.textContent='שלח';
    function sub(){const v=inp.value.trim();if(!v)return;inp.disabled=true;btn.disabled=true;r.style.opacity='.5';onSub(v);}
    btn.onclick=sub; inp.onkeydown=e=>{if(e.key==='Enter')sub();};
    r.appendChild(inp); r.appendChild(btn); MSG.appendChild(r); MSG.scrollTop=MSG.scrollHeight;
    setTimeout(()=>inp.focus(),100);
  }

  function addCal(onDone) {
    const c=document.createElement('div'); c.className='bot-cal';
    c.innerHTML='<p>בחרו מועד ישירות ביומן שלנו:</p>';
    const b=document.createElement('button'); b.className='bot-cal-btn'; b.textContent='📅 תאמו דמו ב-Calendly';
    b.onclick=()=>{window.open('https://calendly.com/brain-demo','_blank');c.innerHTML='<p style="color:#1D9E75;font-weight:700">✓ Calendly נפתח – נשמח לפגוש אתכם!</p>';setTimeout(()=>onDone('תואם דמו ב-Calendly'),1000);};
    c.appendChild(b); MSG.appendChild(c); MSG.scrollTop=MSG.scrollHeight;
  }

  function addSum(s) {
    const c=document.createElement('div'); c.className='bot-sum';
    const rows=[['אתגר',s.challenge||'—'],['חברה',s.company||'—'],['תפקיד',s.role||'—'],['שם',s.name||'—'],['מייל',s.email||'—'],['טלפון',s.phone||'—'],['בקשה',s.cta||'—']];
    c.innerHTML='<div style="font-size:10px;color:#00d4aa;letter-spacing:.1em;font-weight:700;margin-bottom:8px">סיכום השיחה</div>'+rows.map(r=>`<div class="bot-sum-row"><span class="bot-sum-k">${r[0]}</span><span class="bot-sum-v">${r[1]}</span></div>`).join('');
    MSG.appendChild(c); MSG.scrollTop=MSG.scrollHeight;
  }

  const FLOW = [
    {step:1, bot:'שלום!\nאני הבוט של Brain – Manager-Co.\n\nנתחיל בהיכרות קצרה – מה שמך?', isInput:true, ph:'שם מלא', run:(v,n)=>{state.name=v;n(1);}},
    {step:2, bot:()=>`נעים להכיר, ${fn()}!\n\nמאיזו חברה?`, isInput:true, ph:'שם החברה', run:(v,n)=>{state.company=v;n(2);}},
    {step:3, bot:()=>`מעולה, ${fn()}!\nמה האתגר המרכזי ב${state.company} כרגע?`,
      opts:['הגדלת מכירות','שיפור ביצועי עובדים','שימור עובדים','הטמעת AI בעסק','אחר'],
      run:(c,n)=>{if(c==='אחר')n('other_ch');else{state.challenge=c;n(3);}}},
    {step:3, id:'other_ch', bot:'במה נדרשת עזרה?', isInput:true, ph:'תיאור האתגר', run:(v,n)=>{state.challenge=v;n(4);}},
    {step:4, bot:()=>{const m={'הגדלת מכירות':'אנשי מכירות יודעים מה לעשות – אבל לא תמיד מבצעים.','שיפור ביצועי עובדים':'יש ידע בארגון, אבל הוא לא הופך להרגל.','שימור עובדים':'קשה לשמור על מוטיבציה לאורך זמן.','הטמעת AI בעסק':'AI שמתחבר לניהול יומיומי – לא רק כלי.'};return (m[state.challenge]||'זה אתגר שאנחנו מכירים.')+'\n\nזה גם קורה אצלכם?';},
      opts:['כן, בהחלט','חלקית','לא ממש'], run:(c,n)=>{state.feels=c;n(4);}},
    {step:5, bot:()=>`מובן.\n\nכמה אנשים עובדים ב${state.company}?`,
      opts:['1–10','11–25','26–50','51–200','200–1,000','מעל 1,000'], run:(c,n)=>{state.size=c;n(5);}},
    {step:6, bot:()=>(state.size==='1–10'||state.size==='11–25'?'Brain עובד מצוין לעסקים קטנים!\n• לא דורש צוות IT\n• מתחיל תוך ימים\n':'Brain הוא שכבת AI שמנהלת ביצוע יומיומי.\n1. מנתחת התנהגות\n2. שולחת מסרים חכמים\n3. עושה פולו-אפ\n')+`\nמה התפקיד שלך, ${fn()}?`,
      opts:['בעלי/ת עסק – מנכ״ל/ית','סמנכ״ל/ית מכירות','סמנכ״ל/ית משאבי אנוש','מנהל/ת','תפקיד אחר'], run:(c,n)=>{state.role=c;n(6);}},
    {step:7, bot:()=>{const r=state.role||'';const t=r.includes('מכירות')?'Brain מזהה פערים בשיחות מכירה ומשפר תוך שבועיים.':r.includes('משאבי')?'Brain מזהה ירידה באנרגיה ומציע פעולות ניהוליות.':r.includes('מנכ')||r.includes('בעל')?'Brain נותן שליטה על ביצועי הצוות יום-יום.':'Brain מותאם לכל מי שרוצה לשפר ביצועים.';return t+`\n\nהאם קיימות מערכות כמו CRM ב${state.company}?`;},
      opts:['כן, יש CRM','כן, יש הדרכות','שניהם','לא'], run:(c,n)=>{state.existing=c;n(7);}},
    {step:8, bot:()=>{const e=state.existing;if(e==='כן, יש CRM'||e==='שניהם')return 'Brain לא מחליף מערכות – הוא מחבר אותן.\n\nמה הכי חשוב לשפר?';if(e==='כן, יש הדרכות')return 'Brain לא מחליף הדרכות – הוא הופך אותן לביצוע.\n\nמה הכי חשוב לשפר?';return 'Brain יכול להיות הבסיס לתשתית הניהולית.\n\nמה הכי חשוב לשפר?';},
      opts:['הגדלת מכירות','שיפור ביצועי עובדים','שימור עובדים','הטמעת AI','אחר'],
      run:(c,n)=>{if(c==='אחר')n('other_b');else{state.benefit=c;n(null);}}},
    {step:8, id:'other_b', bot:'מה חשוב לשפר?', isInput:true, ph:'תיאור', run:(v,n)=>{state.benefit=v;n(null);}},
    {step:9, bot:()=>`מצוין!\n\nאיך תרצו לקבל מידע על Brain?`,
      opts:['סרטון דמו קצר','הסבר כתוב'], run:(c,n)=>{state.cta=c;n(null);}},
    {step:10, bot:()=>`מעולה, ${fn()}!\n\nנשמח לשלוח לך את המידע.\n\nמספר טלפון:`, isInput:true, ph:'מספר טלפון', run:(v,n)=>{state.phone=v;n(10);}},
    {step:11, bot:'כתובת מייל:', isInput:true, ph:'כתובת מייל', run:(v,n)=>{
      state.email=v;
      fetch('/', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          'form-name': 'brain-demo',
          'name': state.name || '',
          'company': state.company || '',
          'phone': state.phone || '',
          'email': state.email || '',
          'cta': state.cta || '',
          'challenge': state.challenge || '',
          'role': state.role || ''
        }).toString()
      }).catch(err=>console.log('Form send error:',err));
      if(state.cta==='סרטון דמו קצר'){
        addBot(`תודה ${state.name}! 🎥 הסרטון נפתח עכשיו...`,200);
        setTimeout(()=>{
          // פתיחת modal מסך מלא
          const ov=document.createElement('div');
          ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(2,13,26,0.96);display:flex;align-items:center;justify-content:center;';
          ov.innerHTML=`<div style="position:relative;width:min(560px,96vw);background:#020d1a;border:1px solid rgba(45,156,255,0.25);border-radius:20px;overflow:hidden;box-shadow:0 0 60px rgba(45,156,255,0.2);">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(45,156,255,0.12);">
              <span style="font-size:15px;font-weight:700;color:#eaf4ff;font-family:Heebo,sans-serif;">Brain Co-Manager בפעולה</span>
              <button onclick="this.closest('div[style*=fixed]').remove();document.body.style.overflow='';" style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#aaa;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
            </div>
            <div style="position:relative;padding-top:56.25%;background:#010810;">
              <iframe style="position:absolute;inset:0;width:100%;height:100%;border:none;" src="https://www.youtube.com/embed/O3yF5ee2iEI?autoplay=1&rel=0" allow="autoplay;encrypted-media" allowfullscreen></iframe>
            </div>
            <div style="padding:12px 20px;text-align:center;font-size:13px;color:#7ec8ff;font-family:Heebo,sans-serif;">נציג Brain יצור איתך קשר בהקדם</div>
          </div>`;
          ov.onclick=e=>{if(e.target===ov){ov.remove();document.body.style.overflow='';}};
          document.body.appendChild(ov);
          document.body.style.overflow='hidden';
        },400);
      } else {
        const PDF='https://brain2spark.mysitemail.co.il/wp-content/uploads/2026/03/Deno_%D7%90%D7%AA%D7%A8-%D7%A2%D7%91%D7%A8%D7%99%D7%AA.pdf';
        addBot(`תודה רבה, ${state.name}! 🎉<br><br>📄 <a href="${PDF}" target="_blank" style="color:#2d9cff;font-weight:700">לחצו כאן לצפייה במסמך</a><br><br>נציג Brain יצור איתך קשר בהקדם 🙂`,200);
      }
      setTimeout(()=>{const rb=document.createElement('button');rb.className='bot-restart';rb.textContent='↺ התחל מחדש';rb.onclick=()=>{state={};MSG.innerHTML='';runStep(0);};MSG.appendChild(rb);},2000);
    }}  ];

  FLOW.forEach((s,i)=>{ if(s.id)stepMap[s.id]=i; else flowIndex.push(i); });

  function nextSeq(idx) {
    const pos = flowIndex.indexOf(idx);
    return pos >= 0 && pos + 1 < flowIndex.length ? pos + 1 : null;
  }

  function runStep(idxOrKey) {
    let idx = typeof idxOrKey==='string' ? stepMap[idxOrKey] : typeof idxOrKey==='number' ? (idxOrKey<flowIndex.length?flowIndex[idxOrKey]:null) : null;
    if(idx===null||idx===undefined) return;
    const s=FLOW[idx]; updProg(s.step);
    const text=typeof s.bot==='function'?s.bot():s.bot;
    addBot(text,120).then(()=>{
      if(s.isSummary){const rb=document.createElement('button');rb.className='bot-restart';rb.textContent='↺ התחל מחדש';rb.onclick=()=>{state={};MSG.innerHTML='';runStep(0);};MSG.appendChild(rb);return;}
      const isCal=s.isCalendly&&s.isCalendly(), isCon=s.isConfirm&&s.isConfirm();
      const ns=nextSeq(idx);
      if(isCal){addCal(v=>{addUser(v);state.contact=v;setTimeout(()=>runStep(ns),500);});return;}
      if(isCon){setTimeout(()=>runStep(ns),700);return;}
      if(s.isInput){addInput(s.ph,v=>{addUser(v);s.run(v,k=>{setTimeout(()=>runStep((k !== undefined && k !== null) ? k : ns),350);});});return;}
      if(s.opts){addOpts(s.opts,c=>{addUser(c);s.run(c,k=>{setTimeout(()=>runStep((k !== undefined && k !== null) ? k : ns),350);});});}
    });
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initReveal();
  initNavScroll();
  initBot();
});
