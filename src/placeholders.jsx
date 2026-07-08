// Abstract, brand-forward illustrations. No hand-drawn people — use labeled photo placeholders instead.

const Sunburst = ({ size = 40, color1, color2, rays = 12 }) => {
  const c1 = color1 || 'var(--p1)';
  const c2 = color2 || 'var(--p2)';
  const rayEls = [];
  for (let i = 0; i < rays; i++) {
    const angle = (i * 360) / rays;
    rayEls.push(
      <rect key={i} x="49" y="4" width="2" height="14" rx="1" fill={c2}
            transform={`rotate(${angle} 50 50)`} />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {rayEls}
      <circle cx="50" cy="50" r="22" fill={c1} />
      <circle cx="50" cy="50" r="10" fill={c2} />
    </svg>
  );
};

const NoorMark = ({ size = 40, variant = 'sunburst' }) => {
  if (variant === 'crescent') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="var(--p1)" />
        <circle cx="62" cy="44" r="32" fill="var(--bg)" />
        <circle cx="72" cy="38" r="6" fill="var(--p2)" />
      </svg>
    );
  }
  if (variant === 'lantern') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="var(--p2)" />
        <path d="M 30 50 Q 50 25 70 50 Q 50 75 30 50 Z" fill="var(--p1)" />
        <circle cx="50" cy="50" r="6" fill="var(--bg)" />
      </svg>
    );
  }
  // Default: sunburst
  return <Sunburst size={size} />;
};

// Curated Unsplash photo IDs — all ABA / child-therapy / learning related.
// Verified live, hotlinkable, kid + learning + therapy imagery.
const PHOTO_MAP = {
  // Core therapy / ABA scenes
  'child & therapist, playroom':  '1503454537195-1dcabb73ffb9', // child playing with wooden toys
  'blocks & toys':                '1587654780291-39c9404d746b', // colorful building blocks
  'therapy session':              '1560961911-ba7ef651a56c',   // child with caregiver at table learning
  'aba session':                  '1560961911-ba7ef651a56c',
  'assent, child laughing':       '1544776193-0dd4b2b4b3bd',   // child smiling during play
  'early intervention':           '1588075592446-265fd1e6e76f', // toddler with toys
  // Center / space
  'center hallway':               '1564429097439-e4ffcea4d00d', // bright classroom
  'center exterior':              '1580582932707-520aed937b7b', // modern building
  'center interior, play space':  '1587657565524-38b4d43fa9f1', // playroom interior
  // Therapy modalities
  'speech therapy':               '1576086213369-97a306d36557', // speech / communication tools
  'occupational therapy':         '1594737625785-a6cbdabd333c', // sensory / fine motor
  'sensory gym':                  '1558877385-2fd7aedbfd58',
  // Family / caregiver
  'parent + BCBA':                '1519340241574-2cec6aef0c01', // adult + child reading
  'family at home':               '1581578731548-c64695cc6952', // parent + child together
  'parent coaching':              '1576765608535-5f04d1e3f289',
  // Learning / books
  'reading with child':           '1512253022256-19f3b7c98a1f',
  'books & learning':             '1533227268428-f9ed0900fb3b', // children books
  'article, research':            '1513258496099-48168024aec0', // open book
  'visual schedule':              '1603719530440-d7b2db9d8d14',
  // Outdoor
  'outdoor play':                 '1597586594846-4d6e21cc3a16', // child outside
  'therapy session, outdoor':     '1597586594846-4d6e21cc3a16',
  // Team / staff
  'team meeting':                 '1600880292203-757bb62b4baf', // colleagues collaborating
  'clinician':                    '1594824476967-48c8b964273f',
};

