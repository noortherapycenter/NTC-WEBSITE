// Service Areas page — SEO landing content for every Twin Cities metro suburb we serve.
// Each city has unique intro copy, nearby neighborhoods, and a local CTA.

const CITIES = [
  { slug:'minneapolis', n:'Minneapolis', zips:'55401–55488', drive:'15 min from our center', pop:'429,954', hook:'Minnesota\'s largest city and home to many of our in-home families. Our clinicians travel to homes across North, South, Northeast, and downtown Minneapolis daily.', nb:['Uptown','Northeast','Powderhorn','Phillips','Cedar-Riverside','Lake Street','Camden','Longfellow']},
  { slug:'st-paul', n:'St. Paul', zips:'55101–55130', drive:'20 min from our center', pop:'311,527', hook:'Serving families across the capital city with in-home ABA. Our team works cloosely with SPPS and local pediatricians.', nb:['Frogtown','Payne-Phalen','Highland Park','Summit Hill','West Side','North End','East Side','Macalester-Groveland']},
  { slug:'st-louis-park', n:'St. Louis Park', zips:'55416, 55426', drive:'At our center', pop:'49,751', hook:'Our flagship center is here at 6250 Excelsior Blvd. Families across St. Louis Park can walk in for sessions, consultations, and parent training.', nb:['Excelsior & Grand','Texa-Tonka','Lenox','Minikahda Vista','Fern Hill','Eliot','Sorensen']},
  { slug:'edina', n:'Edina', zips:'55410, 55424, 55435, 55436, 55439', drive:'10 min from our center', pop:'53,494', hook:'In-home and center-based ABA for Edina families. Strong partnerships with Edina Public Schools and local pediatric clinics.', nb:['Morningside','50th & France','Southdale','Cahill','Pamela Park','Countryside','Concord']},
  { slug:'bloomington', n:'Bloomington', zips:'55420, 55425, 55431, 55437, 55438', drive:'12 min from our center', pop:'89,987', hook:'In-home ABA across Bloomington\'s neighborhoods, plus easy center access for families near I-494 and the Mall of America area.', nb:['East Bloomington','West Bloomington','Penn Lake','Valley View','Bryant Avenue','Oxboro']},
  { slug:'richfield', n:'Richfield', zips:'55423', drive:'10 min from our center', pop:'36,994', hook:'Close-in service for Richfield families. In-home sessions across all Richfield neighborhoods plus quick center access.', nb:['Hiawatha','East Richfield','West Richfield','Portland','Woodlake']},
  { slug:'golden-valley', n:'Golden Valley', zips:'55416, 55422, 55427', drive:'8 min from our center', pop:'22,552', hook:'One of our nearest neighbor cities. Quick center trips or in-home sessions for Golden Valley families.', nb:['Valley Square','North Tyrol','Calvary','Glenwood','Meadowbrook']},
  { slug:'hopkins', n:'Hopkins', zips:'55343, 55305', drive:'10 min from our center', pop:'19,101', hook:'In-home and center-based ABA for Hopkins families. We partner with Hopkins Public Schools on transition planning.', nb:['Downtown Hopkins','Interlachen Park','Peaceful Valley','Westbrooke']},
  { slug:'minnetonka', n:'Minnetonka', zips:'55305, 55343, 55345, 55391', drive:'15 min from our center', pop:'53,781', hook:'In-home ABA across Minnetonka\'s neighborhoods with easy access to our St. Louis Park center.', nb:['Ridgedale','Glen Lake','Tonka Bay','Deephaven','Groveland','Minnetonka Beach']},
  { slug:'plymouth', n:'Plymouth', zips:'55441, 55442, 55446, 55447, 55469', drive:'20 min from our center', pop:'79,768', hook:'In-home ABA for one of Minnesota\'s fastest-growing suburbs. Our clinicians travel across Plymouth daily.', nb:['Bass Lake','Parkers Lake','Medicine Lake','Sunset Hills','Kingsview','Greenwood']},
  { slug:'eden-prairie', n:'Eden Prairie', zips:'55344, 55346, 55347', drive:'18 min from our center', pop:'64,198', hook:'In-home ABA and center-based services for Eden Prairie families. Strong school-district coordination.', nb:['Eden Lake','Mitchell Lake','Duck Lake','Settlers Ridge','Purgatory Creek']},
  { slug:'brooklyn-park', n:'Brooklyn Park', zips:'55428, 55443, 55444, 55445, 55487', drive:'20 min from our center', pop:'86,478', hook:'In-home ABA serving Brooklyn Park\'s diverse community, with bilingual intake support for Somali and Spanish-speaking families.', nb:['Brookdale','Oak Grove','Riverview','Willow Lane','Edinburgh']},
  { slug:'brooklyn-center', n:'Brooklyn Center', zips:'55429, 55430', drive:'18 min from our center', pop:'33,782', hook:'In-home ABA for Brooklyn Center families, with dedicated cultural and language matching.', nb:['Shingle Creek','Earle Brown','Riverdale','Palmer Lake']},
  { slug:'roseville', n:'Roseville', zips:'55113', drive:'20 min from our center', pop:'36,252', hook:'In-home ABA across Roseville with easy freeway access to our center for family consultations.', nb:['Rosedale','Central Park','Cleveland','Fairview','Falcon Heights']},
  { slug:'maplewood', n:'Maplewood', zips:'55109, 55117, 55119', drive:'25 min from our center', pop:'42,088', hook:'In-home ABA serving Maplewood\'s east-metro families, with dedicated parent coaching available.', nb:['Maplewood Mall','Beaver Lake','Hillside','Gladstone']},
  { slug:'burnsville', n:'Burnsville', zips:'55306, 55337', drive:'25 min from our center', pop:'64,317', hook:'In-home ABA serving Burnsville and south-metro families. Early intervention programs are especially strong here.', nb:['Burnsville Center','Heart of the City','Nicols','Southcross']},
  { slug:'eagan', n:'Eagan', zips:'55121, 55122, 55123', drive:'25 min from our center', pop:'68,855', hook:'In-home ABA across Eagan with center trips available for families near I-35E.', nb:['Eagan Central','Cedarvale','Lexington','Patrick Eagan','Blackhawk']},
  { slug:'apple-valley', n:'Apple Valley', zips:'55124', drive:'30 min from our center', pop:'56,374', hook:'In-home ABA for Apple Valley families, with parent coaching for routine support.', nb:['Galaxie','Cobblestone Lake','Valley Middle','Hidden Ponds']},
  { slug:'woodbury', n:'Woodbury', zips:'55125, 55129', drive:'30 min from our center', pop:'75,102', hook:'In-home ABA across Woodbury with strong coordination with South Washington County Schools.', nb:['Tamarack','Powers Lake','Bielenberg','Carver Lake','Ojibway']},
  { slug:'shakopee', n:'Shakopee', zips:'55379', drive:'30 min from our center', pop:'43,698', hook:'In-home ABA for Shakopee families, with parent coaching between visits.', nb:['Valleyfair','Eagle Creek','Prior Lake border','Downtown Shakopee']},
  { slug:'maple-grove', n:'Maple Grove', zips:'55311, 55369', drive:'25 min from our center', pop:'71,081', hook:'In-home ABA for Maple Grove families, with our clinicians traveling across the northwest metro weekly.', nb:['Arbor Lakes','Rush Creek','Weaver Lake','Elm Creek']},
  { slug:'coon-rapids', n:'Coon Rapids', zips:'55433, 55448', drive:'30 min from our center', pop:'63,599', hook:'In-home ABA serving Coon Rapids and the north metro, with parent coaching for parent coaching.', nb:['Riverdale','Northdale','Coon Creek','Sand Creek']},
  { slug:'blaine', n:'Blaine', zips:'55434, 55449', drive:'30 min from our center', pop:'70,222', hook:'In-home ABA for Blaine families with partnerships with Anoka-Hennepin Schools.', nb:['Lakes','Village','Airport','Sunrise']},
  { slug:'lakeville', n:'Lakeville', zips:'55044', drive:'35 min from our center', pop:'69,490', hook:'In-home ABA for Lakeville and the far south metro. Parent coaching available.', nb:['Downtown Lakeville','Airlake','Crystal Lake','Orchard Lake']},
  { slug:'new-hope', n:'New Hope', zips:'55427, 55428', drive:'12 min from our center', pop:'21,066', hook:'One of our close-in neighbors. In-home or center-based ABA for New Hope families.', nb:['Meadow Lake','Sunnyside','Northwood','Civic Center']},
  { slug:'crystal', n:'Crystal', zips:'55422, 55428, 55429', drive:'15 min from our center', pop:'23,330', hook:'In-home and center-based ABA for Crystal families. Short drives to our St. Louis Park center.', nb:['Crystal Airport','Bassett Creek','Forest','Broadway-Cavell']},
  { slug:'robbinsdale', n:'Robbinsdale', zips:'55422', drive:'12 min from our center', pop:'14,646', hook:'In-home ABA for Robbinsdale families, with strong connections to Robbinsdale Area Schools.', nb:['Downtown Robbinsdale','Triangle','Crystal Lake','Lakeview Terrace']},
  { slug:'fridley', n:'Fridley', zips:'55432', drive:'20 min from our center', pop:'29,590', hook:'In-home ABA serving Fridley families with bilingual intake and flexible scheduling.', nb:['Moore Lake','Innsbruck','Springbrook','Commons Park']},
  { slug:'columbia-heights', n:'Columbia Heights', zips:'55421', drive:'22 min from our center', pop:'21,817', hook:'In-home ABA for Columbia Heights families. Parent coaching available for routine support.', nb:['Hilltop','Huset Park','Silver Lake','Sheffield']},
  { slug:'inver-grove-heights', n:'Inver Grove Heights', zips:'55076, 55077', drive:'28 min from our center', pop:'35,869', hook:'In-home ABA for IGH families, with flexible scheduling for geographic flexibility.', nb:['Pine Bend','Cahill Lake','Rich Valley','South Grove']},
];

