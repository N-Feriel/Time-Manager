export const requestUserData = () => ({
  type: "REQUEST_USER_DATA",
});

export const receiveUserData = (data) => ({
  type: "RECEIVE_USER_DATA",
  data,
});

export const updateUserData = (user, key, value) => ({
  type: "UPDATE_USER_DATA",
  user,
  key,
  value,
});

export const receiveUserDataError = (error) => ({
  type: "RECEIVE_USER_DATA_ERROR",
  error,
});
