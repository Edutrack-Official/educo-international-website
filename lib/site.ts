/**
 * Single source of truth for Educo International's copy and contact details.
 * Edit content here, not in components.
 *
 * Items marked VERIFY were not in the brief and must be confirmed by the
 * institute before launch.
 */

export const site = {
  name: "Educo",
  legalName: "Educo International",
  motto: "Achieving Excellence Together",
  tagline: "IELTS · OET · Spoken English & Hindi · Kids · Study abroad",
  description:
    "Educo International, Thudiyalur, Coimbatore. Achieving Excellence Together: coaching for IELTS, OET, TOEFL, PTE, Duolingo, GRE and GMAT; spoken English and spoken Hindi; phonics, handwriting, summer camps and workshops for kids; and study-abroad guidance.",
  // VERIFY: the institute's real domain.
  url: "https://www.educointernational.in",
  rating: { value: 4.9, count: 72 },
  // VERIFY: opening time and days. The brief only says "closes 9 PM".
  hours: "Open today · closes 9 PM",
  address: {
    lines: ["64B, Mettupalayam Main Road, VKL Nagar", "Thudiyalur, Coimbatore – 641034"],
    short: "Thudiyalur, Coimbatore",
    mapQuery: "Educo International, 64B Mettupalayam Main Rd, VKL Nagar, Thudiyalur, Coimbatore 641034",
  },
  phones: [{ display: "93638 31003", href: "+919363831003" }],
  instagram: { handle: "educo__international", url: "https://www.instagram.com/educo__international/" },
  threads: { url: "https://www.threads.com/@educo__international" },
  // VERIFY: that this number takes WhatsApp.
  whatsapp: "919363831003",
} as const;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;
export const reviewsLink = mapsLink;

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const navLinks = [
  { label: "Programmes", href: "#programs" },
  { label: "Test Prep", href: "#tests" },
  { label: "Young Learners", href: "#skills" },
  { label: "Kids Club", href: "#kids" },
  { label: "Study Abroad", href: "#destinations" },
  { label: "Visit", href: "#visit" },
] as const;

export type Program = {
  id: string;
  icon: "Plane" | "Target" | "Mic" | "Kite";
  kicker: string;
  title: string;
  summary: string;
  items: { name: string; note: string }[];
};

export const programs: Program[] = [
  {
    id: "abroad",
    icon: "Plane",
    kicker: "Study abroad",
    title: "Your university, abroad.",
    summary: "From the first career conversation to the day you fly: one desk that sees the whole plan through.",
    items: [
      { name: "Abroad career counselling", note: "Courses and countries that fit your goals and budget" },
      { name: "Admissions consulting", note: "Shortlists, SOPs, LORs and applications, done right" },
      { name: "Educational loans", note: "Guidance on lenders, paperwork and timelines" },
      { name: "Parent education & support", note: "Families kept informed at every step" },
    ],
  },
  {
    id: "tests",
    icon: "Target",
    kicker: "Test preparation",
    title: "The score that opens the door.",
    summary: "Focused coaching, real practice tests and honest feedback for the exam your university asks for.",
    items: [
      { name: "IELTS", note: "Academic and General Training" },
      { name: "OET", note: "English for nurses, doctors and healthcare professionals" },
      { name: "TOEFL, PTE & Duolingo", note: "For admissions worldwide" },
      { name: "GRE / GMAT", note: "For master's and MBA programmes" },
    ],
  },
  {
    id: "skills",
    icon: "Mic",
    kicker: "Spoken English & Hindi",
    title: "Speak with confidence.",
    summary: "Fluent, confident speaking for every age group, in English and in Hindi.",
    items: [
      { name: "Spoken English", note: "For children, students, homemakers and professionals" },
      { name: "Spoken Hindi", note: "Including Hindi Prachar Sabha exams such as Parichaya" },
      { name: "Public speaking", note: "Stage presence, structure and clarity" },
      { name: "Parent education & support", note: "Families involved in every step" },
    ],
  },
  {
    id: "kids",
    icon: "Kite",
    kicker: "Kids",
    title: "Little learners, big steps.",
    summary: "Strong foundations, taught through play: reading, writing, speaking and creating.",
    items: [
      { name: "Phonics", note: "Reading and pronunciation from the first letters" },
      { name: "Handwriting", note: "Neat, fluent, confident writing" },
      { name: "Summer camp", note: "Fun, learning and adventure every summer" },
      { name: "Workshops", note: "DIY, art and creative activity days" },
    ],
  },
];

/**
 * Test facts: public formats of each exam. VERIFY against the official
 * sites before launch, as test makers change formats (TOEFL changed in 2026).
 */
export type Test = {
  id: string;
  name: string;
  full: string;
  min: number;
  max: number;
  target: number;
  scoreLabel: string;
  sections: string[];
  format: string;
  usedFor: string;
};

