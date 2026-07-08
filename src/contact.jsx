// Contact page with multi-step interactive intake form

const ContactPage = () => {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    who: '', childFirst: '', childAge: '', parentFirst: '', parentLast: '',
    email: '', phone: '', city: '', zip: '',
    insurance: '', diagnosis: '', services: [], setting: '',
    language: 'English', notes: '', consent: false
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const steps = ['About your child','Contact info','Care needs','Review'];

  const update = (k, v) => setData(d => ({...d, [k]: v}));
  const toggleService = (s) => setData(d => ({...d, services: d.services.includes(s) ? d.services.filter(x=>x!==s) : [...d.services, s]}));

  const canNext = () => {
    if (step === 0) return data.who && data.childFirst && data.childAge;
    if (step === 1) return data.email && data.phone && data.city;
    if (step === 2) return data.services.length > 0 && data.setting;
    return true;
  };

  if (submitted) {
    return (
      <div>
        <PageHero eyebrow="Thank you" title="We got it. Now it's our turn."
          sub="An intake coordinator will reach out to you within one business day — by phone, email, or text, in whatever language you prefer."/>
        <section className="section-sm">
          <div className="container-sm">
            <div className="card" style={{padding:48, background:'var(--brand-green)', color:'#fff', borderColor:'transparent', textAlign:'center'}}>
              <div style={{width:72, height:72, borderRadius:'50%', background:'var(--brand-yellow)', margin:'0 auto 24px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Icon name="check" size={36} color="var(--ink)"/>
              </div>
              <h2 style={{color:'#fff', marginBottom:16}}>Your intake is on its way to our team.</h2>
              <p style={{color:'rgba(255,255,255,0.9)', marginBottom:24, fontSize:18}}>Reference: <span style={{fontWeight:700, letterSpacing:'0.06em', background:'rgba(0,0,0,0.2)', padding:'4px 10px', borderRadius:6}}>NTC-{Math.floor(Math.random()*90000+10000)}</span></p>
              <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
                <button className="btn" style={{background:'var(--brand-yellow)', color:'var(--ink)'}} onClick={()=>{setSubmitted(false);setStep(0);setData({who:'',childFirst:'',childAge:'',parentFirst:'',parentLast:'',email:'',phone:'',city:'',zip:'',insurance:'',diagnosis:'',services:[],setting:'',language:'English',notes:'',consent:false})}}>Submit another</button>
                <button className="btn" style={{background:'transparent', border:'1.5px solid rgba(255,255,255,0.5)', color:'#fff'}} onClick={()=>window.navigate('home')}>Back to home</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero eyebrow="Contact & intake" title="Start your intake in under 15 minutes."
        sub="Fill this out as best you can. You can skip anything. We'll follow up on whatever's missing."/>
      <section className="section-sm">
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:40, alignItems:'flex-start'}}>
            {/* Sidebar: contact alternatives */}
            <div style={{display:'grid', gap:20, position:'sticky', top:100}}>
              <div className="card" style={{padding:28}}>
                <Icon name="phone" size={24} color="var(--brand-green)"/>
                <h4 style={{marginTop:12, marginBottom:6, fontFamily:"'DM Sans',sans-serif", fontSize:22, fontWeight:600}}>Call us</h4>
                <div style={{fontSize:18, fontWeight:700, color:'var(--brand-green)', marginBottom:4}}>(612) 703-9022</div>
                <div style={{fontSize:13, color:'var(--ink-soft)'}}>Fax: (612) 482-3186</div>
                <div style={{fontSize:13, color:'var(--ink-soft)', marginTop:4}}>Mon–Sun · 8am–6pm</div>
              </div>
              <div className="card" style={{padding:28}}>
                <Icon name="mail" size={24} color="var(--brand-orange)"/>
                <h4 style={{marginTop:12, marginBottom:6, fontFamily:"'DM Sans',sans-serif", fontSize:22, fontWeight:600}}>Email</h4>
                <div style={{fontSize:15, fontWeight:700, color:'var(--brand-orange)'}}>info@noortherapycenter.com</div>
                <div style={{fontSize:13, color:'var(--ink-soft)', marginTop:4}}>One business day response</div>
              </div>
              <div className="card" style={{padding:28, background:'var(--brand-purple)', color:'#fff', borderColor:'transparent'}}>
                <h4 style={{color:'#fff', marginBottom:10, fontFamily:"'DM Sans',sans-serif", fontSize:22, fontWeight:600}}>Prefer to text?</h4>
                <p style={{color:'rgba(255,255,255,0.9)', fontSize:15, marginBottom:12}}>Text the number above anytime. Our coordinators will reply in whatever language you text in.</p>
                <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                  {['English','Soomaali','العربية','Español'].map(l => (
                    <span key={l} style={{padding:'3px 10px', background:'rgba(255,255,255,0.2)', borderRadius:999, fontSize:12, fontWeight:600}}>{l}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="card" style={{padding:48}}>
              <div className="stepper">
                {steps.map((s,i)=>(
                  <div key={i} className={`step ${i<step?'done':''} ${i===step?'active':''}`}/>
                ))}
              </div>
              <div className="mono" style={{color:'var(--ink-soft)', marginBottom:8}}>Step {step+1} of {steps.length}</div>
              <h3 style={{marginBottom:32, fontFamily:"'DM Sans',sans-serif"}}>{steps[step]}</h3>

              {step === 0 && (
                <div>
                  <div className="field">
                    <label>Who are you reaching out for?</label>
                    <div className="radio-group">
                      {['My child','A child I\'m a guardian for','A client I refer (professional)','Myself (adult seeking services)'].map(opt => (
                        <div key={opt} className={`radio-option ${data.who===opt?'selected':''}`} onClick={()=>update('who', opt)}>
                          <div className="radio-dot"/>
                          <span style={{fontWeight:600}}>{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="field">
                    <label>Child's first name</label>
                    <input value={data.childFirst} onChange={e=>update('childFirst', e.target.value)} placeholder="Amira"/>
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                    <div className="field">
                      <label>Age</label>
                      <select value={data.childAge} onChange={e=>update('childAge', e.target.value)}>
                        <option value="">Select...</option>
                        {['Under 2','2–3','4–5','6–8','9–12','13–17','18+'].map(a=><option key={a}>{a}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Does your child have an autism diagnosis?</label>
                      <select value={data.diagnosis} onChange={e=>update('diagnosis', e.target.value)}>
                        <option value="">Select...</option>
                        <option>Yes, diagnosed</option>
                        <option>In process</option>
                        <option>Not yet, exploring</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                    <div className="field">
                      <label>Your first name</label>
                      <input value={data.parentFirst} onChange={e=>update('parentFirst', e.target.value)} placeholder="Fadumo"/>
                    </div>
                    <div className="field">
                      <label>Your last name</label>
                      <input value={data.parentLast} onChange={e=>update('parentLast', e.target.value)} placeholder="Hassan"/>
                    </div>
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input type="email" value={data.email} onChange={e=>update('email', e.target.value)} placeholder="you@email.com"/>
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input type="tel" value={data.phone} onChange={e=>update('phone', e.target.value)} placeholder="(612) 555-0100"/>
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
                    <div className="field">
                      <label>City</label>
                      <input value={data.city} onChange={e=>update('city', e.target.value)} placeholder="Minneapolis"/>
                    </div>
                    <div className="field">
                      <label>ZIP</label>
                      <input value={data.zip} onChange={e=>update('zip', e.target.value)} placeholder="55404"/>
                    </div>
                  </div>
                  <div className="field">
                    <label>Preferred language for communication</label>
                    <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
                      {['English','Soomaali','العربية','Español'].map(l => (
                        <div key={l}
                             onClick={()=>update('language', l)}
                             style={{padding:'10px 18px', borderRadius:999, border:`1.5px solid ${data.language===l?'var(--brand-green)':'var(--line)'}`, background: data.language===l?'color-mix(in srgb, var(--brand-green) 10%, transparent)':'transparent', cursor:'pointer', fontWeight:600, fontSize:14}}>
                          {l}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="field">
                    <label>Which services are you interested in? (pick any)</label>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                      {['In-home ABA','Center-based ABA','Early Intervention','Speech therapy','Occupational therapy','Parent training','Not sure yet'].map(s => (
                        <div key={s}
                             onClick={()=>toggleService(s)}
                             className={`radio-option ${data.services.includes(s)?'selected':''}`}>
                          <div style={{width:18, height:18, borderRadius:4, border:`2px solid ${data.services.includes(s)?'var(--brand-green)':'var(--line)'}`, background: data.services.includes(s)?'var(--brand-green)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                            {data.services.includes(s) && <svg width="12" height="12" viewBox="0 0 24 24" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>}
                          </div>
                          <span style={{fontWeight:600, fontSize:14}}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="field">
                    <label>Preferred setting</label>
                    <div className="radio-group">
                      {['In our home','At your center','Mix of both','No preference — help me decide'].map(s => (
                        <div key={s} className={`radio-option ${data.setting===s?'selected':''}`} onClick={()=>update('setting', s)}>
                          <div className="radio-dot"/>
                          <span style={{fontWeight:600}}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="field">
                    <label>Insurance</label>
                    <select value={data.insurance} onChange={e=>update('insurance', e.target.value)}>
                      <option value="">Select...</option>
                      <option>Minnesota Medicaid</option>
                      <option>Blue Cross Blue Shield MN</option>
                      <option>HealthPartners</option>
                      <option>Medica</option>
                      <option>Hennepin Health</option>
                      <option>UCare</option>
                      <option>Other</option>
                      <option>Self-pay / private</option>
                      <option>Not sure</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Anything else we should know? (optional)</label>
                    <textarea rows="4" value={data.notes} onChange={e=>update('notes', e.target.value)} placeholder="Tell us about your child's interests, what a good day looks like, what brought you here..."/>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p style={{color:'var(--ink-soft)', marginBottom:24}}>Here's what we have. Edit anything by going back, or submit below.</p>
                  <div style={{display:'grid', gap:16}}>
                    {[
                      ['For', data.who],
                      ['Child', `${data.childFirst || '—'}, age ${data.childAge || '—'}`],
                      ['Diagnosis', data.diagnosis || '—'],
                      ['You', `${data.parentFirst} ${data.parentLast}`.trim() || '—'],
                      ['Email', data.email || '—'],
                      ['Phone', data.phone || '—'],
                      ['Location', `${data.city || '—'}${data.zip?', '+data.zip:''}`],
                      ['Language', data.language],
                      ['Services', data.services.join(', ') || '—'],
                      ['Setting', data.setting || '—'],
                      ['Insurance', data.insurance || '—'],
                      ['Notes', data.notes || '—'],
                    ].map(([k,v],i)=>(
                      <div key={i} style={{display:'grid', gridTemplateColumns:'160px 1fr', gap:16, paddingBottom:12, borderBottom:'1px solid var(--line)'}}>
                        <div className="mono" style={{color:'var(--ink-soft)'}}>{k}</div>
                        <div style={{fontWeight:600}}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="field" style={{marginTop:24}}>
                    <label style={{display:'flex', gap:10, alignItems:'flex-start', cursor:'pointer'}}>
                      <input type="checkbox" checked={data.consent} onChange={e=>update('consent', e.target.checked)} style={{marginTop:4, width:'auto'}}/>
                      <span style={{fontWeight:500, fontSize:14, color:'var(--ink-soft)'}}>I understand Noor will contact me about care. My information is kept private under HIPAA; read our <a style={{color:'var(--brand-green)', textDecoration:'underline'}}>privacy notice</a>.</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{display:'flex', justifyContent:'space-between', marginTop:40, paddingTop:24, borderTop:'1px solid var(--line)'}}>
                <button className="btn btn-ghost" onClick={()=>setStep(Math.max(0, step-1))} style={{visibility: step===0?'hidden':'visible'}}>
                  ← Back
                </button>
                {step < 3 ? (
                  <button className="btn" style={{background: canNext()?'var(--brand-green)':'var(--line)', color:'#fff'}} disabled={!canNext()} onClick={()=>setStep(step+1)}>
                    Continue <Icon name="arrow" size={16}/>
                  </button>
                ) : (
                  <button className="btn" style={{background: (data.consent && !submitting) ?'var(--brand-green)':'var(--line)', color:'#fff'}} disabled={!data.consent || submitting} onClick={async ()=>{
                    if (submitting) return;
                    setSubmitting(true);
                    const subject = 'New intake — ' + (data.childFirst || 'child') + ' (age ' + (data.childAge || '?') + ')';
                    // Field names MUST match the hidden static form in index.html
                    // (name="intake") so values render in Netlify + email notifications.
                    if (window.sendByEmail) {
                      await window.sendByEmail({
                        formName: 'intake',
                        subject,
                        fields: {
                          who: data.who,
                          childFirst: data.childFirst,
                          childAge: data.childAge,
                          diagnosis: data.diagnosis,
                          parentFirst: data.parentFirst,
                          parentLast: data.parentLast,
                          email: data.email,
                          phone: data.phone,
                          city: data.city,
                          zip: data.zip,
                          language: data.language,
                          services: data.services,
                          setting: data.setting,
                          insurance: data.insurance,
                          notes: data.notes,
                        }
                      });
                    }
                    setSubmitting(false);
                    setSubmitted(true);
                  }}>
                    {submitting ? 'Sending…' : <>Submit intake <Icon name="check" size={16}/></>}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { ContactPage });
