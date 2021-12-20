import React from 'react';
import { Alert } from "react-bootstrap";

const DisplayMessage = ({ variant, children }) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

DisplayMessage.defaultProps = {
    variant: "primary"
}

export default DisplayMessage
