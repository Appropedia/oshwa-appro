import React from "react";
import { Container, Typography } from "@mui/material";

const Failure = () => {
    // @todo maybe change copy.
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h3" align="center">
        <b>Failure!</b> Your project was not submitted. 
      </Typography>
    </Container>
  );
};

export default Failure;
