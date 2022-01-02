import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, Col, Row, ListGroup, Image, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DisplayMessage from "../components/DisplayMessage.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { createOrder } from "../actions/orderActions.js";


const PlaceOrderPage = ({ history }) => {
    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const decimalMath = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    cart.shippingPrice = decimalMath(cart.itemsPrice > 100 ? 0 : 5);
    cart.taxPrice = decimalMath(Number((cart.itemsPrice * .14).toFixed(2)));
    cart.totalPrice = decimalMath(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    };

    return (
        <Container className="my-3">
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.zipCode} {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod ? cart.paymentMethod.paymentMethod : <DisplayMessage>Could not load payment method, please try again.</DisplayMessage>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Ordered Items</h2>
                            {cart.cartItems.length === 0 ? <DisplayMessage>Your Cart is empty</DisplayMessage> : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items Cost</Col>
                                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Cost</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <DisplayMessage>{error}</DisplayMessage>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" className="btn-block"
                                    disabled={cart.cartItems === 0 || !cart.paymentMethod} onClick={placeOrderHandler}>
                                    Procced to payment
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default PlaceOrderPage
