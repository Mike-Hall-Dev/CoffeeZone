import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { Form, Button, Container, Row, Col } from "react-bootstrap";

const SearchBar = () => {
    const history = useHistory();

    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push("/")
        }
    }

    return (
        // <Form onSubmit={submitHandler} inline>
        //     <Form.Control type="text" name="q" onChange={(e) => setKeyword(e.target.value)}
        //         placeholder="Search Products" className="mr-sm-2 ml-sm-5">

        //     </Form.Control>
        //     <Button type="submit" variant="outline-success" className="btn btn-sm">Search</Button>

        // </Form>
        <>
            <Container className="mx-5 my-3">
                <Col>
                    <Form onSubmit={submitHandler} className="d-flex justify-content-center">
                        <Form.Control
                            id='search'
                            type='text'
                            name='q'
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder={`search products`}
                            className='rounded-start smaller-input'
                            size='sm'
                        ></Form.Control>

                        <Button
                            type='submit'
                            variant='secondary '
                            className='btn rounded-end smaller-button'
                        >
                            <i className='fas fa-search'></i>
                        </Button>
                        {/* </InputGroup> */}
                    </Form>
                </Col>
            </Container>
        </>
    )
}

export default SearchBar
