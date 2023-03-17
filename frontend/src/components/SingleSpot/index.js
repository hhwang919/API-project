import React from 'react';
import { useParams } from 'react-router-dom';
import { getSpot } from '../../store/spotReducer';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SingleSpot() {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    // const spots = useSelector(state=>state.spotState.allSpots);
    const spot = useSelector(state=>state.spotState.singleSpot);
    console.log("this is singleSpot:", spot)
    console.log(spot);

//   const spotsArray = Object.values(spots);
//   //console.log(spotsArray)
//   const spot = spotsArray.find(spot => spot.id === +id);
// console.log("This is spotimages,", spot.SpotImages)

// console.log("Spotimages at 0",spot.SpotImages[0])
// console.log("Spotimages at url",spot.SpotImages[0].url)

// const myUrl = spot.SpotImages[0].url
// console.log("my URL:", myUrl)

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
          {/* <div className="container">
          <div className="image-container">
            <img src={spot.SpotImages[1].url} alt={spot.name} />
            <img src={spot.SpotImages[2].url} alt={spot.name} />
            <img src={spot.SpotImages[3].url} alt={spot.name} />
            <img src={spot.SpotImages[4].url} alt={spot.name} />
          </div>
      </div> */}
         {/* <img src={myUrl} alt={spot.name} /> */}
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




