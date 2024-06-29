import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Form } from "react-bootstrap";
import axiosInstance from "../../axiosConfig";
import "../assets/styles/Style.css";

const PropertyRowListEvacuee = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("persist:root");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const user = JSON.parse(parsedData.user);
          const userId = user.currentUser._id;

          const response = await axiosInstance.get(
            `/api/request/user/${userId}`
          );

          const requests = Array.isArray(response.data)
            ? response.data
            : [response.data];

          const propertyRequests = await Promise.all(
            requests.map(async (request) => {
              const propertyResponse = await axiosInstance.get(
                `/api/property/get/${request.property._id}`
              );
              return {
                ...request,
                propertyDetails: propertyResponse.data,
              };
            })
          );

          setProperties(propertyRequests);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProperties([]);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = (property) => {
    setCurrentProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setContent("");
    setRating(1);
    setError(null);
    setCurrentProperty(null);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/comment", {
        propertyId: currentProperty.property._id,
        content,
        rating,
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment. Please try again.");
    }
  };

  const isPastEndDate = (endDate) => {
    const today = new Date();
    return new Date(endDate) < today;
  };

  return (
    <>
      {properties.length > 0 ? (
        properties.map((property) => (
          <div
            key={property._id}
            className="list-row"
            onClick={() => handleShowModal(property)}
            style={{ cursor: "pointer" }}
          >
            <Image
              className="list-img"
              src={property.propertyDetails.exteriorImage}
              width="100"
              height="100"
              alt="list img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "fallback-image-url";
              }}
            />
            <div className="list-text">
              <h5>{property.recipient.username}</h5>
              <p>{property.message}</p>
            </div>
            <div className="list-labels">
              <p>
                Start Date: {new Date(property.startDate).toLocaleDateString()}
              </p>
              <p>End Date: {new Date(property.endDate).toLocaleDateString()}</p>
            </div>
            <div className="list-changes">
              <span
                style={{
                  color: property.status === "accepted" ? "green" : "red",
                }}
              >
                {property.status}
              </span>
              {property.status === "accepted" &&
                isPastEndDate(property.endDate) && (
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowModal(property);
                    }}
                  >
                    Add Comment
                  </Button>
                )}
            </div>
          </div>
        ))
      ) : (
        <p>No requests found.</p>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          {currentProperty ? (
            <>
              <h5>{currentProperty.propertyDetails.title}</h5>
              <p>{currentProperty.propertyDetails.description}</p>
              <Image
                src={currentProperty.propertyDetails.exteriorImage}
                fluid
              />
              {currentProperty.status === "accepted" &&
                isPastEndDate(currentProperty.endDate) && (
                  <Form onSubmit={handleAddComment}>
                    <Form.Group controlId="commentContent">
                      <Form.Label>Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="commentRating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                      >
                        {[1, 2, 3, 4, 5].map((rate) => (
                          <option key={rate} value={rate}>
                            {rate}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Button variant="secondary" onClick={handleCloseModal}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Add Comment
                    </Button>
                  </Form>
                )}
            </>
          ) : (
            <p>Loading property details...</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PropertyRowListEvacuee;
