import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { themeVars } from "../utils/GlobalStyles";
import Button from "./button/Button";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: `${themeVars.green}`,
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

function CustumModel({ showModal, children }) {
  if (!showModal) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        {children}
        <Button>Close</Button>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default CustumModel;
