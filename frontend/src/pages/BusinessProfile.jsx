import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyRowList from "../components/PropertyRowList";
import { useSelector } from "react-redux";
import { Container, Button, Badge, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegEdit, FaRegEnvelope } from "react-icons/fa";
import PropertyOwnerForm from "./PropertyOwnerForm";

import "../assets/styles/Style.css";

const BusinessProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [properties, setProperties] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [requests, setRequests] = useState([]); // state לבקשות

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    Area: "",
    HouseType: "",
    City: "",
    Street: "",
    HouseNumber: "",
    NumberOfRooms: "",
    NumberOfBeds: "",
    Balcony: false,
    Disability: false,
    Elevator: false,
    Furnished: false,
    Parking: false,
    AirCondition: false,
    SecureSpace: false,
    interiorImages: [""],
    exteriorImage: "",
  });
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          `https://homelink-nyna.onrender.com/api/property/user/${currentUser._id}`
        );
        setProperties(res.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [currentUser._id]);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (property) => {
    setFormData({ ...property });
    setSelectedPropertyId(property._id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleChange = (e, index = null) => {
    const { id, value, type, checked } = e.target;
    if (index !== null) {
      const updatedImages = formData.interiorImages.map((image, i) =>
        i === index ? value : image
      );
      setFormData({ ...formData, interiorImages: updatedImages });
    } else {
      setFormData({
        ...formData,
        [id]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleShowRequestsModal = async () => {
    try {
      const res = await axios.get(
        `https://homelink-nyna.onrender.com/api/request/user/${currentUser._id}/properties`
      );
      setRequests(res.data);
      setShowRequestsModal(true);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleCloseRequestsModal = () => setShowRequestsModal(false);

  const handleRequestStatusChange = async (requestId, status) => {
    try {
      const res = await axios.put(
        `https://homelink-nyna.onrender.com/api/request/${requestId}`,
        { status }
      );
      setRequests(
        requests.map((request) =>
          request._id === requestId ? res.data : request
        )
      );
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const addInteriorImageField = () => {
    setFormData({
      ...formData,
      interiorImages: [...formData.interiorImages, ""],
    });
  };

  const removeInteriorImageField = (index) => {
    setFormData((prevState) => {
      const updatedImages = prevState.interiorImages.filter(
        (_, i) => i !== index
      );
      return {
        ...prevState,
        interiorImages: updatedImages,
      };
    });
  };

  const handleSubmitAdd = async () => {
    try {
      const res = await axios.post(
        "https://homelink-nyna.onrender.com/api/property/create",
        {
          ...formData,
          userId: currentUser._id,
        }
      );
      setProperties([...properties, res.data]);
      handleCloseAddModal();
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      console.log("id: "+ propertyId)
      await axios.delete(`https://homelink-nyna.onrender.com/api/property/${propertyId}`);
      setProperties(
        properties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const res = await axios.put(
        `https://homelink-nyna.onrender.com/api/property/update/${selectedPropertyId}`,
        formData
      );
      setProperties(
        properties.map((property) =>
          property._id === selectedPropertyId ? res.data : property
        )
      );
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Container className="profile-container">
      <div className="profile-section">
        <div className="profile-part">
          <div className="profile-image">
            <Badge pill bg="primary" className="badge-icon">
              {getInitial(currentUser.username)}
            </Badge>
          </div>

          <div className="profile-details">
            <div className="profile-text">
              <h4>{currentUser.username}</h4>
              <Link to={"/edit-business-profile"}>
                <FaRegEdit />
              </Link>
            </div>
            <p>{currentUser.email}</p>
          </div>
        </div>

        <div className="profile-part">
          <div className="profile-link" onClick={handleShowRequestsModal}>
            <FaRegEnvelope />
            <span>Requests</span>
          </div>
        </div>
      </div>
      <div className="profile-list">
        <div className="list-header">
          <h2>Properties list</h2>
          <Button variant="dark" onClick={handleShowAddModal}>
            Add Property
          </Button>
        </div>
        <div className="list-body">
          {properties.map((property) => (
            <PropertyRowList
              key={property._id}
              property={property}
              onEdit={() => handleShowEditModal(property)}
              onDelete={() => handleDeleteProperty(property._id)}
              onShowRequests={() => handleShowRequestsModal(property._id)} // הוספת קריאה למודאל הבקשות
            />
          ))}
        </div>
      </div>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PropertyOwnerForm
            formData={formData}
            handleChange={handleChange}
            addInteriorImageField={addInteriorImageField}
            removeInteriorImageField={removeInteriorImageField}
            handleSubmit={handleSubmitAdd}
            error={null}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PropertyOwnerForm
            formData={formData}
            handleChange={handleChange}
            addInteriorImageField={addInteriorImageField}
            removeInteriorImageField={removeInteriorImageField}
            handleSubmit={handleSubmitEdit}
            error={null}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showRequestsModal} onHide={handleCloseRequestsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {requests.map((request) => (
              <li key={request._id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Property:</strong> {request.property.title}
                    <br />
                    <strong>Sender:</strong> {request.sender.username} (
                    {request.sender.email})<br />
                    <strong>Recipient:</strong> {request.recipient.username} (
                    {request.recipient.email})<br />
                    <strong>Message:</strong> {request.message}
                    <br />
                    <strong>Start Date:</strong>{" "}
                    {new Date(request.startDate).toLocaleDateString()}
                    <br />
                    <strong>End Date:</strong>{" "}
                    {new Date(request.endDate).toLocaleDateString()}
                    <br />
                    <strong>Status:</strong>
                  </div>
                  <Form.Select
                    value={request.status}
                    onChange={(e) =>
                      handleRequestStatusChange(request._id, e.target.value)
                    }
                    className="w-auto"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </Form.Select>
                </div>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRequestsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BusinessProfile;
