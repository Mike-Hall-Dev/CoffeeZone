import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import SpinnerComponent from "../components/SpinnerComponent";
import Paginate from "../components/Paginate";
import DisplayMessage from "../components/DisplayMessage";
import HelmetWrapper from "../components/HelmetWrapper";
import { listBrandProducts } from "../actions/productActions";


const ProductBrandsList = ({ match }) => {
    const brand = match.params.brand;

    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();

    const productBrand = useSelector((state) => state.productBrand, shallowEqual);
    const { loading, error, products, page, pages } = productBrand;

    useEffect(() => {
        dispatch(listBrandProducts(brand, pageNumber));
    }, [dispatch, brand, pageNumber]);

    return (
        <>
            <HelmetWrapper title={brand + " page"} />
            <Container fluid className='px-5 pt-3'>
                {loading ? (
                    <SpinnerComponent />
                ) : error ? <DisplayMessage /> : (
                    <>
                        <Row>
                            {products.map((product) => (
                                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate pages={pages} page={page} brand={brand ? brand : ""} />
                    </>
                )}
            </Container>
        </>
    );
};

export default ProductBrandsList;