import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { signOut } from "../../store/actions/authActions";
import { withFirebase } from "react-redux-firebase";
const SignedInLinks = (props) => {
	return (
		<ul className='right'>
			<li>
				<NavLink to='/cart'>View Cart</NavLink>
			</li>
			<li>
				<button
					className='waves-effect waves-light btn-flat white-text'
					onClick={props.signOut}>
					Log Out
				</button>
			</li>
			<li>
				<NavLink to='/' className='btn btn-floating pink lighten-1'>
					{props.profile.initials}
				</NavLink>
			</li>
		</ul>
	);
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		signOut: () => dispatch(signOut(ownProps))
	};
};

export default compose(
	withFirebase,
	connect(
		null,
		mapDispatchToProps
	)
)(SignedInLinks);
