import React, { useState } from "react";

import { Process } from "../backend/ts/common_define";
import {
  get_process_templates,
  delete_process_template
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
  CardActionArea,
  Hidden,
  Tooltip,
  Zoom
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import GetNameModalButton from "../components/Get_Name_Modal";
import DeleteButton from "../components/Delete_Item_Modal";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import GetProcessInfo from "../components/Get_Process_Info_Modal";

/* interface View_Process_State {
  processes: Array<Process>;
} */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: 0,
      top: "auto",
      right: "4em",
      bottom: "4em",
      left: "auto",
      position: "fixed"
    },
    card: {
      "&:hover": {
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
      }
    }
  })
);

function View_Process() {
  const [state, setState] = useState({
    processes: new Array<Process>()
  });

  React.useEffect(() => {
    get_process_templates().then(value => {
      console.log(value);
      setState({
        processes: value
      });
    });
  }, []);
  const classes = useStyles({});

  const handleDelete = (process: Process) => {
    delete_process_template(process);
    setState({
      processes: state.processes.filter(p => p !== process)
    });
  };

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
                  <CardContent>
                    <Typography variant="h5">{process.title}</Typography>
                    {process.activities.length > 1 && (
                      <Typography>
                        {process.activities.length} activities
                      </Typography>
                    )}
                    {process.activities.length === 1 && (
                      <Typography>1 activity</Typography>
                    )}
                    <Typography>Author: {process.author}</Typography>
                  </CardContent>
                  <Grid container justify="center">
                    <CardActions>

                    <GetProcessInfo
                      process={process}
                    />

                      <DeleteButton item={process} onDelete={handleDelete} />
                      <GetNameModalButton process_template={process} />
                    </CardActions>
                  </Grid>
                </Card>
              </Grid>
            ))
          : null}
        <Hidden only="xs">
          <Grid key={`add_process`} item xs={12} sm={6} md={4} lg={3}>
            <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 300 }}
              title="Create new process template"
            >
              <Card
                className={classes.card}
                style={{ height: "12.5em", backgroundColor: "#eeeeee" }}
              >
                <CardActionArea
                  style={{ height: "100%" }}
                  component={Link}
                  to="/Create_Process"
                >
                  <Grid
                    container
                    justify="center"
                    direction="column"
                    alignItems="center"
                    style={{ height: "100%" }}
                  >
                    {/* use color="disabled to get that grey color" */}
                    <AddIcon
                      style={{ fontSize: "6em" }}
                      color="disabled"
                    ></AddIcon>
                  </Grid>
                </CardActionArea>
              </Card>
            </Tooltip>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid container justify="flex-end" style={{ height: "100%" }}>
            <Fab
              color="primary"
              aria-label="add"
              size="large"
              className={classes.fab}
              component={Link}
              to="/Create_Process"
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

export default View_Process;
