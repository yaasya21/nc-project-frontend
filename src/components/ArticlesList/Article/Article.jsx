import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import styles from "./Article.module.css";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useNavigate } from "react-router";

function Article({ article, article_id, setPage, setArticleExists }) {
  const [articleData, setArticleData] = useState(null);
  const [currentVotes, setCurrentVotes] = useState(0);
  const [voteStatus, setVoteStatus] = useState(0); // -1 dislike, 0 no vote, 1 like

  let navigate = useNavigate();

  useEffect(() => {
    if (!article && article_id) {
      let apiUrl = `https://nc-project-iwre.onrender.com/api/articles/${article_id}`;

      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response);
          setArticleData(response.data.article);
          setCurrentVotes(response.data.article.votes);
          setArticleExists(true);
        })
        .catch((error) => {
          console.error("Error fetching article:", error);
          setArticleExists(false);
          setArticleData({});
        });
    } else if (article) {
      setCurrentVotes(article.votes);
    }
    const storedVote = localStorage.getItem(
      `article_${article_id || article.article_id}_voted`
    );
    if (storedVote === "1") {
      setVoteStatus(1);
    } else if (storedVote === "-1") {
      setVoteStatus(-1);
    }
  }, [article_id, article]);

  const displayArticle = article || articleData;

  const handleVote = (vote) => {
    const currentIncrement = vote - voteStatus;
    setCurrentVotes(currentVotes + currentIncrement);
    setVoteStatus(vote);
    const apiUrl = `https://nc-project-iwre.onrender.com/api/articles/${displayArticle.article_id}`;
    axios
      .patch(apiUrl, { inc_votes: currentIncrement })
      .then(() => {
        if (vote === 0) {
          localStorage.removeItem(`article_${displayArticle.article_id}_voted`);
        } else {
          localStorage.setItem(
            `article_${displayArticle.article_id}_voted`,
            vote
          );
        }
      })
      .catch((error) => {
        console.error("Error voting:", error);
        setCurrentVotes(currentVotes - currentIncrement);
        setVoteStatus(voteStatus - currentIncrement);
        alert("Failed to vote. Please try again:)");
      });
  };

  const handleClick = () => {
    setPage(1);
  };

  if (!displayArticle) {
    return <p>Loading...</p>;
  }
  if (Object.keys(displayArticle).length === 0) {
    return (
      <Stack sx={{ alignItems: "center" }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "8.0em",
            textShadow: "3px 3px 0 rgba(0, 0, 0, 0.1)",
            mb: 0,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: "2.0em", lineHeight: "2.0em", mt: 0 }}
        >
          Article Not Found
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          The article you requested cannot be found.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/articles"
          sx={{ mt: 2 }}
        >
          Return to the articles
        </Button>
      </Stack>
    );
  }
  return (
    <Card
      sx={{
        width: articleData ? "auto" : 335,
        maxWidth: articleData ? "100%" : "400px",
        minWidth: 0,
        margin: "1rem",
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

        {articleData && (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {articleData.body}
          </Typography>
        )}
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1.25rem",
        }}
      >
        <Typography variant="h7" color="black">
          {new Date(displayArticle.created_at).toLocaleDateString()}
        </Typography>
        <Stack direction="row" alignItems="center">
          <IconButton
            aria-label="like"
            onClick={() => handleVote(voteStatus === 1 ? 0 : 1)}
            disabled={voteStatus === -1}
          >
            <ArrowUpwardIcon
              sx={{ color: voteStatus === 1 ? "green" : "inherit" }}
            />
          </IconButton>
          <Typography variant="h6">{currentVotes}</Typography>
          <IconButton
            aria-label="dislike"
            onClick={() => handleVote(voteStatus === -1 ? 0 : -1)}
            disabled={voteStatus === 1}
          >
            <ArrowDownwardIcon
              sx={{ color: voteStatus === -1 ? "red" : "inherit" }}
            />
          </IconButton>
        </Stack>
        {!article ? (
          <Button size="large" onClick={handleClick}>
            Add Comment
          </Button>
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
