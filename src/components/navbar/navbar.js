import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ClickAwayListener from 'react-click-away-listener';

import { useAuthState, useAuthDispatch, ACTIONS } from '../../AuthProvider';
import FirebaseHandler from '../../firebase/firebase.utils';


import { ReactComponent as Logo } from '../utils/logo/airbooking.svg';
import './style.scss';



const Navbar = () => {

    const [dropDown, toggleDropDown] = React.useState(false);

    const currentUser = useAuthState();
    const dispatch = useAuthDispatch();

    const handleSignOut = async () => {

        await FirebaseHandler.signOut()

        dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: null });
        toggleDropDown(false);

    }

    return (

        <div className="ab_navbar">

            <div className="ab_navbar-container">

                <Link
                    to="/" className={`ab_navbar-brand`}
                >
                    <Logo className="ab_navbar-logo" />
                    airb<span>oo</span>king
                </Link>


                {
                    dropDown && currentUser ?

                        <ClickAwayListener onClickAway={() => toggleDropDown(false)}>
                            <div
                                className="dropDown"
                            >
                                {
                                    currentUser.profilePicture ?
                                        <span 
                                            className="dropDown__profilePicture" 
                                            style={{ backgroundImage: `url(${currentUser.profilePicture})` }}    
                                        />
                                        :
                                        <span className="dropDown__avatar">
                                            <i className="fas fa-user-circle"></i>
                                        </span>
                                }

                                <span className="dropDown__username">{currentUser && currentUser.fullname}</span>

                                <span>Dashboard</span>
                                <span onClick={handleSignOut}>Sign Out</span>

                            </div>
                        </ClickAwayListener>

                        : null
                }


                <ul className={`ab_navbar-links`}>
                    <Link
                        to="/rentals"
                    >
                        <li>
                            Rentals
                        </li>
                    </Link>

                    {
                        !currentUser &&
                        <Link
                            to="/signin"
                        >
                            <li>
                                Sign In
                            </li>
                        </Link>
                    }


                    {
                        currentUser &&
                        <li onClick={() => toggleDropDown(!dropDown)}>

                            {
                                currentUser.profilePicture.trim() !== "" ?

                                    <>
                                        <span
                                            className="profilePicture"
                                            style={{ backgroundImage: `url(${currentUser.profilePicture})` }}
                                        />

                                        <i className="fas fa-sort-down"></i>
                                    </>
                                    :
                                    <>
                                        <i className="fas fa-user-circle no-user-circle"></i>

                                        <i className="fas fa-sort-down"></i>
                                    </>

                            }

                        </li>
                    }

                </ul>

            </div>

        </div>

    )

}

export default withRouter(Navbar);