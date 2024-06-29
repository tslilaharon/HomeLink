import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form, Spinner, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import axiosInstance from "../../axiosConfig";
import "react-datepicker/dist/react-datepicker.css";

const PropertyCard = ({ property }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleCloseModals = () => {
    setShowDetailsModal(false);
    setShowRequestModal(false);
    setRequestMessage("");
    setStartDate(null);
    setEndDate(null);
    setError(null);
  };

  const handleShowDetails = async () => {
    setShowDetailsModal(true);
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/comment/${property._id}`);
      setComments(response.data);
    } catch (error) {
      setError("Failed to fetch comments.");
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowRequestForm = () => setShowRequestModal(true);
  const handleRequestMessageChange = (e) => setRequestMessage(e.target.value);

  const handleSendRequest = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !requestMessage) {
      setError("All fields are required.");
      return;
    }

    try {
      const requestData = {
        senderId: currentUser._id,
        propertyId: property._id,
        recipientId: property.userId,
        message: requestMessage,
        startDate,
        endDate,
      };

      const response = await axiosInstance.post("/api/request", requestData);
      console.log("Request sent:", response.data);
      handleCloseModals();
    } catch (err) {
      console.error("Error sending request:", err);
      setError("Failed to send request. Please try again.");
    }
  };

  if (!property) {
    return null; // Return null if property is not defined
  }

  return (
    <>
      <Card className="m-5" style={{ width: "18rem", minHeight: "400px" }}>
        <Card.Img
          variant="top"
          src={property.exteriorImage || ""}
          alt={property.name || "Property Image"}
          style={{
            minHeight: "200px",
            objectFit: "cover",
          }}
        />
        <Card.Body>
          <Card.Title>{property.name || "Unnamed Property"}</Card.Title>
          <Card.Text>
            {property.description || "No description available"}
          </Card.Text>
          <Button variant="dark" onClick={handleShowDetails}>
            More Details
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showDetailsModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>{property.name || "Unnamed Property"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <>
              <p>
                <strong>Description:</strong>{" "}
                {property.description || "No description available"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${property.Street} - ${
                  property.City || "No city available"
                }` || "No address available"}
              </p>
              <p>
                <strong>Bathrooms:</strong> {property.bathrooms}
              </p>
              <p>
                <strong>Bedrooms:</strong> {property.NumberOfRooms}
              </p>
              <p>
                <strong>Furnished:</strong> {property.Furnished ? "Yes" : "No"}
              </p>
              <p>
                <strong>Parking:</strong> {property.Parking ? "Yes" : "No"}
              </p>
              <p>
                <strong>Type:</strong> {property.HouseType}
              </p>
              <p>
                <strong>Offer:</strong> {property.offer ? "Yes" : "No"}
              </p>
              <p>
                <strong>Region:</strong> {property.Area}
              </p>
              <p>
                <strong>User Reference:</strong> {property.userRef}
              </p>
              {property.interiorImages.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`property_image_${index}`}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              ))}
              <h5>Comments:</h5>
              {comments?.length > 0 ? (
                comments?.map((comment) => (
                  <div key={comment._id}>
                    <p>
                      <strong>{comment.user.username}:</strong>{" "}
                      {comment.content}
                    </p>
                    <p>Rating: {comment.rating}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </>
          )}
        </Modal.Body>
        {currentUser?.userType === "tenant" && (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModals}>
              Close
            </Button>
            <Button variant="primary" onClick={handleShowRequestForm}>
              Send a Request
            </Button>
          </Modal.Footer>
        )}
      </Modal>

      <Modal show={showRequestModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Send a Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSendRequest}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy/MM/dd"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="requestMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={requestMessage}
                onChange={handleRequestMessageChange}
                placeholder="Write your request message here..."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Request
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyCard;
