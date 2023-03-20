import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import SingleSpot from '../SingleSpot';
import { fetchSpots } from '../../store/spotReducer';
import { useModal } from "../../context/Modal";
import * as spotActions from "../../store/spotReducer"

import './SpotTile.css';
import Tile from './Tile';

import React from 'react';
import { useHistory } from 'react-router-dom';




const SpotListModal = () => {
    const dispatch = useDispatch();
  
    const history = useHistory();
    const spots = useSelector(state=>state.spotState.allSpots);




  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);
  


const handleClick = (spot) => {
    console.log("User onClick with spotId = ", spot.id)
    history.push(`/spots/${spot.id}`); 
  }

  return (
    <div>
        <h1>Spot List</h1>
    <div className='spot-header'>
       <ul>
        {Object.values(spots).map(spot => (
            <Tile key={spot.id} spot={spot} onClick={()=> handleClick(spot)}/>
              
            ))}
            </ul>
          
            </div>
            </div>

          );

}

export default SpotListModal;