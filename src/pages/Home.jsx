import { Button, Stack } from "@mui/material";
import ArticlesList from "../components/ArticlesList/ArticlesList";
import { Link } from "react-router";
import Typography from "@mui/material/Typography";

function Home() {
  return (
    <Stack gap={7}>
      <Typography variant="h4" >
        Articles you may like... or not
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={10} sx={{justifyContent: "center", alignItems: "center"}}>
        <ArticlesList limit={2}/>
        <Link to="/articles">
          <Button variant="contained">See More Articles</Button>
        </Link>
      </Stack>
    </Stack>
  );
}

export default Home;
