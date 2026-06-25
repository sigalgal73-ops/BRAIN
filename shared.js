// Brain Co-Manager shared.js v1
// ── SHARED NAV ──
function renderNav(activePage, lang) {
  if (!lang) {
    const path = window.location.pathname;
    lang = (path.includes('/en/') || path.includes('index_en')) ? 'en' : 'he';
  }
  const isEn = lang === 'en';
  const pages = isEn ? [
    { id: 'about',    label: 'About',      href: 'about.html', submenu: [
      { label: 'Our Network', href: 'team.html' },
    ]},
    { id: 'what-is-brain', label: 'What is Brain?', href: 'what-is-brain.html', submenu: [
      { label: 'Research', href: 'research.html' },
    ]},
    { id: 'diy',      label: 'Implementation',        href: 'automated.html' },
    { id: 'uses',     label: 'Use Cases',  href: 'uses.html' },
    { id: 'roi',      label: 'ROI',        href: 'roi.html' },
    { id: 'investors',label: 'Investors',  href: 'investors.html', submenu: [
      { label: 'Engine Within Engine', href: 'investors-engine.html' },
      { label: 'Brain Value Proof',    href: 'investors-value.html' },
      { label: 'Go to Market',         href: 'investors-gtm.html' },
      { label: 'Competition',          href: 'investors-competition.html' },
      { label: 'VC Funds',             href: 'investors-vc.html' },
      { label: 'FAQ',                  href: 'investors-faq.html' },
    ]},
    { id: 'demo',     label: 'Demo',       href: 'demo.html', cta: true },
    { id: 'pricing',  label: 'Pricing',    href: 'pricing.html' },
    { id: 'articles', label: 'Knowledge',  href: 'articles.html' },
    { id: 'jobs',     label: 'Careers',    href: 'jobs.html' },
    { id: 'talk-to-brain', label: '🧠 Talk to Brain', href: 'talk-to-brain.html', pulse: true },
    { id: 'join',     label: 'Join',       href: 'join.html', cta: true },
  ] : [
    { id: 'about',    label: 'אודותינו',        href: 'about.html', submenu: [
      { label: 'החברים שלנו', href: 'team.html' },
    ]},
    { id: 'what-is-brain', label: 'מה זה Brain?', href: 'what-is-brain.html', submenu: [
      { label: 'מחקר', href: 'research.html' },
    ]},
    { id: 'diy',      label: 'הטמעה',  href: 'automated.html' },
    { id: 'uses',     label: 'שימושים',         href: 'uses.html' },
    { id: 'roi',      label: 'ROI',             href: 'roi.html' },
    { id: 'investors',label: 'משקיעים',         href: 'investors.html', submenu: [
      { label: 'מנוע בתוך מנוע',    href: 'investors-engine.html' },
      { label: 'הוכחת שווי Brain',  href: 'investors-value.html' },
      { label: 'Go to Market',       href: 'investors-gtm.html' },
      { label: 'מתחרים',            href: 'investors-competition.html' },
      { label: 'קרנות VC',          href: 'investors-vc.html' },
      { label: 'שאלות תשובות',      href: 'investors-faq.html' },
    ]},
    { id: 'demo',     label: 'Demo',            href: 'demo.html', cta: true },
    { id: 'pricing',  label: 'מחירים',          href: 'pricing.html' },
    { id: 'articles', label: 'ידע',              href: 'articles.html' },
    { id: 'jobs',     label: 'דרושים',           href: 'jobs.html' },
    { id: 'talk-to-brain', label: '🧠 דבר עם Brain', href: 'talk-to-brain.html', pulse: true },
    { id: 'join',     label: 'הצטרפו',           href: 'join.html', cta: true },
  ];
  const desktopLinks = pages.map(p => {
    if (p.submenu) {
      const sub = p.submenu.map(s => `<a href="${s.href}" class="nav-sub-link">${s.label}</a>`).join('');
      return `<div class="nav-dropdown${p.id===activePage?' active':''}"><a href="${p.href}" class="nav-link">${p.label} ▾</a><div class="nav-dropdown-menu">${sub}</div></div><span class="sep">|</span>`;
    }
    if (p.pulse) return `<a href="${isEn ? '' : ''}${p.href}" class="nav-talk${p.id===activePage?' active':''}">${p.label}</a>`;
    if (p.cta) return `<a href="${p.href}" class="nav-demo${p.id===activePage?' active':''}">${p.label}</a><span class="sep">|</span>`;
    return `<a href="${p.href}" class="nav-link${p.id===activePage?' active':''}">${p.label}</a><span class="sep">|</span>`;
  }).join('');
  const mobileLinks = pages.map(p => {
    if (p.submenu) {
      return `<a href="${p.href}" class="${p.id===activePage?' active':''}">${p.label}</a>`;
    }
    if (p.pulse) return `<a href="${p.href}" class="nav-talk${p.id===activePage?' active':''}">${p.label}</a>`;
    return `<a href="${p.href}" class="${p.cta?'nav-demo':''}${p.id===activePage?' active':''}">${p.label}</a>`;
  }).join('');

  document.getElementById('nav-placeholder').innerHTML = `
    <nav${isEn ? ' dir="ltr"' : ''}>
      <div class="nav-top">
        <a href="${isEn ? 'index.html' : 'index_he.html'}" class="nav-logo"><img src="Brain2SPARK_LTD__1_.png" alt="Brain2Spark" style="height:38px;width:auto;display:block;"></a>
        <div class="nav-left">
          <button class="nav-lang" id="nav-lang-he" title="עברית" onclick="setLang('he')"><img src="https://flagcdn.com/w20/il.png" width="24" height="17" alt="IL" style="border-radius:2px;display:block;"></button>
          <button class="nav-lang" id="nav-lang-en" title="English" onclick="setLang('en')"><img src="https://flagcdn.com/w20/us.png" width="24" height="17" alt="US" style="border-radius:2px;display:block;"></button>
          <a href="https://www.youtube.com/@Brain.co.manager" class="nav-icon" title="YouTube" target="_blank">▶</a>
          <button class="nav-mobile-btn" id="nav-hamburger" aria-label="תפריט">☰</button>
        </div>
      </div>
      <div class="nav-bottom">
        <div class="nav-links"${isEn ? ' style="direction:ltr"' : ''}>${desktopLinks}</div>
      </div>
    </nav>
    <div class="nav-mobile-menu" id="nav-mobile-menu">${mobileLinks}</div>`;

  if (!document.getElementById('nav-compact-style')) {
    const s = document.createElement('style');
    s.id = 'nav-compact-style';
    s.textContent = '.nav-link{font-size:12px!important;letter-spacing:0!important;padding:0 1px!important;} .sep{margin:0 2px!important;font-size:10px!important;opacity:.25;} .nav-links{gap:0!important;flex-wrap:nowrap!important;}';
    document.head.appendChild(s);
  }

  document.getElementById('nav-hamburger').onclick = function() {
    const m = document.getElementById('nav-mobile-menu');
    m.classList.toggle('open');
    this.textContent = m.classList.contains('open') ? '✕' : '☰';
  };
}


