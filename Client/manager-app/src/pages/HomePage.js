import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../components/button/Button";

import bebePic from "../assets/peau-bebe.jpg";
import { themeVars } from "../utils/GlobalStyles";
import { FaFacebookF, FaAddressCard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { onSmallTabletMediaQuery } from "../utils/responsive";

function HomePage() {
  const history = useHistory();
  return (
    <Container>
      <h2>Welecome To Time Manager App</h2>

      <Wrapper>
        <div className="details">
          <h3>Please Select User type to Login </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
            }}
          >
            <Button
              style={{ background: `${themeVars.darkPink}` }}
              onClick={() => history.push("/admin")}
            >
              Admin
            </Button>
            <Button
              style={{ background: `${themeVars.violet}` }}
              onClick={() => history.push("/user/me")}
            >
              User
            </Button>
          </div>
        </div>
      </Wrapper>

      <div className="contact">
        <h4>Contact: </h4>
        <div className="info">
          <strong>
            <FaAddressCard size="25px" />
          </strong>
          78 rue St-Louis, LeMoyne, QC, J4R 2L4
        </div>
        <div className="info">
          <strong>
            <MdEmail size="25px" />
          </strong>
          lamereaboire@gmail.com
        </div>
        <div className="info">
          <strong>
            <FaFacebookF size="25px" />
          </strong>
          http://facebook.com/lamereaboire
        </div>
      </div>
    </Container>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 60vh;
  background-image: url(${bebePic});
  background-repeat: no-repeat;
  background-size: cover;
  & Button {
    font-size: 20px;
    color: white;
    width: 150px;
  }

  & .details {
    display: flex;
    width: 35%;
    flex-direction: column;
    justify-content: space-evenly;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.2)
    );
  }
  & h3 {
    color: ${themeVars.violet};
    text-align: center;
    margin: auto;
  }

  ${onSmallTabletMediaQuery()} {
    height: 50vh;

    & Button {
      font-size: 16px;
      width: 100px;
    }
  }
`;

const Container = styled.div`
  padding: 20px 0 0 0;

  ${onSmallTabletMediaQuery()} {
    margin-bottom: 5rem;

    & h2 {
      min-height: 3em !important;
      margin: auto;
    }
  }

  & h4 {
    color: ${themeVars.violet};
    padding: 5px;
  }
  & .contact {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    height: fit-content;
    padding-left: 1rem;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.2)
    );

    & strong {
      padding: 0 10px;
    }
  }
  & .info {
    padding: 5px;
    display: flex;
    align-items: center;
  }
`;

export default HomePage;
