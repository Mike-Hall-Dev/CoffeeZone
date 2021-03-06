import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Col, Row, Image, ListGroup, Form, Button, Card, Container } from "react-bootstrap"
import DisplayMessage from "../components/DisplayMessage.js";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartPage = ({ match, history, location }) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
        history.push("/cart");
    };

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping")
    };

    return (
        <Container className="my-3">
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? <div><DisplayMessage variant={"dark"}>Your cart is empty
                </DisplayMessage> <Link to="/">Go Back</Link></div> : (
                            <ListGroup varient="flush">
                                {cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col md={2}>
                                                <Form.Select as="select" value={item.qty} data-size="1"
                                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {[...Array(item.countInStock > 10 ? 10 : item.countInStock).keys()].map((val) => (
                                                        <option key={val + 1} value={val + 1}>
                                                            {val + 1}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                            <Col md={2}>
                                                <Button type="button" variant="dark" onClick={() => removeFromCartHandler(item.product)}>
                                                    <i className="fas fa-trash" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                                <Link to="/" my="4">Keep Shopping?</Link>
                            </ListGroup>
                        )}
                </Col>
                <Col md={4}>
                    <Card className="my-4">
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                             items</h2>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}>Proceed to checkout</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </Container>
    )
}

export default CartPage
