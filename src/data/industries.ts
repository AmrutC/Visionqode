/**
 * Industry stories — taken from the four platforms described on the existing
 * site. Metrics that could not be verified have been removed; `proof` holds a
 * placeholder the company must approve before publishing.
 */
export interface Industry {
  slug: string;
  name: string;
  headline: string;
  text: string;
  points: string[];
  shortName: string;
  schematic: { nodes: string[]; status: string };
  services: string[];
}

export const industries: Industry[] = [
  {
    slug: 'logistics',
    shortName: 'Logistics',
    name: 'Logistics & container yards',
    headline: 'A single operating picture from container to customer.',
    text: 'Yard management, gate automation, fleet and trip tracking, repair estimates and billing — connected to accounting and to the customer\'s own systems.',
    points: ['Gate-in / gate-out and container handling automation', 'Live trip and shipment status across every touchpoint', 'Invoices posted to Tally with e-invoicing'],
    schematic: { nodes: ['Gate-in', 'Survey', 'Repair', 'Invoice', 'Tally'], status: 'Container released · invoice posted' },
    services: ['custom-software-erp', 'api-integration', 'ai-automation'],
  },
  {
    slug: 'real-estate',
    shortName: 'Real estate',
    name: 'Real estate & construction',
    headline: 'The whole project in one ERP — from booking to possession.',
    text: 'Inventory, bookings and payment milestones on one side; procurement, site progress and cost tracking on the other; RERA compliance across both.',
    points: ['Bookings, demand letters and payment milestones', 'Procurement with three-way matching', 'Site progress and cost variance for the director\'s phone'],
    schematic: { nodes: ['Booking', 'Milestone', 'Procure', 'Progress', 'RERA'], status: 'Slab 6 · demand letters sent' },
    services: ['custom-software-erp', 'process-automation', 'website-design'],
  },
  {
    slug: 'professional-services',
    shortName: 'Compliance',
    name: 'CA, CS & professional services',
    headline: 'Compliance that moves without chasing.',
    text: 'Clients upload once. Documents are verified by OCR and language models, filings move through GST, income-tax and ROC pipelines, approvals and signatures happen in-flow.',
    points: ['AI document verification and OCR', 'GST · ITR · ROC filing pipelines', 'Approval workflows with digital signatures'],
    schematic: { nodes: ['Upload', 'Verify', 'File', 'Sign', 'Client'], status: 'Client notified · filing complete' },
    services: ['ai-automation', 'process-automation', 'custom-software-erp'],
  },
  {
    slug: 'retail-ecommerce',
    shortName: 'Retail',
    name: 'Retail & e-commerce',
    headline: 'Storefront, warehouse, delivery and reviews in one automated journey.',
    text: 'Headless storefronts with Razorpay checkout, order orchestration to the warehouse, Shiprocket or Delhivery dispatch with live rider updates, and post-delivery review and loyalty flows.',
    points: ['Order → pack → dispatch, fully orchestrated', 'Live rider tracking with customer notifications', 'Post-delivery review and loyalty automation'],
    schematic: { nodes: ['Order', 'Pack', 'Dispatch', 'Review', 'Loyalty'], status: 'Delivered · review requested' },
    services: ['website-design', 'web-mobile-apps', 'api-integration'],
  },
  {
    slug: 'healthcare-education',
    shortName: 'Healthcare',
    name: 'Healthcare & education',
    headline: 'Hospital and school systems that staff adopt.',
    text: 'Hospital management — OPD, IPD, pharmacy, billing — and school ERPs for admissions, fees, attendance and parent communication, with WhatsApp reminders built in.',
    points: ['Hospital management with billing and pharmacy', 'School ERP with fees, attendance and parent app', 'WhatsApp reminders and reports'],
    schematic: { nodes: ['Admit', 'Treat', 'Bill', 'Follow-up', 'Records'], status: 'Discharge summary shared' },
    services: ['custom-software-erp', 'web-mobile-apps', 'process-automation'],
  },
  {
    slug: 'manufacturing',
    shortName: 'Manufacturing',
    name: 'Manufacturing',
    headline: 'From purchase order to dispatch, with stock that reconciles.',
    text: 'Manufacturing ERP covering procurement, inventory, production planning, quality and dispatch — integrated with Tally or SAP for accounts.',
    points: ['Inventory and asset management', 'Production planning and QC', 'Accounting integration'],
    schematic: { nodes: ['PO', 'Stock', 'Produce', 'Dispatch', 'Accounts'], status: 'Batch cleared QC' },
    services: ['custom-software-erp', 'api-integration', 'ai-automation'],
  },
];
