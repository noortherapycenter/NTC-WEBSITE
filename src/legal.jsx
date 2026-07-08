// Legal pages: Privacy, HIPAA Notice, Accessibility, Good Faith Estimate
// NOTE: This content is a clinically reasonable starting point drafted for
// Noor Therapy Center. It is NOT a substitute for legal review. Please have
// your healthcare attorney/compliance officer review and customize before launch.

const LegalShell = ({ eyebrow, title, sub, effective, children, accent = 'var(--brand-green)' }) => (
  <div>
    <PageHero eyebrow={eyebrow} title={title} sub={sub}/>
    <section className="section-sm">
      <div className="container" style={{maxWidth:820}}>
        <div className="card" style={{padding:'18px 22px', background:'var(--bg)', borderLeft:`4px solid ${accent}`, marginBottom:32, fontSize:14, color:'var(--ink-soft)'}}>
          <strong style={{color:'var(--ink)'}}>Effective date:</strong> {effective}
          <span style={{margin:'0 10px', opacity:0.5}}>·</span>
          <span>Questions? Email <a style={{color:accent, fontWeight:600}} href="mailto:info@noortherapycenter.com">info@noortherapycenter.com</a> or call <a style={{color:accent, fontWeight:600}} href="tel:+16127039022">(612) 703-9022</a>.</span>
        </div>
        <div className="legal-body">
          {children}
        </div>
        <div style={{marginTop:48, paddingTop:24, borderTop:'1px solid var(--line)', display:'flex', gap:14, flexWrap:'wrap'}}>
          <button className="btn" style={{background:'var(--brand-green)', color:'#fff'}} onClick={()=>window.navigate('contact')}>Contact us <Icon name="arrow" size={14}/></button>
          <button className="btn btn-ghost" onClick={()=>window.navigate('home')}>Back to home</button>
        </div>
      </div>
    </section>
  </div>
);

const LegalH2 = ({ children }) => (
  <h2 style={{fontSize:28, marginTop:40, marginBottom:14}}>{children}</h2>
);
const LegalP = ({ children }) => (
  <p style={{color:'var(--ink-soft)', fontSize:16, lineHeight:1.7, marginBottom:14}}>{children}</p>
);
const LegalList = ({ items }) => (
  <ul style={{paddingLeft:20, marginBottom:14, color:'var(--ink-soft)', fontSize:16, lineHeight:1.7}}>
    {items.map((x,i)=><li key={i} style={{marginBottom:6}}>{x}</li>)}
  </ul>
);

// ---------------- PRIVACY ----------------
const PrivacyPage = () => (
  <LegalShell
    eyebrow="Legal"
    title="Privacy Policy"
    sub="How Noor Therapy Center collects, uses, and protects information when you visit our website or contact our team."
    effective="January 1, 2026"
  >
    <LegalP>
      This Privacy Policy explains how Noor Therapy Center ("Noor," "we," "us") collects and uses information through our website at noortherapycenter.com. Information you share with us as a patient or family is also covered by our <a style={{color:'var(--brand-green)', fontWeight:600, cursor:'pointer'}} onClick={()=>window.navigate('hipaa')}>HIPAA Notice of Privacy Practices</a>, which governs protected health information.
    </LegalP>

    <LegalH2>Information we collect</LegalH2>
    <LegalList items={[
      'Information you provide directly: name, email, phone number, child\'s age, ZIP code, insurance, language preference, and anything you write in our intake or contact forms.',
      'Information collected automatically: browser type, device type, pages visited, referring site, and approximate location, collected through standard server logs and privacy-respecting analytics.',
      'Cookies: small files we may use to remember your preferences and measure aggregate site usage. You can disable cookies in your browser settings.',
    ]}/>

    <LegalH2>How we use information</LegalH2>
    <LegalList items={[
      'To respond to intake requests, verify insurance benefits, and schedule services.',
      'To send appointment confirmations, intake updates, and service-related communication.',
      'To improve our website, services, and family experience.',
      'To meet legal, regulatory, and accreditation obligations.',
    ]}/>

    <LegalH2>How we share information</LegalH2>
    <LegalP>We do not sell your information. We share it only:</LegalP>
    <LegalList items={[
      'With service providers (e.g., scheduling, secure email, EHR vendors) bound by written confidentiality agreements.',
      'With insurance payers and care partners when required to deliver or bill for your services.',
      'When required by law, court order, or to protect health and safety.',
    ]}/>

    <LegalH2>Your choices</LegalH2>
    <LegalList items={[
      'You can decline to provide information, though some services may not be available without it.',
      'You can ask us to update, correct, or delete information you submitted through our website.',
      'You can unsubscribe from marketing emails at any time using the link in any email.',
    ]}/>

    <LegalH2>Children\u2019s information</LegalH2>
    <LegalP>
      Our website is not directed to children under 13. Parents and guardians submit intake information about minor children on their behalf. We treat children\u2019s information with the strictest care and follow HIPAA, FERPA where applicable, and Minnesota law.
    </LegalP>

    <LegalH2>Security</LegalH2>
    <LegalP>
      We use administrative, physical, and technical safeguards to protect information, including encrypted transmission and storage, role-based access, and routine security review. No method of transmission over the internet is 100% secure, but we work hard to protect what you entrust to us.
    </LegalP>

    <LegalH2>Changes to this policy</LegalH2>
    <LegalP>
      We may update this policy from time to time. The effective date above will change when we do. Material changes will be posted prominently on this page.
    </LegalP>

    <LegalH2>Contact</LegalH2>
    <LegalP>
      Questions about this Privacy Policy or our practices? Email info@noortherapycenter.com, call (612) 703-9022, or write to: Noor Therapy Center, 6250 Excelsior Blvd, Suite 102, St. Louis Park, MN 55416.
    </LegalP>
  </LegalShell>
);

