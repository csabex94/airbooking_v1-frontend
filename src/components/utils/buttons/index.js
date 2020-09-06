import React from 'react';

import './style.scss';


export const CustomButton = ({ type, buttonText, handleSubmit }) => {

    return (

        <button
            className="custom-button"
            type={type}
            onSubmit={handleSubmit}
        >
            {buttonText}
        </button>

    )

}

export const FacebookButton = ({ handleClick }) => {

    return <button
        type="button"
        className="facebook-button"
        onClick={handleClick}
    >

        <i className="fab fa-facebook-f"></i>

        Sign In with Facebook

    </button>

}