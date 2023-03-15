import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import SingleSpot from '../SingleSpot';
import { fetchSpots } from '../../store/spotReducer';
import { useModal } from "../../context/Modal";
import * as spotActions from "../../store/spotReducer"
// import * as sessionActions from "../../store/session";


import React from 'react';


const SpotListModal = () => {
    const dispatch = useDispatch();
  
    
    const spots = useSelector(state=>state.spotState.entries);


  console.log("spots :", spots)

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);
  return (
    <div>
      <h1>Spot List</h1>
      <ol>
        {Object.values(spots).map(spot => (
          <li key={spot.id}>
            <NavLink to={`/spot/${spot.id}`}>{spot.city}, {spot.state}</NavLink>
          </li>
        ))}
      </ol>

      {/*<Switch>
        <Route path='/spot/:id'>
          <SingleSpot spots={spots.id} />
        </Route>
        </Switch>*/}
    </div>
  );
}

export default SpotListModal;