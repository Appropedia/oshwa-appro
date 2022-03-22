import { Step, StepButton, Stepper } from "@mui/material";
import React from "react";

const steps = [
  "Select the page to certify",
  "Confirm your certification",
  "Complete form",
];

const StepperBar = (props) => {
  return (
    <div style={{ margin: "2vh" }}>
      <Stepper nonLinear activeStep={props.activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={props.completed}>
            <StepButton>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default StepperBar;
