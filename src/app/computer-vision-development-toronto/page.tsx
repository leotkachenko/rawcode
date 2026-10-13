import { getSolutionPage } from "@/lib/solution-pages";
import { SolutionPageView, solutionPageMetadata } from "@/components/SolutionPageView";

const page = getSolutionPage("/computer-vision-development-toronto");

export const metadata = solutionPageMetadata(page);

export default function ComputerVisionDevelopmentTorontoPage() {
  return <SolutionPageView page={page} />;
}
