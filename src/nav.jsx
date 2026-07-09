// Navigation + Footer

// Grouped nav — flat list collapsed into dropdown groups so the top bar isn't cluttered.
const NAV_GROUPS = [
  { id: 'home', label: 'Home' },
  { id: 'about-group', label: 'About', children: [
    { id: 'about', label: 'About the agency' },
    { id: 'approach', label: 'Our approach' },
    { id: 'testimonials', label: 'Family stories' },
  ]},
  { id: 'care-group', label: 'Care', children: [
    { id: 'services', label: 'Services' },
    { id: 'families', label: 'For families' },
    { id: 'areas', label: 'Service areas' },
  ]},
  { id: 'resources-group', label: 'Resources', children: [
    { id: 'resources', label: 'Articles & guides' },
    { id: 'faq', label: 'FAQ' },
  ]},
  { id: 'careers', label: 'Careers' },
];

// Map of every page id -> which top group it belongs under (for active highlighting).
const GROUP_OF_PAGE = {};
NAV_GROUPS.forEach(g => {
  if (g.children) g.children.forEach(c => GROUP_OF_PAGE[c.id] = g.id);
  else GROUP_OF_PAGE[g.id] = g.id;
});

const LANGS = [
  { code: 'EN', g: 'en', label: 'English' },
  { code: 'SO', g: 'so', label: 'Soomaali' },
  { code: 'AR', g: 'ar', label: 'العربية' },
  { code: 'ES', g: 'es', label: 'Español' },
];

// Real Noor logo mark (cropped from the full brand asset).
const NoorLogoMark = ({ size = 38 }) => (
  <img
    src="assets/noor-logo-mark.png"
    width={size}
    height={size}
    alt="Noor Therapy Center"
    style={{display:'block', width:size, height:size, objectFit:'contain'}}
  />
);

const Logo = () => (
  <div className="logo" onClick={() => window.navigate('home')} style={{cursor:'pointer'}}>
    <NoorLogoMark size={40}/>
    <div style={{display:'flex', flexDirection:'column', lineHeight:1}} className="logo-wordmark">
      <span className="notranslate" translate="no" style={{fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:20, color:'var(--brand-green)', letterSpacing:'-0.01em', whiteSpace:'nowrap'}}>Noor Therapy Center</span>
      <span className="logo-tagline" style={{fontFamily:"'Fraunces',Georgia,serif", fontStyle:'italic', fontWeight:500, fontSize:12, letterSpacing:'0.02em', color:'var(--brand-berry)', marginTop:3, whiteSpace:'nowrap'}}>Letting every light shine bright</span>
    </div>
  </div>
);

// Shared single-open coordinator — only one dropdown can be open at a time.
// Switching from one nav item to another closes the previous one immediately
// (no overlap, no lingering panel).
const NAV_DD_BUS = (() => {
  const listeners = new Set();
  return {
    subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
    open: (id) => { listeners.forEach(fn => fn(id)); },
  };
})();

