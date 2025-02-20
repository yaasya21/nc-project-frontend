import ArticlesList from "../components/ArticlesList/ArticlesList";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TopicTabs from "../components/TopicTabs/TopicTabs";
import { useSearchParams } from "react-router";

function AllArticles() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("p")) || 1;
  const initialTopic = searchParams.get("topic") || "all";

  const [page, setPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(0);
  const [topic, setTopic] = useState(initialTopic);

  useEffect(() => {
    const params = new URLSearchParams();
    if (topic !== "all") {
      params.set("topic", topic);
    }
    params.set("p", page);

    setSearchParams(params);
  }, [page, topic, setSearchParams]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const pages = Math.ceil(totalCount / 6);

  return (
    <Stack gap={3}>
      <TopicTabs setTopic={setTopic} setPage={setPage} />
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={10}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <ArticlesList
          limit={6}
          setTotalCount={setTotalCount}
          setPage={setPage}
        />
      </Stack>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          opacity: 0.9,
          padding: "0.5rem 1.5rem",
          borderRadius: "40px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          margin: "0 auto",
        }}
      >
        <Pagination
          count={pages}
          page={page}
          onChange={handleChange}
          size="large"
        />
      </Box>
    </Stack>
  );
}

export default AllArticles;
