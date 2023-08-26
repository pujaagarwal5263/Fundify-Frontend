import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import Creators from "./audience/creators/Creators";
import Projects from "./audience/creators/Projects";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Exclusive from "./audience/creators/Exclusive";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Home() {
  let history = useHistory();

  React.useEffect(() => {
    if (!localStorage.getItem("email")) {
      history.replace("/login");
    }
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
            style={{
              background: "black",
              borderBottom: "5px",
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button
                  color="inherit"
                  onClick={() => {
                    history.push("/audiencedashboard/creators");
                  }}
                >
                  Creators
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    history.push("/audiencedashboard/projects");
                  }}
                >
                  Projects
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    history.push("/audiencedashboard/exclusive");
                  }}
                >
                  Exclusive Content
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit">
                  {localStorage.getItem("firstName")}
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    localStorage.removeItem("email");
                    history.replace("/login");
                  }}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Switch>
        <Route path="/audiencedashboard/creators">
          <Creators />
        </Route>
        <Route path="/audiencedashboard/projects">
          <Projects />
        </Route>
        <Route path="/audiencedashboard/exclusive">
          <Exclusive />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
