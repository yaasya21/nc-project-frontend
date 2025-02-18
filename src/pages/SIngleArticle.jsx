import { Button, Stack } from "@mui/material";
import ArticlesList from "../components/ArticlesList/ArticlesList";
import { Link } from "react-router";
import Typography from "@mui/material/Typography";
import Article from "../components/ArticlesList/Article/Article";

function SingleArticle() {
  return (
    <Stack gap={7} sx={{alignItems: "center"}}>
      <Article/>
    </Stack>
  );
}

export default SingleArticle;
