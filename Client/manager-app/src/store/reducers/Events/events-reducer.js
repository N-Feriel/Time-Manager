import {produce} from'immer';

const initialState = {
    events: null,
    status: "loading",
    error: null,
};

export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case "REQUEST_EVENT_DATA": {
            return {
                ...state,
                status: 'loading'
            }
        }
        case "RECEIVE_EVENT_DATA":{
            return {
                ...state,
                status: 'idle',
                events: [
                    ...action.data
                ]
            }
        }

        case "UPDATE_EVENT_DATA":{        
            return produce(state, (draftState) =>{
                const {item} = action;
                draftState[item._id]= item;
            })
        }

        case 'REMOVE_EVENT':{
            return {
                ...state,
                events: 
                    state.events.filter(item => item._id !== action.item._id)
                
            }
        }
    
        case "RECEIVE_EVENT_ERROR": {
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
