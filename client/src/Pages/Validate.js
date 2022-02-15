import {
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApproFields from "../components/ApproFields";
import OSHWAForm from "../components/OSHWAForm";

const Validity = () => {
  const params = useParams();
  const pageName = params?.pageName;

  // valid = ({} of partial OSHWA data OR [] of missing fields)
  const [valid, setValid] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://oshwa-appro-jackpeplinski.vercel.app/checkValidity/${pageName}`
      )
      .then((res) => {
        setIsLoaded(true);
        setValid(res?.data);
      });
  });

  // const valid = {
  //   responsiblePartyType: "Organization", //r "Organization"
  //   responsibleParty: "Affli", //r [Affliations]
  //   bindingParty: "Jack", //r [Page authors]
  //   country: "Canada", //r [Map result]
  //   projectName: "Title", //r [Title]
  //   projectWebsite: "URL", // [URL]
  //   primaryType: "Some primary type", //r [Uses]
  //   hardwareLicense: "Other", //r "Other"
  //   softwareLicense: "Other", //r "Other"
  //   documentationLicense: "Other", //r "Other"
  // };
  return (
    <Container maxWidth="md">
      {!isLoaded ? (
        <LinearProgress />
      ) : Array.isArray(valid) ? (
        <ApproFields missingFields={valid} />
      ) : (
        <OSHWAForm parsedApproData={valid} />
      )}
    </Container>
  );
};

export default Validity;
