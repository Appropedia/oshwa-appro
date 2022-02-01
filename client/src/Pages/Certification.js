import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const Certification = () => {
  const params = useParams();
  const pageName = params?.pageName;
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h3" align="center">
        <b>{pageName}</b> is not certified.
      </Typography>
      <Typography variant="h3" component="h3" align="center">
        Would you like to certify it?
      </Typography>
      <div style={{display: "flex", justifyContent:"center", gap:"2vw"}}>
        <Button variant="contained" href={"/validate"}>
          Yes, check validity
        </Button>
        <Button variant="outlined">No, learn more</Button>
      </div>
    </Container>
  );
};

export default Certification;
