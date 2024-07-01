import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Dropdown,
  DropdownButton,
  Row,
  Col,
} from "react-bootstrap";
import { LiaFilterSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import axiosInstance from "../../axiosConfig";
import PropertyCard from "../components/PropertyCard";
import "../assets/styles/Style.css";

const Search = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isLoggedIn = !!currentUser;

  const [filters, setFilters] = useState({
    type: {
      house: false,
      apartment: false,
      studio: false,
    },
    facilities: {
      secureSpace: false,
      parking: false,
      balcony: false,
      airConditioning: false,
      disability: false,
      elevator: false,
      furnished: false,
    },
    rooms: {
      min: "",
      max: "",
    },
    beds: {
      min: "",
      max: "",
    },
    sortBy: "",
  });

  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const handlePropertyTypeChange = (type) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: {
        ...prevFilters.type,
        [type]: !prevFilters.type[type],
      },
    }));
  };

  const handleFacilityChange = (facility) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      facilities: {
        ...prevFilters.facilities,
        [facility]: !prevFilters.facilities[facility],
      },
    }));
  };

  const handleSortChange = (sortOption) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: sortOption,
    }));
  };

  const handleRoomChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rooms: {
        ...prevFilters.rooms,
        [field]: value,
      },
    }));
  };

  const handleBedChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      beds: {
        ...prevFilters.beds,
        [field]: value,
      },
    }));
  };

  const fetchProperties = async () => {
    try {
      const response = await axiosInstance.get("/api/property/get");
      setAllProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const applyFilters = () => {
    const { type, facilities, sortBy, rooms, beds } = filters;

    const filtered = allProperties.filter((property) => {
      const isPropertyTypeMatch = Object.keys(type)
        .filter((key) => type[key])
        .some((key) => key.toLowerCase() === property.HouseType.toLowerCase());

      const isFacilitiesMatch = Object.keys(facilities).every((facility) => {
        if (facilities[facility]) {
          const modelFacility =
            facility.charAt(0).toUpperCase() + facility.slice(1);
          return property[modelFacility] === true;
        }
        return true;
      });

      const isRoomMatch =
        (!rooms.min || property.NumberOfRooms >= rooms.min) &&
        (!rooms.max || property.NumberOfRooms <= rooms.max);

      const isBedMatch =
        (!beds.min || property.NumberOfBeds >= beds.min) &&
        (!beds.max || property.NumberOfBeds <= beds.max);

      return (
        (!Object.values(type).some(Boolean) || isPropertyTypeMatch) &&
        isFacilitiesMatch &&
        isRoomMatch &&
        isBedMatch
      );
    });

    const sorted = filtered.sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

    setFilteredProperties(sorted);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, allProperties]);

  return (
    <div>
      <section className="customized-sec">
        <div className="background-img">
          <div className="content-cust text-left m-3">
            {isLoggedIn ? (
              <>
                <h3>Customized to Your Preferences</h3>
              </>
            ) : (
              <>
                <h3>Welcome to Our HomeLink Platform</h3>
                <p>
                  Explore a wide range of properties tailored to your needs.
                  <br />
                  Please sign in to personalize your experience and save
                  preferences.
                </p>
                <Button variant="light" href="/signin">
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
      <section>
        <Container
          className="search-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5>
            <LiaFilterSolid /> Filter
          </h5>
          <DropdownButton id="dropdown-basic-button" title="Sort By">
            <Dropdown.Item onClick={() => handleSortChange("latest")}>
              Latest
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("oldest")}>
              Oldest
            </Dropdown.Item>
          </DropdownButton>
        </Container>
      </section>
      <section>
        <Row>
          <Col xs={12} md={4} lg={3}>
            <Container className="filter-container">
              <Form>
                <h5>Property Type</h5>
                <Form.Check
                  type="checkbox"
                  label="House"
                  id="house"
                  className="mb-3"
                  checked={filters.type.house}
                  onChange={() => handlePropertyTypeChange("house")}
                />
                <Form.Check
                  type="checkbox"
                  label="Apartment"
                  id="apartment"
                  className="mb-3"
                  checked={filters.type.apartment}
                  onChange={() => handlePropertyTypeChange("apartment")}
                />
                <Form.Check
                  type="checkbox"
                  label="Studio"
                  id="studio"
                  className="mb-3"
                  checked={filters.type.studio}
                  onChange={() => handlePropertyTypeChange("studio")}
                />
                <h5>Facilities</h5>
                <Form.Check
                  type="checkbox"
                  label="Secure space"
                  id="secureSpace"
                  className="mb-3"
                  checked={filters.facilities.secureSpace}
                  onChange={() => handleFacilityChange("secureSpace")}
                />
                <Form.Check
                  type="checkbox"
                  label="Parking"
                  id="parking"
                  className="mb-3"
                  checked={filters.facilities.parking}
                  onChange={() => handleFacilityChange("parking")}
                />
                <Form.Check
                  type="checkbox"
                  label="Balcony"
                  id="balcony"
                  className="mb-3"
                  checked={filters.facilities.balcony}
                  onChange={() => handleFacilityChange("balcony")}
                />
                <Form.Check
                  type="checkbox"
                  label="Air conditioning"
                  id="airConditioning"
                  className="mb-3"
                  checked={filters.facilities.airConditioning}
                  onChange={() => handleFacilityChange("airConditioning")}
                />
                <Form.Check
                  type="checkbox"
                  label="Disability"
                  id="disability"
                  className="mb-3"
                  checked={filters.facilities.disability}
                  onChange={() => handleFacilityChange("disability")}
                />
                <Form.Check
                  type="checkbox"
                  label="Elevator"
                  id="elevator"
                  className="mb-3"
                  checked={filters.facilities.elevator}
                  onChange={() => handleFacilityChange("elevator")}
                />
                <Form.Check
                  type="checkbox"
                  label="Furnished"
                  id="furnished"
                  className="mb-3"
                  checked={filters.facilities.furnished}
                  onChange={() => handleFacilityChange("furnished")}
                />
                <h5>Rooms</h5>
                <Form.Group controlId="rooms.min">
                  <Form.Label>Min Rooms</Form.Label>
                  <Form.Control
                    type="number"
                    value={filters.rooms.min}
                    onChange={(e) => handleRoomChange("min", e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="rooms.max">
                  <Form.Label>Max Rooms</Form.Label>
                  <Form.Control
                    type="number"
                    value={filters.rooms.max}
                    onChange={(e) => handleRoomChange("max", e.target.value)}
                  />
                </Form.Group>
                <h5>Beds</h5>
                <Form.Group controlId="beds.min">
                  <Form.Label>Min Beds</Form.Label>
                  <Form.Control
                    type="number"
                    value={filters.beds.min}
                    onChange={(e) => handleBedChange("min", e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="beds.max">
                  <Form.Label>Max Beds</Form.Label>
                  <Form.Control
                    type="number"
                    value={filters.beds.max}
                    onChange={(e) => handleBedChange("max", e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Container>
          </Col>
          <Col xs={12} md={8} lg={9}>
            <Row>
              {filteredProperties.map((property) => (
                <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
                  <PropertyCard property={property} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Search;
