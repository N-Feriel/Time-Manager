import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Form, Formik } from "formik";
import Button from "../../components/button/Button";
import FormikControl from "../../components/formik/FormikControl";
import { themeVars } from "../../utils/GlobalStyles";

import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../components/UserContext";
import ModalC from "../../components/ModalC";

import { updteGDaughterData } from "../../store/reducers/GDaughter/actions";
import { updteGMotherData } from "../../store/reducers/GMother/actions";

function UpdatePage({
  initialState,
  isGDaughter,
  setIsUpdate,
  isUpdate,
  setGDData,
}) {
  let url;

  const dispatch = useDispatch();

  const [errors, setErrors] = useState("");

  const history = useHistory();
  const jwt = localStorage.getItem("token");

  const { user } = useContext(UserContext);

  let hasAccess = user ? user.isAdmin : false;

  const sources = [
    { key: "Select Origin Type", values: "" },
    { key: "PPC", value: "PPC" },
    { key: "SITE", value: "SITE" },
    { key: "Facebook", value: "Facebook" },
    { key: "CLSC", value: "CLSC" },
    { key: "LOT", value: "LOT" },
    { key: "OTHERS", value: "OTHERS" },
  ];

  !isGDaughter
    ? (url = "/api/users/infoGMother/")
    : (url = "/api/users/infoGDaughter/");

  // const { pathname, state } = useLocation();

  // const [modalIsOpen, setIsOpenModal] = useState(false);
  // const [messageAl, setMessageAl] = useState([]);

  const { status, gMothers } = useSelector((state) => state.gMother);

  let assignData,
    listGM = [];

  if (status === "idle") {
    assignData = gMothers
      .filter((gMother) => gMother.isActif === true)
      .map((gMother) => _.pick(gMother, ["_id", "first_name", "last_name"]));

    listGM = assignData.map((GM) => ({
      value: `${GM.first_name} ${GM.last_name}`,
      key: `${GM._id}`,
    }));
  }

  const languages = [
    { _id: "EN", key: "English", value: "english" },
    { _id: "FR", key: "French", value: "french" },
    { _id: "AR", key: "Arabic", value: "arabic" },
    { _id: "ES", key: "Espanol", value: "espanol" },
  ];

  const training = [
    { _id: "J1", value: "DAY_1", key: "DAY 1" },
    { _id: "J2", value: "DAY_2", key: "DAY 2" },
    { _id: "J3", value: "DAY_3", key: "DAY 3" },
  ];

  const onSubmit = async (values) => {
    let content;

    try {
      const response = await fetch(`${url}/user`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });
      const responseBody = await response.json();

      if (responseBody.status === 201) {
        if (isGDaughter) {
          dispatch(updteGDaughterData(responseBody.data));
          setGDData(responseBody.data);
        } else {
          dispatch(updteGMotherData(responseBody.data));
        }

        //if asssign to the new GMother create a new notification
        if (initialState.assignTo.assignGM !== values.assignTo.assignGM) {
          let notificationData = {
            name: "New GDaughter is Assign to you",
            isSeen: false,
            sendBy: "",
            eventDate: Date.now(),
            userId: values.assignTo.assignGM,
            clientId: values.email,
          };

          try {
            let responseNot = await fetch("/api/notification", {
              method: "POST",
              body: JSON.stringify(notificationData),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-auth-token": `${jwt}`,
              },
            });

            let responseBodyNotify = await responseNot.json();

            if (responseBodyNotify.status === 201) {
              // content = {
              //   message: "Notification was send to GMother",
              //   isSuccess: true,
              // };

              // setMessageAl([...messageAl, content]);

              alert("Notification was send to GMother");
            } else {
              // redirect user to resend email!!!

              throw responseBodyNotify.message;
            }
          } catch (error) {
            setErrors(error);
          }
        }

        // // setMessageAl(...messageAl, "the user is updated");

        // content = {
        //   _id: responseBody.data._id,
        //   message: "The user is updated",
        //   isSuccess: true,
        // };
        // // messageAl.push(content);

        // setMessageAl([...messageAl, content]);

        alert("The user is updated");
        setIsUpdate(!isUpdate);
      } else {
        // content = {
        //   _id: responseBody.data._id,
        //   message: "Fail updating the user",
        //   isSuccess: false,
        // };
        // setMessageAl(...messageAl, content);
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  // function closeModal() {
  //   setIsOpenModal(false);
  //   setIsUpdate(!isUpdate);
  //   history.push(pathname);
  // }

  // const getOpen = () => {
  //   if (messageAl.length > 0) {
  //     console.log(messageAl);
  //     setIsOpenModal(true);
  //   }
  //   console.log(messageAl);
  // };

  // useEffect(() => {
  //   getOpen();
  // }, [messageAl]);

  return (
    <Wrapper>
      {errors && (
        <div style={{ color: "red", marginTop: "2rem" }}> {errors}</div>
      )}

      {/* <ModalC closeModal={closeModal} modalIsOpen={modalIsOpen}>
        {messageAl.map((message) => {
          return <div key={message._id}>{message.name}</div>;
        })}
      </ModalC> */}

      <Formik
        initialValues={initialState}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <div style={{ display: "flex" }}>
                <FormikControl
                  control="input"
                  type="checkbox"
                  label="Member of PPC"
                  name="isMember"
                  isCheckBox
                />
                <FormikControl
                  control="input"
                  type="checkbox"
                  label="Actif"
                  name="isActif"
                  isCheckBox
                />
              </div>

              {isGDaughter ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      margin: "0 1rem 1rem 0",
                    }}
                  >
                    <FormikControl
                      control="input"
                      type="checkbox"
                      label="Contact Parent"
                      name="infoParent.isContact"
                      isCheckBox
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="Name parent"
                      name="infoParent.name"
                    />
                  </div>

                  <div className="cont">
                    <FormikControl
                      control="date"
                      label="Due Date/ Date of Birth"
                      name="dueDate"
                    />

                    <FormikControl
                      control="select"
                      label="Source"
                      name="origin"
                      options={sources}
                    />
                  </div>

                  {hasAccess && (
                    <FormikControl
                      control="select"
                      label="AssignGM"
                      name="assignTo.assignGM"
                      options={listGM}
                    />
                  )}
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "flex-end",
                    }}
                  >
                    <FormikControl
                      control="date"
                      label="Start Date"
                      name="startDate"
                    />

                    <FormikControl
                      control="input"
                      type="checkbox"
                      label="Admin"
                      name="isAdmin"
                      isCheckBox
                    />
                  </div>

                  <FormikControl
                    control="checkbox"
                    label="Languages"
                    name="languages"
                    options={languages}
                    isCheckBox
                  />

                  <FormikControl
                    control="checkbox"
                    label="Training"
                    name="training"
                    options={training}
                    isCheckBox
                  />
                </>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: " 2rem 0 ",
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  border-radius: 2rem;
  flex-wrap: wrap;

  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.2)
  );
`;

export default UpdatePage;
