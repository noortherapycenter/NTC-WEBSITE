// Home page

const Hero = () => (
  <section className="hero-section" style={{position:'relative', paddingTop:80, paddingBottom:60, overflow:'hidden'}}>
    {/* Decorative floating shapes (logo DNA) */}
    <svg className="hero-decor" style={{position:'absolute', top:40, right:'4%', width:90, height:90, opacity:0.9, zIndex:0}} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="35" fill="var(--brand-yellow)"/>
      {Array.from({length:12}).map((_,i)=>(
        <rect key={i} x="48" y="4" width="4" height="10" rx="2" fill="var(--brand-orange)" transform={`rotate(${i*30} 50 50)`}/>
      ))}
    </svg>
    <div className="hero-decor" style={{position:'absolute', top:60, left:'3%', width:32, height:32, borderRadius:'50%', background:'var(--brand-purple)', opacity:0.35, zIndex:0}}/>
    <div className="hero-decor" style={{position:'absolute', bottom:'30%', right:'3%', width:20, height:20, borderRadius:'50%', background:'var(--brand-berry)', opacity:0.6, zIndex:0}}/>
    <div className="hero-decor" style={{position:'absolute', top:180, left:'8%', zIndex:0, transform:'rotate(-12deg)'}}><ColorIcon name="cloud" size={72}/></div>
    <div className="hero-decor" style={{position:'absolute', top:220, right:'10%', zIndex:0, transform:'rotate(14deg)'}}><ColorIcon name="butterfly" size={58}/></div>
    <div className="hero-decor" style={{position:'absolute', bottom:'12%', left:'6%', zIndex:0, transform:'rotate(-8deg)'}}><ColorIcon name="balloon" size={64}/></div>
    <div className="hero-decor" style={{position:'absolute', top:'50%', left:'2%', zIndex:0}}><ColorIcon name="sparkle" size={28}/></div>
    <div className="hero-decor" style={{position:'absolute', top:'30%', right:'2%', zIndex:0}}><ColorIcon name="sparkle" size={22}/></div>
    <svg className="hero-decor" style={{position:'absolute', bottom:'-10%', left:'-5%', width:200, height:200, opacity:0.2, zIndex:0}} viewBox="0 0 100 100">
      <polygon points="50,15 85,85 15,85" fill="var(--brand-orange)"/>
    </svg>

    <div className="container" style={{position:'relative'}}>
      <div style={{maxWidth:900, margin:'0 auto', textAlign:'center'}}>
        <div className="tag" style={{background:'var(--surface)', marginBottom:28}}>
          <span className="dot" style={{background:'var(--brand-green)'}}/>
          Now accepting intakes
        </div>
        <h1 style={{marginBottom:64, fontFamily:"'Fraunces',Georgia,serif", fontWeight:500, letterSpacing:'-0.02em'}}>
          Care that helps every child's<br className="hero-title-break"/>
          <span style={{fontStyle:'italic', color:'var(--brand-green)', fontWeight:600, position:'relative'}}>
            light shine bright
            <svg style={{position:'absolute', left:'-8%', bottom:-20, width:'116%', height:18}} viewBox="0 0 400 18" preserveAspectRatio="none">
              <path d="M2,12 Q100,2 200,8 T398,6" stroke="var(--brand-yellow)" strokeWidth="6" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
          <span style={{color:'var(--brand-green)'}}>.</span>
        </h1>
        <p className="hero-sub" style={{fontSize:21, color:'var(--ink-soft)', maxWidth:680, margin:'24px auto 36px', lineHeight:1.5}}>
          Noor Therapy Center provides ABA, speech, and occupational therapy for children across Minnesota — in your home and at our St. Louis Park center. Play-based, family-first, and focused on what each child needs to thrive.
        </p>
        <div style={{display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginBottom:40}}>
          <button className="btn btn-big" style={{background:'var(--brand-green)', color:'#fff'}} onClick={()=>window.navigate('contact')}>
            Request an intake
            <Icon name="arrow" size={18}/>
          </button>
          <button className="btn btn-big btn-ghost" onClick={()=>window.navigate('families')}>
            How it works
          </button>
        </div>
        <div className="hero-trust" style={{display:'flex', gap:32, justifyContent:'center', flexWrap:'wrap', fontSize:14, color:'var(--ink-soft)', fontWeight:600}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}><Icon name="shield" size={18} color="var(--brand-green)"/> BCBA-led teams</div>
          <div style={{display:'flex', alignItems:'center', gap:8}}><Icon name="heart" size={18} color="var(--brand-berry)"/> Data-driven care</div>
          <div style={{display:'flex', alignItems:'center', gap:8}}><Icon name="check" size={18} color="var(--brand-blue)"/> No waitlist</div>
        </div>
      </div>

      {/* Hero imagery grid */}
      <div className="hero-imagery-grid" style={{marginTop:48, display:'grid', gridTemplateColumns:'1.2fr 1fr 1.2fr', gap:16, gridAutoRows:'180px'}}>
        <img src="assets/hero-highfive.jpg" alt="Therapist and child high-five during a learning session"
             style={{gridRow:'span 2', width:'100%', height:'100%', objectFit:'cover', borderRadius:'var(--radius-lg)', border:'1px solid var(--line)'}}/>
        <img src="assets/hero-aba3.webp" alt="Child engaged in ABA therapy activity"
             style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'var(--radius-lg)', border:'1px solid var(--line)'}}/>
        <img src="assets/hero-teacher-student.jpg" alt="Teacher working one-on-one with a student"
             style={{gridRow:'span 2', width:'100%', height:'100%', objectFit:'cover', borderRadius:'var(--radius-lg)', border:'1px solid var(--line)'}}/>
        <img src="assets/hero-emotions.png" alt="Clinician using emotion cards with a child"
             style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'var(--radius-lg)', border:'1px solid var(--line)'}}/>
      </div>
    </div>
  </section>
);

