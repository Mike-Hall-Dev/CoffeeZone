import React from 'react'
import { Helmet } from "react-helmet"


const HelmetWrapper = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    )
}

HelmetWrapper.defaultProps = {
    title: "Coffee Zone",
    keywords: "coffee, buy coffee, good coffee",
    description: "Our coffee has a great taste for a great price"
}

export default HelmetWrapper;
