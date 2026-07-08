// Resources / Blog — traditional data-driven ABA content
// Each article has a cartoon SVG illustration cover (no photos).

const BlogIllustration = ({ variant, color1, color2, color3 }) => {
  // 10 variants of flat, cartoon-style illustrations.
  const bg = color1 || '#F7E9B0';
  const a = color2 || '#2F7D4F';
  const b = color3 || '#E07A5F';
  const ink = '#1F2E1A';
  const common = { width: '100%', height: '100%', viewBox: '0 0 400 240', preserveAspectRatio: 'xMidYMid slice' };

  if (variant === 'data') return (
    <svg {...common}>
      <rect width="400" height="240" fill={bg}/>
      {/* clipboard */}
      <rect x="90" y="40" width="220" height="170" rx="14" fill="#fff" stroke={ink} strokeWidth="3"/>
      <rect x="165" y="30" width="70" height="22" rx="6" fill={a} stroke={ink} strokeWidth="3"/>
      {/* bars */}
      <rect x="110" y="150" width="22" height="40" fill={a} stroke={ink} strokeWidth="2.5"/>
      <rect x="142" y="120" width="22" height="70" fill={b} stroke={ink} strokeWidth="2.5"/>
      <rect x="174" y="95" width="22" height="95" fill="#F4C95D" stroke={ink} strokeWidth="2.5"/>
      <rect x="206" y="75" width="22" height="115" fill={a} stroke={ink} strokeWidth="2.5"/>
      <rect x="238" y="60" width="22" height="130" fill={b} stroke={ink} strokeWidth="2.5"/>
      {/* trend arrow */}
      <path d="M110 180 L260 70" stroke={ink} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <polygon points="255,64 268,68 262,80" fill={ink}/>
    </svg>
  );

  if (variant === 'blocks') return (
    <svg {...common}>
      <rect width="400" height="240" fill={bg}/>
      {/* child head */}
      <circle cx="130" cy="110" r="42" fill="#F4C495" stroke={ink} strokeWidth="3"/>
      <circle cx="120" cy="105" r="3.5" fill={ink}/>
      <circle cx="140" cy="105" r="3.5" fill={ink}/>
      <path d="M120 122 Q130 130 140 122" stroke={ink} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M90 85 Q130 55 170 85" stroke={ink} strokeWidth="3" fill={ink}/>
      {/* blocks stack */}
      <rect x="220" y="160" width="44" height="44" fill={a} stroke={ink} strokeWidth="3"/>
      <rect x="220" y="116" width="44" height="44" fill={b} stroke={ink} strokeWidth="3"/>
      <rect x="220" y="72" width="44" height="44" fill="#F4C95D" stroke={ink} strokeWidth="3"/>
      <text x="242" y="190" fontSize="22" fontWeight="700" textAnchor="middle" fill={ink}>A</text>
      <text x="242" y="146" fontSize="22" fontWeight="700" textAnchor="middle" fill={ink}>B</text>
      <text x="242" y="102" fontSize="22" fontWeight="700" textAnchor="middle" fill={ink}>C</text>
    </svg>
  );

  if (variant === 'speech') return (
    <svg {...common}>
      <rect width="400" height="240" fill={bg}/>
      {/* two speech bubbles */}
      <path d="M60 60 h130 a18 18 0 0 1 18 18 v60 a18 18 0 0 1 -18 18 h-90 l-30 26 v-26 h-10 a18 18 0 0 1 -18 -18 v-60 a18 18 0 0 1 18 -18 z" fill="#fff" stroke={ink} strokeWidth="3"/>
      <circle cx="95" cy="108" r="4.5" fill={a}/>
      <circle cx="125" cy="108" r="4.5" fill={b}/>
      <circle cx="155" cy="108" r="4.5" fill="#F4C95D"/>
      <path d="M210 100 h130 a18 18 0 0 1 18 18 v60 a18 18 0 0 1 -18 18 h-60 l-30 26 v-26 h-40 a18 18 0 0 1 -18 -18 v-60 a18 18 0 0 1 18 -18 z" fill={a} stroke={ink} strokeWidth="3"/>
      <text x="275" y="155" fontSize="32" fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="DM Sans, sans-serif">Hi!</text>
    </svg>
  );

  if (variant === 'house') return (
    <svg {...common}>
      <rect width="400" height="240" fill={bg}/>
      {/* house */}
      <polygon points="200,40 90,130 310,130" fill={b} stroke={ink} strokeWidth="3"/>
      <rect x="110" y="130" width="180" height="90" fill="#fff" stroke={ink} strokeWidth="3"/>
      <rect x="180" y="160" width="40" height="60" fill={a} stroke={ink} strokeWidth="3"/>
      <circle cx="212" cy="192" r="3" fill={ink}/>
      <rect x="130" y="150" width="30" height="30" fill="#F4C95D" stroke={ink} strokeWidth="3"/>
      <rect x="240" y="150" width="30" height="30" fill="#F4C95D" stroke={ink} strokeWidth="3"/>
      {/* heart */}
      <path d="M340 80 a18 18 0 0 1 30 0 a18 18 0 0 1 30 0 q0 26 -30 46 q-30 -20 -30 -46 z" fill={a} stroke={ink} strokeWidth="3" transform="translate(-30 -10)"/>
    </svg>
  );

  if (variant === 'calendar') return (
    <svg {...common}>
      <rect width="400" height="240" fill={bg}/>
      <rect x="80" y="50" width="240" height="160" rx="10" fill="#fff" stroke={ink} strokeWidth="3"/>
      <rect x="80" y="50" width="240" height="40" rx="10" fill={a}/>
      <rect x="80" y="80" width="240" height="10" fill={a}/>
      <rect x="110" y="38" width="14" height="28" rx="3" fill={ink}/>
      <rect x="276" y="38" width="14" height="28" rx="3" fill={ink}/>
      {[0,1,2,3].map(r => [0,1,2,3,4].map(c => (
        <rect key={`${r}-${c}`} x={95 + c*44} y={105 + r*24} width="34" height="18" rx="3" fill={r===1 && c===2 ? b : '#F0ECE3'} stroke={ink} strokeWidth="1.5"/>
      )))}
      <circle cx="212" cy="139" r="4" fill="#fff"/>
    </svg>
  );

  if (variant === 'puzzle') return (
    <svg {...common}>
      <rect width="400" height="240" fill={bg}/>
      <g transform="translate(120 50)">
        <path d="M0 0 h70 v20 a15 15 0 0 0 20 0 v-20 h70 v70 h20 a15 15 0 0 0 0 20 h-20 v70 h-160 z" fill={a} stroke={ink} strokeWidth="3"/>
        <path d="M 160 70 h 20 a 15 15 0 0 1 0 20 h-20" fill={b} stroke={ink} strokeWidth="3"/>
      </g>
      <circle cx="305" cy="80" r="18" fill="#F4C95D" stroke={ink} strokeWidth="3"/>
      <path d="M295 78 l6 6 l12 -12" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );

  if (variant === 'book') return (
    <svg {...common}>
      <rect width="400" height="240" fill={bg}/>
      <path d="M80 60 q60 -15 120 0 q60 -15 120 0 v140 q-60 -15 -120 0 q-60 -15 -120 0 z" fill="#fff" stroke={ink} strokeWidth="3"/>
      <line x1="200" y1="60" x2="200" y2="200" stroke={ink} strokeWidth="3"/>
      {[0,1,2].map(i => (
        <line key={i} x1="105" y1={90+i*24} x2="185" y2={90+i*24} stroke={a} strokeWidth="3" strokeLinecap="round"/>
      ))}
      {[0,1,2].map(i => (
        <line key={i} x1="215" y1={90+i*24} x2="295" y2={90+i*24} stroke={b} strokeWidth="3" strokeLinecap="round"/>
      ))}
      <circle cx="200" cy="180" r="10" fill="#F4C95D" stroke={ink} strokeWidth="2.5"/>
    </svg>
  );

  if (variant === 'hands') return (
    <svg {...common}>
      <rect width="400" height="240" fill={bg}/>
      {/* big hand */}
      <path d="M100 160 q-5 -40 20 -80 q10 -10 20 0 l0 60 q15 -30 30 -20 q10 5 0 25 q15 -15 25 -5 q10 5 -5 25 q10 -5 15 5 q5 15 -20 30 l-60 10 q-30 0 -25 -50 z" fill="#F4C495" stroke={ink} strokeWidth="3" strokeLinejoin="round"/>
      {/* small hand */}
      <path d="M260 170 q-3 -25 13 -50 q6 -7 13 0 l0 38 q10 -18 19 -12 q6 3 0 16 q9 -10 16 -3 q6 3 -3 16 q6 -3 10 3 q3 10 -13 19 l-38 6 q-20 0 -17 -33 z" fill="#8B5A3C" stroke={ink} strokeWidth="3" strokeLinejoin="round"/>
      <path d="M205 140 l8 8 l-8 8" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M195 140 l-8 8 l8 8" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );

  if (variant === 'star') return (
    <svg {...common}>
      <rect width="400" height="240" fill={bg}/>
      <circle cx="200" cy="120" r="68" fill={a} stroke={ink} strokeWidth="3"/>
      <polygon points="200,80 212,108 242,110 219,129 227,158 200,142 173,158 181,129 158,110 188,108" fill="#F4C95D" stroke={ink} strokeWidth="3" strokeLinejoin="round"/>
      <circle cx="100" cy="60" r="6" fill={b}/>
      <circle cx="320" cy="80" r="8" fill={b}/>
      <circle cx="80" cy="180" r="5" fill="#F4C95D"/>
      <circle cx="340" cy="180" r="7" fill={a}/>
    </svg>
  );

  // default: plus/check
  return (
    <svg {...common}>
      <rect width="400" height="240" fill={bg}/>
      <circle cx="200" cy="120" r="70" fill={a} stroke={ink} strokeWidth="3"/>
      <path d="M168 122 l22 22 l44 -46" stroke="#fff" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const ARTICLES = [
  {
    id:'what-is-aba',
    cat:'ABA Basics',
    catColor:'var(--brand-green)',
    title:'What is ABA therapy? A plain-English introduction',
    dek:'Applied Behavior Analysis is the most researched, evidence-based treatment for autism. Here is how traditional, data-driven ABA actually works.',
    read:'14 min read',
    illus:{variant:'blocks', color1:'#FDF3D8', color2:'#2F7D4F', color3:'#E07A5F'},
    body: [
      {h:'The short version', p:'Applied Behavior Analysis (ABA) is the science of how learning happens. It uses principles such as positive reinforcement, prompting, shaping, and systematic skill-building to teach children with autism functional communication, social, academic, play, and daily-living skills. ABA is the most extensively researched treatment for autism spectrum disorder, with more than fifty years of peer-reviewed evidence supporting its effectiveness. When parents say their child made dramatic progress in therapy, the underlying methodology is almost always ABA.'},
      {h:'Where ABA comes from', p:'ABA grew out of behavioral psychology in the 1950s and 1960s, with researchers like B.F. Skinner laying the foundation for operant learning and clinicians like Ivar Lovaas adapting those principles for autism treatment in the 1970s. Modern ABA is dramatically different from those early programs. Today\'s ABA is naturalistic, child-led where possible, family-centered, and built on positive reinforcement rather than the punishment-based procedures of the past. We say this directly because families ask us about it, and they deserve a straight answer.'},
      {h:'What traditional, data-driven ABA looks like', p:'Every Noor program is built around measurable goals, written by a Board Certified Behavior Analyst (BCBA) after a detailed assessment. A Behavior Technician (BT) or Registered Behavior Technician (RBT) delivers 1:1 therapy using structured teaching procedures \u2014 discrete trial instruction, natural environment teaching, task analysis, behavior skills training, and prompt-and-fade procedures. Data is collected on every learning opportunity. The BCBA reviews graphs weekly, modifies the program based on what the data shows, and meets regularly with the family.'},
      {h:'The role of the BCBA', p:'A Board Certified Behavior Analyst is a master\'s-level clinician credentialed by the Behavior Analyst Certification Board (BACB). The BCBA is the clinical lead on your child\'s case: they complete the assessment, write the Individual Treatment Plan, design every program, train and supervise the BT/RBT team, review data, lead parent training, and rewrite the plan as your child progresses. Ask any agency you interview how many children each of their BCBAs supervises. Caseloads above 12-15 typically mean less supervision per child.'},
      {h:'The role of the BT/RBT', p:'A Behavior Technician (BT) or Registered Behavior Technician (RBT) is the person who is in the room with your child for most therapy hours. They deliver the programs the BCBA designed, take data on every teaching trial, build rapport, and adapt in real time to your child\'s engagement. An RBT has completed a 40-hour training and a competency assessment certified by the BACB. A BT has equivalent in-house training under direct BCBA supervision. Both are required to follow the same clinical standards.'},
      {h:'Data drives every decision', p:'At every session, the BT/RBT records data on each target skill: whether the response was correct, what level of prompting was needed, how long the child engaged, and whether challenging behaviors occurred. The BCBA reviews graphs weekly. If a skill is progressing, the program stays. If a skill is stuck, the program is modified \u2014 a different prompt strategy, a smaller teaching step, a different reinforcer, a different motivating context. Every change is documented and tied to a clinical rationale. Nothing in ABA is left to guesswork \u2014 the data tells us what is working.'},
      {h:'Reinforcement, not punishment', p:'Modern ABA teaches new skills through positive reinforcement \u2014 pairing new behaviors with things the child enjoys. Challenging behaviors are addressed by teaching replacement skills (like asking for a break) rather than through punishment. We do not use aversives, withholding, or any procedure that produces fear or shame. If you ever observe something during therapy that feels coercive, tell your BCBA immediately \u2014 every clinician at Noor is trained to stop and listen.'},
      {h:'What ABA actually teaches', p:'The skill domains vary by child and age, but common targets include: requesting wants and needs (manding), responding to questions (intraverbals), naming and identifying objects (tacting and listener responding), imitation, play skills, social engagement and joint attention, daily living skills (toileting, dressing, mealtime), pre-academic skills, safety skills, and self-regulation. Equally important: behavior reduction goals, where we teach a child what to do instead of a behavior that gets in the way of learning or community participation.'},
      {h:'Naturalistic vs structured teaching', p:'Two main teaching styles sit inside any good ABA program. Discrete Trial Teaching (DTT) uses structured, repeated learning opportunities \u2014 useful for rapid acquisition of foundational skills. Natural Environment Teaching (NET) embeds learning into play and daily routines \u2014 useful for generalization and social communication. A skilled team uses both, weighted to your child\'s age, attention span, and goals. For young children, NET typically makes up the majority of the day.'},
      {h:'How many hours per week', p:'Hours are clinically recommended by your BCBA based on your child\'s assessment, age, and goals \u2014 not by insurance caps or revenue targets. Very young children (under 4) often benefit from comprehensive programming of 25-35 hours per week. School-age children with more targeted goals may thrive at 10-20 hours. Adolescents working on specific skills may need only 5-10 hours. Be skeptical of any agency that recommends 30-40 hours for every child regardless of clinical need.'},
      {h:'Where ABA happens', p:'ABA can be delivered in your home, at a center, at school (with school agreement), in the community, or any combination. Many young children start with a mix of in-home and center-based hours: in-home for routines like mealtime and bedtime, center-based for peer interaction and pre-academic readiness. The setting is a clinical decision, not a logistical one \u2014 your BCBA recommends what the goals require.'},
      {h:'Who ABA helps', p:'ABA has decades of peer-reviewed research supporting its use with autistic children and children with related developmental conditions. Outcomes are strongest when therapy begins early (before age 5), when parents are actively involved, when hours are matched to clinical need, when the team has low turnover, and when the BCBA stays involved through frequent supervision. ABA is not a cure for autism and our goal is never to make autistic kids "look less autistic" \u2014 it is to help them communicate, participate, and thrive on their own terms.'},
      {h:'Common misconceptions', p:'ABA is not just for severe behaviors. It is not just for nonverbal children. It is not the same as the harsh practices of the 1970s. It does not require 40 hours per week. It does not require eye contact or "indistinguishability" from neurotypical peers as a goal. It is not in conflict with neurodiversity \u2014 modern ABA centers the autistic child\'s preferences, autonomy, and dignity at every step. A good provider will tell you exactly what they do and why, and welcome your questions.'},
      {h:'How to know it is working', p:'You should see your child making measurable progress on the goals in their Individual Treatment Plan, you should see formal progress reports with graphs at least every six months, you should see your BCBA frequently (not just during the initial assessment), and you should feel that the team listens to you. If any of those are missing, ask why \u2014 and if you are not satisfied with the answer, find a different provider.'},
    ],
  },
  {
    id:'eidbi-minnesota',
    cat:'EIDBI & Insurance',
    catColor:'var(--brand-blue)',
    title:'What is EIDBI? A Minnesota parent\'s guide',
    dek:'EIDBI is the Minnesota Medicaid benefit that pays for ABA therapy. Here is how it works, who qualifies, and what to expect.',
    read:'15 min read',
    illus:{variant:'calendar', color1:'#D8EAF4', color2:'#2E5E8A', color3:'#E07A5F'},
    body:[
      {h:'What EIDBI stands for', p:'EIDBI is the Early Intensive Developmental and Behavioral Intervention benefit, administered by the Minnesota Department of Human Services. It provides medically necessary ABA and related services for children and young adults under age 21 with autism spectrum disorder or a related condition. The benefit was created so that Minnesota Medicaid recipients could access the same evidence-based autism therapies that commercial insurance was already required to cover.'},
      {h:'The purpose of EIDBI', p:'EIDBI exists, in the state\'s own language, to educate and support families, promote independence and participation in family, school, and community life, and improve long-term outcomes and quality of life for autistic individuals and their families. The benefit is structured to put the family at the center: your goals drive the Individual Treatment Plan, not insurance defaults or agency preferences.'},
      {h:'Who qualifies', p:'A child is eligible for EIDBI if they (1) have autism spectrum disorder or a related condition, (2) have completed a Comprehensive Multi-Disciplinary Evaluation (CMDE) that establishes medical need, (3) are enrolled in Medical Assistance, MinnesotaCare, TEFRA, or another qualifying health care program, and (4) are under age 21. "Related conditions" include disorders such as Rett syndrome, childhood disintegrative disorder, fragile X with autism-spectrum features, and certain other neurodevelopmental conditions that meet medical-necessity criteria.'},
      {h:'What it costs your family', p:'For families on Medical Assistance, EIDBI is typically covered at 100% with no copay or coinsurance. TEFRA families may have a small monthly parental fee based on income. MinnesotaCare families have small copays for some services. The intake coordinator will run your specific benefits before services begin and provide a written summary so there are no surprises.'},
      {h:'The four levels of EIDBI service', p:'EIDBI is delivered at four authorization levels based on assessed need. Level 1 is targeted (around 5-10 hours per week). Level 2 is moderate (10-25 hours). Level 3 is comprehensive (25-40 hours). Level 4 is intensive (typically only for crisis situations). Your BCBA recommends the level that matches your child\'s clinical needs and the state\'s medical review agent reviews and approves authorization. Hours can be increased or decreased at any reassessment.'},
      {h:'Services EIDBI covers', p:'EIDBI covers the Comprehensive Multi-Disciplinary Evaluation (CMDE), Individual Treatment Plan (ITP) development and progress monitoring, coordinated care conferences, 1:1 and group intervention, observation and direction (BCBA supervision), family and caregiver training and counseling, and travel time for providers in some circumstances. Speech-language therapy and occupational therapy are billed separately under Medicaid but coordinate directly with the EIDBI plan.'},
      {h:'The CMDE explained briefly', p:'Before EIDBI services can be authorized, your child must complete a Comprehensive Multi-Disciplinary Evaluation, conducted by a qualified CMDE provider. The CMDE establishes medical necessity, documents your child\'s current skill level, and recommends a starting level of service. We have a separate article devoted to what the CMDE looks like and how to prepare.'},
      {h:'The Individual Treatment Plan (ITP)', p:'Once the CMDE is complete, your BCBA writes the Individual Treatment Plan. The ITP lists measurable goals across the developmental and behavioral domains your child is working on, specifies how many hours each week will go toward each goal area, identifies the procedures the team will use, and outlines how progress will be measured. Nothing in the plan is finalized without your review and signature.'},
      {h:'Authorization timelines', p:'Once the CMDE and ITP are submitted to the state\'s medical review agent, authorization decisions are typically made within seven calendar days. If approved, services can begin immediately. If the review agent requests more information, your BCBA and intake coordinator respond on your behalf \u2014 you should not need to negotiate paperwork yourself.'},
      {h:'Reauthorizations and progress reports', p:'EIDBI authorizations run for six months at a time. Before each reauthorization, your BCBA completes a Progress Monitoring Plan summarizing data on every goal, updates the ITP with new or modified goals, and submits the package to the state. A new CMDE is required at least every three years, or sooner if your child\'s needs change significantly.'},
      {h:'How Noor helps you through EIDBI', p:'Our intake coordinators verify your child\'s eligibility, refer you to a trusted CMDE provider, and submit all authorization paperwork to the state\'s review agent. You do not need to navigate the forms yourself \u2014 we handle the bureaucracy so your child can start care as quickly as possible. From your first call to your first session, we aim for about two weeks.'},
      {h:'What happens if coverage changes', p:'Many Minnesota families move between Medical Assistance, MinnesotaCare, and commercial plans depending on employment and household changes. EIDBI eligibility is tied to your child\'s qualifying coverage, not yours specifically. If your child\'s coverage changes mid-treatment, tell your intake coordinator immediately \u2014 we re-verify benefits, coordinate any required new authorizations, and keep services going without interruption whenever possible.'},
      {h:'EIDBI and your child\'s school', p:'EIDBI services can be delivered at school with the school\'s agreement, often as a complement to (not a replacement for) an Individualized Education Program (IEP). EIDBI clinicians can attend IEP meetings, share data with school staff, and coordinate so that goals at school and goals at therapy reinforce each other. Tell us about your child\'s IEP and we will reach out to coordinate when you give us permission.'},
      {h:'Where to get more information', p:'The Minnesota Department of Human Services publishes the full EIDBI benefit policy manual at mn.gov/dhs. Our team is happy to walk through any section of it with you. You should never feel like you need to become an expert in Medicaid policy yourself \u2014 our job is to translate it for you, in plain language, in the language you speak at home.'},
    ],
  },
  {
    id:'cmde-process',
    cat:'EIDBI & Insurance',
    catColor:'var(--brand-blue)',
    title:'The CMDE: what to expect at your child\'s evaluation',
    dek:'Every child who receives EIDBI services in Minnesota must first complete a Comprehensive Multi-Disciplinary Evaluation. Here is what that looks like.',
    read:'12 min read',
    illus:{variant:'book', color1:'#F5E6D3', color2:'#2F7D4F', color3:'#9B4D6E'},
    body:[
      {h:'What the CMDE is', p:'The Comprehensive Multi-Disciplinary Evaluation (CMDE) is a Minnesota Medicaid-required assessment that establishes medical necessity for EIDBI services. It is completed by a qualified CMDE provider and documents your child\'s current skills, needs, diagnosis, and recommended level of care. No child can begin EIDBI services in Minnesota without a current CMDE on file. Think of it as the medical foundation that the entire treatment plan rests on.'},
      {h:'Who can perform a CMDE', p:'CMDEs must be conducted by a qualified CMDE provider \u2014 typically a licensed mental health professional with specialized autism training, such as a psychologist, BCBA-D, developmental pediatrician, or pediatric advanced practice nurse who meets state requirements. The CMDE provider must be separately enrolled with Minnesota Health Care Programs to bill for the evaluation.'},
      {h:'How long it takes', p:'Most CMDEs involve two to three appointments totaling three to six hours of direct assessment, plus several hours of record review and report writing. At Noor we coordinate scheduling with a trusted CMDE partner and aim to have appointments within two weeks of intake and the finalized report returned within 14 days of the final session. Some families complete the CMDE in a single longer day if their schedule requires it.'},
      {h:'What the evaluator looks at', p:'The CMDE reviews your child\'s developmental history, current communication and social skills, adaptive behavior, play and learning, sensory profile, any challenging behaviors, motor skills, daily living skills, and family priorities. Standardized tools are used where appropriate \u2014 commonly the ADOS-2 for autism criteria, the Vineland for adaptive behavior, and developmental measures appropriate for the child\'s age \u2014 along with direct observation, structured play, and parent interview.'},
      {h:'What you can bring', p:'Bring photos of any previous diagnostic reports, your child\'s most recent IEP or IFSP if they have one, any pediatrician notes, your insurance card, and a list of medications. If your child has had a previous autism evaluation, bring that too \u2014 it shortens the new assessment significantly. Also bring snacks and a comfort item; appointments can be long and the evaluator is happy to take breaks.'},
      {h:'What the appointment is like', p:'The first appointment usually starts with a structured parent interview while your child plays nearby. Then the evaluator works directly with your child for an hour or so \u2014 play, conversation, simple tasks, sometimes the ADOS-2 protocol. Younger children typically need shorter sessions across more visits. Older children may complete everything in one or two longer sessions. The evaluator will tell you what to expect before each visit.'},
      {h:'What you will not see', p:'The CMDE is not a pass/fail test, and there are no "right" answers. The evaluator is not trying to trick your child or push them. If your child has a hard day, that is fine \u2014 the evaluator is trained to interpret hard days as information, not as evidence that the assessment "did not work." You also will not be told a diagnosis on the spot; the evaluator needs time to review materials and write a thorough report.'},
      {h:'The written report', p:'The CMDE report typically runs 20-40 pages and includes: background, family history, presenting concerns, results of every standardized assessment used, clinical observations, diagnostic impressions, and specific recommendations for services and hours. The report becomes the medical foundation for your child\'s ITP. It is yours \u2014 keep copies for your records and request additional copies any time you switch providers, schools, or specialists.'},
      {h:'What if my child does not get the diagnosis', p:'Some children come to a CMDE and do not meet criteria for autism spectrum disorder. That is not a bad outcome \u2014 it is information. The evaluator will recommend other supports that may be a better fit, such as developmental therapy, speech-language therapy, occupational therapy, or mental health support. We help connect you to whatever your child actually needs.'},
      {h:'How often it is required', p:'EIDBI requires a CMDE at least once every three years, or more often if clinically necessary. A new CMDE may be needed if your child\'s needs change significantly, if your child transitions between age groups (early childhood to school age, for example), or when transferring between provider agencies. Reauthorizations between full CMDEs use a shorter Progress Monitoring Plan instead.'},
      {h:'What happens next', p:'Once the CMDE establishes medical necessity, your BCBA writes an Individual Treatment Plan (ITP). The ITP, along with the CMDE signature page, is submitted to the state\'s medical review agent for service authorization \u2014 typically decided within seven calendar days. As soon as authorization is approved, your team match begins and the first session is scheduled.'},
      {h:'How we make it easier', p:'Most families have never been through a CMDE before. Our intake coordinators stay with you through every step: scheduling, paperwork, transportation if you need help arranging it, day-of preparation, and a debrief after the report is returned. We translate the report into plain language and walk through every recommendation with you before anything is finalized.'},
    ],
  },
  {
    id:'early-intervention',
    cat:'Early Intervention',
    catColor:'var(--brand-orange)',
    title:'Why earlier is better: the case for early intervention',
    dek:'The research on starting ABA before age 5 \u2014 and what "early intervention" actually means in practice.',
    read:'13 min read',
    illus:{variant:'star', color1:'#FDF3D8', color2:'#E07A5F', color3:'#2F7D4F'},
    body:[
      {h:'The first five years', p:'Brain development is most rapid in the first five years of life, which is also when patterns of communication, social engagement, regulation, and play take root. Evidence-based therapy introduced during this window can shape those patterns while they are still highly flexible \u2014 a property neuroscientists call neuroplasticity. After age 5, learning still happens, of course, but it requires more repetition and more direct teaching to produce the same change.'},
      {h:'What the research shows', p:'Randomized controlled trials of early intensive behavioral intervention \u2014 starting before age 5 \u2014 have shown significant gains in cognitive functioning, adaptive behavior, language, and social skills compared with eclectic or treatment-as-usual care. The Early Start Denver Model (ESDM), the UCLA Young Autism Project, and multiple replications across countries have all converged on the same finding: earlier and more intensive care produces larger and more durable gains, on average.'},
      {h:'Why "average" matters', p:'Research findings are about groups, not individuals. Some children make extraordinary gains; others make slower but steady gains; a few do not respond as well to one approach and need a different one. Average effects tell us a treatment is worth using and that earlier is better than later. They do not predict any individual child\'s trajectory. We follow data closely so we can adjust if your child is in a slower-progress range.'},
      {h:'Critical developmental windows', p:'Joint attention, imitation, and early language are easier to establish before age 3. Symbolic play and pretend play typically emerge between 2 and 4. Peer social skills become more learnable between 3 and 5. Self-regulation strategies become teachable around 3-5. None of these windows close, but the cost of waiting is higher in each one.'},
      {h:'Do not wait for the diagnosis', p:'You do not need a completed diagnosis to start the intake conversation. Our team can begin the EIDBI eligibility process, refer you to a CMDE provider, and prepare a plan while your diagnostic evaluation is underway, so services can begin as soon as medical necessity is established. If you are seeing early signs of autism in your child, the months you spend on a waiting list are months of lost intervention time.'},
      {h:'Early signs to share with a pediatrician', p:'Some red flags that warrant a developmental evaluation: limited eye contact, limited response to name by 12 months, no pointing or waving by 14 months, no two-word phrases by 24 months, regression in language or social skills at any age, intense repetitive behaviors, very specific interests that dominate play, distress with sensory input that other children manage, or struggles with everyday routines. Trust your instincts \u2014 parents are usually right when something feels off.'},
      {h:'Matching hours to clinical need', p:'Hour recommendations are always driven by the BCBA\'s assessment and the goals in your child\'s Individual Treatment Plan. For very young children, that is often 20-30 direct hours per week paired with structured parent training \u2014 not 40. Be skeptical of any agency that recommends maximum hours for every child regardless of need. Hours that are too high can mean reduced family time, fewer typical childhood experiences, and burnout for everyone.'},
      {h:'The role of parents in early intervention', p:'In early intervention, parents are not bystanders \u2014 they are co-therapists. Most learning happens in the dozens of micro-moments that fill a day: bath time, mealtime, sibling play, the car ride to grandma\'s. When parents are trained in the same procedures the team uses, every one of those moments becomes a learning opportunity. Parent training is a covered EIDBI service and a non-negotiable part of every early-intervention plan at Noor.'},
      {h:'Pairing ABA with speech and OT', p:'Early intervention rarely uses ABA alone. Children under 5 often benefit from coordinated care with a Speech-Language Pathologist (SLP) and an Occupational Therapist (OT). The SLP works on first words, AAC if needed, and pragmatic language; the OT addresses sensory regulation, fine motor skills, and feeding. When all three disciplines share goals and data, progress accelerates. Noor coordinates all three under a single plan.'},
      {h:'What success looks like at 18 months in', p:'After 18 months of early intervention, families typically report milestones like: first words emerging, the ability to follow simple directions, asking for desired items rather than crying, sitting through a meal, tolerating new clothing or food, playing alongside a sibling, going to a grocery store without overwhelm. The specific gains depend on starting point, but the pattern is the same: many small steps that, in retrospect, add up to a transformed daily life.'},
      {h:'When children are older', p:'If your child is already past the early-intervention window, do not despair. ABA is effective for school-age children and adolescents too \u2014 it just shifts toward different goals (executive function, peer social skills, daily living, academic readiness) and uses different teaching procedures. The key is starting now rather than later.'},
      {h:'Common questions about early intervention', p:'"Will my child outgrow this?" Most children with autism do not outgrow it, but with strong early intervention many develop language, social, and adaptive skills that look very different by adolescence. "Will my child still be autistic?" Yes \u2014 our goal is not to remove autism but to support skills and reduce barriers to participation. "Is this hard on my child?" Good early intervention is play-based, joyful, and child-led most of the time. If your child dreads sessions, tell your BCBA \u2014 something needs to change.'},
    ],
  },
  {
    id:'data-collection',
    cat:'ABA Basics',
    catColor:'var(--brand-green)',
    title:'How we use data to drive your child\'s progress',
    dek:'ABA is a science. Here is what your child\'s therapist is tracking, why it matters, and how we turn data into better outcomes.',
    read:'12 min read',
    illus:{variant:'data', color1:'#F7E9B0', color2:'#2F7D4F', color3:'#E07A5F'},
    body:[
      {h:'Why data is the foundation', p:'ABA is sometimes called "applied" behavior analysis because it applies the principles of behavioral science to real-world goals. The "analysis" part is the data: we measure what we are trying to change, watch how it changes over time, and adjust our methods based on what we see. Without data, ABA is just opinion. With data, it is a science that produces measurable, replicable results.'},
      {h:'What gets measured: skill acquisition', p:'For every skill on your child\'s Individual Treatment Plan, the BT/RBT records data during each teaching opportunity. The most common measures are percent correct (out of how many trials), rate of independent responses, prompt level required (independent, gestural, partial physical, full physical), and trials to mastery. Different goals require different measures. Your BCBA selects measures that match the skill type.'},
      {h:'What gets measured: behavior reduction', p:'If there are challenging behaviors on the treatment plan, we track frequency (how often), duration (how long), latency (how soon after a trigger), intensity (mild, moderate, severe), and antecedents (what was happening right before). These ABC data are the foundation of any effective behavior plan. A plan that does not start with data is a guess, not a clinical intervention.'},
      {h:'What gets measured: engagement and quality', p:'We also track softer but equally important measures: how engaged is your child in sessions, how often do they initiate interaction, how long can they sustain attention, are they tolerating transitions, are they tolerating new people. These engagement measures often predict skill acquisition before the skill data does \u2014 a child whose engagement is climbing is usually about to make a leap.'},
      {h:'How data is collected', p:'Most of our teams use digital data-collection software on tablets, which lets the BT/RBT take data in real time without slowing down the session. The data uploads automatically and graphs appear in the BCBA\'s dashboard within minutes. Some skills are also tracked using paper data sheets, video samples, and structured observations. The method is less important than the consistency.'},
      {h:'How often the BCBA reviews data', p:'Your Board Certified Behavior Analyst reviews every child\'s graphs at least weekly. Active programs are reviewed even more often. If a graph shows a child has mastered a target, that program is closed and a new one is added. If a graph shows no progress over two to four weeks, that program is modified. Every modification is a clinical decision \u2014 documented, dated, and tied to the data trend that triggered it.'},
      {h:'How we modify programs', p:'Common modifications: changing the prompting strategy (less intrusive prompts often work better than more), changing the reinforcement schedule (varying schedules often beat fixed ones), changing the teaching format (more naturalistic versus more discrete-trial), changing the target stimulus, simplifying the response requirement, or addressing motivation directly with a new preference assessment.'},
      {h:'How we know a behavior plan works', p:'A behavior plan is considered effective only when the data shows a clear, sustained decrease in the target behavior \u2014 not just a few good days. We look for at least three weeks of stable downward trend before declaring success, and we continue to monitor for several months to make sure the change is durable. If the data is not moving in three weeks, we revise the plan.'},
      {h:'Mastery and maintenance', p:'When a skill reaches mastery criteria (typically 80-90% independent across at least three sessions), it moves into maintenance \u2014 less frequent practice to make sure the skill stays in your child\'s repertoire. Maintained skills are checked monthly. If a skill regresses, we re-teach until it is stable again. Mastery and maintenance are how we make sure progress is not just temporary.'},
      {h:'Progress reporting to families', p:'Every parent receives a formal progress report at least every six months, with graphs showing skill acquisition and behavior change. We sit down with you to review the data, celebrate progress, and update goals. Between formal reports, you get a brief written progress note every two weeks and a monthly team meeting with your BCBA. Ask any time to see your child\'s data \u2014 it is yours.'},
      {h:'What good data does NOT look like', p:'Good ABA data is not just "the child had a good week" or "they\'re making progress." It is specific, measurable, time-stamped, and graphed. If an agency cannot show you a graph of your child\'s progress on every active goal, they are not practicing data-driven ABA. That is a red flag, regardless of how warm the team feels.'},
      {h:'Why it matters', p:'Data-driven programming is what separates ABA from opinion-based approaches. When we say "your child is making progress," we can show you the graph that proves it \u2014 or change the program if it does not. Data also protects your child: if a procedure is not working, the data tells us before too much time is wasted, and we move on to something that does.'},
    ],
  },
  {
    id:'parent-training',
    cat:'Family Support',
    catColor:'var(--brand-orange)',
    title:'Why parent training is part of every ABA program',
    dek:'Your child spends far more hours with you than with us. Here is why EIDBI requires parent and caregiver training \u2014 and what it looks like at Noor.',
    read:'11 min read',
    illus:{variant:'house', color1:'#F5D9D1', color2:'#2F7D4F', color3:'#E07A5F'},
    body:[
      {h:'Family training is a covered EIDBI service', p:'Minnesota\'s EIDBI benefit explicitly covers family and caregiver training and counseling. It is not an add-on \u2014 it is considered a core component of effective, medically necessary ABA care. The state of Minnesota recognizes what the research has shown for decades: children make their fastest gains when caregivers can implement the same strategies the therapy team is using.'},
      {h:'Why it matters mathematically', p:'A child who receives 25 hours of ABA per week still spends about 87 hours awake outside of therapy each week. If learning only happens when the team is in the room, only a small fraction of waking life supports the goals. When caregivers know how to embed teaching opportunities into mealtime, bath time, the car ride, and the grocery store, learning happens around the clock.'},
      {h:'What we teach in parent training', p:'Parent training at Noor covers the same strategies your BT/RBT uses: how to deliver clear instructions, how to use positive reinforcement, how to prompt and fade prompts, how to set up the environment for success, how to handle challenging behavior, how to build communication opportunities into daily routines, how to read your child\'s signals for overload and regulation, and how to support generalization across people and settings.'},
      {h:'How sessions are structured', p:'A BCBA typically meets with you weekly or biweekly for 60-90 minutes. The session starts with a check-in on what happened since the last meeting and what worked or did not. Then the BCBA introduces one new target strategy, demonstrates it (often with your child if they are available), and gives you a chance to practice while they coach. You leave with a written summary and a specific homework focus until the next session.'},
      {h:'In-home, center, or virtual', p:'Parent training sessions can happen in your home, at our St. Louis Park center, or over secure video, depending on your schedule and preference. Many families do a mix: in-home for routines, center for sit-down conversations, video when life gets hectic. The format does not change the content \u2014 we adapt to whatever works for your family that week.'},
      {h:'Behavior Skills Training (BST)', p:'The teaching procedure we use with parents is called Behavior Skills Training (BST). It has four components: instructions (what to do and why), modeling (the BCBA shows you), rehearsal (you try it with feedback), and feedback (specific praise and adjustment). BST is the most-researched method for teaching adults new behavioral skills and it produces faster fluency than lectures or written handouts alone.'},
      {h:'Extended family and other caregivers', p:'Grandparents, aunts, uncles, older siblings, nannies \u2014 all of them are welcome in parent training. The more consistent the caregivers, the faster your child\'s skills generalize. Tell your BCBA who is in your child\'s daily life and we will invite them to sessions. Materials are available in English, Soomaali, Arabic, and Spanish on request.'},
      {h:'Common parent training goals', p:'Examples we work on with families: teaching your child to ask for things they want, reducing tantrums at transitions, building independence with toileting and self-care, supporting positive sibling interactions, expanding food acceptance, handling the grocery store or doctor\'s office, getting dressed independently, building a calmer bedtime routine, supporting communication with extended family.'},
      {h:'When parents have other things going on', p:'Parenting an autistic child is hard. Many of our families are also navigating jobs, other children, school meetings, and their own health. Parent training is not designed to add stress \u2014 it is designed to give you tools that make daily life easier. If a homework assignment is not working, tell your BCBA. We adjust. The goal is sustainable change, not perfect compliance.'},
      {h:'Why it works', p:'Children generalize skills best when the same strategies are used across people and settings. When caregivers are fluent in the same ABA procedures as the therapy team, progress accelerates and gains are maintained long after direct therapy ends. The research shows that combined child + parent training produces durably better outcomes than child-only therapy at the same hour count.'},
      {h:'How to know parent training is working', p:'You should feel more confident handling daily situations that used to be overwhelming. You should have specific, named strategies you can use. Your child should be responding to the strategies you are using at home, not just to the team. You should feel that the BCBA listens to your family\'s priorities and adapts accordingly. If any of those is missing, tell us.'},
    ],
  },
  {
    id:'in-home-vs-center',
    cat:'Service Delivery',
    catColor:'var(--brand-purple)',
    title:'In-home vs center-based ABA: which is right?',
    dek:'Both settings are covered under EIDBI and both have strong clinical evidence. Here is how to decide where your child should start.',
    read:'12 min read',
    illus:{variant:'house', color1:'#E8DFF0', color2:'#6B4A87', color3:'#E07A5F'},
    body:[
      {h:'Both settings are evidence-based', p:'There is no clinical research showing one setting is universally better than the other. Both in-home and center-based ABA have decades of evidence behind them. The question is not which is "better" \u2014 it is which is right for your child and family right now, given the goals you are working on. The setting can change as goals change.'},
      {h:'In-home ABA explained', p:'In-home therapy brings a BCBA and BT/RBT into your living room. Sessions target the skills that matter most in your actual life \u2014 mealtime, bedtime, transitions, sibling interaction, toileting, getting dressed, leaving the house. Goals are taught in the setting where they need to work, so generalization is built in from day one.'},
      {h:'Who thrives at home', p:'Very young children (under 4) often start at home because the environment is familiar and routines are easier to embed. Children with significant transition difficulties benefit from removing the additional transition of getting to a center. Children whose priority goals are tied to home routines (toileting, sleep, feeding) make faster progress where those routines actually happen. Families in rural areas or outside the metro often find in-home care more sustainable than a daily commute.'},
      {h:'What in-home looks like day-to-day', p:'A typical in-home session is two to four hours. The BT/RBT arrives at a scheduled time, sets up materials in a quiet space (a corner of the living room, a child\'s bedroom, the kitchen table), and follows the goals on the Individual Treatment Plan. Some teaching is structured (sitting at a table with materials); much of it is naturalistic (playing on the floor, in the backyard, during a snack). The BCBA visits regularly for supervision and parent training.'},
      {h:'What we need from your home', p:'A quiet space (not necessarily a separate room \u2014 a corner is fine), a few minutes of setup time at the start of each session, a willingness to allow the therapist to use some of your child\'s preferred items as reinforcers, and the ability to be home for at least some sessions if you are the primary caregiver. We provide all materials, data tools, and reinforcement systems.'},
      {h:'Center-based ABA explained', p:'Our St. Louis Park center has sensory-thoughtful therapy rooms, a motor skills gym, quiet regulation spaces, an outdoor area, and opportunities for structured peer interaction. Center-based care offers consistency of environment, access to specialized equipment, the ability to practice readiness skills (lining up, taking turns with peers, transitioning between rooms), and a predictable schedule that mirrors school in many ways.'},
      {h:'Who thrives at the center', p:'Children age 3+ who are working toward preschool or school readiness. Children whose goals include peer interaction. Children who need a clear separation between "therapy time" and home time to regulate. Families who benefit from predictable hours and a consistent location. Children working on group instruction-following or attending to a teacher-led activity.'},
      {h:'What a center day looks like', p:'A typical center day for an early-intervention child runs 4-6 hours and mirrors a preschool schedule: arrival routine, individual work, group time, snack, motor break, individual work, lunch, rest or quiet activity, structured play, individual work, departure. Each child has a primary BT/RBT but interacts with the wider team and (when appropriate) peers throughout the day. The BCBA is on-site for supervision and is available to families at drop-off and pickup.'},
      {h:'Pros and cons quickly', p:'In-home pros: real-world generalization, family integration, no commute, comfortable environment. In-home cons: less peer exposure, fewer specialized materials, more potential household distractions. Center pros: peer interaction, specialized environment, structured routine, easier coordination across disciplines. Center cons: less generalization to home, commute time, may be overwhelming for some children initially.'},
      {h:'Both, or either', p:'Many families combine both \u2014 center-based mornings and in-home afternoons, for example, or center during the school year and in-home during the summer. Minnesota EIDBI allows either or both settings; the BCBA recommends what the clinical data supports. Hybrid arrangements are common and often produce the best of both worlds.'},
      {h:'How to decide', p:'Start with your priority goals. If most of them are tied to home life and family routines, start at home. If most are tied to school readiness, peer skills, or community participation, consider center. If you genuinely cannot tell, talk it through with your BCBA at intake \u2014 they will recommend a starting point and adjust if it is not working. The decision is not permanent.'},
      {h:'When to switch', p:'It is normal to start in one setting and switch later as goals change. A 3-year-old who started at home may move to the center as preschool approaches. A 5-year-old at the center may shift to in-home to focus on transitions to kindergarten. Tell your BCBA when you notice the goals shifting and we will adjust the setting. There is no penalty for changing your mind.'},
    ],
  },
  {
    id:'reinforcement',
    cat:'ABA Basics',
    catColor:'var(--brand-green)',
    title:'Positive reinforcement: the engine of ABA',
    dek:'Reinforcement is not bribery. It is the most-studied principle in behavioral science and the foundation of every effective ABA program.',
    read:'12 min read',
    illus:{variant:'star', color1:'#D8EAF4', color2:'#2F7D4F', color3:'#F4C95D'},
    body:[
      {h:'What reinforcement actually is', p:'A reinforcer is anything that, when delivered immediately after a behavior, makes that behavior more likely to happen again in the future. That is a technical definition with a practical implication: nothing is a reinforcer for everyone. What works for one child might do nothing for another. The science of ABA includes structured methods for identifying what specifically functions as a reinforcer for each child.'},
      {h:'Types of reinforcers', p:'Reinforcers fall into broad categories: edibles (snacks), tangibles (toys and items), activities (screen time, swing, a walk outside), social (high-fives, praise, attention), and sensory (movement, music, touch input). Most children have a mix. Your team identifies several so we can rotate and avoid satiation \u2014 the same reinforcer used too often loses its power.'},
      {h:'Finding each child\'s reinforcers', p:'At intake and throughout treatment, our BCBAs conduct preference assessments \u2014 structured procedures to identify what each child genuinely values. A common method shows the child several items and observes what they approach, hold longest, or choose first. Reinforcers that worked last month may not work this month, so we re-assess often. Families also know things we cannot \u2014 tell your BCBA what your child loves.'},
      {h:'Why it is not bribery', p:'Bribery rewards someone for stopping an unwanted behavior ("stop screaming and I\'ll give you candy"). Reinforcement delivers a preferred item or activity immediately after a desired behavior ("great asking \u2014 here is your toy"). Used consistently, reinforcement builds skills; bribery erodes them. The difference is what we reinforce: the behavior we want to see again, not the absence of behavior we want to stop.'},
      {h:'Continuous and intermittent schedules', p:'Early in skill acquisition, we reinforce every correct response \u2014 a continuous schedule. Once the skill is fluent, we shift to intermittent schedules where reinforcement comes after every few responses, then every several, then unpredictably. Intermittent schedules produce more durable behavior. This is why a child who has been practicing a skill for months no longer needs a treat for every correct response.'},
      {h:'Fading reinforcement', p:'As skills become stronger, we systematically thin the schedule of reinforcement so the child does not need an external reward for every correct response. Over time, natural consequences \u2014 like a friend responding to a request, completing a meal, or getting the toy they asked for \u2014 take over. Done well, fading is gradual enough that the child never notices and the skill stays strong.'},
      {h:'Pairing reinforcers with social praise', p:'When we deliver a tangible reinforcer, we also pair it with warm social attention: a smile, a specific compliment, a high-five. Over many trials, the social attention itself becomes a reinforcer. This is how children move from needing snacks for compliance to thriving on connection and shared joy with the people around them.'},
      {h:'Negative reinforcement: a clarification', p:'In behavioral science, "negative reinforcement" does not mean punishment. It means increasing a behavior by removing something the child finds aversive when the behavior occurs (like asking for a break to escape a hard task). Negative reinforcement is used carefully and ethically; teaching a child to ask for a break is a classic negative-reinforcement intervention and it is a good thing. What we never use is punishment.'},
      {h:'What we never use', p:'Aversive procedures \u2014 anything that produces fear, shame, pain, or distress to suppress a behavior \u2014 are not used at Noor. We do not withhold meals, restrict bathroom access, restrain children, or use any procedure designed to cause discomfort. Modern ABA produces the same or better results without aversives, and the families we serve deserve nothing less.'},
      {h:'Common reinforcement mistakes', p:'(1) Delivering the reinforcer too late so the child does not connect it with the behavior. (2) Using a reinforcer the child does not actually want. (3) Using the same reinforcer too often (satiation). (4) Not pairing tangible reinforcers with social praise. (5) Accidentally reinforcing the behavior you are trying to reduce by giving the child what they wanted when they engaged in it. Your BCBA watches for all of these and coaches the team.'},
      {h:'Reinforcement at home', p:'Parents and caregivers can use the same principles at home: catch your child being successful, deliver something they value within seconds, name the behavior specifically ("nice asking for the cup"), and stay consistent. You do not need fancy materials or a token board to use reinforcement well \u2014 just a clear sense of what behavior you are trying to build and what your child finds genuinely rewarding.'},
      {h:'When reinforcement is not enough', p:'Some skills, especially complex multi-step skills or skills that compete with strong existing behaviors, require reinforcement plus additional procedures: prompting, shaping, chaining, task analysis, behavior contracts, visual schedules. Reinforcement is the engine, but the engine sits inside a larger vehicle. Your BCBA decides which procedures fit which goal.'},
    ],
  },
  {
    id:'choosing-provider',
    cat:'Choosing Care',
    catColor:'var(--brand-pink)',
    title:'How to choose an ABA provider in Minnesota',
    dek:'Questions every Minnesota family should ask before signing with an EIDBI-enrolled ABA agency.',
    read:'13 min read',
    illus:{variant:'puzzle', color1:'#F5D9D1', color2:'#9B4D6E', color3:'#2F7D4F'},
    body:[
      {h:'Why this matters', p:'Choosing an ABA provider is one of the most consequential decisions you will make for your child. The same diagnosis and the same insurance benefit can produce very different outcomes depending on the agency \u2014 because agencies vary widely in clinical quality, caseload sizes, training rigor, family responsiveness, and whether they actually practice data-driven ABA or just say they do. Asking the right questions up front saves months later.'},
      {h:'Confirm EIDBI enrollment', p:'Ask whether the agency is a fully enrolled EIDBI provider with Minnesota Health Care Programs (MHCP). Only enrolled providers can bill Medicaid for EIDBI services. Some agencies are enrolled with commercial insurance but not with Medicaid, or vice versa. Noor is a fully enrolled Minnesota EIDBI provider.'},
      {h:'Ask about BCBA caseloads', p:'A BCBA responsible for 15 or more active clients cannot supervise deeply. Six to ten is a reasonable range for high-quality care. Ask explicitly: "How many children does each of your BCBAs oversee?" If the answer is vague, ask for a number. If the number is high, ask how they ensure each child receives enough supervision time.'},
      {h:'Ask about supervision hours', p:'High-quality ABA includes at least weekly BCBA supervision of direct therapy \u2014 not just a signature on a form. Ask how many hours of direct BCBA time your child will receive each month. Look for at least 10-20% of direct therapy hours to be BCBA-supervised. Lower than that and program quality typically suffers.'},
      {h:'Ask how hours are recommended', p:'Be skeptical of agencies that recommend 30-40 hours for every child regardless of need. Hours should be driven by the Individual Treatment Plan and reassessed every six months. An agency that does not consider your child\'s clinical needs and family schedule when recommending hours is not delivering individualized care.'},
      {h:'Ask how progress is reported', p:'A good ABA agency produces formal written progress reports with graphs every six months and sits down with you to review them. If an agency cannot show you data or graphs, they are not doing data-driven ABA. Between formal reports, you should receive brief written notes every two weeks and a monthly meeting with the BCBA.'},
      {h:'Ask about staff turnover', p:'Therapist turnover is the single biggest disruptor of progress for autistic children. Ask the agency: what is your annual BT/RBT turnover rate, and what is your annual BCBA turnover rate? Industry-wide BT/RBT turnover is unfortunately high (often above 50% per year). Agencies that pay well, train well, and treat staff well have much lower turnover \u2014 and that protects your child.'},
      {h:'Ask about language and culture', p:'If you speak Soomaali, Arabic, Spanish, or another language at home, ask whether the agency can match you with a clinician who speaks your language and whether materials are available in your language. Cultural fit changes outcomes \u2014 children learn faster when their home language and family traditions are integrated into care.'},
      {h:'Ask what the parent training looks like', p:'Every EIDBI agency must offer parent training. Ask: how often will I meet with the BCBA? What will I learn? How are sessions structured? Will materials be available in my language? If the agency treats parent training as an afterthought, your child\'s gains will be harder to maintain outside of sessions.'},
      {h:'Ask about waitlists and start times', p:'In Minnesota, families often face long waitlists. Ask: what is your current wait time from first call to first session? Noor does not maintain a waitlist; from your first call, intake typically takes about two weeks. Long waits are not a sign of quality \u2014 they are usually a sign of under-staffing.'},
      {h:'Ask what happens when you have concerns', p:'Ask the agency directly: "What happens if I have a concern about a procedure or a team member?" The answer should be a clear escalation path \u2014 BCBA first, clinical director if needed, leadership if needed. Avoid agencies that deflect, become defensive, or imply you should not raise concerns. Your child\'s care depends on your ability to speak up.'},
      {h:'Observe a session if you can', p:'Many agencies welcome parents to observe a session. If the agency will not let you observe your own child\'s therapy, ask why \u2014 and weigh that answer carefully. Observation is also how you check that what is happening matches what was promised on paper. Trust your instincts about whether the room feels right.'},
      {h:'Trust your gut', p:'Beyond credentials and policies, pay attention to how the agency makes you feel. Do they listen? Do they answer questions in plain language? Do they respect your culture and family priorities? Do they seem to care about your child specifically, or treat every family the same? You will work with this team for months or years \u2014 choose people who feel like partners, not vendors.'},
      {h:'The ten-question checklist', p:'(1) Are you an enrolled Minnesota EIDBI provider? (2) Caseload per BCBA? (3) BCBA supervision hours per month? (4) How do you recommend hours? (5) What parent training is included? (6) How is progress measured and reported? (7) How do you coordinate with speech and OT? (8) What happens if I want to change teams? (9) How do you handle cultural and language differences? (10) Can I observe sessions?'},
    ],
  },
  {
    id:'first-session',
    cat:'Getting Started',
    catColor:'var(--brand-yellow)',
    title:'What to expect at your child\'s first ABA session',
    dek:'The first day of therapy is mostly about rapport and pairing. Here is exactly what happens and how to prepare.',
    read:'10 min read',
    illus:{variant:'hands', color1:'#FDF3D8', color2:'#2F7D4F', color3:'#E07A5F'},
    body:[
      {h:'Before the first session', p:'By the time the first session arrives, your BCBA has already completed an assessment and written your child\'s Individual Treatment Plan. You have received a written copy. You know which skills we will target and how we will measure progress. The first session is not when planning starts \u2014 it is when the relationship between your child and their team begins.'},
      {h:'How we prepare your child', p:'Before the first session, the team gathers information about your child: their preferred toys, foods, songs, characters; their typical communication style; their triggers and calming strategies; their daily routine. The BT/RBT studies this profile so they can show up ready to follow your child\'s lead. If your child uses an AAC device, the team is briefed on it before the first visit.'},
      {h:'Day one is about pairing', p:'The first few sessions are not full of teaching demands. Instead, the BT/RBT pairs themselves with reinforcement \u2014 playing alongside your child, following their interests, offering preferred items freely, learning what makes your child smile. The goal is for your child to associate the therapist with good things. A child who anticipates fun is a child who learns.'},
      {h:'What pairing looks like', p:'During pairing, the therapist might sit on the floor with your child\'s favorite cars, hand them snacks proactively, sing a song they love, do silly faces, blow bubbles, or just be quietly present. There are no demands and no contingencies \u2014 your child gets access to good things just for being there with the new person. Pairing typically lasts from one session to several days, depending on the child.'},
      {h:'Easing into demands', p:'Once pairing is solid, the BT/RBT begins embedding small teaching opportunities into play \u2014 one request, one imitation, one turn of a game. Teaching demands are layered in gradually, matched to what the child can successfully do. We start with mastered or near-mastered skills so the child experiences early success. Difficulty rises only as motivation and engagement allow.'},
      {h:'Data collection begins immediately', p:'Even during pairing, we are taking data \u2014 on preferred activities, on how your child communicates, on triggers for challenging behavior. That data shapes the next session. Within a week or two, the team has a detailed picture of what works, what does not, and where to focus. The data from the first sessions often informs program changes before any major teaching has begun.'},
      {h:'What you can do', p:'Greet the therapist warmly, show them your child\'s favorite toys and routines, and then give the session space. If you stay in view, your child may expect you to intervene. The therapist will check in with you before and after every session. Tell them anything you have noticed since the last visit. If your child is sick, tired, or out of routine, that is important information \u2014 share it.'},
      {h:'What to expect emotionally', p:'Many parents feel a mix of relief, anxiety, and hope at the first session. Some feel grief that their child needs this kind of support. All of those feelings are normal. The team is not judging your family \u2014 they are joining it. If you have feelings come up that you want to talk through, your BCBA is part of your support system too.'},
      {h:'What is "normal" in the first week', p:'Your child may be more tired than usual. They may have more emotional moments after sessions as they decompress. They may regress slightly in skills you have already seen because the new structure is novel. They may also surprise you with something they did with the team that they have never done before. All of this is information \u2014 share it with the BCBA.'},
      {h:'When sessions are not going well', p:'If your child seems distressed at sessions, dreads the therapist arriving, or has new behaviors that worry you, tell your BCBA immediately. Sometimes pairing needs more time. Sometimes the team match needs adjustment. Sometimes a goal needs to be simplified. Your gut is a signal, not a problem. We respond to it.'},
      {h:'How long until you see progress', p:'Most families notice small changes within two to four weeks: a new word, a new tolerance, a small piece of independence. Larger changes \u2014 like fluent communication or consistent skill across settings \u2014 take months. Be patient with the pace, and trust the data: if the graphs are moving, progress is real, even when day-to-day life feels the same.'},
    ],
  },
  {
    id:'behavior-plans',
    cat:'Behavior Support',
    catColor:'var(--brand-berry)',
    title:'Understanding behavior plans: the ABC approach',
    dek:'Before changing a challenging behavior, we figure out why it is happening. Here is the framework your BCBA uses.',
    read:'12 min read',
    illus:{variant:'blocks', color1:'#F5D9D1', color2:'#9B4D6E', color3:'#F4C95D'},
    body:[
      {h:'The ABCs of behavior', p:'Every challenging behavior has an Antecedent (what happened right before), the Behavior itself, and a Consequence (what happened right after). ABA behavior plans start by collecting ABC data to identify the function \u2014 the reason \u2014 behind the behavior. Without understanding function, any intervention is a guess. With function clearly identified, intervention becomes targeted and effective.'},
      {h:'Why function matters more than form', p:'Two children can engage in the same outward behavior (hitting, for example) for completely different reasons. One might hit to get attention; another to escape a hard task; a third because the sensory feedback of the impact is reinforcing. The right intervention depends entirely on which function is at work. Treating attention-driven hitting with an escape strategy will fail, and vice versa.'},
      {h:'The four common functions', p:'Behaviors usually serve one of four functions: (1) Attention \u2014 the child gets a reaction from others when the behavior happens. (2) Access \u2014 the child gets a preferred item or activity. (3) Escape \u2014 the behavior allows the child to avoid or end a demand, task, or situation. (4) Automatic/sensory \u2014 the behavior produces a sensation or relief the child enjoys, independent of anyone else\'s response. Some behaviors serve multiple functions.'},
      {h:'How we identify function', p:'The BCBA conducts a Functional Behavior Assessment (FBA). This includes interviews with caregivers, direct observation, structured ABC data collection across multiple sessions, and sometimes a more controlled procedure called a Functional Analysis (FA) where conditions are systematically varied to test which function the behavior serves. The result is a written hypothesis about why the behavior happens.'},
      {h:'Antecedent strategies', p:'Once function is identified, the first set of interventions focuses on antecedents \u2014 changes to the environment before the behavior happens. If a child is hitting to escape demands, we might lower task difficulty, add a visual schedule, offer choices, build in breaks, or change how instructions are delivered. Antecedent strategies prevent the behavior from being triggered in the first place.'},
      {h:'Teaching a replacement skill', p:'Rather than just trying to stop a behavior, we teach a functionally equivalent replacement skill \u2014 a new behavior that serves the same function but is more adaptive. If the child is screaming to escape a hard task, we teach them to ask for a break. If they are hitting for attention, we teach them to request attention with a word, a sign, or an AAC device. The old behavior fades because the new skill works better.'},
      {h:'Consequence strategies', p:'Consequences in a behavior plan are not punishments. They are planned, ethical responses to the behavior that gradually shift outcomes. If the behavior is attention-maintained, we minimize the attention that follows it and dramatically increase attention for desired behavior. If escape-maintained, we may use techniques like differential reinforcement to teach that the new skill, not the old behavior, gets the break.'},
      {h:'What we never use', p:'Aversive procedures \u2014 anything that produces fear, pain, shame, or restraint to suppress a behavior \u2014 are not used at Noor. We do not use seclusion, mechanical restraint, withholding of meals, or any procedure designed to cause distress. Modern behavior plans achieve durable change through teaching and reinforcement, not suppression.'},
      {h:'Data proves the plan works', p:'A behavior plan is tracked from day one. We graph the target behavior\'s frequency, duration, or intensity (whichever measure fits) alongside the replacement skill. We expect to see the old behavior decrease and the replacement skill increase. If the target behavior is not decreasing within two to four weeks of consistent implementation, the plan is revised. We do not stay with interventions that the data shows are not working.'},
      {h:'Safety planning when behaviors are severe', p:'If a child engages in behaviors that are dangerous to themselves or others, the BCBA writes a separate safety plan alongside the behavior plan. The safety plan specifies environmental modifications, prevention strategies, and (only as a last resort) safe ways to physically protect everyone if a behavior cannot be redirected. Safety plans are written with the family and reviewed before each authorization period.'},
      {h:'Generalization and maintenance', p:'A behavior plan that works during therapy hours but not at home, school, or in the community is not done. We deliberately practice the replacement skill across settings, people, and times. Parents learn how to support the plan in daily life. The plan is not considered successful until the new skill holds up wherever your child needs it.'},
      {h:'When to revisit the plan', p:'Behavior plans are not set in stone. As your child develops, what worked at age 4 may not work at age 6. New behaviors may emerge. Old behaviors may reappear under stress. Tell your BCBA when something is shifting and we will reassess. Behavior plans evolve with the child.'},
    ],
  },
  {
    id:'cultural-fit',
    cat:'Family Support',
    catColor:'var(--brand-orange)',
    title:'Culturally responsive ABA: it matters, and here is why',
    dek:'How we work with Somali, East African, Arabic-speaking, and Latino families \u2014 and why cultural fit changes outcomes.',
    read:'11 min read',
    illus:{variant:'house', color1:'#F7E9B0', color2:'#E07A5F', color3:'#2F7D4F'},
    body:[
      {h:'Culture shapes goals', p:'Whether it is halal food preferences at snack time, prayer times in the daily schedule, multigenerational living, extended family caregivers, or specific cultural milestones like memorizing parts of religious texts \u2014 your culture shapes how your child grows and what priorities matter most. A treatment plan that ignores your culture is not really individualized; it is generic care with your child\'s name on it.'},
      {h:'Why cultural fit is a clinical issue', p:'When a child\'s home culture is treated as an obstacle rather than a context, several things go wrong. Skills do not generalize because they are practiced in environments that do not match home. Families disengage because their priorities are not reflected in goals. Caregivers feel judged and stop sharing. Outcomes suffer. Culturally responsive ABA is not a nicety \u2014 it is part of what makes therapy work.'},
      {h:'Language matters', p:'Children generalize skills best when they hear target language in the voices they hear at home. Our clinicians speak Soomaali, Arabic, and Spanish, and every program can be delivered in a child\'s primary home language. If your child is bilingual or multilingual, that is an asset \u2014 we plan accordingly rather than treating one language as a problem.'},
      {h:'Working with Somali and East African families', p:'For our Somali families, common considerations include: halal food and snack preferences (we will not use non-halal items as reinforcers without explicit permission), respect for prayer times and Ramadan schedules, integration of extended family caregivers, awareness of trauma backgrounds for some families, and recognition that some Somali words (especially around disability) carry weight that English equivalents do not. Our team is briefed before the first session.'},
      {h:'Working with Arabic-speaking families', p:'For our Arabic-speaking families: written materials are available in Arabic, sessions can be conducted bilingually, religious practices including daily prayer and Ramadan are honored in scheduling, gendered preferences for clinicians can be accommodated when families request, and conversations about diagnosis and prognosis are conducted with the cultural framing that families find supportive rather than imposing American norms.'},
      {h:'Working with Latino families', p:'For our Spanish-speaking families: bilingual clinicians are matched whenever possible, all written materials are available in Spanish, family meetings respect the involvement of grandparents and extended family who are often primary caregivers, and we navigate the unique mix of insurance situations that many of our Latino families face with care and discretion.'},
      {h:'Family involvement, not replacement', p:'We work alongside grandparents, aunts, uncles, and older siblings \u2014 not around them. If your extended family is part of daily caregiving, they are part of our training. This is true across cultures, but it is especially common in the cultural communities we serve, where the idea that only "parents" make decisions is itself a Western assumption.'},
      {h:'Mealtime and food', p:'Food is one of the most culturally specific parts of life. We never assume a child should eat what an English-speaking neurotypical American child might eat. We work with the foods your family actually serves, the textures your child accepts, and the cultural meaning that meals carry in your home. Food acceptance goals are written with you, not imposed on you.'},
      {h:'Religious practices in care', p:'Prayer times, religious dress, religious ceremonies and observances, and religious holidays are honored in scheduling and built into care where relevant. If your child is learning to participate in family religious practices, that can be a treatment goal. We do not impose religious practice, but we never treat your religious practice as an obstacle to therapy.'},
      {h:'Disability stigma and family privacy', p:'In some cultures, autism diagnoses carry stigma that the broader American medical system does not always anticipate. We handle this with discretion: documentation is yours, what you share with extended family or your community is your decision, and we never assume you want public visibility. If discussing diagnosis with relatives feels hard, your BCBA can help you think through what to say and when.'},
      {h:'Written materials in your language', p:'Treatment plans, progress reports, parent training materials, and intake documents are available in English, Soomaali, Arabic, and Spanish on request. No family should have to translate their own clinical reports. If you would prefer materials in another language, ask \u2014 we will do our best.'},
      {h:'When something feels off culturally', p:'If a procedure, a recommendation, or a goal feels off culturally, tell us. We do not always get it right on the first try, especially with families whose specific traditions we are still learning. Our commitment is to listen, adjust, and keep listening. Cultural responsiveness is a practice, not a credential.'},
    ],
  },
];

// ---------- Card + article view ----------
const ResourceCard = ({ a, onOpen }) => (
  <article className="card resource-card" style={{padding:0, overflow:'hidden', cursor:'pointer', ['--card-color']: a.catColor}}
    onClick={() => onOpen(a.id)}>
    <div style={{aspectRatio:'5/3', borderBottom:'1px solid var(--line)'}}>
      <BlogIllustration {...a.illus}/>
    </div>
    <div style={{padding:24}}>
      <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'4px 10px', background:`color-mix(in srgb, ${a.catColor} 14%, transparent)`, color:a.catColor, borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:12}}>
        {a.cat}
      </div>
      <h3 style={{fontFamily:"'DM Sans',sans-serif", fontSize:22, fontWeight:600, marginBottom:10, lineHeight:1.2}}>{a.title}</h3>
      <p style={{color:'var(--ink-soft)', fontSize:15, marginBottom:16, lineHeight:1.5}}>{a.dek}</p>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13, color:'var(--ink-soft)', fontWeight:600}}>
        <span>{a.read}</span>
        <span style={{color:a.catColor, display:'inline-flex', alignItems:'center', gap:6}}>
          Read <Icon name="arrow" size={14}/>
        </span>
      </div>
    </div>
  </article>
);

