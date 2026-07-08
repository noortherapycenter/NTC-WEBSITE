// Subpages: About, Services detail, Approach, Families, FAQ, Testimonials, Careers, Resources

const PageHero = ({ eyebrow, title, sub, bg = 'var(--bg)', children }) => (
  <section className="page-hero" style={{padding:'80px 0 40px', background: bg, position:'relative', overflow:'hidden'}}>
    <div className="container" style={{position:'relative'}}>
      <div style={{maxWidth:820}}>
        <div className="eyebrow">{eyebrow}</div>
        <h1 style={{marginBottom:24}}>{title}</h1>
        {sub && <p style={{fontSize:21, color:'var(--ink-soft)', maxWidth:720, lineHeight:1.5}}>{sub}</p>}
        {children}
      </div>
    </div>
  </section>
);

// Small helper: submits to Netlify Forms so info@noortherapycenter.com receives
// the submission directly (no user email client involved). The hidden companion
// forms in index.html (name="intake" and name="careers") make Netlify's build-time
// scanner aware of the field names. Returns a Promise resolving to true on success.
async function sendByEmail({ formName = 'intake', subject, fields, file }) {
  const data = { 'form-name': formName, subject: subject || '' };
  for (const [k, v] of Object.entries(fields)) {
    data[k] = Array.isArray(v) ? v.join(', ') : (v == null ? '' : String(v));
  }
  try {
    let res;
    if (file && file.file) {
      // Multipart submission so Netlify receives the actual file. The browser
      // sets the multipart boundary automatically — do NOT set Content-Type.
      const fd = new FormData();
      for (const [k, v] of Object.entries(data)) fd.append(k, v);
      fd.append(file.field, file.file, file.file.name);
      res = await fetch('/', { method: 'POST', body: fd });
    } else {
      res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
    }
    return res.ok;
  } catch (err) {
    console.error('Form submission failed', err);
    return false;
  }
}

