import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createProductReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
	const [quantity, setQuantity] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	
	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReviewCreate;
	
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (successProductReview) {
			alert('Review Submitted');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match, successProductReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?quantity=${quantity}`);
	};

	const submitReviewHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(match.params.id, {
			rating,
			comment
		}));
	}

	return (
		<div className="ProductScreen">
			<Link className="btn btn-light" to="/">
				<i className="fas fa-arrow-left mr-3"></i>Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
			<Message variant="danger">{error}</Message>
			) : (
				<React.Fragment>
				<Meta title={product.name}/>
				<Row className="my-4">
					<Col lg={4}>
						<Image fluid src={product.image} alt={product.name} />
					</Col>
					<Col lg={4}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h6>{product.name}</h6>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating value={product.rating} text={`${product.numReviews} reviews`} color="text-warning"/>
							</ListGroup.Item>
							<ListGroup.Item>
								Price : ${product.price}
							</ListGroup.Item>
							<ListGroup.Item>
								Description : {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col lg={4}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>
											<strong>Price</strong>
										</Col>
										<Col>
											<span>{product.price}</span>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>
											<strong>Status</strong>
										</Col>
										<Col>
											<span> {product.countInStock > 0 ? "In Stock" : "Out Of Stock"} </span>
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Quantity</Col>
											<Col>
												<Form.Control as="select" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ padding: "8px" }}>
													<option defaultValue> Select Quantity </option>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>{x + 1}</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button className="btn-block" type="button" onClick={addToCartHandler}> ADD TO CART </Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
				
				<Row>
					<Col md={6}>
						<h2>Reviews</h2>
						{product.reviews.length === 0 && <Message variant="info">No Reviews</Message>}
						<ListGroup variant="flush">
							{loadingProductReview && <Loader />}
							{product.reviews.map(review => (
								<ListGroup.Item key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating} color="text-warning" />
									<p>{review.createdAt.substring(0, 10)}</p>
									<p>{review.comment}</p>
								</ListGroup.Item>	
							))}
							<ListGroup.Item>
								<h2>Write A Customer Review</h2>
								{errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
								{userInfo ? (
								<Form onSubmit={submitReviewHandler}>
									<Form.Group controlId="Rating">
										<Form.Label>Rating</Form.Label>
										<Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)} custom>
											<option value="" defaultValue>Select Rating</option>
											<option value="1">1 - Poor</option>
											<option value="2">2 - Fair</option>
											<option value="3">3 - Good</option>
											<option value="4">4 - Very Good</option>
											<option value="5">5 - Excellent</option>
										</Form.Control>
									</Form.Group>
									<Form.Group controlId="Comment">
										<Form.Label>Comment</Form.Label>
										<Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)}/>
									</Form.Group>
									<Button type="submit" variant="primary">Submit Review</Button>
								</Form>	
								) : (<Message variant="info">Please <Link to="/Login">Sign In</Link> </Message>)}
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
				</React.Fragment>
			)}
		</div>
	);
};

export default ProductScreen;