// ── AUTO-INJECT SOCIAL ICONS INTO EXISTING FOOTER ──
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    if (footer && !footer.querySelector('.footer-social-row')) {
      footer.insertAdjacentHTML('afterbegin', `<div class="footer-social-row" style="display:flex;justify-content:center;gap:18px;margin-bottom:16px;">
    <a href="https://www.linkedin.com/in/%D7%A2%D7%A8%D7%9F-%D7%A9%D7%97%D7%A8-b83b9140b/" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="LinkedIn" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg></a>
    <a href="https://www.instagram.com/brain2spark.ai" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="Instagram" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg></a>
    <a href="https://www.facebook.com/share/1CXjkEi8X2/" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="Facebook" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg></a>
    <a href="https://www.tiktok.com/@brain2spark.ai" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="TikTok" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg></a>
    <a href="https://www.youtube.com/@Brain.co.manager" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="YouTube" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg></a>
  </div>`);
    }
    // Inject legal links before footer-copy if not already present
    const footer2 = document.querySelector('footer');
    if (footer2 && !footer2.querySelector('.footer-legal-links')) {
      const copy = footer2.querySelector('.footer-copy');
      const legal = document.createElement('div');
      legal.className = 'footer-legal-links';
      legal.style.cssText = 'width:100%;text-align:center;margin:10px 0 6px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.08);';
      const isEnLegal = window.location.pathname.includes('/en/');
      if (isEnLegal) {
        legal.innerHTML = '<a href="privacy.html" style="color:rgba(255,255,255,0.5);font-size:12px;text-decoration:none;margin:0 14px;">Privacy Policy</a><a href="terms.html" style="color:rgba(255,255,255,0.5);font-size:12px;text-decoration:none;margin:0 14px;">Terms of Use</a>';
      } else {
        legal.innerHTML = '<a href="/privacy.html" style="color:rgba(255,255,255,0.5);font-size:12px;text-decoration:none;margin:0 14px;">מדיניות פרטיות</a><a href="/terms.html" style="color:rgba(255,255,255,0.5);font-size:12px;text-decoration:none;margin:0 14px;">תקנון שימוש</a>';
      }
      if (copy) copy.parentNode.insertBefore(legal, copy);
      else footer2.appendChild(legal);
    }
  });
})();

