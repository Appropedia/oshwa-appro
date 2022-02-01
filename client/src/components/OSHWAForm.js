import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";

const OSHWAForm = () => {
  const OSHWAFields = ["test1", "test2"];

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <React.Fragment>
      <Typography variant="h3" component="h3" align="center">
        We've already got most of the data we need! Just fill out the few fields
        below.
      </Typography>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            {OSHWAFields.map((element, index) => (
              <TextField
                fullWidth
                sx={{ marginTop: "2vh" }}
                label={element}
                name={element}
                onChange={formik.handleChange}
              />
            ))}
            <Button
              fullWidth
              sx={{ marginTop: "2vh" }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default OSHWAForm;
