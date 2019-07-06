import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import "firebase/auth";
import "firebase/firestore";
const store = createStore(
	rootReducer,

	applyMiddleware(thunk)
);

const fbConfig = {
	apiKey: "AIzaSyAFh578HWfqhMTJxHtOMnkdZ0fUFW1kBYY",
	authDomain: "shopio-426d9.firebaseapp.com",
	databaseURL: "https://shopio-426d9.firebaseio.com",
	projectId: "shopio-426d9",
	storageBucket: "shopio-426d9.appspot.com",
	messagingSenderId: "617527684587",
	appId: "1:617527684587:web:f46e99cca75b41b2"
};

// react-redux-firebase config
const rrfConfig = {
	userProfile: "users",
	useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
	attachAuthIsReady: true
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance
};

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<App />
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
