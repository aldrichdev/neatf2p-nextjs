import { ListItemText, Typography, Divider } from "@mui/material";
import {
  NewsPostLi,
  NewsPostAvatar,
  NewsPostTitleLink,
  NewsPostImage,
  NewsPostTitle,
} from './NewsPostListItem.styled'
import { NewsPostItemProps } from '@lib/types/NewsPostItemProps'
import { getPrettyDateStringFromISOString } from '@helpers/date/date'
import ReadMore from '@atoms/ReadMore/ReadMore';
import { getNewsPostImageUrl } from "@lib/helpers/imageUtils";
import Link from "next/link";

const NewsPostListItem = (props: NewsPostItemProps) => {
  const { newsPost } = props;

  return (
    <div>
      <NewsPostLi alignItems="flex-start">
        <NewsPostAvatar>
          <NewsPostImage src={getNewsPostImageUrl(newsPost.image)} alt={newsPost.alt} />
        </NewsPostAvatar>
        <ListItemText
          primary={
            <NewsPostTitleLink href={`/news/post/${newsPost.id}`}>
              <NewsPostTitle variant="body">{newsPost.title}</NewsPostTitle>
            </NewsPostTitleLink>
          }
          secondary={
            <>
              <Typography variant="body">{getPrettyDateStringFromISOString(newsPost.datePosted)}</Typography>
              <Typography variant="body" color="black">
                <ReadMore linkHref={`/news/post/${newsPost.id}`}>{newsPost.body}</ReadMore>
              </Typography>
            </>
          }
          secondaryTypographyProps={{ component: 'div' }}>
        </ListItemText>
      </NewsPostLi>
      <Divider />
    </div>
  )
}

export default NewsPostListItem;
