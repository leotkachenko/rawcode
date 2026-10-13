// Page-specific content for /services/ai-automation. Everything shared with the
// other service pages (price, process, FAQs) stays in services.ts.

export type PainPoint = {
  title: string;
  example: string;
};

export type UseCase = {
  title: string;
  trigger: string;
  action: string;
  output: string;
  // Slug of a case study that shows this kind of work, when there is one.
  example?: string;
};

export const painPoints: PainPoint[] = [
  {
    title: "Retyping data between systems",
    example:
      "Someone copies invoice totals from PDFs into the accounting system every week. It takes hours, and the typos turn up at month-end.",
  },
  {
    title: "Reading every message just to sort it",
    example:
      "A shared inbox or helpdesk where a person reads each email or ticket only to decide who should handle it. When volume spikes, messages sit or land with the wrong team.",
  },
  {
    title: "Reports built by hand",
    example:
      "Every Monday someone exports from three tools, pastes it all into a spreadsheet, and writes the same summary as last week with new numbers.",
  },
  {
    title: "Answers buried in documents",
    example:
      "Staff ask the same questions about policies and procedures because the answers sit in long PDFs and shared drives that nobody can search well.",
  },
];

export const useCases: UseCase[] = [
  {
    title: "Invoice and document extraction",
    trigger: "A PDF invoice, receipt, or form lands in an inbox or shared folder.",
    action:
      "The AI reads it, pulls out supplier, dates, line items, and totals, and flags any field it isn't sure about.",
    output:
      "A new row in your accounting system or spreadsheet, with uncertain fields queued for a person to check.",
  },
  {
    title: "Email and ticket triage",
    trigger: "A new email or support ticket arrives.",
    action: "The AI reads it, labels the topic and urgency, and picks the team that should own it.",
    output: "The ticket lands in the right queue, often with a draft reply attached.",
    example: "skanska-ticket-classification",
  },
  {
    title: "CRM lead enrichment and routing",
    trigger: "Someone fills in your contact form or a new lead appears in HubSpot or Salesforce.",
    action:
      "The automation looks up company details from sources you approve and checks fit against your criteria.",
    output: "An enriched CRM record, assigned to the right rep, with a Slack or email alert.",
  },
  {
    title: "Internal knowledge-base assistant",
    trigger: "A staff member asks a question in Slack, Teams, or a web chat.",
    action:
      "The AI searches your own documents first and answers from them (retrieval-augmented generation), saying so when it can't find the answer.",
    output: "A short answer with links to the source documents.",
    example: "darnytsia-rag-chatbots",
  },
  {
    title: "Scheduled report generation",
    trigger: "A schedule, such as Monday morning or month-end.",
    action:
      "Code pulls the numbers from your systems and does the math. The AI writes the plain-language summary.",
    output: "A finished report in your inbox, a Google Doc, or a Slack channel.",
  },
  {
    title: "Meeting notes to tasks",
    trigger: "A meeting recording or transcript is saved.",
    action: "The AI transcribes and summarizes it, then pulls out action items and owners.",
    output: "A summary emailed to attendees and tasks created in your project tool.",
    example: "mtv-video-analysis",
  },
  {
    title: "Document translation",
    trigger: "Someone sends a PDF or Word file to a chat bot.",
    action: "The AI translates the text, including text inside images, and rebuilds the layout.",
    output: "The translated file, sent back in the same chat with its formatting intact.",
    example: "kormotech-teams-translator-bot",
  },
  {
    title: "Data entry and reconciliation",
    trigger: "A new order, export, or bank statement arrives.",
    action:
      "Code matches records across systems. The AI handles the messy free-text fields that rules can't.",
    output: "Matched records synced automatically, and a short list of mismatches for a person to review.",
  },
];

// The before/after example. Steps are restated from the case study's own
// `challenge` and `whatWeBuilt` fields; results come straight from its `metrics`.
export const beforeAfter = {
  caseStudy: "skanska-ticket-classification",
  before: [
    "A service ticket comes in.",
    "A person reads it and decides which team should handle it.",
    "At high volume, some tickets go to the wrong team, and fixes take longer.",
  ],
  after: [
    "A service ticket comes in.",
    "An NLP model reads the ticket content and picks the team.",
    "The ticket is routed in real time through the ServiceNow API, running on Azure Functions.",
  ],
};

export const integrations: string[] = [
  "Google Workspace (Gmail, Drive, Sheets, Docs)",
  "Microsoft 365 (Outlook, Teams, SharePoint, Excel)",
  "Slack",
  "HubSpot and Salesforce",
  "ServiceNow and other helpdesks",
  "Zapier, Make, and n8n",
  "Custom APIs and databases",
];

export const securityPoints: string[] = [
  "Least-privilege access: the automation gets only the permissions it needs, and you can revoke them at any time.",
  "We don't use your data to train models.",
  "Your data stays in your own accounts and cloud wherever possible, and we tell you up front which third-party services will process it.",
  "We work with GDPR, PIPEDA, and Quebec Law 25 in mind.",
  "A person reviews anything high-stakes, such as payments, customer-facing replies, or decisions about people, before it goes out.",
];
