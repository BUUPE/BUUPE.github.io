import React from "react";

import Footer from "../../components/main-site/Footer";

import "../../styles/main-site/main.css";
import { withAuthorization } from "../../api/Session";

import { compose } from "recompose";

import PanelInfo from "../../components/main-site/PanelInfo.js";

const PanelBase = () => {
  return (
    <div className="landing">
      <PanelInfo />
      <Footer />
    </div>
  );
};

const condition = (authUser) => authUser != null;

const Panel = compose(withAuthorization(condition))(PanelBase);

export default Panel;
