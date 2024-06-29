import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const PropertyOwnerForm = ({
  formData,
  handleChange,
  addInteriorImageField,
  removeInteriorImageField,
  handleSubmit, // Add handleSubmit prop
  error,
}) => {
  return (
    <Container fluid className="p-3">
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.title}
              type="text"
              placeholder="Property Title"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleChange}
              value={formData.description}
              placeholder="Property Description"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="Area">
            <Form.Label>Area</Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              value={formData.Area}
              required
            >
              <option value="">Select Area</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="Central">Central</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="HouseType">
            <Form.Label>House Type</Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              value={formData.HouseType}
              required
            >
              <option value="">Select House Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Studio">Studio</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="City">
            <Form.Label>City</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.City}
              type="text"
              placeholder="City"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="Street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.Street}
              type="text"
              placeholder="Street"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="HouseNumber">
            <Form.Label>House Number</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.HouseNumber}
              type="number"
              placeholder="House Number"
              required
              min="1"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="NumberOfRooms">
            <Form.Label>Number of Rooms</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.NumberOfRooms}
              type="number"
              placeholder="Number of Rooms"
              required
              min="1"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="NumberOfBeds">
            <Form.Label>Number of Beds</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.NumberOfBeds}
              type="number"
              placeholder="Number of Beds"
              required
              min="1"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="Balcony">
            <Form.Check
              onChange={handleChange}
              checked={formData.Balcony}
              type="checkbox"
              label="Balcony"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="Disability">
            <Form.Check
              onChange={handleChange}
              checked={formData.Disability}
              type="checkbox"
              label="Disability Access"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="Elevator">
            <Form.Check
              onChange={handleChange}
              checked={formData.Elevator}
              type="checkbox"
              label="Elevator"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="Furnished">
            <Form.Check
              onChange={handleChange}
              checked={formData.Furnished}
              type="checkbox"
              label="Furnished"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="Parking">
            <Form.Check
              onChange={handleChange}
              checked={formData.Parking}
              type="checkbox"
              label="Parking"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="AirCondition">
            <Form.Check
              onChange={handleChange}
              checked={formData.AirCondition}
              type="checkbox"
              label="Air Conditioning"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="SecureSpace">
            <Form.Check
              onChange={handleChange}
              checked={formData.SecureSpace}
              type="checkbox"
              label="Secure Space"
            />
          </Form.Group>
        </Col>
      </Row>

      {formData.interiorImages.map((image, index) => (
        <Row key={index} className="mb-3">
          <Col>
            <Form.Group controlId={`interiorImage${index}`}>
              <Form.Label>Interior Image URL {index + 1}</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e, index)}
                value={image}
                type="text"
                placeholder="Interior Image URL"
              />
            </Form.Group>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <Button
              variant="danger"
              onClick={() => removeInteriorImageField(index)}
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      <Button variant="secondary" onClick={addInteriorImageField}>
        Add Interior Image
      </Button>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="exteriorImage">
            <Form.Label>Exterior Image URL</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.exteriorImage}
              type="text"
              placeholder="Exterior Image URL"
            />
          </Form.Group>
        </Col>
      </Row>

      {error && <p className="text-danger">{error}</p>}

      {/* Submit button */}
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default PropertyOwnerForm;
