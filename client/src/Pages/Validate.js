import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import ApproFields from "../components/ApproFields";
import OSHWAForm from "../components/OSHWAForm";

const Eligibility = () => {
  /*
    validate = {
        eligible: boolean;
        errors: [{
            field: string,
            error: string
        }]
    } 
  */
  return (
    <Container maxWidth="md">
      {/* <OSHWAForm/>  */}
      <ApproFields/>
    </Container>
  );
};

export default Eligibility;
