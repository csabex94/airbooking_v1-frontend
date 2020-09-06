import React from 'react';

import DATA from '../utils/popularLocations/dummy.json';

import './style.scss';


const PopularLocations = () => {

    const firstRow = () => {

        const locations = DATA.popular_locations.filter((item, i) => i <= 4 && item);

        return (

            <div className="popular-locations__wrapper-row1">

                {/* column 1 */}
                <div className="popular-locations__wrapper-row1__col1">

                    <div
                        className="popular-locations__wrapper-row1__col1-img"
                        style={{ backgroundImage: `url(${locations[0].image})` }}
                    >

                        <span>{locations[0].location}</span>

                    </div>

                    <div
                        className="popular-locations__wrapper-row1__col1-img"
                        style={{ backgroundImage: `url(${locations[1].image})` }}
                    >

                        <span>{locations[1].location}</span>

                    </div>

                </div>

                {/* column 2 */}
                <div
                    className="popular-locations__wrapper-row1__col2"
                    style={{ backgroundImage: `url(${locations[2].image})` }}
                >
                    <span>{locations[2].location}</span>
                </div>

                {/* column 3 */}
                <div className="popular-locations__wrapper-row1__col3">
                    <div
                        className="popular-locations__wrapper-row1__col3-img"
                        style={{ backgroundImage: `url(${locations[3].image})` }}
                    >
                        <span>{locations[3].location}</span>
                    </div>
                    <div
                        className="popular-locations__wrapper-row1__col3-img"
                        style={{ backgroundImage: `url(${locations[4].image})` }}
                    >
                        <span>{locations[4].location}</span>
                    </div>
                </div>

            </div>

        )

    }

    const secondRow = () => {

        const locations = DATA.popular_locations.filter((item, i) => i > 4 && item)

        return (
            <div className="popular-locations__wrapper-row2">

                <div
                    className="popular-locations__wrapper-row2__img"
                    style={{ backgroundImage: `url(${locations[0].image})` }}
                >
                    <span>{locations[0].location}</span>
                </div>

                <div className="popular-locations__wrapper-row2__center-col">

                    <div
                        className="popular-locations__wrapper-row2__center-col__img"
                        style={{ backgroundImage: `url(${locations[1].image})` }}
                    >
                        <span>{locations[1].location}</span>
                    </div>

                    <div
                        className="popular-locations__wrapper-row1__col1-img"
                        style={{ backgroundImage: `url(${locations[2].image})` }}
                    >
                        <span>{locations[2].location}</span>
                    </div>

                </div>

                <div
                    className="popular-locations__wrapper-row2__img"
                    style={{ backgroundImage: `url(${locations[3].image})` }}
                >
                    <span>{locations[3].location}</span>
                </div>

            </div>
        )

    }

    return (

        <section className="popular-locations">

            <div className="popular-locations__container">

                <p className="popular-locations__title">Popular Locations</p>

                <div className="popular-locations__wrapper">

                    {firstRow()}

                    {secondRow()}

                </div>

            </div>

        </section>

    )

}

export default PopularLocations;