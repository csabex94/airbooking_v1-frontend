import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}




class FirebaseHandler {

    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth;
    }

    signInWithEmailAndPassword = (email, password) => {

        return new Promise(async (resolve, reject) => {

            try {

                const user = await this.auth().signInWithEmailAndPassword(email, password);
                const access_token = await user.user.getIdToken();
                const refresh_token = user.user.refreshToken;

                localStorage.setItem('ab_auth', access_token);
                localStorage.setItem('ab_auth_refresh', refresh_token);

                return resolve(user);

            } catch (error) {

                return reject(error);

            }

        });

    }

    signInWithFacebook = () => {

        return new Promise(async (resolve, reject) => {

            try {

                const provider = new this.auth.FacebookAuthProvider();
                provider.addScope('user_birthday');
                provider.setCustomParameters({
                    'display': 'popup'
                });

                const user = await this.auth().signInWithPopup(provider);
                const access_token = await user.user.getIdToken();
                const refresh_token = user.user.refreshToken;

                localStorage.setItem('ab_auth', access_token);
                localStorage.setItem('ab_auth_refresh', refresh_token);

                return resolve(user);


            } catch (error) {

                return reject(error);

            }

        });

    }

    signUpWithEmailAndPassword = (email, password) => {

        return new Promise(async (resolve, reject) => {

            try {

                const user = await this.auth().createUserWithEmailAndPassword(email, password);


                return resolve(user);

            } catch (error) {

                return reject(error);

            }

        });

    }

    signOut = async () => {

        return new Promise(async (resolve, reject) => {

            try {

                await this.auth().signOut();
                localStorage.removeItem('ab_auth');
                localStorage.removeItem('ab_auth_refresh');

                return resolve(true);

            } catch (error) {

                return reject(error);

            }

        });

    }

}

export default new FirebaseHandler()