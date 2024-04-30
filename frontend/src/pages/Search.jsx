import React, { useState } from 'react';
import { Button, Container, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { LiaFilterSolid } from "react-icons/lia";
import { useSelector } from 'react-redux';

const Search = () => {
  const { currentUser } = useSelector(state => state.user);
  const isLoggedIn = !!currentUser;

  const [filters, setFilters] = useState({
    propertyType: {
      apartment: false,
      standalone: false,
      guestHouse: false
    },
    facilities: {
      secureSpace: false,
      parking: false,
      balcony: false,
      airConditioning: false
    },
    sortBy: ''
  });

  const handlePropertyTypeChange = (type) => {
    setFilters({
      ...filters,
      propertyType: {
        ...filters.propertyType,
        [type]: !filters.propertyType[type]
      }
    });
  };

  const handleFacilityChange = (facility) => {
    setFilters({
      ...filters,
      facilities: {
        ...filters.facilities,
        [facility]: !filters.facilities[facility]
      }
    });
  };

  const handleSortChange = (sortOption) => {
    setFilters({
      ...filters,
      sortBy: sortOption
    });
  };

  const fetchFilteredProperties = () => {
  };

  React.useEffect(() => {
    fetchFilteredProperties();
  }, [filters]);

  return (
    <div>
      <section className="customized-sec">
        <div className="background-img">
          <div className="content-cust text-left m-3">
            {isLoggedIn ? (
              <>
                <h3>Customized to Your Preferences</h3>
                <p>
                  Discover properties that perfectly match your preferences,<br />
                  Based on the settings you specified at the beginning of the process.<br />
                  To make adjustments, simply click 'Edit Profile'.
                </p>
                <Button variant="light">Edit Profile</Button>
              </>
            ) : (
              <>
                <h3>Welcome to Our HomeLink Platform</h3>
                <p>
                  Explore a wide range of properties tailored to your needs.<br />
                  Please sign in to personalize your experience and save preferences.
                </p>
                <Button variant="light" href="/signin">Sign In</Button>
              </>
            )}
          </div>
        </div>
      </section>
      <section>
        <Container className="search-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h5><LiaFilterSolid /> Filter</h5>
          <DropdownButton id="dropdown-basic-button" title="Sort By">
            <Dropdown.Item onClick={() => handleSortChange('price-high-to-low')}>Price high to low</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange('price-low-to-high')}>Price low to high</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange('latest')}>Latest</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange('oldest')}>Oldest</Dropdown.Item>
          </DropdownButton>
        </Container>
        <Container className="filter-container">
          <Form>
            <h5>Property Type</h5>
            <Form.Check type="checkbox" label="Apartment" id="apartment" className="mb-3" onChange={() => handlePropertyTypeChange('apartment')} />
            <Form.Check type="checkbox" label="Standalone Property" id="standaloneProperty" className="mb-3" onChange={() => handlePropertyTypeChange('standalone')} />
            <Form.Check type="checkbox" label="Guest House" id="guestHouse" className="mb-3" onChange={() => handlePropertyTypeChange('guestHouse')} />
            <h5>Facilities</h5>
            <Form.Check type="checkbox" label="Secure space" id="secureSpace" className="mb-3" onChange={() => handleFacilityChange('secureSpace')} />
            <Form.Check type="checkbox" label="Parking" id="parking" className="mb-3" onChange={() => handleFacilityChange('parking')} />
            <Form.Check type="checkbox" label="Balcony" id="balcony" className="mb-3" onChange={() => handleFacilityChange('balcony')} />
            <Form.Check type="checkbox" label="Air conditioning" id="airConditioning" className="mb-3" onChange={() => handleFacilityChange('airConditioning')} />
          </Form>
        </Container>
      </section>
    </div>
  );
}

export default Search;
