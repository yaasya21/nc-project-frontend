import axios from "axios";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Article from "./Article/Article";
import Grid from "@mui/material/Grid2";
import { useLocation } from "react-router";

function ArticlesList({ limit, setTotalCount, page }) {
  console.log(limit);
  const [articlesData, setArticlesData] = useState();
  const location = useLocation();
  const isOnHome = location.pathname === "/";

  useEffect(() => {
    let apiUrl = `https://nc-project-iwre.onrender.com/api/articles?limit=${
      limit ? limit : 10
    }&p=${page ? page : 1}`;
    axios
      .get(apiUrl)
      .then((data) => {
        setArticlesData(data.data);
        setTotalCount && setTotalCount(data.data.total_count);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setArticlesData({ articles: [], article_count: 0 });
      });
  }, [page]);

  if (!articlesData) {
    return <p>Loading...</p>;
  }

  if (articlesData.length === 0) {
    return <p>No items found.</p>;
  }

  if (isOnHome) {
    return (
      <Stack direction="row" gap={5} flexWrap="wrap">
        {articlesData.articles.map((article) => (
          <Article key={article.article_id} article={article} />
        ))}
      </Stack>
    );
  } else {
    return (
      <Grid container spacing={3} justifyContent="center">
        {articlesData.articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={article.article_id}>
            <Article article={article} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default ArticlesList;
