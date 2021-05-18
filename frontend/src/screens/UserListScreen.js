import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({history}) => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, successDelete, userInfo]);

    const deleteHandler = (id) => {
        if (window.confirm("Are You Sure You Want To Delete This User?")) {
            dispatch(deleteUser(id));
        }
    }

    return (
        <div className="UserListScreen">
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>IsAdmin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? (<i className="fas fa-check fa-lg fa-fw" style={{ color: 'green' }}></i>) : (<i className="fas fa-times fa-lg fa-fw" style={{ color: 'red' }}></i>)}</td>
                                <td>
                                    <ButtonGroup aria-label="Users Actions">
                                        <LinkContainer to={`/Admin/User/${user._id}/Edit`}>
                                            <Button size="sm" variant="light"><i className="fas fa-edit fa-lg fa-fw"></i></Button>
                                        </LinkContainer>
                                        <Button size="sm" variant="danger" onClick={() => deleteHandler(user._id)}><i className="fas fa-trash fa-lg fa-fw"></i></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default UserListScreen;
