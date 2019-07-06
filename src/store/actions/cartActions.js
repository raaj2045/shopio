export const addToCart = (userId, cartProduct, { firestore }) => {
	return (dispatch, getState) => {
		var cartsRef = firestore.collection("carts").doc(userId);
		console.log("added");
		cartsRef
			.get()
			.then((doc) => {
				if (!doc.exists) {
					console.log("No such document!");
					console.log(cartProduct);
					cartsRef
						.set(
							{
								products: cartProduct
							},
							{ merge: true }
						)
						.then((res) => {
							cartsRef.get().then((doc) => {
								console.log(res);
							});
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log("Document data:", doc.data());
					console.log(cartProduct);
					cartsRef
						.set(
							{
								products: cartProduct
							},
							{ merge: true }
						)
						.then((res) => {
							cartsRef.get().then((doc) => {
								console.log(res);
							});
						})
						.catch((err) => {
							console.log(err);
						});
				}
			})
			.catch((err) => {
				console.log("Error getting document", err);
			});
	};
};

export const deleteItem = (userId, cartProduct, { firestore }) => {
	return (dispatch, getState) => {
		var cartsRef = firestore.collection("carts").doc(userId);

		cartsRef
			.get()
			.then((doc) => {
				if (!doc.exists) {
					console.log("No such document!");
					console.log(cartProduct);
					cartsRef
						.set(
							{
								products: cartProduct
							},
							{ merge: true }
						)
						.then((res) => {
							cartsRef.get().then((doc) => {
								console.log(res);
							});
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log("Document data:", doc.data());
					console.log(cartProduct);
					cartsRef
						.set(
							{
								products: cartProduct
							},
							{ merge: true }
						)
						.then((res) => {
							cartsRef.get().then((doc) => {
								console.log(res);
							});
						})
						.catch((err) => {
							console.log(err);
						});
				}
			})
			.catch((err) => {
				console.log("Error getting document", err);
			});
	};
};

export const placeOrder = (userId, total, { firestore }) => {
	return async (dispatch, getState) => {
		await firestore
			.collection("orders")
			.add({
				total: `${total}₹`,
				userId
			})
			.then(() => {})
			.catch((err) => console.log(err));
		await firestore
			.collection("carts")
			.doc(userId)
			.delete()
			.then(() => {
				console.log("Order placed");
			})
			.catch((err) => console.log(err));
	};
};
