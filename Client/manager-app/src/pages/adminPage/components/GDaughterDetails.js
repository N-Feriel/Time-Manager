import React from "react";
import Button from "../../../components/button/Button";

function GDaughterDetails({ gDaughter, handleGDDetails, handleArchive }) {
  return (
    <div
      className={`details ${gDaughter.isActif ? "" : "notActif"}`}
      key={gDaughter._id}
    >
      <div style={{ flexDirection: "column" }}>
        <strong>
          {gDaughter.last_name} {gDaughter.first_name}
        </strong>
        <span>{gDaughter.email}</span>
      </div>
      <div>{gDaughter.phone}</div>

      <div>
        <Button onClick={() => handleGDDetails(gDaughter._id)}>Details</Button>

        <Button onClick={() => handleArchive(gDaughter)}>
          {gDaughter.isActif ? "Archive" : "Activate"}
        </Button>
      </div>
    </div>
  );
}

export default GDaughterDetails;
