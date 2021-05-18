import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;
	const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    console.log(cartItems);
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity]);

    const removeFromCarthandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        console.log();
        history.push('/login?redirect=shipping')
    }

	return (
        <div className="CartScreen">
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart 🛒</h1>
                    {cartItems.length === 0 ? <Message>Your Cart is Empty <Link to="/">Go Back</Link> </Message> : (
                        <ListGroup variant="flush">
                            {
                                cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/Product/${item.product}`}>{ item.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                ${item.price}
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control
													as="select"
													value={item.quantity}
													onChange={(e) =>
														dispatch(addToCart(item.product, Number(e.target.value)))
													}
															style={{padding: "8px"}}
														>
															<option defaultValue>Select Quantity</option>
													{[
														...Array(
															item.countInStock
														).keys(),
													].map((x) => (
														<option
															key={x + 1}
															value={x + 1}
														>
															{x + 1}
														</option>
													))}
												</Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button type="button" variant="light" className="rounded" onClick={() => removeFromCarthandler(item.product)}>
                                                    <i className="fas fa-trash fa-fw fa-lg text-danger"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )}  
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h4>Subtotal ({
                                    cartItems.reduce((acc, item) => acc + item.quantity, 0)
                                }) items</h4>
                                ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={2}></Col>
            </Row>
		</div>
	);
};

export default CartScreen;
