import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
// import SingleSpot from '../SingleSpot';
// import { fetchSpots } from '../../store/spotReducer';
// import { useModal } from "../../context/Modal";
import * as spotActions from "../../store/spotReducer"
import { getUserSpots } from '../../store/spotReducer';
// import * as sessionActions from "../../store/session";
import './ManageSpotTile.css'
// import Tile from './Tile';
import UserSpotTile from './UserSpotTile';
// import './ManageSpotTile.css'

import React from 'react';
import { useHistory } from 'react-router-dom';
// import { use } from '../../../../backend/routes/api/bookings';



const ManageSpots = () => {

    const dispatch = useDispatch();
  
    const history = useHistory();
    const spots = useSelector(state=>state.spotState.userSpots);

console.log("this is manage User:", spots)
//   console.log("spots :", spots)

  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch]);
  


// const handleClick = (spot) => {
//     console.log("User onClick with spotId = ", spot.id)
//     history.push(`/spots/current`); // Redirect to Singlespot component with the corresponding spot id
//   }

  return (
      <div>
         <h1>Your Spots</h1>
            <div className='manage-spot-header'>   
                <ul>
            {Object.values(spots).map(spot => (
                 
            <UserSpotTile spot={spot}/>
                   
            ))}
                </ul>
            </div>
     </div>
          );

}

export default ManageSpots;