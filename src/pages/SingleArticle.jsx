import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Article from "../components/ArticlesList/Article/Article";
import CommentsList from "../components/CommentsList/CommentsList";
import { useState } from "react";
import { useParams } from "react-router";
import AddComment from "../components/AddComment.jsx/AddComment";
import { User } from "../contexts/User";
import { useContext } from "react";

function SingleArticle() {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [newComment, setNewComment] = useState(0); // we need it to refresh pagination page count
  const { article_id } = useParams();
  const { loggedInUser } = useContext(User);

  const pages = Math.ceil(totalCount / 2);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (pages === page - 1) {
    //if all the comments on the page were deleted, go to previous one
    setPage(page - 1);
  }

  return (
    <Container maxWidth="md">
      <Stack gap={2} sx={{ alignItems: "center" }}>
        <Article article_id={article_id} setPage={setPage} />
        <Typography variant="h4" sx={{ alignSelf: "flex-start", mt: 4 }}>
          Comments
        </Typography>
        {page === 1 && (
          <AddComment
            article_id={article_id}
            setNewComment={setNewComment}
            loggedInUser={loggedInUser}
          />
        )}
        <CommentsList
          page={page}
          setTotalCount={setTotalCount}
          article_id={article_id}
          newComment={newComment}
          loggedInUser={loggedInUser}
        />
        {totalCount && (
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
              borderRadius: "60px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
        )}
      </Stack>
    </Container>
  );
}

export default SingleArticle;
