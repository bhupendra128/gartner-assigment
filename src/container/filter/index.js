import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import FilterGenre from "../../presentation/filter-genre";
import FilterRating from "../../presentation/filter-rating";
import {
  searchByNext,
  searchByPrevious,
  getDataByFiltering,
} from "../../store/actions";
import "./filter.scss";

const Filter = (props) => {
  const { listingData, getDataByFiltering } = props;
  const [filterCheckboxes, setFilterCheckboxes] = useState({
    genres: [],
    ratings: [],
  });
  const filterObj = useMemo(() => {
    let arr = [];
    let ratings = [];
    listingData.forEach((ele) => {
      if (ele && ele.genres && ele.genres.length) {
        arr = [...ele.genres];
      }
      if (ele && ele.rating) {
        ratings = [...ratings, ele.rating];
      }
    });
    return { genresArr: [...new Set(arr)], ratingArr: [...new Set(ratings)] };
  }, [listingData]);
  const handleFilterCheckbox = (obj) => {
    const newObj = {
      genres: obj.genres || filterCheckboxes.genres,
      ratings: obj.ratings || filterCheckboxes.ratings,
    };
    setFilterCheckboxes(newObj);
    getDataByFiltering(newObj);
  };
  return (
    <div className="c-filter">
      <FilterGenre
        data={filterObj.genresArr}
        filterCallback={handleFilterCheckbox}
      />
      <FilterRating
        data={filterObj.ratingArr}
        filterCallback={handleFilterCheckbox}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state.search };
};

export default connect(
  mapStateToProps,
  { getDataByFiltering, searchByNext, searchByPrevious }
)(Filter);
