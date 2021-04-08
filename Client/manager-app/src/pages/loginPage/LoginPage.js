import React from "react";
import styled from "styled-components";
import { onDesktopMediaQuery } from "../../utils/responsive";
import LoginForm from "./components/LoginForm";
import momspic from "../../assets/support-mom.jpg";

function LoginPage() {
  return (
    <Wrapper>
      <h2> Welecome to Time manager site</h2>
      <h4>You need to login to access </h4>
      <LoginForm />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  ${onDesktopMediaQuery()} {
    background-image: url(${momspic});
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export default LoginPage;
