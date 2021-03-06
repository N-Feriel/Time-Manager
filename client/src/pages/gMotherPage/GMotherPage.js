import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import Button from "../../components/button/Button";
import { themeVars } from "../../utils/GlobalStyles";

import UpdatePage from "../updatePage/UpdatePage";

import breastfeeding from "../../assets/breastfeeding.jpg";
import bebePic from "../../assets/peau-bebe.jpg";
import ModalC from "../../components/ModalC";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

function GMotherPage() {
  const { _id } = useParams();
  const jwt = localStorage.getItem("token");
  const { REACT_APP_API_URL } = process.env;

  const [statusGMData, setStatusGMData] = useState("loading");

  const [gDListAssigned, setGDListAssigned] = useState([]);

  const history = useHistory();

  // const { state } = useLocation();
  let url = `${REACT_APP_API_URL}/api/users/infoGMother`;

  const [isUpdate, setIsUpdate] = useState(false);
  const [gMData, setGMData] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [messageAl, setMessageAl] = useState("");

  const getUserData = async () => {
    try {
      const response = await fetch(`${url}/${_id}`);

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        setGMData(responseBody.data);
        setStatusGMData("idle");
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      console.log(error);
      setStatusGMData("error");
    }
  };

  const getUsertime = async () => {
    try {
      const url = `${REACT_APP_API_URL}/api/event/totalTime/${_id}`;

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
        setUserEvents(responseBody.data);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleArchive = async () => {
    try {
      const response = await fetch(`${url}/user`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: _id,
          isActif: !gMData.isActif,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        setGMData(responseBody.data);
        setStatusGMData("idle");
        setMessageAl(`The user has change the state `);
        setIsOpen(true);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setStatusGMData("error");
      console.log(error);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  const getGDAssigned = async () => {
    url = `${REACT_APP_API_URL}/api/users/GDaugherList/${_id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        setGDListAssigned(responseBody.data);
      } else {
        throw responseBody.mesage;
      }
    } catch (error) {
      console.log(error);
      setStatusGMData("error");
    }
  };

  const handleDelete = async () => {
    // not sure to use it or no??

    setMessageAl(
      "Are you sure to delete the user-- it's permenate all data will be erease "
    );

    try {
      const response = await fetch(`${url}/${_id}`, {
        method: "DELETE",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        history.push("/admin");
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setStatusGMData("error");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getGDAssigned();
    getUsertime();
  }, []);

  if (statusGMData === "loading") {
    return <Loading />;
  } else if (statusGMData === "error") {
    return <Error />;
  } else if (statusGMData === "idle" && gMData) {
    return (
      <Main>
        <Header></Header>
        <Wrapper>
          <div style={{ display: "flex" }}>
            <Circle1></Circle1>

            <h3 style={{ margin: "-1rem 1rem", color: `${themeVars.pink}` }}>
              {gMData.last_name} Details Page
            </h3>
          </div>

          <ModalC
            setIsOpen={setIsOpen}
            closeModal={closeModal}
            modalIsOpen={modalIsOpen}
          >
            <h4>{messageAl}</h4>
            <Button onClick={closeModal}>close</Button>
          </ModalC>

          <Container>
            <h4>General info:</h4>

            <div>
              <strong>Name : </strong>
              {gMData.first_name} {gMData.last_name}
            </div>

            <div>
              <strong>Email : </strong>
              {gMData.email}
            </div>

            <div>
              <strong>Phone : </strong>
              {gMData.phone}
            </div>
          </Container>

          <Container className={`${isUpdate ? "isOpen" : ""}`}>
            <div
              className="subOpen"
              style={{
                background: `${themeVars.lightPink}`,
                borderRadius: "1rem",
              }}
            >
              <h4>Total time </h4>
              {userEvents.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {userEvents.map((eventType) => (
                    <div key={eventType._id}>
                      {eventType._id} : <strong>{eventType.total}</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No total time Yet in your account</div>
              )}

              {/* fetch data to get numbers */}
              {gDListAssigned ? (
                <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <h4>Number of GDaughers: </h4>
                  <div style={{ marginLeft: "1rem" }}>
                    Actives :{" "}
                    <strong>
                      {gDListAssigned.actifs
                        ? gDListAssigned.actifs.length
                        : " 0 "}{" "}
                    </strong>
                  </div>
                  <div>
                    Archived :{" "}
                    <strong>
                      {gDListAssigned.archives
                        ? gDListAssigned.archives.length
                        : " 0 "}{" "}
                    </strong>
                  </div>
                </div>
              ) : (
                <p>No GDaughters assigned yet</p>
              )}
            </div>

            {!isUpdate ? (
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button onClick={() => setIsUpdate(!isUpdate)}>Update</Button>
                <Button onClick={handleArchive}>
                  {gMData.isActif ? "Archive" : "Activate"}
                </Button>
                <Button disabled onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            ) : (
              <div style={{ flex: 3 }}>
                <UpdatePage
                  initialState={gMData}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                />
              </div>
            )}
          </Container>
        </Wrapper>
      </Main>
    );
  }
}

const Main = styled.div`
  /* height: fit-content; */
  margin-bottom: 4rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-items: center;
  align-content: center;
  min-height: 60vh;

  border-radius: 1rem;
  flex-direction: column;
  margin: 1rem;

  & button {
    width: fit-content;
  }
`;

const Header = styled.div`
  background-image: url(${bebePic});
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
  background-image: url(${breastfeeding});
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
    to right bottom,
    rgba(255, 255, 255, 0.8),
    rgba(246, 196, 196, 0.2)
  );

  width: 90%;
  border-radius: 1rem;
  margin: 2rem auto 1rem auto;
  padding: 1rem 2rem;

  &.isOpen {
    display: flex;
    padding: 1rem 2rem 1rem 1rem;
    & .subOpen {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
    }
  }

  & div {
    padding: 5px 10px;
  }
`;
export default GMotherPage;
