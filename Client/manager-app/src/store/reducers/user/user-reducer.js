const initialState = {
    users: null,
    status: "loading",
    error: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case "REQUEST_USER_DATA": {
            return {
                ...state,
                status: 'loading'
            }
        }
        case "RECEIVE_USER_DATA":{
            return {
                ...state,
                status: 'idle',
                users: [
                    ...action.data
                ]
            }
        }
    
        case "RECEIVE_USER_DATA_ERROR": {
            return{
                ...state,
                status: 'error',
                error:{
                    ...state.error,
                    error: action.error.message
                }
            
            }
        }

        default:{
            return state;
        }
    }
    }
