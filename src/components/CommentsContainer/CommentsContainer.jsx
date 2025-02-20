import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import CommentsList from "./CommentsList/CommentsList";
import AddComment from "./AddComment.jsx/AddComment";
import { User } from "../../contexts/User";
import { useContext } from "react";
import { useState } from "react";

function CommentsContainer({ setPage, page, article_id }) {
  const [totalCount, setTotalCount] = useState();
  const [newComment, setNewComment] = useState(0); // we need it to refresh pagination page count

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
    <>
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
    </>
  );
}

export default CommentsContainer;