// ── SHARED FOOTER ──
function renderFooter() {
  const el = document.getElementById('footer-placeholder');
  if (!el) return;
  const isEnFooter = window.location.pathname.includes('/en/');
  const pfx = isEnFooter ? '../' : '';
  el.outerHTML = isEnFooter ? `<footer>
    <div class="footer-social-row" style="display:flex;justify-content:center;gap:18px;margin-bottom:16px;">
    <a href="https://www.linkedin.com/in/%D7%A2%D7%A8%D7%9F-%D7%A9%D7%97%D7%A8-b83b9140b/" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="LinkedIn" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg></a>
    <a href="https://www.instagram.com/brain2spark.ai" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="Instagram" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg></a>
    <a href="https://www.facebook.com/share/1CXjkEi8X2/" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="Facebook" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg></a>
    <a href="https://www.tiktok.com/@brain2spark.ai" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="TikTok" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg></a>
    <a href="https://www.youtube.com/@Brain.co.manager" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="YouTube" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg></a>
  </div>
    <div class="footer-links">
      <a href="about.html">About</a>
      <a href="automated.html">Implementation</a>
      <a href="uses.html">Use Cases</a>
      <a href="roi.html">ROI</a>
      <a href="smb.html">SMB</a>
      <a href="pricing.html">Pricing</a>
      <a href="../demo.html">Demo</a>
      <a href="articles.html">Knowledge</a>
      <a href="research.html">Research</a>
      <a href="jobs.html">Careers</a>
    </div>
    <div class="footer-links" style="margin-top:8px;opacity:0.6;font-size:12px;">
      <a href="privacy.html">Privacy Policy</a>
      <a href="terms.html">Terms of Use</a>
    </div>
    <div class="footer-copy" style="text-align:center;width:100%;">© All rights reserved · Eran Shachar | Brain Co-Manager · brain2spark.ai<br><span style="font-size:11px;opacity:0.6;">Website design <a href="https://sigalraichmansocial.com" target="_blank" style="color:var(--muted);text-decoration:underline;transition:color .2s;" onmouseover="this.style.color='var(--teal)'" onmouseout="this.style.color='var(--muted)'">sigalraichmansocial.com</a></span></div>
  </footer>` : `<footer>
    <div class="footer-social-row" style="display:flex;justify-content:center;gap:18px;margin-bottom:16px;">
    <a href="https://www.linkedin.com/in/%D7%A2%D7%A8%D7%9F-%D7%A9%D7%97%D7%A8-b83b9140b/" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="LinkedIn" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg></a>
    <a href="https://www.instagram.com/brain2spark.ai" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="Instagram" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg></a>
    <a href="https://www.facebook.com/share/1CXjkEi8X2/" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="Facebook" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg></a>
    <a href="https://www.tiktok.com/@brain2spark.ai" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="TikTok" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg></a>
    <a href="https://www.youtube.com/@Brain.co.manager" style="color:#7ec8ff;transition:color .2s;display:flex;align-items:center;" title="YouTube" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg></a>
  </div>
    <div class="footer-links">
      <a href="about.html">אודותינו</a>
      <a href="automated.html">הטמעה</a>
      <a href="uses.html">שימושים</a>
      <a href="roi.html">ROI</a>
      <a href="smb.html">SMB</a>
      <a href="pricing.html">מחירים</a>
      <a href="demo.html">Demo</a>
      <a href="articles.html">ידע</a>
      <a href="research.html">מחקר</a>
      <a href="jobs.html">דרושים</a>
    </div>
    <div class="footer-links" style="margin-top:8px;opacity:0.6;font-size:12px;">
      <a href="privacy.html">מדיניות פרטיות</a>
      <a href="terms.html">תקנון שימוש</a>
    </div>
    <div class="footer-copy" style="text-align:center;width:100%;">© כל הזכויות שמורות לערן שחר | Brain Co-Manager · brain2spark.ai<br><span style="font-size:11px;opacity:0.6;">עיצוב אתר <a href="https://sigalraichmansocial.com" target="_blank" style="color:var(--muted);text-decoration:underline;transition:color .2s;" onmouseover="this.style.color='var(--teal)'" onmouseout="this.style.color='var(--muted)'">sigalraichmansocial.com</a></span></div>
  </footer>`;
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
  const isEn = window.location.pathname.includes('/en/');
  const UI = isEn ? {
    headSub:"Enterprise Sales Assistant", step:"Step", send:"Send", restart:"↺ Restart",
    calP:"Pick a time directly in our calendar:", calBtn:"📅 Schedule a demo on Calendly",
    calOpen:"✓ Calendly opened – we'd love to meet you!", calDone:"Scheduled a demo on Calendly",
    sumTitle:"CONVERSATION SUMMARY",
    sumK:{challenge:"Challenge",company:"Company",role:"Role",name:"Name",email:"Email",phone:"Phone",cta:"Request"}
  } : {
    headSub:"בוט מכירות ארגוני", step:"שלב", send:"שלח", restart:"↺ התחל מחדש",
    calP:"בחרו מועד ישירות ביומן שלנו:", calBtn:"📅 תאמו דמו ב-Calendly",
    calOpen:"✓ Calendly נפתח – נשמח לפגוש אתכם!", calDone:"תואם דמו ב-Calendly",
    sumTitle:"סיכום השיחה",
    sumK:{challenge:"אתגר",company:"חברה",role:"תפקיד",name:"שם",email:"מייל",phone:"טלפון",cta:"בקשה"}
  };

  // Bot CSS
  const style = document.createElement('style');
  style.textContent = `
    .bot-fab{position:fixed;left:24px;bottom:24px;z-index:9999;cursor:pointer;
      width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#0C447C,#2d9cff);
      box-shadow:0 4px 24px rgba(45,156,255,0.5);display:flex;align-items:center;justify-content:center;
      border:none;transition:all .25s;animation:botPulse 3s ease-in-out infinite;}
    .bot-fab:hover{transform:scale(1.08);box-shadow:0 6px 32px rgba(45,156,255,0.7);}
    @keyframes botPulse{0%,100%{box-shadow:0 4px 24px rgba(45,156,255,0.5);}50%{box-shadow:0 4px 36px rgba(45,156,255,0.8);}}
    .bot-fab-av{width:52px;height:52px;}
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
    .bot-window.bot-en .bot-row,
    .bot-window.bot-en .bot-bubble,
    .bot-window.bot-en .bot-input,
    .bot-window.bot-en .bot-sum,
    .bot-window.bot-en .bot-sum-row,
    .bot-window.bot-en .bot-cal p,
    .bot-window.bot-en .bot-head-sub,
    .bot-window.bot-en .bot-opts{direction:ltr;}
    .bot-window.bot-en .bot-input,
    .bot-window.bot-en .bot-opt,
    .bot-window.bot-en .bot-bubble{text-align:left;}
  `;
  document.head.appendChild(style);

  // Avatar SVG (small)
  const AV = `<svg class="bot-av-sm" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="av_body" cx="38%" cy="28%" r="85%"><stop offset="0%" stop-color="#5d93cb"/><stop offset="55%" stop-color="#2c5a8f"/><stop offset="100%" stop-color="#102f4e"/></radialGradient>
      <linearGradient id="av_visor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0b2138"/><stop offset="100%" stop-color="#03101f"/></linearGradient>
      <radialGradient id="av_eye" cx="45%" cy="38%" r="65%"><stop offset="0%" stop-color="#c4fff3"/><stop offset="45%" stop-color="#00d4aa"/><stop offset="100%" stop-color="#008f76"/></radialGradient>
      <radialGradient id="av_orb" cx="40%" cy="35%" r="70%"><stop offset="0%" stop-color="#d6fff5"/><stop offset="100%" stop-color="#00d4aa"/></radialGradient>
    </defs>
    <line x1="50" y1="20" x2="50" y2="11" stroke="#2d9cff" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="50" cy="8" r="4.5" fill="url(#av_orb)"/>
    <rect x="14" y="40" width="9" height="20" rx="4.5" fill="url(#av_body)" stroke="#2d9cff" stroke-width="0.8"/>
    <rect x="77" y="40" width="9" height="20" rx="4.5" fill="url(#av_body)" stroke="#2d9cff" stroke-width="0.8"/>
    <circle cx="18.5" cy="50" r="2" fill="#00d4aa"/><circle cx="81.5" cy="50" r="2" fill="#00d4aa"/>
    <rect x="22" y="20" width="56" height="55" rx="22" fill="url(#av_body)" stroke="#2d9cff" stroke-width="1"/>
    <ellipse cx="42" cy="31" rx="18" ry="7.5" fill="#ffffff" opacity="0.16"/>
    <rect x="28" y="33" width="44" height="27" rx="13.5" fill="url(#av_visor)" stroke="#0e3a6e" stroke-width="1"/>
    <ellipse cx="38" cy="40" rx="11" ry="4" fill="#2d9cff" opacity="0.22"/>
    <circle cx="40" cy="47" r="7.5" fill="url(#av_eye)"/><circle cx="60" cy="47" r="7.5" fill="url(#av_eye)"/>
    <circle cx="42.4" cy="44.2" r="2.1" fill="#ffffff" opacity="0.95"/><circle cx="62.4" cy="44.2" r="2.1" fill="#ffffff" opacity="0.95"/>
    <path d="M41 67 Q50 73 59 67" fill="none" stroke="#7ec8ff" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`;

  // FAB button
  const fab = document.createElement('button');
  fab.className = 'bot-fab';
  fab.innerHTML = `<svg class="bot-fab-av" viewBox="10 2 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="fab_body" cx="38%" cy="28%" r="85%"><stop offset="0%" stop-color="#5d93cb"/><stop offset="55%" stop-color="#2c5a8f"/><stop offset="100%" stop-color="#102f4e"/></radialGradient>
      <linearGradient id="fab_visor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0b2138"/><stop offset="100%" stop-color="#03101f"/></linearGradient>
      <radialGradient id="fab_eye" cx="45%" cy="38%" r="65%"><stop offset="0%" stop-color="#c4fff3"/><stop offset="45%" stop-color="#00d4aa"/><stop offset="100%" stop-color="#008f76"/></radialGradient>
      <radialGradient id="fab_orb" cx="40%" cy="35%" r="70%"><stop offset="0%" stop-color="#d6fff5"/><stop offset="100%" stop-color="#00d4aa"/></radialGradient>
    </defs>
    <line x1="50" y1="20" x2="50" y2="11" stroke="#2d9cff" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="50" cy="8" r="4.5" fill="url(#fab_orb)"/>
    <rect x="14" y="40" width="9" height="20" rx="4.5" fill="url(#fab_body)" stroke="#2d9cff" stroke-width="0.8"/>
    <rect x="77" y="40" width="9" height="20" rx="4.5" fill="url(#fab_body)" stroke="#2d9cff" stroke-width="0.8"/>
    <circle cx="18.5" cy="50" r="2" fill="#00d4aa"/><circle cx="81.5" cy="50" r="2" fill="#00d4aa"/>
    <rect x="22" y="20" width="56" height="55" rx="22" fill="url(#fab_body)" stroke="#2d9cff" stroke-width="1"/>
    <ellipse cx="42" cy="31" rx="18" ry="7.5" fill="#ffffff" opacity="0.16"/>
    <rect x="28" y="33" width="44" height="27" rx="13.5" fill="url(#fab_visor)" stroke="#0e3a6e" stroke-width="1"/>
    <ellipse cx="38" cy="40" rx="11" ry="4" fill="#2d9cff" opacity="0.22"/>
    <circle cx="40" cy="47" r="7.5" fill="url(#fab_eye)"/><circle cx="60" cy="47" r="7.5" fill="url(#fab_eye)"/>
    <circle cx="42.4" cy="44.2" r="2.1" fill="#ffffff" opacity="0.95"/><circle cx="62.4" cy="44.2" r="2.1" fill="#ffffff" opacity="0.95"/>
    <path d="M41 67 Q50 73 59 67" fill="none" stroke="#7ec8ff" stroke-width="2.4" stroke-linecap="round"/>
  </svg><div class="bot-notif">1</div>`;
  document.body.appendChild(fab);

  // Window
  const win = document.createElement('div');
  win.className = 'bot-window' + (isEn ? ' bot-en' : '');
  win.innerHTML = `
    <div class="bot-head">
      ${AV}
      <div><div class="bot-head-name">Brain – Manager-Co</div><div class="bot-head-sub">${UI.headSub}</div></div>
      <div class="bot-head-dot"></div>
      <button class="bot-close" id="bot-close">✕</button>
    </div>
    <div class="bot-prog"><span class="bot-prog-lbl" id="bp-lbl">${UI.step} 1 / ${TOTAL}</span><div class="bot-prog-track"><div class="bot-prog-fill" id="bp-fill" style="width:8%"></div></div></div>
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
    PLBL.textContent = UI.step+' '+step+' / '+TOTAL;
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
    const btn=document.createElement('button'); btn.className='bot-send'; btn.textContent=UI.send;
    function sub(){const v=inp.value.trim();if(!v)return;inp.disabled=true;btn.disabled=true;r.style.opacity='.5';onSub(v);}
    btn.onclick=sub; inp.onkeydown=e=>{if(e.key==='Enter')sub();};
    r.appendChild(inp); r.appendChild(btn); MSG.appendChild(r); MSG.scrollTop=MSG.scrollHeight;
    setTimeout(()=>inp.focus(),100);
  }

  function addCal(onDone) {
    const c=document.createElement('div'); c.className='bot-cal';
    c.innerHTML='<p>'+UI.calP+'</p>';
    const b=document.createElement('button'); b.className='bot-cal-btn'; b.textContent=UI.calBtn;
    b.onclick=()=>{window.open('https://calendly.com/brain-demo','_blank');c.innerHTML='<p style="color:#1D9E75;font-weight:700">'+UI.calOpen+'</p>';setTimeout(()=>onDone(UI.calDone),1000);};
    c.appendChild(b); MSG.appendChild(c); MSG.scrollTop=MSG.scrollHeight;
  }

  function addSum(s) {
    const c=document.createElement('div'); c.className='bot-sum';
    const k=UI.sumK;
    const rows=[[k.challenge,s.challenge||'—'],[k.company,s.company||'—'],[k.role,s.role||'—'],[k.name,s.name||'—'],[k.email,s.email||'—'],[k.phone,s.phone||'—'],[k.cta,s.cta||'—']];
    c.innerHTML='<div style="font-size:10px;color:#00d4aa;letter-spacing:.1em;font-weight:700;margin-bottom:8px">'+UI.sumTitle+'</div>'+rows.map(r=>`<div class="bot-sum-row"><span class="bot-sum-k">${r[0]}</span><span class="bot-sum-v">${r[1]}</span></div>`).join('');
    MSG.appendChild(c); MSG.scrollTop=MSG.scrollHeight;
  }

  const FLOW_HE = [
    {step:1, bot:'שלום!\nאני הבוט של Brain – Manager-Co.\n\nנתחיל בהיכרות קצרה – מה שמך?', isInput:true, ph:'שם מלא', run:(v,n)=>{state.name=v;n();}},
    {step:2, bot:()=>`נעים להכיר, ${fn()}!\n\nמאיזו חברה?`, isInput:true, ph:'שם החברה', run:(v,n)=>{state.company=v;n();}},
    {step:3, bot:()=>`מעולה, ${fn()}!\nמה האתגר המרכזי ב${state.company} כרגע?`,
      opts:['הגדלת מכירות','שיפור ביצועי עובדים','שימור עובדים','הטמעת AI בעסק','אחר'],
      run:(c,n)=>{if(c==='אחר')n('other_ch');else{state.challenge=c;n();}}},
    {step:3, id:'other_ch', bot:'במה נדרשת עזרה?', isInput:true, ph:'תיאור האתגר', run:(v,n)=>{state.challenge=v;n(10);}},
    {step:4, bot:()=>{const m={'הגדלת מכירות':'אנשי מכירות יודעים מה לעשות – אבל לא תמיד מבצעים.','שיפור ביצועי עובדים':'יש ידע בארגון, אבל הוא לא הופך להרגל.','שימור עובדים':'קשה לשמור על מוטיבציה לאורך זמן.','הטמעת AI בעסק':'AI שמתחבר לניהול יומיומי – לא רק כלי.'};return (m[state.challenge]||'זה אתגר שאנחנו מכירים.')+'\n\nזה גם קורה אצלכם?';},
      opts:['כן, בהחלט','חלקית','לא ממש'], run:(c,n)=>{state.feels=c;n();}},
    {step:5, bot:()=>`מובן.\n\nכמה אנשים עובדים ב${state.company}?`,
      opts:['1–10','11–25','26–50','51–200','200–1,000','מעל 1,000'], run:(c,n)=>{state.size=c;n();}},
    {step:6, bot:()=>(state.size==='1–10'||state.size==='11–25'?'Brain עובד מצוין לעסקים קטנים!\n• לא דורש צוות IT\n• מתחיל תוך ימים\n':'Brain הוא שכבת AI שמנהלת ביצוע יומיומי.\n1. מנתחת התנהגות\n2. שולחת מסרים חכמים\n3. עושה פולו-אפ\n')+`\nמה התפקיד שלך, ${fn()}?`,
      opts:['בעלי/ת עסק – מנכ״ל/ית','סמנכ״ל/ית מכירות','סמנכ״ל/ית משאבי אנוש','מנהל/ת','תפקיד אחר'], run:(c,n)=>{state.role=c;n();}},
    {step:7, bot:()=>{const r=state.role||'';const t=r.includes('מכירות')?'Brain מזהה פערים בשיחות מכירה ומשפר תוך שבועיים.':r.includes('משאבי')?'Brain מזהה ירידה באנרגיה ומציע פעולות ניהוליות.':r.includes('מנכ')||r.includes('בעל')?'Brain נותן שליטה על ביצועי הצוות יום-יום.':'Brain מותאם לכל מי שרוצה לשפר ביצועים.';return t+`\n\nהאם קיימות מערכות כמו CRM ב${state.company}?`;},
      opts:['כן, יש CRM','כן, יש הדרכות','שניהם','לא'], run:(c,n)=>{state.existing=c;n();}},
    {step:8, bot:()=>{const e=state.existing;if(e==='כן, יש CRM'||e==='שניהם')return 'Brain לא מחליף מערכות – הוא מחבר אותן.\n\nמה הכי חשוב לשפר?';if(e==='כן, יש הדרכות')return 'Brain לא מחליף הדרכות – הוא הופך אותן לביצוע.\n\nמה הכי חשוב לשפר?';return 'Brain יכול להיות הבסיס לתשתית הניהולית.\n\nמה הכי חשוב לשפר?';},
      opts:['הגדלת מכירות','שיפור ביצועי עובדים','שימור עובדים','הטמעת AI','אחר'],
      run:(c,n)=>{if(c==='אחר')n('other_b');else{state.benefit=c;n(10);}}},
    {step:8, id:'other_b', bot:'מה חשוב לשפר?', isInput:true, ph:'תיאור', run:(v,n)=>{state.benefit=v;n(10);}},
    {step:9, bot:()=>`מצוין!\n\nאיך תרצו לקבל מידע על Brain?`,
      opts:['סרטון דמו קצר','הסבר כתוב'], run:(c,n)=>{state.cta=c;n();}},
    {step:10, bot:()=>`מעולה, ${fn()}!\n\nנשמח לשלוח לך את המידע.\n\nמספר טלפון:`, isInput:true, ph:'מספר טלפון', run:(v,n)=>{state.phone=v;n();}},
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
      setTimeout(()=>{const rb=document.createElement('button');rb.className='bot-restart';rb.textContent=UI.restart;rb.onclick=()=>{state={};MSG.innerHTML='';runStep(0);};MSG.appendChild(rb);},2000);
    }}  ];

  const FLOW_EN = [
    {step:1, bot:"Hi!\nI'm the Brain – Manager-Co assistant.\n\nLet's start with a quick intro – what's your name?", isInput:true, ph:"Full name", run:(v,n)=>{state.name=v;n();}},
    {step:2, bot:()=>`Nice to meet you, ${fn()}!\n\nWhich company are you with?`, isInput:true, ph:"Company name", run:(v,n)=>{state.company=v;n();}},
    {step:3, bot:()=>`Great, ${fn()}!\nWhat's the main challenge at ${state.company} right now?`,
      opts:["Increase sales","Improve employee performance","Employee retention","Adopting AI in the business","Other"],
      run:(c,n)=>{if(c==="Other")n('other_ch');else{state.challenge=c;n();}}},
    {step:3, id:'other_ch', bot:"What do you need help with?", isInput:true, ph:"Describe the challenge", run:(v,n)=>{state.challenge=v;n(10);}},
    {step:4, bot:()=>{const m={"Increase sales":"Salespeople know what to do – but don't always execute.","Improve employee performance":"There's knowledge in the organization, but it doesn't become habit.","Employee retention":"It's hard to sustain motivation over time.","Adopting AI in the business":"AI that connects to daily management – not just a tool."};return (m[state.challenge]||"That's a challenge we know well.")+"\n\nDoes this happen at your company too?";},
      opts:["Yes, definitely","Partially","Not really"], run:(c,n)=>{state.feels=c;n();}},
    {step:5, bot:()=>`Got it.\n\nHow many people work at ${state.company}?`,
      opts:["1–10","11–25","26–50","51–200","200–1,000","1,000+"], run:(c,n)=>{state.size=c;n();}},
    {step:6, bot:()=>(state.size==="1–10"||state.size==="11–25"?"Brain works great for small businesses!\n• No IT team required\n• Up and running in days\n":"Brain is an AI layer that manages daily execution.\n1. Analyzes behavior\n2. Sends smart messages\n3. Follows up\n")+`\nWhat's your role, ${fn()}?`,
      opts:["Business owner – CEO","VP Sales","VP HR","Manager","Other role"], run:(c,n)=>{state.role=c;n();}},
    {step:7, bot:()=>{const r=state.role||'';const t=r.includes("Sales")?"Brain spots gaps in sales conversations and improves them within two weeks.":r.includes("HR")?"Brain detects drops in energy and suggests managerial actions.":(r.includes("CEO")||r.includes("owner"))?"Brain gives you day-to-day control over team performance.":"Brain fits anyone who wants to improve performance.";return t+`\n\nDo you have systems like a CRM at ${state.company}?`;},
      opts:["Yes, we have a CRM","Yes, we have training","Both","No"], run:(c,n)=>{state.existing=c;n();}},
    {step:8, bot:()=>{const e=state.existing;if(e==="Yes, we have a CRM"||e==="Both")return "Brain doesn't replace systems – it connects them.\n\nWhat's most important to improve?";if(e==="Yes, we have training")return "Brain doesn't replace training – it turns it into execution.\n\nWhat's most important to improve?";return "Brain can be the foundation of your management infrastructure.\n\nWhat's most important to improve?";},
      opts:["Increase sales","Improve employee performance","Employee retention","Adopting AI","Other"],
      run:(c,n)=>{if(c==="Other")n('other_b');else{state.benefit=c;n(10);}}},
    {step:8, id:'other_b', bot:"What's important to improve?", isInput:true, ph:"Description", run:(v,n)=>{state.benefit=v;n(10);}},
    {step:9, bot:()=>`Excellent!\n\nHow would you like to receive info about Brain?`,
      opts:["Short demo video","Written explanation"], run:(c,n)=>{state.cta=c;n();}},
    {step:10, bot:()=>`Great, ${fn()}!\n\nWe'd love to send you the info.\n\nPhone number:`, isInput:true, ph:"Phone number", run:(v,n)=>{state.phone=v;n();}},
    {step:11, bot:"Email address:", isInput:true, ph:"Email address", run:(v,n)=>{
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
      if(state.cta==="Short demo video"){
        addBot(`Thanks ${state.name}! 🎥 The video is opening now...`,200);
        setTimeout(()=>{
          const ov=document.createElement('div');
          ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(2,13,26,0.96);display:flex;align-items:center;justify-content:center;';
          ov.innerHTML=`<div style="position:relative;width:min(560px,96vw);background:#020d1a;border:1px solid rgba(45,156,255,0.25);border-radius:20px;overflow:hidden;box-shadow:0 0 60px rgba(45,156,255,0.2);">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(45,156,255,0.12);">
              <span style="font-size:15px;font-weight:700;color:#eaf4ff;font-family:Heebo,sans-serif;">Brain Co-Manager in action</span>
              <button onclick="this.closest('div[style*=fixed]').remove();document.body.style.overflow='';" style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#aaa;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
            </div>
            <div style="position:relative;padding-top:56.25%;background:#010810;">
              <iframe style="position:absolute;inset:0;width:100%;height:100%;border:none;" src="https://www.youtube.com/embed/O3yF5ee2iEI?autoplay=1&rel=0" allow="autoplay;encrypted-media" allowfullscreen></iframe>
            </div>
            <div style="padding:12px 20px;text-align:center;font-size:13px;color:#7ec8ff;font-family:Heebo,sans-serif;">A Brain representative will contact you shortly</div>
          </div>`;
          ov.onclick=e=>{if(e.target===ov){ov.remove();document.body.style.overflow='';}};
          document.body.appendChild(ov);
          document.body.style.overflow='hidden';
        },400);
      } else {
        const PDF='https://brain2spark.mysitemail.co.il/wp-content/uploads/2026/03/Deno_%D7%90%D7%AA%D7%A8-%D7%A2%D7%91%D7%A8%D7%99%D7%AA.pdf';
        addBot(`Thank you so much, ${state.name}! 🎉<br><br>📄 <a href="${PDF}" target="_blank" style="color:#2d9cff;font-weight:700">Click here to view the document</a><br><br>A Brain representative will contact you shortly 🙂`,200);
      }
      setTimeout(()=>{const rb=document.createElement('button');rb.className='bot-restart';rb.textContent=UI.restart;rb.onclick=()=>{state={};MSG.innerHTML='';runStep(0);};MSG.appendChild(rb);},2000);
    }}  ];

  const FLOW = isEn ? FLOW_EN : FLOW_HE;

  FLOW.forEach((s,i)=>{ if(s.id)stepMap[s.id]=i; else flowIndex.push(i); });

  function nextSeq(idx) {
    if (idx === 9) return 10;
    const pos = flowIndex.indexOf(idx);
    return pos >= 0 && pos + 1 < flowIndex.length ? flowIndex[pos + 1] : null;
  }

  function runStep(idxOrKey) {
    let idx = typeof idxOrKey==='string' ? stepMap[idxOrKey] : typeof idxOrKey==='number' ? idxOrKey : null;
    if(idx===null||idx===undefined) return;
    const s=FLOW[idx]; updProg(s.step);
    const text=typeof s.bot==='function'?s.bot():s.bot;
    addBot(text,120).then(()=>{
      if(s.isSummary){const rb=document.createElement('button');rb.className='bot-restart';rb.textContent=UI.restart;rb.onclick=()=>{state={};MSG.innerHTML='';runStep(0);};MSG.appendChild(rb);return;}
      const isCal=s.isCalendly&&s.isCalendly(), isCon=s.isConfirm&&s.isConfirm();
      const ns=nextSeq(idx);
      if(isCal){addCal(v=>{addUser(v);state.contact=v;setTimeout(()=>runStep(ns),500);});return;}
      if(isCon){setTimeout(()=>runStep(ns),700);return;}
      if(s.isInput){addInput(s.ph,v=>{addUser(v);s.run(v,k=>{
        const next = (k !== undefined && k !== null) ? k : ns;
        setTimeout(()=>runStep(next),350);
      });});return;}
      if(s.opts){addOpts(s.opts,c=>{addUser(c);s.run(c,k=>{
        const next = (k !== undefined && k !== null) ? k : ns;
        setTimeout(()=>runStep(next),350);
      });});}
    });
  }
}

