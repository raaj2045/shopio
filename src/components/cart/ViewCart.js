import React, { Component } from "react";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import {
	withFirestore,
	firestoreConnect,
	withFirebase
} from "react-redux-firebase";
import { deleteItem } from "../../store/actions/cartActions";
import { Button, Modal } from "semantic-ui-react";
import { placeOrder } from "../../store/actions/cartActions";

class ViewCart extends Component {
	state = {
		userId: "",
		cartProducts: null,
		show: "none",
		products: null,
		total: null,
		toggle: "",
		open: false
	};

	show = (size) => () => {
		this.setState({ size, open: true });
		console.log(this.state.total);
	};

	handleClose = () => this.setState({ open: false });
	componentDidMount() {
		this.setState({ total: null });
	}

	componentDidUpdate() {
		if (
			this.props.products &&
			this.props.cartProducts &&
			!this.state.cartProducts
		) {
			if (this.props.cartProducts[`${this.props.auth.uid}`]) {
				this.setState({
					cartProducts: this.props.cartProducts[`${this.props.auth.uid}`]
						.products,
					products: this.props.products
				});
				var cartProducts = this.state.cartProducts;
				let sum = 0;

				_.forEach(cartProducts, function(value, key) {
					sum += parseInt(this.props.products[key].price) * value;
				});

				this.setState({ total: sum });
				this.setState({ show: "block" });
			} else {
			}
		}

		if (this.state.cartProducts && this.state.products && !this.state.total) {
			var cartProducts = this.state.cartProducts;
			let sum = 0;
			var products = this.state.products;
			Object.keys(cartProducts).forEach((key) => {
				sum += cartProducts[key] * parseInt(products[key].price);
			});

			if (sum === 0) {
				return;
			} else {
				console.log(sum);
				this.setState({ total: sum });
			}
		}
	}

	handleDelete = (value, index) => {
		console.log(value);
		let cartItem = {};
		cartItem[value.id] = 0;

		this.setState({ toggle: "toggle" });
		this.props.deleteItem(this.props.auth.uid, cartItem);
		this.props.history.replace("/cart");
	};

	renderCartItems = () => {
		if (this.state.cartProducts && this.state.products) {
			var cartProducts = this.state.cartProducts;
			var items = [];
			var products = this.state.products;

			_.forEach(cartProducts, function(value, key) {
				items.push({
					id: key,
					quantity: value,
					price: products[key].price,
					title: products[key].title
				});
			});

			return items.map((value, index) => {
				if (value.quantity === 0) {
					return;
				} else {
					return (
						<tr key={index} className='centered'>
							<td>{value.title}</td>
							<td>{value.quantity}</td>
							<td>{parseInt(value.quantity) * parseInt(value.price)} ₹</td>
							<td>
								<button
									className='btn-floating btn-small waves-effect waves-light red'
									onClick={() => {
										this.handleDelete(value, index);
									}}>
									<i className='material-icons'>delete</i>
								</button>
							</td>
						</tr>
					);
				}
			});
		}
	};

	placeOrder = () => {
		this.props.placeOrder(this.props.auth.uid, this.state.total);
		this.props.history.replace("/");
	};

	render() {
		const { open, size } = this.state;
		return (
			<div className='container' style={{ display: `${this.state.show}` }}>
				<div className='row'>
					{this.state.total ? (
						<table className='striped responsive-table'>
							<thead>
								<tr>
									<th>Product Name</th>

									<th>Quantity</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{this.renderCartItems()}
								<tr className='centered'>
									<td />
									<td />
									<td>
										<b>TOTAL:{this.state.total}₹</b>
									</td>
									<td>&nbsp;</td>
								</tr>
								<tr className='centered'>
									<td />
									<td />
									<td />
									<td>
										<button
											onClick={this.show("tiny")}
											className='btn waves-effect waves-green waves'>
											Buy
										</button>
										<Modal
											size={size}
											open={open}
											onClose={this.close}
											style={{ left: "37%" }}>
											<Modal.Header>Order Placed!</Modal.Header>
											<Modal.Content>
												Total of {this.state.total}₹ purchase.
											</Modal.Content>
											<Modal.Actions>
												<Button negative onClick={this.handleClose}>
													Back
												</Button>
												<Button
													onClick={this.placeOrder}
													className='btn btn-block purple waves-purple waves-effect waves-button-input '>
													Confirm
												</Button>
											</Modal.Actions>
										</Modal>
									</td>
								</tr>
							</tbody>
						</table>
					) : (
						<div>Cart is empty</div>
					)}
				</div>
			</div>
		);
		// }
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		cartProducts: state.firestore.data.carts,
		products: state.firestore.data.products
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		deleteItem: (userId, cartProduct) =>
			dispatch(deleteItem(userId, cartProduct, ownProps)),
		placeOrder: (totalPrice, userId) =>
			dispatch(placeOrder(totalPrice, userId, ownProps))
	};
};

export default compose(
	withFirestore,
	withFirebase,
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect((ownProps) => [
		{ collection: "carts", doc: ownProps.auth.uid },
		{ collection: "products" }
	])
)(ViewCart);
