import * as React from "react";
import {
  FormikProps,
  Form,
  FieldArray,
  Formik,
  Field,
  FieldProps
} from "formik";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Process, Activity } from "../backend/ts/common_define";
import {
  save_process_template,
  does_process_exist
} from "../backend/ts/database";
import { useHistory } from "react-router";
import { useState } from "react";
import ActivityComponent from "../components/Activity_Component";
import DrawerComponent from "../components/Drawer_Component";
import { Fab } from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";

/* interface OtherProps {
  title?: string;
}

interface CreateProcessProps {
  title?: string;
  description?: string;
  activities?: Array<Activity>;
} */

interface AlreadyExistDialog {
  submitDialogOpen: boolean;
  values: Process;
  handleClose(answer: Boolean, values: Process): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    button: {
      margin: theme.spacing(1)
    },
    textField: {
      margin: theme.spacing(1),
      width: "100%"
    },
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(1)
    },
    card: {
      "&:hover": {
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
      },
    },
    fab: {
      margin: 0,
      top: "6em",
      right: "auto",
      bottom: "4em",
      left: "2em",
      position: "fixed"
    }
  })
);

function InnerForm() {
  const history = useHistory();
  const classes = useStyles({});
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const setForceUpdate = useState(0)[1];

  const [state, setState] = React.useState({
    index: -1,
    drawerOpen: false
  });

  const handleClose = (answer: Boolean, values: Process) => {
    setSubmitDialogOpen(false);
    if (answer === true) {
      submitProcess(values);
    }
  };

  const submitProcess = (values: Process) => {
    save_process_template(values);
    console.log(values);
    history.push("/View_Process_Templates");
  };

  const addActivityTemplate = (activity: Activity) => {
    if (fp !== undefined && state.index !== -1) {
      console.log(activity);
      fp.values.activities.splice(state.index + 1, 0, activity);
      //need the page to render so update a state
      setForceUpdate(value => ++value);
      console.log(fp);
    }
  };

  const toggleDrawer = (open: boolean, index: number) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    console.log(open);
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ drawerOpen: open, index });
  };

  let fp: FormikProps<any>;
  let initVals = new Process();
  initVals.activities.push(new Activity());
  console.log(initVals);
  return (
    <div className={classes.root}>
      <DrawerComponent
        open={state.drawerOpen}
        handleClick={addActivityTemplate}
        onToggleDrawer={toggleDrawer}
      />
      <Fab
        color="primary"
        aria-label="add"
        size="large"
        className={classes.fab}
        onClick={toggleDrawer(true, 0)}
      >
        <PostAddIcon />
      </Fab>
      <Formik
        initialValues={initVals}
        onSubmit={(values, actions) => {
          console.log(values);
          does_process_exist(values.title).then(does_exist => {
            if (does_exist) setSubmitDialogOpen(true);
            else submitProcess(values);
          });
        }}
      >
        {(formikProps: FormikProps<any>) => {
          fp = formikProps;
          return (
            <Form>
              <Paper className={classes.paper}>
                <Grid container justify="center">
                  <TextField
                    name="title"
                    className={classes.textField}
                    label="Process Title"
                    margin="normal"
                    variant="outlined"
                    autoComplete="off"
                    type="text"
                    required
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={
                      formikProps.values.title.length === 1
                        ? formikProps.values.title.toUpperCase()
                        : formikProps.values.title
                    }
                    inputProps={{
                      style: { fontSize: 30 }
                    }}
                    InputLabelProps={{
                      style: { fontSize: 30 }
                    }}
                  />
                  <TextField
                    name="description"
                    id="outlined-basic"
                    className={classes.textField}
                    label="Description"
                    margin="normal"
                    multiline
                    rows="3"
                    variant="outlined"
                    type="text"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.description}
                  />
                  <Field name="author">
                    {({ field }: FieldProps) => (
                      <TextField
                        className={classes.textField}
                        label="Author"
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                        type="text"
                        required
                        {...field}
                      />
                    )}
                  </Field>
                </Grid>
              </Paper>
              <FieldArray
                name="activities"
                render={helpers => (
                  <div>
                    {formikProps.values.activities &&
                    formikProps.values.activities.length > 0
                      ? formikProps.values.activities.map(
                          (activity: Activity, index: number) => (
                            <div key={index}>
                              <ActivityComponent
                                prefix={`activities.${index}.`}
                                activity={activity}
                                index={index}
                                classes={classes}
                                amountOfActivities={
                                  formikProps.values.activities.length
                                }
                                arrayHelpers={helpers}
                                formikProps={formikProps}
                                onToggleDrawer={toggleDrawer}
                              />
                            </div>
                          )
                        )
                      : null}
                    <Grid justify="center" container>
                      <AlreadyExistDialog
                        handleClose={handleClose}
                        values={formikProps.values}
                        submitDialogOpen={submitDialogOpen}
                      />
                      <Button
                        variant="contained"
                        className={classes.button}
                        type="submit"
                        color="primary"
                        disabled={formikProps.isSubmitting}
                      >
                        Save
                      </Button>
                    </Grid>
                  </div>
                )}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

function AlreadyExistDialog({
  submitDialogOpen,
  handleClose,
  values
}: AlreadyExistDialog) {
  return (
    <Dialog
      open={submitDialogOpen}
      onClose={() => {
        handleClose(false, values);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {
          "A process with this name already exists, do you want to overwrite it?"
        }
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose(false, values);
          }}
          color="primary"
        >
          No
        </Button>
        <Button
          onClick={() => {
            handleClose(true, values);
          }}
          color="primary"
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InnerForm;
