import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Field,
  Form,
  Formik,
  useField,
  useFormik,
  useFormikContext,
} from "formik";
import { AgreeFields, TextFields, TruthFields } from "../text/OSHWAForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { display } from "@mui/system";

const CheckboxExplanation = (props) => {
  const { values, touched } = useFormikContext();
  const [field] = useField(props);
  const [explanation, setExplanation] = useState(true);

  console.log(values[props.name]);
  console.log(touched);
  useEffect(() => {
    console.log("useeffect");
    if (!values[props.name]) {
      setExplanation(true);
    } else {
      setExplanation(false);
    }
  }, [values, touched, props.name]);

  return (
    <>
      <Field type="checkbox" name={props.OSHWAField} />
      <Typography paragraph="true" style={{ display: "inline" }}>
        {props.description}
      </Typography>
      {explanation ? <input type="text" name={props.explanationField} /> : ""}
    </>
  );
};

const OSHWAForm = () => {
  // why do I still get a few his here
  // console.log("hi");

  return (
    <>
      <Formik initialValues={{}}>
        <Form>
          {TruthFields.map((element, index) => (
            <div key={index}>
              <CheckboxExplanation
                name={element.OSHWAField}
                OSHWAField={element.OSHWAField}
                description={element.description}
                explanationField={element.explanationField}
              />
            </div>
          ))}
          {AgreeFields.map((element, index) => (
            <div key={index}>
              <Field type="checkbox" name={element.OSHWAField} />
              <Typography paragraph="true" style={{ display: "inline" }}>
                {element.description}
              </Typography>
            </div>
          ))}
          {TextFields.map((element, index) => (
            <div key={index}>
              <Typography paragraph="true" style={{ display: "inline" }}>
                {element.description}
              </Typography>
              <input type="text" />
            </div>
          ))}
          <input type="checkbox" />
          <Typography paragraph="true" style={{ display: "inline" }}>
            I agree to the terms of the OSHWA Open Source Hardware Certification
            Mark License Agreement, including the Requirements for Certification
            and Usage Guidelines incorporated by reference and including license
            terms that are not present in or conflict with this web form. I
            acknowledge that by agreeing to the terms of the OSHWA Open Source
            Hardware Certification Mark License Agreement that I am binding the
            entity listed to the License Agreement. I recognize that I will
            receive my unique identification number that allows me to promote my
            project as OSHWA Open Source Hardware Certified in compliance with
            the user guidelines via the email provided to OSHWA after submitting
            this form.
          </Typography>
        </Form>
      </Formik>
    </>
  );
};

export default OSHWAForm;
