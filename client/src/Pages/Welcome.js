import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import StepperBar from "../Components/StepperBar";

const Welcome = () => {
  const [pageName, setPageName] = useState("");

  return (
    <Container maxWidth="md">
      <StepperBar activeStep={0} />
      <Typography variant="h3" component="h3" align="center">
        Enter the article you would like to submit for OSHWA.
      </Typography>
      <TextField fullWidth onChange={(e) => setPageName(e.target.value)} />
      <div style={{ display: "flex", justifyContent: "center", margin: "2vh" }}>
        <Button variant="contained" href={`/certify/${pageName}`}>
          Yes, check validity
        </Button>
      </div>
    </Container>
  );
};

export default Welcome;
