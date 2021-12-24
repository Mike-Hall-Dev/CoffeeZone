import React, { useState } from 'react';
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.js"
import CheckoutSteps from "../components/CheckoutSteps.js"
import { savePaymentMethod } from "../actions/cartActions.js";


const PaymentPage = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push("/shipping")
    };

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod({ paymentMethod }));
        history.push("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>

                    <Col>
                        <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type="submit" className="my-3">
                    Continue
            </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage;