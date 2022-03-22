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
import React, { useEffect } from "react";
import {
  Field,
  Form,
  Formik,
  useField,
  useFormik,
  useFormikContext,
} from "formik";
import { AgreeFields, DescFields, TruthFields } from "../text/OSHWAForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { display } from "@mui/system";
import StepperBar from "./StepperBar";

const TruthField = (props) => {
  const { values, setFieldValue } = useFormikContext();
  const [field] = useField(props);

  useEffect(() => {
    if (values.recommendedOptions) {
      setFieldValue(props.name, true);
    } else {
      setFieldValue(props.name, false);
    }
  }, [values.recommendedOptions, props.name, setFieldValue]);

  return (
    <>
      <input {...props} {...field} />
      <Typography paragraph={true} style={{ display: "inline" }}>
        {props.description}
      </Typography>
      {!values[props.name] ? <TextField fullWidth minRows={3} /> : ""}
    </>
  );
};

const AgreeField = (props) => {
  const { values, setFieldValue } = useFormikContext();
  const [field] = useField(props);

  useEffect(() => {
    if (values.recommendedOptions) {
      setFieldValue(props.name, true);
    } else {
      setFieldValue(props.name, false);
    }
  }, [values.recommendedOptions, props.name, setFieldValue]);

  return (
    <>
      <input {...props} {...field} />
      <Typography paragraph={true} style={{ display: "inline" }}>
        {props.description}
      </Typography>
    </>
  );
};

const DescField = (props) => {
  const { values, setFieldValue } = useFormikContext();
  const [field] = useField(props);

  useEffect(() => {
    if (values.recommendedOptions) {
      setFieldValue("parentName", "N/A");
      setFieldValue(
        "relationship",
        "I am the primary developer of the certified item."
      );
      setFieldValue("explanationCertificationDescriptions", "N/A");
    }
  }, [values.recommendedOptions, props.name, setFieldValue]);

  return (
    <>
      <Typography paragraph={true} style={{ display: "inline" }}>
        {props.description}
      </Typography>
      <TextField fullWidth minRows={3} {...field} />
      {/* <input {...props} {...field}/> */}
    </>
  );
};

const onSubmit = async (values, props) => {
  // console.log(props)
  const certificationMarkTerms = {};
  for (const obj of AgreeFields) {
    certificationMarkTerms[obj.OSHWAField] = {};
    certificationMarkTerms[obj.OSHWAField].agreement = values[obj.OSHWAField];
    delete values[obj.OSHWAField];
  }
  const OSHWAData = {
    ...props.parsedApproData,
    ...values,
    certificationMarkTerms,
  };
  console.log(OSHWAData);
  axios
    .post("https://oshwa-appro-jackpeplinski.vercel.app/submitCertification", {
      headers: {
        "Content-Type": "application/json",
      },
      data: OSHWAData,
    })
    .then((res) => {
      console.log(res);
    });
};

const OSHWAForm = (props) => {
  // why do I still get a few his here
  // console.log("hi");

  return (
    <>
      <StepperBar activeStep={2} />
      <Formik
        initialValues={{
          explanationCertificationDescriptions: "",
          relationship: "",
          parentName: "",
        }}
        onSubmit={(values) => onSubmit(values, props)}
      >
        <Form>
          <Field type="checkbox" name="recommendedOptions" />{" "}
          <Typography paragraph={true} style={{ display: "inline" }}>
            Use the recommended options.
          </Typography>
          {TruthFields.map((element, index) => (
            <div key={index}>
              <TruthField
                type="checkbox"
                name={element.OSHWAField}
                description={element.description}
              />
            </div>
          ))}
          {AgreeFields.map((element, index) => (
            <div key={index}>
              <AgreeField
                type="checkbox"
                name={element.OSHWAField}
                description={element.description}
              />
            </div>
          ))}
          {DescFields.map((element, index) => (
            <div key={index}>
              <DescField
                name={element.OSHWAField}
                description={element.description}
              />
              {/* <Typography paragraph={true} style={{ display: "inline" }}>
                {element.description}
              </Typography>
              <TextField fullWidth minRows={3} /> */}
            </div>
          ))}
          <Field type="checkbox" name="agreementTerms" />
          <Typography paragraph={true} style={{ display: "inline" }}>
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
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default OSHWAForm;
