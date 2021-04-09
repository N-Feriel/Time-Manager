import React, { useContext } from "react";
import styled from "styled-components";
import { themeVars } from "../../utils/GlobalStyles";

import { IoPersonAdd } from "react-icons/io5";
import { ImStatsBars2 } from "react-icons/im";
import { CgUserList } from "react-icons/cg";
import { GiMedallist } from "react-icons/gi";
import { UserContext } from "../UserContext";

function SideBar({ setValueList, valueList }) {
  const { user } = useContext(UserContext);
  return (
    <Container>
      <div className="userC">
        <div className="imgAvatar">
          <span style={{ margin: "auto" }}>Admin</span>
        </div>

        {user && (
          <strong>
            {user.first_name} {user.last_name}
          </strong>
        )}
      </div>

      <div className="links">
        <div
          className={`link ${valueList === "register" ? "active" : ""}`}
          onClick={() => setValueList("register")}
        >
          <IoPersonAdd size="25px" />
          <h4>Add new</h4>
        </div>

        <div
          className={`link ${valueList === "default" ? "active" : ""}`}
          onClick={() => setValueList("default")}
        >
          <ImStatsBars2 size="25px" />
          <h4>Stats</h4>
        </div>

        <div
          className={`link ${valueList === "gDaughter" ? "active" : ""}`}
          onClick={() => setValueList("gDaughter")}
        >
          <CgUserList size="25px" />
          <h4>Clients List</h4>
        </div>

        <div
          className={`link ${valueList === "gMother" ? "active" : ""}`}
          onClick={() => setValueList("gMother")}
        >
          <GiMedallist size="25px" />
          <h4>GMothers List</h4>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  text-align: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.2)
  );
  border-radius: 2rem;

  & .imgAvatar {
    background: white;
    background: linear-gradient(
      to right bottom,
      rgba(209, 58, 58, 0.8),
      rgba(97, 103, 160, 0.5)
    );
    color: white;
    font-weight: 600;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    display: flex;
    text-align: center;
    margin-right: 10px;
  }

  & .userC {
    display: flex;
    align-items: center;
    margin: 4rem 2rem;
    flex-wrap: wrap;
  }

  & button {
    background-color: ${themeVars.red};
    width: 90%;
    color: ${themeVars.darkPink};
    border: none;
  }

  & .links {
    margin: 2rem;
  }

  & .link {
    display: flex;
    align-items: center;
    margin: 1rem 0.5rem;
    padding: 0 0.5rem;
    color: ${themeVars.violet};
    text-align: center;
    cursor: pointer;

    & h4 {
      padding: 0rem 0.8rem;
      color: rgba(40, 43, 71, 0.8);
      font-weight: 600;
      font-size: 1rem;
    }
  }
  & .active {
    color: rgba(209, 58, 58, 0.6);

    & h4 {
      color: rgba(209, 58, 58, 0.8);
    }
  }

  & .resetButton {
    background: linear-gradient(to right top, #f6c4c4, #6167a0);
    display: flex;
    align-items: center;
    padding: 1rem;
    color: ${themeVars.pink};
    border-radius: 1.2rem;
    margin: 1rem;

    & h4 {
      padding: 0rem 0.8rem;
    }

    &:hover {
      color: ${themeVars.red};
    }
  }
`;

export default SideBar;
