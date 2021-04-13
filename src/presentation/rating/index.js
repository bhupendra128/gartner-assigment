import React from "react";
import { StarIcon, HalfStarIcon } from "../../assets/image";
import './rating.scss';

/**
 * Rating Component that will create Rating
 * @param  {object} having all required attributes such as  data, className
 */

const Rating = ({ data, className }) => {
  const renderRatingStars = () => {
    let eleStarArr = [];
      const checkForHalfStar = data % 1 !== 0;
      const updatedValue = checkForHalfStar ? Math.floor(data) + 1 : data;
      for (let i = 0; i < updatedValue; i++) {
        if (checkForHalfStar && i + 1 === updatedValue) {
          eleStarArr.push(
            <div className="half-star-wrapper">
              <StarIcon className="star" />
              <HalfStarIcon className="half-star" />
            </div>
          );
        } else {
          eleStarArr.push(<StarIcon className="star" />);
        }
      }
    return eleStarArr;
  };

  return (
    <div className={`rating ${className || ""}`}>
      {renderRatingStars()}
    </div>
  );
};

export default Rating;
