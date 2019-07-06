import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ViewCart from "./components/cart/ViewCart";
function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Dashboard} />
					<Route exact path='/signin' component={SignIn} />
					<Route exact path='/signup' component={SignUp} />
					<Route exact path='/cart' component={ViewCart} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
