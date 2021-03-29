import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../components/button/Button";

import bebePic from "../assets/peau-bebe.jpg";
import { themeVars } from "../utils/GlobalStyles";

function HomePage() {
  const history = useHistory();
  return (
    <Container>
      <h2>Welecome To Time Manager App</h2>

      <Wrapper>
        {/* <Main></Main> */}
        <div className="details">
          <h3>Please Select User type to Login </h3>
          <div style={{ display: "flex", alignSelf: "center" }}>
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
          <strong> Address: </strong>
          78 rue St-Louis, LeMoyne, QC, J4R 2L4
        </div>
        <div className="info">
          <strong>Email: </strong>
          lamereaboire@gmail.com
        </div>
        <div className="info">
          <strong>FaceBook: </strong>
          http://facebook.com/lamereaboire
        </div>
      </div>
    </Container>
  );
}

const Main = styled.div`
  background-image: url(${bebePic});
  background-repeat: no-repeat;
  background-size: cover;
  flex: 1;
  height: 50vh;
  z-index: 6;
  padding: 0;
  margin: 0;
`;
const Wrapper = styled.div`
  display: flex;
  height: 50vh;
  background-image: url(${bebePic});
  background-repeat: no-repeat;
  background-size: cover;
  & Button {
    color: white;
    width: 100px;
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
  }
`;

const Container = styled.div`
  padding: 1rem 0;

  & h4 {
    color: ${themeVars.violet};
    padding: 1rem 0 0 3rem;
  }
  & .contact {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & strong {
      padding: 1rem;
    }
  }
  & .info {
    padding: 0.5rem;
  }
`;

export default HomePage;
