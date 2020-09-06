import React from 'react';

import './styles.scss';

const FormField = ({ type, value, handleChange, name, icon, placeholder, label }) => {

    const renderIcon = () => {

        if (icon === 'location') {
            return (
                <i className="fas fa-search-location"></i>
            )
        }

        if (icon === 'calendar') {
            return (
                <i className="far fa-calendar-alt"></i>
            )
        }

        if (icon === 'guests') {
            return (
                <i className="fas fa-users"></i>
            )
        }

        if (icon === 'email') {
            return (
                <i className="fas fa-envelope"></i>
            )
        }

        if (icon === 'password') {
            return (
                <i className="fas fa-unlock-alt"></i>
            )
        }

        if (icon === 'fullname') {
            return (
                <i className="fas fa-user"></i>
            )
        }

    }

    return (
        <div className="form-control">

            {
                label ? <label
                    htmlFor={name}
                    className="form-control__label"
                >
                    {label}
                </label> : null
            }

            { icon ? renderIcon() : null }

            <input
                className="form-control__field"
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={(event) => handleChange(event.target.value)}
            />

        </div>
    )

}

export default FormField;