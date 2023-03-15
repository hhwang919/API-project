import {Link, useParams } from "react-router-dom";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import { fetchSpots } from '../../store/spotReducer';


const SingleSpot = ({ spots }) => {
  const { id } = useParams();
  const singleSpot = spots.find((spot) => spot.id === id);

  if (!singleSpot) return null;
  return (
    <div className="singleSpot">
      <h1>{singleSpot.spots}</h1>
      <img src={singleSpot.imageUrl} alt={singleSpot.spot} />
      <p>{singleSpot.body}</p>
    <section>
    <NavLink to='/spots'>Back to All Spots</NavLink>
    </section>
    </div>
  );
};

export default SingleSpot;
