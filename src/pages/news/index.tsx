import { ContentBlock } from "@atoms/ContentBlock";
import { NewsAndUpdates } from "src/components/organisms/NewsAndUpdates";

const News = () => (
  <ContentBlock topMargin={20}>
    <NewsAndUpdates heading="News" />
  </ContentBlock>
)

export default News