import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import _ from "lodash";

import CheckBoxField from "../../../components/form /CheckBoxField";
import FormField from "../../../components/form /FormField";
import SelectedField from "../../../components/form /SelectedField";
import { UserContext } from "../../../components/UserContext";

function GDaughterForm({ handleChange, formData, setFormData }) {
  const { status, gMothers } = useSelector((state) => state.gMother);

  let sources = [];

  const { user } = useContext(UserContext);

  const hasAccess = user.isAdmin;

  if (status === "idle") {
    sources = gMothers.map((gMother) =>
      _.pick(gMother, ["_id", "first_name", "last_name"])
    );

    sources.map(
      (source) => (source.text = `${source.first_name} ${source.last_name}`)
    );

    console.log(sources);
  }

  const handleChangeObj = (ev) => {
    const target = ev.target;

    const value = target.type === "checkbox" ? target.checked : target.value;

    const name = target.name;

    setFormData({
      ...formData,
      infoParent: {
        ...formData.infoParent,
        [name]: value,
      },
    });
  };

  const handleChangeObj2 = (ev) => {
    const target = ev.target;

    const value = target.type === "checkbox" ? target.checked : target.value;

    const name = target.name;

    setFormData({
      ...formData,
      assignTo: {
        ...formData.assignTo,
        [name]: value,
      },
    });
  };

  const handleAssign = (ev) => {
    const target = ev.target;
    const name = target.name;
    const value = ev.target.value;

    console.log(ev.target.value);

    setFormData({
      ...formData,
      assignTo: {
        [name]: value,
      },
    });
  };

  return (
    <div>
      <FormField
        name="dueDate"
        label="Due Date / Date of Birth"
        type="date"
        handleChange={handleChange}
        value={formData.dueDate}
      />

      <div>
        <Container>
          <h4> Info other Parent</h4>
          <CheckBoxField
            name="isContact"
            label="Is contact"
            type="checkbox"
            defaultChecked={formData.infoParent.isContact}
            handleChange={handleChangeObj}
          />
        </Container>
        <FormField
          name="name"
          label="Parent name"
          type="text"
          handleChange={handleChangeObj}
          value={formData.infoParent.name}
        />
      </div>

      {hasAccess && (
        <div style={{ display: "flex", margin: "20px" }}>
          <div>
            <h4 style={{ marginBottom: "-20px" }}>Assign To GMother</h4>

            <CheckBoxField
              name="isAssign"
              label="is Assign"
              type="checkbox"
              defaultChecked={formData.assignTo.isAssign}
              handleChange={handleChangeObj2}
            />
          </div>
          <div>
            <SelectedField
              name="assignGM"
              label="Assign to GM"
              type="text"
              handleChange={handleAssign}
              defaultValue={formData.assignTo.assignGM}
              sources={sources}
              // selectedValue={formData.assignTo.assignGM}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: -20px;

  & h4 {
    margin-left: 20px;
  }
`;

export default GDaughterForm;
