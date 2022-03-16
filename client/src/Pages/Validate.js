import { Container, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApproFields from "../Components/ApproFields";
import OSHWAForm from "../Components/OSHWAForm";

const Validity = () => {
  const params = useParams();
  const pageName = params?.pageName;

  // // valid = ({} of partial OSHWA data OR [] of missing fields)
  const [valid, setValid] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://oshwa-appro-jackpeplinski.vercel.app/checkValidity/${pageName}`
      );
      setValid(res.data);
      setIsLoaded(true);
    };
    fetchData();
  }, [pageName, setValid]);

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
