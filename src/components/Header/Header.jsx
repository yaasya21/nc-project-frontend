import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { User } from "../../contexts/User";
import styles from "./Header.module.css";

function Header() {
  const { loggedInUser } = useContext(User);
  console.log(loggedInUser);
  return (
    <AppBar position="fixed" sx={{ height: "100px", backgroundColor: "white" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
          width: "100%",
          paddingLeft: { xs: 0, sm: 0, md: 0 },
          paddingRight: { xs: 0, sm: 0, md: 0 },
        }}
      >
        <Link to="/" className={styles.a}>
          <Typography variant="h3" color="black">
            TheDailyScribble
          </Typography>
        </Link>

        <Avatar
          alt="User avatar"
          src={loggedInUser.avatar_url}
          sx={{ border: " 1px solid black", height: 55, width: 55 }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
