const initialState = {
  gMothers: null,
  status: "loading",
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_GMOTHER_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_GMOTHER_DATA": {
      return {
        ...state,
        status: "idle",
        gMothers: [...action.data],
      };
    }

    case "UPDATE_GMOTHER_DATA": {
      const updated = state.gMothers.map((elm) =>
        elm._id === action.item._id ? { ...elm, ...action.item } : { ...elm }
      );

      return {
        ...state,
        status: "idle",
        gMothers: [...updated],
      };
    }

    case "REMOVE_GMOTHER": {
      return {
        ...state,
        gMothers: state.gMothers.filter((item) => item._id !== action.item._id),
      };
    }

    case "RECEIVE_USER_GMOTHER_ERROR": {
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
