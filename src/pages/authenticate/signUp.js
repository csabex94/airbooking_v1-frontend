import React from 'react';
import { withRouter } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

import FormField from '../../components/utils/formFields';
import {CustomButton} from '../../components/utils/buttons';

import FirebaseHandler from '../../firebase/firebase.utils';

import LoadingSpinner from '../../components/utils/loadingSpinner';

const SIGN_UP_MUTATION = gql`

    mutation SignUpMutation(
        $email: String!,
        $fullname: String!,
        $fbuid: String!
    ) {
        signUp(
            email: $email,
            fullname: $fullname,
            fbuid: $fbuid
        )
    }

`;


const SignUp = ({ history }) => {

    const [userData, setUserData] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullname: ""
    });
    const [loading, setLoading] = React.useState(false);

    const [signUp] = useMutation(SIGN_UP_MUTATION);


    const handleSignUp = async (event) => {

        event.preventDefault();

        setLoading(true);

        FirebaseHandler.signUpWithEmailAndPassword(userData.email, userData.password).then(user => {

            return user;

        }).then(user => {

            return signUp({ 
                variables: {
                    email: userData.email,
                    fullname: userData.fullname,
                    fbuid: user.user.uid
                } 
            });

        }).then(response => {

            history.push('/signin')

        }).catch(error => {

            setLoading(false);
            
            console.log(`Signup error: ${error.message}`);

            if (error.code === "auth/weak-password") {
                console.log(error.message)
            }

        });

    }

    if (loading) return <LoadingSpinner />

    return (

        <section className="signup">

            <form onSubmit={(event) => handleSignUp(event)}>

                <i className="fas sign-up-icon fa-user-plus" />

                <p className="signup__title">
                    Sign Up
                </p>

                <div className="signup__inputs">
                    <FormField
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        icon="email"
                        handleChange={(inputValue) => setUserData({ ...userData, email: inputValue })}
                        value={userData.email}
                    />

                    <FormField
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        icon="fullname"
                        handleChange={(inputValue) => setUserData({ ...userData, fullname: inputValue })}
                        value={userData.fullname}
                    />

                    <FormField
                        type="password"
                        name="password"
                        placeholder="Password"
                        icon="password"
                        handleChange={(inputValue) => setUserData({ ...userData, password: inputValue })}
                        value={userData.password}
                    />

                    <FormField
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        icon="password"
                        handleChange={(inputValue) => setUserData({ ...userData, confirmPassword: inputValue })}
                        value={userData.confirmPassword}
                    />

                    <CustomButton type="submit" buttonText="Sign Up" handleSubmit={(event) => handleSignUp(event)} />

                    <p className="aha">
                    Already have an account?
                    <Link to="/signin">
                        <span>Sign In now.</span>
                    </Link>
                </p>

                </div>

            </form>

        </section>
    )

}

export default withRouter(SignUp);