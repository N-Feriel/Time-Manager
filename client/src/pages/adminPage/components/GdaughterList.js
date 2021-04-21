import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import ReactPaginate from "react-paginate";
import { updteGDaughterData } from "../../../store/reducers/GDaughter/actions";
import styled from "styled-components";
import {
  requestGDaughterData,
  receiveGDaughterData,
  receiveGDaughterDataError,
} from "../../../store/reducers/GDaughter/actions";
import GDaughterDetails from "./GDaughterDetails";
import ListType from "./ListType";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";

function GdaughterList() {
  const { status, gDaughters } = useSelector((state) => state.gDaughter);
  const { REACT_APP_API_URL } = process.env;

  const [selectedType, setSelectedType] = useState("toAssign");

  const handleSelectedType = (type) => {
    setSelectedType(type._id);
  };

  const getFilteredUserData = async () => {
    dispatch(requestGDaughterData());

    try {
      const response = await fetch(
        `${REACT_APP_API_URL}/api/users/status/GDaughter/${selectedType}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": `${jwt}`,
          },
        }
      );

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        dispatch(receiveGDaughterData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveGDaughterDataError(error));
    }
  };

  const history = useHistory();
  const dispatch = useDispatch();

  let url = `${REACT_APP_API_URL}/api/users/infoGDaughter`;
  const jwt = localStorage.getItem("token");

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const handleGDDetails = (_id) => {
    history.push(`/infoDaughter/${_id}`);
  };

  // const handleDelete = async (gDaughter) => {
  //   const _id = gDaughter._id;

  //   try {
  //     const response = await fetch(`${url}/${_id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const responseBody = await response.json();

  //     if (response.status === 200) {
  //       dispatch(removeGDaughter(gDaughter));
  //       // alert(`Gmother with ${gMother.first_name} ${gMother.last_name}
  //       // was deleted form Data Base`)
  //     } else {
  //       throw responseBody.message;
  //     }
  //   } catch (error) {
  //     dispatch(receiveGDaughterDataError(error));
  //   }
  // };

  const handleArchive = async (user) => {
    try {
      const response = await fetch(`${url}/user`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: user._id,
          isActif: !user.isActif,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        dispatch(updteGDaughterData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveGDaughterDataError(error));
    }
  };

  useEffect(() => {
    getFilteredUserData();
  }, [selectedType]);

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "error") {
    return <Error />;
  }
  if (status === "idle") {
    const displayGDUsers = gDaughters
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((gDaughter) => (
        <GDaughterDetails
          key={gDaughter._id}
          gDaughter={gDaughter}
          handleArchive={handleArchive}
          handleGDDetails={handleGDDetails}
        />
      ));
    const pageCount = Math.ceil(gDaughters.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    return (
      <Wrapper>
        <ListType
          selectedType={selectedType}
          onTypeSelected={handleSelectedType}
        />
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

  margin: auto;

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
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 0.8rem;
  }
  & .notActif {
    background: linear-gradient(
      to left top,
      rgba(220, 220, 220, 1),
      rgba(220, 220, 220, 0.2)
    );
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

export default GdaughterList;
