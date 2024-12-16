import { projectsData } from "@/constants/ProjectData";
import Navigation from "@/components/Shared/Navigation";

const ProjectNavigation: React.FC<{ currentSlug: string }> = ({ currentSlug }) => {
  return <Navigation currentSlug={currentSlug} data={projectsData} basePath="project" />;
};

export default ProjectNavigation;
