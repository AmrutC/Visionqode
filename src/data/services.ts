export interface Service {
  slug: string;
  name: string;
  short: string;          // ledger description on the homepage
  title: string;          // <title> / H1 for the service page
  metaDescription: string;
  h1: string;
  intro: string;
  signals: string[];      // "Is this you?" pain signals
  deliverables: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  tech: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  keywords: string[];
}

export const services: Service[] = [
  {
    slug: 'ai-automation',
    name: 'AI & intelligent automation',
    short: 'Document intelligence, agents and LLM workflows that take the repetitive work out of operations.',
    title: 'AI Automation Company in Navi Mumbai | LLM, OCR & Agent Workflows',
    metaDescription: 'Visionqode builds AI automation for Indian businesses: document intelligence, OCR, LLM-powered agents, chatbots and predictive analytics wired into your existing systems.',
    h1: 'AI that does the paperwork, so your team does the thinking.',
    intro: 'We embed language models, OCR and decision logic inside the systems you already run. Documents read themselves, enquiries get answered at 2 a.m., and the exceptions — not every record — land on a human desk.',
    signals: [
      'Staff re-key data from PDFs, invoices or ID documents into your ERP every day.',
      'Customers wait hours for answers that are already written down somewhere.',
      'You have years of operational data and no way to forecast demand or spot anomalies.',
    ],
    deliverables: [
      { title: 'Document intelligence', text: 'OCR + LLM pipelines that extract, validate and file documents — GST returns, KYC, invoices, delivery challans — with confidence scores and a review queue.' },
      { title: 'AI agents and chatbots', text: 'Assistants on WhatsApp, web and voice that resolve queries, qualify leads and trigger actions in your CRM or ERP.' },
      { title: 'LLM integration', text: 'OpenAI, Claude or Gemini selected per use-case, with prompt design, evaluation sets, guardrails and cost controls.' },
      { title: 'Predictive analytics', text: 'Demand forecasting, anomaly detection and recommendation models built on your own data and surfaced in dashboards people actually open.' },
    ],
    steps: [
      { title: 'Find the repetitive 20%', text: 'We shadow the process and measure where hours go — then pick the tasks where automation pays back fastest.' },
      { title: 'Prototype on real data', text: 'A working pipeline on your documents or conversations within weeks, with accuracy measured against a human baseline.' },
      { title: 'Integrate and govern', text: 'Production deployment inside your systems, with audit logs, fallbacks and a review workflow for low-confidence cases.' },
    ],
    tech: ['OpenAI', 'Claude', 'Gemini', 'Python', 'Node.js', 'Azure AI', 'AWS', 'PostgreSQL', 'Vector search'],
    benefits: ['Fewer manual touches per transaction', 'Faster response to customers and vendors', 'Audit trail on every automated decision', 'Models chosen for cost as well as accuracy'],
    faqs: [
      { q: 'Will the AI make decisions on its own?', a: 'Only where you decide it should. Every pipeline has confidence thresholds; anything below them goes to a person. High-stakes actions such as payments or filings always require an approval step.' },
      { q: 'Is our data used to train public models?', a: 'No. We use enterprise API tiers where provider terms exclude training on your data, and can deploy on Azure or AWS regions in India where required.' },
      { q: 'How accurate is document extraction?', a: 'It depends on document quality. We measure accuracy against a human-verified sample before go-live and report it to you, rather than quoting a generic number.' },
    ],
    related: ['process-automation', 'custom-software-erp', 'api-integration'],
    keywords: ['AI automation company India', 'AI development company Navi Mumbai', 'document intelligence OCR', 'LLM integration services'],
  },
  {
    slug: 'custom-software-erp',
    name: 'Custom software & ERP',
    short: 'Construction, hospital, manufacturing and school ERPs; CRM, HRMS and inventory platforms shaped to your process.',
    title: 'Custom Software & ERP Development Company in Navi Mumbai | Visionqode',
    metaDescription: 'Custom ERP, CRM, HRMS and inventory software built around how your business actually runs. Construction ERP, hospital management, manufacturing and school ERP by Visionqode, Navi Mumbai.',
    h1: 'One system, built around how your business actually runs.',
    intro: 'Off-the-shelf ERPs make you work their way. We design the data model and screens around your operation — bookings, procurement, production, billing — and deliver software your team adopts because it matches the job.',
    signals: [
      'Your operation lives in spreadsheets, Tally and WhatsApp, and nobody has one true picture.',
      'You bought a packaged ERP and still run half the business outside it.',
      'Month-end takes a week because the numbers have to be reconciled by hand.',
    ],
    deliverables: [
      { title: 'Industry ERP foundations', text: 'Construction ERP (bookings, milestones, procurement, RERA), Hospital Management, Manufacturing ERP and School ERP — proven cores we tailor deeply.' },
      { title: 'Fully custom platforms', text: 'When the operation is unique, we architect from scratch on .NET, Node.js or Python with a clean, documented data model.' },
      { title: 'CRM, HRMS and inventory', text: 'Modules that talk to each other — leads to invoices, attendance to payroll, stock to purchase orders.' },
      { title: 'Cloud, desktop or hybrid', text: 'Web-first by default, with desktop or offline-capable clients where yards, plants or sites need them.' },
    ],
    steps: [
      { title: 'Process mapping', text: 'Two to three weeks with your team producing a workflow map, data model and a fixed-scope proposal.' },
      { title: 'Build in cycles', text: 'Working modules every two weeks, tested by the people who will use them, so direction changes early rather than late.' },
      { title: 'Migrate and go live', text: 'Historical data migrated and reconciled, roles and permissions set, training delivered, support window started.' },
    ],
    tech: ['.NET', 'Node.js', 'Python', 'React', 'SQL Server', 'PostgreSQL', 'Azure', 'AWS', 'Docker'],
    benefits: ['A single source of truth across departments', 'Reports that are right without reconciliation', 'Role-based access and a full audit trail', 'Owned IP — the code and data are yours'],
    faqs: [
      { q: 'How long does a custom ERP take?', a: 'A first production module is typically live in 8–12 weeks; a full multi-department system is phased over several months. We fix the scope and timeline in the proposal.' },
      { q: 'Can it connect to Tally for accounting?', a: 'Yes. Posting invoices, receipts and ledgers to Tally (and SAP, Zoho or QuickBooks) is a standard part of our ERP work.' },
      { q: 'Who owns the source code?', a: 'You do. We hand over repositories, documentation and deployment scripts; ongoing support is optional, never a lock-in.' },
    ],
    related: ['ai-automation', 'api-integration', 'process-automation'],
    keywords: ['custom software development company India', 'ERP development Navi Mumbai', 'construction ERP', 'hospital management software'],
  },
  {
    slug: 'web-mobile-apps',
    name: 'Web & mobile applications',
    short: 'Customer-facing and internal apps for Android, iOS and the browser — Flutter, React Native, .NET and Node.',
    title: 'Web & Mobile App Development Company in Navi Mumbai | Visionqode',
    metaDescription: 'Visionqode builds web applications and Android/iOS apps — Flutter, React Native and native — for enterprises, startups and SaaS products across India.',
    h1: 'Apps your customers keep, and your staff actually open.',
    intro: 'From a customer app with payments and live tracking to an internal tool for field teams, we design and ship applications that are fast, secure and connected to the systems behind them.',
    signals: [
      'Field staff report on WhatsApp and someone types it into the system later.',
      'Customers call to ask for a status your system already knows.',
      'You have a SaaS idea and need a product team, not just a developer.',
    ],
    deliverables: [
      { title: 'Mobile apps', text: 'Native Android and iOS, or Flutter / React Native when one codebase makes sense — with offline modes, push notifications and payments.' },
      { title: 'Web applications', text: 'React and Next.js front ends on .NET or Node.js APIs; progressive web apps where installability matters.' },
      { title: 'SaaS products', text: 'Multi-tenant architecture, subscriptions with Razorpay or Stripe, onboarding flows and admin consoles.' },
      { title: 'Internal tools', text: 'Dashboards, approval apps and field-ops tools that plug straight into your ERP or CRM.' },
    ],
    steps: [
      { title: 'Product definition', text: 'User journeys, wireframes and a clickable prototype you can put in front of real users before code.' },
      { title: 'Design and build', text: 'A design system first, then features in two-week cycles with TestFlight / Play internal testing from early on.' },
      { title: 'Release and iterate', text: 'Store submission, analytics and crash monitoring, then a roadmap based on what users do.' },
    ],
    tech: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'React', 'Next.js', 'Node.js', '.NET', 'Firebase', 'PostgreSQL'],
    benefits: ['One backend for web and mobile', 'Store-ready builds with analytics from day one', 'Secure authentication and data handling', 'A roadmap, not a one-off build'],
    faqs: [
      { q: 'Native or cross-platform?', a: 'Cross-platform (Flutter or React Native) covers most business apps well and halves the cost of two codebases. We go native when the app leans on device hardware or demanding graphics.' },
      { q: 'Do you handle app store publishing?', a: 'Yes — developer accounts, listings, review responses and updates for both Google Play and the App Store.' },
      { q: 'Can you take over an existing app?', a: 'Usually. We start with a code and infrastructure audit and give you a plain-language report before committing to a plan.' },
    ],
    related: ['website-design', 'custom-software-erp', 'api-integration'],
    keywords: ['mobile app development company India', 'web application development Navi Mumbai', 'SaaS development company India', 'Flutter app development'],
  },
  {
    slug: 'website-design',
    name: 'Website design & development',
    short: 'Corporate, real-estate and e-commerce websites engineered for speed, search and enquiries.',
    title: 'Website Design & Development Company in Navi Mumbai | Visionqode',
    metaDescription: 'Fast, search-ready websites for businesses in Navi Mumbai and across India — corporate sites, real-estate project sites, e-commerce and landing pages by Visionqode.',
    h1: 'Websites built to be found, and to turn visits into enquiries.',
    intro: 'A business website has two jobs: show up in search and make the next step obvious. We design for both — clear positioning, pages structured for search engines and AI assistants, and a conversion path that works on a phone.',
    signals: [
      'Your site looks fine but the phone never rings from it.',
      'You rank for your name and nothing else.',
      'The site is slow on mobile and nobody can update it without a developer.',
    ],
    deliverables: [
      { title: 'Corporate and brand sites', text: 'Positioning, copy and design that present a serious company — for real estate, healthcare, education, hospitality, professional services and luxury brands.' },
      { title: 'E-commerce', text: 'Storefronts with Razorpay or Stripe checkout, inventory sync and Shiprocket / Delhivery dispatch.' },
      { title: 'Landing pages', text: 'Campaign pages with forms wired to your CRM and WhatsApp, built to load in under two seconds.' },
      { title: 'Technical SEO built in', text: 'Semantic structure, structured data, sitemaps, Core Web Vitals and content architecture — from the first wireframe.' },
    ],
    steps: [
      { title: 'Positioning and structure', text: 'Who the site is for, what it must say, and the page architecture that search engines can read.' },
      { title: 'Design and content', text: 'Design system, page layouts and copy written for people first, with keywords placed where they belong.' },
      { title: 'Build, measure, improve', text: 'Static or headless build for speed, analytics and search-console setup, and a review after the first month of data.' },
    ],
    tech: ['Astro', 'Next.js', 'React', 'Headless CMS', 'Razorpay', 'Stripe', 'Cloudflare', 'Vercel'],
    benefits: ['Fast on mobile, measured not promised', 'Structured for Google and AI answer engines', 'Enquiry forms connected to CRM and WhatsApp', 'Editable without calling a developer'],
    faqs: [
      { q: 'Do you also write the content?', a: 'Yes. Positioning and page copy are part of the project; we interview you and draft, you approve.' },
      { q: 'WordPress or custom?', a: 'We recommend based on how often you will edit and what the site must do. Marketing sites are often fastest and safest as static builds with a headless CMS; complex catalogues may suit other stacks.' },
      { q: 'Will the site rank on Google?', a: 'We build every technical and structural prerequisite in and set up measurement. Rankings depend on competition and content over time, so we never guarantee positions.' },
    ],
    related: ['web-mobile-apps', 'process-automation', 'api-integration'],
    keywords: ['website development company Navi Mumbai', 'website design company India', 'real estate website design', 'e-commerce website development'],
  },
  {
    slug: 'process-automation',
    name: 'Business process automation',
    short: 'WhatsApp, approvals, invoicing, CRM and marketing flows connected end to end — no manual hand-offs.',
    title: 'Business Process & WhatsApp Automation Services in India | Visionqode',
    metaDescription: 'Visionqode automates business processes end to end — WhatsApp Business API flows, approval workflows, invoicing, CRM and marketing automation — for companies across India.',
    h1: 'One trigger, the whole pipeline — without anyone chasing.',
    intro: 'A lead arrives on WhatsApp, gets qualified, lands in the CRM, waits for a manager\'s approval and becomes a payment link — all without a person copying anything between tools. That is the kind of flow we build.',
    signals: [
      'Approvals happen over calls and nobody can say what is pending.',
      'The same customer detail is typed into three tools.',
      'Leads from ads wait hours for a first reply.',
    ],
    deliverables: [
      { title: 'WhatsApp Business API flows', text: 'Verified business account, approved templates, qualification bots, reminders and two-way conversations synced to your CRM.' },
      { title: 'Approval workflows', text: 'Multi-level approvals with digital signatures, escalation and a full trail — for purchases, leave, documents and filings.' },
      { title: 'Accounting and invoicing', text: 'Quotes to invoices to payment links to Tally entries, automatically — with reconciliation reports.' },
      { title: 'Marketing and CRM automation', text: 'Drip journeys, lead scoring and follow-up tasks that fire from behaviour, not from someone remembering.' },
    ],
    steps: [
      { title: 'Map the hand-offs', text: 'We draw the process as it really happens and mark every manual hand-off and wait.' },
      { title: 'Connect the tools', text: 'Integrations with WhatsApp, CRM, accounting and email, with the rules of the business encoded explicitly.' },
      { title: 'Monitor and tune', text: 'Dashboards showing every run, with alerts for failures and a monthly review of what to automate next.' },
    ],
    tech: ['WhatsApp Business API', 'Twilio', 'Zoho', 'Tally', 'Razorpay', 'Node.js', 'Python', 'Azure Logic Apps', 'Webhooks'],
    benefits: ['Minutes instead of hours to first response', 'Every approval visible and timestamped', 'No double entry between systems', 'Automation runs you can audit'],
    faqs: [
      { q: 'Do we need the official WhatsApp Business API?', a: 'For automation at any scale, yes. The free Business App cannot run bots or integrate with a CRM. We handle Meta verification and template approval.' },
      { q: 'Will customers find automated messages spammy?', a: 'Not if the flows respect opt-in, answer real questions and hand over to a human quickly. We design for that and track block and reply rates.' },
      { q: 'Can automation work with our existing CRM?', a: 'Yes — Zoho, HubSpot, Salesforce and custom CRMs via API, or we build the CRM as part of the system.' },
    ],
    related: ['ai-automation', 'api-integration', 'custom-software-erp'],
    keywords: ['business automation solutions India', 'WhatsApp automation company', 'workflow automation services', 'approval workflow software'],
  },
  {
    slug: 'api-integration',
    name: 'API integration & UI/UX',
    short: 'Tally, SAP, Zoho, Razorpay, WhatsApp Business and the clouds — plus the design systems and dashboards on top.',
    title: 'API Integration & UI/UX Design Services | Tally, SAP, Zoho, Razorpay | Visionqode',
    metaDescription: 'Visionqode connects your systems — Tally, SAP, Zoho, QuickBooks, Razorpay, Stripe, WhatsApp, Google, Microsoft, AWS and Azure — and designs the dashboards and interfaces people use on top.',
    h1: 'Make your systems talk, and give people one clear screen.',
    intro: 'Most businesses do not need another tool; they need the ones they have to exchange data reliably. We build and maintain those integrations, then design the dashboards and interfaces that make the combined picture usable.',
    signals: [
      'Accounts re-enter what sales already captured.',
      'Payment confirmations, dispatch updates and invoices arrive in different places.',
      'Your dashboard exists but nobody trusts or opens it.',
    ],
    deliverables: [
      { title: 'Accounting and ERP connectors', text: 'Tally, SAP, Zoho Books, QuickBooks — invoices, receipts, ledgers and e-invoicing kept in sync.' },
      { title: 'Payments and logistics', text: 'Razorpay, Stripe, Shiprocket and Delhivery integrated with order flows and reconciliation.' },
      { title: 'Platform APIs', text: 'Google Workspace, Microsoft 365, Meta APIs, Twilio, Firebase, AWS and Azure services wired into your applications.' },
      { title: 'UI/UX and design systems', text: 'Research, wireframes, prototypes and component libraries — then dashboards that answer the question the user came with.' },
    ],
    steps: [
      { title: 'Audit the data flows', text: 'What moves where, how often, and what breaks today.' },
      { title: 'Build resilient connectors', text: 'Retries, idempotency, logging and alerting — integrations that keep working when an API has a bad day.' },
      { title: 'Design the surface', text: 'Interfaces designed with the people who use them, tested before they are built.' },
    ],
    tech: ['REST', 'GraphQL', 'Webhooks', 'Tally XML/ODBC', 'SAP APIs', 'Zoho APIs', 'Razorpay', 'Stripe', 'Figma', 'React'],
    benefits: ['No double entry between departments', 'Reconciliation handled by software', 'Interfaces people learn in a day', 'Documented APIs you can extend'],
    faqs: [
      { q: 'Can you integrate with on-premise TallyPrime?', a: 'Yes. We work with Tally\'s XML interface and connector services so cloud systems can post vouchers to an on-premise Tally securely.' },
      { q: 'Do you only design, or build too?', a: 'Both, and we prefer both — design decisions get tested in working software rather than handed over as static files.' },
      { q: 'What happens when a third-party API changes?', a: 'Integrations are monitored and versioned; changes are caught by alerts and fixed under the support agreement.' },
    ],
    related: ['custom-software-erp', 'process-automation', 'web-mobile-apps'],
    keywords: ['API integration services India', 'Tally integration', 'Razorpay integration', 'UI UX design company Navi Mumbai'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
