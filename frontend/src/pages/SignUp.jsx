import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Style.css";
import OAuth from "../components/OAuth";
import axios from "axios";
import UserTypeSelection from "../components/UserTypeSelection"; // Import the new component
import PropertyOwnerForm from "./PropertyOwnerForm"; // Import PropertyOwnerForm component
import EvacueeForm from "./EvacueeForm"; // Import EvacueeForm component

const SignUp = () => {
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    avatar: "",
  });
  const [propertyData, setPropertyData] = useState({
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
  const [familyData, setFamilyData] = useState({
    currentAddress: "",
    familySize: 0, // Change to number to match input type
    children: 0,
    adults: 0,
    babies: 0,
    pet: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // New state to handle registration status
  const [userId, setUserId] = useState(null); // New state to store userId

  const navigate = useNavigate();

  const handleUserChange = (e) => {
    const { id, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handlePropertyChange = (e, index = null) => {
    const { id, value, type, checked } = e.target;
    if (index !== null) {
      const updatedImages = propertyData.interiorImages.map((image, i) =>
        i === index ? value : image
      );
      setPropertyData({ ...propertyData, interiorImages: updatedImages });
    } else {
      setPropertyData({
        ...propertyData,
        [id]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleFamilyChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFamilyData({
      ...familyData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const addInteriorImageField = () => {
    setPropertyData({
      ...propertyData,
      interiorImages: [...propertyData.interiorImages, ""],
    });
  };

  const removeInteriorImageField = (index) => {
    setPropertyData((prevState) => {
      const updatedImages = prevState.interiorImages.filter(
        (_, i) => i !== index
      );
      return {
        ...prevState,
        interiorImages: updatedImages,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userType) {
      setError("Please select if you are a property owner or a tenant.");
      return;
    }

    // בדוק שהשדות הנדרשים מלאים
    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.fullName
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:4000/api/auth/signup`,
        { ...userData, userType },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Server response:", res.data); // Logging the server response
      if (res.data && res.data._id) {
        setLoading(false);
        setUserId(res.data._id); // Store userId
        console.log("User ID:", res.data._id); // Logging the userId
        setError(null);
        setIsRegistered(true); // Set registration status to true
      } else {
        setLoading(false);
        setError(res.data);
      }
    } catch (error) {
      console.error("Error during signup:", error); // Logging the error
      setLoading(false);
      setError(error.message);
    }
  };

  const handleCreateProperty = async () => {
    console.log("Property data:", propertyData);
    console.log("User ID:", userId);
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:4000/api/property/create`,
        { ...propertyData, userId }, // Add userId to property data
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Property created response:", res.data); // Logging the server response
      if (res.status === 201) {
        setLoading(false);
        setError(null);
        navigate("/"); // Navigate to properties page or desired page
      } else {
        setLoading(false);
        setError(res.data);
      }
    } catch (error) {
      console.error("Error during property creation:", error); // Logging the error
      setLoading(false);
      setError(error.message);
    }
  };
  const handleCreateTenant = async (e) => {
    e.preventDefault(); // מונע את פעולת השליחה הברירת מחדל
    console.log("handleCreateTenant called");
    try {
      const tenantData = {
        userId,
        familySize: familyData.familySize,
        preferredArea: familyData.currentAddress,
        rooms: 0, // or appropriate value
        children: familyData.children,
        adults: familyData.adults,
        babies: familyData.babies,
        pet: familyData.pet,
      };

      const res = await axios.post(
        `http://localhost:4000/api/tenant/create`,
        tenantData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Tenant created response:", res.data); // Logging the server response
      console.log("Tenant created response status:", res.status); // Logging the server response status
      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        setError(null);
        alert("Tenant created successfully"); // Show success message
        navigate("/"); // Navigate to properties page or desired page
      } else {
        setLoading(false);
        setError(res.data);
      }
    } catch (error) {
      console.error("Error during tenant creation:", error); // Logging the error
      setLoading(false);
      setError(error.message);
    }
  };

  if (isRegistered) {
    return (
      <>
        {userType === "propertyOwner" && (
          <PropertyOwnerForm
            formData={propertyData}
            handleChange={handlePropertyChange}
            addInteriorImageField={addInteriorImageField}
            removeInteriorImageField={removeInteriorImageField}
            handleSubmit={handleCreateProperty} // Use handleCreateProperty for submission
            error={error}
          />
        )}
        {userType === "tenant" && (
          <EvacueeForm
            formData={familyData}
            handleChange={handleFamilyChange}
            handleSubmit={handleCreateTenant} // Use handleCreateTenant for submission
            error={error}
          />
        )}
      </>
    );
  }

  return (
    <>
      {!userType && <UserTypeSelection setUserType={setUserType} />}

      {userType && (
        <>
          <Form onSubmit={handleSubmit} className="signup-form m-5">
            {userType === "propertyOwner" ? (
              <h1 className="text-center">Property Owner Sign Up</h1>
            ) : (
              <h1 className="text-center">Tenant Sign Up</h1>
            )}
            <Container fluid className="p-3">
              <Row className="mb-4">
                <Col>
                  <Form.Group controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      onChange={handleUserChange}
                      value={userData.username}
                      type="text"
                      placeholder="User Name"
                      isInvalid={
                        !!error &&
                        typeof error === "string" &&
                        error.includes("username")
                      }
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {error &&
                      typeof error === "string" &&
                      error.includes("username")
                        ? error
                        : ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      onChange={handleUserChange}
                      value={userData.fullName}
                      type="text"
                      placeholder="Full Name"
                      isInvalid={
                        !!error &&
                        typeof error === "string" &&
                        error.includes("fullName")
                      }
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {error &&
                      typeof error === "string" &&
                      error.includes("fullName")
                        ? error
                        : ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      onChange={handleUserChange}
                      value={userData.email}
                      type="email"
                      placeholder="Enter email"
                      isInvalid={
                        !!error &&
                        typeof error === "string" &&
                        error.includes("email")
                      }
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {error &&
                      typeof error === "string" &&
                      error.includes("email")
                        ? error
                        : ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      onChange={handleUserChange}
                      value={userData.password}
                      type="password"
                      placeholder="Password"
                      isInvalid={
                        !!error &&
                        typeof error === "string" &&
                        error.includes("password")
                      }
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {error &&
                      typeof error === "string" &&
                      error.includes("password")
                        ? error
                        : ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Button
                disabled={loading}
                className="m-3"
                variant="dark"
                type="submit"
              >
                {loading ? "Loading..." : "Sign Up"}
              </Button>
              <OAuth />
              <p>
                Member?
                <Link to="/sign-in"> Sign In</Link>
              </p>
            </Container>
            {error &&
              typeof error === "string" &&
              !error.includes("username") &&
              !error.includes("email") &&
              !error.includes("password") && <p>{error}</p>}
          </Form>
        </>
      )}
    </>
  );
};

export default SignUp;
