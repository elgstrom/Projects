import React from "react";
import { Process } from "../backend/ts/common_define";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import {
  IconButton,
  makeStyles,
  createStyles,
  Popover,
  Typography,
  Theme,
  Box
} from "@material-ui/core";

interface Get_Process_Info_Props {
  process: Process;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
      maxWidth: 700,
      wordWrap: "break-word"
    }
  })
);

export default function SimplePopover({ process }: Get_Process_Info_Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} color="default" onClick={handleClick}>
        <InfoOutlinedIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Typography className={classes.typography}>
          Title: {process.title} <br />
          Description: {process.description} <br />
          Author: {process.author} <br />
          Created: {process.created_date.toLocaleString()} <br /> <br />
          Activities:
        </Typography>
        {process.activities.map((a, index) => (
          <Box style={{ marginLeft: "2em" }} key={index}>
            Title: {a.title}
            <br />
            Description: {a.description} <br />
            Outcome: {a.possible_states.join("/")} <br />
            <br />
          </Box>
        ))}
      </Popover>
    </div>
  );
}
