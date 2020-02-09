import * as React from "react";
import { useHistory } from "react-router";
import { useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Activity } from "../backend/ts/common_define";
import {
  save_activity_template,
  does_activity_exist
} from "../backend/ts/database";
import ActivityComponent from "../components/Activity_Component";

/* interface OtherProps {
  title?: string;
}

interface CreateActivityProps {
  title?: string;
  description?: string;
} */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    root: {
      padding: theme.spacing(2),
      margin: theme.spacing(1)
    },
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(1)
    }
  })
);

function InnerForm() {
  const history = useHistory();
  const classes = useStyles({});
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

  const handleClose = (answer: Boolean, values: Activity) => {
    setSubmitDialogOpen(false);
    if (answer === true) {
      submitActivity(values);
    }
  };

  const submitActivity = (values: Activity) => {
    console.log(values);
    save_activity_template(values);
    history.push("/View_Activities");
  };
  return (
    <Formik
      initialValues={new Activity()}
      onSubmit={(values, actions) => {
        does_activity_exist(values.title).then(does_exist => {
          if (does_exist) setSubmitDialogOpen(true);
          else submitActivity(values);
        });
      }}
    >
      {(formikProps: FormikProps<any>) => (
        <Form>
          <ActivityComponent
            prefix=""
            activity={formikProps.values}
            index={1}
            classes={classes}
            formikProps={formikProps}
          />
          <Grid justify="center" container>
            <Dialog
              open={submitDialogOpen}
              onClose={() => {
                handleClose(false, formikProps.values);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {
                  "An activity with this name already exists, do you want to overwrite it?"
                }
              </DialogTitle>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleClose(false, formikProps.values);
                  }}
                  color="primary"
                >
                  No
                </Button>
                <Button
                  onClick={() => {
                    handleClose(true, formikProps.values);
                  }}
                  color="primary"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
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
        </Form>
      )}
    </Formik>
  );
}

export default InnerForm;
