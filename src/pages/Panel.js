import React, { useContext } from "react";

import Footer from "../components/Footer";
import Header2 from "../components/Header2";
import Header3 from "../components/Header3";

import "../styles/main.css";
import { withAuthorization, AuthUserContext } from "../api/Session";

import UserPanel from "../components/UserPanel";

const Panel = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <>
      {authUser.roles.eboard ? <Header3 /> : <Header2 />}
      <UserPanel value={authUser} />
      <Footer />
    </>
  );
};

// TODO: move conditions into component library
const condition = (authUser) => !!authUser?.roles?.upemember;

export default withAuthorization(condition)(Panel);
