import { getSolutionPage } from "@/lib/solution-pages";
import { SolutionPageView, solutionPageMetadata } from "@/components/SolutionPageView";

const page = getSolutionPage("/ai-chatbot-development-toronto");

export const metadata = solutionPageMetadata(page);

export default function AiChatbotDevelopmentTorontoPage() {
  return <SolutionPageView page={page} />;
}
