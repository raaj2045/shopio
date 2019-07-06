import React, { Component } from "react";
import ProjectList from "../products/ProductList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
class Dashboard extends Component {
	componentDidMount() {}

	render() {
		const { products, auth } = this.props;
		if (!auth.uid) return <Redirect to='/signin' />;
		return (
			<div className='dashboard container'>
				<div className='row'>
					<div className='row'>
						<div className='col sm12 m12'>
							<ProjectList products={products} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.firestore.ordered.products,
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: "products" }])
)(Dashboard);
