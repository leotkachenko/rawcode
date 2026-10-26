import { getSolutionPage } from "@/lib/solution-pages";
import { SolutionPageView, solutionPageMetadata } from "@/components/SolutionPageView";

const page = getSolutionPage("/speech-to-text-development-toronto");

export const metadata = solutionPageMetadata(page);

export default function SpeechToTextDevelopmentTorontoPage() {
  return <SolutionPageView page={page} />;
}
