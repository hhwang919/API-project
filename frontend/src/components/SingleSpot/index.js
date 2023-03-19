import React from 'react';
import { useParams } from 'react-router-dom';
import { getSpot } from '../../store/spotReducer';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SingleSpot() {
    console.log("this is singleSpot",)
    const { id } = useParams();
    const dispatch = useDispatch();
    
    // const spots = useSelector(state=>state.spotState.allSpots);
    const spot = useSelector(state=>state.spotState.singleSpot);

  useEffect(() => {
    dispatch(getSpot(id));
  }, [dispatch], id);
  

  return (
    // <div>Hello</div>
    
    <div className="spot-tile" onClick={() => spot.onClick(id)}>
          {/* <span className="spot-state" >{spot.SpotImages[0].url}</span> */}
      <div className="spot-info">
          {/* <span className="spot-state" src={spot.Spotimages.url}>{spot.SpotImages.url}</span> */}
          {spot.SpotImages && <img src={spot.SpotImages[0].url} alt={spot.name} />}
        <div className="spot-location">
            {/* <div>{spot.SpotImages[0].url}</div> */}
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




