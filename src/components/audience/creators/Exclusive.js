import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Grid, Typography } from "@mui/material";
import { SERVER_URL } from "../../../constant/serverUrl";
import Paper from "@mui/material/Paper";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

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

function Exclusive() {
  const [audienceInfo, setAudienceInfo] = useState();
  const [exclusiveData, setExclusiveData] = useState([]);
  const [userEmail,setUserEmail] = useState('');

  useEffect(()=>{
    const email = localStorage.getItem("email");
    setUserEmail(email);
  },[])

  useEffect(() => {
    axios
      .post(SERVER_URL + "/audience/info", {
        email: localStorage.getItem("email"),
      })
      .then((response) => {
        console.log(response.data);
        setAudienceInfo(response.data);

        let creators = [];
        response.data.creators.forEach((element) => {
          creators.push(element.pageName);
        });

        console.log(creators);

        axios
          .post(SERVER_URL + "/creators/exclusive", {
            pageNames: creators,
            userEmail: localStorage.getItem("email")
          })
          .then((response) => {
            console.log(response.data);
            setExclusiveData(response.data);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }, []);

  return (
    <div style={{ paddingTop: "1.5rem", paddingInline: "2rem" }}>
      <Typography>View Subscribed Creators' Exclusive Content</Typography>
      <Grid container spacing={3} style={{ marginTop: "0rem" }}>
        {exclusiveData &&
          exclusiveData.map((element) => {
            return (
              <Grid item>
                <Card style={{ padding: "1rem", backgroundColor: "lightgray" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    style={{ marginBottom: ".5rem" }}
                  >
                    <Grid item>
                      <Typography variant="h6" color="primary">
                        {element.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" color="textSecondary">
                        {new Date(element.date).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>

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

export default Exclusive;
