export type CaseStudy = {
  slug: string;
  name: string;
  // Optional: client engagements have no public URL we can point at.
  url?: string;
  client?: string;
  image?: string;
  imageAlt?: string;
  summary: string;
  whatWeBuilt: string[];
  // TODO: real engagement date range — confirm before publishing.
  timeline?: string;
  // TODO: verified stats only (traffic, conversion, etc.) — never estimate.
  metrics?: string[];
  // Who on the team delivered the work, when it wasn't the studio as a whole.
  credit?: string;
  // Slug of the team member named in `credit`, so the case study can link to /team.
  creditMember?: string;
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
};

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
    outcomeNote: UNVERIFIED_OUTCOME_NOTE,
  },
  {
    slug: "osobarenos",
    name: "Osobar Enos",
    url: "https://osobarenos.ca",
    image: "/case-studies/osobarenos.jpg",
    summary:
      "A Toronto renovation contractor with strong local/geo-page SEO: city-level landing pages, review aggregation, and service-plus-location interlinking.",
    whatWeBuilt: [
      "City-level local landing pages with service + location interlinking",
      "Review aggregation for local trust signals",
      "Local SEO structure across the service area",
    ],
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

export function caseStudiesByMember(memberSlug: string): CaseStudy[] {
  return caseStudies.filter((project) => project.creditMember === memberSlug);
}
