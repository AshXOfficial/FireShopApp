import React from 'react'
import { Alert } from 'react-bootstrap';

const Message = ({variant, children}) => {
    return (
        <div className="Message"> 
            <Alert variant={variant}>
                {children}
            </Alert>
        </div>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message;
