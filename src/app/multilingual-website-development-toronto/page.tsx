import { getSolutionPage } from "@/lib/solution-pages";
import { SolutionPageView, solutionPageMetadata } from "@/components/SolutionPageView";

const page = getSolutionPage("/multilingual-website-development-toronto");

export const metadata = solutionPageMetadata(page);

export default function MultilingualWebsiteDevelopmentTorontoPage() {
  return <SolutionPageView page={page} />;
}
