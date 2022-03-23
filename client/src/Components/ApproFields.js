import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";

const ApproFields = (props) => {
  return (
    <div>
      <Typography variant="h3" component="h3" align="center">
        Please correct these items on the Appropedia page.
      </Typography>
      <Typography variant="h6" component="h6" align="center">
        Click to learn more!
      </Typography>
      <List>
        {props.missingFields.map((field) => (
          <ListItemButton>
            <ListItemText>{field}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default ApproFields;
