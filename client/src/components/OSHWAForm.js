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
      {props.description}
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
          hi
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
        </Form>
      </Formik>
    </>
  );
};

export default OSHWAForm;
