import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";

const OSHWAForm = (props) => {
  const OSHWAFields = [
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

  function transformOSHWAField(OSHWAField) {
    const words = OSHWAField.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    const capitalized =
      words.charAt(0).toUpperCase() + words.slice(1);
    return capitalized;
  }

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
              <FormControl fullWidth sx={{marginTop: "2vh"}}>
                <InputLabel>{transformOSHWAField(element.OSHWAField)}</InputLabel>
                <Select label={transformOSHWAField(element.OSHWAField)} onChange={formik.handleChange} helperText="test">
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
                <FormHelperText>{element.description}</FormHelperText>
              </FormControl>
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
