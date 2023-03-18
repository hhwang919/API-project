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
          <NavLink to={`/spots/current`} className="btn">See More</NavLink>
          
        </div>
        
        {/* <Switch>
          <Route path="/spots/:id" component={{SingleSpot}} />       
        </Switch> */}
      </div>
       
        </>
    )
  }

  export default UserSpotTile;