import { lessonsData } from "@/constants/LessonsData";
import Navigation from "@/components/Shared/Navigation";

const LessonNavigation: React.FC<{ currentSlug: string }> = ({ currentSlug }) => {
  return <Navigation currentSlug={currentSlug} data={lessonsData} basePath="lesson" />;
};

export default LessonNavigation;
