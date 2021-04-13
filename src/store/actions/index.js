import * as ACTIONS from "./constants";
import axios from "axios";
import { diffYears, throttle } from "../../utils";

const BASE_URL = "https://musicbrainz.org/ws/2/artist";

export const showLoader = () => {
  return {
    type: ACTIONS.SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: ACTIONS.HIDE_LOADER,
  };
};

export const receiveQueryResults = (
  listingData,
  query,
  totalCounts,
  offset
) => {
  return {
    type: ACTIONS.RECEIVED_QUERY_DATA,
    listingData,
    query,
    totalCounts,
    offset,
  };
};

export const receiveNextResults = (listingData, offset) => {
  console.log(offset, "offset123");
  return {
    type: ACTIONS.RECEIVED_NEXT_DATA,
    listingData,
    offset,
  };
};

export const updateExistingOffset = (offset) => {
  return {
    type: ACTIONS.UPDATE_EXISTING_DATA,
    offset,
  };
};

export const resetFilter = () => {
  return {
    type: ACTIONS.RESET_FILTER,
  };
};

export const filterListingData = (listingData) => {
  return {
    type: ACTIONS.STORE_FILTERED_DATA,
    listingData,
    totalCounts: listingData.length,
  };
};

const fetchArtistDetails = ({ id }) => {
  const url = `${BASE_URL}/${id}?inc=ratings+genres&fmt=json`;
  return new Promise((resolve, reject) => {
    axios(url)
      .then((res) => {
        if (res.data) {
          const { rating, genres } = res.data;
          const genreList = [];
          if (genres) {
            genres.forEach((itm) => {
              genreList.push(itm.name);
            });
          }
          resolve({ id, rating: rating.value, genres: genreList });
        }
      })
      .catch((err) => {
        reject({ id, err }, "err");
      });
  });
};

const getMergedListingData = (artists, artistPromises) => {
  return artists.map((itm) => {
    const { id, name, area } = itm;
    const artistObj =
      artistPromises.find(
        (item) => item.status === "fulfilled" && item.value.id === itm.id
      ) || {};
    const { genres, rating } = artistObj.value;
    const { begin, ended } = itm["life-span"];
    let age = begin ? diffYears(begin, ended) : "unknown";
    return {
      id,
      name,
      area: (area && area.name) || "unknown",
      age,
      genres,
      rating,
    };
  });
};

const searchAPI = async (dispatch, obj) => {
  dispatch(showLoader());
  try {
    const { limit, offset, query, isNext } = obj;
    const data = await axios.get(
      `${BASE_URL}?query=${query}&limit=${limit}&offset=${offset}&?fmt=json`
    );
    if (data.data) {
      const artists = data.data.artists;
      const artistPromises = await Promise.allSettled(
        artists.map(fetchArtistDetails)
      );
      let listingData = getMergedListingData(artists, artistPromises);
      let totalCounts = data.data.count;
      if (isNext) {
        dispatch(receiveNextResults(listingData, offset));
      } else {
        dispatch(receiveQueryResults(listingData, query, totalCounts, limit));
      }
    }
    // trigger parallel calls for genre and ratings
  } catch (error) {
    console.log(error, "error");
  }
};

export const searchByNext = () => (dispatch, getState) => {
  const { filter } = getState();
  let key = "search";
  if (filter.isFilterApplied) {
    key = "filter";
  }
  const { limit, offset, query, listingData } = getState()[key];
  if (listingData.length > offset) {
    dispatch(receiveNextResults([], offset + limit));
  } else {
    searchAPI(dispatch, { limit, offset: offset + limit, query, isNext: true });
  }
};

export const searchByPrevious = () => (dispatch, getState) => {
  const { filter } = getState();
  let key = "search";
  if (filter.isFilterApplied) {
    key = "filter";
  }
  const { offset, limit } = getState()[key];
  dispatch(updateExistingOffset(offset - limit));
};

export const searchByQuery = (query) => async (dispatch, getState) => {
  const { search, filter } = getState();
  if (filter.isFilterApplied) {
    dispatch(resetFilter);
  }
  const {
    search: { limit, offset },
  } = getState();
  if (!query) {
    dispatch(receiveQueryResults([], query, 0, 0));
  } else {
    searchAPI(dispatch, { limit, offset: offset + limit, query });
  }
};

export const getDataByFiltering = (filterObj) => (dispatch, getState) => {
  const {
    search: { listingData },
  } = getState();
  // filtering logic
  const updatedData = listingData.filter((item) => {
    const checkForRating =
      filterObj.ratings.length > 0
        ? filterObj.ratings.includes((item.rating || "").toString())
        : true;
    let checkForGenres = item.genres.length > 0 ? false : true;
    item.genres.forEach((itm) => {
      if (!checkForGenres) {
        checkForGenres =
          filterObj.genres.length > 0 ? filterObj.ratings.includes(itm) : true;
      }
    });
    return checkForRating && checkForGenres;
  });
  dispatch(filterListingData(updatedData));
};
