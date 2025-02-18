import ArticlesList from "../components/ArticlesList/ArticlesList";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { Box } from "@mui/material";

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
