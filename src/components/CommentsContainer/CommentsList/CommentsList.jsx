import axios from "axios";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Comment from "./Comment/Comment";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";

function CommentsList({
  page,
  setTotalCount,
  article_id,
  newComment,
  loggedInUser,
}) {
  const [commentsData, setCommentsData] = useState();
  const [deletedComment, setDeletedComment] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    let apiUrl = `https://nc-project-iwre.onrender.com/api/articles/${article_id}/comments?limit=2&p=${page}`;
    axios
      .get(apiUrl)
      .then((data) => {
        setCommentsData(data.data);
        setIsLoading(false);
        if (data.data.total_count !== 0) {
          // not to show pagination when there are no comments
          setTotalCount(data.data.total_count);
        }
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setCommentsData({ comments: [], total_count: 0 });
        setIsLoading(false);
      });
  }, [page, newComment, deletedComment]);

  if (isloading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (commentsData.total_count === 0) {
    return <p>No responses yet.</p>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      {(successMessage || errorMessage) && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message={successMessage || errorMessage}
        />
      )}
      <Stack direction="column" gap={2}>
        {commentsData.comments.map((comment) => (
          <Comment
            key={comment.comment_id}
            comment={comment}
            page={page}
            loggedInUser={loggedInUser}
            setDeletedComment={setDeletedComment}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default CommentsList;
