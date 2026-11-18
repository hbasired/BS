// CHIPSET presentation generator (pptxgenjs, structured deck)
// Run: NODE_PATH=./node_modules node build.js <out.pptx>
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa6");
const { applyTheme } = require(process.env.SKILL_DIR + "/scripts/apply_theme.js");

const OUT = process.argv[2] || "deck.pptx";

// ---------- Theme (sampled from the original deck) ----------
const THEME = {
  name: "CHIPSET Navy Teal",
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  colors: {
    dk1: "132B41", // navy text
    lt1: "FFFFFF",
    dk2: "4F697C", // slate secondary text
    lt2: "F5F7F9", // light background
    accent1: "087E8B", // teal
    accent2: "C7E76A", // lime
    accent3: "9FAEB9", // context gray
    accent4: "725A38", // bronze (assurance)
    accent5: "F4E9D6", // beige (caution)
    accent6: "D8EDE8", // mint (positive)
    hlink: "087E8B",
    folHlink: "4F697C",
  },
};
const HEX = {
  navy: "132B41", slate: "4F697C", light: "F5F7F9", teal: "087E8B", lime: "C7E76A",
  gray: "9FAEB9", bronze: "725A38", beige: "F4E9D6", mint: "D8EDE8", white: "FFFFFF",
  tint: "E9EEF1", tint2: "DCE6EA", rule: "D5DEE4", deepTeal: "234F65", chartTeal: "008A9B",
  softText: "BED0DA",
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in
pres.author = "Hemanth Basireddy";
pres.company = "MAIB March 25 - Business Strategy";
pres.title = "CHIPSET: From AI power to public trust";
pres.subject = "Business Strategy group assignment - CHIPSET";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor; // text1 navy, text2 slate, background1 white, background2 light, accent1..6
const SH = pres.shapes;

const W = 13.333, H = 7.5, LM = 0.6, CW = 12.133, RX = LM + CW;
const TOTAL = 20;

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "TITLE_DARK",
  background: { color: HEX.navy },
  objects: [
    {
      placeholder: {
        options: {
          name: "title", type: "title", x: LM, y: 0.95, w: 7, h: 1.1,
          fontFace: "Arial", fontSize: 64, bold: true, color: C.background1, valign: "top", align: "left", margin: 0,
        },
        text: "",
      },
    },
  ],
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: HEX.light },
  objects: [
    {
      placeholder: {
        options: {
          name: "title", type: "title", x: LM, y: 0.7, w: CW, h: 0.7,
          fontFace: "Arial", fontSize: 28, bold: true, color: C.text1, valign: "top", align: "left", margin: 0,
        },
        text: "",
      },
    },
  ],
  slideNumber: { x: 11.93, y: 0.36, w: 0.8, h: 0.3, fontFace: "Arial", fontSize: 10, color: HEX.slate, align: "right" },
});

// ---------- Icons ----------
const iconCache = {};
async function icon(name, hex) {
  const key = name + hex;
  if (iconCache[key]) return iconCache[key];
  const Comp = fa[name];
  if (!Comp) throw new Error("Missing icon " + name);
  let svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { size: 256 }));
  svg = svg.replace(/currentColor/g, "#" + hex);
  if (!/xmlns=/.test(svg)) svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  const buf = await sharp(Buffer.from(svg)).resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  iconCache[key] = "image/png;base64," + buf.toString("base64");
  return iconCache[key];
}

// ---------- Helpers ----------
let nObj = 0;
const oname = (s) => `${s}-${++nObj}`;

function content(section, kicker, title) {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
  s.addText(title, { placeholder: "title" });
  s.addText(kicker, {
    x: LM, y: 0.36, w: 10.5, h: 0.3, fontSize: 11, bold: true, color: C.accent1, charSpacing: 1.5,
    margin: 0, valign: "middle", isTextBox: true, objectName: "Kicker",
  });
  return s;
}
function sources(s, text) {
  s.addText(text, {
    x: LM, y: 6.9, w: 9.45, h: 0.42, fontSize: 10, color: C.text2, margin: 0, valign: "middle",
    isTextBox: true, objectName: "Sources",
  });
}
function tag(s, text) {
  s.addText(text, {
    x: 10.15, y: 6.9, w: RX - 10.15, h: 0.42, fontSize: 10, italic: true, color: C.text2, align: "right",
    margin: 0, valign: "middle", isTextBox: true, objectName: "Status tag",
  });
}
function takeaway(s, text, y, h = 0.58, x = LM, w = CW) {
  s.addShape(SH.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.06, fill: { color: C.text1 }, line: { color: C.text1 }, objectName: oname("Takeaway box"),
  });
  const runs = Array.isArray(text) ? text : [{ text, options: {} }];
  s.addText(runs, {
    x: x + 0.22, y, w: w - 0.44, h, fontSize: 15, color: C.background1, valign: "middle", margin: 0,
    isTextBox: true, objectName: oname("Takeaway text"),
  });
}
function box(s, x, y, w, h, fill, opts = {}) {
  s.addShape(SH.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: opts.r ?? 0.06, fill: { color: fill }, line: { color: opts.line || fill, width: opts.lw || 0.75 },
    objectName: oname(opts.name || "Card"),
  });
}
function label(s, text, x, y, w, color = C.accent1, size = 10.5) {
  s.addText(text, { x, y, w, h: 0.26, fontSize: size, bold: true, color, charSpacing: 1, margin: 0, valign: "middle", isTextBox: true, objectName: oname("Label") });
}
function txt(s, text, x, y, w, h, o = {}) {
  s.addText(text, Object.assign({ x, y, w, h, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: oname(o.name || "Text") }, o));
}
async function iconCircle(s, iconName, x, y, d, circleFill, iconHex) {
  s.addShape(SH.OVAL, { x, y, w: d, h: d, fill: { color: circleFill }, line: { color: circleFill }, objectName: oname("Icon circle") });
  const data = await icon(iconName, iconHex);
  const pad = d * 0.24;
  s.addImage({ data, x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad, altText: iconName.replace(/^Fa/, "") + " icon", objectName: oname("Icon") });
}
function line(s, x, y, w, h, color, o = {}) {
  s.addShape(SH.LINE, {
    x, y, w, h, flipV: o.flipV || false, flipH: o.flipH || false,
    line: { color, width: o.width || 1.25, dashType: o.dash || "solid", endArrowType: o.arrow || undefined, beginArrowType: o.beginArrow || undefined },
    objectName: oname("Connector"),
  });
}
function connect(s, x1, y1, x2, y2, color, o = {}) {
  const x = Math.min(x1, x2), y = Math.min(y1, y2), w = Math.abs(x2 - x1), h = Math.abs(y2 - y1);
  const flipV = (x2 - x1) * (y2 - y1) < 0;
  s.addShape(SH.LINE, { x, y, w, h, flipV, line: { color, width: o.width || 1.25, dashType: o.dash || "solid" }, objectName: oname("Connector") });
}
const B = (t, extra = {}) => ({ text: t, options: Object.assign({ bold: true }, extra) });
const R = (t, extra = {}) => ({ text: t, options: extra });

// chart look shared by every chart
const chartBase = {
  catAxisLabelColor: HEX.slate, valAxisLabelColor: HEX.slate,
  catAxisLabelFontFace: "Arial", valAxisLabelFontFace: "Arial",
  catAxisLabelFontSize: 11, valAxisLabelFontSize: 10,
  dataLabelFontFace: "Arial", dataLabelFontSize: 11, dataLabelColor: HEX.navy, dataLabelFontBold: true,
  valGridLine: { color: "DCE3E8", size: 0.75 }, catGridLine: { style: "none" },
  catAxisLineShow: true, catAxisLineColor: HEX.rule, valAxisLineShow: false,
  legendFontFace: "Arial", legendFontSize: 11, legendColor: HEX.navy,
  titleFontFace: "Arial",
};

// ---------- References ----------
const REFS = [
  ["NVIDIA (2026a)", "Form 10-K for the fiscal year ended 25 January 2026", "U.S. SEC.", "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm"],
  ["NVIDIA (2026b)", "NVIDIA announces financial results for third quarter fiscal 2027", "17 Nov. SEC Form 8-K, Ex. 99.1.", "https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000088/q3fy27pr.htm"],
  ["NVIDIA (2026c)", "NVIDIA announces CEO transition", "12 Nov. NVIDIA Newsroom.", "https://nvidianews.nvidia.com/news/nvidia-announces-ceo-transition"],
  ["NVIDIA (2026d)", "NVIDIA to acquire Hugging Face", "3 Sep. NVIDIA Blog.", "https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/"],
  ["AMD (2026a)", "AMD to acquire World Labs to advance the future of AI compute", "28 Sep. AMD Investor Relations.", "https://ir.amd.com/news-events/press-releases/detail/1299/amd-to-acquire-world-labs-to-advance-the-future-of-ai-compute"],
  ["AMD (2026b)", "AMD completes acquisition of World Labs", "16 Nov. AMD Investor Relations.", "https://ir.amd.com/news-events/press-releases/detail/1306/amd-completes-acquisition-of-world-labs"],
  ["NVIDIA (2023)", "Form 10-K for the fiscal year ended 29 January 2023", "U.S. SEC.", "https://www.sec.gov/Archives/edgar/data/1045810/000104581023000017/nvda-20230129.htm"],
  ["NVIDIA (2024)", "CFO commentary on third quarter fiscal 2025 results", "20 Nov.", "https://investor.nvidia.com/files/doc_financials/2025/Q325/Q3FY25-CFO-Commentary.pdf"],
  ["NVIDIA (2025)", "CFO commentary on fourth quarter and fiscal 2025 results", "26 Feb.", "https://investor.nvidia.com/files/doc_financials/2025/Q425/Q4FY25-CFO-Commentary.pdf"],
  ["Amazon (2025)", "Amazon.com announces third quarter results", "30 Oct.", "https://ir.aboutamazon.com/news-release/news-release-details/2025/Amazon-com-Announces-Third-Quarter-Results/"],
  ["TrendForce (2025)", "OpenAI ramps up global compute power with NVIDIA, AMD and Broadcom", "15 Oct. (26 GW in total).", "https://www.trendforce.com/news/2025/10/15/news-openai-ramps-up-global-compute-power-with-nvidia-amd-and-broadcom-securing-26-gw-of-ai-infrastructure/"],
  ["Anthropic (2025)", "Expanding our use of Google Cloud TPUs and services", "23 Oct.", "https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services"],
  ["TechCrunch (2026)", "World Labs lands $1B, with $200M from Autodesk", "18 Feb.", "https://techcrunch.com/2026/02/18/world-labs-lands-200m-from-autodesk-to-bring-world-models-into-3d-workflows/"],
  ["World Labs (2025)", "Marble, our frontier multimodal world model, is available to everyone", "12 Nov.", "https://www.worldlabs.ai/blog/marble-world-model"],
  ["CNBC (2026)", "AMD acquiring Fei-Fei Li's World Labs AI firm in deal worth $8.2 billion", "28 Sep.", "https://www.cnbc.com/2026/09/28/amd-fei-fei-li-world-labs.html"],
  ["Fortune (2026)", "How Jensen Huang's 'flat' org may have hampered Nvidia's succession planning", "12 Nov.", "https://fortune.com/2026/11/12/jensen-huang-nvidia-flat-org-succession-planning/"],
  ["NVIDIA (2020)", "NVIDIA completes acquisition of Mellanox", "27 Apr.", "https://nvidianews.nvidia.com/news/nvidia-completes-acquisition-of-mellanox-creating-major-force-driving-next-gen-data-centers"],
  ["NVIDIA & SoftBank (2022)", "Termination of NVIDIA's acquisition of Arm Limited", "7 Feb.", "https://nvidianews.nvidia.com/news/nvidia-and-softbank-group-announce-termination-of-nvidias-acquisition-of-arm-limited"],
  ["International Energy Agency (2025)", "Energy and AI: executive summary", "Paris: IEA.", "https://www.iea.org/reports/energy-and-ai/executive-summary"],
  ["DeepSeek-AI (2024)", "DeepSeek-V3 technical report", "arXiv:2412.19437.", "https://arxiv.org/abs/2412.19437"],
  ["European Commission (2026)", "AI Act: regulatory framework and application timeline", "Updated after the 2026 AI Omnibus.", "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"],
  ["European Union (2024)", "Regulation (EU) 2024/1689 (AI Act), Article 14: Human oversight", "Official Journal of the EU.", "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"],
  ["MSIT, Republic of Korea (2026)", "The AI Basic Act comes into force", "22 Jan.", "https://www.msit.go.kr/eng/bbs/view.do?bbsSeqNo=42&mId=4&nttSeqNo=1214&sCode=eng"],
  ["California Legislature (2025)", "SB 53: Transparency in Frontier Artificial Intelligence Act", "Signed 29 Sep.", "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53"],
  ["Joint California Policy Working Group (2025)", "The California report on frontier AI policy (co-led by F.-F. Li)", "arXiv:2506.17303.", "https://arxiv.org/abs/2506.17303"],
  ["Stanford HAI (n.d.)", "About Stanford HAI: mission and human-centred principles", "Stanford University.", "https://hai.stanford.edu/about"],
  ["Stanford HAI (2021a)", "HAI co-director Fei-Fei Li named to National AI Research Resource Task Force", "10 Jun.", "https://hai.stanford.edu/news/hai-co-director-fei-fei-li-named-national-artificial-intelligence-research-resource-task-force"],
  ["Stanford HAI (2021b)", "A new approach to mitigating AI's negative impact (Ethics & Society Review)", "", "https://hai.stanford.edu/news/new-approach-mitigating-ais-negative-impact"],
  ["National Science Foundation (2024)", "U.S. NAIRR pilot brings cutting-edge AI resources to researchers and educators", "16 Oct.", "https://www.nsf.gov/science-matters/us-nairr-pilot-brings-cutting-edge-ai-resources-researchers"],
  ["Federal Trade Commission (2024)", "FTC v. Rite Aid Corporation: case record and stipulated order", "", "https://www.ftc.gov/legal-library/browse/cases-proceedings/2023190-rite-aid-corporation-ftc-v"],
  ["NIST (2023)", "Artificial Intelligence Risk Management Framework (AI RMF 1.0)", "NIST AI 100-1.", "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf"],
  ["Porter, M. E. (2008)", "The five competitive forces that shape strategy", "Harvard Business Review, 86(1), 78-93.", "https://hbr.org/2008/01/the-five-competitive-forces-that-shape-strategy"],
  ["Harvard Business School ISC (n.d.)", "The value chain", "Institute for Strategy & Competitiveness.", "https://www.isc.hbs.edu/strategy/business-strategy/Pages/the-value-chain.aspx"],
  ["Barney, J. B. (1995)", "Looking inside for competitive advantage", "Academy of Management Executive, 9(4), 49-61.", "https://doi.org/10.5465/ame.1995.9512032192"],
  ["Weihrich, H. (1982)", "The TOWS matrix: A tool for situational analysis", "Long Range Planning, 15(2), 54-66.", "https://doi.org/10.1016/0024-6301(82)90120-0"],
  ["Kim, W. C. & Mauborgne, R. (2005)", "Blue ocean strategy: the Four Actions Framework", "Harvard Business School Press.", "https://www.blueoceanstrategy.com/tools/four-actions-framework/"],
  ["Galbraith, J. R. (n.d.)", "The Star Model", "Galbraith Management Consultants.", "https://jaygalbraith.com/wp-content/uploads/2024/03/StarModel.pdf"],
  ["O'Reilly, C. A. & Tushman, M. L. (2004)", "The ambidextrous organization", "Harvard Business Review, 82(4), 74-81.", "https://hbr.org/2004/04/the-ambidextrous-organization"],
  ["Iansiti, M. & Levien, R. (2004)", "Strategy as ecology", "Harvard Business Review, 82(3), 68-78.", "https://hbr.org/2004/03/strategy-as-ecology"],
];
// short cite labels, aligned with REFS
const SHORT = ["NVIDIA 2026a","NVIDIA 2026b","NVIDIA 2026c","NVIDIA 2026d","AMD 2026a","AMD 2026b","NVIDIA 2023","NVIDIA 2024","NVIDIA 2025",
  "Amazon 2025","TrendForce 2025","Anthropic 2025","TechCrunch 2026","World Labs 2025","CNBC 2026","Fortune 2026","NVIDIA 2020","NVIDIA & SoftBank 2022",
  "IEA 2025","DeepSeek-AI 2024","European Commission 2026","EU AI Act 2024","MSIT 2026","California SB 53 2025","California Working Group 2025",
  "Stanford HAI n.d.","Stanford HAI 2021a","Stanford HAI 2021b","NSF 2024","FTC 2024","NIST 2023","Porter 2008","HBS ISC n.d.","Barney 1995",
  "Weihrich 1982","Kim & Mauborgne 2005","Galbraith n.d.","O'Reilly & Tushman 2004","Iansiti & Levien 2004"];
