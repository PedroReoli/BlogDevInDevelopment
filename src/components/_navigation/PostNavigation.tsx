import { blogsData } from "@/constants/BlogsData";
import Navigation from "@/components/Shared/Navigation";

const PostNavigation: React.FC<{ currentSlug: string }> = ({ currentSlug }) => {
  return <Navigation currentSlug={currentSlug} data={blogsData} basePath="post" />;
};

export default PostNavigation;
