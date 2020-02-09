import React from 'react';
import './App.css';

import { Button, AppBar, Toolbar, Typography, createStyles, makeStyles, Theme, Container } from '@material-ui/core';
import CreateProcess from './views/Create_Process_Form';
import ViewAllProcessInstances from './views/View_All_Process_Instances';
import CreateProcessInstance from './views/View_Process_Templates';
import ViewProcessInstance from './views/View_Process_Instance';
import ViewActivities from './views/View_Activities';
import CreateActivity from './views/Create_Activity';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#F5F5F5',
        },
      },
    },
  },
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
    }
  }),
);

function App() {
  const classes = useStyles({});
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Boarding App
            </Typography>
            <Button component={Link} to="/View_Process_Templates" color="inherit">Process Templates</Button>
            <Button component={Link} to="/View_All_Process_Instances" color="inherit">Process Instances</Button>
            <Button component={Link} to="/View_Activities" color="inherit">Activities</Button>
          </Toolbar>
        </AppBar>
        <Container
          style={{
            marginTop: theme.spacing(2),
          }}
        >
          <Switch>
            <Route path="/Create_Process">
              <CreateProcess />
            </Route>
            <Route path="/View_Process_Instance/:user_name/:process_instance_name" component={ViewProcessInstance} />
            <Route path="/View_Process_Templates">
              <CreateProcessInstance />
            </Route>
            <Route path="/View_All_Process_Instances" >
                <ViewAllProcessInstances />
            </Route>
            <Route path="/View_Activities">
              <ViewActivities/>
            </Route>
            <Route path="/Create_Activity">
              <CreateActivity/>
            </Route>
            <Route path="/">
            <Typography variant="h2" >
              Application 
            </Typography>
            </Route>
          </Switch>
        </Container>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
