import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { productsList } from "../actions/productActions.js";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import DisplayMessage from "../components/DisplayMessage.js";
import SpinnerComponent from "../components/SpinnerComponent.js"
import ProductCarousel from "../components/ProductCarousel.js"
import Paginate from "../components/Paginate.js";
import HelmetWrapper from "../components/HelmetWrapper.js";
import HeroImage from "../components/HeroImage.js"

const HomePage = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(productsList(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <HelmetWrapper />

            {!keyword && pageNumber < 2 && <HeroImage />}
            {!keyword && <> <ProductCarousel /> </>}
            {products.length === 0 && keyword !== "" ? <DisplayMessage>Product Not Found</DisplayMessage>
                : <Container className="my-3">{
                    products.length === 0 ? (<SpinnerComponent />) : error ? (<DisplayMessage>{error}</DisplayMessage>) :
                        (<Row>
                            {products.map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>)

                } <div style={{ text: "center" }}><Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} /></div></Container>}

        </>
    )
}

export default HomePage;
