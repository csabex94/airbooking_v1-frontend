import React from 'react';

import FormField from '../utils/formFields';
import {CustomButton} from '../utils/buttons';

import './style.scss';

const ACTIONS = {
    CHANGE_LOCATION: 'CHANGE_LOCATION',
    CHANGE_DATES: 'CHANGE_DATES',
    CHANGE_GUESTS: 'CHANGE_GUESTS'
}

const reducer = (state, action) => {

    switch (action.type) {

        case ACTIONS.CHANGE_LOCATION:
            return {
                ...state,
                location: action.payload
            }

        case ACTIONS.CHANGE_DATES:
            return {
                ...state,
                dates: action.payload
            }

        case ACTIONS.CHANGE_GUESTS:
            return {
                ...state,
                guests: action.payload
            }

        default:
            return state;

    }

}

const INITIAL_STATE = {
    location: "",
    dates: {
        checkin: "",
        checkout: ""
    },
    guests: 0
}

const Header = () => {

    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

    return (

        <section
            className="header"
            style={{ backgroundImage: `url(${require('../utils/header/header-background.jpg')})` }}
        >

            <div className="header-container">

                <form 
                    className="header-search"
                    autoComplete="off"    
                >

                    <p className="header-search__title">Thousands of places around the world.</p>

                    <FormField
                        type="text"
                        name="location"
                        icon="location"
                        value={state.location}
                        handleChange={(inputValue) => dispatch({ type: ACTIONS.CHANGE_LOCATION, payload: inputValue })}
                        label="Location"
                        placeholder="Try 'Milano'"
                    />

                    <div className="header-search__datefields">

                        <FormField
                            type="text"
                            name="checkin"
                            icon="calendar"
                            placeholder="Check in"
                            label="When"
                        />

                        <FormField
                            type="text"
                            name="checkout"
                            icon="calendar"
                            placeholder="Check out"
                        />

                    </div>

                    <FormField
                        type="number"
                        name="guests"
                        icon="guests"
                        placeholder="2 - Guests"
                        label="Guest"
                    />

                    <CustomButton 
                        type="button" 
                        buttonText="Search"    
                    />

                </form>

            </div>

        </section>

    )

}


export default Header;