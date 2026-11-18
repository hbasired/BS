# CHIPSET Presentation: Step-by-Step Analysis Guide

18 November 2026 · Companion guide to the 20-slide CHIPSET presentation

## Start here

Read this guide once, top to bottom (about 40 minutes), then present from the slides alone. Every slide now explains itself: it names the question it answers, defines its terms, carries a legend, and ends with a box stating its answer.

**The answer in one line:** CHIPSET should lead as a trusted, open platform. Keep one engineering core, add solution units and independent assurance around it, and turn verifiable trust (human oversight, simulation-tested safety, openness) into the next layer of its moat.

**How every slide is built, so you can present without notes**

| Part of the slide | Where | What it tells you | What you do with it |
| --- | --- | --- | --- |
| Kicker | Small teal capitals, top left | Which question (Q1–Q5) and which course module or framework | Say it first: "For Q1, using PESTEL from Module 2…" |
| Title | Large, under the kicker | The slide's message in one sentence | Say it as your opening line |
| Visual | Middle | The evidence: chart, table, map or diagram, with its own legend | Point at the highlighted item (teal = CHIPSET, beige = risk, bronze = threat or assurance) |
| Navy box | Bottom | "So what" or "Qn answer" | Say it last, word for word if needed |
| Footer | Very bottom | Sources, and whether the slide is reported data, analysis or a proposal | Mention only if asked |

**Reading order of this guide**

1. *The case and the five answers*: the whole story in two minutes.
2. *Glossary*: every term that appears on the slides.
3. *The analysis process* and *Tools and frameworks*: how the analysis was done and why each tool.
4. *Course alignment check*: how human-in-the-loop and World Labs connect to Modules 1–6.
5. *Slide-by-slide walkthrough*: what each slide shows, how to read it and what to say.
6. *World Labs*, *Human-in-the-loop*, *Key numbers*, *Likely questions*, *Delivery plan*: depth for Q&A.
7. *Appendix*: what was wrong or missing in the original deck.

| File | What it is |
| --- | --- |
| Hemanth Basireddy - MAIB Mar25 - Chipset Assignment.pptx | The 20-slide deck: editable, with speaker notes |
| ... (PDF backup).pdf | The same deck as a PDF |
| CHIPSET Presentation Guide (.docx and .md) | This guide, exported |
| build-deck.js | The script that regenerates the deck |

All four are in the folder *Presentation v2* on the *presentation-v2* branch of the hbasired/BS repository, and in the CHIPSET-presentation folder of this session.

## The case and the five answers in two minutes

CHIPSET is NVIDIA in all but name: the case names CUDA and gaming origins. By early 2026 it leads the AI-infrastructure economy, and the brief asks how it turns technical leadership into durable strategic leadership, through five questions.

**The situation in four facts**

- **Scale.** Revenue rose from $26.9bn (FY2022) to $215.9bn (FY2026); 89.7% now comes from Data Center.
- **Dependence.** Two direct customers are 22% and 14% of revenue, and the biggest buyers now design their own chips.
- **Pressure.** Export rules closed China, power and AI law constrain growth, and AMD has just bought World Labs.
- **Fragility.** On 12 Nov 2026 the founder-CEO resigned with no obvious successor; the CFO is interim CEO.

**The five questions and your answers**

| Question in the brief | Your answer | Main evidence | Slides |
| --- | --- | --- | --- |
| **Q1** Why is CHIPSET strategically important, and why a platform and ecosystem leader rather than a chip company? | Customers buy a working system (chips, networking, CUDA software, partners) that millions build on. Its lasting advantages are the software ecosystem and system integration, not the chip alone. | 89.7% Data Center revenue; 7.5M developers; VRIO: CUDA and networking pass all four tests | 4–9 |
| **Q2** What leadership blends diverse capabilities, stakeholders and fast markets? | "Bilingual" leadership (technology and society) that is institutional (a team and a bench). Three roles: Architect, Integrator, Steward. | $4.5bn H20 charge (policy test); $11.0bn Blackwell quarter (execution test); CEO exit with no No. 2 (succession test) | 10 |
| **Q3** Centralized and engineering-led, platform and solutions-led, or hybrid? | Hybrid: a centralized platform core, decentralized solution units, and independent assurance that can stop a release, aligned with the Star Model. | Weighted fit: hybrid 4.20, divisions 3.35, centralized 2.70 | 11–13 |
| **Q4** How to co-create value with partners, developers, customers, clouds and researchers? | Act as a keystone: a two-way exchange with six partner groups, open platforms, and simulate-before-deploy assurance as a shared product. | Arm deal failed (dominator move); Hugging Face kept open (keystone move); World Labs lost despite a stake | 14–15 |
| **Q5** What priorities for the next 3–5 years? | P1 inference economics; P2 physical AI with open world-model partners; P3 diversified demand; P4 resilience; P5 trust as a product. Each has one indicator. | TOWS matrix; 22% customer concentration; $95.2bn supply obligations | 16–17 |

**The storyline in one paragraph.** The money shows the system matters (slide 4). The environment adds conditions (5) and buyers are becoming builders (6). Rivals attack from three directions (7), so the moat must be the system (8). World Labs shows the next battle (9). Winning it needs different leadership (10) and structure (11–13), a keystone approach to partners (14), and trust as a product (15). TOWS turns this into five priorities (16) with indicators (17), and the winning proposition closes (18).

## Glossary

Every technical term that appears on the slides, in plain words, with the slide where it appears.

| Term | Plain meaning | Slide |
| --- | --- | --- |
| CHIPSET / NVIDIA | The case company; NVIDIA is its real-world twin, so its filings are the evidence | All |
| GPU | Graphics processing unit: the chip that does AI's parallel maths | 4, 8 |
| CUDA | NVIDIA's software for programming GPUs; 7.5 million developers use it | 4, 8 |
| Data Center (segment) | NVIDIA revenue from chips, systems and networking sold for data centres | 4 |
| FY2026 | NVIDIA's fiscal year ended 25 Jan 2026, roughly calendar 2025 | 4 |
| Gross margin | Revenue minus the cost of the products sold, as a % of revenue | 4, 7 |
| H20 | A China-specific NVIDIA chip; an April 2025 US licence rule led to a $4.5bn charge | 5, 10 |
| Blackwell, Rubin | NVIDIA chip generations (Blackwell 2024–25, Vera Rubin shipping 2026) | 8, 10 |
| HBM | High-bandwidth memory placed next to AI chips; only a few suppliers make it | 6, 8 |
| Custom ASIC | A chip designed for one company's own workloads | 6, 7 |
| TPU, Trainium | Google's and Amazon's in-house AI chips | 6, 7 |
| GW (gigawatt) | Data-centre power, used to size AI compute deals | 6 |
| LOI | Letter of intent: an agreement in principle, not a final contract | 6 |
| Training vs inference | Building a model vs running it for users; inference is where usage grows | 6, 17 |
| Hyperscaler | The largest cloud providers, such as AWS, Microsoft Azure and Google Cloud | 7 |
| Merchant vs in-house | Chips sold to all buyers vs chips a company builds for its own use | 7 |
| World model / spatial intelligence | AI that understands, generates and simulates 3D worlds | 9, 15 |
| Physical AI | AI that acts in the physical world: robots, vehicles, factories | 9, 13, 15 |
| Digital twin | A virtual copy of a real factory, robot or network | 15 |
| Cosmos, Omniverse | NVIDIA's world-model and simulation platforms | 9, 14, 15 |
| Hugging Face | The largest open hub for AI models and datasets; NVIDIA agreed to buy it | 3, 14 |
| Bilingual leadership | Leaders fluent in both technology and society or policy | 10 |
| Ambidexterity | Exploiting today's products while exploring new bets | 10 |
| Star Model | Galbraith: strategy, structure, processes, rewards and people must fit together | 12 |
| HITL; on-the-loop; in-command | Levels of human oversight: approve before action; monitor and roll back; decide whether AI is used at all | 13 |
| EU AI Act, Article 14 | The law requiring that people can understand, override and stop high-risk AI | 13 |
| Keystone vs dominator | A platform that shares value so its ecosystem thrives, vs one that extracts it | 14 |
| NAIRR | US National AI Research Resource: shared public compute for researchers | 14 |
| ERRC | Blue Ocean's four actions: eliminate, reduce, raise, create | 15 |
| Trust record | A record carried by each deployment: purpose, owners, evidence, limits, incidents (from your report) | 15 |
| PESTEL, Five Forces, VRIO, TOWS | The course's analysis tools, explained in *Tools and frameworks* | 5, 6, 8, 16 |

