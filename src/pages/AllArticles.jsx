import ArticlesList from "../components/ArticlesList/ArticlesList";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TopicTabs from "../components/TopicTabs/TopicTabs";
import { useSearchParams } from "react-router";
import SortByButton from "../components/SortByButton/SortByButton";

function AllArticles() {
  const [searchParams, setSearchParams] = useSearchParams();

  // if any queries added manualy to url or after refresh
  const initialPage = Number(searchParams.get("p")) || 1;
  const initialTopic = searchParams.get("topic") || "all";
  const initialSort = searchParams.get("sort_by") || "none";
  const initialOrder = searchParams.get("order") || "desc";

  const [page, setPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(0);
  const [topic, setTopic] = useState(initialTopic);
  const [sort, setSort] = useState(initialSort);
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    const params = new URLSearchParams();
    if (topic !== "all") {
      params.set("topic", topic);
    }
    params.set("p", page);
    if (sort !== "none") {
      params.set("sort_by", sort);
      params.set("order", order);
    }

    setSearchParams(params);
  }, [page, topic, sort, order, setSearchParams]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const pages = Math.ceil(totalCount / 6);

  return (
    <Stack gap={3}>
      <TopicTabs setTopic={setTopic} setPage={setPage} />
      <SortByButton
        setSort={setSort}
        setOrder={setOrder}
        initialSort={initialSort}
        initialOrder={initialOrder}
        setPage={setPage}
      />
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
