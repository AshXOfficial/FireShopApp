import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<div className="Main">
					<Container className="my-5">
						<Route path="/Order/:id" component={OrderScreen} />
						<Route path="/Shipping" component={ShippingScreen} />
						<Route path="/Payment" component={PaymentScreen} />
						<Route path="/PlaceOrder" component={PlaceOrderScreen} />
						<Route path="/Login" component={LoginScreen} />
						<Route path="/Register" component={RegisterScreen} />
						<Route path="/Profile" component={ProfileScreen} />
						<Route path="/Product/:id" component={ProductScreen} />
						<Route path="/Cart/:id?" component={CartScreen} />
						<Route path="/Admin/UserList" component={UserListScreen} />
						<Route path="/Admin/User/:id/Edit" component={UserEditScreen} />
						<Route path="/Admin/ProductList" component={ProductListScreen} exact/>
						<Route path="/Admin/ProductList/Page/:pageNumber" component={ProductListScreen} exact/>
						<Route path="/Admin/Product/:id/Edit" component={ProductEditScreen} />
						<Route path="/Admin/OrderList" component={OrderListScreen} />
						<Route path="/Search/:keyword" component={HomeScreen} exact />
						<Route path="/Page/:pageNumber" component={HomeScreen} exact />
						<Route path="/Search/:keyword/Page:pageNumber" component={HomeScreen} exact />
						<Route path="/" component={HomeScreen} exact />
					</Container>
				</div>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
