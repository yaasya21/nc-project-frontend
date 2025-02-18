import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./Article.module.css";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Article({ article }) {
  const [articleData, setArticleData] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    if (!article && article_id) {
      let apiUrl = `https://nc-project-iwre.onrender.com/api/articles/${article_id}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setArticleData(response.data.article);
        })
        .catch((error) => {
          console.error("Error fetching article:", error);
          setArticleData({ article: {} });
        });
    }
  }, [article_id, article]);

  const displayArticle = article || articleData;

  if (!displayArticle) {
    return <p>Loading...</p>;
  }

  if (
    displayArticle &&
    displayArticle.article &&
    Object.keys(displayArticle.article).length === 0
  ) {
    return <p>No items found.</p>;
  }
  return (
    <Card
      sx={{
        width: 335,
        maxWidth: "400px",
        minWidth: 0,
        margin: "1rem",
        ...(articleData && {
          minWidth: 0,
          width: "75%",
          maxWidth: "100%",
        }),
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="article">
            {displayArticle.author.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        title={<Typography variant="h6">{displayArticle.author}</Typography>}
        action={<Chip label={displayArticle.topic} size="medium" />}
      />
      <CardMedia
        component="img"
        height="194"
        image={displayArticle.article_img_url}
        alt="article image"
      />
      <CardContent>
        <Typography
          variant="h6"
          className={styles.card_title}
          title={displayArticle.title}
        >
          <span className={styles.card_title}>{displayArticle.title}</span>
        </Typography>

        
       {articleData && <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {articleData.body}
        </Typography>}

      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
          <IconButton aria-label="add to favorites">
            <Typography variant="body5">{displayArticle.votes}</Typography>
            <FavoriteIcon />
          </IconButton>
          <Typography variant="h7" color="black">
            {new Date(displayArticle.created_at).toLocaleDateString()}
          </Typography>
        </Stack>

        {!article ? (
          <Link to={`/api/articles/${articleData.article_id}/addcomment`}>
            <Button size="medium">Add Comment</Button>
          </Link>
        ) : (
          <Link to={`/articles/${article.article_id}`}>
            <Button size="medium">Read more →</Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
}

export default Article;
