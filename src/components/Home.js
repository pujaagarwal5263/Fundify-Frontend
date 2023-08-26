import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Creators from "./Creators";
import Projects from "./Projects";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }} style={{ marginBottom: "4rem" }}>
        <AppBar position="fixed" style={{ backgroundColor: "black" }}>
          <Toolbar>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginLeft: "3rem" }}>
                    <Button
                      color="inherit"
                      startIcon={<CurrencyExchangeIcon />}
                    >
                      <b>Fundify</b>
                    </Button>
                  </Grid>
                  <Box
                    style={{
                      borderRadius: "123px",
                      marginLeft: "323px",
                      color: "black",
                      
                    }}
                  >
                    <Grid item >
                      <Button
                      style={{
                       
                        borderLeftWidth:"4px",
                        backgroundColor:"grey",
                        color:"white"
                      }}
                        color="inherit"
                        onClick={() => history.push("/home/creators")}
                      >
                        Explore Creators
                      </Button>
                      <Button

                        style={{ marginLeft: "4rem",
                       
                         
                          borderLeftWidth:"4px",
                          backgroundColor:"grey",
                          color:"white"
                      }}
                        color="inherit"
                        onClick={() => history.push("/home/projects")}
                      >
                        Discover Projects
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>

              <Grid item>
                <Button
                  sx={{
                    backgroundColor: "yellow",
                    "&:hover": {
                      backgroundColor: "#F0E68C",
                    },
                  }}
                  style={{
                    color: "black",
                    borderRadius: "7px",
                  }}
                  variant="contained"
                  onClick={() => {
                    history.push("/signupcreator");
                  }}
                >
                  Sign up as Creator
                </Button>
                <Button
                  sx={{
                    backgroundColor: "yellow",
                    "&:hover": {
                      backgroundColor: "#F0E68C",
                    },
                  }}
                  style={{
                    color: "black",
                    marginLeft: "12px",
                    borderRadius: "7px",
                  }}
                  variant="contained"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
          <Box borderBottom="1px solid white" marginLeft={5} marginRight={2} />
        </AppBar>
      </Box>
      <Switch>
        <Route path="/home/creators">
          <Creators />
        </Route>
        <Route path="/home/projects">
          <Projects />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
