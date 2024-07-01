import React, { useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "../assets/styles/Style.css";

const PropertyRowList = ({ property, onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    onDelete(property._id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="list-row">
        <Image
          className="list-img"
          src={property.exteriorImage || "default-image-url"}
          width="100"
          height="100"
          alt="list img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "fallback-image-url";
          }} // Fallback image
        />
        <div className="list-text">
          <h5>
            {property.Street}, {property.City}, {property.Area}
          </h5>
          <p>{property.description}</p>
        </div>
        <div className="list-labels">
          <Button variant="outline-dark" size="sm" disabled>
            {property.Area}
          </Button>
          <Button variant="outline-dark" size="sm" disabled>
            {property.City}
          </Button>
          <Button variant="outline-dark" size="sm" disabled>
            {property.NumberOfBeds} Beds
          </Button>
          <Button variant="outline-dark" size="sm" disabled>
            {property.Parking ? "Parking" : "No Parking"}
          </Button>
        </div>
        <div className="list-changes">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={onEdit}
            className="edit-btn"
          >
            <FaRegEdit />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => setShowDeleteModal(true)}
            className="delete-btn"
          >
            <FaRegTrashAlt />
          </Button>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this property? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyRowList;
