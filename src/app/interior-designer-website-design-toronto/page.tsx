import { getSolutionPage } from "@/lib/solution-pages";
import { SolutionPageView, solutionPageMetadata } from "@/components/SolutionPageView";

const page = getSolutionPage("/interior-designer-website-design-toronto");

export const metadata = solutionPageMetadata(page);

export default function InteriorDesignerWebsiteDesignTorontoPage() {
  return <SolutionPageView page={page} />;
}