const AreasPage = () => {
  const [focus, setFocus] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const filtered = CITIES.filter(c => c.n.toLowerCase().includes(search.toLowerCase()));

  if (focus) {
    const c = focus;
    return (
      <div>
        <PageHero eyebrow={`ABA Therapy in ${c.n}, MN`}
          title={`Noor Therapy Center serves ${c.n} families.`}
          sub={c.hook}/>
        <section className="section-sm">
          <div className="container">
            <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:40}}>
              <div>
                <h3 style={{fontFamily:"'DM Sans',sans-serif", marginBottom:16, fontSize:28}}>ABA therapy services in {c.n}</h3>
                <p style={{color:'var(--ink-soft)', fontSize:17, marginBottom:16, lineHeight:1.6}}>Noor Therapy Center provides comprehensive Applied Behavior Analysis (ABA) therapy for children and teens with autism across {c.n}, Minnesota. Whether your child is newly diagnosed or transitioning from another provider, our BCBA-led team can meet you where you are — in your home, at our St. Louis Park center, or over telehealth.</p>
                <p style={{color:'var(--ink-soft)', fontSize:17, marginBottom:16, lineHeight:1.6}}>Our in-home ABA therapists travel to {c.n} daily. We serve all neighborhoods ({c.nb.slice(0,4).join(', ')}, and more) and coordinate with local pediatricians and school districts for seamless care.</p>
                <p style={{color:'var(--ink-soft)', fontSize:17, marginBottom:32, lineHeight:1.6}}>We accept Minnesota Medicaid and are actively credentialing with major commercial plans. <strong style={{color:'var(--ink)'}}>No waitlist</strong> — care begins within two weeks of your first call.</p>

                <h4 style={{fontFamily:"'DM Sans',sans-serif", fontSize:22, marginBottom:12, marginTop:32}}>Services available in {c.n}</h4>
                <ul style={{display:'grid', gap:8, padding:0, listStyle:'none'}}>
                  {['In-home ABA therapy','Center-based ABA therapy at our St. Louis Park location','Early intervention (ages 0–5)','Speech-language therapy','Occupational therapy','Parent training programs'].map(s => (
                    <li key={s} style={{display:'flex', gap:10, alignItems:'flex-start', fontSize:16, color:'var(--ink-soft)'}}>
                      <Icon name="check" size={18} color="var(--brand-green)"/> {s}
                    </li>
                  ))}
                </ul>

                <h4 style={{fontFamily:"'DM Sans',sans-serif", fontSize:22, marginBottom:12, marginTop:32}}>{c.n} neighborhoods we serve</h4>
                <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                  {c.nb.map(n => <span key={n} style={{padding:'6px 14px', background:'var(--surface)', border:'1px solid var(--line)', borderRadius:999, fontSize:13, fontWeight:600}}>{n}</span>)}
                </div>
              </div>

              <div style={{display:'grid', gap:16, alignContent:'flex-start', position:'sticky', top:100}}>
                <div className="card" style={{padding:28, background:'var(--brand-green)', color:'#fff', borderColor:'transparent'}}>
                  <h4 style={{color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:22, marginBottom:8}}>Start intake for {c.n}</h4>
                  <p style={{color:'rgba(255,255,255,0.9)', fontSize:14, marginBottom:20}}>A {c.n}-area intake coordinator will call you within one business day.</p>
                  <button className="btn" style={{background:'var(--brand-yellow)', color:'var(--ink)', width:'100%'}} onClick={()=>window.navigate('contact')}>Start intake <Icon name="arrow" size={14}/></button>
                </div>
                <div className="card" style={{padding:28}}>
                  <div className="mono" style={{color:'var(--ink-soft)', marginBottom:8}}>Quick facts</div>
                  <div style={{display:'grid', gap:10, fontSize:14}}>
                    <div><strong>ZIP codes:</strong> {c.zips}</div>
                    <div><strong>Drive to center:</strong> {c.drive}</div>
                    <div><strong>Population:</strong> {c.pop}</div>
                    <div><strong>Service types:</strong> In-home and center-based</div>
                  </div>
                </div>
                <div className="card" style={{padding:24}}>
                  <div className="mono" style={{color:'var(--ink-soft)', marginBottom:8}}>Call us directly</div>
                  <div style={{fontSize:20, fontWeight:700, color:'var(--brand-green)'}}>(612) 703-9022</div>
                  <div style={{fontSize:13, color:'var(--ink-soft)', marginTop:4}}>Mon–Sun · 8am–6pm</div>
                </div>
              </div>
            </div>

            <div style={{marginTop:60}}>
              <button className="btn btn-ghost" onClick={()=>setFocus(null)}>← All service areas</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero eyebrow="Service areas"
        title="ABA therapy across the entire Twin Cities metro."
        sub="We serve 30+ cities across Hennepin, Ramsey, Dakota, Anoka, Scott, Carver, and Washington counties. Pick your city for local service details, or call (612) 703-9022."/>
      <section className="section-sm">
        <div className="container">
          <div style={{marginBottom:32, maxWidth:480}}>
            <input type="text" placeholder="Search your city..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{width:'100%', padding:'14px 18px', borderRadius:12, border:'1.5px solid var(--line)', background:'var(--surface)', fontFamily:'inherit', fontSize:16}}/>
          </div>
          <div className="grid grid-3">
            {filtered.map((c, i) => {
              const palette = ['var(--brand-green)','var(--brand-orange)','var(--brand-blue)','var(--brand-purple)','var(--brand-berry)','var(--brand-pink)'];
              const cardColor = palette[i % palette.length];
              return (
              <div key={c.slug} className="card area-card" style={{padding:24, cursor:'pointer', ['--card-color']: cardColor}}
                onClick={()=>{setFocus(c); window.scrollTo({top:0, behavior:'smooth'});}}>
                <h4 style={{fontFamily:"'DM Sans',sans-serif", fontSize:22, fontWeight:600, marginBottom:6}}>ABA Therapy in {c.n}</h4>
                <div className="mono" style={{color:'var(--ink-soft)', fontSize:11, marginBottom:12}}>{c.drive}</div>
                <p style={{color:'var(--ink-soft)', fontSize:14, lineHeight:1.5, marginBottom:14}}>{c.hook.split('.')[0]}.</p>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:14, borderTop:'1px solid var(--line)'}}>
                  <span style={{fontSize:12, color:'var(--ink-soft)'}}>Pop. {c.pop}</span>
                  <span style={{fontSize:13, color:cardColor, fontWeight:700}}>Learn more →</span>
                </div>
              </div>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div style={{padding:48, textAlign:'center', color:'var(--ink-soft)'}}>
              <p style={{marginBottom:16}}>Don't see your city? We may still serve you.</p>
              <button className="btn" style={{background:'var(--brand-green)', color:'#fff'}} onClick={()=>window.navigate('contact')}>Ask us directly</button>
            </div>
          )}

          <div style={{marginTop:80, padding:48, background:'var(--brand-yellow)', borderRadius:20, textAlign:'center'}}>
            <h3 style={{marginBottom:10, fontSize:30}}>Don't see your city?</h3>
            <p style={{color:'var(--ink-soft)', fontSize:17, marginBottom:24, maxWidth:560, margin:'0 auto 24px'}}>We travel up to 30 miles from our St. Louis Park center across the Twin Cities metro. Cll of Minnesota.</p>
            <button className="btn" style={{background:'var(--ink)', color:'var(--brand-yellow)'}} onClick={()=>window.navigate('contact')}>Start intake <Icon name="arrow" size={14}/></button>
          </div>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { AreasPage });
