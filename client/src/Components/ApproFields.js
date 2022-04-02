import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const ApproFields = (props) => {
  const params = useParams();
  const pageName = params?.pageName;

  return (
    <div>
      <Typography variant="h3" component="h3" align="center">
        Please correct these items on the Appropedia page.
      </Typography>
      <Typography variant="h6" component="h6" align="center">
        Visit{" "}
        <a
          href="https://www.appropedia.org/Appropedia:OSHWA_Certification_tool_design/Documentation#Feedback"
        >
          this page
        </a>{" "}
        to learn more.
      </Typography>
      <List>
        {props.missingFields.map((field) => (
          <ListItemButton>
            <ListItemText>{field}</ListItemText>
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
          Make Changes
        </Button>
      </div>
    </div>
  );
};

export default ApproFields;
