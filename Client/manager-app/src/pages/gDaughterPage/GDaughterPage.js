import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import styled from "styled-components";
import { UserContext } from "../../components/UserContext";

import bebeImg from "../../assets/peauapeau.webp";
import bebePic from "../../assets/picture-bebe.jpg";
import Button from "../../components/button/Button";
import { useDispatch } from "react-redux";
import OneToOneEvent from "../eventPage/component/OneToOneEvent";
import UpdatePage from "../updatePage/UpdatePage";
import { onSmallTabletMediaQuery } from "../../utils/responsive";
import ModalC from "../../components/ModalC";
import { getgMotherList } from "../../services/apiHelp";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import TextError from "../../components/formik/TextError";
function GDaughterPage() {
  const { _id } = useParams();

  const [statusGDData, setStatusGDData] = useState("loading");
  const [addTime, setAddTime] = useState(false);

  // const dispatch = useDispatch();

  const { user } = useContext(UserContext);
  const [errors, setErrors] = useState("");

  // const [list, setList] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [gDData, setGDData] = useState([]);

  const [totalTime, getTotalTime] = useState(0);
  const history = useHistory();

  const { pathname } = useLocation();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [messageAl, setMessageAl] = useState("");

  const location = {
    pathname: `/register/${user}`,
    state: {
      redirectTo: pathname,
    },
  };
  const jwt = localStorage.getItem("token");

  const getUserData = async () => {
    try {
      const response = await fetch(`/api/users/infoGDaughter/${_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        setGDData(responseBody.data);
        setStatusGDData("idle");
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      console.log(error);
      setStatusGDData("error");
    }
  };

  const getUsertime = async (gdId) => {
    try {
      const url = `/api/event/oneToOne/totalTime/${gdId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        if (responseBody.total[0]) {
          getTotalTime(responseBody.total[0].total);
        }
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  // const getList = async () => {
  //   try {
  //     const response = await getgMotherList();

  //     const responseBody = await response.json();
  //     if (responseBody.status === 200) {
  //       setList(responseBody.data[0].listUsers);
  //     } else {
  //       throw responseBody.message;
  //     }
  //   } catch (error) {
  //     setErrors(error);
  //   }
  // };

  // let listGM = list.map((GM) => ({
  //   value: `${GM.first_name} ${GM.last_name}`,
  //   key: `${GM._id}`,
  // }));

  const handleArchive = async () => {
    const url = "/api/users/infoGDaughter/";

    try {
      const response = await fetch(`${url}/user`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: _id,
          isActif: !gDData.isActif,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        setGDData(responseBody.data);
        setMessageAl("The user has change the state ");
        setIsOpen(true);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const handleAddTime = () => {
    setAddTime(!addTime);
  };

  const timeSubmitedCallback = () => {
    setAddTime(false);
    setMessageAl("Time Submited");
    setIsOpen(true);
  };

  useEffect(() => {
    getUserData();
    getUsertime(_id);
  }, []);

  function closeModal() {
    setIsOpen(false);
    history.push(location.state.redirectTo);
  }

  useEffect(() => {
    getUsertime(_id);
  }, [addTime]);

  if (statusGDData === "loading") {
    return <Loading />;
  } else if (statusGDData === "error") {
    return <Error />;
  } else if (statusGDData === "idle" && gDData) {
    const hasAccess = gDData.assignTo.assignGM === user._id;

    return (
      <Main>
        <Header></Header>
        <Wrapper>
          <div className="head">
            <Circle1></Circle1>

            <ModalC
              setIsOpen={setIsOpen}
              closeModal={closeModal}
              modalIsOpen={modalIsOpen}
            >
              <h4>{messageAl}</h4>
              <Button onClick={closeModal}>close</Button>
            </ModalC>

            <div style={{ flex: 3, marginTop: "-3rem" }}>
              <h3>GDaughter Page</h3>
              {!isUpdate && (
                <Button onClick={() => setIsUpdate(!isUpdate)}>UPDATE</Button>
              )}
            </div>
          </div>
          <TextError>{errors}</TextError>
          <Container>
            <div>
              <strong>Name : </strong>
              {gDData.first_name} {gDData.last_name}
            </div>

            <div>
              <strong>Email : </strong>
              {gDData.email}
            </div>

            <div>
              <strong>Phone : </strong>
              {gDData.phone}
            </div>

            <div>
              <strong>Address : </strong>
              {gDData.address.street} {gDData.address.city}
            </div>

            <div>
              <strong>Total Time : </strong>
              {totalTime || 0} mn
            </div>
          </Container>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button onClick={handleArchive}>
              {gDData.isActif ? "Archive" : "Activate"}
            </Button>

            {hasAccess && (
              <Button
                className={gDData.isActif ? "" : "disabled"}
                disabled={gDData.isActif == false}
                onClick={handleAddTime}
              >
                add Time
              </Button>
            )}
          </div>
        </Wrapper>

        <SubContainer>
          {isUpdate && (
            <UpdatePage
              initialState={gDData}
              setGDData={setGDData}
              isGDaughter
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
              // listGM={listGM}
            />
          )}

          {addTime && (
            <OneToOneEvent
              userGD={gDData}
              timeSubmitedCallback={timeSubmitedCallback}
            />
          )}
        </SubContainer>
      </Main>
    );
  }
}

const Main = styled.div`
  height: 100%;
  /* scroll-behavior: smooth; */

  width: 100%;
`;

const Wrapper = styled.div`
  margin: 4rem;
  padding: 10px;

  & .head {
    display: flex;
    ${onSmallTabletMediaQuery()} {
      /* flex-wrap: wrap; */
      width: 100%;

      & h3 {
        font-size: 1.1rem;
      }
      & button {
        margin-right: -2rem;
      }
    }

    margin-top: -2rem;
    div {
      /* flex: 3; */
      justify-content: space-between;
      display: flex;
    }
  }
  & h3 {
    color: white;
    padding-left: 1rem;
  }

  & button {
    cursor: pointer;
    height: fit-content;
    margin-top: 1.2rem;
    color: white;
    background-color: rgba(39, 55, 70, 0.7);
  }
  & .disabled {
    background-color: rgba(39, 55, 70, 0.2);
    color: rgba(255, 255, 255, 0.3);
  }
`;

const Header = styled.div`
  ${onSmallTabletMediaQuery()} {
    height: 15vh;
  }
  background-image: url(${bebeImg});
  width: 100%;
  height: 25vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.3)
  );
`;

const Circle1 = styled.div`
  ${onSmallTabletMediaQuery()} {
    width: 5rem;
    height: 5rem;
    margin-top: -5rem;
    margin-left: -2rem;
  }
  background: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url(${bebePic});
  background-color: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.3)
  );
  width: 8rem;
  height: 8rem;
  /* text-align: center; */
  border-radius: 50%;
  margin-top: -7rem;
`;

const Container = styled.div`
  overflow-y: scroll;

  background: linear-gradient(
    to left top,
    rgba(249, 231, 159, 0.8),
    rgba(255, 255, 255, 0.1)
  );
  /* width: 90%; */
  border-radius: 1rem;
  margin: 2rem auto 1rem auto;
  padding: 2rem;

  & div {
    padding: 8px;
  }
`;

const SubContainer = styled.div`
  margin: 2rem auto 6rem auto;
  padding: 1rem;

  width: 90%;
  border-radius: 1rem;
`;

export default GDaughterPage;
