import React, { useState, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../../../components/UserContext";

import RegisterEventPage from "../../eventPage/component/RegisterEventPage";

function AddTime() {
  const { user } = useContext(UserContext);

  const types = [
    { _id: "Vulonteer", name: "Vulonteer", text: "VOLUNTEER" },
    { _id: "Training", name: "Training", text: "TRAINING" },
    { _id: "Facebook", name: "Facebook", text: "FACEBOOK" },
    { _id: "OneToOne", name: "OneToOne", text: "GDaughter" },
    { _id: "Others", name: "Others", text: "OTHERS" },
  ];

  return (
    <Wrapper>
      <RegisterEventPage types={types} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  border-radius: 1rem;
  flex-direction: column;

  min-height: 75vh;
  width: 80%;
  margin: 2rem auto;

  background: linear-gradient(
    to right bottom,
    rgba(246, 196, 196, 0.8),
    rgba(246, 196, 196, 0.2)
  );

  /* & div {
    
      width: 90%;
      border-radius: 1rem;
      padding: 1rem 0.5rem;
      margin: 2rem;
    } */
`;

export default AddTime;
