export const requestEventData = () => ({
    type: "REQUEST_EVENT_DATA",
});

export const receiveEventData = (data) => ({
    type: "RECEIVE_EVENT_DATA",
    data,
    
});

export const updteEventData =(item, key, value) =>({
    type: "UPDATE_EVENT_DATA",
    item, 
    key,
    value
})
export const removeEvent = (item) => ({
    type: "REMOVE_EVENT",
    item,
});



export const receiveEventError = (error) => ({
    type: "RECEIVE_EVENT_ERROR",
    error,
});