// Pick a deterministic Unsplash photo for an arbitrary label string
function pickPhoto(label) {
  const key = (label||'').toLowerCase();
  for (const k of Object.keys(PHOTO_MAP)) {
    if (k.toLowerCase() === key) return PHOTO_MAP[k];
  }
  if (key.includes('team') || key.includes('clinician') || key.includes('bcba')) return PHOTO_MAP['team meeting'];
  if (key.includes('hallway')) return PHOTO_MAP['center hallway'];
  if (key.includes('exterior') || key.includes('building')) return PHOTO_MAP['center exterior'];
  if (key.includes('center') || key.includes('room') || key.includes('space')) return PHOTO_MAP['center interior, play space'];
  if (key.includes('outdoor') || key.includes('park') || key.includes('playground')) return PHOTO_MAP['outdoor play'];
  if (key.includes('family') || key.includes('parent') || key.includes('caregiver')) return PHOTO_MAP['family at home'];
  if (key.includes('laugh') || key.includes('assent') || key.includes('smile')) return PHOTO_MAP['assent, child laughing'];
  if (key.includes('block') || key.includes('toy')) return PHOTO_MAP['blocks & toys'];
  if (key.includes('speech') || key.includes('aac') || key.includes('communication')) return PHOTO_MAP['speech therapy'];
  if (key.includes('ot ') || key.includes('occupational') || key.includes('motor') || key.includes('gym') || key.includes('sensory')) return PHOTO_MAP['occupational therapy'];
  if (key.includes('early') || key.includes('intervention') || key.includes('toddler') || key.includes('wait')) return PHOTO_MAP['early intervention'];
  if (key.includes('read') || key.includes('book') || key.includes('story')) return PHOTO_MAP['books & learning'];
  if (key.includes('article') || key.includes('research') || key.includes('guide')) return PHOTO_MAP['article, research'];
  if (key.includes('schedule') || key.includes('visual')) return PHOTO_MAP['visual schedule'];
  if (key.includes('child') || key.includes('kid') || key.includes('learn')) return PHOTO_MAP['therapy session'];
  if (key.includes('aba') || key.includes('session')) return PHOTO_MAP['aba session'];
  return PHOTO_MAP['therapy session']; // default
}

// Photo component. Uses real Unsplash imagery; shows abstract fallback if the image fails to load.
const PhotoPlaceholder = ({ label, ratio = '4/3', tone = 'warm', className = '', style = {} }) => {
  const tones = {
    warm: ['var(--p2)', 'var(--p1)', 'var(--sun)'],
    cool: ['var(--p3)', 'var(--p4)', 'var(--sun)'],
    soft: ['var(--p2)', 'var(--p3)', 'var(--sun)'],
    berry: ['var(--p5)', 'var(--p1)', 'var(--p2)'],
  };
  const [c1, c2, c3] = tones[tone] || tones.warm;
  const [failed, setFailed] = React.useState(false);
  const photoId = pickPhoto(label);
  const url = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=900&q=70`;
  return (
    <div className={`placeholder ${className}`} style={{ aspectRatio: ratio, background: `color-mix(in srgb, ${c1} 20%, var(--bg))`, ...style }}>
      {!failed && (
        <img src={url} alt={label}
             onError={()=>setFailed(true)}
             style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover'}}/>
      )}
      {failed && (
        <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{position:'absolute', inset:0}}>
          <defs>
            <linearGradient id={`pg-${label}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={c1} stopOpacity="0.35"/>
              <stop offset="100%" stopColor={c2} stopOpacity="0.55"/>
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill={`url(#pg-${label})`} />
          <circle cx="320" cy="80" r="50" fill={c3} opacity="0.5"/>
          <circle cx="320" cy="80" r="24" fill={c1} opacity="0.7"/>
        </svg>
      )}
    </div>
  );
};

// Big decorative sunrise shape (used in hero)
const SunriseGraphic = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 600 600" style={{ width: '100%', height: '100%' }}>
    <defs>
      <radialGradient id="sun-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--sun)" />
        <stop offset="60%" stopColor="var(--p2)" />
        <stop offset="100%" stopColor="var(--p1)" />
      </radialGradient>
    </defs>
    {Array.from({ length: 18 }).map((_, i) => {
      const a = (i * 360) / 18;
      return <rect key={i} x="297" y="20" width="6" height="80" rx="3" fill="var(--p2)" transform={`rotate(${a} 300 300)`} opacity={i % 2 ? 0.7 : 1}/>;
    })}
    <circle cx="300" cy="300" r="160" fill="url(#sun-core)" />
    <circle cx="300" cy="300" r="100" fill="var(--sun)" opacity="0.85" />
    <circle cx="300" cy="300" r="50" fill="#fff" opacity="0.6" />
  </svg>
);