## The analysis process step by step

The analysis runs in fourteen steps, from decoding the five questions to one recommendation. Each step produces the input the next one needs, and each maps to slides.

1. **Decode the brief (slides 1–2).** List the five questions and the hard limits: 20 slides including title and references, light text. Identify CHIPSET as NVIDIA because the case names CUDA and gaming origins. Set the evidence window: the case period (early 2026), updated to 17 Nov 2026 and labelled as an update.
2. **Collect primary evidence first.** Filings (10-K), company releases, regulators (EU, FTC, MSIT) and research pages. Tag every fact as reported, calculated, estimate, projection or allegation, so nothing is overstated.
3. **Check for events that change the case (slide 3).** Hugging Face (3 Sep), AMD–World Labs (28 Sep, closed 16 Nov), CEO resignation (12 Nov), Q3 FY27 results (17 Nov). Map each event to the question it tests.
4. **Quantify the position (slide 4).** Revenue mix, margin, R&D, customer concentration, developers. Calculate the 89.7% yourself and say what it is not (market share).
5. **Scan the macro environment with PESTEL (slide 5).** For each factor write signal, so-what and O/T, because Module 2 stresses implications over lists.
6. **Rate industry structure with Five Forces (slide 6).** Define the industry first (accelerated AI data-centre infrastructure), rate each force 1–5 with one piece of evidence, and note the life-cycle stage (high growth, training shifting to inference).
7. **Analyse competitors (slide 7).** Place rivals on a strategic-group map, then apply Module 5's objectives, capabilities and likely response. Name CHIPSET's generic strategy (broad differentiation) and its classic risk.
8. **Look inside with value chain and VRIO (slide 8).** Separate sustained advantages (CUDA ecosystem, networking) from temporary ones (chip cadence, supply priority). This answers Q1.
9. **Test the thinking on a live case: World Labs (slide 9).** Extract three lessons: demand, competition and responsibility.
10. **Define the leadership needed (slide 10).** Use three real tests (policy, execution, succession) to derive the Architect, Integrator and Steward roles. This answers Q2.
11. **Choose the structure with weighted criteria (slides 11–12).** Score the three options from the brief on five weighted criteria, then align the winner with Galbraith's Star Model. This answers Q3.
12. **Design human oversight (slide 13).** Tier oversight by consequence, learn from Rite Aid, anchor on EU AI Act Article 14, and add indicators.
13. **Design co-creation (slides 14–15).** Use keystone versus dominator logic, define a value exchange per partner group, and use Blue Ocean's four actions for the simulate-before-deploy proposal. This answers Q4.
14. **Synthesise priorities and conclude (slides 16–18).** Turn SWOT into TOWS, derive five priorities, give each an indicator, baseline and direction (Q5), then close with Module 1's winning proposition and what would change your view.

## Tools and frameworks: what, why, how

Twelve course tools and five supporting frameworks carry the analysis. Each was chosen because it answers a specific assignment question, not to fill slides.

**Course frameworks (Modules 1–6)**

| Tool (module) | What it is for | Why it fits CHIPSET | How it was applied (slide) | Watch-out when presenting |
| --- | --- | --- | --- | --- |
| Winning proposition: value, position, difference, effectiveness (M1) | Testing whether a strategy creates superior value on four levers | Pulls all five answers into one proposition | One card per lever for CHIPSET's next phase (18) | It is a synthesis, not evidence |
| Operational effectiveness vs strategic positioning (M1) | Separating "faster" from "different" | A faster chip is a race rivals can run; the system is a different race | Chip cadence = effectiveness; system + trust = positioning (8, notes) | Say it in one line |
| PESTEL (M2) | Scanning macro forces for opportunities and threats | Export rules, energy and AI law now hit the P&L | Signal, so-what, O/T for six factors (5) | Implications, not a list |
| Five Forces + industry life cycle (M3) | Judging industry attractiveness | Buyer power and substitutes are rising fast | Each force rated 1–5 with one piece of evidence (6) | Ratings are judgement; say so |
| Strategic group map (M3) | Showing who competes how | Rivals attack from different angles | Axes: market reach and stack breadth (7) | Positions are qualitative |
| Competitor analysis: objectives, assumptions, capabilities, responses (M5) | Predicting rival moves | AMD, hyperscalers and Huawei want different things | Four-corner table for three rival types (7) | Do not over-react to rivals |
| Generic strategies (M6) | Naming the basis of advantage | CHIPSET earns a premium: 71–75% gross margin | Broad differentiator; risk = premium judged not worth it (7) | Not cost leadership |
| Value chain (M4) | Finding where value is created and linked | Value sits in the links from silicon to ecosystem | Five chevrons (8) | Links matter more than boxes |
| VRIO (M4) | Sorting sustained from temporary advantage | Answers Q1 directly | Six resources scored V, R, I, O (8) | Judge rarity against rivals |
| SWOT to TOWS (M4) | Turning diagnosis into options | Q5 priorities must be derived | SO, WO, ST, WT cells produce P1–P5 (16) | TOWS is prescriptive, SWOT is not |
| EFAS/IFAS-style weighting (M4) | Weighted scoring of factors | The brief says "justify your answer" for Q3 | Five weighted criteria, three options (11) | Show the weights openly |
| Blue Ocean four actions, ERRC (M6) | Value innovation: new value at lower cost | Assurance is a value nobody offers yet | Eliminate, reduce, raise, create grid (15) | Execution risk; pilot first |

**Supporting frameworks (outside the modules, for Q2–Q4 and responsible AI)**

