import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Activity } from "../backend/ts/common_define";
import { get_activity_templates } from "../backend/ts/database";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Zoom,
  Typography
} from "@material-ui/core";
import { useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForward";

interface Drawer_Component_Props {
  open: boolean;
  handleClick: Function;
  onToggleDrawer: Function;
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
    drawer: {
      width: 240,
      flexShrink: 0
    },
    drawerPaper: {
      width: 240
    },
    toolbar: theme.mixins.toolbar
  })
);

function Drawer_Component(props: Drawer_Component_Props) {
  const classes = useStyles({});
  const [state, setState] = useState({
    open: false,
    activities: new Array<Activity>()
  });

  React.useEffect(() => {
    get_activity_templates().then(value => {
      console.log(value);
      setState({
        activities: value,
        open: false
      });
    });
  }, []);

  return (
    <div>
      <Drawer
        open={props.open}
        onClose={props.onToggleDrawer(false)}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {state.activities.length === 0 ? (
          <Grid container justify="center">
              <Typography style={{marginTop: "10em"}}>There are no templates</Typography>
           
          </Grid>
        ) : (
          <List>
            {state.activities &&
              state.activities.length > 0 &&
              state.activities.map((activity, index) => (
                <Grid key={`activity.${index}`} item>
                  <ListItem
                    button
                    key={index}
                    onClick={() => props.handleClick(activity)}
                  >
                    <ListItemText>
                      <h3>{activity.title}</h3>
                      {activity.description}
                    </ListItemText>
                    <ListItemIcon>
                      <Tooltip
                        TransitionComponent={Zoom}
                        TransitionProps={{ timeout: 300 }}
                        title="Add to process"
                      >
                        <ArrowForwardIosIcon />
                      </Tooltip>
                    </ListItemIcon>
                  </ListItem>
                  <Divider />
                </Grid>
              ))}
          </List>
        )}
      </Drawer>
    </div>
  );
}

export default Drawer_Component;