const ArticleView = ({ article, onBack }) => {
  React.useEffect(() => { window.scrollTo({top:0, behavior:'instant'}); }, [article]);
  const a = article;
  return (
    <div>
      <section style={{padding:'60px 0 20px', background:'var(--bg)'}}>
        <div className="container-sm">
          <div style={{marginBottom:24}}>
            <button onClick={onBack} className="btn btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
              All articles
            </button>
          </div>
          <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'4px 10px', background:`color-mix(in srgb, ${a.catColor} 14%, transparent)`, color:a.catColor, borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:16}}>
            {a.cat}
          </div>
          <h1 style={{marginBottom:20, fontSize:'clamp(34px,5vw,60px)'}}>{a.title}</h1>
          <p style={{fontSize:20, color:'var(--ink-soft)', lineHeight:1.5, marginBottom:24}}>{a.dek}</p>
          <div className="mono" style={{color:'var(--ink-soft)'}}>{a.read} · Noor Therapy Center</div>
        </div>
      </section>
      <section style={{padding:'20px 0'}}>
        <div className="container-sm">
          <div style={{aspectRatio:'16/7', borderRadius:'var(--radius-lg)', overflow:'hidden', border:'1px solid var(--line)', marginBottom:40}}>
            <BlogIllustration {...a.illus}/>
          </div>
          <div className="article-body" style={{display:'grid', gap:28, fontSize:18, lineHeight:1.7, color:'var(--ink)'}}>
            {a.body.map((s,i) => (
              <div key={i}>
                <h3 style={{fontFamily:"'DM Sans',sans-serif", fontSize:26, fontWeight:600, marginBottom:10}}>{s.h}</h3>
                <p style={{color:'var(--ink-soft)'}}>{s.p}</p>
              </div>
            ))}
          </div>
          <div className="card" style={{marginTop:48, padding:32, background:'var(--brand-green)', color:'#fff', borderColor:'transparent'}}>
            <h3 style={{color:'#fff', marginBottom:10, fontFamily:"'DM Sans',sans-serif"}}>Questions about this for your family?</h3>
            <p style={{color:'rgba(255,255,255,0.9)', marginBottom:20}}>Our intake coordinators answer questions in English, Soomaali, Arabic, and Spanish — no obligation.</p>
            <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <button className="btn" style={{background:'var(--brand-yellow)', color:'var(--ink)'}} onClick={()=>window.navigate('contact')}>Start a conversation</button>
              <a className="btn" style={{background:'transparent', border:'1.5px solid rgba(255,255,255,0.5)', color:'#fff'}} href="tel:+16127039022">Call (612) 703-9022</a>
            </div>
          </div>
          <div style={{marginTop:32, display:'flex', justifyContent:'center'}}>
            <button onClick={onBack} className="btn btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
              All articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ResourcesPage = () => {
  const [openId, setOpenId] = React.useState(null);
  const [cat, setCat] = React.useState('All');
  const cats = ['All', ...Array.from(new Set(ARTICLES.map(a => a.cat)))];
  const open = ARTICLES.find(a => a.id === openId);
  if (open) return <ArticleView article={open} onBack={() => setOpenId(null)}/>;
  const filtered = cat === 'All' ? ARTICLES : ARTICLES.filter(a => a.cat === cat);
  return (
    <div>
      <PageHero eyebrow="Resources" title="Articles & guides for Minnesota families."
        sub="Plain-language pieces on traditional, data-driven ABA, EIDBI, early intervention, and daily family life. Written by our clinical team."/>
      <section className="section-sm">
        <div className="container">
          <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:40}}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                      className="btn"
                      style={{background: cat===c ? 'var(--ink)' : 'var(--surface)', color: cat===c ? 'var(--bg)' : 'var(--ink)', border:'1px solid var(--line)', padding:'8px 16px', fontSize:13}}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-3 resources-grid" style={{gap:24}}>
            {filtered.map(a => <ResourceCard key={a.id} a={a} onOpen={setOpenId}/>)}
          </div>
        </div>
      </section>
      <ClosingCTA/>
    </div>
  );
};

Object.assign(window, { ResourcesPage, BlogIllustration });