export const tests: Test[] = [
  {
    id: "ielts",
    name: "IELTS",
    full: "International English Language Testing System",
    min: 0,
    max: 9,
    target: 7.5,
    scoreLabel: "Band 0–9",
    sections: ["Listening", "Reading", "Writing", "Speaking"],
    format: "Paper or computer, at a test centre",
    usedFor: "UK, Australia, Canada, New Zealand, Ireland and more; also migration",
  },
  {
    id: "oet",
    name: "OET",
    full: "Occupational English Test (for healthcare professionals)",
    min: 0,
    max: 500,
    target: 350,
    scoreLabel: "Score 0–500 per skill · Grade B = 350+",
    sections: ["Listening", "Reading", "Writing (profession-specific)", "Speaking (role-plays)"],
    format: "Paper, computer at a venue, or OET@Home",
    usedFor: "Nurses, doctors and allied health professionals registering in the UK, Australia, NZ, Ireland and more",
  },
  {
    id: "pte",
    name: "PTE",
    full: "Pearson Test of English Academic",
    min: 10,
    max: 90,
    target: 79,
    scoreLabel: "Score 10–90",
    sections: ["Speaking & Writing", "Reading", "Listening"],
    format: "Computer-based, AI-scored, quick results",
    usedFor: "Australia, New Zealand, UK, Canada and thousands of universities",
  },
  {
    id: "toefl",
    name: "TOEFL",
    full: "Test of English as a Foreign Language (iBT)",
    min: 1,
    max: 6,
    target: 5.5,
    scoreLabel: "Band 1–6",
    sections: ["Reading", "Listening", "Writing", "Speaking"],
    format: "Computer-based, at a centre or at home",
    usedFor: "Widely preferred by universities in the USA",
  },
  {
    id: "duolingo",
    name: "Duolingo",
    full: "Duolingo English Test",
    min: 10,
    max: 160,
    target: 135,
    scoreLabel: "Score 10–160",
    sections: ["Literacy", "Comprehension", "Conversation", "Production"],
    format: "Online, from home, about an hour",
    usedFor: "Accepted by a fast-growing list of universities worldwide",
  },
  {
    id: "gre",
    name: "GRE",
    full: "Graduate Record Examinations (General Test)",
    min: 260,
    max: 340,
    target: 325,
    scoreLabel: "Score 260–340",
    sections: ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing"],
    format: "Computer-based, at a centre or at home",
    usedFor: "Master's and PhD admissions, especially in the USA",
  },
  {
    id: "gmat",
    name: "GMAT",
    full: "Graduate Management Admission Test (Focus Edition)",
    min: 205,
    max: 805,
    target: 685,
    scoreLabel: "Score 205–805",
    sections: ["Quantitative Reasoning", "Verbal Reasoning", "Data Insights"],
    format: "Computer-based, at a centre or online",
    usedFor: "MBA and business master's programmes worldwide",
  },
];

/** VERIFY: the countries Educo actually places students in. */
export type Destination = {
  code: string;
  name: string;
  line: string;
  points: string[];
  tests: string;
  hue: string;
};

export const destinations: Destination[] = [
  {
    code: "UK",
    name: "United Kingdom",
    line: "Centuries-old universities, one-year master's.",
    points: ["One-year taught master's", "Graduate Route to work after study", "Intakes in September and January"],
    tests: "IELTS · PTE · Duolingo",
    hue: "#3a5bd9",
  },
  {
    code: "US",
    name: "United States",
    line: "The widest choice of universities on earth.",
    points: ["Flexible majors and research", "STEM programmes with OPT work options", "Fall and spring intakes"],
    tests: "TOEFL · GRE · GMAT · Duolingo",
    hue: "#c2413b",
  },
  {
    code: "CA",
    name: "Canada",
    line: "Quality education with a clear path to work.",
    points: ["Colleges and universities", "Post-graduation work permit", "Welcoming, multicultural cities"],
    tests: "IELTS · PTE · TOEFL",
    hue: "#d0342c",
  },
  {
    code: "AU",
    name: "Australia",
    line: "World-ranked campuses, sunshine included.",
    points: ["Strong in health, engineering and business", "Post-study work rights", "February and July intakes"],
    tests: "IELTS · PTE · TOEFL",
    hue: "#1f8a70",
  },
  {
    code: "DE",
    name: "Germany",
    line: "Engineering excellence, low tuition.",
    points: ["Public universities with little or no tuition", "English-taught master's", "Europe's largest economy"],
    tests: "IELTS · TOEFL · GRE",
    hue: "#d9a21b",
  },
  {
    code: "IE",
    name: "Ireland",
    line: "Europe's tech capital, English-speaking.",
    points: ["Home to global tech and pharma", "Stay-back option after graduation", "One-year master's"],
    tests: "IELTS · PTE · Duolingo",
    hue: "#2e9d5b",
  },
  {
    code: "NZ",
    name: "New Zealand",
    line: "Safe, scenic, and globally respected.",
    points: ["All eight universities world-ranked", "Post-study work visa", "Relaxed, safe lifestyle"],
    tests: "IELTS · PTE · TOEFL",
    hue: "#2a7fb8",
  },
];

