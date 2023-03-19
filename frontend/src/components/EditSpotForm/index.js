import React from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as spotState from "../../store/spotReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editSpot } from "../../store/spotReducer";

const EditSpotForm = ( spot  ) =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams();
    // console.log("THis is usePARAMS ID", id)

    const [address, setAddress] = useState(spot.id);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");


    const handleSubmit = async (e) =>{
        e.preventDefault();
       spot = {...spot, address, city, state, country, lat, lng, name, description, price }
        console.log("This is current spot:",spot)
    //    const newSpot = await dispatch(spotState.createSpot(spot))
    console.log("this is id", id)
    const newSpot = await dispatch(editSpot(id,spot))
    // const parseSpot = newSpot.JSON()
       console.log("this is the newSpot:", newSpot)
   
        history.push(`/spots/${newSpot.id}`)
    }


    return(
        <>
        <h1> Edit a new Spot</h1>
        <form onSubmit={handleSubmit} >
        <label> 
        Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
            </label>
            <label>
            City
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
        </label>
        <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                </label>
        <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                </label>
                <label>
                Latitude
                <input
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
                </label>
                <label>
                Longitute
                <input
                    type="number"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
                </label>
                <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </label>
                <label>
               Description
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </label>
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
        <br>
        </br>
        {/* <CreateSpot spot={spot} formType="Create Spot" /> */}
        <input type="submit" value={"Create Spot"}/>
        </form>
        </>
    )

};

export default EditSpotForm;