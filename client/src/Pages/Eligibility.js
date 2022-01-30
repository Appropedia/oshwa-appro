import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
  useFormik,
} from "formik";

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

  const OSHWAFields = ["test1", "test2"];
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1">
        We've already got most of the data we need! Just fill out the few fields
        below.
      </Typography>
      <div>
        <form onSubmit={formik.handleSubmit}>
          {OSHWAFields.map((element, index) => (
            <TextField
              fullWidth
              label={element}
              name={element}
              onChange={formik.handleChange}
            />
          ))}
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Eligibility;
