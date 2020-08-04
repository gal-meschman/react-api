import { Actions } from "../actions/dCandidate";

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.FETCH_ALL:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case Actions.UPDATE:
      return {
        ...state,
        list: state.list.map((candidate) =>
        candidate.id === action.payload.id ? action.payload : candidate
        ),
      };
    case Actions.DELETE:
      return {
        ...state,
        list: state.list.filter(candidate => candidate.id !== action.payload)
      };
    default:
      return state;
  }
};