const Ticker = () => (
  <div className="ticker">
    <div className="ticker-track">
      {Array.from({length:2}).map((_,k)=>(
        <React.Fragment key={k}>
          {['In-home ABA','Center-based','Part-time ABA','Full-time ABA (Early Intervention)','Speech therapy','Occupational therapy','Parent training'].map((t,i)=>(
            <span key={i} className="ticker-item">
              <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="var(--brand-yellow)"/></svg>
              {t}
            </span>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const ServicesGrid = () => {
  // colorful flourishes sit behind the section heading

  // Two groupings: where care happens, and what type of program.
  const modalities = [
    { icon:'home', title:'In-home', desc:'A BCBA and BT/RBT come to your home — therapy where life actually happens.', color:'var(--brand-orange)' },
    { icon:'center', title:'Center-based', desc:'Sensory-thoughtful therapy rooms, peer interaction, and structured transitions at our St. Louis Park center.', color:'var(--brand-green)' },
  ];
  const programs = [
    { icon:'clipboard', title:'Part-time ABA', tag:'Part-time \u00b7 ~20 hrs/week', desc:'Targeted skill-building and behavior reduction. Pairs well with school, speech, and OT — works around the rest of your child\u2019s life.', color:'var(--brand-purple)' },
    { icon:'spark', title:'Full-time ABA', tag:'Full-time \u00b7 ~40 hrs/week', desc:'All-encompassing early intervention: ABA plus integrated speech, OT, NET, and community engagement under one coordinated plan.', color:'var(--brand-berry)' },
    { icon:'family', title:'Parent training', tag:'Caregivers \u00b7 8-week curriculum', desc:'You learn the strategies your team is using \u2014 so progress at the table becomes progress at home.', color:'var(--brand-blue)' },
    { icon:'speech', title:'Speech therapy', tag:'Standalone or paired', desc:'SLPs working on AAC, articulation, expressive/receptive language, and social/pragmatic communication.', color:'var(--brand-pink)' },
    { icon:'hands', title:'Occupational therapy', tag:'Standalone or paired', desc:'OTs targeting sensory regulation, fine motor, feeding, and daily living skills.', color:'var(--brand-orange)' },
  ];
  const Card = ({ s }) => (
    <div className="card service-mini" style={{padding:22, cursor:'pointer', background:'var(--bg)', ['--card-color']: s.color}}
         onClick={()=>window.navigate('services')}>
      <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:10}}>
        <div style={{width:40, height:40, borderRadius:12, background:`color-mix(in srgb, ${s.color} 16%, transparent)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
          <Icon name={s.icon} size={20} color={s.color}/>
        </div>
        <h4 style={{fontFamily:"'DM Sans',sans-serif", fontSize:19, fontWeight:600, margin:0, lineHeight:1.15}}>{s.title}</h4>
      </div>
      {s.tag && <div className="mono" style={{color:s.color, fontSize:11, marginBottom:8}}>{s.tag}</div>}
      <p style={{color:'var(--ink-soft)', fontSize:14, marginBottom:12, lineHeight:1.5}}>{s.desc}</p>
      <div style={{fontSize:12, fontWeight:700, color:s.color, display:'inline-flex', alignItems:'center', gap:6}}>
        Learn more <Icon name="arrow" size={12}/>
      </div>
    </div>
  );
  return (
    <section className="section" id="services-home">
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, gap:40, flexWrap:'wrap'}}>
          <div style={{maxWidth:560}}>
            <div className="eyebrow">Services</div>
            <h2>What we offer.</h2>
          </div>
          <div style={{display:'flex', alignItems:'flex-end', gap:14}}>
            <ColorIcon name="flower" size={48}/>
          </div>
        </div>

        <div className="mono" style={{color:'var(--ink-soft)', marginBottom:14}}>Where care happens</div>
        <div className="grid grid-2" style={{marginBottom:48}}>
          {modalities.map((s,i)=><Card key={i} s={s}/>)}
        </div>

        <div className="mono" style={{color:'var(--ink-soft)', marginBottom:14}}>What kind of service</div>
        <div className="grid grid-3">
          {programs.map((s,i)=><Card key={i} s={s}/>)}
        </div>
      </div>
    </section>
  );
};

const ApproachBand = () => (
  <section className="section approach-band" style={{background:'var(--brand-green)', color:'#fff', borderRadius:'0', padding:'120px 0', position:'relative', overflow:'hidden'}}>
    {/* Sun in the corner */}
    <svg className="approach-band-decor" style={{position:'absolute', top:'-60px', right:'-60px', width:300, height:300, opacity:0.25}} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="var(--brand-yellow)"/>
      {Array.from({length:16}).map((_,i)=>(
        <rect key={i} x="48" y="2" width="4" height="12" fill="var(--brand-yellow)" transform={`rotate(${i*22.5} 50 50)`}/>
      ))}
    </svg>
    {/* extra decorations */}
    <div className="approach-band-decor" style={{position:'absolute', bottom:30, left:30, opacity:0.55, transform:'rotate(-8deg)'}}><ColorIcon name="kite" size={90}/></div>
    <div className="approach-band-decor" style={{position:'absolute', top:'40%', left:'45%', opacity:0.35}}><ColorIcon name="sparkle" size={24}/></div>
    <div className="container" style={{position:'relative'}}>
      <div style={{maxWidth:800, marginBottom:64}}>
        <div className="eyebrow" style={{color:'var(--brand-yellow)'}}>Our approach</div>
        <h2 style={{color:'#fff', fontWeight:400}}>
          We don't treat children like a problem to solve. We meet them where they are — and we walk alongside the whole family.
        </h2>
      </div>
      <div className="grid grid-3" style={{gap:32}}>
        {[
          { n:'01', t:'Traditional, data-driven ABA', d:'Every program is built on measurable goals, continuous data collection, and evidence-based teaching procedures rooted in the science of Applied Behavior Analysis.'},
          { n:'02', t:'Family at the center', d:'Parents set the priorities. We bring the clinical tools. Every treatment plan is individualized around the goals that matter to your family.'},
          { n:'03', t:'Culturally grounded', d:'We honor your home\'s traditions, language, food, and routines as part of care. Your family\'s way of doing things belongs in the plan.'},
        ].map((b, i) => (
          <div key={i} style={{borderTop:'1px solid rgba(255,255,255,0.25)', paddingTop:24}}>
            <div style={{fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:42, color:'var(--brand-yellow)', marginBottom:12}}>{b.n}</div>
            <h3 style={{color:'#fff', marginBottom:10}}>{b.t}</h3>
            <p style={{color:'rgba(255,255,255,0.85)'}}>{b.d}</p>
          </div>
        ))}
      </div>
      <div style={{marginTop:56}}>
        <button className="btn btn-big" style={{background:'var(--brand-yellow)', color:'var(--ink)'}} onClick={()=>window.navigate('approach')}>
          Read our full philosophy <Icon name="arrow" size={18}/>
        </button>
      </div>
    </div>
  </section>
);

const JourneySection = () => {
  const steps = [
    { w:'Day 1',     t:'Reach out',         d:'Intake coordinator calls you back within one business day, in your language.', c:'var(--brand-orange)'},
    { w:'Days 2–3', t:'Benefits verified',  d:'We confirm your Medicaid or MCO coverage and send a written summary.',         c:'var(--brand-blue)'},
    { w:'Days 4–7', t:'CMDE',          d:'A qualified provider conducts the Comprehensive Multi-Disciplinary Evaluation — the formal evaluation MN Medicaid requires for EIDBI.', c:'var(--brand-purple)'},
    { w:'Days 8–11',t:'ITP', d:'BCBA + caregiver prioritize 6‑month goals; FBAs and observations inform the plan.', c:'var(--brand-berry)'},
    { w:'Days 12–13',t:'Team match',       d:'We pair the right BT/RBT and brief them on your child before day one.',         c:'var(--brand-green)'},
    { w:'Day 14',    t:'Sessions begin',    d:'First session with your team — supervised by your BCBA.',                       c:'var(--brand-pink)'},
  ];
  return (
    <section className="section">
      <div className="container">
        <div style={{textAlign:'center', maxWidth:720, margin:'0 auto 56px', position:'relative'}}>
          <div style={{position:'absolute', right:'-6%', top:-20, transform:'rotate(10deg)'}} className="hero-decor"><ColorIcon name="star" size={48}/></div>
          <div className="eyebrow">Getting started</div>
          <h2>From first call to first session in about two weeks.</h2>
        </div>
        <div className="home-journey-grid" style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:14}}>
          {steps.map((s,i)=>(
            <div key={i} className="home-journey-step card" style={{padding:'22px 18px', textAlign:'left', background:'var(--bg)', position:'relative'}}>
              <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:14}}>
                <div style={{width:34, height:34, borderRadius:'50%', background:s.c, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif", fontSize:16, fontWeight:600, flexShrink:0}}>{i+1}</div>
                <div className="mono" style={{color:s.c, fontSize:11}}>{s.w}</div>
              </div>
              <h4 style={{fontFamily:"'DM Sans',sans-serif", fontSize:18, fontWeight:600, marginBottom:6, lineHeight:1.2}}>{s.t}</h4>
              <p style={{color:'var(--ink-soft)', fontSize:13, lineHeight:1.45}}>{s.d}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center', marginTop:36}}>
          <button className="btn btn-ghost" onClick={()=>window.navigate('families')}>
            See the full timeline <Icon name="arrow" size={14}/>
          </button>
        </div>
      </div>
    </section>
  );
};

const LocationsBand = () => (
  <section className="section-sm">
    <div className="container">
      <div className="grid grid-2" style={{gap:32, alignItems:'start'}}>
        {/* In-home */}
        <div className="card location-split" style={{padding:0, overflow:'hidden', position:'relative', background:'var(--brand-orange)', color:'#fff', borderColor:'transparent'}}>
          <div style={{position:'absolute', top:-18, right:-18, opacity:0.7, zIndex:0}}><ColorIcon name="sun" size={110}/></div>
          <div className="location-split-inner" style={{position:'relative', zIndex:1}}>
            <div style={{padding:32, display:'flex', flexDirection:'column'}}>
              <Icon name="home" size={28} color="#fff"/>
              <h3 style={{color:'#fff', marginTop:16, marginBottom:10}}>In-home therapy</h3>
              <p style={{color:'rgba(255,255,255,0.92)', marginBottom:18, fontSize:15}}>Your BCBA and BT/RBT come to you across the Twin Cities metro — morning, afternoon, and after‑school hours.</p>
              <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                {['Minneapolis','St. Paul','Bloomington','Brooklyn Park','Eden Prairie','Edina','Roseville','Burnsville'].map(c => (
                  <span key={c} style={{padding:'3px 10px', background:'rgba(255,255,255,0.2)', borderRadius:999, fontSize:12, fontWeight:600}}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center */}
        <div className="card location-split" style={{padding:0, overflow:'hidden', position:'relative', background:'var(--brand-purple)', color:'#fff', borderColor:'transparent'}}>
          <div style={{position:'absolute', bottom:-12, right:-12, opacity:0.7, zIndex:0}}><ColorIcon name="moon" size={100}/></div>
          <div style={{position:'absolute', top:18, right:60, opacity:0.6, zIndex:0}}><ColorIcon name="sparkle" size={22}/></div>
          <div className="location-split-inner" style={{position:'relative', zIndex:1}}>
            <div style={{padding:32, display:'flex', flexDirection:'column'}}>
              <Icon name="center" size={28} color="#fff"/>
              <h3 style={{color:'#fff', marginTop:16, marginBottom:10}}>Our St. Louis Park center</h3>
              <p style={{color:'rgba(255,255,255,0.92)', marginBottom:18, fontSize:15}}>A welcoming, sensory‑thoughtful space designed for focused therapy and coordinated family care.</p>
              <div style={{fontSize:14, color:'rgba(255,255,255,0.92)'}}>
                6250 Excelsior Blvd, Suite 102<br/>St. Louis Park, MN 55416<br/><span style={{fontWeight:700}}>Open Mon–Sun · 8am–6pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HomeTestimonial = () => (
  <section className="section" style={{position:'relative'}}>
    <div className="hero-decor" style={{position:'absolute', top:60, left:'8%'}}><ColorIcon name="heartFilled" size={42}/></div>
    <div className="hero-decor" style={{position:'absolute', top:120, right:'10%', transform:'rotate(15deg)'}}><ColorIcon name="leaf" size={56}/></div>
    <div className="hero-decor" style={{position:'absolute', bottom:40, left:'12%', transform:'rotate(-10deg)'}}><ColorIcon name="flower" size={48}/></div>
    <div className="container-sm" style={{textAlign:'center', position:'relative'}}>
      <svg width="40" height="40" viewBox="0 0 40 40" style={{marginBottom:20}}>
        <text x="0" y="32" fontFamily="DM Sans" fontSize="60" fill="var(--brand-yellow)" fontWeight="600">"</text>
      </svg>
      <h2 style={{fontWeight:400, fontStyle:'italic', marginBottom:32, lineHeight:1.2}}>
        Three months in, our son is asking for snacks with full sentences. We cried when he said "I want apple, please."
      </h2>
      <div style={{display:'flex', alignItems:'center', gap:14, justifyContent:'center'}}>
        <div style={{width:48, height:48, borderRadius:'50%', background:'var(--brand-green)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:20}}>K</div>
        <div style={{textAlign:'left'}}>
          <div style={{fontWeight:700}}>Khadija B.</div>
          <div style={{fontSize:14, color:'var(--ink-soft)'}}>Parent · St. Paul</div>
        </div>
      </div>
      <div style={{marginTop:32}}>
        <button className="btn btn-ghost" onClick={()=>window.navigate('testimonials')}>
          Read more family stories <Icon name="arrow" size={16}/>
        </button>
      </div>
    </div>
  </section>
);

const InsuranceBand = () => (
  <section className="section-sm">
    <div className="container">
      <div className="card" style={{padding:48, background:'var(--brand-yellow)', borderColor:'transparent'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:40, alignItems:'center'}}>
          <div>
            <div className="eyebrow" style={{color:'var(--ink)'}}>Insurance</div>
            <h2 style={{marginBottom:16, fontSize:40}}>We accept MN Medicaid today — and more coming soon.</h2>
            <p style={{color:'var(--ink-soft)', fontSize:17, marginBottom:24}}>
              Currently in-network with Minnesota Medicaid. Actively credentialing with Blue Cross Blue Shield of MN, HealthPartners, Medica, and Hennepin Health — we'll update this page as each goes live.
            </p>
            <button className="btn" style={{background:'var(--ink)', color:'var(--brand-yellow)'}} onClick={()=>window.navigate('contact')}>
              Verify benefits with us <Icon name="arrow" size={16}/>
            </button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            {[
              { n:'MN Medicaid', status:'Accepting' },
              { n:'Blue Cross MN', status:'In credentialing' },
              { n:'HealthPartners', status:'In credentialing' },
              { n:'Medica', status:'In credentialing' },
              { n:'Hennepin Health', status:'In credentialing' },
              { n:'UCare', status:'Coming soon' },
            ].map((p,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.7)', padding:16, borderRadius:14}}>
                <div style={{fontWeight:700, fontSize:14, marginBottom:4}}>{p.n}</div>
                <div style={{fontSize:12, color:'var(--ink-soft)', display:'flex', alignItems:'center', gap:6}}>
                  <span style={{width:6, height:6, borderRadius:'50%', background: p.status==='Accepting'?'var(--brand-green)':'var(--brand-orange)'}}/>
                  {p.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HomePage = () => (
  <div>
    <Hero/>
    <Ticker/>
    <ServicesGrid/>
    <ApproachBand/>
    <JourneySection/>
    <LocationsBand/>
    <HomeTestimonial/>
    <ClosingCTA/>
  </div>
);

const ClosingCTA = () => (
  <section className="section">
    <div className="container">
      <div style={{background:'var(--brand-green)', borderRadius:'var(--radius-lg)', padding:'80px 48px', color:'#fff', textAlign:'center', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', top:-40, left:-40, width:160, height:160, borderRadius:'50%', background:'var(--brand-yellow)', opacity:0.5}}/>
        <div style={{position:'absolute', bottom:-60, right:-60, width:200, height:200, borderRadius:'50%', background:'var(--brand-orange)', opacity:0.4}}/>
        <div style={{position:'absolute', top:20, right:48, opacity:0.85}}><ColorIcon name="butterfly" size={56}/></div>
        <div style={{position:'absolute', bottom:24, left:40, opacity:0.9, transform:'rotate(-12deg)'}}><ColorIcon name="balloon" size={58}/></div>
        <div style={{position:'absolute', top:40, left:'42%', opacity:0.7}}><ColorIcon name="sparkle" size={20}/></div>
        <div style={{position:'relative'}}>
          <h2 style={{color:'#fff', fontWeight:400, marginBottom:20, maxWidth:680, margin:'0 auto 20px'}}>Ready to start? Most intakes finish in under 15 minutes.</h2>
          <p style={{color:'rgba(255,255,255,0.9)', marginBottom:32, maxWidth:520, margin:'0 auto 32px', fontSize:18}}>
            Tell us about your child, and we'll take it from there. Our intake coordinators follow up within one business day.
          </p>
          <div style={{display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap'}}>
            <button className="btn btn-big" style={{background:'var(--brand-yellow)', color:'var(--ink)'}} onClick={()=>window.navigate('contact')}>
              Request an intake
            </button>
            <button className="btn btn-big" style={{background:'transparent', border:'1.5px solid rgba(255,255,255,0.5)', color:'#fff'}}>
              <Icon name="phone" size={16}/> (612) 703-9022
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

Object.assign(window, { HomePage, Hero, Ticker, ServicesGrid, ApproachBand, JourneySection, LocationsBand, HomeTestimonial, InsuranceBand, ClosingCTA });
