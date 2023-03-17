// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Route, Switch, NavLink } from 'react-router-dom';
// import SingleSpot from '../SingleSpot';
// import { fetchSpots } from '../../store/spotReducer';
// import { useModal } from "../../context/Modal";
// import * as spotActions from "../../store/spotReducer"
// // import * as sessionActions from "../../store/session";
// // import './ManageSpotTile.css'
// // import Tile from './Tile';
// import UserSpotTile from './UserSpotTile';

// import React from 'react';
// import { useHistory } from 'react-router-dom';
// // import { use } from '../../../../backend/routes/api/bookings';



// const ManageSpots = () => {
//     const dispatch = useDispatch();
  
//     const history = useHistory();
//     const spots = useSelector(state=>state.spotState.userSpots);


// //   console.log("spots :", spots)

//   useEffect(() => {
//     dispatch(spotActions.getUserSpots());
//   }, [dispatch]);
  


// const handleClick = (spot) => {
//     console.log("User onClick with spotId = ", spot.id)
//     history.push(`/spots/${spot.id}`); // Redirect to Singlespot component with the corresponding spot id
//   }

//   return (
//     <div>
//         <h1>Spot List</h1>
//     <div className='spot-header'>
//        <ul>
//         {Object.values(spots).map(spot => (
//             // <UserSpotTile key={spot.id} spot={spot} onClick={()=> handleClick(spot)}/>
//             // {/* <NavLink to={`/spot/${spot.id}`}>{spot.city}, {spot.state}</NavLink> */}  
//             ))}
//             </ul>
          
//             </div>
//             </div>

//           );

// }

// export default ManageSpots;