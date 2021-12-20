import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { productsList } from "../actions/productActions.js";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import DisplayMessage from "../components/DisplayMessage.js";
import SpinnerComponent from "../components/SpinnerComponent.js"

const HomePage = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    console.log(loading)
    console.log(error)

    useEffect(() => {
        dispatch(productsList())
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {products.length === 0 ? (<SpinnerComponent />) : error ? (<DisplayMessage>{error}</DisplayMessage>) :
                (<Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>)}
        </>
    )
}

export default HomePage;
