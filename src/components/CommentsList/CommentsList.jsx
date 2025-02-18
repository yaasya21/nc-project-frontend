import axios from "axios";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useParams } from "react-router";
import Comment from "./Comment/Comment";

function CommentsList({ page, setTotalCount }) {
  const [commentsData, setCommentsData] = useState();
  const { article_id } = useParams();

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
  }, [page]);

  if (!commentsData) {
    return <p>Loading...</p>;
  }

  if (commentsData.length === 0) {
    return <p>No comments found.</p>;
  }

  return (
    <Box sx={{ width: '100%' }}> 
      <Stack direction="column" gap={0.25}>
        {commentsData.comments.map((comment) => (
          <Comment key={comment.comment_id} comment={comment} page={page} />
        ))}
      </Stack>
    </Box>
  );
}

export default CommentsList;
