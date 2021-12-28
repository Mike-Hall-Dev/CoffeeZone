import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions.js"
import SearchBar from "./SearchBar.js"

const NavBar = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">

                        <Navbar.Brand>
                            <img src="/images/logo.png" alt="coffee zone logo" style={{
                                height: "70px",
                                width: "70px",
                                borderRadius: "50%",
                                marginRight: ".5rem"
                            }} /> Coffee Zone
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i></Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user"></i></Nav.Link>
                                </LinkContainer>}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Prodcuts</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >

    )
}

export default NavBar;
