
//CSRFT FETCH

//REFACTOR Spotreducer

//GET ALL spots working first.
//Get Single spot

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

export const updateSpot = (spotId) => {
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
  const spots = await response.json();
  console.log("fetch spots", spots)
  dispatch(loadSpots(spots));
};

export const createSpot = (payload) => async (dispatch) => {
  const response = await fetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(addSpot(spot));
    return spot;
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
    dispatch(updateSpot(spot));
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

const initialState = { entries: [], isLoading: true };
const spotReducer = (state = initialState, action) => {
    console.log("action type:", action.type)
    switch (action.type) {
      case LOAD_SPOTS:
        let normalizedSpots = {};
        action.spots.Spots.forEach((spot) => normalizedSpots[spot.id] = spot);
        // console.log("normalizedSpots: ", normalizedSpots);
        return { ...state, entries: {...normalizedSpots} }; 

    //    return  { ...state, entries: [ ...action.spots.Spots ] };
     
    case ADD_SPOT:
      return { ...state, entries: [...state.entries, action.spot] };
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
