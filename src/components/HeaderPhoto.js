import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/styles";

import UPEclass from "../assets/img/UPEclass.jpg";

const styles = {
  masthead: {
    marginBottom: "50px",
    background: "no-repeat center center",
    backgroundColor: "#868e96",
    backgroundAttachment: "scroll",
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: `url(${UPEclass})`,
  },
  mastheadSiteHeading: {
    padding: "350px 0 150px",
    color: "#fff",
    "@media only screen and (min-width:768px)": {
      padding: "325px 0!important",
    },
  },
};

const HeaderPhoto = ({ classes }) => (
  <div className={classes.masthead}>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className={classes.mastheadSiteHeading} />
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(HeaderPhoto);
