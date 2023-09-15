import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../constant/serverUrl";
import { useHistory } from "react-router-dom";

function Projects() {
  const history = useHistory();

  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(SERVER_URL + "/projects")
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch((err) => {});
  }, []);



  const amountRef = React.useRef();

  const handlePledge = (pageName, projectTitle) => {
    history.push("/login");
  };

  const alreadyPledged = (audience) => {
    let alreadyPledged = false;

    if (audience.length > 0) {
      audience.forEach((element, index) => {
        if (element.audienceEmail === localStorage.getItem("email")) {
          alreadyPledged = true;
        }
      });
    }

    return alreadyPledged;
  };

  const getRaisedAmount = (audience) => {
    let raisedAmount = 0;

    if (audience.length > 0) {
      audience.forEach((element) => {
        if (element.amount && element.amount != null) {
        raisedAmount += parseInt(element.amount);
        }
      });
    }

    return raisedAmount;
  };

  return (
    <Grid
      container
      style={{ padding: "2rem", backgroundColor: "black" }}
      spacing={4}
    >
      {projects.length > 0 &&
        projects.map((element) => {
          return (
            <Grid item style={{ marginLeft: "52px" }} >
              <Card
               sx={{
                width: 345,
                "&:hover": {
                  boxShadow: "0 4px 8px white", // Update with your desired shadow style
                },
              }}
             
                elevation={4}
                key={element.title}
                style={{
                  // borderRadius: "22px",
                  margin: "0 auto",
                  borderRadius: "8px",
                  backgroundColor: "#222222",
                  color: "white",
                 
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={element.projectURL}
                  alt={element.title}
                  style={{ paddingInline: "1rem", 
                  paddingTop: ".5rem",
                  color:"white" 
                }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {element.title}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {element.description}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{
                    paddingInline: "1rem",
                    paddingTop: "0rem",
                    paddingBottom: "1rem",
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item>
                          <b style={{ color: "orange" }}>
                            Required:&ensp;₹&nbsp;{element.amount}
                          </b>
                        </Grid>
                        <Grid item>
                          <b style={{ color: "lime" }}>
                            Raised:&ensp;₹ {getRaisedAmount(element.audience)}
                          </b>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardActions>
                <Typography paddingLeft={2} color="lightgrey"><b>Amount (in ₹)</b></Typography>
                <CardActions>
                  <Grid container paddingX={1} justifyContent="space-between" alignItems="center">
                    <input
                      type="number"
                      size={10}
                      ref={amountRef}
                      style={{ paddingBlock: ".25rem",backgroundColor:"black", color:"white" }}
                     
                    />
                    <br/>
                    <span style={{ marginInline: ".25rem" }}></span>
                    <Button
             
                      style={{ paddingTop: "1px", backgroundColor: "teal",
                      color:"white" }}
                 
                      size="small"
                      onClick={() =>
                        handlePledge(element.pageName, element.title)
                      }
                      // disabled={alreadyPledged(element.audiences)}
                    >
                      {/* {alreadyPledged(element.audiences) ? 'Pledged' : 'Pledge'} */}
                      Pledge
                    </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}

export default Projects;
