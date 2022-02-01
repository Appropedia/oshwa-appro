import { Typography } from "@mui/material";
import React from "react";

const ApproFields = (props) => {
  /*
    items = ["field1"]
    */
  return (
    <div>
      <Typography variant="h3" component="h3" align="center">
        Please correct these items on the Appropedia page.
      </Typography>

      <ul>
        {props.missingFields.map((field) => (
          <li>{field}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApproFields;
