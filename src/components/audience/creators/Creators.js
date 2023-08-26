import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../../../constant/serverUrl";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useHistory } from "react-router";

function Creators() {
  let history = useHistory();

  const [creators, setCreators] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(SERVER_URL + "/creators")
      .then((response) => {
        setCreators(response.data);
      })
      .catch((err) => {});
  }, []);

  const getImage = (pageName) => {
    return (
      SERVER_URL +
      "/images/creators/" +
      pageName +
      "/profile/" +
      pageName +
      ".jpg"
    );
  };

  const [subscription, setSubscription] = React.useState(129);

  const handleSubscribe = (pageName) => {
    axios
      .post(SERVER_URL + "/creator/subscribe", {
        audienceEmail: localStorage.getItem("email"),
        amount: subscription,
        pageName: pageName,
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
      })
      .then(() => {
        axios
          .get(SERVER_URL + "/creators")
          .then((response) => {
            setCreators(response.data);
          })
          .catch((err) => {});
      })
      .catch(() => {});
  };

  const alreadySubscribed = (audiences) => {
    let alreadySubscribed = false;
    audiences.forEach((element, index) => {
      if (element.audienceEmail === localStorage.getItem("email")) {
        alreadySubscribed = true;
      }
    });
    return alreadySubscribed;
  };

  return (
    <Grid
      container
      style={{
        padding: "2rem",
        backgroundColor: "black",
        paddingLeft: "120px",
      }}
      spacing={8}
    >
      {creators.map((element) => {
        return (
          <Grid style={{ background: "black" }} item>
            <Card
              style={{
                margin: "0 auto",
                borderRadius: "8px",
                backgroundColor: "#222222",
                color: "white",
                padding: "10px",
              }}
              sx={{
                width: 345,
                "&:hover": {
                  boxShadow: "0px 4px 4px white !important", // Update with your desired shadow style
                },
              }}
              elevation={4}
              key={element.pageName}
            >
              <CardMedia
                component="img"
                height="200"
                image={element.profileURL}
                alt={element.pageName}
                style={{ paddingInline: "1rem", paddingTop: ".5rem" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="white"
                  component="div"
                >
                  {element.pageName}
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
                <FormControl
                  component="fieldset"
                  style={{
                    marginRight: ".5rem",
                  }}
                >
                  <RadioGroup
                    row
                    aria-label="subscription"
                    name="subscription"
                    defaultValue="129"
                    onChange={(event) => {
                      setSubscription(Number(event.target.value));
                    }}
                  >
                    <FormControlLabel
                      value="129"
                      control={<Radio />}
                      label="₹129"
                    />
                    <FormControlLabel
                      value="299"
                      control={<Radio />}
                      label="₹299"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  sx={{
                    backgroundColor: "#555555",
                    "&:hover": {
                      backgroundColor: "#D10000",
                    },
                  }}
                  style={{}}
                  color="inherit"
                  // variant="contained"
                  onClick={() => handleSubscribe(element.pageName)}
                  disabled={alreadySubscribed(element.audience)}
                >
                  {alreadySubscribed(element.audience)
                    ? "Subscribed"
                    : "Subscribe"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Creators;
