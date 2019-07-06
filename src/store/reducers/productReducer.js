const initState = {};

const productReducer = (state = initState, action) => {
	switch (action.type) {
		case "FETCH_PRODUCTS":
			return {
				...state,
				data: action.payload
			};

		default:
			return state;
	}
};

export default productReducer;
