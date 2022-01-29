import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
const Certification = () => {
  const params = useParams();
  const pageName = params?.pageName;
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1">{pageName} is not certified. Would you like to certify it?</Typography>
      <Button variant="contained" href={"/eligibilty"}>Yes, check eligibilty</Button>
      <Button variant="outlined">No, learn more</Button>
    </Container>
  );
};

export default Certification;
