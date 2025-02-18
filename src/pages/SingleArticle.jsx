import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Container from "@mui/material/Container";
import Article from "../components/ArticlesList/Article/Article";
import CommentsList from "../components/CommentsList/CommentsList";
import { useState } from "react";
import { grey } from "@mui/material/colors";

function SingleArticle() {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const pages = Math.ceil(totalCount / 2);
  return (
    <Container maxWidth="md">
      <Stack gap={1} sx={{ alignItems: "center" }}>
        <Article />
        <CommentsList page={page} setTotalCount={setTotalCount} />
        <Pagination
          count={pages}
          page={page}
          onChange={handleChange}
          size="large"
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            opacity: 0.8,
            mt: 2,
            position: "sticky",
            bottom: 0,
            zIndex: 10,
            padding: "1rem 0", 
            borderRadius: '60px',
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
          }}
        />
      </Stack>
    </Container>
  );
}

export default SingleArticle;
