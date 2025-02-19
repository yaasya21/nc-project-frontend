import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import { User } from "../../contexts/User";
import { useContext } from "react";
import axios from "axios";

function AddComment({ article_id, setNewComment }) {
  const { loggedInUser } = useContext(User);
  const [formData, setFormData] = useState({
    body: "",
  });
  const handleChange = (event) => {
    setFormData({
      body: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToSend = {
      ...formData,
      username: loggedInUser.username,
    };

    console.log(dataToSend)

    axios
      .post(`https://nc-project-iwre.onrender.com/api/articles/${article_id}/comments`, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setFormData({
          body: ""
        });
        setNewComment((currentCounter) => {
          console.log(currentCounter)
          return currentCounter + 1;
        });
      })
      .catch((error) => {
        console.error("Error listing items:", error);
      });
  };
  return (
    <Box sx={{ width: "100%" }}>
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
              sx={{ margin: "0 0.5rem 0.5rem 0" }}
            >
              Respond
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
}

export default AddComment;
