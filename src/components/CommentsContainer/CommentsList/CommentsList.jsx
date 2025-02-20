import axios from "axios";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Comment from "./Comment/Comment";
import Snackbar from "@mui/material/Snackbar";

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

  useEffect(() => {
    let apiUrl = `https://nc-project-iwre.onrender.com/api/articles/${article_id}/comments?limit=2&p=${page}`;
    axios
      .get(apiUrl)
      .then((data) => {
          setCommentsData(data.data);
          setTotalCount(data.data.total_count);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setCommentsData({ comments: [], total_count: 0 });
        setTotalCount(0);
      });
  }, [page, newComment, deletedComment]);

  if (!commentsData) {
    return <p>Loading...</p>;
  }

  if (commentsData.length === 0) {
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
