import { produce } from "immer";

const initialState = {
  stats: [],

  StatMothers: [],
  StatGDaughters: [],
  statOneToOne: [],

  status: "idle",
  error: null,
};

export default function statReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_STAT_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_STAT_DATA": {
      return {
        ...state,
        status: "idle",
        stats: [...action.data],
      };
    }
    case "RECEIVE_STAT_ONETOONE_DATA": {
      return {
        ...state,
        status: "idle",
        statOneToOne: [...action.data],
      };
    }

    case "RECEIVE_STAT_GMOTHER_DATA": {
      return {
        ...state,
        status: "idle",
        StatMothers: [...action.data],
      };
    }
    case "RECEIVE_STAT_GDAUGHTER_DATA": {
      return {
        ...state,
        status: "idle",
        StatGDaughters: [...action.data],
      };
    }

    case "UPDATE_STAT_DATA": {
      return produce(state, (draftState) => {
        const { item } = action;
        draftState[item._id] = item;
      });
    }

    case "REMOVE_STAT": {
      return {
        ...state,
        stats: state.stats.filter((item) => item._id !== action.item._id),
      };
    }

    case "RECEIVE_STAT_ERROR": {
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
