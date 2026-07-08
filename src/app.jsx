// App shell: routing, tweaks, theme switching

const PAGES = {
  home: () => <HomePage/>,
  about: () => <AboutPage/>,
  services: () => <ServicesPage/>,
  approach: () => <ApproachPage/>,
  families: () => <FamiliesPage/>,
  areas: () => <AreasPage/>,
  faq: () => <FAQPage/>,
  testimonials: () => <TestimonialsPage/>,
  careers: () => <CareersPage/>,
  resources: () => <ResourcesPage/>,
  contact: () => <ContactPage/>,
  privacy: () => <PrivacyPage/>,
  hipaa: () => <HipaaPage/>,
  accessibility: () => <AccessibilityPage/>,
  gfe: () => <GoodFaithPage/>,
};

const THEMES = [
  { id: 'sunrise', name: 'Brand', colors: ['#2aa63a','#f18a2c','#e5396a','#f6c945']},
  { id: 'playground', name: 'Playground', colors: ['#3b82f6','#ef4444','#facc15','#22c55e']},
  { id: 'meadow', name: 'Meadow', colors: ['#4a8f5f','#e9c46a','#78b4d1','#e07856']},
  { id: 'mosaic', name: 'Mosaic', colors: ['#0e7c7b','#c2410c','#7c2d92','#eab308']},
];

const TweaksPanel = ({ visible, tweaks, setTweaks, onClose }) => {
  if (!visible) return null;
  return (
    <div className="tweaks-panel open">
      <div className="tweaks-title">
        Tweaks
        <span onClick={onClose} style={{cursor:'pointer', fontSize:20, color:'var(--ink-soft)'}}>×</span>
      </div>
      <div className="tweak-row">
        <label>Color direction</label>
        <div className="theme-swatches">
          {THEMES.map(t => (
            <div key={t.id}
                 className={`theme-swatch ${tweaks.theme===t.id?'active':''}`}
                 onClick={()=>setTweaks({...tweaks, theme: t.id})}
                 style={{background:`linear-gradient(135deg, ${t.colors[0]} 0%, ${t.colors[0]} 25%, ${t.colors[1]} 25%, ${t.colors[1]} 50%, ${t.colors[2]} 50%, ${t.colors[2]} 75%, ${t.colors[3]} 75%)`}}>
              <span className="theme-swatch-name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>Hero decoration</label>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6}}>
          {['rays','shapes','minimal'].map(v => (
            <div key={v} onClick={()=>setTweaks({...tweaks, hero_variant: v})}
                 style={{padding:'8px 10px', textAlign:'center', borderRadius:8, background: tweaks.hero_variant===v?'var(--ink)':'var(--bg)', color: tweaks.hero_variant===v?'var(--bg)':'var(--ink)', fontSize:11, fontWeight:700, cursor:'pointer', textTransform:'capitalize'}}>
              {v}
            </div>
          ))}
        </div>
      </div>
      <div style={{marginTop:14, paddingTop:14, borderTop:'1px solid var(--line)', fontSize:11, color:'var(--ink-soft)'}}>
        Color direction 1 (Brand) pulls directly from your logo. The others are alternate explorations.
      </div>
    </div>
  );
};

const App = () => {
  // Map URL paths/hashes from old indexed links → page id.
  // When someone arrives at https://noortherapycenter.com/ (no hash, no path),
  // ALWAYS start on home. Don't restore from localStorage — that caused
  // returning visitors to land on whatever page they last viewed.
  const resolveInitialPage = () => {
    try {
      const hash = (window.location.hash || '').replace(/^#\/?/, '').toLowerCase();
      if (hash && PAGES[hash]) return hash;
      // Strip e.g. "/aba-therapy-minneapolis" → fall through to home
      // (those routes are handled server-side as redirects, but if one slips
      // through to the SPA we still want home, not a stale localStorage page).
      return 'home';
    } catch(e) { return 'home'; }
  };
  const [current, setCurrent] = React.useState(resolveInitialPage);
  const [tweaks, setTweaks] = React.useState(window.TWEAK_DEFAULTS || { theme:'sunrise', hero_variant:'rays' });
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  // Clean up legacy stored page key from older builds — it caused returning
  // visitors to land on whatever page they last viewed instead of home.
  React.useEffect(() => {
    try { localStorage.removeItem('noor:page'); } catch(e) {}
  }, []);

  // Expose navigation
  window.navigate = (p) => {
    setCurrent(p);
    // Clear any stale hash so the URL reflects the current page cleanly
    if (window.location.hash) {
      try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch(e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If the user hits the back/forward button or pastes a #hash URL, honor it
  React.useEffect(() => {
    const onHash = () => {
      const hash = (window.location.hash || '').replace(/^#\/?/, '').toLowerCase();
      if (hash && PAGES[hash]) setCurrent(hash);
      else if (!hash) setCurrent('home');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Apply theme
  React.useEffect(() => {
    if (tweaks.theme === 'sunrise') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', tweaks.theme);
    }
  }, [tweaks.theme]);

  // Tweaks messaging
  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      else if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({type:'__edit_mode_available'}, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const updateTweaks = (t) => {
    setTweaks(t);
    window.parent.postMessage({type:'__edit_mode_set_keys', edits: t}, '*');
  };

  const Page = PAGES[current] || PAGES.home;

  return (
    <div className="page-wrap" data-screen-label={current}>
      <Nav current={current}/>
      <Page/>
      <Footer/>
      <TweaksPanel visible={tweaksOpen} tweaks={tweaks} setTweaks={updateTweaks} onClose={()=>setTweaksOpen(false)}/>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
