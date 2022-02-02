import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
var axios = require("axios");

const OSHWAForm = (props) => {
  const OSHWATruthFields = [
    {
      OSHWAField: "noCommercialRestriction",
      explanationField: "explanationNcr",
      description:
        "The project is licensed in a way to allow for modifications and derivative works without commercial restriction.",
    },
    {
      OSHWAField: "noDocumentationRestriction",
      explanationField: "explanationNdr",
      description:
        "There is no restriction within my control to selling or giving away the project documentation.",
    },
    {
      OSHWAField: "openHardwareComponents",
      explanationField: "explanationOhwc",
      description:
        "Where possible, I have chosen to use components in my hardware that are openly licensed.",
    },
    {
      OSHWAField: "creatorContribution",
      explanationField: "explanationCcr",
      description: `I understand and comply with the "Creator Contribution requirement," explained in the Requirements for Certification.`,
    },
    {
      OSHWAField: "noUseRestriction",
      explanationField: "explanationNur",
      description: `There is no restriction on the use by persons or groups, or by the field of endeavor.`,
    },
    {
      OSHWAField: "redistributedWork",
      explanationField: "explanationRwr",
      description: `The rights granted by any license on the project applies to all whom the work is redistributed to.`,
    },
    {
      OSHWAField: "noSpecificProduct",
      explanationField: "explanationNsp",
      description: `The rights granted under any license on the project do not depend on the licensed work being part of a specific product.`,
    },
    {
      OSHWAField: "noComponentRestriction",
      explanationField: "explanationNor",
      description: `The rights granted under any license on the project do not restrict other hardware or software, for example by requiring that all other hardware or software sold with the item be open source.`,
    },
    {
      OSHWAField: "technologyNeutral",
      explanationField: "explanationTn",
      description: `The rights granted under any license on the project do not restrict other hardware or software, for example by requiring that all other hardware or software sold with the item be open source.`,
    },
  ];

  const OSHWAAgreeFields = [
    {
      OSHWAField: "accurateContactInformation",
      term: "I have provided OSHWA with accurate contact information, recognize that all official communications from OSHWA will be directed to that contact information, and will update that contact information as necessary.",
    },
    {
      OSHWAField: "complianceWithOfficialCertificationGuidelines",
      term: "I will only use the certification mark in compliance with official certification guidelines.",
    },
    {
      OSHWAField: "oshwaCertificationMark",
      term: "I acknowledge that all right, title, and interest in the certification mark remains with OSHWA.",
    },
    {
      OSHWAField: "violationsEnforcement",
      term: "I have the ability to bind those responsible for the certified item to this agreement.",
    },
  ];

  const OSHWATextFields = [
    {
      OSHWAField: "explanationCertificationTerms",
      description:
        "If you do not agree with any of the above terms, please explain.",
    },
    {
      OSHWAField: "relationship",
      description:
        "Briefly describe your relationship to the certified item (e.g. 'I am the primary developer of the certified item.' or 'This is my personal project.')",
    },
    {
      OSHWAField: "parentName",
      description:
        "If you are the parent or legal guardian entering into this agreement on behalf of an individual under the age of 18, please provide your name to certify that you also agree to be bound by this agreement.",
    },
  ];

  function transformOSHWAField(OSHWAField) {
    const words = OSHWAField.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    const capitalized = words.charAt(0).toUpperCase() + words.slice(1);
    return capitalized;
  }

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      const certificationMarkTerms = {};
      for (const obj of OSHWATextFields) {
        certificationMarkTerms[obj.OSHWAField] = values[obj.OSHWAField];
        delete values[obj.OSHWAField];
      }
      const OSHWAData = { ...props.parsedApproData, ...values };
      // send OSHWAData to server to be sent to OSHWA
      console.log(JSON.stringify(values, null, 2));
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
            {OSHWATruthFields.map((element, index) => (
              <div style={{ marginBottom: "2vh" }} key={index}>
                <Typography variant="body1">{element.description}</Typography>
                <FormControl fullWidth sx={{ margin: "2vh 0" }}>
                  <InputLabel>
                    {transformOSHWAField(element.OSHWAField)}
                  </InputLabel>
                  <Select
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
                      maxRows={4}
                      onChange={formik.handleChange}
                    />
                  )}
                </FormControl>
                <Divider />
              </div>
            ))}
            {OSHWAAgreeFields.map((element, index) => (
              <div style={{ marginBottom: "2vh" }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={element.term}
                  name={element.OSHWAField}
                  onChange={formik.handleChange}
                />
              </div>
            ))}
            {OSHWATextFields.map((element, index) => (
              <div style={{ margin: "2vh 0" }}>
                <Typography variant="body1">{element.description}</Typography>
                <TextField
                  fullWidth
                  name={element.OSHWAField}
                  multiline
                  rows={2}
                  maxRows={4}
                  onChange={formik.handleChange}
                />
              </div>
            ))}
            {console.log(formik.values)}
            <FormControlLabel
              name="agreementTerms"
              onChange={formik.handleChange}
              control={<Checkbox />}
              label="I agree to the terms of the OSHWA Open Source Hardware Certification Mark License Agreement, including the Requirements for Certification and Usage Guidelines incorporated by reference and including license terms that are not present in or conflict with this web form. I acknowledge that by agreeing to the terms of the OSHWA Open Source Hardware Certification Mark License Agreement that I am binding the entity listed to the License Agreement. I recognize that I will receive my unique identification number that allows me to promote my project as OSHWA Open Source Hardware Certified in compliance with the user guidelines via the email provided to OSHWA after submitting this form."
            />
            <Button fullWidth color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default OSHWAForm;
