import { getSolutionPage } from "@/lib/solution-pages";
import { SolutionPageView, solutionPageMetadata } from "@/components/SolutionPageView";

const page = getSolutionPage("/mvp-development-toronto");

export const metadata = solutionPageMetadata(page);

export default function MvpDevelopmentTorontoPage() {
  return <SolutionPageView page={page} />;
}
