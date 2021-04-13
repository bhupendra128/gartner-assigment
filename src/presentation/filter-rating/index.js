import React, { useState, useCallback } from "react";
import Checkbox from "../../presentation/checkbox";
import Rating from "../rating";

const FilterRating = (props) => {
  const { data } = props;
  const [selectedRating, setSelectedRating] = useState([]);

  const handleCheckboxCallback = (id, checked) => {
    let updatedRating = [...selectedRating];
    if (!checked) {
      updatedRating = selectedRating.filter((itm) => itm !== id);
    } else {
      updatedRating.push(id);
    }
    setSelectedRating(updatedRating);
    props.filterCallback({ratings:updatedRating});
  };

  const renderList = useCallback(() => {
    return data.map((item) => (
      <div className="checkbox-rating">
        <Checkbox
          label={item}
          id={item}
          checked={selectedRating.indexOf(item.toString()) !== -1}
          handleCheckboxCallback={handleCheckboxCallback}
        />
        <Rating data={item} />
      </div>
    ));
  }, [data, selectedRating]);
  return (
    <div className="c-filter-rating">
      <h3 className="heading">Filter By Rating</h3>
      <div className="filter-list">{renderList()}</div>
    </div>
  );
};

export default FilterRating;
