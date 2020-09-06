import React from 'react';

import Header from '../../components/header/header';
import JwWeekend from '../../components/jfweekend';
import PopularLocations from '../../components/popularLocations';

import './style.scss';


const LandingPage = () => {

    return (

        <main className="landing-page">

            <Header />

            <JwWeekend />

            <PopularLocations />
            
        </main>

    )

}

export default LandingPage;