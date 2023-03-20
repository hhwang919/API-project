
import { csrfFetch } from './csrf';

const ALL_SPOTS = 'spot/allSpots';
const ONE_SPOT = 'spot/oneSpot';
const ADD_SPOT = 'spot/addSpot';
const USER_SPOTS = 'spot/userSpots';
const EDIT_SPOTS = 'spot/editSpot';
const DELETE_SPOTS = 'spot/deleteSpot';

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

  export const editASpot = (spot) => {
    return {
      type: EDIT_SPOTS,
      spot
    };
  };


export const removeSpot = (spotId) => {
  return {
    type: DELETE_SPOTS,
    spotId
  };
};

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const spots = await response.json();
  dispatch(allSpots(spots));
};
export const getUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    const uspots = await response.json();
    dispatch(userSpots(uspots));
  }

export const getSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);
    const spot = await response.json();
    dispatch(oneSpot(spot));
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



export const editSpot = (id , spot) => async (dispatch) => {
    console.log("this is id:", id)
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        address, city, state, country, lat, lng, name, description, price
    })
  });

  if (response.ok) {
    const data = await response.json();
    console.log("this is data", data)
    dispatch(editASpot(data));
    return data;
  }
};



export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(removeSpot(spotId));
    return true;
  }
};


function normalizeSpots(spots) {
    let normalizedSpots = {};
    spots.Spots.forEach((spot) => normalizedSpots[spot.id] = spot);
    return normalizedSpots;
  }


const initialState = {allSpots: {}, singleSpot: {}, userSpots: {}};

const spotReducer = (state = initialState, action) => {
let newState;
  switch (action.type) {
    case ALL_SPOTS:
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
            return { ...state, userSpots: normalizedUserSpots }; 
            case EDIT_SPOTS:
                newState = {...state}
                newState[action.spot.id] = action.spot
                return newState;
                case DELETE_SPOTS:
                    newState = {...state}
                    delete newState[action.spotId]
                    return newState;
    default:
      return state;
  }
};

export default spotReducer;