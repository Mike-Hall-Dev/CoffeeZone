import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import SpinnerComponent from "../components/SpinnerComponent";
import Paginate from "../components/Paginate";
import DisplayMessage from "../components/DisplayMessage";
import HelmetWrapper from "../components/HelmetWrapper";
import { listCategoryProducts } from "../actions/productActions";


const ProductCategoryList = ({ match }) => {
    const category = match.params.brand;

    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();

    const productCategory = useSelector((state) => state.productCategory, shallowEqual);
    const { loading, error, products, page, pages } = productCategory;

    useEffect(() => {
        dispatch(listCategoryProducts(category, pageNumber));
    }, [dispatch, pageNumber, category]);

    return (
        <>
            <HelmetWrapper title={category + " page"} />
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
                        <Paginate pages={pages} page={page} category={category ? category : ""} />
                    </>
                )}
            </Container>
        </>
    );
};

export default ProductCategoryList;