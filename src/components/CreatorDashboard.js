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
import { Switch, Route, useHistory } from "react-router-dom";
import ViewProjects from "./creator/projects/ViewProjects";
import NewProject from "./creator/projects/NewProject";
import axios from "axios";
import { SERVER_URL } from "../constant/serverUrl";
import Funds from "../components/creator/Funds/Funds";
import Exclusive from "./creator/Exclusive/Exclusive";

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
  const history = useHistory();

  const [fetchedProjects, setFetchedProjects] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(SERVER_URL + "/projects", {
        params: {
          email: localStorage.getItem("email"),
          pageName: localStorage.getItem("pageName"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setFetchedProjects(response.data);
      })
      .catch((err) => {});
  }, []);

  const handleViewProjects = (projectName, email) => {
    axios
      .get(SERVER_URL + "/projects", {
        params: { email: email },
        pageName: localStorage.getItem("pageName"),
      })
      .then((response) => {
        console.log(response.data);
        setFetchedProjects(response.data);
      })
      .catch((err) => {});
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, backgroundColor: "#212121" }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#212121",
          }}
        >
          <Toolbar>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button
                  color="inherit"
                  onClick={() => history.push("/creatordashboard/projects")}
                >
                  Projects
                </Button>
                <Button
                  color="inherit"
                  onClick={() => history.push("/creatordashboard/funds")}
                >
                  Funds / Supporters
                </Button>
                <Button
                  color="inherit"
                  onClick={() => history.push("/creatordashboard/exclusive")}
                >
                  Exclusive Content
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit">
                  {localStorage.getItem("pageName")}
                </Button>
                {/* <Button color='inherit'>Profile</Button> */}
                <Button
                  color="inherit"
                  onClick={() => {
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
        <Route path="/creatordashboard/projects">
          <Grid
            container
            style={{ paddingInline: "2rem", paddingBlock: "1.5rem" }}
          >
            <Grid item xs={6}>
              <ViewProjects data={fetchedProjects} />
            </Grid>
            <Grid item xs={4}>
              <NewProject handleViewProjects={handleViewProjects} />
            </Grid>
          </Grid>
        </Route>
        <Route path="/creatordashboard/funds">
          <Funds />
        </Route>
        <Route path="/creatordashboard/exclusive">
          <Exclusive />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
