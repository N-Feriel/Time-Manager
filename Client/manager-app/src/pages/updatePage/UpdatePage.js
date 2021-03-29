import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import Button from "../../components/button/Button";
import CheckBoxField from "../../components/form /CheckBoxField";
import FormField from "../../components/form /FormField";
import SelectedField from "../../components/form /SelectedField";
import GDaughterForm from "../gDaughterPage/components/GDaughterForm";
import FromRegisterM from "../registerPage/components/FromRegisterM";

function UpdatePage({ initialState, isGDaughter, setIsUpdate, isUpdate }) {
  const [formData, setFormData] = useState(initialState);

  let url;

  const [errors, setErrors] = useState("");

  const history = useHistory();
  const jwt = localStorage.getItem("token");
  console.log("token");

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

  !isGDaughter
    ? (url = "/api/users/infoGMother/")
    : (url = "/api/users/infoGDaughter/");

  const { pathname, state } = useLocation();

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

  console.log(formData);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const response = await fetch(`${url}/user`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });
      const responseBody = await response.json();

      if (responseBody.status === 201) {
        alert("the user is updated");
        history.push(pathname);
        setIsUpdate(!isUpdate);
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

      <form className="formC" onSubmit={handleSubmit}>
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
          <CheckBoxField
            name="isActif"
            label="Actif"
            type="checkbox"
            defaultChecked={formData.isActif}
            handleChange={handleChange}
          />
        </div>

        <Button type="submit">Update</Button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default UpdatePage;