| Framework | What it is for | Where used | Why needed |
| --- | --- | --- | --- |
| [Ambidexterity (O'Reilly & Tushman, 2004)](https://hbr.org/2004/04/the-ambidextrous-organization) | Exploring new bets while exploiting current products | Architect role (10) | Q2 asks how to lead through fast change |
| [Star Model (Galbraith)](https://jaygalbraith.com/wp-content/uploads/2024/03/StarModel.pdf) | Aligning strategy, structure, processes, rewards and people | Org design (12) | A new chart alone changes no behaviour |
| [Keystone vs dominator (Iansiti & Levien, 2004)](https://hbr.org/2004/03/strategy-as-ecology) | Judging whether a platform keeps its ecosystem healthy | Co-creation (14) | Q4 is about partners, not only customers |
| [EU AI Act, Article 14](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) + [NIST AI RMF](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) | Human oversight and AI risk management | HITL design (13), assurance (12, 15) | Gives the responsible-AI design a legal and standard anchor |
| KPI dashboard | Turning priorities into indicators with baselines | Priorities (17) | You asked for key indicators; boards fund what they can track |

**Evidence tools used to build the analysis**

| Tool | Used for | Why |
| --- | --- | --- |
| SEC EDGAR filings (10-K, 8-K) | Revenue, margins, customers, staff, obligations | Audited or formally filed: the strongest evidence |
| Company and regulator releases (NVIDIA, AMD, Amazon, FTC, EU, MSIT) | Deals, charges, rules and dates | Primary statements; each labelled for what it can prove |
| Reputable press (TechCrunch, CNBC, Fortune) | 2026 events not yet in filings | Only where primary sources are silent; cross-checked |
| Text recognition of the six module decks | Matching each slide to course content | The module PDFs are images, so the text was extracted |
| PowerPoint native charts and tables | Charts, KPI tiles, tables | Editable, and figures stay traceable to the sources |

## Course alignment check

Yes: human-in-the-loop (HITL) and World Labs are appropriate and now explicitly tied to the course. Neither is named in the module slides, so the deck analyses both with course tools and labels the module on every slide. Both are also anchored in the brief's own words.

**Every module, and where it appears**

| Module | Tools used | Slides |
| --- | --- | --- |
| 1 Introduction to Business Strategy | Strategy as choices (including what not to do); operational effectiveness vs positioning; winning proposition; inclusive strategy design | 8 (notes), 10, 12, 17, 18 |
| 2 External Environment Analysis | PESTEL; macro trends; compliance as strategy | 5, 9, 13 |
| 3 Industry Analysis | Five Forces; strategic groups; industry life cycle; dynamic industry change | 6, 7, 9 |
| 4 Internal Analysis | Value chain; VRIO; SWOT to TOWS; EFAS/IFAS-style weighting | 8, 11, 16 |
| 5 Competitor Analysis | Objectives, capabilities, likely responses; indirect competitors | 7, 9 |
| 6 Competitive Strategies | Generic strategy (differentiation); Blue Ocean four actions (ERRC) | 7, 15 |

**How HITL connects to the course**

| The course or brief says | Source | How the deck uses it | Slide |
| --- | --- | --- | --- |
| "Companies investing early in compliance systems gain strategic flexibility and reputational trust." | Module 2, legal | Oversight built in early (EU AI Act Art. 14) becomes trust, an advantage | 5, 13 |
| "Cultural misalignment weakens brand acceptance, even when products are technically superior." | Module 2, social | The best chip still needs society's acceptance of what it powers | 5, 13 |
| VRIO's "O": the firm "must have the organizational capability to exploit the resources." | Module 4 | Trust is valuable, rare and hard to copy but not organised; HITL tiers and assurance organise it | 8, 13 |
| "Differentiation requires consistent delivery across touchpoints." | Module 6 | A premium differentiator cannot afford a Rite Aid-style failure in its ecosystem | 7, 13 |
| Strategy is "concerned not only with what an organization does, but also with what it deliberately chooses not to do." | Module 1 | Stop rights, and "pause, redesign or stop" anything that fails | 12, 13, 17 |
| "Society at large was beginning to debate the ethics, energy use, and governance of AI systems." | The brief | HITL answers this line of the case directly | 13 |

**How World Labs connects to the course**

| The course or brief says | Source | How the deck uses it | Slide |
| --- | --- | --- | --- |
| "There is evidence that first responders to macro shifts gain learning advantages." | Module 2 | World models are a macro shift; CHIPSET must engage their builders early | 9 |
| "Industry structures evolve due to technology, regulation, and consolidation." | Module 3 | AMD buying World Labs is consolidation that changes the strategic groups | 7, 9 |
| Indirect competitors "compete by redefining what is being delivered, how value is captured, which customer problem is being solved." | Module 5 | World models redefine what compute is for: simulating worlds, not only text | 9 |
| Competitor objectives, capabilities and likely responses | Module 5 | AMD's objective (open No. 2 platform) and new capability (model insight) | 7, 9 |
| Blue Ocean needs "careful experimentation" | Module 6 | Simulate-before-deploy is piloted first, in physical AI | 15 |
| The case lists "autonomous machines, digital twins" in CHIPSET's scope | The brief | World models are the next wave in the case's own words | 9, 15 |

**Two cautions when presenting**

- Present World Labs as a post-case update (Sep–Nov 2026) and a lens on CHIPSET's strategy, not as a second case study.
- Present HITL as strategy (trust as an advantage and a licence to operate), not as an ethics lecture. It is proportionate: humans approve before action only in Tier 3.

## Slide-by-slide walkthrough

Each slide below has the same six parts: what is on it, how to read it, what it means, what to say, what to point at, and the likely question. Say the title first and the navy box last; the middle is your evidence.

### Slide 1 · Title: CHIPSET, from AI power to public trust

- **On the slide:** the title, a three-line promise (strong engineering, human accountability, responsible scale) and a five-layer stack on the right.
- **How to read it:** the stack runs bottom to top: compute and networking, software and open ecosystem, world models and physical AI, human oversight and trust, and useful outcomes (lime) at the top.
- **What it means:** value is created at every layer; the top two are where CHIPSET can differentiate next.
- **Say this:** "CHIPSET is NVIDIA in all but name, so I test every recommendation against NVIDIA's real evidence up to 17 November. My answer: keep the engineering core, add solution teams and independent assurance, and make trust the next layer of the moat."
- **If asked** why NVIDIA: the case names CUDA and gaming origins.

### Slide 2 · The answer first

- **On the slide:** five cards, one per question (Q1–Q5): the question in italics, the answer in bold, one line of proof. A navy recommendation box, and a bottom line showing which slides prove each answer.
- **How to read it:** left to right follows the brief's order.
- **What it means:** the five questions form one strategy, not five separate answers.
- **Say this:** read each card as "Q1 asks why CHIPSET is more than a chip firm: because of the system and ecosystem" and so on, then the recommendation, then "the line at the bottom shows where each answer is proved."
- **Point at:** the "Where each answer is proved" line.
- **If asked** whether trust is too soft for a chip company: in AI infrastructure, trust decides who gets the next workload.

### Slide 3 · Reality check: ten weeks of real events

- **On the slide:** a timeline of four dated events from Sep–Nov 2026. Each card has a green tag naming the question it tests; the bronze dot marks the CEO resignation.
- **How to read it:** date, then what happened, then which question it tests.
- **What it means:** real life tested the case. NVIDIA is buying ecosystem position (Hugging Face), a rival bought a complementor (World Labs), key-person risk became real (CEO exit), and demand still compounds ($115.8bn quarter, +103%).
- **Say this:** "The case is set in early 2026; the last ten weeks tested its questions. Demand is not the constraint. Ecosystem control, leadership depth and trust are."
- **If asked** why the CEO left: "NVIDIA gave no reason, and I won't speculate. The strategic point is key-person risk."

### Slide 4 · Data Center now defines CHIPSET's economics

- **On the slide:** stacked bars of revenue for FY2022–FY2026 (teal = Data Center, grey = other markets, total under each year) and six key-indicator tiles; the beige tile is the risk.
- **How to read it:** bar height = total revenue; the teal part = Data Center. A fiscal year ends in late January.
- **What it means:** explosive growth driven by Data Center, with exceptional margins, but revenue depends on a few buyers.
- **Say this:** "Revenue grew eightfold in four years to $215.9bn, and 89.7% is Data Center. The warning is the beige tile: two customers are 36% of revenue."
- **Point at:** the 193.7 teal bar, the 89.7% tile and the 22% + 14% tile.
- **If asked** whether 89.7% is market share: no, it is revenue mix (193.737 ÷ 215.938).

### Slide 5 · PESTEL: the environment rewards scale but raises scrutiny

- **On the slide:** a six-row table (factor, evidence, so-what, O/T), an IEA electricity chart, a Module 2 quote, and a navy "Net" box.
- **How to read it:** read each row left to right: what is happening, why it matters, then O (opportunity) or T (threat).
- **What it means:** every opportunity comes with a licence-to-operate condition: policy, power, law or public trust.
- **Say this:** "Module 2 says macro analysis must change choices. China is effectively closed, power demand roughly doubles by 2030, and AI law arrives from 2027. So every tailwind now carries a condition."
- **Point at:** "effectively foreclosed", 415 → 945 TWh, and the Module 2 quote.
- **If asked** whether 945 TWh is AI only: no, it covers all data centres, and it is a projection.

### Slide 6 · Five Forces: buyers are becoming builders

- **On the slide:** five forces, each with a row of five squares (filled = intensity; bronze = the strongest), a rating word and one piece of evidence. On the right, a chart of OpenAI's compute deals (teal = NVIDIA, grey = alternatives).
- **How to read it:** more filled squares = a stronger force = less of the industry's profit stays with CHIPSET.
- **What it means:** buyer power is the strongest force, because the biggest buyers multi-source and design their own chips. New entry is the weakest, because the full stack is hard to copy.
- **Say this:** "I define the industry as AI data-centre infrastructure. Buyer power is very high: one customer is 22% of revenue, and OpenAI split its deals between NVIDIA, Broadcom and AMD. High growth does not mean high attractiveness, Module 3's point."
- **Point at:** the five bronze squares and the 10 / 10 / 6 GW bars.
- **If asked** whether the ratings are objective: they are my judgement, with evidence on every row.

### Slide 7 · Rivals attack the stack from three directions

- **On the slide:** a strategic-group map (higher = sells to more buyers; further right = wider stack, from chip to models; arrows = where a rival is moving), a four-corner table for three rival types, and a generic-strategy box.
- **How to read it:** CHIPSET sits top right: it sells to everyone with the widest stack. AMD comes from the side, hyperscalers from below, Huawei inside China.
- **What it means:** CHIPSET is a broad differentiator (71–75% gross margin). Module 6's warning about differentiation is that buyers may decide the premium is not worth it, which is exactly what custom chips test.
- **Say this:** "Module 5 asks what each rival wants, what it can do and how it will respond. AMD wants to be the open No. 2 and has just bought World Labs; hyperscalers want lower costs; Huawei fills China. The answer is better system economics, not lock-in."
- **If asked** why Google sits bottom right: it builds a full stack, including Gemini models, mostly for itself; the arrow shows it is scaling external TPU deals, such as Anthropic's.

### Slide 8 · The moat is the system, not the chip (Q1 answer)

- **On the slide:** five chevrons from silicon to ecosystem, a VRIO table (Valuable, Rare, Hard to copy, Organised) with ticks and crosses, and the Q1 answer box.
- **How to read it:** four ticks = sustained advantage; a cross under "Hard to copy" = temporary advantage; a cross under "Organised" = an untapped asset.
- **What it means:** CUDA with 7.5M developers and rack-scale networking are the lasting moat. The chip cadence and supply priority can be matched. Trust is valuable but not yet organised: the gap the rest of the deck fills.
- **Say this:** "Module 1 says operational effectiveness is not strategy: a faster chip runs the same race faster, while the system is a different race. Q1 answer: customers buy a working system millions build on, so CHIPSET must lead as a platform and ecosystem orchestrator."
- **Point at:** the two rows with four ticks, then the last row's cross.

### Slide 9 · World Labs shows where the next platform battle is

- **On the slide:** a definition strip, a timeline (2024 to Nov 2026), three lesson cards (each labelled with its course module) and a so-what box.
- **How to read it:** left = what happened; right = what it means for CHIPSET.
- **What it means:** the next demand wave is world models and physical AI. A minority stake did not secure the complementor. Human-centred design (people set intent, AI fills detail) is becoming a competitive feature.
- **Say this:** "World Labs is Fei-Fei Li's world-model company. NVIDIA and AMD both invested; in September AMD bought it for about $8.2bn, and on 16 November Li became AMD's Chief Scientist. So CHIPSET must win world-model builders through openness, co-design and trust, not ownership alone."
- **Point at:** the bronze Sep–Nov 2026 node and the "A stake is not control" card.
- **If asked** why it belongs in a CHIPSET deck: it is a competitor move (Module 5) in CHIPSET's next market.

### Slide 10 · Leadership must become bilingual and institutional (Q2 answer)

- **On the slide:** three real tests on the left ($4.5bn, $11.0bn, 36–60), three leadership roles on the right, a Fei-Fei Li exemplar box, and the Q2 answer.
- **How to read it:** each test shows a gap the roles fill. The policy test needs the Integrator, the execution test the Architect, and the succession test the Steward.
- **What it means:** visionary leadership must become a system: leaders fluent in technology and society, with decision rights spread across a team and a named bench.
- **Say this:** "Policy cost $4.5bn, a yield fix still delivered $11bn, and the CEO left with no obvious No. 2. Module 1 says 'strategic design is an inclusive process, not the prerogative of select few'. Q2 answer: bilingual and institutional leadership, a team, not a hero."
- **If asked** what "bilingual" means: fluent in technology and in society and policy, like Fei-Fei Li's path from ImageNet to policy to World Labs.

### Slide 11 · A hybrid design best fits what CHIPSET now needs (Q3 answer)

- **On the slide:** a weighted decision matrix scoring the brief's three options on five criteria, a bar chart of the weighted totals (hybrid highlighted in teal), a beige "Today" strip, and the Q3 answer.
- **How to read it:** each score runs from 1 (poor fit) to 5 (strong fit). Multiply by the weight in brackets and add down the column. Hybrid = 0.25×4 + 0.20×4 + 0.20×5 + 0.20×4 + 0.15×4 = 4.20.
- **What it means:** centralization wins on coherence but fails on succession and customer intimacy; divisions win on customers but lose coherence; the hybrid keeps both strengths.
- **Say this:** "The brief offers three designs, so I scored them on weighted criteria, as in Module 4's EFAS and IFAS tables. Today CHIPSET is flat and engineering-led, with 36 to 60 direct reports to the CEO, and that risk just became real. Q3 answer: a hybrid."
- **Point at:** the 4.20 bar and the beige strip.
- **If asked** whether the scores are subjective: yes, they are my judgement, but every weight and score is visible, so anyone can challenge a number. Module 6 adds that for differentiators "decision-making is often decentralized to support responsiveness".

### Slide 12 · Shared core, solution teams, independent stop right

- **On the slide:** an organization chart (board with Chair and a Risk & Responsible-AI Committee; CEO and executive team with named successors; three teal business units; bronze independent assurance), a legend, five Star Model chips and a takeaway.
- **How to read it:** navy = governance, teal = business units, bronze = assurance; the dashed line means assurance can stop a release.
- **What it means:** engineering stays coherent in the platform core, customers get dedicated solution units, partners get an ecosystem office, and safety has an independent voice. The Star Model aligns processes, rewards and people with the new structure.
- **Say this:** "Read from the top. Every executive has a named successor. The platform core stays centralized because it is the sustained advantage. Assurance reports to the board, not to sales, and can hold a release. I would pilot this in physical AI first."
- **If asked** whether the Chair is independent: NVIDIA appointed its first Chair on 12 Nov; independence is my recommendation.

### Slide 13 · Human oversight needs authority, not just presence

- **On the slide:** a HITL definition, three tiers (darkest = highest consequence), a beige Rite Aid lesson, a mint EU AI Act anchor, a key-indicator list, and a takeaway.
- **How to read it:** the higher the tier, the more authority the human has: Tier 1 monitors, Tier 2 reviews and overrides, Tier 3 approves before action and can stop the system.
- **What it means:** oversight is matched to consequence, and measured. A human without context, training or authority is a rubber stamp.
- **Say this:** "HITL means a person can review, override or stop an AI decision. At Rite Aid the FTC alleged staff acted on false facial-recognition matches, and a 2024 order banned its use for five years. Not every output needs a human, but every high-consequence decision needs an accountable one."
- **Point at:** the Tier 3 box and the indicator list.
- **If asked** whether this fits a strategy course: yes, Module 2 says early compliance builds "reputational trust", and Module 4's VRIO says an asset only pays if it is organised.

### Slide 14 · Act as the keystone (Q4 answer)

- **On the slide:** keystone and dominator definitions, CHIPSET as the hub, six partner cards (what is co-created and what CHIPSET gains), two real lessons (Arm, Hugging Face), and the Q4 answer.
- **How to read it:** each card is a two-way exchange: the partner gets something specific, and so does CHIPSET.
- **What it means:** co-creation works when partners gain too. Dominator moves (the Arm deal) attract regulators and resistance; keystone moves (keeping Hugging Face open) build loyalty.
- **Say this:** "Iansiti and Levien separate keystones, which share value, from dominators, which extract it. For each partner group there is a real exchange; for example, researchers get public-interest compute through NAIRR, which Fei-Fei Li helped design. Q4 answer: co-create as a keystone and measure success by partners' gains."
- **If asked** whether openness weakens lock-in: lock-in invites custom chips and regulators; openness keeps CHIPSET the default.

### Slide 15 · Make trust a product: simulate before you deploy

- **On the slide:** a five-step loop (define, simulate, sign off, deploy, learn) with a dashed learning loop, definitions of world model and digital twin, a Blue Ocean ERRC grid, and a takeaway.
- **How to read it:** follow the numbers 1 to 5; the dashed line sends field incidents back into simulation. The grid shows what the idea eliminates, reduces, raises and creates compared with today.
- **What it means:** this is the out-of-the-box idea. High-consequence AI is stress-tested in simulated worlds and signed off by an accountable human before deployment, and the result is sold as an assurance product.
- **Say this:** "As AI moves into robots and factories, mistakes become physical. Fei-Fei Li argues agents are safer if they learn in simulated worlds first, and CHIPSET already owns Cosmos and Omniverse. Using Module 6's four actions, it creates something nobody offers: simulation-based assurance. Customers pay less for assurance; CHIPSET gains switching value without lock-in."
- **If asked** whether Omniverse already does this: the tools exist; the product (simulation plus human sign-off plus a portable trust record) does not.

### Slide 16 · TOWS turns the analysis into five priorities

- **On the slide:** a TOWS matrix. Strengths (teal) and weaknesses (bronze) run across the top; opportunities (mint) and threats (beige) run down the side; each of the four cells holds priorities P1–P5.
- **How to read it:** each cell pairs an internal factor with an external one. SO: use strengths to seize opportunities. WO: fix weaknesses through opportunities. ST: use strengths to defend against threats. WT: minimise weaknesses and avoid threats.
- **What it means:** the priorities are derived from the earlier analysis, not wished for. SO gives P1 (inference) and P2 (physical AI); WO gives P3 (diversify demand); ST gives P5 (trust as a product); WT gives P4 (resilience).
- **Say this:** "Module 4 says SWOT diagnoses and TOWS prescribes. Each priority uses a strength or fixes a weakness against a named opportunity or threat."
- **If asked** why trust sits in ST: the full stack and ecosystem let CHIPSET turn regulation and substitution threats into a reason to choose it.

### Slide 17 · Five priorities, each with a measurable indicator (Q5 answer)

- **On the slide:** three time horizons (Year 1 establish, Years 2–3 scale, Years 4–5 renew), a table with each priority's indicator, baseline and direction (↑ rise, ↓ fall), and the Q5 answer.
- **How to read it:** one row per priority: what to measure, where it stands today, and which way it should move.
- **What it means:** strategy becomes trackable. The baselines come from the filings (22% customer share, $95.2bn obligations); the targets are proposals.
- **Say this:** "P1 cuts cost and energy per accepted task every generation. P2 grows physical AI with open partners. P3 brings the largest customer below 15% of revenue. P4 dual-sources critical inputs and names successors. P5 gives every high-consequence deployment a trust record and an accountable human. Q5 answer: five priorities, one indicator each, and anything that does not improve is paused, redesigned or stopped."
- **Point at:** the 22% to below 15% row.
- **If asked** where 15% comes from: it is a proposed target for discussion, not a forecast.

### Slide 18 · From technical lead to durable strategic leadership

- **On the slide:** Module 1's winning proposition as four cards (value, position, difference, effectiveness), the decision, "what would change my view", and the closing line.
- **How to read it:** the four levers summarise all five answers; the beige box shows the evidence that would disprove the strategy.
- **What it means:** CHIPSET wins by being useful (value), serving everyone (position), being hard to copy (difference) and being well run (effectiveness).
- **Say this:** "In year one, pilot the hybrid organization and simulate-before-deploy assurance in physical AI; scale where indicators improve, stop where they don't. I would change my view if custom chips matched total system cost. Make trust part of how the platform works. Thank you."

### Slides 19–20 · References

- **On the slide:** 39 sources; every title is a clickable link.
- **How to use them:** do not read them aloud. If challenged on a number, name the source: most figures come from NVIDIA's FY2026 10-K \[1\] and the Q3 FY2027 release \[2\].

## World Labs and Fei-Fei Li

World Labs matters because CHIPSET's main merchant rival has just bought a company CHIPSET had funded. It shows that the next platform battle is spatial intelligence and physical AI, and that complementors are won by trust and openness, not minority stakes.

**Verified timeline (newest first)**

| Date | Event | Source |
| --- | --- | --- |
| 16 Nov 2026 | AMD completes the acquisition; Fei-Fei Li becomes AMD EVP and Chief Scientist, reporting to Lisa Su | [AMD](https://ir.amd.com/news-events/press-releases/detail/1306/amd-completes-acquisition-of-world-labs) |
| 28 Sep 2026 | AMD agrees to buy World Labs for about $8.2bn in stock, to shape its future hardware, software and systems | [AMD](https://ir.amd.com/news-events/press-releases/detail/1299/amd-to-acquire-world-labs-to-advance-the-future-of-ai-compute), [CNBC](https://www.cnbc.com/2026/09/28/amd-fei-fei-li-world-labs.html) |
| 18 Feb 2026 | Raises $1bn; NVIDIA and AMD both among investors; Autodesk invests $200M | [TechCrunch](https://techcrunch.com/2026/02/18/world-labs-lands-200m-from-autodesk-to-bring-world-models-into-3d-workflows/) |
| 12 Nov 2025 | Launches Marble, editable 3D worlds from text, images or video, with the Chisel editing tool | [World Labs](https://www.worldlabs.ai/blog/marble-world-model) |
| 2024 | Emerges from stealth with $230M at about a $1bn valuation | [TechCrunch](https://techcrunch.com/2026/02/18/world-labs-lands-200m-from-autodesk-to-bring-world-models-into-3d-workflows/) |

**Fei-Fei Li in one line:** creator of ImageNet; [founding director of Stanford HAI](https://hai.stanford.edu/about); [member of the 2021 NAIRR Task Force](https://hai.stanford.edu/news/hai-co-director-fei-fei-li-named-national-artificial-intelligence-research-resource-task-force); [co-lead of the California Report on Frontier AI Policy](https://arxiv.org/abs/2506.17303) (2025); founder of World Labs; now AMD's Chief Scientist. HAI's principles are that AI should be guided by its human impact, should augment rather than replace people, and should draw inspiration from human intelligence.

**What it means for CHIPSET**

| Lens | Insight | Recommendation |
| --- | --- | --- |
| Demand (Q1, Q5) | AI must "understand worlds, not just words": robotics, simulation and digital twins, which the case names, need far more compute | Make physical AI and world models priority P2 |
| Competition (Module 5) | AMD's objective is to become the open No. 2 platform; buying models gives it model-to-chip co-design insight | Expect AMD to sell "human-centred, open" compute with Li as its face |
| Ecosystem (Q4) | A minority stake did not secure the complementor | Win world-model builders with co-design, credits and neutral tools (Cosmos, Omniverse), not ownership alone |
| Responsible AI | Marble's Chisel lets people set the structure while AI adds detail: human-in-the-loop by design | Build the same default into CHIPSET's platform tools |
| Safety | Li argues agents are safer if they learn in physics-aware simulated worlds before deployment ([CNBC](https://www.cnbc.com/2026/09/28/amd-fei-fei-li-world-labs.html)) | The basis of the simulate-before-deploy proposal |
| Leadership (Q2) | Li is the "bilingual" profile: science, policy, entrepreneurship | CHIPSET must grow and hire this profile; rivals already do |

**The out-of-the-box idea: simulate before you deploy (slide 15).** High-consequence AI passes through a loop: define purpose and limits in a trust record; stress-test rare scenarios in world models and digital twins; an accountable human signs off and independent assurance can stop; deploy with the right oversight tier; turn every field incident into a new test scenario. It is defensible because each part already exists (Li's argument, NVIDIA's Cosmos and Omniverse, EU Article 14); what is new is selling the combination as a platform product. Its risks are cost and slower releases, which is why it is piloted first.

**How to talk about it**

- Call the AMD deal a post-case update (Sep–Nov 2026), not part of the original case.
- Do not claim NVIDIA lost money on its stake, or that AMD will close World Labs' models to other hardware: neither is public.
- Use "human-centred" and "human-in-the-loop" precisely; Li's company is the example, not an endorsement of your proposal.

## Human-in-the-loop

Human-in-the-loop (HITL) is appropriate for CHIPSET and is used in five places in the deck. The upgrade over your old deck is that oversight is tiered by consequence and measured, so it is credible rather than symbolic.

**Why it fits a chip company.** CHIPSET does not deploy most AI itself, but it shapes how others deploy it: through platform defaults, its own models and tools, and the evidence it supplies. As AI moves into robots, vehicles and factories, errors become physical, so oversight has to be designed into the platform.

**Where HITL appears in the new deck**

| Slide | How HITL is used |
| --- | --- |
| 9 World Labs | Marble's Chisel: people set the structure, AI fills the detail (human-directed generation) |
| 10 Leadership | The Steward role keeps humans accountable for AI outcomes |
| 12 Structure | Independent assurance can hold a release; human review, appeal, joint incident learning |
| 13 HITL design | Three oversight tiers, the Rite Aid lesson, EU Article 14, indicators |
| 15 Simulate before deploy | An accountable human signs off simulated scenario coverage before deployment |

**The three tiers (slide 13)**

| Tier | Oversight mode | Typical uses | What the human can do | Indicator that it works |
| --- | --- | --- | --- | --- |
| 3 High consequence | Human-in-command | Physical AI, biometrics, critical infrastructure | Approve before action, sign off simulation, stop the system | Issues caught in simulation vs in the field |
| 2 Material | Human-in-the-loop | Decisions about people | Review flagged or uncertain cases, override, handle appeals | Override rate; appeal reversals |
| 1 Low risk | Human-on-the-loop | Drafts, code, internal tools | Monitor, sample, roll back | Time to roll back |

Reviewer load and time per case are tracked across all tiers: an overloaded reviewer becomes a rubber stamp.

**The anchors to cite**

- **[EU AI Act, Article 14](https://eur-lex.europa.eu/eli/reg/2024/1689/oj):** people overseeing high-risk AI must be able to understand it, watch for automation bias, override or reverse outputs and stop the system.
- **[FTC v. Rite Aid](https://www.ftc.gov/legal-library/browse/cases-proceedings/2023190-rite-aid-corporation-ftc-v):** the FTC alleged staff acted on false facial-recognition matches; a 2024 order imposed a five-year ban. Humans were present but had no context, training or authority. Say "alleged", and that it is not an NVIDIA case.
- **[NIST AI RMF](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf):** a voluntary framework (govern, map, measure, manage); it does not certify safety.
- **[Stanford HAI principles](https://hai.stanford.edu/about):** AI should augment rather than replace people.

**Definitions you may be asked for**

- *Human-in-the-loop:* a person reviews or approves before an output takes effect.
- *Human-on-the-loop:* the system acts; a person monitors and can intervene or roll back.
- *Human-in-command:* a person decides whether, when and how the system is used at all, and can stop it.

## Key numbers cheat sheet

These 23 figures carry the deck; know what each means and what it does not. NVIDIA's fiscal years end in late January, so FY2026 runs from about February 2025 to January 2026.

| Figure | What it means | Careful: it is not | Source |
| --- | --- | --- | --- |
| $215.9bn | NVIDIA FY2026 revenue (FY2025 $130.5bn; FY2024 $60.9bn) | Profit | [10-K FY2026](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm) |
| $193.7bn | FY2026 Data Center revenue, compute and networking | AI-only revenue | 10-K FY2026 |
| 89.7% | 193.737 ÷ 215.938: Data Center share of revenue | Market share | Calculated |
| $26.9bn / $10.6bn | FY2022 revenue / Data Center, the pre-ChatGPT base | — | [10-K FY2023](https://www.sec.gov/Archives/edgar/data/1045810/000104581023000017/nvda-20230129.htm) |
| 22% and 14% | Two direct customers' shares of FY2026 revenue (FY2025: 12%, 11%, 11%) | Named customers (not disclosed) | 10-K FY2026 |
| 71.1% | FY2026 gross margin (75.0% in FY2025), including the H20 charge | Operating margin | 10-K FY2026 |
| $18.5bn | FY2026 R&D ($12.9bn in FY2025) | — | 10-K FY2026 |
| 42,000 / 31,000 | Employees / of whom in R&D | — | 10-K FY2026 |
| 7.5M | Developers using CUDA and NVIDIA software tools | Paying customers | 10-K FY2026 |
| $95.2bn | Inventory purchase, supply and capacity obligations | Spending already made | 10-K FY2026 |
| $4.5bn | H20 inventory and purchase-obligation charge, Q1 FY2026 | A fine | 10-K FY2026 |
| $13.0bn | Investing outflow for the non-exclusive Groq licence | An acquisition | 10-K FY2026 |
| $11.0bn | Blackwell revenue in its launch quarter, Q4 FY2025 | — | [Q4 FY25 commentary](https://investor.nvidia.com/files/doc_financials/2025/Q425/Q4FY25-CFO-Commentary.pdf) |
| $115.8bn | Q3 FY2027 revenue, +103% YoY; Data Center $107.6bn | Full-year revenue | [Q3 FY27 release](https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000088/q3fy27pr.htm) |
| $130bn ±3% | Q4 FY2027 revenue outlook (includes an extra week) | A result | Q3 FY27 release |
| $12.93bn | Agreed price for Hugging Face; deal still pending | Completed | [NVIDIA blog](https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/) |
| \~$8.2bn | AMD's all-stock price for World Labs; closed 16 Nov 2026 | Cash | [AMD](https://ir.amd.com/news-events/press-releases/detail/1306/amd-completes-acquisition-of-world-labs) |
| 10 / 10 / 6 GW | OpenAI's deals: NVIDIA (letter of intent), Broadcom (custom chip), AMD | Delivered capacity | [TrendForce](https://www.trendforce.com/news/2025/10/15/news-openai-ramps-up-global-compute-power-with-nvidia-amd-and-broadcom-securing-26-gw-of-ai-infrastructure/) |
| \~500,000 | Trainium2 chips in AWS Project Rainier for Anthropic | Profit or impact | [Amazon](https://ir.aboutamazon.com/news-release/news-release-details/2025/Amazon-com-Announces-Third-Quarter-Results/) |
| 415 → 945 TWh | Global data-centre electricity, 2024 estimate to 2030 projection | AI-only, or observed | [IEA](https://www.iea.org/reports/energy-and-ai/executive-summary) |
| 36–60 | Reported direct reports to the founder-CEO (reports vary) | An official figure | [Fortune](https://fortune.com/2026/11/12/jensen-huang-nvidia-flat-org-succession-planning/) |
| 4.20 / 3.35 / 2.70 | Weighted scores: hybrid, divisions, centralized | Measured data; it is your judgement | Your analysis (slide 11) |

## Likely questions and strong answers

Most questions will test three things: whether your numbers are honest, whether the hybrid is justified, and whether responsible AI is a real strategy or a slogan. Answer in two or three sentences, then stop.

| Likely question | Strong answer |
| --- | --- |
| Why treat CHIPSET as NVIDIA? | The case names CUDA and gaming origins. I use NVIDIA's filings as evidence, and keep recommendations as my own proposals, not claims about NVIDIA's current organisation. |
| Isn't 89.7% NVIDIA's market share? | No. It is revenue mix: Data Center revenue divided by total revenue. Analysts estimate AI-accelerator share at roughly 75–85%, but no audited figure exists, so I avoid it. |
| NVIDIA's centralized model built one of the world's most valuable companies. Why change it? | I keep the engineering core centralized, because it is the sustained advantage. What changes is around it: solution units, independent assurance and a successor for every role. The CEO exit on 12 Nov showed the cost of having none. |
| Where do the decision-matrix scores come from? | They are my weighted judgement, in the EFAS/IFAS style of Module 4. The weights and scores are on the slide, so anyone can challenge a number; the hybrid stays ahead unless coherence is weighted far above everything else. |
| Isn't responsible AI just a cost that slows CHIPSET down? | Proportionate oversight targets only high-consequence uses. Simulation-based assurance lowers customers' audit and integration costs, which creates switching value without lock-in. If assurance slows releases without reducing incidents, I would redesign it, and I say so on slide 18. |
| AMD bought World Labs. Why is it in your CHIPSET deck? | Because it is a competitor move (Module 5) in the market CHIPSET wants next. CHIPSET backed World Labs and still lost it, which shows that a minority stake is not control. The lesson is to win complementors through openness and co-design. |
| Does the CEO resignation mean the strategy failed? | No: revenue was $115.8bn last quarter, up 103%. It shows key-person risk in a flat, founder-centred structure, which is exactly what Q2 and Q3 ask about. NVIDIA gave no reason and I don't speculate. |
| Won't openness, such as keeping Hugging Face open, weaken lock-in? | Lock-in invites custom silicon and regulators: the Arm deal failed amid regulatory challenges. Openness keeps CHIPSET the default choice, and it competes on system economics and trust. |
| Is human-in-the-loop realistic at CHIPSET's scale? | Not for every output, which is why it is tiered. Tier 1 is monitoring only; humans approve before action only in Tier 3. Indicators such as override rate and reviewer load show whether it works. |
| Why not cost leadership against custom chips? | CHIPSET's margin of 71–75% shows its advantage is differentiation. Its answer to cheaper chips is a lower cost per accepted task across the whole system, not the cheapest chip. |
| What about China? | NVIDIA says it is effectively foreclosed from China's data-centre compute market and assumes no China data-centre compute revenue in its outlook. That is why I plan for policy scenarios before capacity commitments, not for a China recovery. |
| Does DeepSeek-style efficiency kill demand? | Not necessarily. Cheaper tasks can raise total usage, which is why I measure cost and energy per accepted task alongside total consumption. |
| Isn't simulate-before-deploy what Omniverse already does? | The tools exist; the product does not. My proposal combines simulation, human sign-off, independent assurance and a portable trust record into one offer customers can buy and regulators can check. |
| What is your single biggest risk? | That custom chips reach parity on total system cost. Then CHIPSET's advantage rests on ecosystem and trust, which is why priorities P1 and P5 matter most. |

## Delivery plan

Plan for 15 minutes unless told otherwise. The full notes run about 21 minutes, so use the cut list and practise the 12-minute version once.

| Version | Present fully | Summarise in one sentence | Time |
| --- | --- | --- | --- |
| 12 minutes | 1, 2, 3, 4, 8, 9, 10, 11, 13, 15, 17, 18 | 5, 6, 7, 12, 14, 16 | \~12 min |
| 15 minutes (default) | 1–4, 6–11, 13, 15, 17, 18 | 5, 12, 14, 16 | \~15 min |
| 20 minutes | All, using the notes as written | — | \~21 min |

**Handling the sensitive slide (CEO resignation, slides 3, 10, 11)**

- Say only what NVIDIA said: he resigned effective immediately; the CFO is interim CEO; the board named its first Chair and is searching for a permanent CEO.
- If asked why: "The company gave no reason, and I won't speculate. The strategic point is key-person risk."
- Do not repeat press allegations about his personal life. They are not needed for the argument and could be unfair.

**Consistency with your submitted report.** The deck makes the same recommendation as the report: hybrid organisation, independent assurance, a customer trust record and human oversight. It adds frameworks and evidence from after 15 Nov, labelled as updates. If asked, say: "The presentation tests the report's recommendation against what happened since."

**Final checklist**

- [ ] Confirm whether this is a group or individual submission, then name the file "Group N – MAIB Mar25 – Chipset Assignment" if it is a group
- [ ] Open the .pptx in PowerPoint and check the tick and cross symbols on slide 8 and the charts on slides 4, 5, 6 and 11
- [ ] Rehearse once in Presenter View with the speaker notes
- [ ] Keep the PDF backup on a USB stick or in cloud storage
- [ ] Confirm the deck is 20 slides including title and references, the brief's limit
- [ ] Practise the answers to the three hardest questions: market share, hybrid scores, CEO exit
- [ ] Change "November 2026" on slide 1 to the exact date if your template requires it

## Appendix: review of the original deck

Your current deck is factually sound: every figure checked matches its source. Its weaknesses are format (flattened images), thin use of the course frameworks, a process-style answer to Q5, and no World Labs.

**Fact check (all verified against primary sources on 18 Nov 2026)**

| Claim in the old deck (slide) | Checked against | Verdict |
| --- | --- | --- |
| Revenue $60.9bn, $130.5bn, $215.9bn; Data Center $47.5bn, $115.2bn, $193.7bn; 89.7% mix (3) | [NVIDIA FY2026 10-K](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm) | Correct |
| $4.5bn H20 inventory and purchase-obligation charge after the April 2025 licence rule (6) | [10-K](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm) | Correct; it is a charge, not a fine |
| Blackwell mask change reported Nov 2024; $11bn Blackwell revenue in Q4 FY2025 (7) | [Q3 FY25 CFO commentary](https://investor.nvidia.com/files/doc_financials/2025/Q325/Q3FY25-CFO-Commentary.pdf), [Q4 FY25 CFO commentary](https://investor.nvidia.com/files/doc_financials/2025/Q425/Q4FY25-CFO-Commentary.pdf) | Correct. The change was first disclosed in Aug 2024; Nov 2024 reported it complete |
| Rainier used nearly 500,000 Trainium2 chips; AWS also announced NVIDIA services (5, 14) | [Amazon Q3 2025 release](https://ir.aboutamazon.com/news-release/news-release-details/2025/Amazon-com-Announces-Third-Quarter-Results/) | Correct (P6e-GB200 UltraServers) |
| Mellanox completed 2020 (4); Arm deal ended 2022 amid regulatory challenges (14) | [NVIDIA 2020](https://nvidianews.nvidia.com/news/nvidia-completes-acquisition-of-mellanox-creating-major-force-driving-next-gen-data-centers), [NVIDIA & SoftBank 2022](https://nvidianews.nvidia.com/news/nvidia-and-softbank-group-announce-termination-of-nvidias-acquisition-of-arm-limited) | Correct |
| Data-centre electricity 415 TWh (2024) to about 945 TWh (2030 projection) (16) | [IEA Energy and AI](https://www.iea.org/reports/energy-and-ai/executive-summary) | Correct; all data centres, a projection |
| EU AI Act: GPAI from Aug 2025; Annex III high-risk 2 Dec 2027; products 2 Aug 2028 (13) | [European Commission](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai); AI Omnibus in force 27 Jul 2026 | Correct |
| Korea AI Basic Act effective 22 Jan 2026, grace period (13) | [MSIT](https://www.msit.go.kr/eng/bbs/view.do?bbsSeqNo=42&mId=4&nttSeqNo=1214&sCode=eng) | Correct; at least one year before fines |
| Rite Aid: complaint 2023, order 2024, five-year ban (11) | [FTC case page](https://www.ftc.gov/legal-library/browse/cases-proceedings/2023190-rite-aid-corporation-ftc-v) | Correct; complaint 19 Dec 2023, order 8 Mar 2024 |
| Fei-Fei Li is HAI's Founding Director (10) | [Stanford HAI](https://hai.stanford.edu/about) | Correct |
| Michigan researchers used DGX Cloud via the NAIRR pilot (14) | [NSF 2024](https://www.nsf.gov/science-matters/us-nairr-pilot-brings-cutting-edge-ai-resources-researchers) | Correct |

**Gaps the new deck fixes**

| Gap in the old deck | Why it matters | Fix in the new deck (slide) |
| --- | --- | --- |
| Every slide is a flattened picture | No edits, no native charts, a typo cannot be fixed; may not count as a PowerPoint | Fully editable, native charts and tables (all) |
| No PESTEL (Module 2) | External analysis is a core marking area | PESTEL table + IEA chart (5) |
| No competitor analysis or strategic groups (Modules 3, 5) | Q1 is about leadership against rivals | Strategic-group map + four-corner table (7) |
| VRIO only as a sentence (Module 4) | VRIO is the course's main internal tool | VRIO table with ticks and crosses (8) |
| No SWOT to TOWS, no generic strategy (Modules 4, 6) | Priorities should be derived, not asserted | TOWS (16); generic strategy (7) |
| Q2 leadership answered only with ambidexterity | The question asks what kind of leadership | Three real tests + Architect, Integrator, Steward model (10) |
| Q3 choice has no criteria | The brief says "justify your answer" | Weighted decision matrix + chart (11) |
| Q5 answered as pilot, scale, renew | The brief asks for strategic priorities | Five priorities with indicators, baselines, direction (16–17) |
| World Labs missing; Li only via HAI | Your responsible-AI and out-of-the-box angle | Spotlight (9) + simulate-before-deploy (15) |
| No events after 15 Nov | Hugging Face, AMD–World Labs, CEO exit and Q3 FY27 are all relevant | Reality check (3) and evidence throughout |
| Two charts, few indicators | You asked for charts and key indicators | 4 charts, 6 KPI tiles, KPI table |
| Title says "Individual Assessment" | The brief calls it a group assignment with a naming rule | Neutral label; file named to the brief's pattern |

Human-in-the-loop was already used, and appropriately (old slide 12). The new deck keeps it and makes it risk-tiered and measurable (13).
