import React from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import Button from "../../../components/button/Button";
import { themeVars } from "../../../utils/GlobalStyles";
import { onSmallTabletMediaQuery } from "../../../utils/responsive";
import OneToOneEvent from "../../eventPage/component/OneToOneEvent";

function GdSlot({
  userGD,
  isOpen,
  setIsOpen,
  timeSubmitedCallback,
  isArchived,
}) {
  const history = useHistory();

  const { pathname } = useLocation();

  // const [isTimeSubmited, setIsTimeSubmited] = useState(false);

  const handleGDDetails = (userId) => {
    const location = {
      pathname: `/infoDaughter/${userId}`,
      state: {
        redirectTo: pathname,
      },
    };

    history.push(location);
  };

  const handleAddTime = () => {
    // setIsOneToOne(!isOneToOneEvent)
    setIsOpen();

    // setAddTime(!addTime)
  };

  return (
    <Wrapper key={userGD._id}>
      <div>
        <div className="info">
          <div style={{ flexDirection: "column" }}>
            <strong>
              {userGD.last_name} {userGD.first_name}
            </strong>
          </div>
          <div>{userGD.phone}</div>
        </div>

        <div>
          <Button
            style={{
              background: `${themeVars.lightPink}`,
              color: `${themeVars.darkPink}`,
            }}
            onClick={() => handleGDDetails(userGD._id)}
          >
            Details
          </Button>

          {!isArchived && (
            <Button onClick={() => handleAddTime()}>Add time</Button>
          )}
        </div>
      </div>
      <div className="timeForm">
        {
          isOpen && (
            // (isTimeSubmited ? (
            //   <div> timeSave </div>
            // ) : (
            <OneToOneEvent
              userGD={userGD}
              timeSubmitedCallback={timeSubmitedCallback}
            />
          )
          // )
          // )
        }
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-content: space-between;
  margin: 1rem auto;

  & div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  ${onSmallTabletMediaQuery()} {
    & .info {
      display: flex;
      flex-wrap: wrap;
    }
  }
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.2)
  );

  padding: 0.5rem;
  border-radius: 0.8rem;

  & .timeForm {
    display: flex;
  }
`;

export default GdSlot;
