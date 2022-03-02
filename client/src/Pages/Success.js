import React from "react";
import { Button, Container, Typography } from "@mui/material";

const Success = () => {
    // @todo maybe change copy.
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h3" align="center">
        <b>Success!</b> Your project has been submitted.
      </Typography>
    </Container>
  );
};

export default Success;
