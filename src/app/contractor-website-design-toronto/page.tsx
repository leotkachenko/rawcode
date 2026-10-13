import { getSolutionPage } from "@/lib/solution-pages";
import { SolutionPageView, solutionPageMetadata } from "@/components/SolutionPageView";

const page = getSolutionPage("/contractor-website-design-toronto");

export const metadata = solutionPageMetadata(page);

export default function ContractorWebsiteDesignTorontoPage() {
  return <SolutionPageView page={page} />;
}
