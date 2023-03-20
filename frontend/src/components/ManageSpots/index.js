import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';

import * as spotActions from "../../store/spotReducer"
import { getUserSpots } from '../../store/spotReducer';

import './ManageSpotTile.css'

import UserSpotTile from './UserSpotTile';


import React from 'react';
import { useHistory } from 'react-router-dom';




const ManageSpots = () => {

    const dispatch = useDispatch();
  
    const history = useHistory();
    const spots = useSelector(state=>state.spotState.userSpots);


  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch]);
  


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