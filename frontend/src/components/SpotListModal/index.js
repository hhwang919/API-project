import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import SingleSpot from '../SingleSpot';
import { fetchSpots } from '../../store/spotReducer';
import { useModal } from "../../context/Modal";
import * as spotActions from "../../store/spotReducer"
// import * as sessionActions from "../../store/session";
import './SpotTile.css';
import Tile from './Tile';

import React from 'react';


const SpotListModal = () => {
    const dispatch = useDispatch();
  
    
    const spots = useSelector(state=>state.spotState.allSpots);


  console.log("spots :", spots)

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);
  
//create own file for Tile component. Nest Tile v

//   const Tile = ({spot}) => {
//     return (
//         <div className='spot-tile'>
//       <div className="tile">
//         <img src={spot.previewImage} alt={spot.city} />
//         <div className="tile-text">
//           <h3>{spot.city}, {spot.state}</h3>
//           <p>{spot.description}</p>
//           <NavLink to={`/spot/${spot.id}`} className="btn">See More</NavLink>
//         </div>
//       </div>
//         </div>
//     )
//   }

  return (
    <div>
        <h1>Spot List</h1>
    <div className='spot-header'>
       <ul>
        {Object.values(spots).map(spot => (
            <Tile key={spot.id} spot={spot} />
            // {/* <NavLink to={`/spot/${spot.id}`}>{spot.city}, {spot.state}</NavLink> */}  
            ))}
            </ul>
          
            </div>
            </div>

          );

}

export default SpotListModal;