// Desktop nav dropdown
const NavDropdown = ({ group, current, activeGroup }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const closeTimer = React.useRef(null);
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 80);
  };
  const cancelClose = () => { clearTimeout(closeTimer.current); };
  const openNow = () => {
    cancelClose();
    NAV_DD_BUS.open(group.id); // tell siblings to close
    setOpen(true);
  };
  React.useEffect(() => () => clearTimeout(closeTimer.current), []);
  // Listen for sibling opens — close ourselves immediately if a different one opens.
  React.useEffect(() => {
    return NAV_DD_BUS.subscribe((openedId) => {
      if (openedId !== group.id) {
        clearTimeout(closeTimer.current);
        setOpen(false);
      }
    });
  }, [group.id]);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  const isActive = activeGroup === group.id;
  return (
    <div ref={ref} style={{position:'relative'}}
         onMouseEnter={openNow}
         onMouseLeave={scheduleClose}>
      <div className={`nav-link ${isActive ? 'active' : ''}`}
           onClick={() => { if (open) setOpen(false); else openNow(); }}
           style={{display:'inline-flex', alignItems:'center', gap:4}}>
        {group.label} <span style={{fontSize:10, opacity:0.7}}>▾</span>
      </div>
      {open && (
        <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}
             style={{position:'absolute', top:'100%', left:0, paddingTop:10, minWidth:220, zIndex:60}}>
          <div style={{background:'var(--surface)', border:'1px solid var(--line)', borderRadius:14, padding:8, boxShadow:'0 16px 40px -12px rgba(0,0,0,0.18)'}}>
          {group.children.map(c => (
            <div key={c.id}
                 onClick={() => { window.navigate(c.id); setOpen(false); }}
                 style={{padding:'10px 14px', borderRadius:10, cursor:'pointer', fontWeight:600, fontSize:14, color: current===c.id ? 'var(--brand-green)' : 'var(--ink)', background: current===c.id ? 'color-mix(in srgb, var(--brand-green) 8%, transparent)' : 'transparent'}}
                 onMouseEnter={e => { if (current!==c.id) e.currentTarget.style.background = 'var(--bg)'; }}
                 onMouseLeave={e => { if (current!==c.id) e.currentTarget.style.background = 'transparent'; }}>
              {c.label}
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mobile drawer menu — collapsible groups, touch-friendly.
// IMPORTANT: rendered into document.body via a portal so it escapes the
// sticky <nav>'s backdrop-filter stacking context. Without the portal, the
// drawer's `position: fixed` was clipped to the nav's bounds (only the close
// "×" was visible above the page on real phones).
const MobileMenu = ({ open, current, onClose }) => {
  // Auto-expand the group containing the current page; collapsed otherwise
  const initiallyOpen = React.useMemo(() => {
    const set = {};
    NAV_GROUPS.forEach(g => {
      if (g.children && g.children.some(c => c.id === current)) set[g.id] = true;
    });
    return set;
  }, [current]);
  const [expanded, setExpanded] = React.useState(initiallyOpen);
  React.useEffect(() => { if (open) setExpanded(initiallyOpen); }, [open, initiallyOpen]);
  // Lock body scroll while the drawer is open so the underlying page doesn't
  // scroll under the user's finger when they tap the scrim.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);
  if (!open) return null;
  const toggle = (id) => setExpanded(s => ({ ...s, [id]: !s[id] }));
  const go = (id) => { window.navigate(id); onClose(); };
  const drawer = (
    <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, width:'100vw', height:'100dvh', zIndex:9999}}>
      <div onClick={onClose} style={{position:'absolute', top:0, left:0, right:0, bottom:0, background:'rgba(31,46,26,0.45)'}}/>
      <div style={{position:'absolute', top:0, right:0, bottom:0, width:'min(340px, 88vw)', maxHeight:'100dvh', background:'var(--bg)', padding:'24px 20px', overflowY:'auto', WebkitOverflowScrolling:'touch', boxShadow:'-20px 0 40px -10px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex', justifyContent:'flex-end', marginBottom:16}}>
          <button type="button" onClick={onClose} style={{width:44, height:44, borderRadius:999, border:'1px solid var(--line)', background:'var(--surface)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, cursor:'pointer'}} aria-label="Close menu">×</button>
        </div>
        {NAV_GROUPS.map(g => (
          <div key={g.id} style={{marginBottom:10}}>
            {g.children ? (
              <>
                <button type="button" onClick={() => toggle(g.id)}
                        style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', padding:'14px 14px', borderRadius:10, fontWeight:700, fontSize:17, background:'transparent', color:'var(--ink)', border:'none', cursor:'pointer', textAlign:'left', fontFamily:'inherit'}}>
                  <span>{g.label}</span>
                  <span style={{fontSize:12, opacity:0.6, transform: expanded[g.id] ? 'rotate(180deg)' : 'rotate(0)', transition:'transform .18s'}}>▾</span>
                </button>
                {expanded[g.id] && (
                  <div style={{display:'grid', gap:2, paddingLeft:8, marginTop:4}}>
                    {g.children.map(c => (
                      <button key={c.id} type="button" onClick={() => go(c.id)}
                              style={{padding:'12px 14px', borderRadius:10, fontWeight:600, fontSize:16, background: current===c.id ? 'var(--brand-green)' : 'transparent', color: current===c.id ? '#fff' : 'var(--ink)', border:'none', cursor:'pointer', textAlign:'left', width:'100%', fontFamily:'inherit'}}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <button type="button" onClick={() => go(g.id)}
                      style={{display:'block', width:'100%', padding:'14px 14px', borderRadius:10, fontWeight:700, fontSize:17, background: current===g.id ? 'var(--brand-green)' : 'transparent', color: current===g.id ? '#fff' : 'var(--ink)', border:'none', cursor:'pointer', textAlign:'left', fontFamily:'inherit'}}>
                {g.label}
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn" style={{background:'var(--brand-green)', color:'#fff', width:'100%', justifyContent:'center', marginTop:16}} onClick={() => go('contact')}>
          Start intake <Icon name="arrow" size={16}/>
        </button>
      </div>
    </div>
  );
  return ReactDOM.createPortal(drawer, document.body);
};

const Nav = ({ current }) => {
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem('noor_lang') || 'EN'; } catch(e) { return 'EN'; }
  });
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const mounted = React.useRef(false);
  const activeGroup = GROUP_OF_PAGE[current] || current;

  React.useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const entry = LANGS.find(l => l.code === lang) || LANGS[0];
    if (window.applyLanguage) window.applyLanguage(entry.g);
    try { localStorage.setItem('noor_lang', lang); } catch(e) {}
  }, [lang]);

  const ddRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Logo/>
        <div className="nav-links">
          {NAV_GROUPS.map(g => g.children
            ? <NavDropdown key={g.id} group={g} current={current} activeGroup={activeGroup}/>
            : <div key={g.id}
                   className={`nav-link ${activeGroup === g.id ? 'active' : ''}`}
                   onClick={() => window.navigate(g.id)}>
                {g.label}
              </div>
          )}
        </div>
        <div className="nav-cta">
          <div ref={ddRef} className="lang notranslate" translate="no" onClick={() => setOpen(!open)} style={{position:'relative', userSelect:'none'}}>
            {lang} ▾
            {open && (
              <div className="notranslate" translate="no" style={{position:'absolute', top:'calc(100% + 6px)', right:0, background:'var(--surface)', border:'1px solid var(--line)', borderRadius:12, padding:6, minWidth:140, boxShadow:'0 12px 30px -10px rgba(0,0,0,0.15)', zIndex:50}}>
                {LANGS.map(l => (
                  <div key={l.code}
                       onClick={(e) => { e.stopPropagation(); setLang(l.code); setOpen(false); }}
                       style={{padding:'8px 12px', borderRadius:8, cursor:'pointer', background: l.code===lang?'var(--bg)':'transparent', display:'flex', justifyContent:'space-between', gap:10, fontWeight: l.code===lang?700:500}}>
                    <span>{l.label}</span>
                    <span style={{color:'var(--muted)', fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase'}}>{l.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="btn btn-accent nav-intake-btn" onClick={() => window.navigate('contact')} style={{background:'var(--brand-green)'}}>
            Start intake
            <Icon name="arrow" size={16}/>
          </button>
          <button className="nav-hamburger" onClick={() => setMobileOpen(true)}
                  style={{display:'none', width:42, height:42, borderRadius:10, border:'1px solid var(--line)', background:'var(--surface)', alignItems:'center', justifyContent:'center'}}
                  aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
      <MobileMenu open={mobileOpen} current={current} onClose={() => setMobileOpen(false)}/>
    </nav>
  );
};

const Footer = () => (
  <footer>
    <div className="container">
      <div className="footer-grid" style={{display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap:48, marginBottom:60}}>
        <div>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:16}}>
            <NoorLogoMark size={44}/>
            <div style={{fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:22}}>Noor Therapy Center</div>
          </div>
          <p style={{color:'rgba(253,250,243,0.7)', maxWidth:340, marginBottom:20}}>
            ABA, speech, and OT services across Minnesota — in your home and at our center in the Twin Cities.
          </p>
          <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
            {['EN','Soomaali','العربية','Español'].map(l => (
              <span key={l} style={{padding:'4px 10px', border:'1px solid rgba(253,250,243,0.25)', borderRadius:999, fontSize:12, fontWeight:600}}>{l}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{marginBottom:16, fontSize:13, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--brand-yellow)'}}>Services</h4>
          <div style={{display:'grid', gap:10, fontSize:15}}>
            {['In-home ABA','Center-based ABA','Early Intervention','Speech Therapy','Occupational Therapy','Parent Training'].map(s => (
              <a key={s} style={{cursor:'pointer'}} onClick={() => window.navigate('services')}>{s}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{color:'var(--brand-yellow)', marginBottom:16, fontSize:13, letterSpacing:'0.08em', textTransform:'uppercase'}}>Agency</h4>
          <div style={{display:'grid', gap:10, fontSize:15}}>
            <a onClick={() => window.navigate('about')} style={{cursor:'pointer'}}>About us</a>
            <a onClick={() => window.navigate('approach')} style={{cursor:'pointer'}}>Our approach</a>
            <a onClick={() => window.navigate('testimonials')} style={{cursor:'pointer'}}>Family stories</a>
            <a onClick={() => window.navigate('resources')} style={{cursor:'pointer'}}>Resources</a>
            <a onClick={() => window.navigate('careers')} style={{cursor:'pointer'}}>Careers</a>
            <a onClick={() => window.navigate('faq')} style={{cursor:'pointer'}}>FAQ</a>
          </div>
        </div>
        <div>
          <h4 style={{color:'var(--brand-yellow)', marginBottom:16, fontSize:13, letterSpacing:'0.08em', textTransform:'uppercase'}}>Contact</h4>
          <div style={{display:'grid', gap:12, fontSize:15, color:'rgba(253,250,243,0.85)'}}>
            <div>6250 Excelsior Blvd, Suite 102<br/>St. Louis Park, MN 55416</div>
            <div>Phone: (612) 703-9022</div>
            <div>Fax: (612) 482-3186</div>
            <div>info@noortherapycenter.com</div>
            <div style={{color:'var(--brand-yellow)', fontWeight:700, fontSize:13}}>Mon–Sun · 8am–6pm</div>
          </div>
        </div>
      </div>
      <div style={{borderTop:'1px solid rgba(253,250,243,0.15)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16, fontSize:13, color:'rgba(253,250,243,0.6)'}}>
        <div>© 2026 Noor Therapy Center.</div>
        <div style={{display:'flex', gap:20, flexWrap:'wrap'}}>
          <a style={{cursor:'pointer'}} onClick={()=>window.navigate('privacy')}>Privacy</a>
          <a style={{cursor:'pointer'}} onClick={()=>window.navigate('hipaa')}>HIPAA Notice</a>
          <a style={{cursor:'pointer'}} onClick={()=>window.navigate('accessibility')}>Accessibility</a>
          <a style={{cursor:'pointer'}} onClick={()=>window.navigate('gfe')}>Good Faith Estimate</a>
          <a href="admin.html" style={{cursor:'pointer'}}>Admin Portal</a>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Nav, Footer, NoorLogoMark, Logo });
