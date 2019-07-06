export const signIn = ({ firebase }, credentials) => {
	return (dispatch, getState) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then((res) => {
				dispatch({ type: "LOGIN_SUCCESS" });
			})
			.catch((err) => {
				dispatch({ type: "LOGIN_ERROR", err });
			});
	};
};

export const signOut = ({ firebase }) => {
	return (dispatch, getState) => {
		firebase.logout().then(() => {
			dispatch({ type: "SIGNOUT_SUCCESS" });
		});
	};
};

export const signUp = (newUser, { firebase, firestore }) => {
	return (dispatch, getState) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((res) => {
				console.log(res.user);
				return firestore
					.collection("users")
					.doc(res.user.uid)
					.set({
						firstName: newUser.firstName,
						lastName: newUser.lastName,
						initials: newUser.firstName[0] + newUser.lastName[0]
					})
					.then((res) => {
						console.log(res);
						dispatch({ type: "SIGNUP_SUCCESS" });
					})
					.catch((err) => {
						dispatch({ type: "SIGNUP_ERROR", err });
					});
			});
	};
};
