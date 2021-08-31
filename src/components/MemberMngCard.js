import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { withStyles } from "@material-ui/styles";
import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";

import DataEdit from "./DataEdit.js";
import BPEdit from "./BPEdit.js";

import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  cardImgTop: {
    width: "75%",
    margin: "10% auto",
    borderRadius: "150px",
  },
  card: {
    width: "300px",
    border: "0",
    marginBottom: "25px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    textAlign: "center",
    "&:hover": {
      "-webkit-transform": "translateY(-5px)",
      transform: "translateY(-5px)",
      transition: "all .3s linear",
    },
  },
  cardTitle: {
    fontSize: "30px",
    fontFamily: "Gruppo",
    fontWeight: 1000,
  },
  cardSubtitle: {
    fontSize: "25px",
    fontFamily: "Gruppo",
    fontWeight: 1000,
    color: "#f21131",
  },
  cardText: {
    paddingTop: "5px",
    fontFamily: "Andale Mono, monospace",
  },
  memberList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  buttons: {
    "& hr": {
      borderTop: "3px solid #333",
      borderRadius: "2px",
    },
  },
  btn: {
    backgroundColor: "#f21131",
    borderColor: "#f21131",
    fontFamily: "Gruppo",
    fontWeight: "800",
    fontSize: "15px",
    textTransform: "uppercase",
    "&:hover": {
      backgroundColor: "#C30000",
      borderColor: "#C30000",
    },
  },
  buttonWrapper: {
    paddingBottom: "5px",
  },
  hidden: {
    display: "none",
  },
};

class MemberMngCardBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      editData: false,
      editBP: false,
      demote: false,
      deleteData: false,
      toggleAdmin: false,
      admin: this.props.data.roles && !!this.props.data.roles.admin,
    };

    this.handleToggleData = this.handleToggleData.bind(this);
    this.handleToggleBP = this.handleToggleBP.bind(this);
    this.handleToggleDelete = this.handleToggleDelete.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.handleToggleDemote = this.handleToggleDemote.bind(this);
    this.demote = this.demote.bind(this);
    this.handleToggleAdmin = this.handleToggleAdmin.bind(this);
    this.adminSwitch = this.adminSwitch.bind(this);
    this.updateSubFun = this.updateSubFun.bind(this);
  }

  componentDidMount() {
    this.props.firebase.getUID(this.props.data.email).then((snapshot) => {
      this.setState({ uid: snapshot.data().value });
    });
  }

  handleToggleData = () => {
    this.setState({
      editData: !this.state.editData,
    });
  };

  handleToggleBP = () => {
    this.setState({
      editBP: !this.state.editBP,
    });
  };

  handleToggleDelete = () => {
    this.setState({
      deleteData: !this.state.deleteData,
    });
  };

  updateSubFun = () => {
    this.props.updateFunc();

    this.setState({
      editBP: false,
      editData: false,
      deleteData: false,
      demote: false,
      toggleAdmin: false,
      admin: !this.state.admin,
    });
  };

  deleteData = () => {
    this.props.firebase
      .delImage(this.props.data.upe.class, this.props.data.profileIMG)
      .then(() => {
        console.log("Deleted Profile Image for user: ", this.state.uid);
        this.props.firebase.deleteUser(this.state.uid).then(() => {
          console.log("Deleted user: ", this.state.uid);
          this.updateSubFun();
        });
      })
      .catch((error) => {
        console.log("Was not able to delete", error);
      });
  };

  handleToggleDemote = () => {
    this.setState({
      demote: !this.state.demote,
    });
  };

  demote = () => {
    const data = {
      roles: {
        upemember: false,
        nonmember: true,
      },
    };

    this.props.firebase
      .editUser(this.state.uid, data)
      .then(() => {
        this.updateSubFun();
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  handleToggleAdmin = () => {
    this.setState({
      toggleAdmin: !this.state.toggleAdmin,
    });
  };

  adminSwitch = () => {
    const data = {
      roles: {
        admin: !this.state.admin,
      },
    };

    this.props.firebase
      .editUser(this.state.uid, data)
      .then(() => {
        this.updateSubFun();
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    const { classes } = this.props;

    var adminButton = "Make Admin";
    if (this.state.admin) adminButton = "Remove Adminship";

    var item = this.props.data;

    return (
      <Col data={item} key={this.props.key} className={classes.memberList}>
        <div className={classes.card}>
          <div className="card-body">
            <h5 className={classes.cardTitle}>{item.name}</h5>
            <h6 className={classes.cardSubtitle}>{item.email}</h6>
            <h6 className={classes.cardSubtitle}>
              BP: {item.upe.bp} | RP: {item.upe.rp}
            </h6>
            <div className="text-center">
              <div className={classes.buttons}>
                <hr />
                <div className={classes.buttonWrapper}>
                  <Button
                    className={classes.btn}
                    onClick={this.handleToggleData}
                  >
                    Edit Data
                  </Button>
                </div>

                <div className={classes.buttonWrapper}>
                  <Button className={classes.btn} onClick={this.handleToggleBP}>
                    Edit Points
                  </Button>
                </div>

                <div
                  className={
                    this.state.editData ? classes.buttons : classes.hidden
                  }
                >
                  <hr />
                  <DataEdit
                    value={this.props.data}
                    updateFunc={this.updateSubFun}
                  />
                </div>

                <div
                  className={
                    this.state.editBP ? classes.buttons : classes.hidden
                  }
                >
                  <hr />
                  <BPEdit
                    value={this.props.data}
                    updateFunc={this.updateSubFun}
                  />
                </div>

                <hr />

                <div className={classes.buttonWrapper}>
                  <Button
                    className={classes.btn}
                    onClick={this.handleToggleAdmin}
                  >
                    {adminButton}
                  </Button>
                </div>

                <div className={classes.buttonWrapper}>
                  <Button
                    className={classes.btn}
                    onClick={this.handleToggleDemote}
                  >
                    Remove Membership
                  </Button>
                </div>

                <div
                  className={
                    this.state.demote ? classes.buttons : classes.hidden
                  }
                >
                  <hr />
                  <div className={classes.buttonWrapper}>
                    <Button className={classes.btn} onClick={this.demote}>
                      Are you Sure??
                    </Button>
                  </div>
                </div>

                <div
                  className={
                    this.state.toggleAdmin ? classes.buttons : classes.hidden
                  }
                >
                  <hr />
                  <div className={classes.buttonWrapper}>
                    <Button className={classes.btn} onClick={this.adminSwitch}>
                      Are you Sure??
                    </Button>
                  </div>
                </div>

                <hr />

                <div className={classes.buttonWrapper}>
                  <Button
                    className={classes.btn}
                    onClick={this.handleToggleDelete}
                  >
                    Delete Data
                  </Button>
                </div>
              </div>

              <div
                className={
                  this.state.deleteData ? classes.buttons : classes.hidden
                }
              >
                <hr />
                <div className={classes.buttonWrapper}>
                  <Button className={classes.btn} onClick={this.deleteData}>
                    Are you Sure??
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

const MemberMngCard = compose(
  withFirebase,
  withStyles(styles)
)(MemberMngCardBase);

export default MemberMngCard;