// ── LANGUAGE SWITCH ──
function setLang(lang) {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  const isEn = path.includes('/en/');
  // Pages that exist only in Hebrew (no English version)
  const hebrewOnly = ['podcast.html'];
  if (lang === 'en' && !isEn) {
    if (hebrewOnly.includes(page) || page === 'index_he.html') {
      window.location.href = '/en/index.html';
    } else {
      window.location.href = '/en/' + page;
    }
  } else if (lang === 'he' && isEn) {
    const hePage = page === 'index.html' ? 'index_he.html' : page;
    window.location.href = '/' + hePage;
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // nav-lang style
  const ls = document.createElement('style');
  ls.textContent = `.nav-lang{background:none;border:none;cursor:pointer;font-size:20px;padding:0 3px;opacity:.55;transition:opacity .2s,transform .2s;line-height:1;}.nav-lang:hover,.nav-lang.active{opacity:1;transform:scale(1.15);}`;
  document.head.appendChild(ls);
  // mark active flag
  const isEn = window.location.pathname.includes('/en/');
  const activeLang = isEn ? 'en' : 'he';
  setTimeout(() => {
    const btn = document.getElementById('nav-lang-' + activeLang);
    if (btn) btn.style.opacity = '1';
  }, 100);
  initParticles();
  initReveal();
  initNavScroll();
  initBot();
  initLightbox();
});