if (SHORT.length !== REFS.length) throw new Error("SHORT/REFS length mismatch");
const short = (i) => `[${i}] ${SHORT[i - 1]}`;
const cite = (...ids) => "Sources: " + [...ids].sort((a, b) => a - b).map(short).join(" · ");

// =====================================================================
async function build() {
  // ---------------- S1 Title ----------------
  pres.addSection({ title: "Opening" });
  {
    const s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "Opening" });
    txt(s, "BUSINESS STRATEGY · MAIB MARCH 25 · TERM 5", LM, 0.55, 8, 0.3, { fontSize: 12, bold: true, color: C.accent2, charSpacing: 2 });
    s.addText("CHIPSET", { placeholder: "title" });
    txt(s, "From AI power to public trust", LM, 2.35, 6.4, 0.6, { fontSize: 28, color: C.background1 });
    txt(s, [R("Strong engineering.", { breakLine: true }), R("Human accountability.", { breakLine: true }), R("Responsible scale.")], LM, 3.15, 6, 1.25, { fontSize: 20, color: C.accent2, paraSpaceAfter: 2 });
    txt(s, [R("Hemanth Basireddy", { bold: true, breakLine: true }), R("Course Instructor: A Hariharan", { breakLine: true }), R("Presentation · November 2026")], LM, 4.75, 6, 1.0, { fontSize: 14, color: HEX.softText });
    // stack visual (platform layers)
    const layers = [
      ["Useful, accepted outcomes", HEX.lime, C.text1],
      ["Human oversight + trust", HEX.deepTeal, C.background1],
      ["World models + physical AI", HEX.deepTeal, C.background1],
      ["Software + open ecosystem", HEX.deepTeal, C.background1],
      ["Compute + networking", HEX.deepTeal, C.background1],
    ];
    let y = 1.35;
    layers.forEach(([t, f, tc], i) => {
      box(s, 7.55, y, 5.15, 0.68, f, { r: 0.08, name: "Stack layer" });
      txt(s, t, 7.85, y, 4.7, 0.68, { fontSize: 17, bold: i === 0, color: tc, valign: "middle" });
      y += 0.8;
    });
    txt(s, "A strategy for the whole stack, not just the chip.", 7.55, y + 0.1, 5.15, 0.4, { fontSize: 14, italic: true, color: HEX.softText });
    txt(s, "CHIPSET is analysed with NVIDIA as its real-world analogue (the case names CUDA and gaming origins). Evidence checked to 17 November 2026.", LM, 6.75, 12, 0.4, { fontSize: 10, color: HEX.softText, valign: "middle" });
    s.addNotes(
`OPENING (about 45 seconds)
Good morning. My question is how a company that helped build the AI economy can stay its trusted infrastructure leader.
I read CHIPSET as NVIDIA, because the case names CUDA and its gaming origins, so I test each recommendation against real evidence up to 17 November 2026.
My answer in one line: keep one engineering core, organise solution teams and independent assurance around it, and make trust — human oversight, simulation-tested safety and openness — the next layer of the moat.
I use the course toolkit: PESTEL, Five Forces, competitor analysis, VRIO, TOWS and Blue Ocean. I add one spotlight: Fei-Fei Li's World Labs, which shows where the next platform battle is being fought.
TRANSITION: Let me give you the answer first.`);
  }

  // ---------------- S2 Executive summary ----------------
  {
    const s = content("Opening", "THE ANSWER FIRST · FIVE QUESTIONS, ONE STRATEGY", "Lead as a trusted, open platform, not a chip vendor");
    const cards = [
      ["Q1", "Why more than a chip firm?", "System + ecosystem", "7.5M developers, networking and partners make the chip useful.", "FaLayerGroup"],
      ["Q2", "What leadership is needed?", "Bilingual + institutional", "Fluent in technology and society. A bench, not one hero.", "FaUserTie"],
      ["Q3", "Which organization design?", "Accountable hybrid", "One engineering core, solution units, independent assurance.", "FaSitemap"],
      ["Q4", "How to co-create with partners?", "Keystone, not dominator", "Open platforms, shared value, simulate-before-deploy assurance.", "FaHandshake"],
      ["Q5", "Which 3–5-year priorities?", "Five measured bets", "Inference, physical AI, diversification, resilience, trust.", "FaChartLine"],
    ];
    const gw = 0.2, cw = (CW - 4 * gw) / 5;
    for (let i = 0; i < 5; i++) {
      const x = LM + i * (cw + gw), y = 1.62;
      box(s, x, y, cw, 3.33, HEX.white, { line: HEX.rule, name: "Answer card" });
      await iconCircle(s, cards[i][4], x + 0.2, y + 0.2, 0.58, HEX.teal, HEX.white);
      txt(s, cards[i][0], x + 0.92, y + 0.2, cw - 1.05, 0.58, { fontSize: 22, bold: true, color: C.accent1, valign: "middle" });
      txt(s, cards[i][1], x + 0.2, y + 0.9, cw - 0.35, 0.5, { fontSize: 11.5, italic: true, color: C.text2 });
      label(s, "ANSWER", x + 0.2, y + 1.45, cw - 0.4);
      txt(s, cards[i][2], x + 0.2, y + 1.72, cw - 0.35, 0.62, { fontSize: 16, bold: true });
      txt(s, cards[i][3], x + 0.2, y + 2.38, cw - 0.35, 0.88, { fontSize: 12.5, color: C.text2 });
    }
    box(s, LM, 5.08, CW, 0.95, HEX.navy, { name: "Recommendation box" });
    txt(s, [B("Recommendation  ", { color: HEX.lime }), R("Preserve the engineering core, build solution and assurance capacity around it, and turn verifiable trust (human oversight, simulation-tested safety, openness) into the next layer of CHIPSET's moat.")],
      LM + 0.3, 5.08, CW - 0.6, 0.95, { fontSize: 15, color: C.background1, valign: "middle" });
    txt(s, [B("Where each answer is proved:   ", { color: HEX.teal }), R("Q1 → slides 4–9   ·   Q2 → slide 10   ·   Q3 → slides 11–13   ·   Q4 → slides 14–15   ·   Q5 → slides 16–17")],
      LM, 6.15, CW, 0.38, { fontSize: 13, valign: "middle" });
    sources(s, "CHIPSET = NVIDIA analogue. Recommendations are the author's analysis, not a description of NVIDIA's current organisation.");
    s.addNotes(
`THE ANSWER FIRST (about 60 seconds)
The five questions are linked. Q1, the platform position, creates interdependence with partners. That interdependence changes what leadership (Q2) and structure (Q3) must do. Those choices decide whether partners keep co-creating (Q4), and together they set the priorities (Q5).
My answers: CHIPSET's advantage is the system and ecosystem, not the chip. It needs bilingual leaders, fluent in both technology and society, organised as a bench rather than around one hero. The structure should be a hybrid: one engineering core, solution units close to customers, and independent assurance with a right to stop. It should behave as a keystone of its ecosystem, not a dominator. And it should pursue five measured priorities.
My differentiating idea is to make trust a product, through simulate-before-deploy assurance with humans accountable for high-consequence decisions.
The line at the bottom is my roadmap: Q1 is proved on slides 4 to 9, Q2 on slide 10, Q3 on 11 to 13, Q4 on 14 and 15, and Q5 on 16 and 17. Each of those sections ends with a box labelled with its answer.
TRANSITION: Why now? Because the last ten weeks tested this case in real life.`);
  }

  // ---------------- S3 Reality check ----------------
  {
    const s = content("Opening", "REALITY CHECK · POST-CASE EVENTS, SEPTEMBER–NOVEMBER 2026", "Ten weeks of real events stress-tested the case");
    const ev = [
      ["3 SEP 2026", "NVIDIA agrees to buy Hugging Face", "$12.93bn. Pledges the platform stays open and NVIDIA compute is not required.", "Q4 · ECOSYSTEM"],
      ["28 SEP 2026", "AMD agrees to buy World Labs", "About $8.2bn, all-stock. A rival buys a world-model lab NVIDIA had backed.", "Q1 · RIVALRY"],
      ["12 NOV 2026", "Founder-CEO resigns", "Effective immediately. CFO is interim CEO; the board names its first Chair.", "Q2 + Q3 · LEADERSHIP"],
      ["16–17 NOV 2026", "Deal closes; demand compounds", "Fei-Fei Li joins AMD as Chief Scientist. NVIDIA Q3 FY27 revenue $115.8bn, +103%.", "Q5 · PRIORITIES"],
    ];
    const gw = 0.24, cw = (CW - 3 * gw) / 4;
    line(s, LM + 0.2, 2.42, CW - 0.4, 0, HEX.gray, { width: 2 });
    for (let i = 0; i < 4; i++) {
      const x = LM + i * (cw + gw);
      txt(s, ev[i][0], x, 1.72, cw, 0.35, { fontSize: 13, bold: true, color: C.accent1 });
      s.addShape(SH.OVAL, { x: x + 0.05, y: 2.27, w: 0.3, h: 0.3, fill: { color: i === 2 ? HEX.bronze : HEX.teal }, line: { color: HEX.white, width: 2 }, objectName: oname("Timeline node") });
      box(s, x, 2.8, cw, 2.75, HEX.white, { line: HEX.rule, name: "Event card" });
      txt(s, ev[i][1], x + 0.2, 2.98, cw - 0.4, 0.7, { fontSize: 16, bold: true });
      txt(s, ev[i][2], x + 0.2, 3.72, cw - 0.4, 1.1, { fontSize: 13, color: C.text2 });
      box(s, x + 0.2, 4.95, cw - 0.4, 0.38, HEX.mint, { r: 0.1, name: "Question tag" });
      txt(s, ev[i][3], x + 0.2, 4.95, cw - 0.4, 0.38, { fontSize: 10.5, bold: true, color: C.accent1, align: "center", valign: "middle", charSpacing: 1 });
    }
    takeaway(s, [B("Demand is not the constraint. "), R("Ecosystem control, leadership depth and trust are.")], 5.85, 0.6);
    sources(s, cite(4, 5, 3, 6, 2));
    tag(s, "Company releases");
    s.addNotes(
`REALITY CHECK (about 75 seconds)
The case is set in early 2026. In the last ten weeks, real events tested exactly the questions we were asked.
First, on 3 September NVIDIA agreed to buy Hugging Face for 12.93 billion dollars, and publicly committed that the platform stays open and that NVIDIA compute will not be required. That is an ecosystem move, which is Question 4.
Second, on 28 September AMD agreed to buy World Labs, Fei-Fei Li's world-model company, for about 8.2 billion dollars in stock. NVIDIA had invested in World Labs. A rival bought a complementor. That is Question 1 and rivalry.
Third, on 12 November the founder-CEO resigned with immediate effect. The CFO became interim CEO and the board appointed its first Chair. The company gave no reason and I will not speculate. The strategic point is that a founder-centred, flat organisation lost its central node overnight. That is Questions 2 and 3.
Fourth, on 16 November AMD closed the deal, and on 17 November NVIDIA reported 115.8 billion dollars of quarterly revenue, up 103 percent.
So demand is not the constraint. Ecosystem control, leadership depth and trust are.
TRANSITION: Let me start with the evidence for Question 1.`);
  }

  // ---------------- S4 Financial evidence ----------------
  pres.addSection({ title: "Q1 Position" });
  {
    const s = content("Q1 Position", "Q1 · REPORTED FINANCIAL EVIDENCE", "Data Center now defines CHIPSET's economics");
    const cats = ["FY22\n$26.9bn", "FY23\n$27.0bn", "FY24\n$60.9bn", "FY25\n$130.5bn", "FY26\n$215.9bn"];
    s.addChart(pres.charts.BAR, [
      { name: "Data Center", labels: cats, values: [10.6, 15.0, 47.5, 115.2, 193.7] },
      { name: "Other markets", labels: cats, values: [16.3, 12.0, 13.4, 15.3, 22.2] },
    ], Object.assign({}, chartBase, {
      x: LM, y: 1.6, w: 6.85, h: 4.2, barDir: "col", barGrouping: "stacked", barGapWidthPct: 55,
      chartColors: [HEX.chartTeal, HEX.gray],
      showValue: true, dataLabelPosition: "ctr", dataLabelColor: HEX.white, dataLabelFormatCode: "0.0",
      showLegend: true, legendPos: "t",
      valAxisMaxVal: 250, valAxisMajorUnit: 50, valAxisLabelFormatCode: "0",
      showTitle: true, title: "Revenue by market, US$ billion (fiscal years end in late January)", titleFontSize: 12, titleColor: HEX.navy,
      objectName: "Revenue chart",
    }));
    const kpis = [
      ["89.7%", "of FY2026 revenue came from Data Center"],
      ["22% + 14%", "two direct customers' share of FY2026 revenue (FY2025 top: 12%)"],
      ["71.1%", "FY2026 gross margin, down from 75.0%; includes the $4.5bn H20 charge"],
      ["$18.5bn", "FY2026 R&D; 31,000 of 42,000 employees work in R&D"],
      ["7.5M", "developers use CUDA and NVIDIA's software tools"],
      ["$115.8bn", "Q3 FY2027 revenue, up 103% year on year (17 Nov 2026)"],
    ];
    const kx = 7.75, kw = (RX - kx - 0.18) / 2, kh = 1.2, kg = 0.12;
    label(s, "KEY INDICATORS  ·  BEIGE = RISK TO WATCH", kx, 1.6, RX - kx);
    kpis.forEach(([n, l], i) => {
      const x = kx + (i % 2) * (kw + 0.18), y = 1.92 + Math.floor(i / 2) * (kh + kg);
      box(s, x, y, kw, kh, i === 1 ? HEX.beige : HEX.white, { line: i === 1 ? HEX.beige : HEX.rule, name: "KPI tile" });
      txt(s, n, x + 0.18, y + 0.1, kw - 0.3, 0.48, { fontSize: 24, bold: true, color: i === 1 ? C.accent4 : C.accent1 });
      txt(s, l, x + 0.18, y + 0.6, kw - 0.3, 0.58, { fontSize: 11, color: C.text2 });
    });
    takeaway(s, [B("So what: ", { color: HEX.lime }), R("exceptional scale and margins, but two customers are 36% of revenue. Concentration is the risk to manage.")], 5.95, 0.58);
    sources(s, "89.7% = 193.737 ÷ 215.938: revenue mix, not market share.  " + cite(1, 7, 2));
    tag(s, "Reported / calculated");
    s.addNotes(
`FINANCIAL EVIDENCE (about 70 seconds)
Point first to the height of the bars, then to the teal part. Revenue went from about 27 billion dollars in FY2022 to 215.9 billion in FY2026, and Data Center went from 10.6 to 193.7 billion. So 89.7 percent of revenue now comes from Data Center. That is revenue mix, not market share. Data Center includes networking, which grew 142 percent last year.
The tiles are my key indicators. Two are strengths: R&D of 18.5 billion dollars with three quarters of staff in R&D, and 7.5 million developers using CUDA and NVIDIA tools. One is a warning, in beige: two direct customers were 22 and 14 percent of revenue, up from a top customer at 12 percent a year earlier. That is concentrated buyer power. Gross margin fell from 75 to 71.1 percent, partly because of the 4.5 billion dollar H20 charge.
The latest quarter, reported on 17 November, is 115.8 billion dollars, up 103 percent. So the business is still compounding. The so-what at the bottom: exceptional scale and margins, but concentration is the risk to manage.
TRANSITION: What external forces sit behind these numbers?`);
  }

  // ---------------- S5 PESTEL ----------------
  {
    const s = content("Q1 Position", "Q1 · EXTERNAL ENVIRONMENT · PESTEL (MODULE 2)", "The environment rewards scale but raises scrutiny");
    const hdr = (t) => ({ text: t, options: { bold: true, color: HEX.white, fill: { color: HEX.navy }, fontSize: 12 } });
    const ot = (t) => ({ text: t, options: { bold: true, align: "center", color: t === "T" ? HEX.bronze : HEX.teal, fontSize: 12 } });
    const rows = [
      [hdr("Factor"), hdr("Signal (evidence)"), hdr("So what for CHIPSET"), hdr("O/T")],
      ["Political", "China data-centre market 'effectively foreclosed'; $4.5bn H20 charge", "Test policy scenarios before capacity commitments", "T"],
      ["Economic", "AI capex boom; $95.2bn supply and capacity obligations", "Growth, with cycle and financing risk", "O/T"],
      ["Social", "Public concern about AI harms (e.g., FTC Rite Aid ban, 2024)", "Trust becomes a buying criterion", "O/T"],
      ["Technological", "World models, physical AI, efficient models, custom chips", "New demand waves, and new substitutes", "O/T"],
      ["Environmental", "Data-centre power to roughly double by 2030 (IEA)", "Performance per watt and siting are strategic", "O/T"],
      ["Legal", "EU AI Act high-risk rules from 2 Dec 2027; Korea AI Basic Act (Jan 2026); California SB 53", "Role-based compliance built into products", "O/T"],
    ].map((r, ri) => ri === 0 ? r : [
      { text: r[0], options: { bold: true, color: HEX.navy, fontSize: 12.5 } },
      { text: r[1], options: { color: HEX.navy, fontSize: 12 } },
      { text: r[2], options: { color: HEX.slate, fontSize: 12 } },
      ot(r[3]),
    ]);
    s.addTable(rows, {
      x: LM, y: 1.62, w: 8.6, colW: [1.45, 3.65, 2.85, 0.65], rowH: [0.4, 0.66, 0.66, 0.66, 0.66, 0.66, 0.8],
      fontFace: "Arial", valign: "middle", margin: [0.04, 0.08, 0.04, 0.08],
      border: { type: "solid", pt: 0.75, color: HEX.rule }, fill: { color: HEX.white },
      autoPage: false, objectName: "PESTEL table",
    });
    // IEA chart panel
    label(s, "GLOBAL DATA-CENTRE ELECTRICITY, TWh (IEA)", 9.5, 1.62, 3.3);
    s.addChart(pres.charts.BAR, [
      { name: "2024 estimate", labels: ["2024 estimate", "2030 projection"], values: [415, 0] },
      { name: "2030 projection", labels: ["2024 estimate", "2030 projection"], values: [0, 945] },
    ], Object.assign({}, chartBase, {
      x: 9.4, y: 1.9, w: 3.33, h: 2.1, barDir: "bar", barGrouping: "stacked", barGapWidthPct: 45,
      chartColors: [HEX.chartTeal, HEX.gray], showValue: true, dataLabelPosition: "inEnd", dataLabelColor: HEX.navy, dataLabelFormatCode: "#,##0;;;",
      showLegend: false, valAxisHidden: true, valGridLine: { style: "none" }, valAxisMaxVal: 1000, catAxisLabelFontSize: 10.5, catAxisOrientation: "maxMin",
      objectName: "IEA chart",
    }));
    txt(s, "All data centres, not AI only. The 2030 value is a projection, not an observation.", 9.5, 4.05, 3.23, 0.5, { fontSize: 11, color: C.text2 });
    box(s, 9.45, 4.62, RX - 9.45, 0.9, HEX.mint, { name: "Course quote" });
    txt(s, [B("Module 2: ", { color: HEX.teal }), R("“Companies investing early in compliance systems gain strategic flexibility and reputational trust.”", { italic: true })], 9.6, 4.62, RX - 9.75, 0.9, { fontSize: 11.5, valign: "middle" });
    box(s, 9.45, 5.62, RX - 9.45, 0.88, HEX.navy, { name: "So-what box" });
    txt(s, [B("Net: ", { color: HEX.lime }), R("every tailwind now carries a licence-to-operate condition.")], 9.62, 5.62, RX - 9.8, 0.88, { fontSize: 13.5, color: C.background1, valign: "middle" });
    sources(s, cite(1, 19, 21, 23, 24, 30));
    tag(s, "O = opportunity · T = threat");
    s.addNotes(
`PESTEL (about 60 seconds)
PESTEL is from Module 2. I list the signal, then the so-what, because the module says macro analysis must feed strategic choices, not sit in the background.
Political: NVIDIA's own 10-K says it is effectively foreclosed from China's data-centre compute market, and the April 2025 H20 rule cost a 4.5 billion dollar charge. Economic: an AI capex boom, but NVIDIA has 95.2 billion dollars of supply and capacity obligations, so a downturn would hurt. Social: concern about AI harms; the FTC banned Rite Aid from facial recognition for five years. Technological: world models and physical AI create demand, while custom chips and efficient models create substitutes. Environmental: the IEA projects data-centre electricity rising from 415 terawatt-hours in 2024 to about 945 in 2030. That is a projection and covers all data centres. Legal: the EU AI Act's high-risk rules now start on 2 December 2027 after the 2026 Omnibus; Korea's AI Basic Act took effect in January 2026; California's SB 53 adds frontier-AI transparency.
Net: every tailwind now carries a licence-to-operate condition.
TRANSITION: Now the industry structure.`);
  }

  // ---------------- S6 Five Forces ----------------
  {
    const s = content("Q1 Position", "Q1 · INDUSTRY ANALYSIS · FIVE FORCES (MODULE 3)", "Buyers are becoming builders: the strongest force");
    const forces = [
      ["Buyer power", 5, "VERY HIGH", "Top direct customer = 22% of revenue; big buyers co-design chips"],
      ["Substitutes", 4, "HIGH", "Google TPUs, AWS Trainium (~500k in Rainier), efficient models"],
      ["Rivalry", 4, "HIGH", "AMD racks + OpenAI 6 GW + World Labs; Huawei in China"],
      ["Supplier power", 4, "HIGH", "Advanced nodes, packaging and HBM; $95.2bn commitments"],
      ["New entrants", 2, "LOW–MED", "Full stack is hard to copy; inference niches stay open"],
    ];
    const rowH = 0.76, y0 = 1.95;
    label(s, "FORCE", LM, 1.62, 1.8, C.text2);
    label(s, "INTENSITY (5 = STRONGEST)", 2.5, 1.62, 2.6, C.text2);
    label(s, "EVIDENCE", 5.1, 1.62, 2.7, C.text2);
    forces.forEach(([n, v, lab, ev], i) => {
      const y = y0 + i * rowH;
      txt(s, n, LM, y, 1.85, rowH - 0.08, { fontSize: 14, bold: true, valign: "middle" });
      for (let k = 0; k < 5; k++) {
        s.addShape(SH.ROUNDED_RECTANGLE, { x: 2.5 + k * 0.29, y: y + (rowH - 0.08) / 2 - 0.11, w: 0.23, h: 0.22, rectRadius: 0.04,
          fill: { color: k < v ? (v >= 5 ? HEX.bronze : HEX.teal) : HEX.tint2 }, line: { color: k < v ? (v >= 5 ? HEX.bronze : HEX.teal) : HEX.tint2 }, objectName: oname("Force meter") });
      }
      txt(s, lab, 4.0, y, 1.05, rowH - 0.08, { fontSize: 10.5, bold: true, color: v >= 5 ? C.accent4 : C.accent1, valign: "middle" });
      txt(s, ev, 5.1, y, 2.75, rowH - 0.08, { fontSize: 12, color: C.text2, valign: "middle" });
      if (i < 4) line(s, LM, y + rowH - 0.04, 7.25, 0, HEX.rule, { width: 0.75 });
    });
    // OpenAI GW chart
    label(s, "BUYER POWER IN ONE CHART: OPENAI'S DEALS, GW", 8.2, 1.62, 4.55);
    s.addChart(pres.charts.BAR, [
      { name: "CHIPSET analogue (NVIDIA)", labels: ["NVIDIA (LOI)", "Broadcom (custom)", "AMD"], values: [10, 0, 0] },
      { name: "Alternative suppliers", labels: ["NVIDIA (LOI)", "Broadcom (custom)", "AMD"], values: [0, 10, 6] },
    ], Object.assign({}, chartBase, {
      x: 8.1, y: 1.95, w: 4.63, h: 2.8, barDir: "col", barGrouping: "stacked", barGapWidthPct: 60,
      chartColors: [HEX.chartTeal, HEX.gray], showValue: true, dataLabelPosition: "inEnd", dataLabelColor: HEX.navy, dataLabelFormatCode: "0;;;",
      showLegend: true, legendPos: "b", legendFontSize: 10, valAxisMaxVal: 12, valAxisMajorUnit: 4, catAxisLabelFontSize: 10.5,
      objectName: "OpenAI GW chart",
    }));
    txt(s, "Sep–Oct 2025. The largest model builder deliberately multi-sources; NVIDIA's deal was a letter of intent.", 8.2, 4.78, 4.53, 0.7, { fontSize: 11, color: C.text2 });
    takeaway(s, [B("So what: ", { color: HEX.lime }), R("high growth but contested profits. CHIPSET must stay the buyers' best option, not assume it is the only one.")], 5.85, 0.62);
    sources(s, "Ratings: author's assessment (1–5).  " + cite(1, 10, 11, 20, 32));
    tag(s, "Analysis");
    s.addNotes(
`FIVE FORCES (about 75 seconds)
This is Porter's Five Forces from Module 3. I define the industry as accelerated AI data-centre infrastructure. The squares are my ratings out of five.
Buyer power is the strongest force. One direct customer is 22 percent of revenue, and the biggest buyers now co-design their own chips. Look at the chart: in September and October 2025 OpenAI announced 10 gigawatts with NVIDIA, which was a letter of intent, 10 gigawatts of its own custom chip with Broadcom, and 6 gigawatts with AMD. The largest model builder is deliberately multi-sourcing.
Substitutes are high: Google TPUs, AWS Trainium, with about 500,000 chips in Project Rainier, and efficient models like DeepSeek-V3. Rivalry is high: AMD now sells rack-scale systems and has just bought World Labs. Supplier power is high because advanced nodes, packaging and HBM memory are scarce; NVIDIA has 95.2 billion dollars of commitments. New entry is low to medium; the full stack is hard to copy, but inference niches stay open, which is why NVIDIA licensed Groq's technology.
Module 3 says high growth does not mean high attractiveness. CHIPSET must stay the buyers' best option, not assume it is the only one.
TRANSITION: Who exactly is attacking, and how?`);
  }

  // ---------------- S7 Competitor analysis ----------------
  {
    const s = content("Q1 Position", "Q1 · COMPETITOR ANALYSIS (MODULE 5) · STRATEGIC GROUPS (MODULE 3)", "Rivals are attacking the stack from three directions");
    // map frame (inner plot)
    const mx = 1.5, my = 1.72, mw = 4.7, mh = 3.85;
    box(s, mx, my, mw, mh, HEX.white, { line: HEX.rule, r: 0.02, name: "Map area" });
    line(s, mx, my + mh, mw + 0.12, 0, HEX.slate, { width: 1.5, arrow: "triangle" });
    line(s, mx, my - 0.12, 0, mh + 0.12, HEX.slate, { width: 1.5, beginArrow: "triangle" });
    txt(s, "Sold to all", LM, my - 0.05, 0.82, 0.5, { fontSize: 10, bold: true, color: C.text2, align: "right" });
    txt(s, "In-house only", LM, my + mh - 0.5, 0.82, 0.5, { fontSize: 10, bold: true, color: C.text2, align: "right", valign: "bottom" });
    txt(s, "Chip only", mx, my + mh + 0.06, 1.5, 0.28, { fontSize: 10, bold: true, color: C.text2 });
    txt(s, "Full stack + models", mx + mw - 2.0, my + mh + 0.06, 2.0, 0.28, { fontSize: 10, bold: true, color: C.text2, align: "right" });
    txt(s, "Higher = sells to more buyers · further right = wider stack · arrow = where a rival is moving", mx - 0.9, my + mh + 0.32, mw + 0.9, 0.26, { fontSize: 10, color: C.text2, align: "center", italic: true });
    const P = (fx, fy) => [mx + fx * mw, my + fy * mh];
    const bub = (name, fx, fy, d, fill, tc, fs = 11) => {
      const [cx, cy] = P(fx, fy);
      s.addShape(SH.OVAL, { x: cx - d / 2, y: cy - d / 2, w: d, h: d, fill: { color: fill }, line: { color: HEX.white, width: 2 }, objectName: oname("Group bubble") });
      txt(s, name, cx - d / 2 - 0.2, cy - 0.2, d + 0.4, 0.4, { fontSize: fs, bold: true, color: tc, align: "center", valign: "middle" });
      return [cx, cy];
    };
    // positions = author's qualitative judgement
    bub("CHIPSET", 0.86, 0.16, 1.05, HEX.teal, HEX.white, 12);
    const [ax, ay] = bub("AMD", 0.45, 0.2, 0.8, HEX.bronze, HEX.white);
    line(s, ax + 0.42, ay, 0.85, 0, HEX.bronze, { width: 2, arrow: "triangle", dash: "dash" });
    txt(s, "+ racks, + World Labs", ax + 0.25, ay + 0.38, 1.6, 0.28, { fontSize: 10, color: C.text2 });
    bub("Intel", 0.18, 0.13, 0.62, HEX.tint2, C.text1, 10.5);
    const [hx, hy] = bub("Huawei", 0.62, 0.46, 0.85, HEX.slate, HEX.white, 10.5);
    txt(s, "China", hx - 0.45, hy + 0.44, 0.9, 0.26, { fontSize: 10, color: C.text2, align: "center" });
    const [gx, gy] = bub("Google", 0.86, 0.83, 0.8, HEX.slate, HEX.white, 10.5);
    line(s, gx, gy - 0.95, 0, 0.5, HEX.slate, { width: 2, beginArrow: "triangle", dash: "dash" });
    txt(s, "scaling external TPU deals", gx - 2.05, gy - 0.15, 1.6, 0.3, { fontSize: 10, color: C.text2, align: "right" });
    bub("AWS", 0.41, 0.86, 0.7, HEX.slate, HEX.white, 10.5);
    const [bx, by] = bub("Custom\nASICs", 0.15, 0.76, 0.95, HEX.slate, HEX.white, 10);
    txt(s, "Broadcom → OpenAI", bx - 0.7, by + 0.5, 1.4, 0.26, { fontSize: 9.5, color: C.text2, align: "center" });
    // four-corner table
    const hdr = (t) => ({ text: t, options: { bold: true, color: HEX.white, fill: { color: HEX.navy }, fontSize: 11.5 } });
    const cell = (t, o = {}) => ({ text: t, options: Object.assign({ color: HEX.navy, fontSize: 11.5 }, o) });
    s.addTable([
      [hdr("Rival"), hdr("Objective"), hdr("Capabilities"), hdr("Likely response")],
      [cell("AMD", { bold: true }), cell("Become the open No. 2 platform"), cell("MI450 Helios racks; ROCm; OpenAI 6 GW; World Labs"), cell("Price-performance and an 'open' pitch")],
      [cell("Hyperscalers", { bold: true }), cell("Cut cost; gain bargaining power"), cell("TPU, Trainium, in-house teams, Broadcom"), cell("Dual-source; keep CHIPSET for frontier work")],
      [cell("Huawei", { bold: true }), cell("Chinese self-sufficiency"), cell("Ascend chips + CANN software; state support"), cell("Fill the gap export controls left")],
    ], {
      x: 6.5, y: 1.92, w: RX - 6.5, colW: [1.25, 1.5, 1.85, 1.633], rowH: [0.38, 0.92, 0.92, 0.82],
      fontFace: "Arial", valign: "middle", margin: [0.04, 0.07, 0.04, 0.07], border: { type: "solid", pt: 0.75, color: HEX.rule }, fill: { color: HEX.white },
      autoPage: false, objectName: "Four corners table",
    });
    label(s, "FOUR-CORNER VIEW OF RIVALS (MODULE 5)", 6.5, 1.6, 6.2);
    box(s, 6.5, 5.12, RX - 6.5, 1.18, HEX.navy, { name: "Generic strategy box" });
    txt(s, [B("Generic strategy (Module 6): ", { color: HEX.lime }), R("CHIPSET is a broad differentiator (71–75% gross margin). Its risk is buyers deciding the premium is not worth it. Answer with system economics, not lock-in.")],
      6.7, 5.12, RX - 6.9, 1.18, { fontSize: 13.5, color: C.background1, valign: "middle" });
    sources(s, "Map positions: author's qualitative judgement.  " + cite(5, 10, 11, 12, 1));
    tag(s, "Analysis");
    s.addNotes(
`COMPETITOR ANALYSIS (about 75 seconds)
Module 5 asks for objectives, assumptions, capabilities and likely responses, and Module 3 for strategic groups. The map shows how wide each rival's stack is and how widely it sells. The positions are my judgement.
Rivals attack from three directions. AMD comes from the merchant side and is moving right, adding racks and now World Labs' models; its objective is to become the open number two platform. Hyperscalers come from below, with in-house chips such as Google TPUs and AWS Trainium; their objective is cost and bargaining power, and Google is scaling external TPU deals, such as up to one million TPUs for Anthropic. Huawei holds China, the market export controls closed to NVIDIA.
Module 5's Jio case is a useful parallel. Well-funded players like hyperscalers can tolerate losses longer than incumbents assume.
On generic strategy from Module 6, CHIPSET is a broad differentiator, with a 71 to 75 percent gross margin. The textbook risk of differentiation is customers deciding the premium is not worth it. That is exactly what custom chips test. The answer is better system economics, not lock-in.
TRANSITION: So what is CHIPSET's real advantage?`);
  }

  // ---------------- S8 VRIO ----------------
  {
    const s = content("Q1 Position", "Q1 · INTERNAL ANALYSIS · VALUE CHAIN + VRIO (MODULE 4)", "The moat is the system, not the chip");
    const chain = [["Silicon", "GPU + CPU"], ["Networking", "NVLink, Mellanox"], ["Software", "CUDA-X, 7.5M devs"], ["Systems", "Rack-scale AI factories"], ["Ecosystem", "Clouds, OEMs, start-ups"]];
    const chW = 2.55, step = 2.395;
    chain.forEach(([a, b], i) => {
      const x = LM + i * step, last = i === 4;
      s.addShape(i === 0 ? SH.PENTAGON : SH.CHEVRON, { x, y: 1.66, w: chW, h: 0.82, fill: { color: last ? HEX.lime : HEX.teal }, line: { color: HEX.light, width: 1 }, objectName: oname("Value chain step") });
      txt(s, [B(a, { breakLine: true, fontSize: 14 }), R(b, { fontSize: 10.5 })], x + (i === 0 ? 0.2 : 0.45), 1.66, chW - 0.75, 0.82, { color: last ? C.text1 : C.background1, valign: "middle" });
    });
    const Y = "✓", N = "✗", P = "(✓)";
    const mark = (m) => ({ text: m, options: { align: "center", bold: true, fontSize: 14, color: m === Y ? HEX.teal : (m === N ? HEX.bronze : HEX.slate) } });
    const imp = (t, kind) => ({ text: t, options: { bold: kind !== "temp", color: kind === "sus" ? HEX.teal : (kind === "gap" ? HEX.bronze : HEX.slate), fontSize: 12 } });
    const res = (t) => ({ text: t, options: { color: HEX.navy, fontSize: 12 } });
    const hdr = (t, al) => ({ text: t, options: { bold: true, color: HEX.white, fill: { color: HEX.navy }, fontSize: 11.5, align: al || "left" } });
    s.addTable([
      [hdr("Resource or capability"), hdr("Valuable", "center"), hdr("Rare", "center"), hdr("Hard to copy", "center"), hdr("Organised", "center"), hdr("Competitive implication")],
      [res("Annual GPU architecture cadence (Blackwell → Rubin)"), mark(Y), mark(Y), mark(N), mark(Y), imp("Temporary advantage: rivals close the gap", "temp")],
      [res("CUDA software and 7.5M developers"), mark(Y), mark(Y), mark(Y), mark(Y), imp("Sustained advantage", "sus")],
      [res("Rack-scale networking (NVLink, Mellanox)"), mark(Y), mark(Y), mark(Y), mark(Y), imp("Sustained advantage", "sus")],
      [res("Priority supply (foundry, HBM; $95.2bn commitments)"), mark(Y), mark(Y), mark(N), mark(Y), imp("Temporary advantage: capacity can be bought", "temp")],
      [res("Ecosystem reach (clouds, OEMs, Hugging Face pending)"), mark(Y), mark(Y), mark(Y), mark(P), imp("Sustained only if it stays open", "sus")],
      [res("Verifiable trust and human oversight"), mark(Y), mark(Y), mark(Y), mark(N), imp("Untapped: not yet organised", "gap")],
    ], {
      x: LM, y: 2.66, w: CW, colW: [4.0, 1.05, 1.05, 1.05, 1.05, 3.933], rowH: [0.5, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42],
      fontFace: "Arial", valign: "middle", margin: [0.03, 0.1, 0.03, 0.1], border: { type: "solid", pt: 0.75, color: HEX.rule }, fill: { color: HEX.white },
      autoPage: false, objectName: "VRIO table",
    });
    takeaway(s, [B("Q1 answer: ", { color: HEX.lime }), R("customers buy a working system that millions build on, so CHIPSET must lead as a platform and ecosystem orchestrator.")], 5.9, 0.62);
    sources(s, "✓ = yes · ✗ = no · (✓) = partly. Two ✓✓✓✓ rows = sustained advantage.  " + cite(1, 17, 4, 34, 33));
    tag(s, "Analysis");
    s.addNotes(
`VRIO AND VALUE CHAIN (about 70 seconds)
This is Module 4. The chevrons are the value system. Silicon only becomes useful through networking, software, rack-scale systems and an ecosystem of clouds, manufacturers and start-ups.
Then VRIO, in the same format as the Apple and Amazon examples in Module 4. The annual chip cadence is valuable and rare but imitable, because AMD and custom chips close the gap. That is a temporary advantage. Priority supply is also temporary, because others can buy capacity. CUDA with 7.5 million developers and rack-scale networking pass all four tests. They are sustained advantages, because they are accumulated skills and integration that take years to copy.
Two rows matter for the rest of my talk. Ecosystem reach is sustained only if it stays open; that is why the Hugging Face openness pledge matters. And verifiable trust and human oversight is valuable, rare and hard to copy, but CHIPSET is not yet organised to exploit it. That is the gap my recommendation fills.
Module 1 reminds us that operational effectiveness is not strategy: a faster chip is running the same race faster, while the connected system is a different race. So my answer to Question 1: CHIPSET is strategically important because customers buy a working system that millions build on. It must lead as a platform and ecosystem orchestrator, not a component vendor.
TRANSITION: Fei-Fei Li's World Labs shows where that ecosystem battle moves next.`);
  }

  // ---------------- S9 World Labs ----------------
  pres.addSection({ title: "Spotlight World Labs" });
  {
    const s = content("Spotlight World Labs", "SPOTLIGHT · FEI-FEI LI'S WORLD LABS · COURSE LENS: MODULES 2, 3 AND 5", "World Labs shows where the next platform battle is");
    const tl = [
      ["2024", "Emerges from stealth with $230M at about a $1bn valuation to build spatially intelligent AI"],
      ["NOV 2025", "Launches Marble: editable 3D worlds. 'Chisel' lets people set the structure; AI adds the detail"],
      ["FEB 2026", "Raises $1bn. NVIDIA and AMD both invest; Autodesk puts in $200M"],
      ["SEP–NOV 2026", "AMD acquires it for about $8.2bn; Li becomes AMD EVP and Chief Scientist"],
    ];
    box(s, LM, 1.58, CW, 0.5, HEX.mint, { name: "Definition strip" });
    txt(s, [B("What is World Labs?  ", { color: HEX.teal }), R("Fei-Fei Li's AI start-up (founded 2024) building “world models”: AI that generates and simulates interactive 3D worlds for creators, robots and simulation.")], LM + 0.2, 1.58, CW - 0.4, 0.5, { fontSize: 12.5, valign: "middle" });
    line(s, 0.84, 2.38, 0, 3.15, HEX.gray, { width: 2 });
    tl.forEach(([d, t], i) => {
      const y = 2.24 + i * 0.86;
      s.addShape(SH.OVAL, { x: 0.71, y: y + 0.03, w: 0.26, h: 0.26, fill: { color: i === 3 ? HEX.bronze : HEX.teal }, line: { color: HEX.white, width: 2 }, objectName: oname("Timeline node") });
      txt(s, d, 1.15, y, 4.4, 0.3, { fontSize: 11, bold: true, color: i === 3 ? C.accent4 : C.accent1, charSpacing: 1 });
      txt(s, t, 1.15, y + 0.3, 4.45, 0.62, { fontSize: 12.5 });
    });
    const cards = [
      ["DEMAND · MODULE 2 TECHNOLOGY TREND", "The next compute wave", "AI must 'understand worlds, not just words': robotics, simulation and digital twins need far more compute.", "FaCubes", HEX.teal],
      ["COMPETITION · MODULE 5 RIVAL MOVE", "A stake is not control", "CHIPSET backed it; a rival bought it, and gains insight into how future models should shape future chips.", "FaChessKnight", HEX.bronze],
      ["RESPONSIBILITY · HUMAN-IN-THE-LOOP", "Human-centred by design", "People set intent, AI fills detail. Li argues agents are safer if they learn in simulated worlds before deployment.", "FaUserCheck", HEX.teal],
    ];
    for (let i = 0; i < 3; i++) {
      const x = 5.95, y = 2.22 + i * 1.19, w = RX - 5.95;
      box(s, x, y, w, 1.08, HEX.white, { line: HEX.rule, name: "Insight card" });
      await iconCircle(s, cards[i][3], x + 0.2, y + 0.24, 0.6, cards[i][4], HEX.white);
      label(s, cards[i][0], x + 1.0, y + 0.08, 4.5, cards[i][4] === HEX.bronze ? C.accent4 : C.accent1);
      txt(s, cards[i][1], x + 1.0, y + 0.33, w - 1.2, 0.3, { fontSize: 15, bold: true });
      txt(s, cards[i][2], x + 1.0, y + 0.63, w - 1.2, 0.43, { fontSize: 12, color: C.text2 });
    }
    takeaway(s, [B("So what: ", { color: HEX.lime }), R("win world-model builders through openness, co-design and trust. Make Cosmos and Omniverse neutral ground, not rely on ownership alone.")], 5.88, 0.62);
    sources(s, cite(13, 14, 5, 6, 15));
    tag(s, "Reported / analysis");
    s.addNotes(
`WORLD LABS SPOTLIGHT (about 80 seconds)
Fei-Fei Li created ImageNet and is the founding director of Stanford's Human-Centered AI Institute. In 2024 she launched World Labs with 230 million dollars to build spatially intelligent AI: models that understand and generate 3D worlds. In November 2025 it launched Marble, which creates editable 3D worlds. In February 2026 it raised one billion dollars, with NVIDIA and AMD both investing. In September AMD agreed to buy it for about 8.2 billion dollars, and on 16 November Li became AMD's Chief Scientist.
Three lessons for CHIPSET. Demand: as Li puts it, AI must understand worlds, not just words. Robotics, simulation and digital twins, which the case itself mentions, are the next compute wave. Competition: a minority stake is not control. CHIPSET backed World Labs, and its main merchant rival bought it, gaining insight into how future models should shape future chips. Responsibility: Marble's Chisel tool lets people set the structure while AI adds detail. That is human-in-the-loop by design. Li also argues that agents are safer if they learn in physics-aware simulated worlds before deployment.
So CHIPSET should win world-model builders through openness, co-design and trust, using its own Cosmos and Omniverse platforms as neutral ground, rather than relying on ownership.
TRANSITION: That brings us to leadership.`);
  }

  // ---------------- S10 Leadership ----------------
  pres.addSection({ title: "Q2 Leadership" });
  {
    const s = content("Q2 Leadership", "Q2 · LEADERSHIP · MODULE 1 (INCLUSIVE STRATEGY) + AMBIDEXTERITY", "Leadership must become bilingual and institutional");
    const tests = [
      ["$4.5bn", "POLICY TEST", "H20 charge after the April 2025 export rule: policy is now a P&L variable."],
      ["$11.0bn", "EXECUTION TEST", "Blackwell revenue in its launch quarter, after a yield fix: learn and ship together."],
      ["36–60", "SUCCESSION TEST", "Reported direct reports to one founder-CEO; no obvious No. 2 when he left."],
    ];
    tests.forEach(([n, l, d], i) => {
      const y = 1.68 + i * 1.33;
      box(s, LM, y, 4.55, 1.2, i === 2 ? HEX.beige : HEX.white, { line: i === 2 ? HEX.beige : HEX.rule, name: "Leadership test" });
      txt(s, n, LM + 0.18, y + 0.1, 1.55, 1.0, { fontSize: 27, bold: true, color: i === 2 ? C.accent4 : C.accent1, valign: "middle" });
      label(s, l, LM + 1.8, y + 0.14, 2.6, i === 2 ? C.accent4 : C.accent1);
      txt(s, d, LM + 1.8, y + 0.42, 2.62, 0.75, { fontSize: 12, color: C.text2 });
    });
    label(s, "THE LEADERSHIP CHIPSET NEEDS", 5.45, 1.68, 6);
    const roles = [
      ["Architect", "One coherent roadmap; protect exploration while exploiting today's products (ambidexterity).", "FaCompassDrafting"],
      ["Integrator", "Engineering, policy, finance and partners decide together, before capacity is committed.", "FaPeopleArrows"],
      ["Steward", "Distributed decision rights, a named bench, ethics review before funding, humans accountable for AI.", "FaShieldHalved"],
    ];
    for (let i = 0; i < 3; i++) {
      const y = 2.0 + i * 0.95;
      await iconCircle(s, roles[i][2], 5.45, y + 0.08, 0.6, HEX.navy, HEX.lime);
      txt(s, roles[i][0], 6.25, y + 0.02, 6.4, 0.32, { fontSize: 15, bold: true });
      txt(s, roles[i][1], 6.25, y + 0.35, 6.45, 0.55, { fontSize: 12.5, color: C.text2 });
    }
    box(s, 5.45, 4.92, RX - 5.45, 0.8, HEX.mint, { name: "Exemplar box" });
    txt(s, [B("Bilingual exemplar: Fei-Fei Li. ", { color: HEX.teal }), R("ImageNet → Stanford HAI founding director → NAIRR task force → co-led California's frontier-AI policy report → World Labs → AMD Chief Scientist. Rivals now hire this profile.")],
      5.65, 4.92, RX - 5.85, 0.8, { fontSize: 12.5, valign: "middle" });
    takeaway(s, [B("Q2 answer: ", { color: HEX.lime }), R("bilingual (technology + society) and institutional (a team and a bench, not one hero): transformational, ambidextrous, accountable.")], 5.92, 0.66);
    sources(s, cite(1, 8, 9, 16, 3, 25, 26, 27, 28, 38));
    tag(s, "Reported / analysis");
    s.addNotes(
`LEADERSHIP (about 80 seconds)
Question 2 asks what leadership can blend diverse capabilities, stakeholders and fast markets. I start with three real tests.
Policy test: the April 2025 export rule turned into a 4.5 billion dollar charge, so policy is now a profit-and-loss variable. Execution test: Blackwell needed a mask change to fix yields, and still delivered 11 billion dollars in its launch quarter. That shows learning and shipping together. Succession test: reports put the founder-CEO's direct reports at between 36 and 60, with no one-on-ones, and when he resigned there was no obvious number two. Fortune quotes a governance expert: the board owns succession.
So CHIPSET needs three leadership roles. The architect keeps one coherent roadmap while protecting exploration; that is ambidexterity, from O'Reilly and Tushman. The integrator makes engineering, policy, finance and partners decide together before capacity is committed. The steward distributes decision rights, builds a named bench and keeps humans accountable for AI outcomes.
Fei-Fei Li is the bilingual exemplar: a scientist who moved into policy, entrepreneurship and now a chip company. Rivals are hiring this profile.
My answer: visionary but distributed leadership. A team, not a hero.
TRANSITION: Leadership needs a structure that supports it.`);
  }

  // ---------------- S11 Org options ----------------
  pres.addSection({ title: "Q3 Structure" });
  {
    const s = content("Q3 Structure", "Q3 · ORGANIZATIONAL DESIGN · OPTIONS SCORED (MODULE 4 WEIGHTING)", "A hybrid design best fits what CHIPSET now needs");
    const hdr = (t, al) => ({ text: t, options: { bold: true, color: HEX.white, fill: { color: HEX.navy }, fontSize: 11.5, align: al || "center" } });
    const crit = (t) => ({ text: t, options: { color: HEX.navy, fontSize: 12.5 } });
    const sc = (v, hyb) => ({ text: String(v), options: { align: "center", fontSize: 14, bold: hyb, color: hyb ? HEX.teal : HEX.navy, fill: { color: hyb ? HEX.mint : HEX.white } } });
    const data = [
      ["Technical coherence and speed (25%)", 5, 2, 4],
      ["Customer and solution intimacy (20%)", 2, 5, 4],
      ["Trust, risk and compliance (20%)", 2, 3, 5],
      ["Leadership bench and succession (20%)", 1, 4, 4],
      ["Ecosystem neutrality (15%)", 3, 3, 4],
    ];
    const rows = [[hdr("Criterion (weight = importance now)", "left"), hdr("Engineering-led, centralized"), hdr("Platform / solution divisions"), hdr("Hybrid (recommended)")]];
    data.forEach((r) => rows.push([crit(r[0]), sc(r[1]), sc(r[2]), sc(r[3], true)]));
    rows.push([
      { text: "Weighted score (out of 5)", options: { bold: true, color: HEX.navy, fontSize: 12.5, fill: { color: HEX.tint } } },
      { text: "2.70", options: { bold: true, align: "center", fontSize: 14, color: HEX.navy, fill: { color: HEX.tint } } },
      { text: "3.35", options: { bold: true, align: "center", fontSize: 14, color: HEX.navy, fill: { color: HEX.tint } } },
      { text: "4.20", options: { bold: true, align: "center", fontSize: 14, color: HEX.teal, fill: { color: HEX.mint } } },
    ]);
    s.addTable(rows, {
      x: LM, y: 1.65, w: 7.95, colW: [3.45, 1.5, 1.5, 1.5], rowH: [0.6, 0.45, 0.45, 0.45, 0.45, 0.45, 0.48],
      fontFace: "Arial", valign: "middle", margin: [0.03, 0.08, 0.03, 0.08], border: { type: "solid", pt: 0.75, color: HEX.rule }, fill: { color: HEX.white },
      autoPage: false, objectName: "Decision matrix",
    });
    label(s, "FIT SCORE: 1 = POOR, 5 = STRONG", 8.9, 1.65, 3.8);
    s.addChart(pres.charts.BAR, [
      { name: "Alternatives", labels: ["Centralized", "Divisions", "Hybrid"], values: [2.7, 3.35, 0] },
      { name: "Recommended", labels: ["Centralized", "Divisions", "Hybrid"], values: [0, 0, 4.2] },
    ], Object.assign({}, chartBase, {
      x: 8.8, y: 1.95, w: RX - 8.8, h: 2.95, barDir: "col", barGrouping: "stacked", barGapWidthPct: 55,
      chartColors: [HEX.gray, HEX.chartTeal], showValue: true, dataLabelPosition: "inEnd", dataLabelColor: HEX.navy, dataLabelFormatCode: "0.00;;;",
      showLegend: false, valAxisMaxVal: 5, valAxisMinVal: 0, valAxisMajorUnit: 1, objectName: "Score chart",
    }));
    box(s, LM, 5.22, CW, 0.52, HEX.beige, { name: "Evidence strip" });
    txt(s, [B("Today: ", { color: HEX.bronze }), R("flat and engineering-led. 31,000 of 42,000 staff in R&D; 36–60 direct reports to the CEO; interim CEO since 12 Nov 2026.")], LM + 0.2, 5.22, CW - 0.4, 0.52, { fontSize: 13, valign: "middle" });
    takeaway(s, [B("Q3 answer: ", { color: HEX.lime }), R("a hybrid. Centralize the platform core, decentralize customer solutions, make assurance independent.")], 5.95, 0.6);
    sources(s, "Scores: author's weighted judgement (1–5), in the EFAS/IFAS style of Module 4.  " + cite(1, 3, 16));
    tag(s, "Analysis");
    s.addNotes(
`ORGANIZATION OPTIONS (about 70 seconds)
Question 3 offers three choices, so I scored them on five weighted criteria, using the weighting logic of the EFAS and IFAS tables in Module 4. The scores are my judgement, but the logic is transparent.
The centralized, engineering-led model wins on technical coherence and speed, which is NVIDIA's historic strength. But it scores lowest on succession, and the last week proved that risk real. Separate solution divisions are closest to customers but risk duplicated platforms and inconsistent safeguards.
The hybrid keeps one engineering core, so coherence stays high, and adds solution units and independent assurance. It scores 4.2 out of 5, against 3.35 and 2.70.
For evidence, look at the beige strip. Today the organisation is flat and engineering-led: 31,000 of 42,000 staff work in R&D, and the CEO reportedly had 36 to 60 direct reports. Earlier this year he reportedly said the next CEO would have to reshape the company. That moment has arrived.
So: centralize the platform core, decentralize customer solutions, and make assurance independent.
TRANSITION: Here is what that structure looks like.`);
  }

  // ---------------- S12 Proposed structure ----------------
  {
    const s = content("Q3 Structure", "Q3 · PROPOSED STRUCTURE · GALBRAITH STAR MODEL", "Shared core, solution teams, independent stop right");
    const node = (t, x, y, w, h, fill, tc = C.background1, fs = 12.5, bold = true) => {
      box(s, x, y, w, h, fill, { name: "Org box" });
      txt(s, t, x + 0.1, y, w - 0.2, h, { fontSize: fs, bold, color: tc, align: "center", valign: "middle" });
    };
    node("Board · independent Chair", 4.42, 1.62, 4.5, 0.48, HEX.navy);
    node("Risk & Responsible-AI Committee", 9.6, 1.62, RX - 9.6, 0.48, HEX.bronze, C.background1, 12);
    line(s, 8.92, 1.86, 0.68, 0, HEX.slate, { width: 1.5 });
    line(s, 6.67, 2.1, 0, 0.3, HEX.slate, { width: 1.5 });
    node("CEO + executive team · named successor for every role", 3.67, 2.4, 6.0, 0.5, HEX.navy, C.background1, 12.5);
    // three units + assurance
    const units = [
      ["PLATFORM CORE", "Silicon · networking · CUDA · systems", LM],
      ["SOLUTION UNITS", "Cloud + AI factories · sovereign + enterprise · physical AI + robotics", 3.68],
      ["ECOSYSTEM OFFICE", "Developers · start-ups · open source · research", 6.76],
    ];
    line(s, 2.08, 3.12, 6.16, 0, HEX.slate, { width: 1.5 });
    line(s, 6.67, 2.9, 0, 0.22, HEX.slate, { width: 1.5 });
    units.forEach(([a, b, x]) => {
      line(s, x + 1.48, 3.12, 0, 0.22, HEX.slate, { width: 1.5 });
      box(s, x, 3.34, 2.96, 1.3, HEX.teal, { name: "Unit box" });
      txt(s, [B(a, { breakLine: true, fontSize: 13, charSpacing: 1 }), R(b, { fontSize: 12 })], x + 0.15, 3.34, 2.66, 1.3, { color: C.background1, align: "center", valign: "middle" });
    });
    box(s, 9.95, 3.34, RX - 9.95, 1.3, HEX.bronze, { name: "Assurance box" });
    txt(s, [B("INDEPENDENT ASSURANCE", { breakLine: true, fontSize: 13, charSpacing: 1 }), R("Law · safety · security · energy. Can hold a release.", { fontSize: 12 })], 10.05, 3.34, RX - 10.15, 1.3, { color: C.background1, align: "center", valign: "middle" });
    line(s, 11.34, 2.1, 0, 1.24, HEX.bronze, { width: 1.5, dash: "dash", arrow: "triangle", beginArrow: "triangle" });
    txt(s, "Inside every unit: human review → appeal → joint incident learning", LM, 4.72, 6.0, 0.3, { fontSize: 11.5, italic: true, color: C.text2 });
    const legend = [[HEX.navy, "Governance", 6.7, 0.9], [HEX.teal, "Business unit", 7.92, 1.05], [HEX.bronze, "Assurance", 9.27, 0.85]];
    legend.forEach(([f, t, lx, tw]) => {
      s.addShape(SH.ROUNDED_RECTANGLE, { x: lx, y: 4.77, w: 0.2, h: 0.2, rectRadius: 0.03, fill: { color: f }, line: { color: f }, objectName: oname("Legend swatch") });
      txt(s, t, lx + 0.27, 4.72, tw, 0.3, { fontSize: 10.5, color: C.text2, valign: "middle" });
    });
    line(s, 10.45, 4.87, 0.32, 0, HEX.bronze, { width: 1.5, dash: "dash" });
    txt(s, "can stop a release", 10.82, 4.72, 1.6, 0.3, { fontSize: 10.5, color: C.text2, valign: "middle" });
    // Star model chips
    label(s, "GALBRAITH STAR MODEL: ALIGN ALL FIVE", LM, 5.05, 8);
    const star = [["STRATEGY", "Platform + trust"], ["STRUCTURE", "Hybrid, explicit rights"], ["PROCESSES", "Joint release gates"], ["REWARDS", "Shared outcomes"], ["PEOPLE", "Bilingual talent, rotations"]];
    const sw = (CW - 4 * 0.15) / 5;
    star.forEach(([a, b], i) => {
      const x = LM + i * (sw + 0.15);
      box(s, x, 5.33, sw, 0.6, HEX.white, { line: HEX.rule, name: "Star chip" });
      txt(s, [B(a + "  ", { color: HEX.teal, fontSize: 10.5, charSpacing: 1 }), R(b, { fontSize: 12 })], x + 0.12, 5.33, sw - 0.24, 0.6, { valign: "middle", align: "center" });
    });
    takeaway(s, [B("Pilot in physical AI first. "), R("Scale only if release delays, rework and incidents fall.")], 6.13, 0.52);
    sources(s, cite(3, 37));
    tag(s, "Proposed design");
    s.addNotes(
`PROPOSED STRUCTURE (about 75 seconds)
Read it from the top. NVIDIA has just appointed its first board Chair, separate from the CEO role; I recommend keeping that Chair independent. I add a Risk and Responsible-AI Committee. The CEO and executive team carry one new rule: a named successor for every role, so the bench problem cannot recur.
Underneath are three units. The platform core keeps silicon, networking, CUDA and systems centralized, because that coherence is the sustained advantage from the VRIO slide. Solution units own customer outcomes in cloud and AI factories, sovereign and enterprise AI, and physical AI and robotics. The ecosystem office looks after developers, start-ups, open source including Hugging Face, and research.
Independent assurance, in bronze, covers law, safety, security and energy. It reports to the board committee, not to sales, and it can hold a release for unresolved legal or serious safety issues.
A chart alone does not change behaviour, so Galbraith's Star Model aligns strategy, structure, processes, rewards and people: joint release gates, rewards for shared outcomes rather than shipments, and rotations that build bilingual talent.
Pilot this in physical AI first, and scale only if delays, rework and incidents fall.
TRANSITION: What does the human oversight inside this structure look like?`);
  }

  // ---------------- S13 HITL ----------------
  {
    const s = content("Q3 Structure", "Q3 + Q4 · HUMAN-IN-THE-LOOP (HITL) · LINKED TO MODULE 2 (LEGAL) AND MODULE 4 (VRIO)", "Human oversight needs authority, not just presence");
    const tiers = [
      ["TIER 3 · HIGH CONSEQUENCE", "Human-in-command", "Physical AI, biometrics, critical infrastructure: human approval before action, simulation sign-off, a stop button.", HEX.navy, C.background1, HEX.lime],
      ["TIER 2 · MATERIAL", "Human-in-the-loop", "Decisions about people: review flagged or uncertain cases, override, appeal.", HEX.teal, C.background1, HEX.white],
      ["TIER 1 · LOW RISK", "Human-on-the-loop", "Drafts, code, internal tools: monitor, sample, roll back.", HEX.tint2, C.text1, HEX.teal],
    ];
    box(s, LM, 1.58, CW, 0.46, HEX.mint, { name: "Definition strip" });
    txt(s, [B("HITL  ", { color: HEX.teal }), R("= a person can review, override or stop an AI decision. The higher the consequence, the more authority that person needs.")], LM + 0.2, 1.58, CW - 0.4, 0.46, { fontSize: 12.5, valign: "middle" });
    tiers.forEach(([l, h, d, f, tc, lc], i) => {
      const y = 2.14 + i * 1.24, x = LM + i * 0.3, w = 6.1 - i * 0.3;
      box(s, x, y, w, 1.14, f, { name: "Oversight tier" });
      txt(s, l, x + 0.22, y + 0.08, w - 0.4, 0.26, { fontSize: 10.5, bold: true, color: lc === HEX.white ? C.background1 : (lc === HEX.lime ? C.accent2 : C.accent1), charSpacing: 1 });
      txt(s, h, x + 0.22, y + 0.33, w - 0.4, 0.32, { fontSize: 16, bold: true, color: tc });
      txt(s, d, x + 0.22, y + 0.65, w - 0.4, 0.46, { fontSize: 12, color: tc });
    });
    const rx = 7.0, rw = RX - 7.0;
    box(s, rx, 2.14, rw, 1.14, HEX.beige, { name: "Lesson card" });
    label(s, "REAL FAILURE · FTC v. RITE AID, 2023–24", rx + 0.2, 2.2, rw - 0.4, C.accent4);
    txt(s, "The FTC alleged staff acted on false facial-recognition matches; a 2024 order imposed a five-year ban. A human without context, training or authority is a rubber stamp.", rx + 0.2, 2.47, rw - 0.4, 0.78, { fontSize: 12 });
    box(s, rx, 3.38, rw, 0.8, HEX.mint, { name: "Legal card" });
    label(s, "LEGAL ANCHOR · EU AI ACT, ARTICLE 14", rx + 0.2, 3.43, rw - 0.4);
    txt(s, "Overseers of high-risk AI must be able to understand, override and stop the system.", rx + 0.2, 3.7, rw - 0.4, 0.45, { fontSize: 12 });
    box(s, rx, 4.28, rw, 1.48, HEX.white, { line: HEX.rule, name: "KPI card" });
    label(s, "IS OVERSIGHT WORKING? KEY INDICATORS", rx + 0.2, 4.33, rw - 0.4);
    const k = ["Override rate", "Appeal reversals", "Reviewer load and time per case", "Issues caught in simulation vs. in the field", "Time to roll back"];
    txt(s, k.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < k.length - 1 } })), rx + 0.2, 4.6, rw - 0.4, 1.12, { fontSize: 12, paraSpaceAfter: 1 });
    takeaway(s, [B("Proportionate oversight: "), R("not every output needs a human, but every high-consequence decision needs an accountable one.")], 5.95, 0.6);
    sources(s, cite(30, 22, 31, 26));
    tag(s, "Proposed design");
    s.addNotes(
`HUMAN-IN-THE-LOOP (about 75 seconds)
You asked whether human-in-the-loop applies here. It does, but only if the human has authority, not just presence.
I propose three tiers, matched to consequence. Tier 1, low risk, such as code or drafts: human-on-the-loop, meaning monitor, sample and roll back. Tier 2, decisions about people: human-in-the-loop, with review of flagged or uncertain cases, override and appeal. Tier 3, high consequence, such as physical AI, biometrics or critical infrastructure: human-in-command, with approval before action, simulation sign-off and a stop button.
Why the emphasis on authority? Rite Aid. The FTC alleged that staff acted on false facial-recognition matches, and the 2024 order imposed a five-year ban. Humans were in the loop, but without context, training or authority they became a rubber stamp. That is a downstream retailer case, not an allegation against NVIDIA.
The legal anchor is Article 14 of the EU AI Act: people overseeing high-risk AI must be able to understand, override and stop the system.
And we measure whether oversight works: override rates, appeal reversals, reviewer workload, what simulation catches versus the field, and time to roll back.
TRANSITION: Now Question 4, co-creating value with partners.`);
  }

  // ---------------- S14 Co-creation ----------------
  pres.addSection({ title: "Q4 Co-creation" });
  {
    const s = content("Q4 Co-creation", "Q4 · CO-CREATING VALUE · KEYSTONE STRATEGY (IANSITI & LEVIEN)", "Act as the keystone: create value partners can share");
    box(s, LM, 1.58, CW, 0.46, HEX.mint, { name: "Definition strip" });
    txt(s, [B("Keystone  ", { color: HEX.teal }), R("= a platform that keeps its ecosystem healthy by sharing value.   "), B("Dominator  ", { color: HEX.bronze }), R("= one that extracts value until partners leave.")], LM + 0.2, 1.58, CW - 0.4, 0.46, { fontSize: 12.5, valign: "middle" });
    const cx = 6.667, cy = 3.77, d = 1.6;
    const partners = [
      ["Foundries + memory", "Joint capacity and packaging roadmaps", "Secure supply", "FaIndustry"],
      ["Clouds + AI factories", "Reference designs; mixed fleets", "Repeat workloads", "FaCloud"],
      ["Developers + open source", "Open tools and models; Hugging Face kept open", "Ecosystem loyalty", "FaCode"],
      ["Enterprises + sovereigns", "Industry blueprints; local AI factories", "Diversified demand", "FaBuildingColumns"],
      ["Model + world-model builders", "Co-design, compute credits, Cosmos and Omniverse", "Early view of workloads", "FaCubes"],
      ["Research + communities", "Public-interest compute (NAIRR); independent evaluation", "Legitimacy and talent", "FaFlask"],
    ];
    const cw2 = 4.62, ch = 1.02;
    for (let i = 0; i < 6; i++) {
      const left = i < 3, row = i % 3;
      const x = left ? LM : RX - cw2, y = 2.14 + row * 1.12;
      { // connector from the card's inner edge to the hub's rim
        const ax = left ? x + cw2 : x, ay = y + ch / 2;
        const ang = Math.atan2(ay - cy, ax - cx), rx = cx + (d / 2) * Math.cos(ang), ry = cy + (d / 2) * Math.sin(ang);
        connect(s, ax, ay, rx, ry, HEX.gray, { width: 1.25 });
      }
      box(s, x, y, cw2, ch, HEX.white, { line: HEX.rule, name: "Partner card" });
      await iconCircle(s, partners[i][3], x + 0.15, y + 0.2, 0.55, HEX.teal, HEX.white);
      txt(s, partners[i][0], x + 0.85, y + 0.05, cw2 - 1.0, 0.3, { fontSize: 13.5, bold: true });
      txt(s, partners[i][1], x + 0.85, y + 0.33, cw2 - 1.0, 0.4, { fontSize: 11.5, color: C.text2 });
      txt(s, [B("CHIPSET gains: ", { color: HEX.teal }), R(partners[i][2])], x + 0.85, y + 0.72, cw2 - 1.0, 0.27, { fontSize: 11.5 });
    }
    s.addShape(SH.OVAL, { x: cx - d / 2, y: cy - d / 2, w: d, h: d, fill: { color: HEX.navy }, line: { color: HEX.white, width: 3 }, objectName: "Hub" });
    txt(s, [B("CHIPSET", { breakLine: true, fontSize: 16 }), R("platform", { fontSize: 13 })], cx - d / 2, cy - d / 2, d, d, { color: C.background1, align: "center", valign: "middle" });
    const lw = (CW - 0.2) / 2;
    box(s, LM, 5.52, lw, 0.52, HEX.beige, { name: "Dominator lesson" });
    txt(s, [B("Dominator move: ", { color: HEX.bronze }), R("the Arm acquisition was abandoned amid regulatory challenges (2022).")], LM + 0.18, 5.52, lw - 0.3, 0.52, { fontSize: 12, valign: "middle" });
    box(s, LM + lw + 0.2, 5.52, lw, 0.52, HEX.mint, { name: "Keystone lesson" });
    txt(s, [B("Keystone move: ", { color: HEX.teal }), R("Hugging Face stays open; NVIDIA compute not required (2026).")], LM + lw + 0.38, 5.52, lw - 0.3, 0.52, { fontSize: 12, valign: "middle" });
    takeaway(s, [B("Q4 answer: ", { color: HEX.lime }), R("co-create as a keystone: open tools, shared value, success measured by partners' gains.")], 6.16, 0.54);
    sources(s, cite(18, 4, 29, 27, 39));
    tag(s, "Analysis / proposal");
    s.addNotes(
`CO-CREATION (about 75 seconds)
Iansiti and Levien's 'Strategy as Ecology' distinguishes keystones, which create value and share it so the ecosystem stays healthy, from dominators, which extract value until partners leave. CHIPSET must be a keystone.
Each partner group gets a real exchange. Foundries and memory makers get joint capacity and packaging roadmaps; CHIPSET gets secure supply. Clouds get reference designs that work in mixed fleets; CHIPSET earns repeat workloads. Developers get open tools and models, and Hugging Face kept open; CHIPSET earns loyalty. Enterprises and governments get industry blueprints and local AI factories; CHIPSET diversifies demand away from a few hyperscalers. Model and world-model builders get co-design, compute credits and the Cosmos and Omniverse platforms; CHIPSET sees future workloads early, the lesson of World Labs. Researchers and communities get public-interest compute, as in the NAIRR pilot, which Fei-Fei Li helped design as a task-force member; CHIPSET earns legitimacy and talent.
The evidence: the Arm deal, a dominator-style move, was abandoned amid regulatory challenges. The Hugging Face pledge, that NVIDIA compute is not required, is a keystone move.
So measure co-creation by the value partners create, not just CHIPSET's share.
TRANSITION: Now my out-of-the-box proposal.`);
  }

  // ---------------- S15 Simulate before deploy ----------------
  {
    const s = content("Q4 Co-creation", "Q4 + Q5 · OUT-OF-THE-BOX PROPOSAL · BLUE OCEAN FOUR ACTIONS (MODULE 6)", "Make trust a product: simulate before you deploy");
    const steps = [
      ["1", "Define", "Purpose, limits and a customer trust record"],
      ["2", "Simulate", "World models and digital twins stress-test rare scenarios"],
      ["3", "Sign off", "An accountable human approves; assurance can stop"],
      ["4", "Deploy", "With the right oversight tier"],
      ["5", "Learn", "Field incidents become new test scenarios"],
    ];
    const sw = 1.32, sg = 0.19, sy = 1.95, sh = 2.25;
    steps.forEach(([n, a, b], i) => {
      const x = LM + i * (sw + sg);
      box(s, x, sy, sw, sh, i === 2 ? HEX.navy : HEX.teal, { name: "Loop step" });
      s.addShape(SH.OVAL, { x: x + sw / 2 - 0.25, y: sy - 0.27, w: 0.5, h: 0.5, fill: { color: HEX.lime }, line: { color: HEX.light, width: 2 }, objectName: oname("Step number") });
      txt(s, n, x + sw / 2 - 0.25, sy - 0.27, 0.5, 0.5, { fontSize: 14, bold: true, align: "center", valign: "middle" });
      txt(s, a, x + 0.1, sy + 0.35, sw - 0.2, 0.35, { fontSize: 15, bold: true, color: C.background1, align: "center" });
      txt(s, b, x + 0.12, sy + 0.78, sw - 0.24, 1.4, { fontSize: 12, color: C.background1, align: "center" });
      if (i < 4) line(s, x + sw + 0.02, sy + sh / 2, sg - 0.04, 0, HEX.slate, { width: 1.5, arrow: "triangle" });
    });
    // feedback loop: from step 5 back to step 2
    const x5 = LM + 4 * (sw + sg) + sw / 2, x2 = LM + 1 * (sw + sg) + sw / 2, by = sy + sh + 0.3;
    line(s, x5, sy + sh, 0, 0.3, HEX.teal, { width: 2, dash: "dash" });
    line(s, x2, by, x5 - x2, 0, HEX.teal, { width: 2, dash: "dash" });
    line(s, x2, sy + sh, 0, 0.3, HEX.teal, { width: 2, dash: "dash", beginArrow: "triangle" });
    txt(s, "Learning loop: real incidents feed the simulation library", x2 + 0.1, by + 0.05, x5 - x2 - 0.2, 0.3, { fontSize: 10.5, italic: true, color: C.text2, align: "center" });
    txt(s, [B("World model ", { color: HEX.teal }), R("= AI that simulates a physical 3D world.  "), B("Digital twin ", { color: HEX.teal }), R("= a virtual copy of a real factory, robot or network.  Builds on Fei-Fei Li's argument that agents trained in simulated worlds are safer to deploy.")], LM, 4.95, 7.35, 0.75, { fontSize: 12, color: C.text2 });
    // ERRC grid
    const gx = 8.25, gw2 = (RX - gx - 0.14) / 2, gh = 1.62;
    label(s, "BLUE OCEAN · FOUR ACTIONS (ERRC)", gx, 1.66, 4.5);
    const errc = [
      ["ELIMINATE", "Unverifiable safety and performance claims", HEX.beige, C.accent4],
      ["REDUCE", "One-off audits and bespoke integration work", HEX.beige, C.accent4],
      ["RAISE", "Openness, interoperability and evidence quality", HEX.mint, C.accent1],
      ["CREATE", "Simulation-based assurance and a portable trust record", HEX.lime, C.text1],
    ];
    errc.forEach(([a, b, f, lc], i) => {
      const x = gx + (i % 2) * (gw2 + 0.14), y = 1.98 + Math.floor(i / 2) * (gh + 0.14);
      box(s, x, y, gw2, gh, f, { name: "ERRC cell" });
      label(s, a, x + 0.15, y + 0.14, gw2 - 0.3, lc);
      txt(s, b, x + 0.15, y + 0.45, gw2 - 0.3, 1.1, { fontSize: 13 });
    });
    takeaway(s, [B("Value innovation: ", { color: HEX.lime }), R("lower assurance costs for customers and new switching value for CHIPSET, without closed lock-in.")], 5.85, 0.62);
    sources(s, cite(15, 2, 36, 31, 22));
    tag(s, "Proposed design");
    s.addNotes(
`SIMULATE BEFORE YOU DEPLOY (about 80 seconds)
This is my out-of-the-box proposal, and it ties World Labs, human-in-the-loop and co-creation together.
As AI moves from screens into robots, vehicles and factories, mistakes become physical. So before deployment, every high-consequence system goes through a loop. One: define the purpose, the limits and a customer trust record, the idea from my report. Two: simulate. World models and digital twins stress-test rare and dangerous scenarios that cannot be tested safely in the real world. Three: an accountable human signs off on scenario coverage, and independent assurance can stop the release. Four: deploy with the right oversight tier. Five: learn. Every field incident becomes a new test scenario, so the library improves over time.
This builds on Fei-Fei Li's argument that agents which learn in physics-aware simulated worlds are safer, and on CHIPSET's own Cosmos and Omniverse tools, which NVIDIA expanded again this quarter.
Using Blue Ocean's four actions from Module 6: eliminate unverifiable claims, reduce one-off audits and bespoke integration, raise openness and evidence quality, and create simulation-based assurance. That is value innovation: customers pay less for assurance, and CHIPSET gains switching value without closed lock-in.
TRANSITION: How do we turn all this into priorities?`);
  }

  // ---------------- S16 TOWS ----------------
  pres.addSection({ title: "Q5 Priorities" });
  {
    const s = content("Q5 Priorities", "Q5 · FROM SWOT TO STRATEGY · TOWS MATRIX (MODULE 4)", "TOWS turns the analysis into five priorities");
    const x0 = LM, y0 = 1.65, c0 = 3.35, cw3 = (CW - c0 - 0.2) / 2, r0 = 1.0, rh = 1.42, g = 0.1;
    // headers
    box(s, x0, y0, c0, r0, HEX.white, { line: HEX.rule, name: "Corner" });
    txt(s, [B("TOWS MATRIX", { breakLine: true, color: HEX.teal, fontSize: 12, charSpacing: 1 }), R("Pair internal and external factors to generate options", { fontSize: 12, color: HEX.slate })], x0 + 0.18, y0, c0 - 0.3, r0, { valign: "middle" });
    const head = [
      ["STRENGTHS", "Full-stack system · 7.5M developers · 71–75% margins", HEX.teal],
      ["WEAKNESSES", "Two customers = 36% of revenue · foundry and HBM dependence · founder-centric org", HEX.bronze],
    ];
    head.forEach(([a, b, f], i) => {
      const x = x0 + c0 + g + i * (cw3 + g);
      box(s, x, y0, cw3, r0, f, { name: "Internal header" });
      txt(s, [B(a, { breakLine: true, fontSize: 12, charSpacing: 1 }), R(b, { fontSize: 12 })], x + 0.18, y0, cw3 - 0.3, r0, { color: C.background1, valign: "middle" });
    });
    const side = [
      ["OPPORTUNITIES", "Inference and AI agents · physical AI and world models · sovereign AI", HEX.mint],
      ["THREATS", "Custom chips and AMD · export controls · energy limits and AI rules", HEX.beige],
    ];
    side.forEach(([a, b, f], j) => {
      const y = y0 + r0 + g + j * (rh + g);
      box(s, x0, y, c0, rh, f, { name: "External header" });
      txt(s, [B(a, { breakLine: true, fontSize: 12, charSpacing: 1, color: j === 0 ? HEX.teal : HEX.bronze }), R(b, { fontSize: 12.5 })], x0 + 0.18, y, c0 - 0.3, rh, { valign: "middle" });
    });
    const cells = [
      ["SO · USE STRENGTHS TO SEIZE", [["P1", "Win inference economics"], ["P2", "Lead physical AI with open world-model partners"]]],
      ["WO · FIX WEAKNESSES THROUGH", [["P3", "Diversify demand: sovereign, enterprise, edge"]]],
      ["ST · USE STRENGTHS TO DEFEND", [["P5", "Make trust a product: simulation assurance + HITL"]]],
      ["WT · MINIMISE AND AVOID", [["P4", "Build resilience: dual sourcing, policy scenarios, leadership bench"]]],
    ];
    cells.forEach(([lab, items], k) => {
      const i = k % 2, j = Math.floor(k / 2);
      const x = x0 + c0 + g + i * (cw3 + g), y = y0 + r0 + g + j * (rh + g);
      box(s, x, y, cw3, rh, HEX.white, { line: HEX.rule, name: "TOWS cell" });
      label(s, lab, x + 0.18, y + 0.12, cw3 - 0.3, C.text2);
      items.forEach(([p, t], m) => {
        const yy = y + 0.44 + m * 0.47;
        s.addShape(SH.OVAL, { x: x + 0.18, y: yy, w: 0.4, h: 0.4, fill: { color: HEX.navy }, line: { color: HEX.navy }, objectName: oname("Priority chip") });
        txt(s, p, x + 0.18, yy, 0.4, 0.4, { fontSize: 11, bold: true, color: C.background1, align: "center", valign: "middle" });
        txt(s, t, x + 0.7, yy - 0.04, cw3 - 0.92, 0.48, { fontSize: 13.5, bold: true, valign: "middle" });
      });
    });
    takeaway(s, [B("How to read: ", { color: HEX.lime }), R("each priority (P1–P5, measured on the next slide) uses a strength or fixes a weakness against a named opportunity or threat.")], 5.88, 0.6);
    sources(s, cite(35, 1));
    tag(s, "Analysis");
    s.addNotes(
`TOWS (about 60 seconds)
Module 4 says SWOT is diagnostic and TOWS is prescriptive, so I convert the analysis into choices.
Strengths: the full-stack system, 7.5 million developers and 71 to 75 percent margins. Weaknesses: two customers equal 36 percent of revenue, dependence on foundry and memory partners, and a founder-centric organisation. Opportunities: inference and AI agents, physical AI and world models, and sovereign AI. Threats: custom chips and AMD, export controls, and energy limits and AI rules.
Strengths with opportunities give priority 1, win inference economics, and priority 2, lead physical AI with open world-model partners. Weaknesses with opportunities give priority 3, diversify demand through sovereign, enterprise and edge customers. Strengths against threats give priority 5, make trust a product, which turns the full stack into a defence against substitution and regulation. Weaknesses against threats give priority 4, build resilience: dual sourcing, policy scenarios and a leadership bench.
So each priority uses a strength or fixes a weakness against a named opportunity or threat.
TRANSITION: And each priority needs an indicator.`);
  }

  // ---------------- S17 KPI dashboard ----------------
  {
    const s = content("Q5 Priorities", "Q5 · PRIORITIES 2027–2031 · KEY INDICATORS", "Five priorities, each with a measurable indicator");
    const hz = [["YEAR 1 · ESTABLISH", "Pilot the hybrid and trust record in physical AI"], ["YEARS 2–3 · SCALE", "Sovereign, enterprise and physical-AI solutions"], ["YEARS 4–5 · RENEW", "Next architectures; stop what fails"]];
    const hw = (CW - 0.3) / 3;
    hz.forEach(([a, b], i) => {
      const x = LM + i * (hw + 0.15);
      s.addShape(i === 0 ? SH.PENTAGON : SH.CHEVRON, { x, y: 1.62, w: hw + (i < 2 ? 0.12 : 0), h: 0.72, fill: { color: [HEX.teal, HEX.deepTeal, HEX.navy][i] }, line: { color: HEX.light, width: 1 }, objectName: oname("Horizon") });
      txt(s, [B(a, { breakLine: true, fontSize: 11.5, charSpacing: 1, color: HEX.lime }), R(b, { fontSize: 12 })], x + (i === 0 ? 0.2 : 0.42), 1.62, hw - 0.6, 0.72, { color: C.background1, valign: "middle" });
    });
    const hdr = (t) => ({ text: t, options: { bold: true, color: HEX.white, fill: { color: HEX.navy }, fontSize: 12 } });
    const p = (n, t) => ({ text: [{ text: n + "  ", options: { bold: true, color: HEX.teal } }, { text: t, options: { bold: true, color: HEX.navy } }], options: { fontSize: 12.5 } });
    const c = (t, o = {}) => ({ text: t, options: Object.assign({ color: HEX.navy, fontSize: 12 }, o) });
    s.addTable([
      [hdr("Priority"), hdr("Key indicator"), hdr("Baseline"), hdr("Direction (↑ rise, ↓ fall)")],
      [p("P1", "Win inference economics"), c("Cost and energy per accepted task"), c("Set in Year 1", { color: HEX.slate }), c("↓ every generation", { bold: true, color: HEX.teal })],
      [p("P2", "Lead physical AI with open partners"), c("World-model and robotics builders on the stack; physical-AI revenue"), c("Not disclosed today", { color: HEX.slate }), c("↑ and reported separately", { bold: true, color: HEX.teal })],
      [p("P3", "Diversify demand"), c("Largest direct customer's share of revenue"), c("22% (FY2026)"), c("↓ below 15% (proposed)", { bold: true, color: HEX.teal })],
      [p("P4", "Build resilience"), c("Critical inputs dual-sourced; successors named for top roles"), c("$95.2bn obligations; interim CEO"), c("100% of critical inputs and roles covered", { bold: true, color: HEX.teal })],
      [p("P5", "Make trust a product"), c("Tier 3 deployments with a trust record and an accountable human"), c("Not reported", { color: HEX.slate }), c("100% in pilot scope, then all Tier 3", { bold: true, color: HEX.teal })],
    ], {
      x: LM, y: 2.46, w: CW, colW: [3.35, 3.85, 2.45, 2.483], rowH: [0.4, 0.57, 0.57, 0.57, 0.57, 0.57],
      fontFace: "Arial", valign: "middle", margin: [0.03, 0.1, 0.03, 0.1], border: { type: "solid", pt: 0.75, color: HEX.rule }, fill: { color: HEX.white },
      autoPage: false, objectName: "KPI dashboard",
    });
    takeaway(s, [B("Q5 answer: ", { color: HEX.lime }), R("five priorities, one indicator each. Pause, redesign or stop anything whose indicator does not improve.")], 5.92, 0.6);
    sources(s, cite(1, 2, 3));
    tag(s, "Targets are proposals, not forecasts");
    s.addNotes(
`PRIORITIES AND KEY INDICATORS (about 75 seconds)
Here are the five priorities for the next three to five years, each with one indicator a board could track.
P1, win inference economics. Inference is where usage grows, so the indicator is cost and energy per accepted task, meaning output that meets the customer's quality and safety bar. The baseline is set in year one, and it should fall with every generation.
P2, lead physical AI with open partners. The indicator is the number of world-model and robotics builders on the stack, plus physical-AI revenue, which is not disclosed separately today.
P3, diversify demand. The largest direct customer was 22 percent of revenue in FY2026. I propose bringing that below 15 percent through sovereign, enterprise and edge customers.
P4, build resilience: dual-source critical inputs and name successors for top roles. The baselines are 95.2 billion dollars of obligations and an interim CEO.
P5, make trust a product: every tier-3 deployment carries a trust record and an accountable human, starting with the pilot.
The phasing is establish, scale, renew. The targets are proposals for discussion, not forecasts, and anything whose indicators do not improve is paused, redesigned or stopped.
TRANSITION: Let me close.`);
  }

  // ---------------- S18 Conclusion ----------------
  pres.addSection({ title: "Conclusion" });
  {
    const s = content("Conclusion", "CONCLUSION · THE WINNING PROPOSITION (MODULE 1)", "From technical lead to durable strategic leadership");
    const lev = [
      ["VALUE", "Useful, accepted AI outcomes at a falling cost per task", "FaChartLine"],
      ["POSITION", "Every cloud, sovereign, enterprise and physical-AI builder", "FaGlobe"],
      ["DIFFERENCE", "Full-stack system + open ecosystem + verifiable trust", "FaLayerGroup"],
      ["EFFECTIVENESS", "Hybrid organization, leadership bench, resilient supply", "FaGears"],
    ];
    const lw2 = (CW - 3 * 0.2) / 4;
    for (let i = 0; i < 4; i++) {
      const x = LM + i * (lw2 + 0.2);
      box(s, x, 1.65, lw2, 1.85, HEX.white, { line: HEX.rule, name: "Lever card" });
      await iconCircle(s, lev[i][2], x + 0.2, 1.83, 0.55, HEX.teal, HEX.white);
      label(s, lev[i][0], x + 0.9, 1.97, lw2 - 1.0);
      txt(s, lev[i][1], x + 0.2, 2.5, lw2 - 0.4, 0.95, { fontSize: 14, bold: true });
    }
    box(s, LM, 3.68, CW, 1.12, HEX.mint, { name: "Decision box" });
    txt(s, [B("Decision  ", { color: HEX.teal }), R("In year 1, pilot the hybrid organization and simulate-before-deploy assurance in physical AI. Scale where the indicators improve; redesign or stop where they do not.")],
      LM + 0.25, 3.68, CW - 0.5, 1.12, { fontSize: 15.5, valign: "middle" });
    box(s, LM, 4.95, CW, 0.88, HEX.beige, { name: "Risk box" });
    txt(s, [B("What would change my view: ", { color: HEX.bronze }), R("custom chips match total system cost · openness commitments fail regulatory review · assurance slows releases without reducing incidents.")],
      LM + 0.25, 4.95, CW - 0.5, 0.88, { fontSize: 13, valign: "middle" });
    takeaway(s, [B("Make trust part of how the platform works.", { color: HEX.lime })], 5.98, 0.6);
    sources(s, "Recommendations are the author's analysis; evidence as cited on previous slides.");
    tag(s, "Conclusion");
    s.addNotes(
`CONCLUSION (about 60 seconds)
To close, I use Module 1's winning proposition, with its four levers.
Value: useful, accepted AI outcomes at a falling cost per task. Position: serve every cloud, sovereign, enterprise and physical-AI builder, not just a few hyperscalers. Difference: the full-stack system, an open ecosystem and verifiable trust, which together are hard to copy. Effectiveness: a hybrid organization, a leadership bench and resilient supply.
My decision: in year one, pilot the hybrid organization and simulate-before-deploy assurance in physical AI. Scale where the indicators improve; redesign or stop where they do not.
I would change my view if custom chips matched total system cost, if openness commitments failed regulatory review, or if assurance slowed releases without reducing incidents.
CHIPSET has already helped define a new industry. The next advantage is not only a faster chip. It is making trust part of how the platform works.
Thank you. I'm happy to take questions.`);
  }

  // ---------------- S19-20 References ----------------
  pres.addSection({ title: "References" });
  const refSlide = (from, to, part) => {
    const s = content("References", "REFERENCES · TITLES ARE CLICKABLE · ACCESSED 18 NOVEMBER 2026", `References (${part} of 2)`);
    const items = REFS.slice(from, to).map((r, k) => ({ i: from + k + 1, r }));
    const half = Math.ceil(items.length / 2);
    [items.slice(0, half), items.slice(half)].forEach((col, ci) => {
      const runs = [];
      col.forEach(({ i, r }, k) => {
        runs.push({ text: `[${i}] ${r[0]}. `, options: { bold: true, color: HEX.navy } });
        runs.push({ text: r[1], options: { color: HEX.teal, hyperlink: { url: r[3], tooltip: r[3] } } });
        runs.push({ text: r[2] ? `. ${r[2]}` : ".", options: { color: HEX.slate, breakLine: k < col.length - 1 } });
      });
      s.addText(runs, { x: LM + ci * 6.17, y: 1.6, w: 5.95, h: 5.25, fontSize: 11, valign: "top", margin: 0, paraSpaceAfter: 6, isTextBox: true, objectName: `Reference column ${ci + 1}` });
    });
    s.addNotes("References. Do not read these aloud. Each title is hyperlinked; cite the relevant source if challenged during questions. Company statements, filings, legal allegations, orders, estimates and projections are distinguished on the slides where they are used.");
  };
  refSlide(0, 20, 1);
  refSlide(20, REFS.length, 2);

  await pres.writeFile({ fileName: OUT });
  await recolorChartLabels(OUT);
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
}

