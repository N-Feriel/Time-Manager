import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { themeVars } from "../../utils/GlobalStyles";
import { RiUserSettingsFill } from "react-icons/ri";
import {
  onDesktopMediaQuery,
  onSmallTabletMediaQuery,
} from "../../utils/responsive";
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
    setIsOpen(false);
    history.push("/");
  };

  const handleSwitchUser = () => {
    setSwitchUser(!switchUser);
    setIsOpen(false);
    history.push("/user/me");
  };

  const openNav = (ev) => {
    ev.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper className="nav">
      <div className="logoPic" onClick={() => history.push("/admin")}></div>

      <div className="hamburger" onClick={(ev) => openNav(ev)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li
          className={`${isOpen ? "fade" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li
          className={`${isOpen ? "fade" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <StyledLink to="/register/event">Add time</StyledLink>
        </li>

        <li
          className={`${isOpen ? "fade" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <StyledLink to="/">Archives</StyledLink>
        </li>

        <li
          className={`${isOpen ? "fade" : ""}`}
          onClick={() => setSwitchUser(!switchUser)}
        >
          <RiUserSettingsFill size="25px" style={{ color: "white" }} />
        </li>
        {switchUser && (
          <div style={{ display: "flex" }}>
            <Button onClick={handleLogOut}>Logout</Button>
            <Button onClick={handleSwitchUser}>Switch</Button>
          </div>
        )}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
  position: relative;

  & .logoPic {
    ${onDesktopMediaQuery()} {
      width: 10rem;
      height: 12vh;
      margin-top: 2rem;
      margin-left: 1rem;
    }
    background-image: url(${logo});
    background-size: contain;
    background-repeat: no-repeat;
    width: 10rem;
    height: 9vh;
    cursor: pointer;
  }

  & .nav-links {
    display: flex;
    list-style: none;
    width: 50%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    margin-left: auto;
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

    & .hamburger {
      position: absolute;
      cursor: pointer;
      right: 5%;
      top: 50%;
      transform: translate(-15%, -50%);
      z-index: 6;
    }

    & .nav-links {
      background: ${themeVars.pink};
      position: fixed;
      top: 0;
      z-index: 5;
      height: 100vh;
      width: 100%;
      flex-direction: column;
      clip-path: circle(100px at 90% -30%);
      -webkit-clip-path: circle(100px at 90% -30%);
      transition: all 1s ease-out;
    }

    & .nav-links.open {
      /* clip-path: circle(1500px at 90% -10%);
      -webkit-clip-path: circle(800px at 90% -10%); */
      pointer-events: all;
      clip-path: circle(1000px);
      -webkit-clip-path: circle(1000px);
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

  & h2 {
    color: white;
  }

  & ul {
    display: flex;
  }
  & li {
    padding: 10px;
    cursor: pointer;
    color: ${themeVars.darkBlue};
  }
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: white;
  z-index: 7;
  /* margin: 10px; */
  &:hover {
    text-decoration: none;
    color: ${themeVars.darkBlue};
  }
`;
export default NavBar;
