import type { Faq } from "./services";
import { getServiceBySlug } from "./services";

// Toronto specialty pages: one query each, picked where search results are weak
// and we have a written-up project to point at. Every pattern links to the case
// study it's drawn from, so each claim can be checked there.
export type SolutionPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  // Short label for the footer's "In Toronto" row.
  navLabel: string;
  serviceType: string;
  parentService: string;
  lede: string;
  intro: string;
  projectsHeading: string;
  projectSlugs: string[];
  patternsHeading: string;
  patterns: { title: string; detail: string; slug: string }[];
  // Shown when the projects weren't all delivered under Raw Code; links to the
  // credited person's entry on /team.
  credit?: { text: string; memberSlug: string };
  faqs: Faq[];
  cta: { title: string; detail: string };
};

const price = (slug: string) => getServiceBySlug(slug)?.priceSignal ?? "scoped per project";

const PAVLO_CREDIT = {
  text: "These projects were built by Pavlo Holubchykov, Raw Code's Lead ML/AI Developer, some of them before Raw Code was founded.",
  memberSlug: "pavlo-holubchykov",
};

export const solutionPages: SolutionPage[] = [
  {
    path: "/ai-chatbot-development-toronto",
    title: "AI Chatbot Development Toronto: RAG & Teams Bots",
    description:
      "AI chatbot development in Toronto: bots that answer from your own documents, run inside Microsoft Teams, and route requests. Built by our ML lead in Python.",
    h1: "AI Chatbot Development in Toronto",
    navLabel: "AI chatbots",
    serviceType: "AI chatbot development",
    parentService: "ai-automation",
    lede: "A chatbot that makes things up is worse than no chatbot. The ones we build look up the answer in your own documents first, then reply from what they found.",
    intro:
      "That approach is called retrieval-augmented generation, or RAG. Below are three projects our ML lead has shipped: a document-grounded assistant, a translation bot that lives in Microsoft Teams, and a model that reads service tickets and sends them to the right team.",
    projectsHeading: "Chatbot and language projects",
    projectSlugs: [
      "darnytsia-rag-chatbots",
      "kormotech-teams-translator-bot",
      "skanska-ticket-classification",
    ],
    patternsHeading: "What these bots do differently",
    patterns: [
      {
        title: "Answers that come from your documents",
        detail:
          "Darnytsia's chatbots pair the ChatGPT API with a retrieval layer over the company's own reference material. A Python backend finds the relevant passages, and the model writes its reply from them. It runs in Docker on Azure App Service.",
        slug: "darnytsia-rag-chatbots",
      },
      {
        title: "Inside the tools your team already uses",
        detail:
          "Kormotech's bot sits in Microsoft Teams. Staff send it a PDF or Word file and get it back translated with the layout intact, including text inside images, which is read with OCR. It's built on the Microsoft Bot Framework and Azure Bot Service.",
        slug: "kormotech-teams-translator-bot",
      },
      {
        title: "Routing, not just answering",
        detail:
          "Not every language problem needs a chat window. For Skanska, NLP models read each incoming service ticket and route it through the ServiceNow API, running on Azure Functions. The client reported about 90% fewer classification errors and 50% faster processing.",
        slug: "skanska-ticket-classification",
      },
    ],
    credit: PAVLO_CREDIT,
    faqs: [
      {
        question: "What is a RAG chatbot?",
        answer:
          "RAG stands for retrieval-augmented generation. Before answering, the bot searches your documents for the passages that matter, and the language model writes its reply from those passages. That cuts down on invented answers and lets the bot point to where an answer came from.",
      },
      {
        question: "How much does a custom AI chatbot cost in Toronto?",
        answer: `Chatbots fall under our AI automation work, which runs ${price("ai-automation")}. A bot over one set of documents sits at the low end; one wired into several internal systems costs more. You get a fixed quote before the build starts.`,
      },
      {
        question: "Can the chatbot run in Microsoft Teams?",
        answer:
          "Yes. The Kormotech translation bot runs in Teams on the Microsoft Bot Framework and Azure Bot Service, so staff use it without opening another tool.",
      },
      {
        question: "Will the chatbot ever give a wrong answer?",
        answer:
          "Sometimes, yes. Retrieval makes wrong answers rarer but doesn't remove them. Anyone promising zero errors is overselling. We test against real questions from your team before launch and show you where it still gets things wrong.",
      },
      {
        question: "Where does our data go?",
        answer:
          "That's settled during scoping, before anything is built. The projects on this page ran on Microsoft Azure. We'll tell you which model provider and hosting a bot uses so you can check it against your own privacy obligations.",
      },
    ],
    cta: {
      title: "Have documents your team keeps asking about?",
      detail: "Bring a few real questions to a free call and we'll tell you what a bot over them would take.",
    },
  },
  {
    path: "/computer-vision-development-toronto",
    title: "Custom Computer Vision Development Toronto",
    description:
      "Custom computer vision for Toronto businesses: defect detection on production lines and real-time people counting, built by our ML lead in PyTorch and YOLO.",
    h1: "Computer Vision Development in Toronto",
    navLabel: "Computer vision",
    serviceType: "Computer vision development",
    parentService: "ai-automation",
    lede: "Off-the-shelf vision software is built for someone else's line. We build the model for yours, trained on your cameras and your data, even when you only have a handful of labelled defects.",
    intro:
      "Our ML lead has shipped vision systems for factory quality control, real-time queue monitoring, and face recognition backed by a vector database. Here's what each one does and how it was built.",
    projectsHeading: "Computer vision projects",
    projectSlugs: [
      "wienerberger-roof-tile-anomaly-detection",
      "real-time-queue-monitoring",
      "tietoevry-speech-face-recognition",
    ],
    patternsHeading: "Three problems, three approaches",
    patterns: [
      {
        title: "Defect detection with very few labelled examples",
        detail:
          "Wienerberger had too few labelled broken tiles to train a normal classifier. So the model learned what a sound roof tile looks like, using Vision Transformer features scored by a One-Class SVM in PyTorch, and flags anything that doesn't match.",
        slug: "wienerberger-roof-tile-anomaly-detection",
      },
      {
        title: "Counting the people who matter",
        detail:
          "A headcount doesn't tell staff how long the line is. The queue system uses YOLO and OpenCV to detect people, then splits the space into configurable zones so people waiting in line are counted separately from everyone else in the hall.",
        slug: "real-time-queue-monitoring",
      },
      {
        title: "Recognition at scale",
        detail:
          "For TietoEvry, face recognition was improved with deep-learning embeddings stored in a Milvus vector database. Milvus ran on Kubernetes with automated pipelines so the system could scale.",
        slug: "tietoevry-speech-face-recognition",
      },
    ],
    credit: PAVLO_CREDIT,
    faqs: [
      {
        question: "How much labelled data do we need?",
        answer:
          "For defect detection, often less than you'd expect. The Wienerberger model was trained mainly on normal tiles and flags anything that looks different, so it didn't need a large library of labelled defects.",
      },
      {
        question: "How much does a computer vision project cost?",
        answer: `It's quoted against a written scope after a short scoping call, because a proof of concept on recorded footage and a system running live on a factory line are different jobs. For reference, our AI automation projects run ${price("ai-automation")}.`,
      },
      {
        question: "What tools do you build with?",
        answer:
          "Python throughout, with PyTorch for model training, YOLO and OpenCV for detection, and Vision Transformers for feature extraction. Deployment has run on Docker, Kubernetes, and Azure.",
      },
      {
        question: "What about privacy when cameras watch people?",
        answer:
          "Counting or recognizing people can involve personal information under Canadian privacy law. Whether video is stored, for how long, and where are decided at scoping. Check them against your own obligations before anything goes live.",
      },
    ],
    cta: {
      title: "Got footage of the problem?",
      detail: "Send a sample and we'll tell you on a free call whether a model can catch it.",
    },
  },
  {
    path: "/contractor-website-design-toronto",
    title: "Contractor Website Design Toronto: City Pages",
    description:
      "Contractor website design in Toronto: a page for each service and city you cover, plus project write-ups and cost guides. One client's site has 182 pages.",
    h1: "Contractor Website Design in Toronto",
    navLabel: "Contractor websites",
    serviceType: "Contractor website design",
    parentService: "seo-geo-website-builds",
    lede: "Homeowners don't search for \"contractor.\" They search for \"kitchen renovation etobicoke\" or \"basement renovation cost.\" A contractor site needs a page that answers each one.",
    intro:
      "We built and still maintain the site for Osoba Renos & Design, a Mississauga renovation company working across the GTA. As of October 2026 it has 182 pages. Here's what they are and why each type exists.",
    projectsHeading: "Renovation and interior design sites we maintain",
    projectSlugs: ["osobarenos", "yadesign-studio"],
    patternsHeading: "The pages a renovation contractor's site needs",
    patterns: [
      {
        title: "Service pages for every city you work in",
        detail:
          "Osoba's site has service-plus-city pages for more than 20 GTA cities and neighbourhoods. Kitchen renovation alone covers 18 of them, from Ajax to Whitby. Each page is about one job in one place, which is how homeowners search.",
        slug: "osobarenos",
      },
      {
        title: "\"Near me\" hubs",
        detail:
          "Five hub pages, for kitchen, bathroom, basement, and condo renovations and renovation contractors in general, catch \"near me\" searches for each type of job.",
        slug: "osobarenos",
      },
      {
        title: "Project write-ups tied to a neighbourhood",
        detail:
          "51 project pages, most named for where the job was, like a North York condo or an Oakville main bathroom. They prove the work and give each neighbourhood its own local page.",
        slug: "osobarenos",
      },
      {
        title: "Cost and permit guides",
        detail:
          "Separate cost pages for kitchens, bathrooms, basements, condos, and full-home renovations, plus guides such as a week-by-week bathroom timeline and a 2026 Etobicoke permit guide. These answer the questions homeowners ask before they call.",
        slug: "osobarenos",
      },
    ],
    faqs: [
      {
        question: "How much does a contractor website cost in Toronto?",
        answer: `A full SEO/GEO contractor site is ${price("seo-geo-website-builds").toLowerCase()}: it depends on how many services and cities you cover. A single landing page fits our Small Builds tier at ${price("small-builds")}. Either way the quote is fixed before work starts.`,
      },
      {
        question: "Which pages should a renovation contractor's website have?",
        answer:
          "At minimum: one page per service, one page per service in each city you work in, a few \"near me\" hubs, project write-ups with the neighbourhood named, and cost guides for your main services. That's the structure behind the 182-page Osoba Renos & Design site.",
      },
      {
        question: "Can you add new cities or services after launch?",
        answer:
          "Yes. We still maintain the Osoba Renos & Design site, and new city pages, projects, and guides keep being added as ongoing work.",
      },
      {
        question: "Do you only build for renovation companies?",
        answer:
          "No. Our contractor work so far is in renovation and interior design, but the same page structure applies to any trade that works across several cities.",
      },
      {
        question: "Will a new website get me more leads?",
        answer:
          "We can't promise that, and you should be wary of anyone who does. We build the structure search engines and AI answer engines rely on, then report what actually happens after launch.",
      },
    ],
    cta: {
      title: "Tell us your services and the cities you work in",
      detail: "On a free call we'll map out which pages your site needs and what it costs.",
    },
  },
  {
    path: "/speech-to-text-development-toronto",
    title: "Speech-to-Text Development Toronto: Transcription",
    description:
      "Custom speech-to-text development in Toronto: transcripts with speaker labels, translation, and searchable audio, built by our ML lead on WhisperX and Azure.",
    h1: "Speech-to-Text Development in Toronto",
    navLabel: "Speech-to-text",
    serviceType: "Speech-to-text development",
    parentService: "ai-automation",
    lede: "A transcription app gives you a text file. The speech systems our ML lead builds go further: who said what, an English translation, and a way to find the part of the recording you need.",
    intro:
      "Below are three speech projects: a video analysis prototype for MTV, a multilingual transcription and search system for War of Words, and speech research for TietoEvry.",
    projectsHeading: "Speech and audio projects",
    projectSlugs: [
      "war-of-words-video-transcription",
      "mtv-video-analysis",
      "tietoevry-speech-face-recognition",
    ],
    patternsHeading: "What goes into a speech pipeline",
    patterns: [
      {
        title: "Transcripts that show who's speaking",
        detail:
          "War of Words' pipeline runs on AzureML. WhisperX turns speech into text, and PyAnnote adds speaker diarization, so the transcript marks where one speaker stops and the next starts.",
        slug: "war-of-words-video-transcription",
      },
      {
        title: "Translation in the same pipeline",
        detail:
          "The same system translates transcripts into English through the ChatGPT API, with prompts written to keep each passage's context. Translation isn't a separate step someone runs afterwards.",
        slug: "war-of-words-video-transcription",
      },
      {
        title: "Finding the right segment",
        detail:
          "Audio embeddings sit in a MongoDB vector database, so staff can search for segments similar to the one they have, across languages, instead of scrubbing through hours of video.",
        slug: "war-of-words-video-transcription",
      },
      {
        title: "From transcript to metadata",
        detail:
          "For MTV, the prototype transcribed video with WhisperX, then used the ChatGPT API to summarize and analyze the text and produce metadata automatically. It ran as a FastAPI backend in Docker on Azure.",
        slug: "mtv-video-analysis",
      },
    ],
    credit: PAVLO_CREDIT,
    faqs: [
      {
        question: "What is speaker diarization?",
        answer:
          "Diarization labels which speaker said each part of a recording. A plain transcript runs everyone together; a diarized one splits it by speaker. The War of Words system uses PyAnnote for this.",
      },
      {
        question: "Which languages can it transcribe?",
        answer:
          "Whisper-based models cover dozens of languages, but accuracy depends on the language and the audio quality. The War of Words system handles video in several languages and translates the transcripts into English. We test on a sample of your recordings before quoting.",
      },
      {
        question: "How much does custom speech-to-text cost?",
        answer: `Speech projects fall under our AI automation work, which runs ${price("ai-automation")}. A transcription pipeline over one source is at the low end; adding diarization, translation, and search moves it up.`,
      },
      {
        question: "Can the audio stay on our own servers?",
        answer:
          "Transcription can. WhisperX is open-source and can run on infrastructure you control. Steps like translation through the ChatGPT API send text to a third party. Where each step runs is decided at scoping, before anything is built.",
      },
      {
        question: "Are recordings of people personal information?",
        answer:
          "They can be, under Canadian privacy laws such as PIPEDA and Quebec's Law 25. What gets stored, for how long, and who can search it should be checked against your own obligations before the system goes live.",
      },
    ],
    cta: {
      title: "Have a pile of recordings nobody has time to go through?",
      detail: "Send a short sample and we'll tell you on a free call what a pipeline for it would take.",
    },
  },
  {
    path: "/interior-designer-website-design-toronto",
    title: "Interior Designer Website Design Toronto",
    description:
      "Website design for Toronto interior designers: portfolio, service, and city pages, a process section, and a blog. One studio's site we maintain has 79 pages.",
    h1: "Interior Designer Website Design in Toronto",
    navLabel: "Interior designer websites",
    serviceType: "Interior designer website design",
    parentService: "seo-geo-website-builds",
    lede: "An interior design site gets judged on its photos but found through its pages. Someone searching \"condo interior design toronto\" needs a page about exactly that, not a homepage slideshow.",
    intro:
      "We maintain the site for YaDesign Studio, an interior design studio in Toronto and Los Angeles. As of October 2026 it has 79 pages, in English and Ukrainian.",
    projectsHeading: "Interior design site we maintain",
    projectSlugs: ["yadesign-studio"],
    patternsHeading: "What's on an interior designer's site that gets found",
    patterns: [
      {
        title: "A page for each kind of project",
        detail:
          "YaDesign has separate Toronto pages for condo, kitchen, bathroom, luxury, and home renovation interior design, plus a cost page and a consultation page. Each one matches a search people type.",
        slug: "yadesign-studio",
      },
      {
        title: "One page for every city you take clients in",
        detail:
          "Toronto, Mississauga, Brampton, Markham, Vaughan, Richmond Hill, Oakville, and Burlington each get their own page, and so does Los Angeles for the studio's second market.",
        slug: "yadesign-studio",
      },
      {
        title: "Projects with their own pages",
        detail:
          "Five portfolio projects each have a page of their own instead of sitting in a single gallery, so every project can be linked to, shared, and found.",
        slug: "yadesign-studio",
      },
      {
        title: "Services and process spelled out",
        detail:
          "Six service pages, from residential to hospitality interiors and virtual consultations, and a four-step process section covering discovery, concept, design, and delivery.",
        slug: "yadesign-studio",
      },
      {
        title: "A blog that answers what clients ask",
        detail:
          "Posts cover questions like how much interior design costs, 2026 colour trends, and the Interior Design Show Toronto: the questions people look up before hiring a designer.",
        slug: "yadesign-studio",
      },
    ],
    faqs: [
      {
        question: "How much does a website for an interior designer cost?",
        answer: `A full SEO/GEO site is ${price("seo-geo-website-builds").toLowerCase()}, depending on how many services, cities, and projects it covers. A single portfolio landing page fits our Small Builds tier at ${price("small-builds")}. The quote is fixed before work starts.`,
      },
      {
        question: "Which pages should an interior designer's website have?",
        answer:
          "A page per service, a page per type of project you take on, a page for each city you work in, a page for each portfolio project, a short process section, and a cost page. That's the shape of the YaDesign Studio site.",
      },
      {
        question: "Can the site be in more than one language?",
        answer:
          "Yes. YaDesign Studio runs a Ukrainian version beside the English one, each under its own URLs.",
      },
      {
        question: "Does each portfolio project need its own page?",
        answer:
          "It helps. A project on its own page can carry its own title, photos, and description, and can be linked to directly. Projects tucked into one gallery can't. YaDesign Studio gives each of its five projects a page.",
      },
    ],
    cta: {
      title: "Tell us what you design and where",
      detail: "On a free call we'll sketch out the pages your site needs and what it costs.",
    },
  },
  {
    path: "/multilingual-website-development-toronto",
    title: "Multilingual Website Development Toronto",
    description:
      "Multilingual website development in Toronto: separate URLs and hreflang tags for every language. One app site we maintain runs in 8, from French to Ukrainian.",
    h1: "Multilingual Website Development in Toronto",
    navLabel: "Multilingual websites",
    serviceType: "Multilingual website development",
    parentService: "seo-geo-website-builds",
    lede: "A translate button isn't a multilingual site. Search engines index a language properly when it has its own URLs, its own titles, and tags saying which version is which.",
    intro:
      "NovelMaker, a bedtime-story app we built and maintain, publishes its site in 8 languages. YaDesign Studio, a Toronto interior design studio whose site we maintain, runs Ukrainian beside English.",
    projectsHeading: "Multilingual sites we maintain",
    projectSlugs: ["novelmaker", "yadesign-studio"],
    patternsHeading: "How a multilingual site is put together",
    patterns: [
      {
        title: "Its own URLs for every language",
        detail:
          "NovelMaker's pages live under /en, /fr, /es, /de, /pl, /tr, /uk, and /ru, with about 20 pages in each language. Google can index the French site as a French site.",
        slug: "novelmaker",
      },
      {
        title: "hreflang tags on every page",
        detail:
          "NovelMaker's pages carry hreflang tags for all 8 language versions plus an x-default, which tell search engines which version to show a searcher in which language.",
        slug: "novelmaker",
      },
      {
        title: "A second language for a local business",
        detail:
          "Not every site needs 8 languages. YaDesign Studio runs a Ukrainian version of its main pages under /uk, beside the English site.",
        slug: "yadesign-studio",
      },
    ],
    faqs: [
      {
        question: "What is hreflang?",
        answer:
          "hreflang is a tag in a page's code that lists the other language versions of that page. Search engines use it to show French speakers the French page and English speakers the English one, instead of treating the translations as duplicate content.",
      },
      {
        question: "Do I need a French version if I sell in Quebec?",
        answer:
          "Possibly. Quebec's Charter of the French Language sets requirements for commercial content aimed at Quebec customers. Check your situation with a lawyer; we can build the French side either way.",
      },
      {
        question: "Who does the translation?",
        answer:
          "That's agreed at scoping. You can supply translations or use a translation agency, and we build the site so each language is easy to update on its own.",
      },
      {
        question: "How much does a multilingual website cost?",
        answer: `It's ${price("seo-geo-website-builds").toLowerCase()}: the main driver is how many pages each language has, not the number of languages alone. The quote is fixed before work starts.`,
      },
    ],
    cta: {
      title: "Which languages do your customers speak?",
      detail: "On a free call we'll work out the URL structure and what each language adds to the cost.",
    },
  },
  {
    path: "/mvp-development-toronto",
    title: "MVP Development Toronto: Fixed-Price Builds",
    description: `MVP development in Toronto with the price fixed before work starts: ${price("small-builds")} for one feature, ${price("fixed-scope-builds")} for a full app. NovelMaker is an app we built.`,
    h1: "MVP Development in Toronto",
    navLabel: "MVP development",
    serviceType: "MVP development",
    parentService: "fixed-scope-builds",
    lede: "The point of an MVP is to find out fast whether anyone wants it. That only works if the price and the scope are fixed before the first line of code.",
    intro:
      "NovelMaker is a consumer app we built and still maintain. Parents record a five-minute voice sample, pick a story theme, and the app plays a new bedtime story narrated in their voice.",
    projectsHeading: "An app we built and maintain",
    projectSlugs: ["novelmaker"],
    patternsHeading: "What NovelMaker shows about building an MVP",
    patterns: [
      {
        title: "A simple flow in front of an AI pipeline",
        detail:
          "For parents it's three steps: voice setup, pick a theme, play at bedtime. Behind that sits the story generation pipeline, the product design, and the onboarding flow we built.",
        slug: "novelmaker",
      },
      {
        title: "Published in 8 languages",
        detail:
          "The marketing site runs in English, French, Spanish, German, Polish, Turkish, Ukrainian, and Russian, each with its own pages.",
        slug: "novelmaker",
      },
      {
        title: "Built to keep growing after launch",
        detail:
          "The site now has 174 pages, with bedtime guides, a blog, and an FAQ, and we still maintain it.",
        slug: "novelmaker",
      },
    ],
    faqs: [
      {
        question: "How much does MVP development cost in Toronto?",
        answer: `With us, one well-defined MVP feature is a Small Build at ${price("small-builds")}. A full app built from a written spec is a Fixed-Scope Build at ${price("fixed-scope-builds")}. Either way the price is fixed before development starts.`,
      },
      {
        question: "Should my MVP be a Small Build or a Fixed-Scope Build?",
        answer:
          "If you can test the idea with one screen or one feature, start with a Small Build. If users need a full product to judge it, with accounts, onboarding, and several features, it's a Fixed-Scope Build.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You get the full source code and deployment access at handoff, on both tiers.",
      },
      {
        question: "How long does an MVP take?",
        answer:
          "A Small Build takes days to a couple of weeks. A Fixed-Scope Build's timeline is set in the quote, alongside the price, once the spec is written.",
      },
      {
        question: "Can the MVP include AI features?",
        answer:
          "Yes. NovelMaker's core is an AI story generation pipeline. AI features are scoped like any other feature, with a fixed price.",
      },
    ],
    cta: {
      title: "Got an idea you want to test?",
      detail: "On a free call we'll work out the smallest version worth building and put a price on it.",
    },
  },
];

export function getSolutionPage(path: string): SolutionPage {
  const page = solutionPages.find((entry) => entry.path === path);
  if (!page) throw new Error(`No solution page for ${path}`);
  return page;
}
