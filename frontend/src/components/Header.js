import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
	Container,
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
	Image
} from "react-bootstrap";
import { Logout } from '../actions/userActions';
import SearchBox from "./SearchBox";

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(Logout());
	}

	return (
		<div className="Header">
			<Navbar
				bg="dark"
				expand="lg"
				variant="dark"
				className="border-0"
				collapseOnSelect
			>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<Image width="36px" height="52px" className="mr-3" src="/images/fireshop-logo.png" rounded />FireShop
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Route render={({history}) => <SearchBox history={history}/>} ></Route>
						<Form inline hidden>
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
							/>
							<Button variant="outline-success">Search</Button>
						</Form>
						<Nav className="ml-auto">
							<LinkContainer to="/Cart">
								<Nav.Link>
									<i className="fas fa-shopping-cart"></i>{" "}
									Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/Profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/Login">
									<Nav.Link>
										<i className="fas fa-user"></i> Sign In
									</Nav.Link>
								</LinkContainer>
							)}

							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminMenu'>
									<LinkContainer to='/Admin/UserList'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/Admin/ProductList'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/Admin/OrderList'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}

						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Header;
