import React from "react";
import logo1 from "../images/Display.svg";
import logo2 from "../images/down.svg";

const DisplayButton = ({ setShowDisplayMenu }) => {
  return (
    <button
      className="display-button"
      onClick={() => setShowDisplayMenu((prev) => !prev)}
    >
      <span className="icon">
        <img src={logo1} alt="" />
      </span>
      Display
      <span className="icon">
        <img src={logo2} alt="" />
      </span>
    </button>
  );
};

export default DisplayButton;