// Small icon, consistent stroke-style. Accepts name.
const Icon = ({ name, size = 24, color = 'currentColor' }) => {
  const s = { width: size, height: size, stroke: color, fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const map = {
    home: <svg {...s} viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V11z"/></svg>,
    center: <svg {...s} viewBox="0 0 24 24"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/><path d="M3 21h18"/></svg>,
    video: <svg {...s} viewBox="0 0 24 24"><rect x="2" y="5" width="14" height="14" rx="2"/><path d="M16 10l6-3v10l-6-3z"/></svg>,
    spark: <svg {...s} viewBox="0 0 24 24"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>,
    clipboard: <svg {...s} viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2"/><path d="M9 11h6M9 15h4"/></svg>,
    speech: <svg {...s} viewBox="0 0 24 24"><path d="M4 5h16v12H8l-4 4V5z"/><path d="M8 10h8M8 13h5"/></svg>,
    hands: <svg {...s} viewBox="0 0 24 24"><path d="M6 13V7a2 2 0 0 1 4 0v6"/><path d="M10 11V5a2 2 0 0 1 4 0v8"/><path d="M14 9a2 2 0 0 1 4 0v7a6 6 0 0 1-6 6 6 6 0 0 1-6-6v-3"/></svg>,
    family: <svg {...s} viewBox="0 0 24 24"><circle cx="8" cy="7" r="3"/><circle cx="16" cy="7" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"/><path d="M13 21v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg>,
    arrow: <svg {...s} viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
    phone: <svg {...s} viewBox="0 0 24 24"><path d="M22 17v3a2 2 0 0 1-2.2 2A19 19 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6A2 2 0 0 1 22 17z"/></svg>,
    mail: <svg {...s} viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>,
    check: <svg {...s} viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>,
    plus: <svg {...s} viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>,
    star: <svg {...s} viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>,
    shield: <svg {...s} viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z"/><path d="M9 12l2 2 4-4"/></svg>,
    puzzle: <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>,
    heart: <svg {...s} viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>,
  };
  return map[name] || null;
};

// Small tile that shows a child doing "something" as a geometric composition (no faces).
const ActivityTile = ({ tone = 'warm', shape = 'a' }) => {
  const tones = {
    warm: ['var(--p2)', 'var(--p1)', 'var(--sun)'],
    cool: ['var(--p3)', 'var(--p4)', 'var(--p2)'],
    sage: ['var(--p3)', 'var(--p2)', 'var(--sun)'],
  };
  const [a, b, c] = tones[tone] || tones.warm;
  const shapes = {
    a: <>
      <rect x="0" y="0" width="200" height="200" fill={a} opacity="0.15"/>
      <circle cx="60" cy="140" r="34" fill={a}/>
      <circle cx="130" cy="90" r="48" fill={b}/>
      <rect x="140" y="130" width="40" height="40" rx="6" fill={c}/>
    </>,
    b: <>
      <rect x="0" y="0" width="200" height="200" fill={b} opacity="0.12"/>
      <path d="M20 180 Q100 20 180 180 Z" fill={a}/>
      <circle cx="100" cy="90" r="20" fill={c}/>
    </>,
    c: <>
      <rect x="0" y="0" width="200" height="200" fill={c} opacity="0.2"/>
      <rect x="40" y="40" width="50" height="50" rx="8" fill={a}/>
      <rect x="110" y="40" width="50" height="50" rx="8" fill={b}/>
      <rect x="40" y="110" width="50" height="50" rx="8" fill={b}/>
      <rect x="110" y="110" width="50" height="50" rx="8" fill={a}/>
    </>,
    d: <>
      <rect x="0" y="0" width="200" height="200" fill={a} opacity="0.12"/>
      <path d="M100 30 L170 170 L30 170 Z" fill={b}/>
      <circle cx="100" cy="130" r="18" fill={c}/>
    </>
  };
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '1/1', background: 'var(--surface)' }}>
      <svg width="100%" height="100%" viewBox="0 0 200 200">{shapes[shape]}</svg>
    </div>
  );
};

