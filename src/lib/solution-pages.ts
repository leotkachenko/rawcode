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
];

export function getSolutionPage(path: string): SolutionPage {
  const page = solutionPages.find((entry) => entry.path === path);
  if (!page) throw new Error(`No solution page for ${path}`);
  return page;
}
