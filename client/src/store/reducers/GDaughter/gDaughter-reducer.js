const initialState = {
  gDaughters: null,
  status: "loading",
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_GDAUGHTER_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_GDAUGHTER_DATA": {
      return {
        ...state,
        status: "idle",
        gDaughters: [...action.data],
      };
    }

    case "UPDATE_GDAUGHTER_DATA": {
      const updated = state.gDaughters.map((elm) =>
        elm._id === action.item._id ? { ...elm, ...action.item } : { ...elm }
      );

      return {
        ...state,
        status: "idle",
        gDaughters: [...updated],
      };
    }
    case "REMOVE_GDAUGHTER": {
      return {
        ...state,
        gDaughters: state.gDaughters.filter(
          (item) => item._id !== action.item._id
        ),
      };
    }

    case "RECEIVE_USER_GDAUGHTER_ERROR": {
      return {
        ...state,
        status: "error",
        error: {
          ...state.error,
          error: action.error.message,
        },
      };
    }

    default: {
      return state;
    }
  }
}
