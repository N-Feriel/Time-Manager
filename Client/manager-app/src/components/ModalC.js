import React, { Children } from "react";

import Modal from "react-modal";
import { useHistory } from "react-router";
import { themeVars } from "../utils/GlobalStyles";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minHeight: "25vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    color: `${themeVars.violet}`,
    background: `${themeVars.lightPink}`,
    boxShadow: `0 0 0 1900px hsla(220,7%,18%,0.6),
        0 10px 30px -5px hsla(220,7%,18%,0.6)`,
  },
  overlay: { zIndex: 1000 },
};

Modal.setAppElement("#root");
function ModalC({ modalIsOpen, children, closeModal, afterOpenModal }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {children}
    </Modal>
  );
}

export default ModalC;
