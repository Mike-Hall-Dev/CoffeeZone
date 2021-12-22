import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DisplayMessage from "../components/DisplayMessage";
import SpinnerComponent from "../components/SpinnerComponent";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer.js"

const LoginPage = ({ location, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <DisplayMessage>{error}</DisplayMessage>}
            {loading && <SpinnerComponent></SpinnerComponent>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label className="my-2">Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="my-3">Sign In</Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New to Coffee Zone? <Link to="/register">Register</Link>
                </Col>
            </Row>
        </FormContainer>)
}

export default LoginPage
