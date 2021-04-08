import React from "react";
import styled from "styled-components";
import { GiCheckMark } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

function Notification({ notification, deleteNotifcation }) {
  console.log("notification", notification);

  const jwt = localStorage.getItem("token");

  const handleInvitaion = async (key) => {
    const values = key
      ? {
          email: notification.clientId,
          assignTo: {
            assignGM: notification.userId,
          },
        }
      : {
          email: notification.clientId || "",
          assignTo: {
            assignGM: "",
          },
        };

    try {
      const response = await fetch("/api/users/infoGDaughter/user", {
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
        const responseN = await fetch(`/api/notification/${notification._id}`, {
          method: "DELETE",
          body: JSON.stringify(values),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": `${jwt}`,
          },
        });

        const responseBodyNotify = await responseN.json();

        if (responseBodyNotify.status === 200) {
          deleteNotifcation(notification._id);
        } else {
          throw responseBodyNotify.message;
        }
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      {notification.name}
      <button
        style={{ color: "#006400" }}
        onClick={() => handleInvitaion(true)}
      >
        <GiCheckMark size="15px" />
      </button>
      <button
        style={{ color: "#DC143C" }}
        onClick={() => handleInvitaion(false)}
      >
        <AiOutlineClose size="15px" />
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0.5rem;
  margin: 0.25rem auto;
`;

export default Notification;
