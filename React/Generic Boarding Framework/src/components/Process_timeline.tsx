import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ProcessInstance } from "../backend/ts/common_define";
import {
  process_instance_update_step,
  process_instance_update_activity_state,
  process_instance_reset_date
} from "../backend/ts/database";
import { StepButton, ButtonGroup, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: "0px",
      margin: "0px"
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    actionsContainer: {
      marginBottom: theme.spacing(2)
    },
    resetContainer: {
      padding: theme.spacing(3)
    },
    completed: {
      display: "inline-block"
    }
  })
);

interface Line_Stepper_Props {
  process: ProcessInstance;
}
//TODO maybe just use higher component state for active step?
export default function VerticalLinearStepper(props: Line_Stepper_Props) {
  const classes = useStyles({});
  //init active step to props.process.step
  const [activeStep, setActiveStep] = React.useState(props.process.activeStep);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    props.process.activities.map(a => !!(a.state >= 0))
  );

  const update_step_counter = (current_step: number) => {
    process_instance_update_step(props.process, current_step);
  };

  const getStepContent = (step: number) => {
    return props.process.activities[step].description;
  };

  const handleNext = () => {
    update_step_counter(activeStep + 1);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleReset = () => {
    update_step_counter(0);
    setActiveStep(0);
    setCompleted({});
    for (let A of props.process.activities) {
      process_instance_update_activity_state(props.process, A, -1);
    }
    process_instance_reset_date(props.process);
  };

  const handleComplete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    //indexOf would not work here as the comparison is case sensitive
    let state_index = -1;
    for (
      let index = 0;
      index < props.process.activities[activeStep].possible_states.length;
      index++
    ) {
      const element =
        props.process.activities[activeStep].possible_states[index];
      if (element.toUpperCase() === e.currentTarget.innerText.toUpperCase()) {
        state_index = index;
      }
    }
    props.process.activities[activeStep].state = state_index;
    props.process.activities[activeStep].end_date = new Date();
    if (props.process.activities.filter(a => a.state < 0).length === 0)
      props.process.done_date = new Date();

    props.process.activities[activeStep].possible_states.indexOf(
      e.currentTarget.innerText
    );
    process_instance_update_activity_state(
      props.process,
      props.process.activities[activeStep],
      state_index
    );
  };

  const handleStep = (step: number) => () => {
    update_step_counter(step);
    setActiveStep(step);
  };

  /* const completedSteps = () => {
    return Object.keys(completed).length;
  }; */

  return (
    <div>
      <Paper style={{ padding: "2em", marginBottom: "1em" }}>
        <Typography variant="h3" style={{ marginBottom: "0.3em" }}>
          {props.process.title}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ marginBottom: "0.3em", whiteSpace: "pre-line" }}
        >
          {`Start Date: ${props.process.start_date.toLocaleString()}`}
          {props.process.done_date !== undefined &&
            ` - End Date: ${props.process.done_date.toLocaleString()}`}
        </Typography>
        <Typography
          variant="body2"
          style={{
            marginLeft: "1em",
            marginBottom: "0.3em",
            whiteSpace: "pre-line"
          }}
        >
          {props.process.description}
        </Typography>
        <Divider />
        <div className={classes.root}>
          <Stepper nonLinear style={{marginTop: "1em", padding: "0px"}} activeStep={activeStep} orientation="vertical">
            {props.process.activities.map((activity, index) => (
              <Step key={activity.title}>
                <StepButton
                  onClick={handleStep(index)}
                  completed={completed[index]}
                >
                  {activity.title}
                  {activity.state >= 0 && activity.end_date !== undefined
                    ? ` - ${
                        activity.possible_states[activity.state]
                      } - ${activity.end_date.toLocaleString()}`
                    : null}
                </StepButton>

                <StepContent>
                  <Typography
                    variant="body1"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {getStepContent(index)}
                  </Typography>
                  {activeStep !== props.process.activities.length &&
                    (completed[activeStep] ? null : (
                      <Grid
                        container
                        spacing={2}
                        style={{ marginTop: "0.3em" }}
                      >
                        <Grid item>
                          <ButtonGroup color="primary">
                            {activity.possible_states.map((state, index) => (
                              <Button
                                key={`state_button_${index}`}
                                onClick={handleComplete}
                              >
                                {state}
                              </Button>
                            ))}
                          </ButtonGroup>
                        </Grid>
                      </Grid>
                    ))}
                </StepContent>
              </Step>
            ))}
          </Stepper>

          <Button
            onClick={handleReset}
            className={classes.button}
            variant="contained"
            style={{ backgroundColor: "#33cc33" }}
          >
            Reset
          </Button>
        </div>
      </Paper>
    </div>
  );
}
