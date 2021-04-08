import React from "react";

import styled from "styled-components";

import RegisterFormM from "./components/RegisterFormM";
import RegisterFormD from "./components/RegisterFormD";

function RegisterPage({ isGDaughter }) {
  return (
    <Wrapper>{isGDaughter ? <RegisterFormD /> : <RegisterFormM />}</Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  & .checkBox {
    width: 10px;
  }

  & .formC {
    width: 90%;
    /* margin: auto; */
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: space-evenly;
  }

  & button {
    width: fit-content;
    align-self: flex-end;
  }
`;
export default RegisterPage;
