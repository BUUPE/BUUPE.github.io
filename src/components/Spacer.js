import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  spacer: {
    height: "1000px",
  },
};

const Spacer = ({ classes }) => <div className={classes.spacer}></div>;

export default withStyles(styles)(Spacer);
