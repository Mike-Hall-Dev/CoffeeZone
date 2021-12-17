import React from 'react'
import { Link } from "react-router-dom";
import { Col, Row, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Data from "../data.js";

const productsArr = Data.products;

const ProductDetailsPage = ({ match }) => {
    const product = productsArr.find(p => p._id === match.params.id)
    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
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
                            Description: {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn btn-primary btn-block" disabled={product.countInStock === 0}>Add to cart</Button>
                        </ListGroup.Item>
                    </ListGroup>

                </Col>

            </Row>
        </>
    )
}

export default ProductDetailsPage;
