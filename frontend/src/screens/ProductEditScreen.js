import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(1);
    const [countInStock, setCountInStock] = useState(0);
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [user, setUser] = useState("");
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();
    
    const productDetails = useSelector((state) => state.productDetails);
    const { loading: loadingProduct, error: errorProduct, product } = productDetails;
    
    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push('/Admin/ProductList');
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
                console.log(product);
            } else {
                setImage(product.image);
                setBrand(product.brand);
                setName(product.name);
                setCategory(product.category);
                setPrice(product.price);
                setCountInStock(product.countInStock);
                setRating(product.rating);
                setDescription(product.description);
                setUser(product.user);
            }
        }
    }, [dispatch, productId, product, history, user, successUpdate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            }

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data.replace(/\\/g, "/"));
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    }

    const updateProductHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id : productId,
            image,
            brand,
            name,
            category,
            price,
            countInStock,
            rating,
            description,
            user,
        }));
    }
    

    return (
        <div className="ProductEditScreen">
            <Link to='/Admin/ProductList/' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1 className="my-3">Update Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loadingProduct ? <Loader /> : errorProduct ? <Message variant='danger'>{errorProduct}</Message> : (
                    <Form onSubmit={updateProductHandler} className="my-3">
                        <Form.Group controlId="productImage">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id="productImageFile"
                                label="Choose File"
                                accept="image/x-png,image/jpeg,image/jpg"
                                placeholder="Choose Product Image"
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader/>}
                        </Form.Group>
                        <Form.Group controlId="productBrandName">
                            <Form.Label>Product Brand Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Brand Name"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="productName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="productCategory">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Product Price"
                                value={price}
                                min={1}
                                max={999999}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="productCountInStock">
                            <Form.Label>Product Count In Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Product Count In Stock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="productRating">
                            <Form.Label>Product Rating</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Product Rating"
                                value={rating}
                                min={0}
                                max={5}
                                onChange={(e) => setRating(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
};

export default ProductEditScreen;
