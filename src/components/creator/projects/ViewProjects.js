import { Card, Typography } from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const getRaisedAmount = (audiences) => {
  let raisedAmount = 0;
  audiences.forEach((element) => {
    raisedAmount += element.amount;
  });
  return raisedAmount;
};

function ViewProjects({ data }) {
  return (
    <div>
      <Typography variant="h5">View Projects</Typography>
      <Grid container>
        {data.map((element) => {
          return (
            <Grid item xs={7} style={{ marginTop: "1rem" }}>
              <Card style={{ padding: "1rem", backgroundColor: "#e0e0e0" }}>
                <Typography variant="h6">Title: {element.title}</Typography>
                <Typography variant="body2" style={{ marginTop: ".25rem" }} s>
                  Description: {element.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  style={{ marginTop: ".5rem" }}
                >
                  Funds Required: ₹ {element.amount}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "green", marginTop: ".25rem" }}
                >
                  Funds Collected: ₹ {getRaisedAmount(element.audience)}
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
