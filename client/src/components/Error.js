import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import { themeVars } from "../utils/GlobalStyles";

function Error() {
  return (
    <Mainbox>
      <div className="err">4</div>
      <FaQuestionCircle className="icon" size="150px" />
      <div className="err2">4</div>
      <div className="msg">
        Something goes wrong !!
        <p>
          Let's go
          <Link className="link" to="/">
            home
          </Link>
          and try from there.
        </p>
      </div>
    </Mainbox>
  );
}

const Mainbox = styled.div`
  margin: auto;
  height: 600px;
  width: 600px;
  position: relative;
  color: ${themeVars.darkBlue};

  .err {
    color: ${themeVars.darkBlue};
    font-family: "Nunito Sans", sans-serif;
    font-size: 11rem;
    position: absolute;
    left: 20%;
    top: 8%;
  }

  .err2 {
    color: ${themeVars.darkBlue};
    font-family: "Nunito Sans", sans-serif;
    font-size: 11rem;
    position: absolute;
    left: 68%;
    top: 8%;
  }

  .msg {
    text-align: center;
    font-family: "Nunito Sans", sans-serif;
    font-size: 1.2rem;
    margin: 20px;
    position: absolute;
    left: 16%;
    top: 45%;
    width: 75%;
  }

  & .icon {
    color: ${themeVars.pink};
    position: absolute;
    left: 40%;
    top: 12%;
    animation: App-img-spin 2s infinite;
  }

  @keyframes App-img-spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  & p {
    padding: 20px 0;
    margin-top: 20px;
  }

  & a {
    text-decoration: none;
    margin: 10px;

    font-size: 1.2rem;
    color: ${themeVars.pink};
  }

  & a:hover {
    text-decoration: underline;
    font-weight: bolder;
  }
`;

export default Error;
