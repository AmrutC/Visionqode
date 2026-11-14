/**
 * Verified company facts. Everything here was taken from the existing
 * www.visionqode.com or supplied by the company. Anything not yet verified is
 * marked `needsApproval` and rendered with a visible dashed outline in dev.
 */
export const site = {
  name: 'Visionqode',
  legalName: 'VisionQode Private Limited',
  tagline: 'Where vision meets code',
  url: 'https://www.visionqode.com',
  description:
    'Visionqode is a technology and digital innovation company in Navi Mumbai that designs and engineers ERPs, business automation, AI systems, websites and mobile apps for growing companies across India.',
  founder: { name: 'Roshan Patil', role: 'CEO & Managing Director' },
  phone: '+91 75062 25569',
  phoneHref: 'tel:+917506225569',
  whatsapp: 'https://wa.me/917506225569',
  email: 'roshan@visionqode.com',
  address: { locality: 'Navi Mumbai', region: 'Maharashtra', country: 'IN', countryName: 'India' },
  replyTime: 'within one business day',
  /** Social profiles — the current site links to "#". Fill in and remove the flag. */
  social: [
    { label: 'LinkedIn', href: '', needsApproval: true },
    { label: 'Instagram', href: '', needsApproval: true },
    { label: 'X', href: '', needsApproval: true },
  ],
  founded: { value: '', needsApproval: true },
  themeColor: "#242C54",
};

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
];

export const platforms = [
  'AWS', 'Microsoft Azure', 'OpenAI', 'Claude', 'Gemini', 'Razorpay', 'WhatsApp Business API',
  'Zoho', 'Tally', 'SAP', 'QuickBooks', 'Stripe', 'Twilio', 'Firebase', 'Meta APIs', 'Shiprocket', 'Delhivery',
];

export const stack = [
  'React', 'Next.js', 'Node.js', '.NET', 'Flutter', 'React Native', 'Python', 'PostgreSQL', 'SQL Server',
  'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'GraphQL', 'REST', 'Microservices',
];

export const process = [
  { n: '01', title: 'Discover', text: 'We map the real workflow — who does what, where it stalls, and what the numbers must say at the end of the month.' },
  { n: '02', title: 'Define', text: 'Scope, success metrics and a fixed proposal with milestones and cost — shared before any commitment.' },
  { n: '03', title: 'Design', text: 'Screens and the data model together, reviewed with the people who will use them every day.' },
  { n: '04', title: 'Build', text: 'Engineering in short cycles, with working software you can test from the second week.' },
  { n: '05', title: 'Launch', text: 'Data migration, training and a monitored go-live. Nobody is left alone with a manual.' },
  { n: '06', title: 'Improve', text: 'A support window with SLAs, then a retainer for the enhancements the business asks for next.' },
];

export const homeFaqs = [
  { q: 'How does a project with Visionqode start?', a: 'With a free consultation. We map your business problem, define scope and success metrics, then share a fixed proposal with timeline, milestones and cost — before any commitment.' },
  { q: 'Do you build custom ERPs or customise existing ones?', a: 'Both. For construction, hospitals, manufacturing and schools we have proven ERP foundations we tailor deeply; for unique operations we architect fully custom systems on .NET, Node.js or Python.' },
  { q: 'Which AI models do you work with?', a: 'OpenAI, Claude and Gemini — chosen per use-case for accuracy, latency and cost. We handle prompt design, evaluation, guardrails and integration into your existing tools.' },
  { q: 'Can you integrate with Tally, SAP or Zoho?', a: 'Yes. API integration is a core service — Tally, SAP, Zoho, QuickBooks, Razorpay, Stripe, Twilio, WhatsApp Business API, Shiprocket, Delhivery and the major cloud providers.' },
  { q: 'What does support look like after launch?', a: 'Every engagement includes a support window with SLAs, monitoring and optimisation cycles. Most clients continue with a monthly retainer for enhancements.' },
  { q: 'Where are you located, and do you work remotely?', a: 'We are headquartered in Navi Mumbai, Maharashtra, and work with clients across India and internationally — on-site where it matters, remote everywhere else.' },
];

export const budgetBands = ['Under ₹2 lakh', '₹2–5 lakh', '₹5–15 lakh', '₹15–50 lakh', 'Above ₹50 lakh', 'Not sure yet'];
