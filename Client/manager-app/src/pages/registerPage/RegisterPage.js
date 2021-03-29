import React, { useContext, useState } from "react";
import FormField from "../../components/form /FormField";
import { useHistory, useLocation } from "react-router-dom";

import Button from "../../components/button/Button";
import styled from "styled-components";
import CheckForm from "../../components/form /checkForm";
import CheckBoxField from "../../components/form /CheckBoxField";
import PersonnelForm from "../../components/form /PersonnelForm";
import SelectedField from "../../components/form /SelectedField";
import FromRegisterM from "./components/FromRegisterM";
import GDaughterForm from "../gDaughterPage/components/GDaughterForm";
import { UserContext } from "../../components/UserContext";
import _ from "lodash";

function RegisterPage({ initialState, isUpdate, isGDaughter, location }) {
  let history = useHistory();

  const [errors, setErrors] = useState("");

  const [formData, setFormData] = useState(initialState);

  const { user } = useContext(UserContext);

  let url;

  !isGDaughter
    ? (url = "/api/register/gMother/")
    : (url = "/api/register/gDaughter/");

  const { pathname, search, state } = useLocation();

  const [sourcesGM, setSourcesGM] = useState([
    { _id: "PPC", name: "PPC", text: "PPC" },
    { _id: "SITE", name: "SITE", text: "SITE" },
    { _id: "FB", name: "Facebook", text: "Facebook" },
    { _id: "CLSC", name: "CLSC", text: "CLSC" },
    { _id: "OTHR", name: "OTHERS", text: "OTHERS" },
  ]);

  const [sourcesGD, setSourcesGD] = useState([
    { _id: "PPC", name: "PPC", text: "PPC" },
    { _id: "SITE", name: "SITE", text: "SITE" },
    { _id: "FB", name: "Facebook", text: "Facebook" },
    { _id: "CLSC", name: "CLSC", text: "CLSC" },
    { _id: "LOT", name: "LOT", text: "LOT" },
    { _id: "OTHR", name: "OTHERS", text: "OTHERS" },
  ]);

  let hasAccess = user ? user.isAdmin : false;

  const jwt = localStorage.getItem("token");

  const handleChange = (ev) => {
    const target = ev.target;

    const value = target.type === "checkbox" ? target.checked : target.value;

    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeCheckBox = (name, data) => {
    if (data) {
      setFormData({
        ...formData,
        [name]: [...data],
      });
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        // history.push('/admin')
        console.log(responseBody.data, "response");

        // if (!isGDaughter) {
        //   //create user login Account with info

        //   //send email to the user to change his password and validate his email
        //   let mailData = _.pick(formData, ["first_name", "last_name", "email"]);
        //   let response2 = await fetch("/api/send", {
        //     method: "POST",
        //     body: JSON.stringify(mailData),
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //       "x-auth-token": `${jwt}`,
        //     },
        //   });

        //   let responseBody2 = await response2.json();

        //   if (responseBody2.status === 201) {
        //     alert(responseBody2.message);
        //   } else {
        //     throw responseBody2.message;
        //     //redirect user to resend email!!!
        //   }
        // } else {
        //   //send email to GMother that assig to

        //   let mailGM = _.pick(formData, [
        //     "first_name",
        //     "last_name",
        //     "email",
        //     "assignTo",
        //   ]);
        //   console.log(mailGM, "mailG");

        //   let responseGM = await fetch("/api/send/assignto", {
        //     method: "POST",
        //     body: JSON.stringify(mailGM),
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //       "x-auth-token": `${jwt}`,
        //     },
        //   });

        //   let responseBodyGM = await responseGM.json();

        //   if (responseBodyGM.status === 201) {
        //     alert(responseBodyGM.message);
        //   } else {
        //     throw responseBodyGM.message;
        //     //redirect user to resend email!!!
        //   }
        // }

        history.push(state.redirectTo);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };
  return (
    <Wrapper>
      {errors && (
        <div style={{ color: "red", marginTop: "2rem" }}> {errors}</div>
      )}

      {!isUpdate && (
        <h2>Register New {isGDaughter ? "gDaughter" : "gMother"}</h2>
      )}

      <form className="formC" onSubmit={handleSubmit}>
        <PersonnelForm
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />

        <SelectedField
          name="origin"
          label="Source"
          type="text"
          selectedValue={formData.origin}
          handleChange={handleChange}
          defaultValue={formData.origin}
          sources={isGDaughter ? sourcesGD : sourcesGM}
        />

        {isGDaughter ? (
          <GDaughterForm
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleChangeCheckBox={handleChangeCheckBox}
            hasAccess={hasAccess}
          />
        ) : (
          <>
            <FromRegisterM
              formData={formData}
              handleChange={handleChange}
              handleChangeCheckBox={handleChangeCheckBox}
            />
          </>
        )}

        <div style={{ display: "flex", alignItems: "space-between" }}>
          {!isGDaughter && (
            <CheckBoxField
              name="isAdmin"
              label="Admin"
              type="checkbox"
              defaultChecked={formData.isAdmin}
              handleChange={handleChange}
            />
          )}
          <CheckBoxField
            name="isActif"
            label="Actif"
            type="checkbox"
            defaultChecked={formData.isActif}
            handleChange={handleChange}
          />
        </div>

        <Button type="submit">{isUpdate ? "Update" : "Submit"}</Button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  & .checkBox {
    width: 10px;
  }

  & .formC {
    width: 90%;
    /* margin: auto; */
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: space-evenly;
  }

  & button {
    width: fit-content;
    align-self: flex-end;
  }
`;
export default RegisterPage;
