import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";

interface Delete_Template_Modal_Props {
  item: any;
  onDelete: Function;
}

export default function Delete_Process_Template_Modal(
  props: Delete_Template_Modal_Props
) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (answer: Boolean) => {
    setOpen(false);
    if (answer === true) props.onDelete(props.item);
  };

  return (
    <div>
      <Tooltip TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} title="Delete">
      <IconButton color="secondary" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this?"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose(false);
            }}
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              handleClose(true);
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
