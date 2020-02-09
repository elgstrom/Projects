import React, { useState } from "react";
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
  CardActionArea,
  Hidden,
  Tooltip,
  Zoom
} from "@material-ui/core/";
import { Activity } from "../backend/ts/common_define";
import { Link } from "react-router-dom";
import DeleteButton from "../components/Delete_Item_Modal";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import {
  get_activity_templates,
  delete_activity_template
} from "../backend/ts/database";

export interface ViewActivitiesProps {
  activity: Activity;
}

export interface ViewActivitiesState {}

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

function ViewActivities() {
  const [state, setState] = useState({
    activities: new Array<Activity>()
  });

  React.useEffect(() => {
    get_activity_templates().then(value => {
      setState({
        activities: value
      });
    });
  }, []);
  const classes = useStyles({});

  const handleDelete = (activity: Activity) => {
    delete_activity_template(activity);
    setState({
      activities: state.activities.filter(p => p !== activity)
    });
  };

  return (
    <div>
      <Grid container spacing={3}>
        {state.activities &&
          state.activities.length > 0 &&
          state.activities.map((activity, index) => (
            <Grid
              key={`activity.card.${index}`}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5">{activity.title}</Typography>
                  <Typography>{activity.description}</Typography>
                </CardContent>
                <Grid container justify="center">
                  <CardActions>{/* 
                  <Tooltip TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} title="Information">
                    <IconButton color="primary">
                      <InfoOutlinedIcon/>
            
                    </IconButton>
                    </Tooltip> */}
                    <DeleteButton item={activity} onDelete={handleDelete} />
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
          ))}
        <Hidden only="xs">
          <Grid key={`add_process`} item xs={12} sm={6} md={4} lg={3}>
          <Tooltip TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} title="Create new activity">
            <Card
              className={classes.card}
              style={{ height: "10.7em", backgroundColor: "#eeeeee" }}
            >
              <CardActionArea
                style={{ height: "100%" }}
                component={Link}
                to="/Create_Activity"
              >
                <Grid
                  container
                  justify="center"
                  direction="column"
                  alignItems="center"
                  style={{ height: "100%" }}
                >
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
              to="/Create_Activity"
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

export default ViewActivities;
