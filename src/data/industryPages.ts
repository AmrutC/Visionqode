/**
 * Long-form content for each industry page (/industries/<slug>).
 * Describes the kind of system built for that operation. No client names,
 * numbers or outcomes are claimed here — add those only once approved.
 */
export interface IndustryPage {
  title: string;
  metaDescription: string;
  signals: string[];
  modules: { icon: string; title: string; text: string }[];
  flow: { title: string; text: string }[];
  integrations: string[];
  faqs: { q: string; a: string }[];
}

export const industryPages: Record<string, IndustryPage> = {
  logistics: {
    title: 'Logistics & Container Yard Software — Yard, Gate, Repair, Billing | Visionqode',
    metaDescription: 'Yard management, gate automation, repair estimates, trip tracking and billing for container yards, CFS and transport operators — connected to Tally and to shipping-line systems.',
    signals: [
      'Gate registers, survey sheets and repair estimates live in different files, so nobody can say what is in the yard right now.',
      'Billing waits for someone to collect the paperwork, and invoices are typed again into Tally.',
      'Shipping lines and customers call for status because they cannot see it themselves.',
    ],
    modules: [
      { icon: 'truck', title: 'Gate-in and gate-out', text: 'Container number, size, type and condition captured at the gate on a phone or tablet, with photos and a printed or digital slip.' },
      { icon: 'layers', title: 'Yard inventory', text: 'Every container by location, line, status and days in yard — searchable, with stock reports as on any date.' },
      { icon: 'doc', title: 'Survey and repair estimates', text: 'Damage captured against standard codes, estimates raised for liner approval, and repair work tracked to completion.' },
      { icon: 'globe', title: 'Trips and fleet', text: 'Vehicle allocation, trip sheets, live status and proof of delivery for the transport side of the business.' },
      { icon: 'chart', title: 'Billing and e-invoicing', text: 'Storage, handling, repair and transport charges calculated from tariff rules, invoiced and posted to accounts.' },
      { icon: 'users', title: 'Customer and liner portal', text: 'Lines and customers see their own stock, movements and documents without phoning the yard.' },
    ],
    flow: [
      { title: 'Gate-in', text: 'The container is recorded once, at the gate, with photos.' },
      { title: 'Survey', text: 'Condition and damage are logged against the same record.' },
      { title: 'Repair', text: 'Estimate goes for approval; work is tracked until release.' },
      { title: 'Invoice', text: 'Charges are computed from the tariff, not from memory.' },
      { title: 'Tally', text: 'The invoice lands in accounts without being typed twice.' },
    ],
    integrations: ['Tally', 'e-invoicing (IRN)', 'WhatsApp Business API', 'Shipping-line EDI', 'GPS providers', 'SAP'],
    faqs: [
      { q: 'Can it work alongside the yard software we already use?', a: 'Yes. Where an existing system does its job, we connect to it through its API, database or file exchange and build only the missing parts — commonly billing, portals, mobile gate capture or reporting.' },
      { q: 'Does it handle both dry and reefer containers?', a: 'The data model is designed around your operation, so equipment types, reefer-specific checks, PTI records and their charges are set up as you run them.' },
      { q: 'Can gate staff use it on a phone?', a: 'Yes. Gate and survey screens are built for a phone or tablet first, with large controls, photo capture and tolerance for patchy connectivity.' },
    ],
  },
  'real-estate': {
    title: 'Real Estate & Construction ERP — Bookings, Milestones, Procurement, RERA | Visionqode',
    metaDescription: 'ERP for developers and contractors: inventory and bookings, payment milestones and demand letters, procurement with three-way matching, site progress, cost tracking and RERA records.',
    signals: [
      'Sales works in one sheet, accounts in another and the site in a third — and the three never agree.',
      'Demand letters go out late because someone has to work out who has reached which milestone.',
      'Cost overruns are discovered at the end of the month, not when the purchase order is raised.',
    ],
    modules: [
      { icon: 'building', title: 'Inventory and bookings', text: 'Towers, floors and units with status, pricing, booking forms and the document trail for every buyer.' },
      { icon: 'clock', title: 'Payment milestones', text: 'Construction-linked schedules that raise demand letters and reminders when a milestone is marked reached.' },
      { icon: 'doc', title: 'Procurement', text: 'Indent, purchase order, goods receipt and bill matched three ways before payment is released.' },
      { icon: 'chart', title: 'Site progress and cost', text: 'Daily progress from site, budget against actuals by activity, and variance where the director can see it.' },
      { icon: 'shield', title: 'RERA and compliance records', text: 'Project, unit and collection records kept in the shape your compliance reporting needs.' },
      { icon: 'chat', title: 'Leads and site visits', text: 'Enquiries from the website, portals and WhatsApp in one pipeline, through to booking.' },
    ],
    flow: [
      { title: 'Booking', text: 'A unit is blocked, booked and documented in one place.' },
      { title: 'Milestone', text: 'Site marks the stage; the schedule knows who owes what.' },
      { title: 'Procure', text: 'Purchases are checked against budget before they are approved.' },
      { title: 'Progress', text: 'Site reports feed the cost picture every day.' },
      { title: 'RERA', text: 'Compliance records build up as the work happens.' },
    ],
    integrations: ['Tally', 'Razorpay', 'WhatsApp Business API', 'Property portals', 'Email and SMS gateways', 'Zoho'],
    faqs: [
      { q: 'Is this for developers or for contractors?', a: 'Either. Developers usually start with bookings, collections and customer communication; contractors with procurement, site progress and cost. Both sides share one data model, so the other half can be added later.' },
      { q: 'Can buyers see their own account?', a: 'Yes. A buyer portal or app can show the payment schedule, receipts, demand letters and construction updates for that unit.' },
      { q: 'Do we have to replace Tally?', a: 'No. Accounts stay in Tally; receipts, bills and journal entries are posted to it from the ERP so nothing is entered twice.' },
    ],
  },
  'professional-services': {
    title: 'Software for CA, CS & Compliance Firms — Documents, Filings, Approvals | Visionqode',
    metaDescription: 'Practice software for CA and CS firms: client document collection, AI-assisted verification, GST, income-tax and ROC filing pipelines, approvals with digital signatures and client updates.',
    signals: [
      'Staff spend the first week of every cycle chasing clients for the same documents.',
      'Due dates are tracked in a sheet that only one person fully trusts.',
      'Partners approve filings over WhatsApp, with no record of who approved what.',
    ],
    modules: [
      { icon: 'doc', title: 'Client document desk', text: 'Clients upload once through a link or WhatsApp; documents are named, sorted and attached to the right engagement.' },
      { icon: 'brain', title: 'AI-assisted verification', text: 'OCR and language models read documents, flag mismatches and missing pages, and send only the exceptions to a person.' },
      { icon: 'workflow', title: 'Filing pipelines', text: 'GST, income-tax and ROC work moves through defined stages, with every client visible by status and due date.' },
      { icon: 'check', title: 'Approvals and signatures', text: 'Review, partner approval and digital signature happen inside the workflow, with a full audit trail.' },
      { icon: 'clock', title: 'Compliance calendar', text: 'Due dates by client and by return, with reminders to staff and to clients before they become urgent.' },
      { icon: 'chart', title: 'Time and billing', text: 'Work logged against engagements, invoices raised from it, and outstanding fees followed up automatically.' },
    ],
    flow: [
      { title: 'Upload', text: 'The client sends documents once, through one channel.' },
      { title: 'Verify', text: 'Documents are read and checked before a person opens them.' },
      { title: 'File', text: 'The return moves through its pipeline with a visible status.' },
      { title: 'Sign', text: 'Approval and signature are recorded in the flow.' },
      { title: 'Client', text: 'The client is told it is done, with the acknowledgement attached.' },
    ],
    integrations: ['Tally', 'WhatsApp Business API', 'Digital signature (DSC / e-sign)', 'Email', 'Zoho Books', 'OpenAI / Claude / Gemini'],
    faqs: [
      { q: 'Does the system file returns on the government portals for us?', a: 'It prepares, tracks and records the work, and connects to portals where an official interface exists. Where a portal requires a person to log in and submit, the system brings the filing to that point and records the acknowledgement afterwards.' },
      { q: 'How is client data protected?', a: 'Role-based access, encryption in transit and at rest, audit logs of every view and change, and hosting in the region you choose. AI features can be limited to models and deployments that do not retain your data.' },
      { q: 'How accurate is the AI document checking?', a: 'It depends on document quality and type, so we measure it on your own documents before go-live and keep a person in the loop for anything below the agreed confidence.' },
    ],
  },
  'retail-ecommerce': {
    title: 'Retail & E-commerce Systems — Storefront, Orders, Delivery, Loyalty | Visionqode',
    metaDescription: 'E-commerce built end to end: fast storefronts with Razorpay checkout, order and warehouse orchestration, Shiprocket or Delhivery dispatch with live updates, and review and loyalty automation.',
    signals: [
      'Orders arrive from the website, marketplaces and WhatsApp, and stock is updated by hand in each.',
      'Customers ask where their order is because the tracking message never went out.',
      'Repeat purchases depend on someone remembering to follow up.',
    ],
    modules: [
      { icon: 'cart', title: 'Storefront', text: 'A fast, search-friendly store with your catalogue, offers and checkout — designed around your brand, not a theme.' },
      { icon: 'shield', title: 'Checkout and payments', text: 'Razorpay or your preferred gateway, with UPI, cards, COD rules and automatic reconciliation of settlements.' },
      { icon: 'layers', title: 'Orders and inventory', text: 'One stock figure across channels; orders routed to the right warehouse or store with pick and pack lists.' },
      { icon: 'truck', title: 'Dispatch and tracking', text: 'Labels and pickups booked with the courier, and status pushed to the customer at each step.' },
      { icon: 'chat', title: 'WhatsApp commerce', text: 'Order updates, abandoned-cart nudges and support conversations on the channel customers already use.' },
      { icon: 'heart', title: 'Reviews and loyalty', text: 'Review requests after delivery, points, coupons and repeat-purchase flows that run without manual effort.' },
    ],
    flow: [
      { title: 'Order', text: 'Payment confirmed and stock reserved in the same moment.' },
      { title: 'Pack', text: 'The warehouse gets a pick list, not a forwarded message.' },
      { title: 'Dispatch', text: 'The courier is booked and the label printed automatically.' },
      { title: 'Review', text: 'Delivery triggers a review request at the right time.' },
      { title: 'Loyalty', text: 'The next offer goes out based on what was bought.' },
    ],
    integrations: ['Razorpay', 'Shiprocket', 'Delhivery', 'WhatsApp Business API', 'Tally', 'Meta APIs'],
    faqs: [
      { q: 'Should we build custom or use Shopify?', a: 'For a standard catalogue, a hosted platform is often the right start and we will say so. Custom makes sense when pricing, bundles, B2B rules, multiple warehouses or integrations are beyond what a theme and plugins handle well.' },
      { q: 'Can physical stores and the website share stock?', a: 'Yes. Inventory is held once and every channel — store billing, website, marketplaces — reads and writes the same figure.' },
      { q: 'Can you connect our existing store to the back office?', a: 'Yes. Many projects keep the storefront and add order orchestration, courier booking, accounting sync and WhatsApp updates behind it.' },
    ],
  },
  'healthcare-education': {
    title: 'Hospital Management & School ERP Software | Visionqode',
    metaDescription: 'Hospital management systems covering OPD, IPD, pharmacy and billing, and school ERPs for admissions, fees, attendance and parent communication — with WhatsApp reminders built in.',
    signals: [
      'Front desk, pharmacy and billing each keep their own record of the same patient.',
      'Fee follow-ups and attendance notices are sent one message at a time.',
      'Staff avoid the software because it was not built around how they work.',
    ],
    modules: [
      { icon: 'users', title: 'Registration and appointments', text: 'Patient or student records created once, with appointments, queues and admissions managed from the same screen.' },
      { icon: 'heart', title: 'OPD and IPD', text: 'Consultations, prescriptions, admissions, bed allocation and discharge summaries in one patient timeline.' },
      { icon: 'layers', title: 'Pharmacy and stores', text: 'Stock by batch and expiry, dispensing against prescriptions, and purchase orders raised at reorder level.' },
      { icon: 'chart', title: 'Billing and fees', text: 'Hospital billing with packages and insurance details, or school fee structures, receipts and outstanding reports.' },
      { icon: 'device', title: 'Parent and patient app', text: 'Attendance, homework, results and fee status for parents; reports, bills and appointments for patients.' },
      { icon: 'chat', title: 'Reminders and reports', text: 'Appointment, follow-up and fee reminders on WhatsApp, with reports shared securely.' },
    ],
    flow: [
      { title: 'Admit', text: 'One registration creates the record everyone uses.' },
      { title: 'Treat', text: 'Notes, orders and prescriptions attach to that record.' },
      { title: 'Bill', text: 'Charges build up as services are delivered.' },
      { title: 'Follow-up', text: 'Reminders go out without anyone keeping a list.' },
      { title: 'Records', text: 'History is available the next time, in seconds.' },
    ],
    integrations: ['WhatsApp Business API', 'Razorpay', 'Tally', 'SMS gateways', 'Lab equipment interfaces', 'Biometric attendance devices'],
    faqs: [
      { q: 'Is this one product or two?', a: 'Two systems built on the same engineering approach. Hospitals get OPD, IPD, pharmacy and billing; schools get admissions, fees, attendance and communication. Each is shaped to the institution rather than sold as a fixed package.' },
      { q: 'How do you get staff to actually use it?', a: 'By designing screens with the people who will use them, keeping each task to as few steps as possible, training on site and staying through the first weeks of live use.' },
      { q: 'How is sensitive data handled?', a: 'Access is limited by role, every view and change is logged, data is encrypted, and records are shared with patients or parents only through authenticated channels.' },
    ],
  },
  manufacturing: {
    title: 'Manufacturing ERP — Procurement, Inventory, Production, QC, Dispatch | Visionqode',
    metaDescription: 'Manufacturing ERP covering procurement, inventory, production planning, quality and dispatch, integrated with Tally or SAP so stock and accounts reconcile.',
    signals: [
      'Stock in the system and stock on the floor disagree, so every plan starts with a physical count.',
      'Production is planned on a whiteboard and purchase is told when material has already run out.',
      'Quality records are on paper and cannot be traced back to a batch when a customer asks.',
    ],
    modules: [
      { icon: 'doc', title: 'Procurement', text: 'Indents, vendor quotes, purchase orders and goods receipts, with reorder levels that raise requests on their own.' },
      { icon: 'layers', title: 'Inventory and assets', text: 'Raw material, work in progress and finished goods by location and batch, plus tools and machines as assets.' },
      { icon: 'workflow', title: 'Production planning', text: 'Bills of material, work orders and schedules by line, with material availability checked before a job is released.' },
      { icon: 'check', title: 'Quality control', text: 'Inspection plans at inward, in-process and final stages, with results tied to the batch for traceability.' },
      { icon: 'truck', title: 'Dispatch', text: 'Sales orders to packing lists, invoices and e-way bills, with dispatch status visible to sales.' },
      { icon: 'chart', title: 'Costing and dashboards', text: 'Material and conversion cost by job, yield and rejection trends, and a daily view for the owner.' },
    ],
    flow: [
      { title: 'PO', text: 'Material is ordered against a plan, not a shortage.' },
      { title: 'Stock', text: 'Receipts update inventory by batch and location.' },
      { title: 'Produce', text: 'Work orders consume material and record output.' },
      { title: 'Dispatch', text: 'Finished goods leave with invoice and e-way bill.' },
      { title: 'Accounts', text: 'Purchases and sales post to Tally or SAP.' },
    ],
    integrations: ['Tally', 'SAP', 'e-invoicing and e-way bill', 'Barcode and QR scanners', 'Weighbridges', 'WhatsApp Business API'],
    faqs: [
      { q: 'We already use Tally. What does an ERP add?', a: 'Tally keeps the books. The ERP runs the operation that produces those entries — purchase, stores, production, quality and dispatch — and posts the results to Tally so the two always agree.' },
      { q: 'Can it start with one department?', a: 'Yes. Most projects begin with stores and purchase, then add production and quality once stock figures are trusted.' },
      { q: 'Does it support barcodes on the shop floor?', a: 'Yes. Material movement, work-order booking and dispatch can all be done by scanning, on handheld devices or phones.' },
    ],
  },
};
