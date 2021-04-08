import React, { useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import GmotherDetails from "./GmotherDetails";

import ReactPaginate from "react-paginate";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";

function GmotherList() {
  const { status, gMothers } = useSelector((state) => state.gMother);

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "error") {
    return <Error />;
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
    rgba(219, 112, 147, 0.7),
    rgba(188, 143, 143, 0.3)
  );
  padding: 2rem;
  margin: 2rem;
  width: 90%;
  border-radius: 1rem;
`;

export default GmotherList;
