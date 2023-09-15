import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../../../constant/serverUrl";

function Projects() {
  const [projects, setProjects] = React.useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    let value = event.target.value;
    value = parseInt(value);

    setInputValue(value + parseInt(inputValue));
  };

  React.useEffect(() => {
    axios
      .get(SERVER_URL + "/projects")
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch((err) => {});
  }, []);

  const amountRef = React.useRef(null);
  const amountRefs = React.useRef([]);

  const [amount, setAmount] = useState(232);

  const handlePledge = (pageName, projectTitle, idx) => {
    const pledgeAmount = parseInt(amountRefs.current[idx].value);

    setAmount(pledgeAmount); //
    // setAmount(amountRefs.current[idx].value);

    handlePayment();
    console.log(parseInt(amountRefs.current[idx].value));

    axios
      .post(SERVER_URL + "/creator/project/pledge", {
        timestamp: Date.now(),
        projectTitle: projectTitle,
        amount: amountRefs.current[idx].value,
        pageName: pageName,
        audienceEmail: localStorage.getItem("email"),
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
      })
      .then(() => {
        axios
          .get(SERVER_URL + "/projects")
          .then((response) => {
            setProjects(response.data);
          })
          .catch((err) => {});
      })
      .catch((err) => console.log(err));
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
        if (element.amount != null) {
          raisedAmount += parseInt(element.amount);
        }
      });
    }

    return raisedAmount;
  };

  const handlePayment = () => {
    console.log(typeof amountRefs);
    const options = {
      key: "rzp_test_XphPOSB4djGspx", // Replace with your actual Key ID
      key_secret: "CCrxVo3coD3SKNM3a0Bbh2my",
      amount: amount * 100,
      // Amount in paisa (e.g., 1000 paisa = ₹10)
      currency: "INR",
      name: "Fundify",
      description: "Payment for Product",
      // order_id: Math.random(), // Generate a unique receipt for each transaction
      handler: function (response) {
        console.log(response);
        //response.razorpay_payment_id
        alert("payment done");
      },
      prefill: {
        name: "Sandeep Kumar",
        email: "sd769113@gmail.com",
        contact: "7839107384",
      },
      notes: {
        address: "Fundify Corporate office",
      },
      theme: {
        color: "#F37254", // Customize the color of the Razorpay button
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Grid
      container
      style={{
        padding: "2rem",
        paddingLeft: "120px",
        backgroundColor: "black",
      }}
      spacing={8}
    >
      {amount}
      {projects.length > 0 &&
        projects.map((element, idx) => {
          return (
            <Grid item>
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
                  style={{ paddingInline: "1rem", paddingTop: ".5rem" }}
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
                <Typography paddingLeft={2} color="lightgrey">
                  <b>Amount (in ₹)</b>
                </Typography>
                <CardActions>
                  <Grid
                    container
                    paddingX={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <input
                      type="number"
                      size={10}
                      ref={(ref) => (amountRefs.current[idx] = ref)}
                      style={{ paddingBlock: ".25rem" }}
                    />
                    <br />
                    <span style={{ marginInline: ".25rem" }}></span>
                    <Button
                      style={{
                        paddingTop: "1px",
                        backgroundColor: "teal",
                        color: "white",
                      }}
                      size="small"
                      onClick={() =>
                        handlePledge(element.pageName, element.title, idx)
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
