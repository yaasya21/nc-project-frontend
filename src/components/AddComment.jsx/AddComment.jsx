import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from "axios";

function AddComment({ article_id, setNewComment, loggedInUser }) {
  const [formData, setFormData] = useState({
    body: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (event) => {
    setFormData({
      body: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      ...formData,
      username: loggedInUser.username,
    };

    axios
      .post(
        `https://nc-project-iwre.onrender.com/api/articles/${article_id}/comments`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setFormData({
          body: "",
        });
        setNewComment((currentCounter) => currentCounter + 1);
        setSuccessMessage("Comment posted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch((error) => {
        console.error("Error listing items:", error);
        setErrorMessage("Comment has not been posted!");
        setTimeout(() => setErrorMessage(null), 3000);
      })
      .finally(() => setIsSubmitting(false));
  };
  return (
    <Box sx={{ width: "100%" }}>
      {(successMessage || errorMessage) && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message={successMessage || errorMessage}
        />
      )}
      <Card
        sx={{
          maxWidth: "100%",
          minWidth: 0,
          margin: "0 1rem",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        <form onSubmit={handleSubmit} style={{ padding: "0 15px" }}>
          <TextField
            required
            multiline
            placeholder="Tell what you think..."
            value={formData.body}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 500 }}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: "0.875rem",
                color: "text.secondary",
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              size="small"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{ margin: "0 0.5rem 0.5rem 0" }}
            >
              {isSubmitting ? "Submitting..." : "Respond"}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
}

export default AddComment;
