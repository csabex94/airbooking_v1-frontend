import React, { createContext, useContext, useReducer } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import SignIn from './pages/authenticate/signin';
import SignUp from './pages/authenticate/signUp';

import LandingPage from './pages/landing-page';
import Rentals from './pages/rentals';
import Navbar from './components/navbar/navbar';

import LoadingSpinner from './components/utils/loadingSpinner';

import Auth from './AuthHOC';


const AuthStateContext = createContext({});
const AuthDispatchContext = createContext({});
const AuthStateRefetch = createContext({});

export const ACTIONS = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
}

export const USER_QUERY = gql`
    {
        userProfile {
            id
            fullname
            email
            profilePicture
            newAccessToken
            newRefreshToken
        }
    }
`;


const reducer = (state, action) => {

    switch (action.type) {

        case ACTIONS.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }



        default:
            return state;

    }

}

const INITIAL_STATE = {
    currentUser: null
}

export const AuthProvider = () => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { error, loading, refetch } = useQuery(USER_QUERY, {
        onCompleted: (data) => {

            if (data.userProfile) {
                const { newAccessToken, newRefreshToken, id, email, fullname, profilePicture } = data.userProfile;

                if (newAccessToken && newRefreshToken) {
                    localStorage.setItem('ab_auth', newAccessToken);
                    localStorage.setItem('ab_auth_refresh', newRefreshToken);
                }

                dispatch({
                    type: ACTIONS.SET_CURRENT_USER,
                    payload: { id, email, fullname, profilePicture }
                });
            }

        },
        
    });

    if (error) {
        console.log(error);
    }

    if (loading) return <LoadingSpinner />

    return (

        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state.currentUser}>
                <AuthStateRefetch.Provider value={refetch}>

                    <BrowserRouter>

                        <Navbar />

                        <Switch>
                            <Route exact path="/" component={LandingPage} />

                            <Route exact path="/signin" component={Auth(SignIn, false, true)} />

                            <Route exact path="/signup" component={Auth(SignUp, false, true)} />

                            <Route exact path="/rentals" component={Auth(Rentals, false, false)} />
                        </Switch>


                    </BrowserRouter>

                </AuthStateRefetch.Provider>
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>

    )

}

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
export const useAuthStateRefetch = () => useContext(AuthStateRefetch);


