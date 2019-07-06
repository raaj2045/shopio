const initState = {};

const cartProductsReducer = (state = initState, action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			return {
				...state,
				data: action.payload
			};

		default:
			return state;
	}
};

export default cartProductsReducer;
