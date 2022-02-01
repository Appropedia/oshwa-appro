import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import ApproFields from "../components/ApproFields";
import OSHWAForm from "../components/OSHWAForm";

const Validity = () => {
  // valid = true OR [] of missing fields
  const valid = true;
  return (
    <Container maxWidth="md">
      {Array.isArray(valid) ? (
        <ApproFields missingFields={valid} />
      ) : (
        <OSHWAForm />
      )}
    </Container>
  );
};

export default Validity;
