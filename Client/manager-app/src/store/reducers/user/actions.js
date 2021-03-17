export const requestUsertData = () => ({
    type: "REQUEST_USER_DATA",
});

export const receiveUsertData = (data) => ({
    type: "RECEIVE_USER_DATA",
    data,
    
});

export const receiveUserDataError = (error) => ({
    type: "RECEIVE_USER_DATA_ERROR",
    error,
});