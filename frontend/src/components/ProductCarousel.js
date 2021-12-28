import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import SpinnerComponent from "./SpinnerComponent.js"
import DisplayMessage from "./DisplayMessage.js"
import { listTopProducts } from "../actions/productActions";


const ProductCarousel = () => {
    const dispatch = useDispatch();

    const productTopRated = useSelector(state => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch]);

    return loading ? <SpinnerComponent /> : error ? <DisplayMessage>{error}</DisplayMessage> : (
        <Carousel pause='hover' variant="dark">
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className="carosel-caption">
                            <h6 style={{ color: "black" }}>{product.name} (${product.price})</h6>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
