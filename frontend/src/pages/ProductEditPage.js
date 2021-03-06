import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DisplayMessage from "../components/DisplayMessage";
import SpinnerComponent from "../components/SpinnerComponent";
import FormContainer from "../components/FormContainer.js"
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


const ProductEditPage = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push(`/admin/productlist`)
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.desccription);
            }
        }

    }, [product, dispatch, productId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            countInStock,
            brand,
            category,
            description,
        }))
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const { data } = await axios.post("/api/upload", formData, config);

            setImage(data);
            setUploading(false)
        } catch {
            console.error(error);
            setUploading(false);
        }
    }

    return (
        <Container className="my-3">
            <Link to="/admin/productList" className="btn-btn-dark my-3">
                Go Back
        </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <SpinnerComponent />}
                {errorUpdate && <DisplayMessage>{errorUpdate}</DisplayMessage>}
                {loading ? <SpinnerComponent /> : error ? <DisplayMessage>{error}</DisplayMessage> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter Name" value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label className="my-2">Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" value={price}
                                onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label className="my-2">Image</Form.Label>
                            <Form.Control type="text" placeholder="Enter image url" value={image}
                                onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>
                            <Form.Control type="file" id="image-file" label="Choose File" custom onChange={uploadFileHandler} />
                            {uploading && <SpinnerComponent />}
                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label className="my-2">Brand</Form.Label>
                            <Form.Control type="text" placeholder="Enter brand" value={brand}
                                onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countInStock">
                            <Form.Label className="my-2">Count In Stock</Form.Label>
                            <Form.Control type="number" placeholder="Enter Count In Stock" value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label className="my-2">Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter Category" value={category}
                                onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label className="my-2">Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" value={description}
                                onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>


                        <Button type="submit" variant="primary" className="my-3">Update</Button>
                    </Form>
                )}


            </FormContainer>
        </Container>
    )
}

export default ProductEditPage;
