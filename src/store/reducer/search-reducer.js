import * as ACTIONS from "../actions/constants";

const initialState = {
  isLoading: false,
  offset: 0,
  limit: 5,
  totalCounts: 0,
  listingData: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SHOW_LOADER:
      return { ...state, isLoading: true };
    case ACTIONS.RECEIVED_QUERY_DATA:
      return {
        ...state,
        listingData: action.listingData,
        query: action.query,
        offset: action.offset,
        totalCounts: action.totalCounts,
        isLoading: false,
      };
    case ACTIONS.RECEIVED_NEXT_DATA:
      return {
        ...state,
        listingData: [...state.listingData, ...action.listingData],
        offset: action.offset,
        isLoading: false,
      };
    case ACTIONS.UPDATE_EXISTING_DATA:
      return {
        ...state,
        offset: action.offset,
      };
    default:
      return state;
  }
};

export default reducer;
