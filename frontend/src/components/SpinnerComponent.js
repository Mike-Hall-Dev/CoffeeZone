import React from 'react';
import { Spinner } from "react-bootstrap";

const SpinnerComponent = () => {
    return (
        <Spinner animation="border" variant="primary" role="status" style={{
            width: '50px',
            height: "50px",
            margin: "auto",
            display: "block"
        }}>
            <span className="sr-only">Loading</span>
        </Spinner>
    )
}

export default SpinnerComponent
