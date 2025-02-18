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

function Article({ article }) {
  return (
    <Card sx={{ width: 335, maxWidth: "100%", minWidth: 0, margin: "1rem" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="article">
            {article.author.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        title={<Typography variant="h6">{article.author}</Typography>}
        action={<Chip label={article.topic} size="medium" />}
      />
      <CardMedia
        component="img"
        height="194"
        image={article.article_img_url}
        alt="article image"
      />
      <CardContent>
        <Typography
          variant="h6"
          className={styles.card_title}
          title={article.title}
        >
          <span className={styles.card_title}>{article.title}</span>
        </Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
          <IconButton aria-label="add to favorites">
            <Typography variant="body5">{article.votes}</Typography>
            <FavoriteIcon />
          </IconButton>
          <Typography variant="h7" color="black">
            {new Date(article.created_at).toLocaleDateString()}
          </Typography>
        </Stack>

        <Link to={`/article/${article.article_id}`}>
          <Button size="medium">Read more-></Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default Article;
