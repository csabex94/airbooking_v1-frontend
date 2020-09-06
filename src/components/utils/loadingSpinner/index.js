import React from 'react';

import './style.scss';

const LoadingSpinner = () => {

    return (

        <div className="loading-wrapper">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>

    )

}

export default LoadingSpinner;