import React from 'react';

import './style.scss';

const CARDS = [
    {
        id: 1,
        title: "River Laune in Main st Killorglin",
        category: "Apartment",
        city: "Killorglin, County Kerry, IE",
        image: "https://images.pexels.com/photos/3495056/pexels-photo-3495056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        dailyRate: 50
    },
    {
        id: 2,
        title: 'Nice house in France',
        city: 'Toulouse',
        category: 'Guest Room',
        image: "https://images.pexels.com/photos/1772198/pexels-photo-1772198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        dailyRate: 32
    },
    {
        id: 3,
        title: "House for rent USA, California",
        category: 'House',
        city: 'Miami',
        image: "https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        dailyRate: 95
    },
    {
        id: 4,
        title: "Stunning viewing APT with happy spend time",
        city: 'Toronto',
        category: 'Private Room',
        image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        dailyRate: 113
    }
]

const JfWeekend = () => {

    return (

        <section className="jf-weekend">

            <div className="jf-weekend__container">

                <p className="jf-weekend__title">Just for the weekend.</p>

                <div className="jf-weekend__cards">

                    {
                        CARDS.map((item) => {

                            return (
                                <div key={item.id} className="jf-weekend__cards-card">

                                    <div
                                        className="jf-weekend__cards-card__picture"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    />

                                    <span className="jf-weekend__cards-card__category">
                                        {item.category}
                                    </span>

                                    <span className="jf-weekend__cards-card__title">
                                        {item.title}
                                    </span>

                                    <span className="jf-weekend__cards-card__price">
                                        {item.dailyRate}$ Per Night
                                    </span>

                                    <div className="jf-weekend__cards-card__rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>

                                        <span className="jf-weekend__cards-card__rating-reviews">3 Reviews</span>

                                    </div>

                                </div>
                            )

                        })
                    }

                </div>

                <div className="jf-weekend__see-all">
                    See All <i className="fas fa-angle-right"></i>
                </div>

            </div>

        </section>

    )
}

export default JfWeekend;