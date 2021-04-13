import React, { useState, useCallback } from "react";
import { searchByQuery } from "../../store/actions";
import { connect } from "react-redux";
import "./Search.scss";
import { debounce } from "../../utils";

const Search = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    searchAPI(value);
  };

  const searchAPI = useCallback(
    debounce((value) => props.searchByQuery(value, true), 1000),
    []
  );

  return (
    <div className="c-search">
      <label for={"search-box"}>Search By Artist Name</label>
      <input
        type="text"
        value={searchQuery}
        onChange={handleOnChange}
        id="search-box"
      />
    </div>
  );
};

export default connect(
  null,
  { searchByQuery }
)(Search);
