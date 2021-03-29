export const requestStatData = () => ({
  type: "REQUEST_STAT_DATA",
});

export const receiveStatData = (data) => ({
  type: "RECEIVE_STAT_DATA",
  data,
});

export const receiveGMData = (data) => ({
  type: "RECEIVE_STAT_GMOTHER_DATA",
  data,
});

export const receiveGDData = (data) => ({
  type: "RECEIVE_STAT_GDAUGHTER_DATA",
  data,
});

export const updteStatData = (item, key, value) => ({
  type: "UPDATE_STAT_DATA",
  item,
  key,
  value,
});

export const removeStat = (item) => ({
  type: "REMOVE_STAT",
  item,
});

export const receiveStatDataError = (error) => ({
  type: "RECEIVE_STAT_DATA_ERROR",
  error,
});
