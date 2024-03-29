import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as spotActions from "../../store/spotReducer";
import './NewSpotForm.css';

function NewSpotFormModal() {
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    

    const handleSubmit = (e) => {
        e.preventDefault();
    
        setErrors([]);
        return dispatch(spotActions.createSpot({ address, city, state, country, lat, lng, name, description, price }))
            .then(closeModal)
            .catch(async (res) => {
        
                const data = await res.json();

                if (data && data.errors) setErrors(Object.values(data.errors));
            });
       
    }

    return (
            <>
            <h1>Create a New Spot</h1>
              <form className="new-spot-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
            </label>
            <label>
            City
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
            />
            </label>
                <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
                </label>
                <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                </label>
                <label>
                Latitude
                <input
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                />
                </label>
                <label>
                Longitute
                <input
                    type="number"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
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
                        required
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
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default NewSpotFormModal;