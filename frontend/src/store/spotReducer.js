
//CSRFT FETCH

//REFACTOR Spotreducer

//GET ALL spots working first.
//Get Single spot

import { csrfFetch } from './csrf';

const ALL_SPOTS = 'spot/allSpots';
const ONE_SPOT = 'spot/oneSpot';
const ADD_SPOT = 'spot/addSpot';
const USER_SPOTS = 'spot/userSpots';
// const UPDATE_SPOT = 'spot/updateSpot';
// const DELETE_SPOT = 'spot/deleteSpot';

export const allSpots = (spots) => {
  return {
    type: ALL_SPOTS,
    spots
  };
};

export const oneSpot = (spot) => {
    return {
      type: ONE_SPOT,
      spot
    };
  };

export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot
  };
};

export const userSpots = (uspots) => {
    return {
      type: USER_SPOTS,
      uspots
    };
  };

// export const updateSpot = (spotId) => {   // AI use spot I think should use spotID
//   return {
//     type: UPDATE_SPOT,
//     spotId
//   };
// };

// export const deleteSpot = (spotId) => {
//   return {
//     type: DELETE_SPOT,
//     spotId
//   };
// };

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  //const response = await csrfFetch('/api/spots');
  const spots = await response.json();
  //console.log("spotReducer-spots: ", spots);
  dispatch(allSpots(spots));
};

export const getSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);
    //const response = await csrfFetch('/api/spots');
    const spot = await response.json();
    //console.log("spotReducer-spots: ", spots);
    dispatch(oneSpot(spot));
}

export const getUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    const uspots = await response.json();
    //console.log("spotReducer-spots: ", spots);
    dispatch(userSpots(uspots));
  }
  


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
    console.log("this is data", data)
    dispatch(addSpot(data));
    return data;
  }
};


// export const editSpot = (spotId, payload) => async (dispatch) => {
//   const response = await fetch(`/api/spots/${spotId}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload)
//   });

//   if (response.ok) {
//     const spot = await response.json();
//     dispatch(oneSpot(spotId));
//     return spot;
//   }
// };

// export const removeSpot = (spotId) => async (dispatch) => {
//   const response = await fetch(`/api/spots/${spotId}`, {
//     method: 'DELETE',
//   });

//   if (response.ok) {
//     dispatch(oneSpot(spotId));
//     return true;
//   }
// };
function normalizeSpots(spots) {
    let normalizedSpots = {};
    spots.Spots.forEach((spot) => normalizedSpots[spot.id] = spot);
    return normalizedSpots;
  }

//const initialState = { entries: [], isLoading: true };
const initialState = {allSpots: {}, singleSpot: {}};

const spotReducer = (state = initialState, action) => {
//   console.log("action.type",  action.type);
console.log("this is action:", action)
let newState;
  switch (action.type) {
    case ALL_SPOTS:
        // let normalizedSpots = {};
        // console.log("action Spots:", action.spots)
        // action.spots.Spots.forEach((spot) => normalizedSpots[spot.id] = spot);
        // console.log("normalizedSpots: ", normalizedSpots);
        const normalizedAllSpots = normalizeSpots(action.spots);
        return { ...state, allSpots: normalizedAllSpots };
    case ONE_SPOT:
    //   console.log("action.spot")
      return { ...state, 
        singleSpot: { ...action.spot.spot,
        SpotImages: [ ...action.spot.spot.SpotImages],
        Owner: { ...action.spot.spot.Owner}}};
        case ADD_SPOT:
            newState = {...state}
            newState[action.spot.id] = action.spot
            console.log("this is the newState:", newState)
            return newState;
        case USER_SPOTS:
            const normalizedUserSpots = normalizeSpots(action.uspots);
            return { ...state, allSpots: normalizedUserSpots }; 
    default:
      return state;
  }
};

export default spotReducer;