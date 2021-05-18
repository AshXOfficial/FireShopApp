import React from 'react'
import { Helmet } from "react-helmet";

const Meta = ({title, description, keywords }) => {
    return (
        <div className='Meta'>
            <Helmet>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords}/>
			</Helmet>
        </div>
    )
}

Meta.defaultProps = {
    title: 'Welcome To FireShop | Home',
    description: 'We Sell Best Products In Reasonable Rate',
    keywords: 'electronics, apple, iphone, samsung, speakers, alexa, amazon, earphones'
}

export default Meta
