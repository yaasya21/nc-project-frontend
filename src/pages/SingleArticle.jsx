import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Article from "../components/ArticlesList/Article/Article";
import CommentsContainer from "../components/CommentsContainer/CommentsContainer";
import { useParams } from "react-router";
import { useState } from "react";

function SingleArticle() {
  const [page, setPage] = useState(1);
  const [articleExists, setArticleExists] = useState(false);
  const { article_id } = useParams();

  return (
    <Container maxWidth="md">
      <Stack gap={2} sx={{ alignItems: "center" }}>
        <Article article_id={article_id} setPage={setPage} setArticleExists={setArticleExists} />
        {articleExists && (
          <CommentsContainer setPage={setPage} page={page} article_id={article_id} />
        )}
      </Stack>
    </Container>
  );
}

export default SingleArticle;
