import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import styled from "styled-components";

import FormikControl from "../../components/formik/FormikControl";
import ModalC from "../../components/ModalC";
import Notification from "./component/Notification";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

import {
  requestUserData,
  receiveUserData,
  receiveUserDataError,
} from "../../store/reducers/user/actions";
import { logout } from "../../services/authService";
import Button from "../../components/button/Button";
import GdSlot from "./component/GdSlot";
import TextError from "../../components/formik/TextError";
import { themeVars } from "../../utils/GlobalStyles";
import {
  onDesktopMediaQuery,
  onSmallTabletMediaQuery,
} from "../../utils/responsive";

import supportmom from "../../assets/support-mom.jpg";
import { MdNotificationsActive } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import breastfeeding from "../../assets/breastfeeding.jpg";
import { UserContext } from "../../components/UserContext";

function UserPage() {
  const url = "/api/users/GDaugherList";

  const dispatch = useDispatch();

  const history = useHistory();
  const [errors, setErrors] = useState("");

  const { status, GDUsers } = useSelector((state) => state.user);

  const { pathname, state } = useLocation();

  const [isDetails, setIsDetails] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [totalNew, setTotalNew] = useState(0);

  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const [modalIsOpen, setIsOpenModal] = useState(false);
  const [messageUpdate, setMessageUpdate] = useState(null);

  const [modalIsOpen1, setIsOpenModal1] = useState(false);

  const initialValues = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Required"),
    newPassword: Yup.string()
      .required("Required")
      .min(8, "min of 8 characters"),

    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Required"),
  });

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

  const getNotifications = async () => {
    try {
      const response = await fetch(
        "/api/notification/totalNotifications/user",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Accept-Charset": "utf-8",
            "x-auth-token": `${jwt}`,
          },
        }
      );

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        getTotalNewNotifications(responseBody.data);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const getTotalNewNotifications = (array) => {
    array.map((obj) => {
      if (!obj._id && obj.notifications.length) {
        setUserNotifications(obj.notifications);
        setTotalNew(obj.notifications.length);
      }
    });
  };

  const displayNotifications = async () => {
    if (userNotifications.length > 0) {
      setIsOpenModal(true);
    } else {
      setIsOpenModal(false);
    }
  };

  const deleteNotifcation = (id) => {
    const notifications = userNotifications.filter(
      (notification) => notification._id !== id
    );
    setUserNotifications(notifications);

    if (notifications.length === 0) {
      setIsOpenModal(false);
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
      setErrors(error);
    }
  };

  const handleChangePassword = async (values) => {
    setErrors("");
    try {
      let response = await fetch("/api/auth/login/changePassword", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (response.status === 201) {
        localStorage.setItem("token", responseBody.token);
        setIsOpen(false);
        setMessageUpdate(responseBody.message);
        setIsOpenModal1(true);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const timeSubmitedCallback = () => {
    setCurrentOpenIndex(-1);
    setMessageUpdate("success, Time Submited");
    setIsOpenModal1(true);
  };

  const handleLogOut = () => {
    logout();
    history.push("/");
  };

  const handleUserInfo = () => {
    setIsDetails(!isDetails);
    setIsOpen(false);
    getUsertime();
  };

  useEffect(() => {
    getGDAssigned();
    getNotifications();
    displayNotifications();
  }, []);

  if (status === "loading") {
    return <Loading />;
  } else if (status === "error") {
    return <Error />;
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

          {user && (
            <div className="detailsC">
              <div className="detailsUser" onClick={handleUserInfo}>
                @{user.first_name} {user.last_name}
              </div>
              <div
                style={{ display: "flex", color: "white", marginLeft: "10px" }}
                onClick={displayNotifications}
              >
                <MdNotificationsActive size="30px" />

                {totalNew > 0 && <p className="notify">{totalNew}</p>}
              </div>
            </div>
          )}

          <Button className="login" onClick={handleLogOut}>
            <BiLogOutCircle
              size="25px"
              style={{ margin: "-10px 5px -10px 0px" }}
            />
            Logout
          </Button>
        </div>

        <ModalC modalIsOpen={modalIsOpen}>
          {userNotifications.map((notification, i) => {
            return (
              <Notification
                deleteNotifcation={deleteNotifcation}
                key={notification._id}
                notification={notification}
                setIsOpenModal={setIsOpenModal}
              />
            );
          })}
        </ModalC>

        <ModalC modalIsOpen={modalIsOpen1}>
          <>
            <h4>{messageUpdate}</h4>
            <Button
              style={{ background: `${themeVars.pink}` }}
              onClick={() => setIsOpenModal1(false)}
            >
              close
            </Button>
          </>
        </ModalC>

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
            </div>

            {isOpen ? (
              <PasswordContainer>
                {errors && <TextError>{errors}</TextError>}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleChangePassword}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <FormikControl
                          control="input"
                          type="password"
                          label="Old Password"
                          name="password"
                        />
                        <FormikControl
                          control="input"
                          type="password"
                          label="New Password"
                          name="newPassword"
                        />
                        <FormikControl
                          control="input"
                          type="password"
                          label="Confirm new Password"
                          name="confirmNewPassword"
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Button type="submit" disabled={!formik.isValid}>
                            Save
                          </Button>
                          <Button
                            style={{
                              background: `${themeVars.violet}`,
                              color: `${themeVars.pink}`,
                            }}
                            type="reset"
                          >
                            Reset
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </PasswordContainer>
            ) : (
              <Button onClick={() => setIsOpen(true)}>change Password</Button>
            )}
          </GeneralInfo>
        )}

        {usersGDActive.length === 0 ? (
          <h2>No GDaugher in actif list</h2>
        ) : (
          <Wrapper>
            <h3>List of GDaughters</h3>
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
  ${onSmallTabletMediaQuery()} {
    font-size: 12px;
  }
  display: flex;
  flex-direction: column;
  align-content: space-between;

  background: linear-gradient(
    to right bottom,
    rgba(246, 196, 196, 0.5),
    rgba(246, 196, 196, 0.2)
  );
  padding: 1.5rem;
  margin: 2rem auto;
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

  & h3 {
    color: ${themeVars.darkBlue};
    text-align: center;
  }
`;

const PasswordContainer = styled.div`
  margin: auto -1rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  ${onDesktopMediaQuery()} {
    width: 50%;
    margin: auto;
  }
`;

const Container = styled.div`
  margin-bottom: 4rem;

  & .login {
    ${onSmallTabletMediaQuery()} {
      font-size: 12px;
    }
    color: white;
    background: ${themeVars.darkBlue};
  }

  & .detailsC {
    display: flex;
    align-self: flex-start;
    justify-content: center;
    align-items: center;
    margin-right: auto;
  }
  & .detailsUser {
    color: ${themeVars.pink};
    cursor: pointer;
    align-self: center;

    &:hover {
      font-weight: bold;
      text-decoration: underline;
    }
  }
  & .notify {
    background-color: red;
    margin: 0 0 auto -10px;
    border-radius: 50%;
    padding: 2px 5px;
    cursor: pointer;
    &:hover {
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;

const Header = styled.div`
  ${onSmallTabletMediaQuery()} {
    height: 15vh;
  }
  background-image: url(${supportmom});
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
    margin-top: -3rem;
  }
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
  padding: 1rem;
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

  & h4 {
    text-align: center;
  }

  & button {
    width: fit-content;
    align-self: flex-end;
  }

  & .icon {
    margin: -30px -20px 0 0;
    align-self: flex-end;
  }

  & li {
    list-style: none;
    padding: 5px;
  }

  & .elNew:hover {
    color: rgba(232, 97, 153, 0.9);
    background: wheat;
    cursor: pointer;
  }

  & .seen {
    background: rgba(163, 88, 119, 0.4);
    color: gray;
    margin: 1rem 0;
  }
  & .new {
    background: rgba(232, 97, 153, 0.9);
    color: wheat;
  }
`;
export default UserPage;
