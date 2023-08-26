import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import View from "./View";
import New from "./New";
import { SERVER_URL } from "../../../constant/serverUrl";

function Exclusive() {
  const [exclusiveData, setExclusiveData] = useState([]);

  useEffect(() => {
    axios
      .post(SERVER_URL + "/creator/exclusive/view", {
        pageName: localStorage.getItem("pageName"),
      })
      .then((response) => setExclusiveData(response.data))
      .catch((err) => {});
  }, []);

  const handleViewExclusive = () => {
    let pageName = localStorage.getItem("pageName");
    axios
      .post(SERVER_URL + "/creator/exclusive/view", { pageName: pageName })
      .then((response) => {
        setExclusiveData(response.data);
      })
      .catch((err) => {});
  };

  return (
    <Grid container style={{ padding: "2rem" }}>
      <Grid item xs={8}>
        <View data={exclusiveData} />
      </Grid>

      <Grid item xs={4}>
        <New handleViewExclusive={handleViewExclusive} />
      </Grid>
    </Grid>
  );
}

export default Exclusive;
