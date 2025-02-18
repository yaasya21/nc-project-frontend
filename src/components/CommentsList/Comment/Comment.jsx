import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";

function Comment({ comment }) {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        minWidth: 0,
        margin: "1rem",
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
          padding: "0.3rem 1rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton size="small" aria-label="add to favorites">
          <Typography variant="body6">{comment.votes}</Typography>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Comment;
