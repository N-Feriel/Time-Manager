import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GdSlot from "./GdSlot";

function ArchivesGM() {
  const { status, GDUsers } = useSelector((state) => state.user);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "error") {
    return <div>Error...</div>;
  } else if (status === "idle") {
    const usersGDArchives = GDUsers.filter((user) => user.isActif === false);

    return (
      <div>
        {usersGDArchives.length === 0 ? (
          <h2>No GDaugher in archives list</h2>
        ) : (
          <Wrapper>
            {usersGDArchives.map((userGD, i) => (
              <GdSlot key={userGD._id} userGD={userGD} isArchived />
            ))}
          </Wrapper>
        )}
      </div>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 1rem 2rem;
  margin: 5rem auto;

  background: linear-gradient(
    to right bottom,
    rgba(115, 198, 182, 0.8),
    rgba(115, 198, 182, 0.2)
  );
`;

export default ArchivesGM;
