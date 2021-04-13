import * as ACTIONS from "../actions/constants";

const initialState = {
  isLoading: false,
  offset: 0,
  limit: 5,
  totalCounts: 0,
  listingData: [],
  isFilterApplied: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SHOW_LOADER:
      return { ...state, isLoading: true };
    case ACTIONS.STORE_FILTERED_DATA:
      return {
        ...state,
        listingData: action.listingData,
        offset: action.offset,
        totalCounts: action.totalCounts,
        isLoading: false,
        isFilterApplied: true,
      };
    case ACTIONS.FILTERED_NEXT_DATA:
      return {
        ...state,
        listingData: [...state.listingData, ...action.listingData],
        offset: action.offset,
        isLoading: false,
      };

    case ACTIONS.RESET_FILTER:
      return {
        ...state,
        listingData: [],
        offset: 0,
        isLoading: false,
        isFilterApplied: false,
      };
    default:
      return state;
  }
};

export default reducer;