// ---------------- HIPAA ----------------
const HipaaPage = () => (
  <LegalShell
    eyebrow="Legal"
    title="Notice of Privacy Practices"
    sub="This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully."
    effective="January 1, 2026"
    accent="var(--brand-purple)"
  >
    <LegalP>
      Noor Therapy Center is required by the Health Insurance Portability and Accountability Act (HIPAA) to maintain the privacy of your Protected Health Information (PHI), provide you with this notice of our legal duties and privacy practices, and follow the terms of the notice currently in effect.
    </LegalP>

    <LegalH2>How we may use and disclose your information</LegalH2>
    <LegalP><strong style={{color:'var(--ink)'}}>For treatment.</strong> We use your information to plan and deliver care \u2014 e.g., your BCBA designing a treatment plan, our therapists coordinating with your child\u2019s speech-language pathologist or pediatrician.</LegalP>
    <LegalP><strong style={{color:'var(--ink)'}}>For payment.</strong> We use your information to verify benefits, obtain authorizations, and bill insurance for services rendered.</LegalP>
    <LegalP><strong style={{color:'var(--ink)'}}>For health care operations.</strong> We use your information for internal activities such as clinical quality review, staff training, scheduling, and credentialing.</LegalP>

    <LegalH2>Other uses and disclosures permitted or required by law</LegalH2>
    <LegalList items={[
      'Public health activities and reporting required by Minnesota or federal law.',
      'Reporting suspected abuse, neglect, or domestic violence as required by law.',
      'Health oversight activities (audits, investigations, inspections).',
      'Judicial and administrative proceedings (in response to a court order or valid subpoena).',
      'Law enforcement, when required by law or pursuant to legal process.',
      'To avert a serious threat to health or safety.',
      'Workers\u2019 compensation, as required by Minnesota law.',
    ]}/>

    <LegalH2>Uses and disclosures that require your written authorization</LegalH2>
    <LegalP>
      We will not use or disclose your information for marketing, sale of PHI, or most psychotherapy notes, or share it with anyone other than those involved in your care, without your written authorization. You may revoke an authorization in writing at any time.
    </LegalP>

    <LegalH2>Your rights</LegalH2>
    <LegalList items={[
      'Right to inspect and copy your records.',
      'Right to request an amendment to records you believe are incorrect or incomplete.',
      'Right to an accounting of certain disclosures we have made.',
      'Right to request restrictions on certain uses or disclosures (we may not be able to honor every request).',
      'Right to request confidential communications (e.g., a specific phone number).',
      'Right to a paper copy of this Notice at any time.',
      'Right to be notified of any breach of unsecured PHI.',
    ]}/>

    <LegalH2>How to exercise your rights or file a complaint</LegalH2>
    <LegalP>
      Submit requests in writing to our Privacy Officer at the address below. If you believe your privacy rights have been violated, you may file a complaint with our Privacy Officer or with the U.S. Department of Health and Human Services, Office for Civil Rights. We will not retaliate against you for filing a complaint.
    </LegalP>

    <LegalH2>Changes to this notice</LegalH2>
    <LegalP>
      We reserve the right to change this notice and to make the new notice apply to all PHI we maintain. The current notice will always be available at our St. Louis Park center and on this website.
    </LegalP>

    <LegalH2>Contact our Privacy Officer</LegalH2>
    <LegalP>
      Noor Therapy Center, Attn: Privacy Officer, 6250 Excelsior Blvd, Suite 102, St. Louis Park, MN 55416. Phone: (612) 703-9022. Email: info@noortherapycenter.com.
    </LegalP>
  </LegalShell>
);

