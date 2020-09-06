import React from 'react';
import { Link } from 'react-router-dom';

import FormField from '../../components/utils/formFields';
import { CustomButton, FacebookButton } from '../../components/utils/buttons';
import LoadingSpinner from '../../components/utils/loadingSpinner';


import FirebaseHandler from '../../firebase/firebase.utils';
import { useAuthStateRefetch, useAuthDispatch, ACTIONS } from '../../AuthProvider';

import './style.scss';



const SignIn = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const dispatch = useAuthDispatch()
    const refetch = useAuthStateRefetch()
    

    // Email and Password signin
    const handleSignIn = (event) => {

        event.preventDefault();

        setLoading(true);

        FirebaseHandler.signInWithEmailAndPassword(email, password).then(fbUser => {

            return fbUser;

        }).then(() => {

            return refetch();

        }).then(response => {

            dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: response.data.userProfile })

        }).catch(error => {

            console.log(`signin error: ${error}`);
            setLoading(false);

        });

    }

    // Facebook signin
    const handleFacebookSignIn = () => {

        setLoading(true);

        FirebaseHandler.signInWithFacebook().then((fbUser) => {

            return fbUser;

        }).then(() => {

            return refetch()

        }).then(response => {
           
            dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: response.data.userProfile });

        }).catch(error => {

            console.log(`Signin error: ${error}`);
            setLoading(false);

        })

    }

    if (loading) return <LoadingSpinner />;


    return (

        <section className="signin">

            <form className="signin__form" onSubmit={(event) => handleSignIn(event)} autoComplete="on">

                <i className="fas fa-user signin__form-icon"></i>

                <p className="signin__form-title">
                    Sign In
                </p>

                <div className="signin__form-inputs">
                    <FormField
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        icon="email"
                        handleChange={(inputValue) => setEmail(inputValue)}
                        value={email}
                    />

                    <FormField
                        type="password"
                        name="password"
                        placeholder="Password"
                        icon="password"
                        handleChange={(inputValue) => setPassword(inputValue)}
                        value={password}
                    />
                </div>

                <CustomButton type="submit" buttonText="Sign In" handleSubmit={(event) => handleSignIn(event)} />

                <FacebookButton handleClick={handleFacebookSignIn} />

                <p className="dha">
                    Don't have an account?
                    <Link to="/signup">
                        <span>Sign Up now.</span>
                    </Link>
                </p>

            </form>

        </section>

    )

}

export default SignIn;