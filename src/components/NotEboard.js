import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  main: {
    textAlign: "center",
    "& h1": {
      fontFamily: "Gruppo",
      fontSize: "50px",
      margin: 0,
      lineHeight: 1,
      fontWeight: 800,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "#f21131",
      paddingTop: "100px",
      paddingBottom: "100px",
      transition: "all .3s",
      "&:hover": {
        color: "#C30000",
        textDecoration: "none",
      },
    },
  },
};

// TODO: make a general unauthorized component/rename this
const NotEboard = ({ classes }) => (
  <div className={classes.main}>
    <h1> You do not have permission to view this page. </h1>
  </div>
);

export default withStyles(styles)(NotEboard);
