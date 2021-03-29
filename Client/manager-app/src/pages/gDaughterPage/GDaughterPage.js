import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { UserContext } from "../../components/UserContext";
import RegisterPage from "../registerPage/RegisterPage";

import { updateUserData } from "../../store/reducers/user/actions";

import bebeImg from "../../assets/peauapeau.webp";
import bebePic from "../../assets/picture-bebe.jpg";
import Button from "../../components/button/Button";
import { useDispatch } from "react-redux";
import OneToOneEvent from "../registerEventPage/component/OneToOneEvent";
import UpdatePage from "../updatePage/UpdatePage";
function GDaughterPage() {
  const { _id } = useParams();

  const [statusGDData, setStatusGDData] = useState("loading");
  const [addTime, setAddTime] = useState(false);

  const dispatch = useDispatch();

  const { user } = useContext(UserContext);
  const [errors, setErrors] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);
  const [gDData, setGDData] = useState([]);

  const [totalTime, getTotalTime] = useState(null);

  const { pathname, search } = useLocation();

  const location = {
    pathname: `/register/${user}`,
    state: {
      redirectTo: pathname,
    },
  };
  const jwt = localStorage.getItem("token");

  const getUserData = async () => {
    try {
      const response = await fetch(`/api/users/infoGDaughter/${_id}`);

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
        getTotalTime(responseBody.total[0].total);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        console.log("update");

        alert(`The user has change the state `);
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
    alert("time Submited");
  };

  useEffect(() => {
    getUserData();
    getUsertime(_id);
  }, []);

  useEffect(() => {
    getUsertime(_id);
  }, [addTime]);

  if (statusGDData === "loading") {
    return <div>Loading...</div>;
  } else if (statusGDData === "error") {
    return <div>Error...</div>;
  } else if (statusGDData === "idle" && gDData) {
    const hasAccess = gDData.assignTo.assignGM === user._id;

    return (
      <Main>
        <Header></Header>
        <Wrapper>
          <div style={{ display: "flex" }}>
            <Circle1></Circle1>

            <div className="head">
              <h3>GDaughter Page</h3>
              {!isUpdate && (
                <Button onClick={() => setIsUpdate(!isUpdate)}>Update</Button>
              )}
            </div>
          </div>
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
              {totalTime}
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
              isGDaughter
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
            />
          )}

          {
            addTime && (
              // (isTimeSubmited ? (
              //   <div> timeSave </div>
              // ) : (
              <OneToOneEvent
                userGD={gDData}
                timeSubmitedCallback={timeSubmitedCallback}
              />
            )
            // )
            // )
          }
        </SubContainer>
      </Main>
    );
  }
}

const Main = styled.div`
  height: 100%;
  scroll-behavior: smooth;
`;

const Wrapper = styled.div`
  margin: 4rem;
  padding: 10px;

  & .head {
    display: flex;
    justify-content: space-between;
    flex: 3;
    margin-top: -2rem;
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
  background-image: url(${bebeImg});
  width: 100%;
  height: 20vh;
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
  width: 10rem;
  height: 10rem;
  text-align: center;
  border-radius: 50%;
  margin-top: -7rem;
`;

const Container = styled.div`
  background: linear-gradient(
    to left top,
    rgba(249, 231, 159, 0.8),
    rgba(255, 255, 255, 0.1)
  );
  width: 90%;
  border-radius: 1rem;
  margin: 2rem auto 1rem auto;
  padding: 2rem;

  & div {
    padding: 10px;
  }
`;

const SubContainer = styled.div`
  margin-bottom: 5rem;
  overflow-y: scroll;
`;

export default GDaughterPage;
