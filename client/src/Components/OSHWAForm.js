import {
  Button,
  Divider,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Field, Form, Formik, useField, useFormikContext } from "formik";
import { AgreeFields, DescFields, TruthFields } from "../text/OSHWAForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import StepperBar from "./StepperBar";
import "../index.css";

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
    </>
  );
};

const OSHWAForm = (props) => {
  // why do I still get a few his here
  // console.log("hi");
  const params = useParams();
  const pageName = params?.pageName;
  let navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(true);

  const onSubmit = async (values, props) => {
    setIsLoaded(false);
    const certificationMarkTerms = {};
    for (const obj of AgreeFields) {
      certificationMarkTerms[obj.OSHWAField] = {};
      certificationMarkTerms[obj.OSHWAField].agreement = values[obj.OSHWAField];
      delete values[obj.OSHWAField];
    }

    const OSHWAData = JSON.stringify({
      ...props.parsedApproData,
      ...values,
      certificationMarkTerms,
    });

    var config = {
      method: "post",
      url: "https://oshwa-appro-jackpeplinski.vercel.app/submitCertification",
      headers: {
        "Content-Type": "application/json",
      },
      data: OSHWAData,
    };

    axios(config)
      .then(function (response) {
        navigate("/Success");
      })
      .catch(function (error) {
        navigate("/Failure");
        console.log(error);
      });
  };

  return (
    <>
      {isLoaded ? (
        <>
          <StepperBar activeStep={2} />
          <Typography variant="h3" component="h3" align="center">
            Please complete following sections.
          </Typography>
          <Divider style={{ margin: "2vh 0" }} />
          <Typography variant="h6" component="h6" align="center">
            <strong>Section 1:</strong> This is the available data for this
            page. Please ensure the data below is correct or make any changes to
            the page before continuing to the next stage of the certification
            tool.
          </Typography>
          <List style={{ padding: "0" }}>
            {Object.keys(props.parsedApproData).map((element, index) => (
              <ListItemButton key={index}>
                <ListItemText>
                  <strong>{element}:</strong> {props.parsedApproData[element]}
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2vh",
            }}
          >
            <Button
              variant="contained"
              href={`https://www.appropedia.org/w/index.php?title=${pageName}&action=edit`}
            >
              Make changes
            </Button>
          </div>
          <Divider style={{ margin: "2vh 0" }} />
          <Typography variant="h6" component="h6" align="center">
            <strong>Section 2: </strong>Please complete the form below.
          </Typography>
          <Formik
            initialValues={{
              explanationCertificationDescriptions: "",
              relationship: "",
              parentName: "",
            }}
            onSubmit={(values) => onSubmit(values, props)}
          >
            <Form style={{ padding: "2vh 0" }}>
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
                </div>
              ))}
              <Field type="checkbox" name="agreementTerms" />
              <Typography paragraph={true} style={{ display: "inline" }}>
                I agree to the terms of the{" "}
                <a href="https://certification.oshwa.org/license-agreement">
                  OSHWA Open Source Hardware Certification Mark License
                  Agreement
                </a>
                , including the Requirements for Certification and Usage
                Guidelines incorporated by reference and including license terms
                that are not present in or conflict with this web form. I
                acknowledge that by agreeing to the terms of the OSHWA Open
                Source Hardware Certification Mark License Agreement that I am
                binding the entity listed to the License Agreement. I recognize
                that I will receive my unique identification number that allows
                me to promote my project as OSHWA Open Source Hardware Certified
                in compliance with the{" "}
                <a href="https://github.com/oshwa/certification-mark">
                  user guidelines
                </a>{" "}
                via the email provided to OSHWA after submitting this form.
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2vh",
                }}
              >
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Formik>
        </>
      ) : (
        <LinearProgress />
      )}
    </>
  );
};

export default OSHWAForm;
