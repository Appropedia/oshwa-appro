import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import StepperBar from "../Components/StepperBar";

const Welcome = () => {
  const [pageName, setPageName] = useState("");

  const onChange = (e) => {
    const url = e.target.value;
    setPageName(url.substring(url.lastIndexOf("/") + 1));
    console.log(pageName);
  };

  return (
    <Container maxWidth="md">
      <StepperBar activeStep={0} />
      <Typography
        variant="h3"
        component="h3"
        align="center"
        style={{ margin: "2vh" }}
      >
        Enter the URL of the page you'd like to submit for OSHWA Certification.
      </Typography>
      <TextField fullWidth onChange={(e) => onChange(e)} />
      <div style={{ display: "flex", justifyContent: "center", margin: "2vh" }}>
        <Button variant="contained" href={`/certify/${pageName}`}>
          Yes, check validity
        </Button>
      </div>
    </Container>
  );
};

export default Welcome;