// White labels on the teal series, navy labels on gray series (contrast >= 4:1 either way)
async function recolorChartLabels(file) {
  const fs = require("fs");
  const JSZip = require(require.resolve("jszip", { paths: [require.resolve("pptxgenjs")] }));
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  let changed = 0;
  for (const name of Object.keys(zip.files)) {
    if (!/^ppt\/charts\/chart\d+\.xml$/.test(name)) continue;
    let xml = await zip.file(name).async("string");
    xml = xml.replace(/<c:ser>[\s\S]*?<\/c:ser>/g, (ser) => {
      const m = ser.match(/<c:spPr>\s*<a:solidFill>\s*<a:srgbClr val="([0-9A-Fa-f]{6})"/);
      if (!m) return ser;
      const lab = m[1].toUpperCase() === HEX.chartTeal ? "FFFFFF" : HEX.navy;
      return ser.replace(/(<c:dLbls>[\s\S]*?<a:defRPr[^>]*>\s*<a:solidFill>\s*<a:srgbClr val=")[0-9A-Fa-f]{6}(")/, (all, p1, p2) => { changed++; return p1 + lab + p2; });
    });
    zip.file(name, xml);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  console.log("chart label series recoloured:", changed);
}

build().catch((e) => { console.error(e); process.exit(1); });
