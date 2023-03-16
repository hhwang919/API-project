import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import SingleSpot from "../SingleSpot";

const SingleSpotTile = ({spot}) => {
    return (
        <div className='spot-tile'>
      <div className="tile">
        <img src={spot.previewImage} alt={spot.city} />
        <div className="tile-text">
          <h3>{spot.city}, {spot.state}</h3>
          <p>{spot.description}</p>
          <NavLink to={`/spots/${spot.id}`} className="btn">See More</NavLink>
          
        </div>
        
        {/* <Switch>
          <Route path="/spots/:id" component={{SingleSpot}} />       
        </Switch> */}
      </div>
        </div>
    )
  }

  export default Tile;