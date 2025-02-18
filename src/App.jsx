import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Home from "./pages/Home/Home";
import AllArticles from "./pages/Home/AllArticles";

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
          </Routes>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
