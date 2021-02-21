import React from "react";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";

import "../App/App.css";
import Employees from '../pages/Employees/Employees'
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
});
const useStyles = makeStyles({
  appMain: {
    paddingLeft: "300px",
    width: "100%",
  },
});
const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />

      <div className={classes.appMain}>
        <Header />
        
        <Employees/>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