// ---------- ABOUT (agency-focused, no founder personal info) ----------
const AboutPage = () => (
  <div>
    <PageHero
      eyebrow="About"
      title="A Minnesota therapy agency built around the family."
      sub="Noor Therapy Center is an EIDBI provider serving children and families across the Twin Cities metro. We provide ABA, speech-language, and occupational therapy — in your home and at our St. Louis Park center."
    />
    <section className="section-sm">
      <div className="container">
        <div className="about-mission" style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:64, marginBottom:80}}>
          <h2>Our mission</h2>
          <div style={{display:'grid', gap:20, fontSize:18, color:'var(--ink-soft)', lineHeight:1.7}}>
            <p>Our mission is simple: deliver pediatric therapy that genuinely fits each family — clinically strong, culturally respectful, and free of the waitlists and red tape that keep too many Minnesota children from getting care.</p>
            <p>We organize our practice around one idea: the family is the expert on their child. Clinicians bring training and evidence-based tools; families bring context, culture, and goals. Treatment plans are written together, in plain language, and in the language you prefer.</p>
            <p>Care happens where life happens — kitchens, backyards, our sensory-thoughtful center, or over secure video. No one-size treatment. No forced compliance. No arbitrary hour minimums.</p>
          </div>
        </div>

        <div className="about-stats grid grid-4" style={{marginBottom:80}}>
          {[
            { n:'0', l:'Waitlist'},
            { n:'2 wk', l:'First call to first session'},
            { n:'4', l:'Languages on staff'},
            { n:'30+', l:'Twin Cities communities served'},
          ].map((s,i)=>(
            <div key={i} className="card" style={{textAlign:'center', padding:28}}>
              <div style={{fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:52, color:'var(--brand-green)', lineHeight:1, marginBottom:8}}>{s.n}</div>
              <div style={{fontSize:13, fontWeight:600, color:'var(--ink-soft)', textTransform:'uppercase', letterSpacing:'0.06em'}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div style={{marginBottom:64}}>
          <div className="eyebrow">What we stand for</div>
          <h2 style={{marginBottom:24, maxWidth:780}}>Five commitments that shape every plan we write.</h2>
          <div className="grid grid-2" style={{gap:20}}>
            {[
              { t:'Data-driven programming', d:'Every program is built on measurable objectives, daily data collection, and objective progress tracking. Clinical decisions are made on what the data shows — not guesswork.', c:'var(--brand-green)'},
              { t:'Family-led goals', d:'Parents and caregivers define what matters. Our clinicians translate those goals into measurable programs — not the other way around.', c:'var(--brand-orange)'},
              { t:'Culturally grounded', d:'Food, prayer times, language, holidays, extended family — these shape development. Our plans respect the whole family system.', c:'var(--brand-berry)'},
              { t:'Clinically rigorous', d:'Every program is supervised by a Board Certified Behavior Analyst (BCBA). Data guides our decisions; research guides our practice.', c:'var(--brand-blue)'},
              { t:'No waitlist, ever', d:'Early intervention matters. We staff to meet demand — so families don\'t lose months waiting for a first appointment.', c:'var(--brand-purple)'},
              { t:'Plain-language care', d:'Written reports in the language you prefer. No clinical gatekeeping. No jargon where a plain word will do.', c:'var(--brand-pink)'},
            ].map((v,i)=>(
              <div key={i} className="card" style={{padding:28}}>
                <div style={{width:44, height:44, borderRadius:12, background:`color-mix(in srgb, ${v.c} 18%, transparent)`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16}}>
                  <Icon name="check" size={22} color={v.c}/>
                </div>
                <h4 style={{marginBottom:8, fontFamily:"'DM Sans',sans-serif", fontSize:22, fontWeight:600}}>{v.t}</h4>
                <p style={{color:'var(--ink-soft)', fontSize:15}}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our team structure — agency-level, no names */}
        <div style={{marginBottom:64}}>
          <div className="eyebrow">Our care team</div>
          <h2 style={{marginBottom:20, maxWidth:780}}>One coordinated team — so you never have to repeat your story.</h2>
          <p style={{color:'var(--ink-soft)', fontSize:18, maxWidth:760, marginBottom:32}}>Our staff includes Board Certified Behavior Analysts (BCBAs), Registered Behavior Technicians (RBTs), Speech-Language Pathologists (CCC-SLPs), Occupational Therapists (OTR/L), licensed psychologists for diagnostic evaluations, and bilingual intake coordinators.</p>
          <div className="grid grid-3">
            {[
              {r:'BCBAs', d:'Design and supervise ABA programs. Meet weekly with your care team and family.'},
              {r:'BTs / RBTs', d:'Deliver direct, play-based therapy. Trained and supervised under every BCBA.'},
              {r:'Speech-Language Pathologists', d:'Evaluate and treat communication — from first words to AAC to social language.'},
              {r:'Occupational Therapists', d:'Address sensory regulation, fine motor skills, feeding, and daily living.'},
              {r:'Psychologists', d:'Conduct comprehensive autism evaluations with ADOS-2 and cognitive testing.'},
            ].map((x,i)=>(
              <div key={i} className="card-flat" style={{padding:24}}>
                <h4 style={{fontFamily:"'DM Sans',sans-serif", fontSize:20, fontWeight:600, marginBottom:8}}>{x.r}</h4>
                <p style={{color:'var(--ink-soft)', fontSize:14}}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials / compliance — removed */}
      </div>
    </section>
  </div>
);

// ---------- SERVICES ----------
const ServicesPage = () => {
  const modalities = [
    { icon:'home', title:'In-home', color:'var(--brand-orange)', ages:'18 months – 21 years', setting:'Your home', desc:'Your child\'s care team — a BCBA and one or more BT/RBTs — works directly in your home. We meet siblings, learn the family\'s rhythms, and build programs around your actual life.', includes:['1:1 direct therapy','Weekly BCBA supervision','Family training','Monthly progress reports']},
    { icon:'center', title:'Center-based', color:'var(--brand-green)', ages:'3 – 12 years', setting:'Our St. Louis Park center', desc:'Sensory-thoughtful therapy rooms, a motor skills gym, and quiet spaces for regulation. Kids get peer interaction, structured transitions, and access to our full team under one roof.', includes:['1:1 and small-group sessions','Full-day and half-day options','Peer social skills practice','Direct OT/speech coordination']},
  ];
  const programs = [
    { icon:'spark', title:'Full-time ABA', color:'var(--brand-berry)', ages:'0 – 7 years (typical)', setting:'In-home or center', desc:'Full-time, all-encompassing early intervention — roughly 30–40 hours/week of ABA integrated with speech, OT, NET, and community engagement under one coordinated plan.', includes:['~30–40 hrs/week','Integrated speech & OT','Naturalistic teaching','Transition-to-school support']},
    { icon:'clipboard', title:'Part-time ABA', color:'var(--brand-purple)', ages:'All ages', setting:'In-home or center', desc:'Targeted, part-time programming — roughly 10–25 hours/week — focused on specific skill-building or behavior reduction goals. Pairs well with school, speech, and OT.', includes:['~10–25 hrs/week','Targeted goal areas','Works around school','Coordinates with outside providers']},
    { icon:'family', title:'Family training', color:'var(--brand-blue)', ages:'Caregivers', setting:'Standalone or paired', desc:'Caregivers learn the strategies the team is using — so progress at the table becomes progress at home. Available as a structured curriculum or paired with any program.', includes:['Structured curriculum','Individualized coaching','Video review with BCBA','Ongoing group cohort']},
    { icon:'speech', title:'Speech therapy', color:'var(--brand-pink)', ages:'18 months – 18 years', setting:'Standalone or paired', desc:'SLPs working on the full range of communication: from first words, to AAC device programming, to pragmatic language and conversation skills.', includes:['AAC evaluation & support','Articulation & phonology','Expressive & receptive language','Pragmatic/social language']},
    { icon:'hands', title:'Occupational therapy', color:'var(--brand-orange)', ages:'2 – 18 years', setting:'Standalone or paired', desc:'OTs addressing fine motor, sensory regulation, feeding, and daily living skills. Close coordination with the ABA team so goals reinforce each other.', includes:['Sensory integration','Fine motor development','Feeding therapy','Self-care & ADLs']},
  ];
  const ServiceCard = ({ s }) => (
    <div className="card service-card" style={{padding:0, overflow:'hidden', borderLeft:`8px solid ${s.color}`, ['--svc-color']: s.color}}>
      <div className="service-card-inner" style={{display:'grid', gridTemplateColumns:'auto 1fr 1.2fr', gap:0}}>
        <div className="service-card-iconwrap" style={{padding:'36px 28px', background:`color-mix(in srgb, ${s.color} 10%, transparent)`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden'}}>
          <div className="service-card-shine" aria-hidden="true"></div>
          <div className="service-card-icon" style={{width:72, height:72, borderRadius:20, background:s.color, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1}}>
            <Icon name={s.icon} size={34} color="#fff"/>
          </div>
        </div>
        <div style={{padding:32}}>
          <h3 className="service-card-title" style={{marginBottom:10, fontFamily:"'DM Sans',sans-serif"}}>{s.title}</h3>
          <div style={{display:'flex', gap:12, flexWrap:'wrap', marginBottom:14}}>
            <span style={{fontSize:12, fontWeight:700, padding:'4px 10px', background:'var(--bg)', borderRadius:999}}>Ages: {s.ages}</span>
            <span style={{fontSize:12, fontWeight:700, padding:'4px 10px', background:'var(--bg)', borderRadius:999}}>{s.setting}</span>
          </div>
          <p style={{color:'var(--ink-soft)'}}>{s.desc}</p>
        </div>
        <div className="service-card-includes" style={{padding:32, borderLeft:'1px solid var(--line)'}}>
          <div className="mono" style={{color:'var(--ink-soft)', marginBottom:12}}>What's included</div>
          <div style={{display:'grid', gap:8}}>
            {s.includes.map((inc,j)=>(
              <div key={j} className="service-card-incrow" style={{display:'flex', alignItems:'flex-start', gap:10, fontSize:14, ['--row-i']: j}}>
                <Icon name="check" size={16} color={s.color}/>
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <PageHero eyebrow="Services" title="One care team, many doors in."
        sub="We coordinate ABA, speech, and occupational therapy so you don't have to manage three agencies. Start with one service — add others as needs emerge."/>
      <section className="section-sm">
        <div className="container">
          <div className="mono" style={{color:'var(--ink-soft)', marginBottom:14}}>Where care happens</div>
          <div className="grid" style={{gap:20, marginBottom:48}}>
            {modalities.map((s,i)=><ServiceCard key={i} s={s}/>)}
          </div>
          <div className="mono" style={{color:'var(--ink-soft)', marginBottom:14}}>Programs</div>
          <div className="grid" style={{gap:20}}>
            {programs.map((s,i)=><ServiceCard key={i} s={s}/>)}
          </div>
        </div>
      </section>
      <ClosingCTA/>
    </div>
  );
};

// ---------- APPROACH ----------
const ApproachPage = () => (
  <div>
    <PageHero eyebrow="Our approach" title="Traditional ABA. Measurable outcomes. Real results."
      sub="Our clinical approach rests on three commitments: data-driven programming, evidence-based practice, and cultural respect. Here's what that actually means day-to-day."/>
    <section className="section-sm">
      <div className="container-sm">
        <div style={{display:'grid', gap:64}}>
          {[
            {n:'01', t:'We build every program on data.', d:'Measurable goals. Daily data collection across every teaching opportunity. Weekly graph review by a BCBA. Clinical decisions \u2014 what to teach next, what to adjust, when to fade prompts \u2014 are all driven by what the numbers show.'},
            {n:'02', t:'We use evidence-based ABA procedures.', d:'Discrete trial teaching, natural environment teaching, behavior skills training, task analysis, positive reinforcement, and systematic prompt fading \u2014 all grounded in decades of peer-reviewed research on Applied Behavior Analysis.'},
            {n:'03', t:'We honor your family\'s culture.', d:'Food, language, prayer times, holidays \u2014 these shape how your child grows. Our team builds programs that respect your traditions, not around them.'},
            {n:'04', t:'We work alongside you, not above you.', d:'You attend meetings. You set priority goals. You watch sessions. We write reports in plain language and share progress data at every parent meeting. No clinical gatekeeping.'},
          ].map((b,i) => (
            <div key={i} className="approach-block" style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:40, alignItems:'flex-start'}}>
              <div className="approach-num" style={{fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:80, color:'var(--brand-yellow)', lineHeight:0.9}}>{b.n}</div>
              <div>
                <h2 style={{fontSize:40, marginBottom:16}}>{b.t}</h2>
                <p style={{fontSize:19, color:'var(--ink-soft)', lineHeight:1.6}}>{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-sm" style={{background:'var(--brand-yellow)'}}>
      <div className="container">
        <div style={{maxWidth:720, marginBottom:40}}>
          <h2>What you won't find here.</h2>
        </div>
        <div className="grid grid-3">
          {[
            {t:'No forced eye contact.', d:'We care what your child is learning, not where they\'re looking.'},
            {t:'No punishment.', d:'We build skills through positive reinforcement. Never through withholding, shaming, or aversives.'},
            {t:'No 40-hour weeks by default.', d:'Hours are based on clinical need and prescribed by a BCBA — not insurance caps or revenue targets. Many kids thrive with 10–20.'},
          ].map((x,i)=>(
            <div key={i} style={{padding:28, background:'var(--bg)', borderRadius:'var(--radius)', border:'1px solid var(--line)'}}>
              <div style={{width:36, height:36, borderRadius:'50%', background:'var(--brand-berry)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16}}>
                <svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
              </div>
              <h4 style={{marginBottom:8, fontFamily:"'DM Sans',sans-serif", fontSize:22, fontWeight:600}}>{x.t}</h4>
              <p style={{color:'var(--ink-soft)', fontSize:15}}>{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// ---------- FAMILIES ----------
const FamiliesPage = () => (
  <div>
    <PageHero eyebrow="For families" title="From first call to first session in two weeks."
      sub="You don't need a roadmap to start — but here's one if it helps. Our intake process is designed to move quickly, so your child gets support sooner rather than later."/>
    <section className="section-sm">
      <div className="container">
        <div style={{position:'relative', maxWidth:900, margin:'0 auto'}}>
          <div className="families-timeline-wrap" style={{position:'relative'}}>
          <div className="families-timeline-line" style={{position:'absolute', left:24, top:24, bottom:24, width:3, background:'var(--brand-yellow)', borderRadius:2}}/>
          {[
            {w:'Day 1', t:'First contact', c:'var(--brand-orange)', d:'You reach out. An intake coordinator calls you back within one business day — in whatever language works best. We take notes, answer questions, and email you the benefits-verification form.'},
            {w:'Days 2–3', t:'Benefits verified', c:'var(--brand-blue)', d:'We run your Medicaid (or MCO, once in-network) and confirm covered services. No surprises — you get a written summary of what\'s covered and what isn\'t.'},
            {w:'Days 4–7', t:'CMDE', c:'var(--brand-purple)', d:'A CMDE provider conducts the Comprehensive Multi-Disciplinary Evaluation (CMDE) — the formal evaluation MN Medicaid requires before ABA services can be authorized. We coordinate the scheduling for you.'},
            {w:'Days 8–11', t:'ITP', c:'var(--brand-berry)', d:'The BCBA and caregiver meet to prioritize the goals your learner will work on for the next six months. The BCBA also runs structured observations and conducts Functional Behavior Assessments (FBAs) to inform the written plan. Nothing starts without your signature.'},
            {w:'Days 12–13', t:'Team match', c:'var(--brand-green)', d:'We find the right Behavior Technician (BT) or Registered Behavior Technician (RBT) for your child — prioritizing language, personality, and schedule fit. Before the first session, your BT/RBT receives a tailored briefing and training on your child: their goals, their reinforcers, their triggers, and how your family wants care delivered.'},
            {w:'Day 14', t:'Sessions begin', c:'var(--brand-pink)', d:'Your BT or RBT shows up for the first session, supervised by your BCBA. From here on: every two weeks you get a progress note, every month a team meeting, and every six months a full reassessment with refreshed goals.'},
          ].map((s,i)=>(
            <div key={i} className="families-step" style={{display:'grid', gridTemplateColumns:'60px 1fr', gap:24, marginBottom:40, position:'relative'}}>
              <div style={{width:48, height:48, borderRadius:'50%', background:s.c, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif", fontSize:20, fontWeight:600, border:'4px solid var(--bg)', zIndex:1}}>{i+1}</div>
              <div className="card" style={{padding:28}}>
                <div className="mono" style={{color:s.c, marginBottom:6}}>{s.w}</div>
                <h3 style={{marginBottom:10, fontFamily:"'DM Sans',sans-serif"}}>{s.t}</h3>
                <p style={{color:'var(--ink-soft)'}}>{s.d}</p>
              </div>
            </div>
          ))}
          </div>
        </div>

        <div style={{marginTop:80, display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}} className="families-cards">
          <div className="card" style={{padding:36, background:'var(--brand-green)', color:'#fff', borderColor:'transparent'}}>
            <h3 style={{color:'#fff', marginBottom:12, fontFamily:"'DM Sans',sans-serif"}}>What we need from you</h3>
            <div style={{display:'grid', gap:10}}>
              {['Your child\'s insurance card (photo is fine)','A rough idea of your weekly schedule','Any previous evaluations, if you have them','Patience during credentialing — we\'ll keep you posted'].map((x,i)=>(
                <div key={i} style={{display:'flex', gap:10, alignItems:'flex-start'}}>
                  <Icon name="check" size={18} color="var(--brand-yellow)"/>
                  <span>{x}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{padding:36, background:'var(--brand-purple)', color:'#fff', borderColor:'transparent'}}>
            <h3 style={{color:'#fff', marginBottom:12, fontFamily:"'DM Sans',sans-serif"}}>What you'll get from us</h3>
            <div style={{display:'grid', gap:10}}>
              {['A single point of contact during intake','Written plans in plain English (or Somali, Arabic, Spanish)','Monthly progress summaries','An honest conversation — always'].map((x,i)=>(
                <div key={i} style={{display:'flex', gap:10, alignItems:'flex-start'}}>
                  <Icon name="check" size={18} color="var(--brand-yellow)"/>
                  <span>{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <ClosingCTA/>
  </div>
);

// ---------- FAQ ----------
const FAQPage = () => {
  const [open, setOpen] = React.useState('0-0');
  const [activeCat, setActiveCat] = React.useState(0);
  const sections = [
    {
      cat: 'Getting started',
      color: 'var(--brand-green)',
      icon: 'spark',
      faqs: [
        { q:'How do I start? What\'s the very first step?', a:'Submit the intake form on our contact page, call us at (612) 703-9022, or email info@noortherapycenter.com. An intake coordinator follows up within one business day — by phone, email, or text, in whatever language works best for your family.' },
        { q:'How long does it take from first call to first session?', a:'Typically about two weeks. Day 1 is your first contact; Days 2–3 we verify benefits; Days 4–7 the CMDE is completed; Days 8–11 the BCBA writes the ITP; Days 12–13 we match your team; Day 14 the first session begins.' },
        { q:'Do you have a waitlist?', a:'No. We don\'t maintain a waitlist. Once your treatment plan is signed and your team is matched, sessions begin — usually within two weeks of your first call.' },
        { q:'Do I need an autism diagnosis before starting?', a:'For insurance-funded ABA in Minnesota, yes — a written diagnosis is required. If your child doesn\'t have one, we can refer you to a trusted diagnostic provider and coordinate the timing so ABA can begin as soon as the evaluation is complete.' },
        { q:'What is a CMDE and why do I need one?', a:'A Comprehensive Multi-Disciplinary Evaluation is the formal evaluation Minnesota Medicaid (EIDBI) requires before ABA services can be authorized. A qualified CMDE provider conducts it during Days 4–7 of intake. We coordinate the scheduling — you don\'t have to track down a provider yourself.' },
        { q:'What documents should I have ready?', a:'A photo of your child\'s insurance card, any previous evaluations (autism diagnosis, IEP, prior treatment plans — only if you have them), and a rough idea of your weekly schedule. We don\'t need everything to start; we\'ll fill in the gaps together.' },
        { q:'Can I tour your center before deciding?', a:'Yes, absolutely. Call or email and we\'ll schedule a walk-through of our St. Louis Park center. Bring your child if you\'d like — meeting the space often makes the choice clearer.' },
      ]
    },
    {
      cat: 'Insurance & cost',
      color: 'var(--brand-blue)',
      icon: 'shield',
      faqs: [
        { q:'What insurance do you accept?', a:'We are in-network with Minnesota Medicaid (including PMAP/MCO plans where contracts are active). We\'re actively credentialing with Blue Cross Blue Shield of MN, HealthPartners, Medica, Hennepin Health, and UCare — the insurance page on our site shows current status for each.' },
        { q:'What if I have private insurance you\'re not yet contracted with?', a:'Reach out anyway. We\'ll verify your benefits, tell you whether your plan offers out-of-network ABA coverage, and discuss self-pay rates if that\'s a fit. Many families also use HSAs/FSAs.' },
        { q:'Will I have a copay or out-of-pocket cost?', a:'Most Minnesota Medicaid plans cover ABA, speech, and OT at 100%. Commercial plans vary — once benefits are verified, we send you a written summary that spells out exactly what is and isn\'t covered. No surprises.' },
        { q:'How do I know if my child qualifies for EIDBI?', a:'EIDBI (Early Intensive Developmental and Behavioral Intervention) is Minnesota Medicaid\'s benefit for autism services. Eligibility requires Medicaid enrollment plus a qualifying autism diagnosis or related condition. Our intake team walks you through it during your first call.' },
        { q:'Do you offer self-pay options?', a:'Yes. We have a published self-pay rate sheet for families without insurance coverage or who prefer not to use it. Ask the intake coordinator and we\'ll send it.' },
        { q:'What if my Medicaid coverage changes mid-treatment?', a:'Tell us as soon as you know. We re-verify benefits, work with the new MCO, and coordinate any required new authorizations — care continues without interruption while we sort the paperwork.' },
      ]
    },
    {
      cat: 'About ABA',
      color: 'var(--brand-purple)',
      icon: 'heart',
      faqs: [
        { q:'What exactly is ABA therapy?', a:'Applied Behavior Analysis is the most extensively researched, evidence-based therapy for autism. It uses positive reinforcement, structured teaching, and continuous data collection to help children build communication, social, daily-living, and play skills. Every program at Noor is supervised by a Board Certified Behavior Analyst (BCBA).' },
        { q:'Is the ABA you practice the modern, ethical kind?', a:'Yes. We practice traditional, data-driven ABA grounded in current best practice — naturalistic teaching, child-led when possible, no aversives, no punishment, no forced compliance, no forced eye contact. Skills are built through positive reinforcement, never through shaming or withholding.' },
        { q:'How is ABA different from speech or OT?', a:'ABA is broad — it can target communication, social skills, daily living, behavior, school readiness, and more. Speech focuses specifically on communication; OT focuses on sensory regulation, fine motor, and self-care. Many children benefit from a combination, which is why we offer all three under one roof.' },
        { q:'Is ABA the right fit for my child?', a:'Sometimes yes, sometimes no. During your free consultation a BCBA talks honestly about what they think would help — even if that means pointing you toward a different provider, or recommending speech/OT alone instead of ABA. We won\'t take a case we don\'t believe will benefit the child.' },
        { q:'What does a typical session look like?', a:'For young kids: play-based and naturalistic, following the child\'s lead while gently targeting skills the BCBA has identified. For older kids: a mix of structured teaching and in-context practice. No drills-at-a-table sessions, no rigid schedules ignoring the child in front of us.' },
        { q:'How many hours per week will my child receive?', a:'Hours are clinically recommended by your BCBA based on the assessment — not by insurance caps or revenue targets. Many kids thrive at 10–20 hours per week. Some need more (early intervention often gets 25–30); some need less. The treatment plan documents the recommendation and your insurance authorization confirms what\'s covered.' },
        { q:'How long will my child be in therapy?', a:'It varies. The goal of ABA is always to fade out — to teach skills until they\'re generalized and the child no longer needs structured support. Some families finish in 1–2 years, others continue longer with reduced hours. We re-evaluate every six months and adjust toward fading whenever the data supports it.' },
      ]
    },
    {
      cat: 'Sessions & day-to-day',
      color: 'var(--brand-orange)',
      icon: 'home',
      faqs: [
        { q:'Where do sessions happen?', a:'Wherever serves your child best: in your home, at our St. Louis Park center, at school (with school agreement), or a mix. Many families do center-based for the social environment plus a few in-home hours each week for generalization.' },
        { q:'What\'s the difference between a BT and an RBT?', a:'Both deliver direct, 1:1 therapy under BCBA supervision. An RBT (Registered Behavior Technician) has completed a 40-hour BACB-approved training and passed a competency exam. A BT (Behavior Technician) is in training toward that certification. Both are supervised by a BCBA on every case.' },
        { q:'How does in-home therapy work logistically?', a:'Your BT/RBT comes to your home at scheduled times. We need a quiet space (not necessarily a separate room), a few minutes for setup, and a primary caregiver to be home or reachable. We never disrupt the household — sessions blend into the day rather than taking it over.' },
        { q:'Will my child have the same therapist every session?', a:'We aim for consistency: most kids see the same BT/RBT for most sessions, with one or two backups for vacation/illness coverage. The BCBA stays constant throughout the case.' },
        { q:'How long is each session?', a:'Most sessions run 2–4 hours, scheduled in blocks that work for your family. Younger kids in early intervention often do shorter, more frequent sessions; school-age kids typically do longer blocks after school or on weekends. Your BCBA designs the schedule around your child\'s stamina, your family\'s rhythm, and the clinical recommendation.' },
        { q:'Do you cancel or reschedule often?', a:'We try not to. We staff with backup therapists for vacation and illness coverage. If something does come up, you\'ll hear from us as early as possible.' },
        { q:'What happens if my child has a really hard day?', a:'It\'s expected — every child has off days. The BT/RBT adjusts on the fly, simplifies the targets, and prioritizes safety and connection. The data still gets recorded so the BCBA can see the pattern and adjust the program if needed.' },
        { q:'Can siblings be around during sessions?', a:'Generally yes — real-world environments are how skills generalize. Some goals (like 1:1 attention work) need a quieter setup; your BCBA will help you plan around that.' },
      ]
    },
    {
      cat: 'Family involvement',
      color: 'var(--brand-berry)',
      icon: 'family',
      faqs: [
        { q:'How involved do parents need to be?', a:'Meaningfully involved, but the form is flexible. At minimum: weekly check-ins with the BT/RBT, a monthly meeting with the BCBA, and occasional sessions where you practice strategies together. Beyond that, "involved" looks different for every family — we work with your real schedule.' },
        { q:'What is parent training?', a:'A structured 8-week program (or ongoing as needed) where the BCBA teaches you the strategies your team is using with your child — how to give clear instructions, how to reinforce effectively, how to handle challenging behavior at home. The goal is for you to become the expert on your own child.' },
        { q:'Will I see progress reports?', a:'Yes. Every two weeks you get a brief progress note. Every month, a team meeting with the BCBA reviewing data on every goal. Every six months, a full reassessment and updated treatment plan.' },
        { q:'Can grandparents, nannies, or other caregivers attend training?', a:'Absolutely encouraged. The more consistent the caregivers in a child\'s life, the faster skills generalize. We invite anyone you want involved.' },
        { q:'What if I disagree with a goal or strategy?', a:'Tell us, immediately. You\'re the expert on your child and your family. Goals get adjusted; strategies get adjusted. The treatment plan is a working document, not a contract.' },
        { q:'How do you handle cultural and religious considerations?', a:'Food, prayer times, language, holidays, dress, family structure — all of these belong in the plan. Tell us what matters; we build the program around your traditions, not around them. Our team is multilingual (English, Soomaali, Arabic, Spanish) and trained in culturally responsive care.' },
      ]
    },
    {
      cat: 'Logistics & switching providers',
      color: 'var(--brand-pink)',
      icon: 'check',
      faqs: [
        { q:'What languages do your therapists speak?', a:'Our full team speaks English. Individual team members also speak Soomaali, Arabic, and Spanish. During team match (Days 12–13), we prioritize language fit whenever possible — including for parent meetings and written reports.' },
        { q:'Do you provide written reports in my language?', a:'Yes, on request. Treatment plans, progress reports, and parent-facing documents can be provided in Soomaali, Arabic, or Spanish in addition to English.' },
        { q:'My child already has a BCBA elsewhere — can we transfer?', a:'Yes, when you\'re ready. We coordinate the transition: request your records, communicate with the prior provider if you authorize it, run a fresh BCBA assessment, and write a treatment plan that builds on what\'s working. No need to start from scratch on goals.' },
        { q:'Can I keep my current provider for ABA but use Noor for speech or OT?', a:'Yes. We accept supplemental cases — many families use a different agency for ABA but come to us for speech, OT, or parent training. We coordinate with the other provider to keep goals aligned.' },
        { q:'What\'s your travel radius for in-home services?', a:'About 25 miles from our St. Louis Park center, covering most of the Twin Cities metro. If you\'re on the edge or beyond, call us — we sometimes make it work with longer sessions or hybrid in-home/center schedules.' },
        { q:'What are your hours?', a:'Our St. Louis Park center is open 8am–6pm, Monday through Sunday. In-home schedules are flexible — early morning, after school, weekends — based on your family\'s availability and therapist match.' },
        { q:'How is my information protected?', a:'Strictly under HIPAA. All records are stored in encrypted, healthcare-grade systems. We share information only with your written authorization, except where required by law.' },
        { q:'How do I file a concern or compliment?', a:'Tell your BCBA first — they\'re your direct contact. If you\'d rather go to leadership, email info@noortherapycenter.com or call (612) 703-9022 and ask for the clinical director. Every concern gets a response within one business day.' },
      ]
    },
  ];
  return (
    <div>
      <PageHero eyebrow="FAQ" title="Every question we hear, answered."
        sub="Pick a category, or scroll through them all. If you don't see your question, our intake coordinators answer by phone, email, or text — in any of our four languages."/>
      <section className="section-sm">
        <div className="container">
          {/* Category tabs */}
          <div className="faq-tabs" style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:48, justifyContent:'center'}}>
            {sections.map((s,i)=>(
              <button key={i} onClick={()=>setActiveCat(i)} style={{
                padding:'10px 18px', borderRadius:999, fontSize:14, fontWeight:700,
                border: `1.5px solid ${activeCat===i ? s.color : 'var(--line)'}`,
                background: activeCat===i ? s.color : 'transparent',
                color: activeCat===i ? '#fff' : 'var(--ink-soft)',
                cursor:'pointer', transition:'all .15s', display:'inline-flex', alignItems:'center', gap:8
              }}>
                <Icon name={s.icon} size={14} color={activeCat===i ? '#fff' : s.color}/>
                {s.cat}
              </button>
            ))}
          </div>

          <div className="container-sm" style={{padding:0, margin:'0 auto'}}>
            <div style={{display:'flex', alignItems:'center', gap:16, marginBottom:24, paddingBottom:16, borderBottom:`2px solid ${sections[activeCat].color}`}}>
              <div style={{width:48, height:48, borderRadius:14, background:`color-mix(in srgb, ${sections[activeCat].color} 16%, transparent)`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Icon name={sections[activeCat].icon} size={24} color={sections[activeCat].color}/>
              </div>
              <div>
                <div className="mono" style={{color:sections[activeCat].color, marginBottom:2}}>Section {activeCat+1} of {sections.length}</div>
                <h3 style={{fontFamily:"'DM Sans',sans-serif", fontSize:24, margin:0}}>{sections[activeCat].cat}</h3>
              </div>
            </div>

            {sections[activeCat].faqs.map((f,i)=>{
              const key = `${activeCat}-${i}`;
              return (
                <div key={key} className={`faq-item ${open===key?'open':''}`} onClick={()=>setOpen(open===key?'':key)}>
                  <div className="faq-q">
                    <span>{f.q}</span>
                    <div className="faq-toggle">
                      <Icon name="plus" size={16}/>
                    </div>
                  </div>
                  <div className="faq-a" style={{fontSize:17, lineHeight:1.6}}>{f.a}</div>
                </div>
              );
            })}
          </div>

          {/* Still have questions */}
          <div className="card" style={{marginTop:64, padding:36, background:'var(--brand-green)', color:'#fff', borderColor:'transparent', textAlign:'center', maxWidth:720, marginLeft:'auto', marginRight:'auto'}}>
            <h3 style={{color:'#fff', fontFamily:"'DM Sans',sans-serif", marginBottom:10}}>Still have a question?</h3>
            <p style={{color:'rgba(255,255,255,0.9)', marginBottom:20}}>Our intake coordinators answer by phone, email, or text — usually within one business day, in English, Soomaali, Arabic, or Spanish.</p>
            <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
              <a className="btn" href="tel:6127039022" style={{background:'var(--brand-yellow)', color:'var(--ink)'}}><Icon name="phone" size={16}/> (612) 703-9022</a>
              <a className="btn" href="mailto:info@noortherapycenter.com" style={{background:'transparent', border:'1.5px solid rgba(255,255,255,0.5)', color:'#fff'}}><Icon name="mail" size={16}/> Email us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ---------- TESTIMONIALS ----------
const TestimonialsPage = () => {
  const stories = [
    {q:'Our BCBA learned Amira\'s favorite cartoon in Soomaali before her first session. That\'s when I knew this was different.', n:'Fadumo H.', r:'Parent · Minneapolis', c:'var(--brand-orange)', tag:'In-home ABA'},
    {q:'Three months in, Yusuf is asking for snacks with full sentences. We cried when he said "I want apple, please."', n:'Khadija B.', r:'Parent · St. Paul', c:'var(--brand-green)', tag:'Early Intervention'},
    {q:'Noor did something no one else did: they listened to what we wanted for our son, not what a textbook said he should want.', n:'Miguel R.', r:'Parent · Roseville', c:'var(--brand-purple)', tag:'Center-based ABA'},
    {q:'The parent training program gave me tools I use every day. My husband and I finally feel like we speak the same language about our daughter.', n:'Hodan A.', r:'Parent · Bloomington', c:'var(--brand-berry)', tag:'Parent Training'},
    {q:'We switched from another agency and the difference is night and day. Our daughter actually looks forward to sessions now.', n:'Sarah K.', r:'Parent · Edina', c:'var(--brand-blue)', tag:'In-home ABA'},
    {q:'The switch to Noor was night and day. Our daughter actually looks forward to sessions now.', n:'Jessica L.', r:'Parent · Roseville', c:'var(--brand-pink)', tag:'In-home ABA'},
  ];
  return (
    <div>
      <PageHero eyebrow="Family stories" title="Real families. Real words. Real light."
        sub="Names and some details changed at families' request. The quotes are their own."/>
      <section className="section-sm">
        <div className="container">
          <div className="grid grid-2" style={{gap:24}}>
            {stories.map((s,i)=>(
              <div key={i} className="card" style={{padding:36, position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', top:-20, right:-10, fontFamily:"'DM Sans',sans-serif", fontSize:140, color:`color-mix(in srgb, ${s.c} 20%, transparent)`, fontWeight:600, lineHeight:1}}>"</div>
                <div style={{position:'relative'}}>
                  <div style={{display:'inline-block', padding:'4px 10px', background:`color-mix(in srgb, ${s.c} 15%, transparent)`, color:s.c, borderRadius:999, fontSize:12, fontWeight:700, marginBottom:20}}>{s.tag}</div>
                  <p style={{fontFamily:"'DM Sans',sans-serif", fontSize:22, fontWeight:500, fontStyle:'italic', marginBottom:24, lineHeight:1.35}}>"{s.q}"</p>
                  <div style={{display:'flex', alignItems:'center', gap:12}}>
                    <div style={{width:44, height:44, borderRadius:'50%', background:s.c, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:18}}>{s.n.charAt(0)}</div>
                    <div>
                      <div style={{fontWeight:700}}>{s.n}</div>
                      <div style={{fontSize:13, color:'var(--ink-soft)'}}>{s.r}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ---------- CAREERS (with functional application form) ----------
const CareerApplyForm = ({ role, color, onClose }) => {
  const [data, setData] = React.useState({
    firstName:'', lastName:'', email:'', phone:'', city:'',
    credential:'', yearsExp:'', resumeLink:'',
    availability:'', languages:'', about:''
  });
  const [resumeFile, setResumeFile] = React.useState(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [submitOk, setSubmitOk] = React.useState(true);
  const fileInputRef = React.useRef(null);
  const upd = (k,v) => setData(d => ({...d, [k]: v}));
  const canSubmit = data.firstName && data.lastName && data.email && data.phone;

  const handleFile = (file) => {
    if (!file) return;
    // Accept PDF, DOC, DOCX up to 10MB
    const ok = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!ok) {
      alert('Please upload a PDF, DOC, or DOCX file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File is larger than 10 MB. Please upload a smaller file or share a link instead.');
      return;
    }
    setResumeFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const [sending, setSending] = React.useState(false);
  const submit = async () => {
    if (sending) return;
    setSending(true);
    const subject = 'New application — ' + role + ' — ' + (data.firstName + ' ' + data.lastName).trim();
    // Field names MUST match the hidden static form in index.html (name="careers")
    // so Netlify renders the values in the dashboard and notification email.
    const ok = await (window.sendByEmail ? window.sendByEmail({
      formName: 'careers',
      subject,
      fields: {
        role: role,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        credential: data.credential,
        yearsExp: data.yearsExp,
        resumeLink: data.resumeLink || '',
        resumeName: resumeFile ? resumeFile.name : (data.resumeLink ? 'See link' : 'Not provided'),
        availability: data.availability,
        languages: data.languages,
        about: data.about,
      },
      file: resumeFile ? { field: 'resume', file: resumeFile } : null,
    }) : Promise.resolve(false));

    setSending(false);
    setSubmitOk(ok);
    setSent(true);
  };

  return (
    <div style={{position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
      <div onClick={onClose} style={{position:'absolute', inset:0, background:'rgba(31,46,26,0.5)'}}/>
      <div className="card" style={{position:'relative', width:'min(640px, 100%)', padding:36, maxHeight:'90vh', overflowY:'auto', background:'var(--surface)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8, gap:16}}>
          <div>
            <div className="mono" style={{color}}>Apply</div>
            <h3 style={{fontFamily:"'DM Sans',sans-serif", marginTop:4}}>{role}</h3>
          </div>
          <button onClick={onClose} style={{width:36, height:36, borderRadius:'50%', border:'1px solid var(--line)', background:'var(--bg)', fontSize:20}}>×</button>
        </div>
        {sent ? (
          <div style={{padding:'24px 0'}}>
            <div style={{width:56, height:56, borderRadius:'50%', background:`color-mix(in srgb, ${submitOk ? color : 'var(--brand-berry)'} 18%, transparent)`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18}}>
              <Icon name={submitOk ? 'check' : 'mail'} size={28} color={submitOk ? color : 'var(--brand-berry)'}/>
            </div>
            {submitOk ? (
              <>
                <h4 style={{fontFamily:"'DM Sans',sans-serif", fontSize:22, marginBottom:10}}>Application received — thank you!</h4>
                <p style={{color:'var(--ink-soft)', marginBottom:14, fontSize:15}}>
                  Your application {resumeFile ? <>and resume (<strong>{resumeFile.name}</strong>) were </> : 'was '}
                  sent straight to <strong style={{color:'var(--brand-green)'}}>info@noortherapycenter.com</strong>. We read every one and typically reply within a few business days.
                </p>
              </>
            ) : (
              <>
                <h4 style={{fontFamily:"'DM Sans',sans-serif", fontSize:22, marginBottom:10}}>We couldn't submit that automatically.</h4>
                <p style={{color:'var(--ink-soft)', marginBottom:14, fontSize:15}}>
                  Something went wrong sending your application. Please email us directly at <a href="mailto:info@noortherapycenter.com" style={{color:'var(--brand-green)'}}>info@noortherapycenter.com</a> and attach your resume — we'll take it from there.
                </p>
              </>
            )}
            <div style={{display:'flex', gap:12, justifyContent:'flex-end', flexWrap:'wrap'}}>
              <button className="btn" onClick={onClose} style={{background:color, color:'#fff'}}>Done</button>
            </div>
          </div>
        ) : (
        <>
        <p style={{color:'var(--ink-soft)', marginBottom:24, fontSize:14}}>
          Fill this out and your application — resume included — goes straight to <strong style={{color:'var(--brand-green)'}}>info@noortherapycenter.com</strong>. No email app required.
        </p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}} className="form-2col">
          <div className="field"><label>First name *</label><input value={data.firstName} onChange={e=>upd('firstName', e.target.value)}/></div>
          <div className="field"><label>Last name *</label><input value={data.lastName} onChange={e=>upd('lastName', e.target.value)}/></div>
          <div className="field"><label>Email *</label><input type="email" value={data.email} onChange={e=>upd('email', e.target.value)}/></div>
          <div className="field"><label>Phone *</label><input type="tel" value={data.phone} onChange={e=>upd('phone', e.target.value)}/></div>
          <div className="field"><label>City, State</label><input value={data.city} onChange={e=>upd('city', e.target.value)} placeholder="Minneapolis, MN"/></div>
          <div className="field"><label>Credentials</label><input value={data.credential} onChange={e=>upd('credential', e.target.value)} placeholder="BCBA, RBT, SLP, OT..."/></div>
          <div className="field"><label>Years of experience</label><input value={data.yearsExp} onChange={e=>upd('yearsExp', e.target.value)} placeholder="3"/></div>
          <div className="field"><label>Availability</label><input value={data.availability} onChange={e=>upd('availability', e.target.value)} placeholder="Full-time, part-time..."/></div>
        </div>

        {/* RESUME UPLOAD / DROP ZONE */}
        <div className="field">
          <label>Resume (PDF, DOC, or DOCX)</label>
          <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                 style={{display:'none'}} onChange={e => handleFile(e.target.files?.[0])}/>
          {resumeFile ? (
            <div style={{padding:'14px 16px', border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
              <div style={{display:'flex', alignItems:'center', gap:12, minWidth:0}}>
                <div style={{width:36, height:36, borderRadius:8, background:`color-mix(in srgb, ${color} 18%, transparent)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                  <Icon name="clipboard" size={18} color={color}/>
                </div>
                <div style={{minWidth:0}}>
                  <div style={{fontWeight:600, fontSize:14, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{resumeFile.name}</div>
                  <div style={{fontSize:12, color:'var(--ink-soft)'}}>{(resumeFile.size/1024).toFixed(0)} KB</div>
                </div>
              </div>
              <button onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value=''; }}
                      style={{width:32, height:32, borderRadius:'50%', border:'1px solid var(--line)', background:'var(--surface)', fontSize:16, cursor:'pointer', flexShrink:0}} aria-label="Remove file">×</button>
            </div>
          ) : (
            <div onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                 onDragLeave={() => setDragOver(false)}
                 onDrop={onDrop}
                 onClick={() => fileInputRef.current?.click()}
                 style={{
                   padding:'28px 20px', border:`2px dashed ${dragOver ? color : 'var(--line)'}`,
                   borderRadius:'var(--radius)', background: dragOver ? `color-mix(in srgb, ${color} 8%, var(--bg))` : 'var(--bg)',
                   textAlign:'center', cursor:'pointer', transition:'all .15s'
                 }}>
              <div style={{fontSize:28, marginBottom:6}}>📄</div>
              <div style={{fontWeight:600, marginBottom:4}}>Drop your resume here</div>
              <div style={{fontSize:13, color:'var(--ink-soft)'}}>or <span style={{color, textDecoration:'underline'}}>click to browse</span> · PDF, DOC, DOCX · max 10 MB</div>
            </div>
          )}
        </div>

        <div className="field"><label>Or paste a link (LinkedIn, Google Drive, etc.)</label><input value={data.resumeLink} onChange={e=>upd('resumeLink', e.target.value)} placeholder="https://..."/></div>
        <div className="field"><label>Languages spoken</label><input value={data.languages} onChange={e=>upd('languages', e.target.value)} placeholder="English, Somali, Spanish..."/></div>
        <div className="field"><label>Tell us why you want to join Noor</label><textarea rows="4" value={data.about} onChange={e=>upd('about', e.target.value)}/></div>
        <div style={{fontSize:12, color:'var(--ink-soft)', marginBottom:16}}>* Required. Your application will be emailed to info@noortherapycenter.com.</div>
        <div style={{display:'flex', gap:12, justifyContent:'flex-end', flexWrap:'wrap'}}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn" disabled={!canSubmit || sending} onClick={submit}
                  style={{background: (canSubmit && !sending) ? color : 'var(--line)', color:'#fff'}}>
            {sending ? 'Sending…' : <>Send application <Icon name="mail" size={16}/></>}
          </button>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

const CareersPage = () => {
  const [applyTo, setApplyTo] = React.useState(null);
  const openings = [
    {t:'Board Certified Behavior Analyst (BCBA)', l:'Remote', ty:'Full-time', c:'var(--brand-green)'},
    {t:'Behavior Technician (BT)', l:'St. Louis Park, MN', ty:'Full or part-time', c:'var(--brand-yellow)'},
    {t:'Registered Behavior Technician (RBT)', l:'St. Louis Park, MN', ty:'Full or part-time', c:'var(--brand-orange)'},
    {t:'Speech-Language Pathologist (CCC-SLP)', l:'St. Louis Park, MN', ty:'Part-time', c:'var(--brand-blue)'},
    {t:'Occupational Therapist (OTR/L)', l:'St. Louis Park, MN', ty:'Part-time', c:'var(--brand-purple)'},
  ];
  return (
    <div>
      <PageHero eyebrow="Careers" title="Help us build the agency the Twin Cities deserves."
        sub="Noor is built on a simple idea: clinicians do their best work when they're trusted, paid well, and given enough time. If that resonates, we'd love to meet you."/>
      <section className="section-sm">
        <div className="container">
          <div className="grid grid-3" style={{marginBottom:64}}>
            {[
              {t:'Small caseloads, real time',d:'Our BCBAs carry 6–8 clients. That means time for good clinical decisions, not just billable ones.', c:'var(--brand-orange)'},
              {t:'Pay that respects you',d:'Above-market compensation and full benefits. We\'re growing — more perks coming as we scale.', c:'var(--brand-green)'},
              {t:'A team that speaks your language',d:'Literally — we\'re multilingual. And figuratively — no toxic positivity, no manipulation metrics.', c:'var(--brand-blue)'},
              {t:'PTO you actually use',d:'20 days + 10 holidays. The leadership team takes it, and we expect you to.', c:'var(--brand-purple)'},
              {t:'Mentorship, not management',d:'Weekly 1:1s with leadership. Professional growth planning. No one rides alone here.', c:'var(--brand-berry)'},
              {t:'Flexibility, honestly',d:'In-home, center, or hybrid. School hours. Early evening shifts. We build around your life too.', c:'var(--brand-pink)'},
            ].map((x,i)=>(
              <div key={i} className="card" style={{padding:28}}>
                <div style={{width:44, height:44, borderRadius:12, background:`color-mix(in srgb, ${x.c} 20%, transparent)`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16}}>
                  <Icon name="star" size={22} color={x.c}/>
                </div>
                <h4 style={{marginBottom:8, fontFamily:"'DM Sans',sans-serif", fontSize:20, fontWeight:600}}>{x.t}</h4>
                <p style={{color:'var(--ink-soft)', fontSize:15}}>{x.d}</p>
              </div>
            ))}
          </div>

          <h2 style={{marginBottom:24}}>Open roles</h2>
          <div className="grid" style={{gap:12}}>
            {openings.map((o,i)=>(
              <div key={i} className="card-flat career-row" style={{padding:24, display:'grid', gridTemplateColumns:'auto 1fr auto', alignItems:'center', gap:24, transition:'border-color .15s'}}
                   onMouseEnter={e=>e.currentTarget.style.borderColor='var(--ink)'}
                   onMouseLeave={e=>e.currentTarget.style.borderColor='var(--line)'}>
                <div style={{width:12, height:40, borderRadius:6, background:o.c}} className="career-bar"/>
                <div>
                  <h4 style={{fontSize:20, fontFamily:"'DM Sans',sans-serif", fontWeight:600, marginBottom:4}}>{o.t}</h4>
                  <div style={{display:'flex', gap:12, fontSize:14, color:'var(--ink-soft)', flexWrap:'wrap'}}>
                    <span>📍 {o.l}</span>
                    <span>· {o.ty}</span>
                  </div>
                </div>
                <button className="btn" style={{background:o.c, color:'#fff'}} onClick={() => setApplyTo(o)}>Apply <Icon name="arrow" size={14}/></button>
              </div>
            ))}
          </div>

          <div className="card" style={{marginTop:48, padding:32, background:'var(--brand-yellow)', borderColor:'transparent'}}>
            <h3 style={{fontFamily:"'DM Sans',sans-serif", marginBottom:10}}>Don't see your role?</h3>
            <p style={{color:'var(--ink)', marginBottom:16}}>We're always interested in talented clinicians and support staff. Send us your resume and a note about what you're looking for — we read every message.</p>
            <a className="btn" style={{background:'var(--ink)', color:'var(--brand-yellow)'}}
               href="mailto:info@noortherapycenter.com?subject=General%20career%20inquiry&body=Hi%20Noor%20team%2C%0A%0AMy%20background%3A%20%0AWhat%20I%27m%20looking%20for%3A%20%0A%0A%28Attach%20your%20resume%20to%20this%20email%29">
              Email us directly <Icon name="mail" size={16}/>
            </a>
          </div>
        </div>
      </section>
      {applyTo && <CareerApplyForm role={applyTo.t} color={applyTo.c} onClose={() => setApplyTo(null)}/>}
    </div>
  );
};

Object.assign(window, { AboutPage, ServicesPage, ApproachPage, FamiliesPage, FAQPage, TestimonialsPage, CareersPage, PageHero, sendByEmail });
