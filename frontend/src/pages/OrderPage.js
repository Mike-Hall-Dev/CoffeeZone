import React, { useEffect, useState } from 'react';
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DisplayMessage from "../components/DisplayMessage.js";
import SpinnerComponent from "../components/SpinnerComponent.js";
import { getOrderDetails, payOrder, listMyOrders } from "../actions/orderActions.js";
import { ORDER_PAY_RESET, ORDER_CREATE_RESET} from "../constants/orderConstants";


const OrderPage = ({ match }) => {
    const orderId = match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        };

        if (!order || successPay || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
            dispatch(listMyOrders());
            dispatch({type: ORDER_CREATE_RESET})
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true);
            }
        }

    }, [dispatch, orderId, order, successPay]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    }

    return loading ? <SpinnerComponent /> : error ? <DisplayMessage>{error}</DisplayMessage> : <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name:</strong> {order.user.name}</p>
                        <p> <strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.zipCode} {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <DisplayMessage variant="success">Delivered n {order.deliveredAt}</DisplayMessage> :
                            <DisplayMessage>Not Delivered</DisplayMessage>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <DisplayMessage variant="success">Paid on {order.paidAt}</DisplayMessage> :
                            <DisplayMessage>Not Paid</DisplayMessage>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Ordered Items</h2>
                        {order.orderItems.length === 0 ? <DisplayMessage>Order is empty</DisplayMessage> : (
                            <ListGroup variant="flush">
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/products/${item.product}`}>
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
                                <Col>Shipping Cost</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <SpinnerComponent />}
                                {!sdkReady ? <SpinnerComponent /> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                )}
                            </ListGroup.Item>
                        )}

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderPage
