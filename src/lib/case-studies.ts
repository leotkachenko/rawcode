export type CaseStudy = {
  slug: string;
  name: string;
  // Optional: client engagements have no public URL we can point at.
  url?: string;
  client?: string;
  image?: string;
  imageAlt?: string;
  summary: string;
  // What the client needed and why it was hard. ML entries are sourced from
  // Pavlo's project deck; no outcome claims here, those go in `metrics`.
  challenge?: string;
  whatWeBuilt: string[];
  // TODO: real engagement date range — confirm before publishing.
  timeline?: string;
  // TODO: verified stats only (traffic, conversion, etc.) — never estimate.
  metrics?: string[];
  // Who on the team delivered the work, when it wasn't the studio as a whole.
  credit?: string;
  // Slug of the team member named in `credit`, so the case study can link to /team.
  creditMember?: string;
  // Slug of the service line this project is an example of, so case studies and
  // service pages can link to each other.
  service?: string;
  // Greater Toronto Area client — listed on the Toronto pages. Confirmed with
  // Leo; InteraXon/Muse is deliberately not flagged (no sign-off to name it there).
  toronto?: boolean;
  // Raw Code still maintains the live product — confirmed with Leo, Oct 2026.
  maintained?: boolean;
  // Facts read off the client's live site, with the date they were checked.
  // Counts come from the site's public sitemap.xml — re-check before changing.
  liveSite?: {
    checked: string;
    pageCount: number;
    points: string[];
  };
  outcomeNote: string;
};

const UNVERIFIED_OUTCOME_NOTE =
  "Outcome metrics for this project haven't been independently verified yet — figures will be added here once confirmed rather than estimated.";

const CLIENT_REPORTED_OUTCOME_NOTE =
  "Figures here are as reported by the client engagement record — they haven't been independently verified by Raw Code.";

// Delivered by Pavlo before/alongside Raw Code; sourced from his project deck
// (Pavlo-Holubchykov_Data-Scientist.pptx) rather than from a Raw Code contract.
const PAVLO = {
  credit: "Delivered by Pavlo Holubchykov, Raw Code's Lead ML/AI Developer.",
  creditMember: "pavlo-holubchykov",
  service: "ai-automation",
};

const SITEMAPS_CHECKED = "2026-10-12";