// ── DIAGRAM LIGHTBOX ──
function initLightbox() {
  const DIAGRAMS = [
    'brain-growth-diagram','ceo-control-panel','process-do-it-all',
    'manager-conversation','agreement-process','topics-mindmap',
    'process-bank','resistance-diagram','knowledge-box',
    'product-components','account-manager','upsell-table',
    'statement-bank','escalation-process','brain-analysis','brain-architecture'
  ];

  function isDiagram(img) {
    const src = (img.getAttribute('src') || '').toLowerCase();
    return DIAGRAMS.some(name => src.includes(name));
  }

  let overlay = document.getElementById('lightbox-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(2,13,26,0.94);backdrop-filter:blur(8px);align-items:center;justify-content:center;padding:32px;cursor:zoom-out;';
    overlay.innerHTML = `
      <button id="lightbox-close" aria-label="סגירה" style="position:absolute;top:20px;left:20px;width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);color:#fff;font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;transition:all .2s;">✕</button>
      <img id="lightbox-img" src="" alt="" style="max-width:95%;max-height:92vh;border-radius:12px;box-shadow:0 0 60px rgba(45,156,255,0.25);cursor:default;object-fit:contain;">
      <div id="lightbox-hint" style="position:absolute;bottom:20px;left:0;right:0;text-align:center;font-size:12px;color:rgba(255,255,255,0.5);font-family:Heebo,sans-serif;">לחצו ✕ או מחוץ לתמונה לסגירה</div>`;
    document.body.appendChild(overlay);

    const lbImg0 = overlay.querySelector('#lightbox-img');
    const closeBtn = overlay.querySelector('#lightbox-close');
    closeBtn.onmouseover = () => { closeBtn.style.background='rgba(255,255,255,0.16)'; };
    closeBtn.onmouseout = () => { closeBtn.style.background='rgba(255,255,255,0.08)'; };

    function closeLightbox() {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
      lbImg0.src = '';
    }
    overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
    closeBtn.addEventListener('click', closeLightbox);
    lbImg0.addEventListener('click', e => e.stopPropagation());
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.style.display === 'flex') closeLightbox(); });
  }

  const lbImg = overlay.querySelector('#lightbox-img');

  document.querySelectorAll('img').forEach(img => {
    if (!isDiagram(img) || img.dataset.lightboxReady) return;
    img.dataset.lightboxReady = '1';
    img.style.cursor = 'zoom-in';
    img.title = 'לחצו להגדלה';
    img.addEventListener('click', () => {
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || '';
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
}
