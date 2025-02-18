import ArticlesList from "../components/ArticlesList/ArticlesList";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

function AllArticles() {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const pages = Math.ceil(totalCount / 6);
  return (
    <Stack gap={7}>
      <Typography variant="h4">All Articles</Typography>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={10}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <ArticlesList limit={6} setTotalCount={setTotalCount} page={page} />
      </Stack>
      <Pagination
        count={pages}
        page={page}
        onChange={handleChange}
        size="large"
        sx={{ display: "flex", justifyContent: "center" }}
      />
    </Stack>
  );
}

export default AllArticles;
