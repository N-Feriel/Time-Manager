import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { themeVars } from "../../utils/GlobalStyles";
import { RiUserSettingsFill } from "react-icons/ri";
import { onSmallTabletMediaQuery } from "../../utils/responsive";
import { logout } from "../../services/authService";

import logo from "../../assets/logo_1.png";
import Button from "../button/Button";
import { flatMap } from "lodash";

function NavBar() {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [switchUser, setSwitchUser] = useState(false);

  const handleLogOut = () => {
    logout();
    setSwitchUser(!switchUser);
    history.push("/");
  };

  return (
    <Wrapper className="nav">
      <div className="logoPic" onClick={() => history.push("/admin")}></div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li className={`${isOpen ? "fade" : ""}`}>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li className={`${isOpen ? "fade" : ""}`}>
          <StyledLink to="/register/event">Add time</StyledLink>
        </li>

        <li className={`${isOpen ? "fade" : ""}`}>
          <StyledLink to="/">Archives</StyledLink>
        </li>
        <li
          className={`${isOpen ? "fade" : ""}`}
          onClick={() => setSwitchUser(!switchUser)}
        >
          <RiUserSettingsFill
            size="25px"
            style={{ color: `${themeVars.pink}` }}
          />
        </li>
      </ul>

      {switchUser && (
        <div style={{ display: "flex" }}>
          <Button onClick={handleLogOut}>Logout</Button>
          <Button>Switch</Button>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: ${themeVars.lavender};
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  padding: 0 2rem;

  & .logoPic {
    background-image: url(${logo});
    background-size: contain;
    background-repeat: no-repeat;
    width: 10rem;
    height: 9vh;
    cursor: pointer;
  }

  ${onSmallTabletMediaQuery()} {
    & {
      position: relative;
    }

    & .line {
      width: 30px;
      height: 3px;
      background: white;
      margin: 5px;
    }

    /* & .details{
            display: none
        } */
    & .hamburger {
      position: absolute;
      cursor: pointer;
      right: 5%;
      top: 50%;
      transform: translate(-5%, -50%);
      z-index: 6;
    }

    & .nav-links {
      position: fixed;
      background: ${themeVars.pink};
      height: 100vh;
      width: 100%;
      z-index: 5;
      flex-direction: column;
      clip-path: circle(100px at 90% -10%);
      -webkit-clip-path: circle(100px at 90% -10%);
      transition: all 1s ease-out;
      pointer-events: none;
    }

    & .nav-links.open {
      clip-path: circle(1500px at 90% -10%);
      -webkit-clip-path: circle(1500px at 90% -10%);
      pointer-events: all;
    }

    & .nav-links li {
      opacity: 0;
    }
    & .nav-links li a {
      font-size: 25px;
    }
    & .nav-links li:nth-child(1) {
      transition: all 0.5s ease 0.2s;
    }
    & .nav-links li:nth-child(2) {
      transition: all 0.5s ease 0.4s;
    }
    & .nav-links li:nth-child(3) {
      transition: all 0.5s ease 0.6s;
    }
    & li.fade {
      opacity: 1;
    }
  }

  & .register:hover > .details {
    color: red;
  }

  & h2 {
    color: white;
  }

  & ul {
    display: flex;
  }
  & li {
    padding: 10px;
    cursor: pointer;
    color: black;
  }
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: ${themeVars.lavender};
  /* margin: 10px; */
  &:hover {
    text-decoration: none;
  }
`;
export default NavBar;