export const caseStudies: CaseStudy[] = [
  {
    slug: "novelmaker",
    name: "NovelMaker",
    url: "https://novelmaker.co",
    image: "/case-studies/novelmaker.png",
    summary:
      "A consumer-facing bedtime-story generator app that produces personalized stories for kids.",
    whatWeBuilt: [
      "Consumer web app with an AI-backed story generation pipeline",
      "User-facing product design and onboarding flow",
      "Production deployment and hosting",
    ],
    service: "fixed-scope-builds",
    toronto: true,
    maintained: true,
    liveSite: {
      checked: SITEMAPS_CHECKED,
      pageCount: 174,
      points: [
        "Marketing and product pages published in 8 languages: English, French, Spanish, German, Polish, Turkish, Ukrainian, and Russian",
        "A blog section with its own sitemap, separate from the product pages",
      ],
    },
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "lumirank",
    name: "LumiRank",
    url: "https://lumirank.ca",
    image: "/case-studies/lumirank.png",
    summary:
      "A GEO / AI-search-visibility studio — its own site is a structural reference for the FAQ-block, entity-clarity, and citation-friendly content patterns we apply on SEO/GEO builds.",
    whatWeBuilt: [
      "Site architecture built around direct Q&A and entity clarity",
      "Structured data implementation for AI-answer-engine citation",
      "Content structure designed for both classic search and GEO",
    ],
    service: "seo-geo-website-builds",
    toronto: true,
    maintained: true,
    liveSite: {
      checked: SITEMAPS_CHECKED,
      pageCount: 125,
      points: [
        "An answers library of 21 single-question pages, each opening with a short answer before the detail",
        "Toronto-targeted service pages, including GEO agency, SEO agency, and local SEO in Toronto",
        "A glossary, comparison pages, and \"best of\" roundups that link back into the service pages",
      ],
    },
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "osobarenos",
    name: "Osoba Renos & Design",
    url: "https://osobarenos.ca",
    image: "/case-studies/osobarenos.jpg",
    summary:
      "A Mississauga renovation contractor serving the GTA, with strong local SEO: city landing pages, review aggregation, and service-plus-location interlinking.",
    whatWeBuilt: [
      "City-level local landing pages with service + location interlinking",
      "Review aggregation for local trust signals",
      "Local SEO structure across the service area",
    ],
    service: "seo-geo-website-builds",
    toronto: true,
    maintained: true,
    liveSite: {
      checked: SITEMAPS_CHECKED,
      pageCount: 182,
      points: [
        "Kitchen renovation pages for 18 GTA cities and neighbourhoods, from Ajax to Whitby, with matching bathroom, basement, and condo pages",
        "Project write-ups tied to the neighbourhood they were in, such as a North York condo and an Oakville main bathroom",
        "\"Near me\" hub pages for kitchen, bathroom, basement, and condo renovations",
        "Homeowner guides, such as a week-by-week bathroom renovation timeline and a 2026 Etobicoke permit guide",
      ],
    },
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "yadesign-studio",
    name: "YaDesign Studio",
    url: "https://yadesign.studio",
    image: "/case-studies/yadesign-studio.png",
    summary:
      "An interior design studio in Toronto and Los Angeles offering residential, commercial, and hospitality interiors, styling, and renovations.",
    // TODO: confirm actual scope of work with Leo before publishing — not yet on record.
    whatWeBuilt: [],
    service: "seo-geo-website-builds",
    toronto: true,
    maintained: true,
    liveSite: {
      checked: SITEMAPS_CHECKED,
      pageCount: 79,
      points: [
        "City pages for Toronto, Mississauga, Brampton, Markham, Vaughan, Richmond Hill, Oakville, Burlington, and Los Angeles",
        "Six service pages, from residential and hospitality interiors to virtual design consultations",
        "A four-step process section, a project portfolio, and a blog",
        "A Ukrainian-language version of the site alongside the English one",
      ],
    },
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "muse",
    name: "Muse",
    url: "https://choosemuse.com",
    client: "InteraXon",
    image: "/case-studies/muse.jpg",
    imageAlt: "The Muse EEG headband",
    summary:
      "Muse is InteraXon's consumer EEG headband and meditation app.",
    whatWeBuilt: [
      "Contracted engineering resources for cloud infrastructure and DevOps",
      "Backend and services development in Python and Go",
      "GCP-based deployment and infrastructure support",
    ],
    service: "staff-augmentation",
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "wienerberger-roof-tile-anomaly-detection",
    name: "Roof Tile Anomaly Detection",
    client: "Wienerberger",
    // Illustration from the project deck, not a photo of the client's line.
    image: "/case-studies/wienerberger-roof-tile-anomaly-detection.jpg",
    imageAlt: "Roof tiles moving through a factory line",
    summary:
      "Unsupervised computer-vision quality control that flags broken roof tiles on a high-volume factory line, trained from a sparse labelled dataset.",
    challenge:
      "Wienerberger's line produces roof tiles at high volume, and broken ones were caught by people watching the line. Labelled examples of defects were scarce, so a standard supervised classifier wasn't an option. The model had to learn what a sound tile looks like and flag anything that didn't fit.",
    whatWeBuilt: [
      "Unsupervised anomaly detection model in Python and PyTorch",
      "Vision Transformer feature extraction with One-Class SVM scoring",
      "Defect detection tuned for limited labelled data on a production line",
    ],
    ...PAVLO,
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "mtv-video-analysis",
    name: "Video Analysis Prototype",
    client: "MTV",
    summary:
      "A prototype that transcribes, summarizes, and analyzes large volumes of video content to generate metadata automatically.",
    challenge:
      "MTV has large volumes of video that need transcripts, summaries, and metadata before anyone can search or reuse them. The prototype tested whether that work could run without people doing it by hand: transcribe the audio with WhisperX, then summarize and analyze the text with the ChatGPT API.",
    whatWeBuilt: [
      "Speech-to-text pipeline built on WhisperX",
      "Summarization and contextual analysis via the ChatGPT API",
      "FastAPI backend containerized with Docker and deployed on Azure",
    ],
    ...PAVLO,
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "real-time-queue-monitoring",
    name: "Real-Time People Monitoring & Queue Management",
    summary:
      "A real-time vision system that tracks people in a hall or public space and separates general occupancy from the people actually standing in a queue.",
    challenge:
      "In a busy hall, a headcount isn't the number that matters. Staff need to know how many people are actually waiting in line, not just standing nearby. The system splits the space into configurable zones so queue length and general occupancy are counted separately, as it happens.",
    whatWeBuilt: [
      "Zone-based detection with configurable queue and occupancy areas",
      "YOLO-based person detection and counting in Python and OpenCV",
      "Real-time crowd metrics for staffing and queue-management decisions",
    ],
    ...PAVLO,
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "darnytsia-rag-chatbots",
    name: "Retrieval-Augmented Generation Chatbots",
    client: "Darnytsia",
    // Illustration from the project deck, not a screenshot of the client's bot.
    image: "/case-studies/darnytsia-rag-chatbots.jpg",
    imageAlt: "A chatbot interface on a phone screen",
    summary:
      "Context-aware chatbots that combine ChatGPT with a retrieval layer so answers are grounded in the client's own reference material.",
    challenge:
      "A general-purpose chatbot answers from whatever the model already knows. Darnytsia needed answers that matched its own reference material, so the bots look up the relevant source documents first and answer from those.",
    whatWeBuilt: [
      "Python backend combining NLP with retrieval-augmented generation",
      "Retrieval layer for real-time access to source documents",
      "Dockerized deployment on Azure App Service",
    ],
    ...PAVLO,
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "kormotech-teams-translator-bot",
    name: "Microsoft Teams File Translator Bot",
    client: "Kormotech",
    summary:
      "A Teams chatbot that translates PDF and DOCX files in place while preserving the original layout and formatting.",
    challenge:
      "Translating a PDF or Word file usually means leaving Teams, pasting text into another tool, and rebuilding the layout afterwards. Kormotech's bot does it in Teams: send a file, get it back translated with its formatting intact, including text inside images.",
    whatWeBuilt: [
      "Teams bot on the Microsoft Bot Framework and Azure Bot Service",
      "Translation via the ChatGPT API with OCR for text in images",
      "Layout analysis to keep document structure intact through translation",
    ],
    ...PAVLO,
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "tietoevry-speech-face-recognition",
    name: "Speech & Face Recognition R&D",
    client: "TietoEvry",
    summary:
      "Research and development work on speech synthesis and recognition, plus deep-learning face recognition backed by a vector database.",
    challenge:
      "This was research and development rather than one product. The work compared approaches to speech synthesis and recognition, then improved face recognition with deep-learning embeddings stored in a vector database, running Milvus on Kubernetes so it could scale.",
    whatWeBuilt: [
      "Research into speech synthesis and recognition methods",
      "Face recognition improvements using deep learning and vector search",
      "Milvus vector DB running on Kubernetes with automated pipelines",
    ],
    ...PAVLO,
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "war-of-words-video-transcription",
    name: "Multilingual Video Transcription System",
    client: "War of Words",
    summary:
      "A multilingual transcription and search system that turns raw video into diarized, translated, searchable transcripts.",
    challenge:
      "War of Words works with video in several languages. The system turns raw footage into transcripts that show who is speaking, translates them into English, and makes the audio searchable by similarity, so relevant segments can be found across languages.",
    whatWeBuilt: [
      "AzureML transcription pipeline using WhisperX with PyAnnote diarization",
      "MongoDB vector database for similarity search over audio embeddings",
      "Automated English translation through the ChatGPT API",
    ],
    ...PAVLO,
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "jera-time-series-forecasting",
    name: "Time Series Forecasting & Automation",
    client: "Jera",
    summary:
      "Forecasting models for electricity consumption and anomalies, wired into automated training and serving pipelines.",
    challenge:
      "Forecasting electricity consumption means combining weather, historical usage, and other outside factors, and forecasts go stale unless the models keep learning. The work covered the models and the Kubeflow pipelines that collect data, train, serve, and retrain them on a schedule.",
    whatWeBuilt: [
      "Consumption and anomaly forecasting from weather, historical usage, and external factors",
      "Kubeflow pipelines for data collection, training, serving, and retraining",
      "Scheduled retraining so forecasts stay current without manual work",
    ],
    metrics: ["20% increase in economic efficiency for electricity generation"],
    ...PAVLO,
    outcomeNote: CLIENT_REPORTED_OUTCOME_NOTE,
  },
  {
    slug: "skanska-ticket-classification",
    name: "Ticket Classification NLP",
    client: "Skanska",
    summary:
      "NLP models that read incoming service tickets and route them to the right team automatically, replacing manual triage.",
    challenge:
      "Skanska's service tickets were sorted by hand. At high volume that meant misrouted tickets and slower fixes. The goal was to read each incoming ticket and send it to the right team automatically.",
    whatWeBuilt: [
      "NLP classification models for service ticket content",
      "ServiceNow API integration for real-time routing",
      "Serverless execution on Azure Functions",
    ],
    metrics: [
      "~90% of human classification errors eliminated",
      "50% faster ticket processing",
    ],
    ...PAVLO,
    outcomeNote: CLIENT_REPORTED_OUTCOME_NOTE,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((project) => project.slug === slug);
}

export function caseStudiesByService(serviceSlug: string): CaseStudy[] {
  return caseStudies.filter((project) => project.service === serviceSlug);
}

export function torontoCaseStudies(): CaseStudy[] {
  return caseStudies.filter((project) => project.toronto);
}

export function caseStudiesByMember(memberSlug: string): CaseStudy[] {
  return caseStudies.filter((project) => project.creditMember === memberSlug);
}
