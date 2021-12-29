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

    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const productCategories = new Set();
    const productBrands = new Set();

    products.forEach((product) => {
        if (product.category !== 'Sample Category') {
            productCategories.add(product.category)
        }
    });

    products.forEach((product) => {
        if (product.brand !== 'Sample Brand') {
            productBrands.add(product.brand)
        }
    });

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >
                            <img src="/images/logo.png" alt="coffee zone logo" style={{
                                height: "70px",
                                width: "70px",
                                borderRadius: "50%",
                                marginRight: ".5rem"
                            }} />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="mr-auto">
                            <LinkContainer to="/">
                                <Navbar.Brand>Home</Navbar.Brand>
                            </LinkContainer>

                            <NavDropdown title="Brands" id="categories" style={{ color: "FFFFFF" }}>
                                {[...productBrands].map(brand => (
                                    <LinkContainer to={`/brands/${brand}`}>
                                        <NavDropdown.Item>{brand}</NavDropdown.Item>
                                    </LinkContainer>
                                ))}
                            </NavDropdown>

                            <NavDropdown title="Categories" id="categories" style={{ marginRight: "10px" }}>
                                {[...productCategories].map(category => (
                                    <LinkContainer to={`/categories/${category}`}>
                                        <NavDropdown.Item>{category}</NavDropdown.Item>
                                    </LinkContainer>
                                ))}
                            </NavDropdown>
                        </Nav>

                        <Container style={{ paddingLeft: "0" }}>
                            <SearchBar />
                        </Container>

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
