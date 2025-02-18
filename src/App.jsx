import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Home from "./pages/Home";
import AllArticles from "./pages/AllArticles";
import SingleArticle from "./pages/SingleArticle";

function App() {
  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Grid
          container
          direction="column"
          sx={{ flexGrow: 1, paddingTop: "170px" }}
        >
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<AllArticles />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
          </Routes>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
