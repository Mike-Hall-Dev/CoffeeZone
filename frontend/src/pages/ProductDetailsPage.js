import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createProductReview } from "../actions/productActions";
import { Link } from "react-router-dom";
import { Col, Row, Image, ListGroup, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import SpinnerComponent from "../components/SpinnerComponent.js";
import DisplayMessage from "../components/DisplayMessage.js";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants.js"

const ProductDetailsPage = ({ match, history }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { error, product } = productDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productReview = useSelector(state => state.productReview);
    const { success: successReview, error: errorReview } = productReview;

    useEffect(() => {
        if (successReview) {
            alert("Review Submitted!");
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successReview]);

    const cartAddHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }));
    }

    const maxQty = product.countInStock > 10 ? 10 : product.countInStock;


    return (
        <>
            <Link className="btn btn-light my-3" to="/"><i className="fas fa-arrow-left"></i> Back</Link>
            {!product._id || product._id !== match.params.id ? <SpinnerComponent /> :
                error ? <DisplayMessage>{error}</DisplayMessage> :
                    (
                        <>
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
                                                            {[...Array(maxQty).keys()].map((val) => (
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
                            <Row>
                                <Col md={6}>
                                    <h2>Reviews</h2>
                                    {product.reviews.length === 0 && <DisplayMessage variant="info">No Reviews</DisplayMessage>}
                                    <ListGroup variant="flush">
                                        {product.reviews.map(review => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item>
                                            <h2>Leave A Review</h2>
                                            {errorReview && <DisplayMessage>{errorReview}</DisplayMessage>}
                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId="rating">
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                                                            <option value="">Select...</option>
                                                            <option value="1">1 - Bad</option>
                                                            <option value="2">2 - Poor</option>
                                                            <option value="3">3 - Fair</option>
                                                            <option value="4">4 - Good</option>
                                                            <option value="5">5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId="comment">
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control as="textarea" row="3" value={comment} onChange={(e) => setComment(e.target.value)}>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Button type="submit" className="my-3">
                                                        Submit Reviews
                                                    </Button>
                                                </Form>
                                            ) : <DisplayMessage><Link to="/login">Sign In</Link> to leave a review</DisplayMessage>}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </>
                    )}

        </>
    )
}

export default ProductDetailsPage;