export const journey = [
  { title: "Discover", body: "A one-to-one counselling session on your goals, marks, budget and the careers you're aiming for." },
  { title: "Shortlist", body: "Countries, universities and courses that genuinely fit you, with honest odds." },
  { title: "Prepare", body: "Coaching for IELTS, PTE, TOEFL, Duolingo, GRE or GMAT until you hit the score you need." },
  { title: "Apply", body: "Strong SOPs, LORs and applications, submitted on time for the intake you want." },
  { title: "Fund", body: "Education loan guidance, documents in order, and your family kept in the loop." },
  { title: "Fly", body: "Visa file, pre-departure briefing, and a send-off. Your new campus is waiting." },
] as const;

export const learnerBands = [
  {
    age: "Ages 4–10",
    title: "Little learners",
    body: "Phonics to read and pronounce with confidence, and handwriting that's neat and fluent.",
    tags: ["Phonics", "Handwriting", "Spoken English"],
  },
  {
    age: "Ages 11–18",
    title: "Students",
    body: "Speak up in class, on stage and in interviews. Public speaking and fluent everyday English.",
    tags: ["Spoken English", "Public speaking"],
  },
  {
    age: "Adults",
    title: "Graduates & professionals",
    body: "Workplace English, presentations and the test scores your next move depends on.",
    tags: ["Spoken English", "Public speaking", "IELTS / PTE"],
  },
] as const;

export const marqueeItems = [
  "Achieving Excellence Together",
  "IELTS",
  "OET",
  "PTE Academic",
  "TOEFL",
  "Duolingo",
  "GRE",
  "GMAT",
  "Study Abroad",
  "Admissions",
  "Education Loans",
  "Spoken English",
  "Spoken Hindi",
  "Summer Camp",
  "Public Speaking",
  "Phonics",
  "Handwriting",
];

// VERIFY: review these answers with Educo before launch.
export const faqs = [
  {
    q: "When should I start planning to study abroad?",
    a: "Ideally 9–12 months before your intended intake. That leaves time for test prep, applications, loans and the visa without rushing. Started late? Come in anyway: we'll tell you honestly what's still possible.",
  },
  {
    q: "IELTS, PTE, TOEFL or Duolingo: which test should I take?",
    a: "It depends on the countries and universities on your list. In your counselling session we check what each one accepts and recommend the test that suits you best.",
  },
  {
    q: "Do you help with education loans?",
    a: "Yes. We guide you through lender options, the documents you'll need and the timelines, so funding is ready when your offer arrives.",
  },
  {
    q: "Do you coach OET for nurses and doctors?",
    a: "Yes. OET is built for healthcare professionals, and we prepare you for all four sub-tests, including the profession-specific writing and the speaking role-plays.",
  },
  {
    q: "When is the kids' summer camp?",
    a: "We run it every summer and seats are limited. Follow us on Instagram or call us for this year's dates.",
  },
  {
    q: "Are the spoken English classes only for students going abroad?",
    a: "Not at all. Spoken English is for every age group: children, school and college students, homemakers and working professionals.",
  },
  {
    q: "Can parents join the counselling session?",
    a: "Please do. Parent education and support is part of what we offer, and families are kept informed at every step.",
  },
  {
    q: "How do I book a session?",
    a: "Call us, message us on WhatsApp, or fill in the form below. We'll confirm a time that works for you.",
  },
];

/** Kids Club: from the institute's Instagram highlights and posts. VERIFY dates and seats each season. */
export const kidsClub = [
  {
    title: "Summer camp",
    body: "A world of fun, learning and adventure: English games, art, drama and new friends. Limited seats every summer.",
    emoji: "☀️",
    hue: "#f2b33d",
  },
  {
    title: "DIY & art workshops",
    body: "Glue, scissors and a whole lot of creativity. Hands-on making that builds focus and confidence.",
    emoji: "✂️",
    hue: "#e4677a",
  },
  {
    title: "Phonics workshops",
    body: "Short, joyful workshops that turn letters into sounds and sounds into reading.",
    emoji: "🔤",
    hue: "#3d8fd6",
  },
  {
    title: "Spoken Hindi & Sabha exams",
    body: "Our achievers proudly receive their Hindi Prachar Sabha Parichaya certificates.",
    emoji: "🏆",
    hue: "#2e9d6b",
  },
] as const;

/** Instagram story highlights, shown as story rings that open the profile. */
export const highlights = [
  { label: "Kids workshop", icon: "🧩" },
  { label: "IELTS", icon: "🎯" },
  { label: "Reviews", icon: "⭐" },
  { label: "Kids activity", icon: "🎨" },
  { label: "Workshops", icon: "✂️" },
  { label: "Summer class", icon: "☀️" },
  { label: "Spoken English", icon: "🗣️" },
  { label: "Phonics WS", icon: "🔤" },
  { label: "Why English?", icon: "🌍" },
];
