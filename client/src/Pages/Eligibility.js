import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";

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
   function onSubmit() {
       console.log("submitting!")
   }
  const OSHWAFields = ["field1", "field2", "field3"];
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1">
        We've already got most of the data we need! Just fill out the few fields
        below.
      </Typography>
      <form onSubmit={onSubmit}>
        {OSHWAFields.map((field) => (
          <TextField label={field} />
        ))}
      </form>
      <Button variant="contained">Submit</Button>
    </Container>
  );
};

export default Eligibility;
