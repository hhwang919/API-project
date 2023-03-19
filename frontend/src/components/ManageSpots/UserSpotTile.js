import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import SingleSpot from "../SingleSpot";

const UserSpotTile = ({spot }) => {
    return (
        <>
        {/* // <div className='spot-tile' onClick={onClick}> */}
      <div className="manage-tile">
        <img src={spot.SpotImages} alt={spot.city} />
        <div className="manage-tile-text">
          <h3>{spot.city}, {spot.state}</h3>
          <p>{spot.description}</p>
          <NavLink to={`/spots/${spot.id}/edit`} className="btn">Edit</NavLink>
          <br></br>
          <br></br>
          <NavLink to={`/spots/${spot.id}/edit`} className="btn">Delete</NavLink>
          {/* <button onClick={() => onEdit(spot)}>Edit</button>
          <button onClick={() => onDelete(spot)}>Delete</button> */}
        </div>
        
        {/* <Switch>
          <Route path="/spots/:id" component={{SingleSpot}} />       
        </Switch> */}
      </div>
       
        </>
    )
  }

  export default UserSpotTile;