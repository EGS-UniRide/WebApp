import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Col, Row } from "reactstrap";

const Layout = () => {
    return (
        <Row style={{ marginRight: '0%' }}>
            <Col>
                <Row>
                    <NavBar />
                </Row>
                <Row>
                    <Outlet />
                </Row>
            </Col>
        </Row>
    );
};

export default Layout;