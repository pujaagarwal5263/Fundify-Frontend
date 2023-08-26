import { Card, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { SERVER_URL } from "../../../constant/serverUrl";

const videoSrc = (author, name) => {
  return (
    SERVER_URL +
    "/file/creators/" +
    author +
    "/exclusive/" +
    name +
    "/" +
    name +
    ".mp4"
  );
};

function ViewProjects({ data }) {
  console.log(data);

  return (
    <div>
      <Typography variant="h5">View Exclusive</Typography>
      <Grid container spacing={3} style={{ marginTop: "0rem" }}>
        {data &&
          data.map((element) => {
            return (
              <Grid item>
                <Card style={{ padding: "1rem", backgroundColor: "lightgrey" }}>
                  <Typography variant="h6" gutterBottom>
                    {element.title}
                  </Typography>
                  <video height="200" controls>
                    <source src={element.exclusiveURL} type="video/mp4" />
                  </video>
                  <Typography variant="body2" style={{ marginTop: ".25rem" }} s>
                    {element.description}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default ViewProjects;
