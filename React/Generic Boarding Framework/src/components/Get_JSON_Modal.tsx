import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Field, Formik, FieldProps } from "formik";
import SettingsIcon from "@material-ui/icons/Settings";
import { IconButton, Zoom, Tooltip } from "@material-ui/core";

interface Get_JSON_Modal_Props {
  btnClass: any;
  setFunc: any;
	fieldName: string;
	startText: string;
}

export default function Get_JSON_Modal(modalProps: Get_JSON_Modal_Props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* //TODO  make this more general
                eg get the what button should be from outside this component
            */}
      <Tooltip TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} title="Add automation JSON">
      <IconButton
        className={modalProps.btnClass}
        aria-label="advanced settings"
        color="default"
        onClick={handleClickOpen}
      >
        <SettingsIcon />
      </IconButton>
      </Tooltip>
      <Dialog
        maxWidth="xl"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Automation JSON</DialogTitle>
        <Formik
          validate={vals => {
            let errors = {};
            try {
              let jsonObj = JSON.parse(vals.json);
              vals.json = JSON.stringify(jsonObj, undefined, 4);
            } catch (e) {
              errors = { json: "invalid JSON" };
            }
            return errors;
          }}
          initialValues={{ json: modalProps.startText }}
          onSubmit={(values, actions) => {
            setOpen(false);
            modalProps.setFunc(modalProps.fieldName, JSON.parse(values.json));
            actions.setSubmitting(false);
          }}
        >
          {props => (
            <Form>
              <DialogContent>
                <Field name="json">
                  {({ field, form, meta }: FieldProps) => (
                    <TextField
                      variant="outlined"
                      multiline
                      error={!!(props.touched.json && props.errors.json)}
                      helperText={props.errors.json}
                      rows={20}
                      autoComplete="off"
                      style={{ width: "100%" }}
                      type="text"
                      label="JSON"
                      {...field}
                    />
                  )}
                </Field>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
