import React from "react";
import { NavLink } from "react-router-dom";

const CreateSpot = () =>{



    return(
        <div>
           <NavLink to={`/spots/new`} className="Create"></NavLink>
           
        </div>
    )

};

export default CreateSpot;