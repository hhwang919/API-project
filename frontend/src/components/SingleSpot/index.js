import React from 'react';
import { useParams } from 'react-router-dom';

function SingleSpot({ spots }) {
  const { id } = useParams();

  const spotsArray = Object.values(spots);
  //console.log(spotsArray)
  const spot = spotsArray.find(spot => spot.id === +id);
  console.log(spot);

  return (
    <div className="spot-tile" onClick={() => spots.onClick(id)}>
      <div className="spot-info">
        <div className="spot-location">
          <span className="spot-city">{spot.city}</span>
          <span className="spot-state">{spot.state}</span>
        </div>
        <div className="spot-name" title={spot.name}>{spot.name}</div>
        <div className="spot-rating">{spot.avgRating ? `${spot.avgRating.toFixed(1)} stars` : 'New'}</div>
        <div className="spot-price">{`$${spot.price} per night`}</div>
      </div>
    </div>
  );
}

export default SingleSpot;