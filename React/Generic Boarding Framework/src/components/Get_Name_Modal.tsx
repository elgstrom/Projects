import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { create_process_instance } from "../backend/ts/database";
import { Process } from "../backend/ts/common_define";
import { Form, Field, Formik, FieldProps } from "formik";
import AddIcon from "@material-ui/icons/Add";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";

interface Get_Name_Modal_Props {
  process_template: Process;
  //button_props: ButtonProps,
}

export default function Get_Name_Modal(props: Get_Name_Modal_Props) {
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
      <Tooltip TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} title="Add instance of process"> 
      <IconButton
        style={{
          color: "#22E700"
        }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </IconButton>
      </Tooltip>     
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Select user for new process instance
        </DialogTitle>
        <Formik
          initialValues={{ user_name: "" }}
          onSubmit={(values, actions) => {
            setOpen(false);
            create_process_instance(props.process_template, values.user_name);
            actions.setSubmitting(false);
          }}
        >
          {props => (
            <Form>
              <DialogContent>
                <Field name="user_name">
                  {({ field, form, meta }: FieldProps) => (
                    <TextField
                      autoComplete="off"
                      style={{ width: "100%" }}
                      type="text"
                      label="Name"
                      {...field}
                    />
                  )}
                </Field>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    props.handleSubmit();
                  }}
                  color="primary"
                >
                  Create
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
