import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        <span>
          <FontAwesomeIcon
            icon={value >= 1 ? faStar : value >= 0.5 ? faStarHalfAlt : farStar}
          />
        </span>
        <span>
          <FontAwesomeIcon
            icon={value >= 2 ? faStar : value >= 1.5 ? faStarHalfAlt : farStar}
          />
        </span>
        <span>
          <FontAwesomeIcon
            icon={value >= 3 ? faStar : value >= 2.5 ? faStarHalfAlt : farStar}
          />
        </span>
        <span>
          <FontAwesomeIcon
            icon={value >= 4 ? faStar : value >= 3.5 ? faStarHalfAlt : farStar}
          />
        </span>
        <span>
          <FontAwesomeIcon
            icon={value >= 5 ? faStar : value >= 4.5 ? faStarHalfAlt : farStar}
          />
        </span>
      </div>
      {text && <span className="ml-2">{text}</span>}
    </div>
  );
};

export default Rating;