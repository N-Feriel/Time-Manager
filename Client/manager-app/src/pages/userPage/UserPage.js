import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  requestUserData,
  receiveUserData,
  receiveUserDataError,
} from "../../store/reducers/user/actions";
import { UserContext } from "../../components/UserContext";
import GdaughterList from "../adminPage/components/GdaughterList";
import styled from "styled-components";
import Button from "../../components/button/Button";
import RegisterEventPage from "../registerEventPage/RegisterEventPage";
import OneToOneEvent from "../registerEventPage/component/OneToOneEvent";
import { Redirect, useHistory, useLocation } from "react-router";
import GdSlot from "./component/GdSlot";

import breastfeeding from "../../assets/breastfeeding.jpg";
import supportmom from "../../assets/support-mom.jpg";
import bebePic from "../../assets/peau-bebe.jpg";
import { logout } from "../../services/authService";
import { FaUserCircle } from "react-icons/fa";
import { themeVars } from "../../utils/GlobalStyles";

function UserPage(props) {
  const { user } = useContext(UserContext);
  const url = "/api/users/GDaugherList";

  const dispatch = useDispatch();

  const history = useHistory();

  const { status, GDUsers } = useSelector((state) => state.user);

  const { pathname, search } = useLocation();

  const [isDetails, setIsDetails] = useState(false);
  const [userEvents, setUserEvents] = useState([]);

  // let numb =  GDUsers ? GDUsers.length : 1

  // const [isOneToOneEvent, setIsOneToOne] = useState(_.times(numb, _.constant(false)))

  // const [isOneToOneEvene, setIsOneToOne] = useState(false)

  // console.log('user', user)

  const [currentOpenIndex, setCurrentOpenIndex] = useState(-1);

  const jwt = localStorage.getItem("token");

  const getGDAssigned = async () => {
    try {
      dispatch(requestUserData());

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
        dispatch(receiveUserData(responseBody.data));
      } else {
        throw responseBody.mesage;
      }
    } catch (error) {
      console.log(error);
      dispatch(receiveUserDataError(error));
    }
  };

  const getUsertime = async () => {
    try {
      const url = `/api/event/totalTime/${user._id}`;

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

  const timeSubmitedCallback = () => {
    setCurrentOpenIndex(-1);
    alert("timeSubmited");
  };

  const handleLogOut = () => {
    logout();
    history.push("/");
  };

  const handleUserInfo = () => {
    setIsDetails(!isDetails);
    getUsertime();
  };

  useEffect(() => {
    getGDAssigned();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "error") {
    return <div>Error...</div>;
  } else if (status === "idle") {
    const usersGDActive = GDUsers.filter((user) => user.isActif === true);
    return (
      <Container>
        <Header></Header>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 2rem",
          }}
        >
          <Circle1></Circle1>

          <div className="detailsUser" onClick={handleUserInfo}>
            @{user.first_name} {user.last_name}
          </div>
          <Button className="login" onClick={handleLogOut}>
            <FaUserCircle
              size="30px"
              style={{ margin: "-10px 5px -10px 0px" }}
            />
            Logout
          </Button>
        </div>

        {isDetails && (
          <GeneralInfo>
            <h4>General Info</h4>
            {/* get total time for each categorie */}
            <div>
              <strong>Name : </strong>
              {user.first_name} {user.last_name}
            </div>

            <div>
              <strong>Email : </strong>
              {user.email}
            </div>

            <div>
              <strong>Total time </strong>
              {userEvents.length > 0 ? (
                <div style={{ display: "flex" }}>
                  {userEvents.map((eventType) => (
                    <div key={eventType._id}>
                      {eventType._id} : <strong>{eventType.total}</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No total time Yet in your account</div>
              )}
            </div>

            <Button>change Password</Button>
          </GeneralInfo>
        )}

        {usersGDActive.length === 0 ? (
          <h2>No GDaugher in actif list</h2>
        ) : (
          <Wrapper>
            <h4>List of GDaughters</h4>
            {usersGDActive.map((userGD, i) => (
              <GdSlot
                key={userGD._id}
                userGD={userGD}
                isOpen={currentOpenIndex === i}
                setIsOpen={() => setCurrentOpenIndex(i)}
                timeSubmitedCallback={timeSubmitedCallback}
              />
            ))}
          </Wrapper>
        )}
      </Container>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;

  background: linear-gradient(
    to right bottom,
    rgba(246, 196, 196, 0.8),
    rgba(246, 196, 196, 0.2)
  );
  padding: 1.5rem;
  margin: 1.5rem;
  width: 90%;
  border-radius: 1rem;

  & .details {
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.1)
    );
    margin: 1rem 0;
    padding: 0.5rem;
    border-radius: 0.8rem;
    display: flex;
    flex-direction: column;
  }
  & .timeForm {
    display: flex;
  }
`;

const Container = styled.div`
  & .login {
    color: white;
    background: ${themeVars.darkBlue};
  }

  & .detailsUser {
    color: ${themeVars.pink};
    margin-top: 15px;
    position: absolute;
    left: 190px;
    cursor: pointer;

    &:hover {
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;

const Header = styled.div`
  background-image: url(${supportmom});
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
  margin-top: -6rem;
`;

const GeneralInfo = styled.div`
  width: 90%;
  border-radius: 1rem;
  margin: 2rem auto 1rem auto;
  padding: 2rem;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.3)
  );
  display: flex;
  flex-direction: column;
  & div {
    padding: 10px;
  }

  & button {
    width: fit-content;
    align-self: flex-end;
  }
`;
export default UserPage;
