
//CSRFT FETCH

//REFACTOR Spotreducer

//GET ALL spots working first.
//Get Single spot

import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spot/loadSpots';
const ADD_SPOT = 'spot/addSpot';
const UPDATE_SPOT = 'spot/updateSpot';
const DELETE_SPOT = 'spot/deleteSpot';

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  };
};

export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot
  };
};

export const updateSpot = (spotId) => {   // AI use spot I think should use spotID
  return {
    type: UPDATE_SPOT,
    spotId
  };
};

export const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  };
};

export const fetchSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots');
  //const response = await csrfFetch('/api/spots');
  const spots = await response.json();
  //console.log("spotReducer-spots: ", spots);
  dispatch(loadSpots(spots));
};

export const createSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        address, city, state, country, lat, lng, name, description, price
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addSpot(data.spot));
    return response;
  }
};


export const editSpot = (spotId, payload) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(updateSpot(spotId));
    return spot;
  }
};

export const removeSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteSpot(spotId));
    return true;
  }
};

//const initialState = { entries: [], isLoading: true };
const initialState = {allSpots: {}, singleSpot: {}};

const spotReducer = (state = initialState, action) => {
    //console.log("action.type",  action.type)
  switch (action.type) {
    case LOAD_SPOTS:
        let normalizedSpots = {};
        action.spots.Spots.forEach((spot) => normalizedSpots[spot.id] = spot);
        // console.log("normalizedSpots: ", normalizedSpots);
        return { ...state, allSpots: normalizedSpots }; 

        //return { ...state, entries: [...action.spots.Spots] }; 
    case ADD_SPOT:
      return { ...state, allSpots: [...state.allSpots, action.spot] };
    case UPDATE_SPOT:
      return {
        ...state,
        entries: state.entries.map((spot) => {
          if (spot.id === action.spot.id) {
            return action.spot;
          } else {
            return spot;
          }
        })
      };
    case DELETE_SPOT:
      return {
        ...state,
        entries: state.entries.filter((spot) => spot.id !== action.spotId)
      };
    default:
      return state;
  }
};

export default spotReducer;