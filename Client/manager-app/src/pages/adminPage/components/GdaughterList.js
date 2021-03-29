import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import ReactPaginate from "react-paginate";

import styled from "styled-components";
import { themeVars } from "../../../utils/GlobalStyles";

import { removeGDaughter } from "../../../store/reducers/GDaughter/actions";
import Button from "../../../components/button/Button";

function GdaughterList() {
  const { status, gDaughters } = useSelector((state) => state.gDaughter);
  const history = useHistory();
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const handleGDDetails = (_id) => {
    history.push(`/infoDaughter/${_id}`);
  };

  const handleDelete = async (gDaughter) => {
    const _id = gDaughter._id;

    try {
      const response = await fetch(`/api/users/infoGDaughter/${_id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        dispatch(removeGDaughter(gDaughter));
        // alert(`Gmother with ${gMother.first_name} ${gMother.last_name}
        // was deleted form Data Base`)
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleArchive = (user) => {
    console.log("archives", user);
  };

  if (status === "loading") {
    return <div>...Loading</div>;
  }
  if (status === "error") {
    return <div>...error</div>;
  }
  if (status === "idle") {
    const displayGDUsers = gDaughters
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((gDaughter) => (
        <div className="details" key={gDaughter._id}>
          <div style={{ flexDirection: "column" }}>
            <strong>
              {gDaughter.last_name} {gDaughter.first_name}
            </strong>
            <span>{gDaughter.email}</span>
          </div>
          <div>{gDaughter.phone}</div>

          <div>
            <Button onClick={() => handleGDDetails(gDaughter._id)}>
              Details
            </Button>

            <Button onClick={() => handleArchive(gDaughter)}>
              {gDaughter.isActif ? "Archive" : "Activate"}
            </Button>
          </div>
        </div>
      ));
    const pageCount = Math.ceil(gDaughters.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    return (
      <Wrapper>
        {displayGDUsers}

        {pageCount > 1 && (
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background: linear-gradient(
    to right bottom,
    rgba(246, 196, 196, 0.8),
    rgba(246, 196, 196, 0.2)
  );
  padding: 2rem;
  margin: 2rem;
  width: 90%;
  border-radius: 1rem;

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .details {
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.1)
    );
    margin: 1rem 0;
    padding: 0.5rem;
    border-radius: 0.8rem;
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

  & .paginationBttns {
    width: 80%;
    height: 40px;
    list-style: none;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  & .paginationBttns a {
    padding: 10px;
    margin: 8px;
    border-radius: 5px;
    border: 1px solid ${themeVars.darkPink};
    color: ${themeVars.darkPink};
    cursor: pointer;
  }

  & .paginationBttns a:hover {
    color: white;
    background-color: ${themeVars.violet};
  }

  & .paginationActive a {
    color: white;
    background-color: ${themeVars.violet};
  }

  & .paginationDisabled a {
    color: ${themeVars.grey};
    background-color: ${themeVars.grey};
  }
`;

export default GdaughterList;
