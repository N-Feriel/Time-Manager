import React from "react";
import styled from "styled-components";

import Event from "./Event";
import OneToOneEvent from "./OneToOneEvent";

function RegisterEventPage({ isOneToOneEvent }) {
  return (
    <Container>{isOneToOneEvent ? <OneToOneEvent /> : <Event />}</Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 4rem auto;
`;

export default RegisterEventPage;
