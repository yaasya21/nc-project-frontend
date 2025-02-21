import axios from "axios";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Article from "./Article/Article";
import Grid from "@mui/material/Grid2";
import { useLocation, useSearchParams } from "react-router";
import CircularProgress from '@mui/material/CircularProgress';

function ArticlesList({ limit, setTotalCount, setPage }) {
  const [articlesData, setArticlesData] = useState();
  const location = useLocation();
  const isOnHome = location.pathname === "/";
  const [searchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("p"));
  const topicFromUrl = searchParams.get("topic");
  const sortFromUrl = searchParams.get("sort_by");
  const orderFromUrl = searchParams.get("order");

  useEffect(() => {
    let apiUrl = `https://nc-project-iwre.onrender.com/api/articles?limit=${
      limit || 10
    }&p=${pageFromUrl || 1}`;

    if (topicFromUrl) {
      apiUrl += `&topic=${topicFromUrl}`;
    }

    if (sortFromUrl) {
      apiUrl += `&sort_by=${sortFromUrl}&order=${orderFromUrl}`;
    }

    axios
      .get(apiUrl)
      .then((data) => {
        if (data.data.articles.length === 0) {
          setPage(1); // if user manually adds non-existent page to url
        } else {
          setArticlesData(data.data);
        }
        setTotalCount && setTotalCount(data.data.total_count);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setArticlesData({ articles: [], total_count: 0 });
        setTotalCount(0);
      });
  }, [pageFromUrl, topicFromUrl, sortFromUrl, orderFromUrl]);

  if (!articlesData) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (articlesData.total_count === 0) {
    return <p>No articles found.</p>;
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
