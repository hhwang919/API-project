import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import SingleSpot from "./components/SingleSpot";
import SpotListModal from "./components/SpotListModal"
import CreateSpotForm from "./components/CreateSpot/CreateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
//create route for home page.
const spot = []
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={SpotListModal}/> 
            <Route exact path="/spots/new" component={CreateSpotForm} />
          <Route exact path="/spots/:id">
            <SingleSpot spot={spot} />
            </Route> 
          {/* <Route path="/api/spots" component={{SpotListModal}} />  */}
        </Switch>
      )}
    </>
  );
}

export default App;

{/* <SpotListModal /> */}
//build route for Home component

//anything not rendered inside another componennt, should have its own component.