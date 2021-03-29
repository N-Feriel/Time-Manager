import React from "react";
import styled from "styled-components";
import LoginForm from "./components/LoginForm";

function LoginPage() {
  return (
    <Wrapper>
      <h2> Welecome to Time manager site</h2>
      <h4>You need to login to access to your page</h4>
      <LoginForm />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
