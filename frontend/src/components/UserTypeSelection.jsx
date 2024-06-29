import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FaUserTie, FaUser } from "react-icons/fa";
import "../assets/styles/Style.css";

const UserTypeSelection = ({ setUserType }) => {
  return (
    <Container
      className="user-type-container"
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "20vh",
        height: "100vh",
      }}
    >
      <Row className="mb-3 text-center w-100">
        <Col>
          <button
            onClick={() => setUserType("propertyOwner")}
            className="user-type-button primary"
          >
            <FaUserTie className="me-2" /> I am a Property Owner
          </button>
        </Col>
        <Col>
          <button
            onClick={() => setUserType("tenant")}
            className="user-type-button secondary"
          >
            <FaUser className="me-2" /> I am a Tenant
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserTypeSelection;
