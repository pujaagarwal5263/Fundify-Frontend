import * as React from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../constant/serverUrl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { blueGrey } from "@mui/material/colors";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Fundify © {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginAudience() {
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      userType: data.get("userType"),
    });

    axios
      .post(SERVER_URL + "/users/login", {
        email: data.get("email"),
        password: data.get("password"),
        userType: data.get("userType"),
      })
      .then((response) => {
        console.log(response.data.userType);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userType", response.data.userType);
        localStorage.setItem("pageName", response.data.pageName);
        localStorage.setItem("firstName", response.data.firstName);
        if (response.data.userType === "creator") {
          history.replace("/creatordashboard/projects");
        } else {
          history.replace("/audiencedashboard/creators");
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <IconButton
              aria-label="close"
              onClick={() => {
                history.replace("/home/creators");
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <FormControl
                component="fieldset"
                style={{
                  marginTop: ".75rem",
                  marginBottom: ".25rem",
                }}
              >
                <RadioGroup
                  row
                  aria-label="user"
                  name="userType"
                  defaultValue="creator"
                >
                  <FormControlLabel
                    value="creator"
                    control={<Radio />}
                    label="Creator"
                  />
                  <FormControlLabel
                    value="audience"
                    control={<Radio />}
                    label="Audience"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                style={{ backgroundColor: "black" }}
              >
                Login
              </Button>
              <Grid
                container
                justifyContent="flex-end"
                style={{ marginBottom: ".25rem" }}
              >
                <Grid item>
                  <small>
                    Create new account as{" "}
                    <Link
                      href="#"
                      onClick={() => {
                        history.push("/signupcreator");
                      }}
                      style={{ color: "black" }}
                      underline="hover"
                    >
                      creator
                    </Link>{" "}
                    or{" "}
                    <Link
                      href="#"
                      onClick={() => {
                        history.push("/signupaudience");
                      }}
                      style={{ color: "black" }}
                      underline="hover"
                    >
                      audience
                    </Link>
                  </small>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Container>
    </ThemeProvider>
  );
}
