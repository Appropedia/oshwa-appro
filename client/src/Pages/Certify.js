import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import StepperBar from "../Components/StepperBar";

const Certify = () => {
  const params = useParams();
  const pageName = params?.pageName;
  
  return (
    <Container maxWidth="md">
      <StepperBar activeStep={1} />
      <div style={{ margin: "2vh" }}>
        <Typography variant="h3" component="h3" align="center">
          <b>{pageName}</b> is not certified.
        </Typography>
        <Typography variant="h3" component="h3" align="center">
          Would you like to certify it?
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "2vh" }}>
        <Button variant="contained" href={`/validate/${pageName}`}>
          Yes, certify 
        </Button>
        <Button variant="outlined">No, learn more</Button>
      </div>
    </Container>
  );
};

export default Certify;
