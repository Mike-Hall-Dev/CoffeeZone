import React from 'react';
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Data from "../data.js";

const HomePage = () => {
    const productsData = Data.products;
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {productsData.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomePage;
