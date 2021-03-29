import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { themeVars } from "../../../utils/GlobalStyles";
import GmotherDetails from "./GmotherDetails";

import ReactPaginate from "react-paginate";

function GmotherList() {
  const { status, gMothers } = useSelector((state) => state.gMother);

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;

  if (status === "loading") {
    return <div>...Loading</div>;
  }
  if (status === "error") {
    return <div>...error</div>;
  }
  if (status === "idle") {
    const displayGMUsers = gMothers
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((gMother) => <GmotherDetails key={gMother._id} gMother={gMother} />);

    const pageCount = Math.ceil(gMothers.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    return (
      <Container>
        {displayGMUsers}
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
      </Container>
    );
  }
}

const Container = styled.div`
  display: "flex";
  flex-direction: column;
  background: linear-gradient(
    to right bottom,
    rgba(4, 43, 81, 0.5),
    rgba(4, 43, 81, 0.1)
  );
  padding: 2rem;
  margin: 2rem;
  width: 90%;
  border-radius: 1rem;

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

export default GmotherList;
