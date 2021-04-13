import React, { useState, useCallback } from "react";
import Checkbox from "../../presentation/checkbox";

const FilterGenre = (props) => {
  const { data } = props;
  const [selectedGenre, setSelectedGenre] = useState([]);

  const handleCheckboxCallback = (id, checked) => {
    let updatedGenre = [...selectedGenre];
    if (!checked) {
      updatedGenre = selectedGenre.filter((itm) => itm !== id);
    } else {
      updatedGenre.push(id);
    }
    setSelectedGenre(updatedGenre);
    props.filterCallback({genres:updatedGenre});
  };

  const renderList = useCallback(() => {
    return data.map((item) => (
      <Checkbox
        label={item}
        id={item}
        checked={selectedGenre.indexOf(item) !== -1}
        handleCheckboxCallback={handleCheckboxCallback}
      />
    ));
  }, [data, selectedGenre]);
  return (
    <div className="c-filter-genre">
      <h3 className="heading">Filter By Genre</h3>
      <div className="filter-list">{renderList()}</div>
    </div>
  );
};

export default FilterGenre;
