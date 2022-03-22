import { Step, StepButton, Stepper } from "@mui/material";
import React from "react";

const steps = [
  "Select the page to certify",
  "Confirm the page to certify",
  "Agreement terms and submission",
];

const StepperBar = (props) => {
  return (
    <div style={{ margin: "4vh 0" }}>
      <Stepper nonLinear activeStep={props.activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={props.completed}>
            <StepButton disabled={true}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default StepperBar;