// Cute, colorful filled-shape decorations. Filled SVGs (not strokes) so they
// pop against the page — used as background flourishes around the home page.
const ColorIcon = ({ name, size = 40, style = {} }) => {
  const wrap = { width: size, height: size, display: 'inline-block', ...style };
  const Y = 'var(--brand-yellow)';
  const O = 'var(--brand-orange)';
  const G = 'var(--brand-green)';
  const B = 'var(--brand-blue)';
  const P = 'var(--brand-purple)';
  const K = 'var(--brand-pink)';
  const R = 'var(--brand-berry)';

  const icons = {
    sun: (
      <svg viewBox="0 0 64 64" style={wrap}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="30" y="2" width="4" height="10" rx="2" fill={O} transform={`rotate(${i * 30} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="14" fill={Y} />
        <circle cx="27" cy="30" r="1.6" fill={O} />
        <circle cx="37" cy="30" r="1.6" fill={O} />
        <path d="M27 36 Q32 40 37 36" stroke={O} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 64 64" style={wrap}>
        <path d="M32 6 L38 26 L58 26 L42 38 L48 58 L32 46 L16 58 L22 38 L6 26 L26 26 Z" fill={Y} stroke={O} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 64 64" style={wrap}>
        <path d="M32 4 L36 28 L60 32 L36 36 L32 60 L28 36 L4 32 L28 28 Z" fill={Y} />
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 80 64" style={wrap}>
        <ellipse cx="22" cy="40" rx="14" ry="12" fill={B} />
        <ellipse cx="40" cy="32" rx="18" ry="16" fill={B} />
        <ellipse cx="58" cy="40" rx="14" ry="12" fill={B} />
        <ellipse cx="40" cy="44" rx="24" ry="10" fill={B} />
      </svg>
    ),
    rainbow: (
      <svg viewBox="0 0 80 50" style={wrap}>
        <path d="M6 46 A34 34 0 0 1 74 46" fill="none" stroke={R} strokeWidth="6" strokeLinecap="round" />
        <path d="M14 46 A26 26 0 0 1 66 46" fill="none" stroke={O} strokeWidth="6" strokeLinecap="round" />
        <path d="M22 46 A18 18 0 0 1 58 46" fill="none" stroke={Y} strokeWidth="6" strokeLinecap="round" />
        <path d="M30 46 A10 10 0 0 1 50 46" fill="none" stroke={G} strokeWidth="6" strokeLinecap="round" />
      </svg>
    ),
    balloon: (
      <svg viewBox="0 0 50 80" style={wrap}>
        <ellipse cx="25" cy="28" rx="18" ry="22" fill={K} />
        <ellipse cx="19" cy="22" rx="4" ry="6" fill="rgba(255,255,255,0.45)" />
        <polygon points="22,50 28,50 25,55" fill={K} />
        <path d="M25 55 Q20 65 25 78" stroke={R} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
    flower: (
      <svg viewBox="0 0 64 64" style={wrap}>
        {[0, 72, 144, 216, 288].map((a, i) => (
          <ellipse key={i} cx="32" cy="16" rx="9" ry="13" fill={K} transform={`rotate(${a} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="7" fill={Y} />
      </svg>
    ),
    butterfly: (
      <svg viewBox="0 0 70 60" style={wrap}>
        <ellipse cx="20" cy="22" rx="14" ry="12" fill={P} />
        <ellipse cx="50" cy="22" rx="14" ry="12" fill={P} />
        <ellipse cx="22" cy="40" rx="10" ry="9" fill={R} />
        <ellipse cx="48" cy="40" rx="10" ry="9" fill={R} />
        <ellipse cx="35" cy="30" rx="3" ry="14" fill={O} />
        <circle cx="35" cy="16" r="2.5" fill={O} />
        <path d="M33 14 Q30 10 28 8 M37 14 Q40 10 42 8" stroke={O} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
    heartFilled: (
      <svg viewBox="0 0 64 60" style={wrap}>
        <path d="M32 54 C8 38 6 22 18 14 C26 9 32 16 32 22 C32 16 38 9 46 14 C58 22 56 38 32 54 Z" fill={R} />
      </svg>
    ),
    kite: (
      <svg viewBox="0 0 60 80" style={wrap}>
        <polygon points="30,4 54,30 30,58 6,30" fill={G} />
        <line x1="30" y1="4" x2="30" y2="58" stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" />
        <line x1="6" y1="30" x2="54" y2="30" stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" />
        <path d="M30 58 Q26 64 30 70 Q34 76 30 78" stroke={O} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="28" cy="64" r="2" fill={K} />
        <circle cx="32" cy="72" r="2" fill={Y} />
      </svg>
    ),
    leaf: (
      <svg viewBox="0 0 60 60" style={wrap}>
        <path d="M8 52 C8 22 28 6 54 6 C54 30 38 52 8 52 Z" fill={G} />
        <path d="M10 50 Q30 30 52 8" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 60 60" style={wrap}>
        <path d="M44 8 A24 24 0 1 0 44 52 A18 18 0 1 1 44 8 Z" fill={P} />
        <circle cx="22" cy="22" r="1.8" fill={Y} />
        <circle cx="32" cy="38" r="1.4" fill={Y} />
      </svg>
    ),
    paperPlane: (
      <svg viewBox="0 0 64 64" style={wrap}>
        <polygon points="4,32 60,6 50,58 32,42 28,52" fill={B} />
        <polygon points="32,42 50,58 50,30" fill={P} opacity="0.85" />
      </svg>
    ),
  };

  return icons[name] || null;
};

Object.assign(window, { Sunburst, NoorMark, PhotoPlaceholder, SunriseGraphic, Icon, ActivityTile, ColorIcon });
