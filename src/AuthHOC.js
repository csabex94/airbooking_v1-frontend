import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuthState } from './AuthProvider';

export default function(ComposedComponent, isPrivate, isAuthPage) {

    const Auth = () => {

        const currentUser = useAuthState();

        if (isAuthPage) {

            if (currentUser) {
                return (<Redirect to="/" />)
            }

        }

        if (isPrivate) {
            
            if (!currentUser) {
                return (<Redirect to="/signin" />)
            }

        }

        return (<ComposedComponent />)

    }

    return Auth;

}