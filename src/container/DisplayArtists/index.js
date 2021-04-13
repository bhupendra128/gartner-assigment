import React, { useCallback } from "react";
import { connect } from "react-redux";
import { searchByNext, searchByPrevious } from "../../store/actions";
import Rating from "../../presentation/rating";
import { debounce } from "../../utils";
import "./DisplayArtists.scss";

const DisplayArtists = (props) => {
    const { offset, limit, listingData, totalCounts, isLoading } = props;
  const handleNextData = useCallback(debounce(props.searchByNext,1000), []);
  const handlePreviousData = useCallback(() => props.searchByPrevious(), []);

  const renderArtistList = useCallback(() => {
    const page = offset / limit;
    const displayData = listingData.slice(
      limit * (page - 1) - Math.min(offset, totalCounts)
    );
    if (!displayData.length) {
      return <tr>No Data to Display, Please Search again!</tr>;
    }
    return displayData.map((item) => {
      const { name, age, area, rating } = item;
      return (
        <tr>
          <td>{age}</td>
          <td>{name}</td>
          <td>{area}</td>
          <td>{rating ? <Rating data={rating} /> : "unknown"}</td>
        </tr>
      );
    });
  }, [props.listingData, props.offset]);

  const hideNextArrow = offset >= totalCounts;
  const hideBackArrow = offset <= limit;

  return (
    <div className="c-display-artists">
    <div className={`${isLoading ? 'loading': ''}`} />
      <div className="artists">
        <table>
          <tbody>{renderArtistList()}</tbody>
        </table>
      </div>
      <div className="arrows">
        <button onClick={handlePreviousData} className={`previous ${hideBackArrow ? 'hide':''}`} />
        <button onClick={handleNextData} className={`next ${hideNextArrow ? 'hide':''}`} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  if(state.filter.listingData && state.filter.listingData.length){
    return {...state.filter}
  } else return {...state.search}
};

export default connect(
  mapStateToProps,
  { searchByNext, searchByPrevious }
)(DisplayArtists);
