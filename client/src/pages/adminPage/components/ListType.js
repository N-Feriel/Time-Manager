import React from "react";
import styled from "styled-components";

function ListType({ selectedType, onTypeSelected }) {
  const allTypes = [
    { _id: "archive", name: "Archives" },
    { _id: "active", name: "Actives" },
    { _id: "toAssign", name: "To Assign" },
  ];

  return (
    <Ul>
      {allTypes.map((type) => (
        <li
          key={type._id}
          className={type._id === selectedType ? "active" : ""}
          onClick={() => onTypeSelected(type)}
        >
          {type.name}
        </li>
      ))}
    </Ul>
  );
}

const Ul = styled.ul`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
  & li {
    padding: 1rem;
    cursor: pointer;
    background: linear-gradient(
      to left top,
      rgba(255, 255, 255, 0.8),
      rgba(224, 132, 225, 0.5)
    );

    color: black;

    border-radius: 1rem;
  }
  & li:hover {
    background: linear-gradient(
      to right bottom,
      rgba(193, 50, 112, 0.8),
      rgba(145, 35, 146, 0.2)
    );
    color: white;
  }
  .active {
    background: linear-gradient(
      to right bottom,
      rgba(193, 50, 112, 0.8),
      rgba(145, 35, 146, 0.2)
    );
    color: white;
  }
`;

export default ListType;
