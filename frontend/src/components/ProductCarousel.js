import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import Loader from "./Loader";
import { listTopRatedProducts } from "../actions/productActions";

const ProductCarousel = () => {

    const dispatch = useDispatch();

    const productTopRated = useSelector((state) => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopRatedProducts());
    }, [dispatch])

    return loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) : (
        <div className="ProductCarousel">
            <Carousel pause='hover'>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/Product/${product._id}`}>
                            <Image className="img-fluid w-100" src={product.image} alt={product.name} fluid/>
                            <Carousel.Caption>
                                <h4 className="">{product.brand} - {product.name}</h4>
                                <p>{product.description}</p>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default ProductCarousel
