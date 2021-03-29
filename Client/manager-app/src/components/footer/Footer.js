import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { themeVars } from "../../utils/GlobalStyles";
import {
  onLargeDesktopMediaQuery,
  onSmallTabletMediaQuery,
} from "../../utils/responsive";

function Footer() {
  return (
    <Wrapper>
      <div>
        <StyledLink to={"/user/me/addTime"}>Add Time</StyledLink>
      </div>
      <div>
        <StyledLink to={"/user/me"}>Home</StyledLink>
      </div>

      <div>
        <StyledLink to={"/user/me/archives"}>Archives</StyledLink>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${onSmallTabletMediaQuery()} {
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    color: white;
    font-weight: 600;
    bottom: 0;
    width: 100%;

    background: linear-gradient(
      to right bottom,
      rgba(133, 31, 123, 0.8),
      rgba(133, 31, 123, 0.1)
    );

    & div {
      padding: 2rem;
    }
    & div:hover {
      padding: 2rem;

      background: linear-gradient(
        to right bottom,
        rgba(225, 255, 255, 0.8),
        rgba(255, 255, 255, 0.5)
      );

      color: rgba(133, 31, 123, 0.8);

      border-top: solid 2px rgba(255, 255, 255);
    }
  }

  ${onLargeDesktopMediaQuery()} {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: ${themeVars.lavender};
  /* margin: 10px; */
  &:hover {
    text-decoration: none;
    color: rgba(133, 31, 123, 0.8);
  }
`;

export default Footer;
