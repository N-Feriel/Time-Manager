import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { themeVars } from "../../../utils/GlobalStyles";

import { removeGMother } from "../../../store/reducers/GMother/actions";
import Button from "../../../components/button/Button";

function GmotherDetails({ gMother }) {
  const history = useHistory();

  const dispatch = useDispatch();

  const handleGMDetails = (_id) => {
    history.push(`/infoMother/${_id}`);
  };

  const handleDelete = async (_id) => {
    alert("Are you sure to delete the user permantely");
    try {
      const response = await fetch(`/api/users/infoGMother/${_id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        dispatch(removeGMother(gMother));
        console.log("removed");
        // alert(`Gmother with ${gMother.first_name} ${gMother.last_name}
        // was deleted form Data Base`)
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div style={{ flexDirection: "column" }}>
        <strong>
          {gMother.first_name} {gMother.last_name}
        </strong>
        <span>{gMother.email}</span>
      </div>
      <div>{gMother.phone}</div>
      <div>
        <Button onClick={() => handleGMDetails(gMother._id)}>Details</Button>

        <Button onClick={() => handleDelete(gMother._id)}>Delete</Button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.1)
  );
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & span {
    padding: 0.5rem 1rem 0 0;
  }

  & button {
    margin: 1rem 0.5rem;
    padding: 0.5rem;
    font-size: 0.8rem;
    background: rgba(255, 255, 255, 0.6);
  }
`;
export default GmotherDetails;
