import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UniqueId from "../helpers/UniqueId";
import Rating from "./Rating";

const Product = ({ product }) => {
	return (
		<div className="Product">
            <Card key={UniqueId(11)} className="my-4 h-100">
                <Link to={`/product/${product._id}`}>
				    <Card.Img variant="top" src={product.image} />
                </Link>
				<Card.Body>
                    <Card.Title as="div">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </Card.Title>
                    <Card.Text as="div" className="mb-4 h4">
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                            color="text-warning" />
                    </Card.Text>
                    <Card.Text as="div" className="mb-4 h4">${product.price} </Card.Text>
					<Button variant="outline-dark" className="btn-sm">Add To Cart</Button>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Product;
