import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
    return (
        <div className="Footer bg-dark text-white">
            <Container>
                <Row>
                    <Col className="text-center py-4">
                        <span>&copy; Copyrights 2020, ProShop</span>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
