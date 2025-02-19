import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState } from "react";

function Comment({
  comment,
  loggedInUser,
  setDeletedComment,
  setSuccessMessage,
  setErrorMessage,
}) {
  const isSelf = comment.author === loggedInUser.username;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentDelete = () => {
    setIsSubmitting(true);
    const apiUrl = `https://nc-project-iwre.onrender.com/api/comments/${comment.comment_id}`;
    axios
      .delete(apiUrl)
      .then(() => {
        setDeletedComment((currentCounter) => currentCounter + 1);
        setSuccessMessage("Comment deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch((error) => {
        console.error("Error deleting:", error);
        setErrorMessage("Comment has not been deleted!");
        setTimeout(() => setErrorMessage(null), 3000);
      })
      .finally(() => setIsSubmitting(false));
  };
  return (
    <Card
      sx={{
        maxWidth: "100%",
        minWidth: 0,
        margin: "0 1rem",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e0e0e0",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="article">
            {comment.author.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        title={<Typography variant="h6">{comment.author}</Typography>}
        action={
          <Chip
            label={new Date(comment.created_at).toLocaleDateString()}
            size="medium"
          />
        }
        sx={{ padding: "0.5rem 1rem" }}
      />
      <CardContent sx={{ padding: "0.5rem 1rem" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.body}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          padding: "0.3rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton size="small" aria-label="like">
          <Typography variant="body6">{comment.votes}</Typography>
          <FavoriteIcon />
        </IconButton>
        {isSelf && (
          <IconButton
            size="small"
            aria-label="delete"
            disabled={isSubmitting}
            onClick={handleCommentDelete}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default Comment;
