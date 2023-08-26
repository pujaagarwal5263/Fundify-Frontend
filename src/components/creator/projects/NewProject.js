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
import { SERVER_URL } from "../../../constant/serverUrl";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function LoginAudience({ handleViewProjects }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const pageName = localStorage.getItem("pageName");
    const email = localStorage.getItem("email");
    const projectName = data.get("title");

    axios
      .post(SERVER_URL + "/projects/new", {
        email: email,
        pageName: pageName,
        title: projectName,
        description: data.get("description"),
        amount: data.get("amount"),
      })
      .then((response) => {
        let formData = new FormData();
        let imageFile = document.querySelector("#projectImage");
        formData.append("projectImage", imageFile.files[0]);

        axios
          .post(SERVER_URL + "/projects/upload/" + pageName, formData, {
            params: { projectName: projectName },
          })
          .then((response) => {
            handleViewProjects(projectName, email);
          });
      });
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">New Project</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                autoComplete="description"
              />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: ".25rem" }}>
              <label for="projectImage">Project image:&ensp;</label>
              <input
                type="file"
                id="projectImage"
                name="projectImage"
                accept=".jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="amount"
                label="Funds required (₹)"
                type="number"
                id="amount"
                autoComplete="amount"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#212121" }}
          >
            CREATE
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
