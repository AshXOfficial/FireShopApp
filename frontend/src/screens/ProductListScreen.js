import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from '../components/Paginate';
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        if (!userInfo.isAdmin) {
            history.push('/login');
        }
        if (successCreate) {
            history.push(`/Admin/Product/${createdProduct._id}/Edit`);
        } else {
            dispatch(listProducts(keyword, pageNumber));
        }
    }, [dispatch, keyword, pageNumber, history, userInfo, successDelete, successCreate, createdProduct]);

    const deleteHandler = (id) => {
        if (window.confirm("Are You Sure You Want To Delete This Product?")) {
            dispatch(deleteProduct(id));
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct());
    }

    return (
        <div className="ProductListScreen">
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus fa-fw mr-2"></i>Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <React.Fragment>
                    <Table striped bordered hover responsive size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <ButtonGroup aria-label="Users Actions">
                                            <LinkContainer to={`/Admin/Product/${product._id}/Edit`}>
                                                <Button size="sm" variant="light"><i className="fas fa-edit fa-lg fa-fw"></i></Button>
                                            </LinkContainer>
                                            <Button size="sm" variant="danger" onClick={() => deleteHandler(product._id)}><i className="fas fa-trash fa-lg fa-fw"></i></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Row>
                        <Col sm={12}>
                            <Paginate pages={pages} page={page} isAdmin={true} keyword={keyword ? keyword : ''} />
                        </Col>
                    </Row>
                </React.Fragment>
            )}
        </div>
    );
};

export default ProductListScreen;