// ---------------- ACCESSIBILITY ----------------
const AccessibilityPage = () => (
  <LegalShell
    eyebrow="Legal"
    title="Accessibility Statement"
    sub="We are committed to making Noor Therapy Center\u2014both our website and our care\u2014accessible to every family we serve."
    effective="January 1, 2026"
    accent="var(--brand-blue)"
  >
    <LegalH2>Our commitment</LegalH2>
    <LegalP>
      Noor Therapy Center is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
    </LegalP>

    <LegalH2>Standards we follow</LegalH2>
    <LegalP>
      We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, published by the World Wide Web Consortium (W3C). These guidelines explain how to make web content more accessible to people with a wide range of disabilities, including visual, auditory, physical, speech, cognitive, and neurological disabilities.
    </LegalP>

    <LegalH2>What we do</LegalH2>
    <LegalList items={[
      'Design with sufficient color contrast and scalable text.',
      'Provide alt text for images and meaningful labels for interactive elements.',
      'Support keyboard navigation throughout the site.',
      'Test new pages and templates with screen readers.',
      'Translate intake materials into Soomaali, Arabic, and Spanish on request.',
      'Provide reasonable accommodations for in-person care at our St. Louis Park center.',
    ]}/>

    <LegalH2>Known limitations</LegalH2>
    <LegalP>
      Despite our best efforts, some content may not be fully accessible. Where we know of limitations, we work to address them. If you encounter a barrier, please let us know \u2014 we want to fix it.
    </LegalP>

    <LegalH2>How to request accommodation or report a barrier</LegalH2>
    <LegalP>
      If you need help accessing any information on this site, or would like to request a reasonable accommodation for in-person care, please contact us. We aim to respond within two business days.
    </LegalP>
    <LegalList items={[
      'Phone: (612) 703-9022',
      'Email: info@noortherapycenter.com',
      'Mail: Noor Therapy Center, 6250 Excelsior Blvd, Suite 102, St. Louis Park, MN 55416',
    ]}/>
  </LegalShell>
);

// ---------------- GOOD FAITH ESTIMATE ----------------
const GoodFaithPage = () => (
  <LegalShell
    eyebrow="Legal"
    title="Good Faith Estimate"
    sub="Your Right to a Good Faith Estimate of expected charges, under the federal No Surprises Act."
    effective="January 1, 2026"
    accent="var(--brand-yellow)"
  >
    <LegalH2>Your right to a Good Faith Estimate</LegalH2>
    <LegalP>
      Under the federal <strong style={{color:'var(--ink)'}}>No Surprises Act</strong>, you have the right to receive a Good Faith Estimate (GFE) explaining how much your medical care will cost.
    </LegalP>
    <LegalList items={[
      'Health care providers must give patients who do not have insurance, or who are not using insurance, an estimate of the bill for medical items and services.',
      'You have the right to receive a Good Faith Estimate for the total expected cost of any non-emergency items or services. This includes related costs like medical tests, prescription drugs, equipment, and hospital fees.',
      'You can ask your health care provider, and any other provider you choose, for a Good Faith Estimate before you schedule an item or service.',
      'If you receive a bill that is at least $400 more than your Good Faith Estimate, you can dispute the bill.',
      'Make sure to save a copy or picture of your Good Faith Estimate.',
    ]}/>

    <LegalH2>How we provide your estimate</LegalH2>
    <LegalP>
      If you are uninsured or choose not to use your insurance for ABA, speech, or occupational therapy services at Noor, our intake coordinator will provide a written Good Faith Estimate before your first scheduled service. The estimate will include:
    </LegalP>
    <LegalList items={[
      'A description of the primary services to be provided (e.g., ABA assessment, treatment hours per week, supervision hours).',
      'The diagnosis code(s) and service code(s) expected.',
      'The expected charge for each service.',
      'A statement of the total expected charge.',
    ]}/>

    <LegalH2>What is not included</LegalH2>
    <LegalP>
      A Good Faith Estimate does not include any unknown or unexpected costs that may arise during treatment. Significant changes to your plan of care will trigger an updated estimate.
    </LegalP>

    <LegalH2>How to request a Good Faith Estimate</LegalH2>
    <LegalList items={[
      'Phone: (612) 703-9022',
      'Email: info@noortherapycenter.com',
      'In person at our St. Louis Park center.',
    ]}/>
    <LegalP>
      You may request a Good Faith Estimate at any time, before or after scheduling a service. We will provide it within the timeframes required by federal law.
    </LegalP>

    <LegalH2>Your right to dispute a bill</LegalH2>
    <LegalP>
      If you receive a bill that is at least $400 more than your Good Faith Estimate, you may dispute the bill through the federal patient-provider dispute resolution process. You must start the dispute process within 120 calendar days of the date on the original bill. Learn more or start a dispute at <a style={{color:'var(--brand-green)', fontWeight:600}} href="https://www.cms.gov/nosurprises" target="_blank" rel="noopener">www.cms.gov/nosurprises</a> or call 1-800-985-3059.
    </LegalP>
  </LegalShell>
);

Object.assign(window, { PrivacyPage, HipaaPage, AccessibilityPage, GoodFaithPage });
