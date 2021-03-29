import React, { useState } from "react";
import styled from "styled-components";
import CheckForm from "../../../components/form /checkForm";
import FormField from "../../../components/form /FormField";

function FromRegisterM({ formData, handleChange, handleChangeCheckBox }) {
  const [languages, setLanguages] = useState([
    { _id: "EN", name: "English", text: "english" },
    { _id: "FR", name: "French", text: "french" },
    { _id: "AR", name: "Arabic", text: "arabic" },
    { _id: "ES", name: "espanol", text: "espanol" },
  ]);

  const [training, settraining] = useState([
    { _id: "J1", name: "DAY_1", text: "DAY 1" },
    { _id: "J2", name: "DAY_2", text: "DAY 2" },
    { _id: "J3", name: "DAY_3", text: "DAY 3" },
  ]);

  const [trgDataForm, setTrgForm] = useState(formData.training);

  const [lgDataForm, setLgForm] = useState(formData.languages);

  return (
    <Container>
      <FormField
        name="startDate"
        label="Start date"
        type="date"
        handleChange={handleChange}
        defaultValue={formData.startDate}
      />

      <CheckForm
        categories={languages}
        name={"languages"}
        defaultValue={formData.languages}
        dataForm={lgDataForm}
        setdataForm={setLgForm}
        handleChangeCheckBox={handleChangeCheckBox}
      />

      <CheckForm
        categories={training}
        name={"training"}
        defaultValue={formData.training}
        dataForm={trgDataForm}
        setdataForm={setTrgForm}
        handleChangeCheckBox={handleChangeCheckBox}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default FromRegisterM;
