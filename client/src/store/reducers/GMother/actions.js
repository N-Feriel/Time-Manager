export const requestGMotherData = () => ({
  type: "REQUEST_GMOTHER_DATA",
});

export const receiveGMotherData = (data) => ({
  type: "RECEIVE_GMOTHER_DATA",
  data,
});

export const updteGMotherData = (item) => ({
  type: "UPDATE_GMOTHER_DATA",
  item,
});

export const removeGMother = (item) => ({
  type: "REMOVE_GMOTHER",
  item,
});

export const receiveGMotherDataError = (error) => ({
  type: "RECEIVE_GMOTHER_DATA_ERROR",
  error,
});
