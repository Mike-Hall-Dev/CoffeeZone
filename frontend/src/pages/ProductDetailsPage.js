import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import { Link } from "react-router-dom";
import { Col, Row, Image, ListGroup, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import SpinnerComponent from "../components/SpinnerComponent.js";
import DisplayMessage from "../components/DisplayMessage.js";

const ProductDetailsPage = ({ match, history }) => {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match]);

    const cartAddHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {!product._id || product._id !== match.params.id ? <SpinnerComponent /> :
                error ? <DisplayMessage>{error}</DisplayMessage> :
                    (
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush" className="d-grid gap-2">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        ${product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {product.description}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Select as="select" value={qty} data-size="1"
                                                        onChange={(e) => setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map((val) => (
                                                            <option key={val + 1} value={val + 1}>
                                                                {val + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button className="btn btn-primary btn-block"
                                            disabled={product.countInStock === 0}
                                            onClick={cartAddHandler}
                                        >Add to cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>

                            </Col>

                        </Row>
                    )}

        </>
    )
}

export default ProductDetailsPage;
