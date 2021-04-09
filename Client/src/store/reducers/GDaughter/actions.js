export const requestGDaughterData = () => ({
  type: "REQUEST_GDAUGHTER_DATA",
});

export const receiveGDaughterData = (data) => ({
  type: "RECEIVE_GDAUGHTER_DATA",
  data,
});

export const updteGDaughterData = (item) => ({
  type: "UPDATE_GDAUGHTER_DATA",
  item,
});

export const removeGDaughter = (item) => ({
  type: "REMOVE_GDAUGHTER",
  item,
});

export const receiveGDaughterDataError = (error) => ({
  type: "RECEIVE_GDAUGHTER_DATA_ERROR",
  error,
});
