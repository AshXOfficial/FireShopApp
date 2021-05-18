import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import "../css/table.css";

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    return (
        <div className="OrderListScreen">
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>User ID</th>
                            <th>Tax Price</th>
                            <th>Shipping Price</th>
                            <th>Total Price</th>
                            <th>Paid Status</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>${order.taxPrice}</td>
                                <td>${order.shippingPrice}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? (<i className="fas fa-check fa-lg fa-fw" style={{ color: 'green' }}></i>) : (<i className="fas fa-times fa-lg fa-fw" style={{ color: 'red' }}></i>)}</td>
                                <td>{order.isDelivered ? (<i className="fas fa-check fa-lg fa-fw" style={{ color: 'green' }}></i>) : (<i className="fas fa-times fa-lg fa-fw" style={{ color: 'red' }}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/Order/${order._id}`}>
                                        <Button size="sm" variant="light">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr> 
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default OrderListScreen;
