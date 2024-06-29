import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const EvacueeForm = ({ formData, handleChange, handleSubmit, error }) => {
  return (
    <Container fluid className="p-3">
      <Form
        onSubmit={(e) => {
          e.preventDefault(); // מונע את פעולת השליחה הברירת מחדל
          handleSubmit(e);
        }}
      >
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="currentAddress">
              <Form.Label>Current Address</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.currentAddress}
                type="text"
                placeholder="Current Address"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="familySize">
              <Form.Label>Number of Family Members</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.familySize}
                type="number"
                placeholder="Number of Family Members"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="children">
              <Form.Label>Number of Children</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.children}
                type="number"
                placeholder="Number of Children"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="adults">
              <Form.Label>Number of Adults</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.adults}
                type="number"
                placeholder="Number of Adults"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="babies">
              <Form.Label>Number of Babies</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.babies}
                type="number"
                placeholder="Number of Babies"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="pet">
              <Form.Check
                onChange={handleChange}
                checked={formData.pet}
                type="checkbox"
                label="Do you have pets?"
              />
            </Form.Group>
          </Col>
        </Row>

        {error && <p className="text-danger">{error}</p>}
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default EvacueeForm;
