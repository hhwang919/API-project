import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { deleteSpot, getUserSpots } from "../../store/spotReducer";
import SingleSpot from "../SingleSpot";


const UserSpotTile = ({spot }) => {
    
    const dispatch = useDispatch();
        const history = useHistory();
       const handleDelete = async (e) => {
            e.preventDefault();
            console.log("this is spot.id", spot.id)
            await dispatch(deleteSpot(spot.id))
            await dispatch(getUserSpots())
            history.push(`/spots/current`)
          };


    return (
        <>
  
      <div className="manage-tile">
        <img src={spot.SpotImages} alt={spot.city} />
        <div className="manage-tile-text">
          <h3>{spot.city}, {spot.state}</h3>
          <p>{spot.description}</p>
          <NavLink to={`/spots/${spot.id}/edit`} className="btn">Edit</NavLink>
          <br></br>
          <br></br>
          <button onClick={handleDelete} className="btn">Delete</button>
        </div>
      </div>
       
        </>
    )
  }

  export default UserSpotTile;