import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import {
  OSHWAAgreeFields,
  OSHWATextFields,
  OSHWATruthFields,
} from "../text/OSHWAForm";
import axios from "axios";

const OSHWAForm = (props) => {
  function transformOSHWAField(OSHWAField) {
    const words = OSHWAField.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    const capitalized = words.charAt(0).toUpperCase() + words.slice(1);
    return capitalized;
  }

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      const certificationMarkTerms = {};
      for (const obj of OSHWAAgreeFields) {
        var agreement = false;
        if (values[obj.OSHWAField] == "on") agreement = true;

        certificationMarkTerms[obj.OSHWAField] = {};
        certificationMarkTerms[obj.OSHWAField].agreement = agreement;

        delete values[obj.OSHWAField];
      }
      const OSHWAData = {
        ...props.parsedApproData,
        ...values,
        certificationMarkTerms,
      };

      axios
        .post(
          "https://oshwa-appro-jackpeplinski.vercel.app/submitCertification",
          {
            headers: {
              "Content-Type": "application/json",
            },
            data: OSHWAData,
          }
        )
        .then((res) => {
          console.log(res);
        });

      // @todo send data to OSHWA
      console.log(OSHWAData);
    },
  });

  return (
    <React.Fragment>
      <Typography variant="h3" component="h3" align="center">
        We've already got most of the data we need! Just fill out the few fields
        below.
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {OSHWATruthFields.map((element, index) => (
          <div style={{ marginBottom: "2vh" }} key={index}>
            <Typography variant="body1">{element.description}</Typography>
            <FormControl fullWidth sx={{ margin: "2vh 0" }}>
              <InputLabel>{transformOSHWAField(element.OSHWAField)}</InputLabel>
              <Select
                defaultValue=""
                label={transformOSHWAField(element.OSHWAField)}
                name={element.OSHWAField}
                onChange={formik.handleChange}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
              {formik.values[element.OSHWAField] == false && (
                <TextField
                  placeholder="Required if answered false above."
                  name={element.explanationField}
                  multiline
                  rows={2}
                  onChange={formik.handleChange}
                />
              )}
            </FormControl>
            <Divider />
          </div>
        ))}
        {OSHWAAgreeFields.map((element, index) => (
          <div style={{ marginBottom: "2vh" }} key={index}>
            <FormControlLabel
              control={<Checkbox />}
              label={element.term}
              name={element.OSHWAField}
              onChange={formik.handleChange}
            />
          </div>
        ))}
        {OSHWATextFields.map((element, index) => (
          <div style={{ margin: "2vh 0" }} key={index}>
            <Typography variant="body1">{element.description}</Typography>
            <TextField
              fullWidth
              name={element.OSHWAField}
              multiline
              rows={2}
              onChange={formik.handleChange}
            />
          </div>
        ))}
        <FormControlLabel
          name="agreementTerms"
          onChange={formik.handleChange}
          control={<Checkbox />}
          label="I agree to the terms of the OSHWA Open Source Hardware Certification Mark License Agreement, including the Requirements for Certification and Usage Guidelines incorporated by reference and including license terms that are not present in or conflict with this web form. I acknowledge that by agreeing to the terms of the OSHWA Open Source Hardware Certification Mark License Agreement that I am binding the entity listed to the License Agreement. I recognize that I will receive my unique identification number that allows me to promote my project as OSHWA Open Source Hardware Certified in compliance with the user guidelines via the email provided to OSHWA after submitting this form."
        />
        <Button fullWidth color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
};

export default OSHWAForm;
