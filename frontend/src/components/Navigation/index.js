import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import SpotListModal from '../SpotListModal';
import SingleSpot from '../SingleSpot';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
        {/* <OpenModalButton
          buttonText="List All Spots"
          modalComponent={<SpotListModal />}
        /> */}
      </li>
    );
  }

  return (
   
    <div>
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
    <div>
      {/* <SpotListModal /> */}

    </div>

     {/* <div className='tile'>
    <SpotListModal />
    </div> */}
    </div>
  );
}

export default Navigation;