import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, withFirestore } from "react-redux-firebase";
import { compose } from "redux";
import { addToCart } from "../../store/actions/cartActions";
class ProductSummary extends Component {
	state = {
		userId: "",
		cartProducts: [],
		addingMessage: "Adding to cart",
		addedMessage: "Added to cart"
	};

	// shouldComponentUpdate(nextProps, nextState) {
	// 	if (nextProps.cartProducts) {
	// 		console.log(nextProps.cartProducts);
	// 		this.setState({
	// 			userId: nextProps.auth.uid,
	// 			cartProducts: nextProps.cartProducts[`${nextProps.auth.uid}`].products
	// 		});
	// 		console.log(this.state);
	// 		return false;
	// 	} else return true;
	// }

	handleClick = (event) => {
		event.preventDefault();
		try {
			if (this.props.cartProducts[`${this.props.auth.uid}`]) {
				var addProduct = this.props.cartProducts[`${this.props.auth.uid}`]
					.products;
				console.log(addProduct);
				var quantity = addProduct[`${this.props.product.id}`];
				if (quantity) {
					quantity++;
				} else {
					quantity = 1;
				}

				addProduct[`${this.props.product.id}`] = quantity;
				// let addProduct = {
				// 	productId: this.props.product.id,
				// 	quantity: 1
				// };

				this.props.addToCart(this.props.auth.uid, addProduct);

				console.log(this.props.product.id);
			} else {
				var addProduct = {};
				addProduct[`${this.props.product.id}`] = 1;
				this.props.addToCart(this.props.auth.uid, addProduct);
			}
		} catch (err) {
			console.log(err);
		}

		// for(let i = 0 ; i < this.props.cartProducts[`${this.props.auth.uid}`].products.length;i++){

		// }
	};
	render() {
		return (
			<div className='col s6 m4'>
				<div className='card'>
					<div className='card-image'>
						<img src='https://imgplaceholder.com/420x320' alt='' />
						<span className='card-title'>{this.props.product.title}</span>
					</div>

					<div className='card-content'>
						<p>Description</p>
						<p>{this.props.product.price}</p>
					</div>
					<div className='card-action'>
						<button
							onClick={this.handleClick}
							className='waves-effect waves-light btn-small teal'>
							<i className='material-icons left'>add</i>Add to cart
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartProducts: state.firestore.data.carts,
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addToCart: (userId, cartProducts) =>
			dispatch(addToCart(userId, cartProducts, ownProps))
	};
};

export default compose(
	withFirestore,
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect((ownProps) => [
		{ collection: "carts", doc: ownProps.auth.uid }
	])
)(ProductSummary);
