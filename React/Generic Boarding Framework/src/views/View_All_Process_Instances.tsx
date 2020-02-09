import React, { useState } from "react";
import { Process, ProcessInstance } from "../backend/ts/common_define";
import {
  get_process_instances,
  delete_process_instance
} from "../backend/ts/database";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  CardActions,
  IconButton,
  CardHeader,
  Icon,
  Tooltip,
  Zoom
} from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForward";
import DeleteButton from "../components/Delete_Item_Modal";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green, yellow, red } from '@material-ui/core/colors';

interface View_Process_State {
  processes: Array<Process>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1)
    },
    card: {
      "&:hover": {
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
      }
    },
    header: {
      paddingBottom: "0 ",
      paddingTop: "10"
    },
  })
);

function View_Process() {
  const [state, setState] = useState({
    processes: new Array<ProcessInstance>()
  });

  const history = useHistory();

  const handleOpenClick = (process: ProcessInstance) => {
    history.push(
      `/View_Process_Instance/${process.user_name}/${process.title}`
    );
  };

  const handleDelete = (process: ProcessInstance) => {
    setState({
      processes: state.processes.filter(p => p !== process)
    });
    delete_process_instance(process);
  };

  React.useEffect(() => {
    get_process_instances().then(value => {
      setState({
        processes: value
      });
    });
  }, []);
  const classes = useStyles({});

  return (
    <div>
      <Grid container spacing={3}>
        {state.processes && state.processes.length > 0
          ? state.processes.map((process, index) => (
              <Grid
                key={`process.card.${index}`}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <Card className={classes.card}>
                  <Grid >
                  <CardHeader
                    className={classes.header}
                    title={process.title}
                    action={
                      (process.activities.length === process.activities.filter(p=> p.state >= 0).length)?
                       (
                      <Tooltip TransitionComponent={Zoom} TransitionProps={{timeout: 300}} title="Done" >
                       <Icon>
                        <CheckCircleIcon style={{ color: green[700]}} fontSize='large'/>
                      </Icon>
                      </Tooltip>)
                      : (process.activities.filter(p=> p.state >= 0).length === 0) ?
                      (
                      <Tooltip TransitionComponent={Zoom} TransitionProps={{timeout: 300}} title="Not started" >
                      <Icon>
                        <CheckCircleOutlineIcon style={{ color: red[700]}} fontSize='large'/>
                      </Icon>
                      </Tooltip>
                      ):
                      (
                      <Tooltip TransitionComponent={Zoom} TransitionProps={{timeout: 300}} title="In progress">  
                        <Icon>
                        <CheckCircleOutlineIcon style={{ color: yellow[700]}} fontSize='large'/>
                      </Icon>
                      </Tooltip>
                      )
                    }
                  />
                  </Grid>
                  <CardContent>
                    <Typography>{process.user_name}</Typography>
                    <Typography>
                      {`${process.activities.filter(p=> p.state >= 0).length} / ${process.activities.length} completed`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid container justify="center">
                      <DeleteButton item={process} onDelete={handleDelete} />
                      <Tooltip TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} title="Start/Continue">
                      <IconButton
                        onClick={() => {
                          handleOpenClick(process);
                        }}
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>
                      </Tooltip>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </div>
  );
}

export default View_Process;
