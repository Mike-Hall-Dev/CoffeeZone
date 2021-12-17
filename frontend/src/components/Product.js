import React from 'react'
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded text-center">
            <Link to={`/products/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/products/${product._id}`}>
                    <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
                </Link>
                <Card.Text>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as="h6">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

Rating.defaultProps = {
    color: "#d9340f"
}

export default Product
