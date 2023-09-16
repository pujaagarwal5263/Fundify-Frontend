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
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useHistory } from "react-router";

function Creators() {
  const [isOpen, setIsOpen] = useState(false);

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

  const [open, setOpen] = useState(false);

  const [subscription, setSubscription] = React.useState(129);

  const handleSubscribe = (pageName) => {
    handlePayment();
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

  const handleOpen = () => {
    console.log("sdsdsd");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handlePayment = async() => {
    // const options = {
    //   key: "rzp_test_XphPOSB4djGspx", // Replace with your actual Key ID
    //   key_secret: "CCrxVo3coD3SKNM3a0Bbh2my",
    //   amount: `${subscription * 100}`, // Amount in paisa (e.g., 1000 paisa = ₹10)
    //   currency: "INR",
    //   name: "Fundify",
    //   description: "Payment for Product",
    //   // order_id: Math.random(), // Generate a unique receipt for each transaction
    //   handler: function (response) {
    //     handleOpen();
    //     console.log(response);
    //     //response.razorpay_payment_id
    //     alert("payment done");
    //   },
    //   prefill: {
    //     name: "Sandeep Kumar",
    //     email: "sd769113@gmail.com",
    //     contact: "7839107384",
    //   },
    //   notes: {
    //     address: "Fundify Corporate office",
    //   },
    //   theme: {
    //     color: "#F37254", // Customize the color of the Razorpay button
    //   },
    // };

    // const rzp = new window.Razorpay(options);
    // rzp.open();
    try {
      const response = await axios.post(`${SERVER_URL}/orders`, { amount: parseInt(subscription) * 100 }); // Convert to paise
      //const { id } = response.data;
     // setOrderId(id);
      const options = {
        key: 'rzp_test_XphPOSB4djGspx',
        amount: subscription * 100, // Amount in paise
        name: 'Your Company Name',
        description: 'Payment for your services',
       // order_id: id,
        handler: function (response) {
          // Handle the successful payment response here
          alert('Payment successful');
        },
        prefill: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '1234567890',
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
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
