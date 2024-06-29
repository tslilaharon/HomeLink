import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import PropertyCard from "../components/PropertyCard";
import axiosInstance from "../../axiosConfig";
import "../assets/styles/Style.css";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get("/api/property/get");
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid data");
        }
        if (response.data.length === 0) {
          throw new Error("No properties found");
        }
        setProperties(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Container>
      <h2>All Properties</h2>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {properties.map((property) => (
            <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
              <PropertyCard property={property} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AllProperties;
