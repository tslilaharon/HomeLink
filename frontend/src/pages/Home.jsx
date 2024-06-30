import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, CardGroup, Button } from "react-bootstrap";
import PropertyCard from "../components/PropertyCard";
import axios from "axios";
import "../assets/styles/Style.css";

const Home = () => {
  const [popularProperties, setPopularProperties] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const popularResponse = await axios.get(
          "https://homelink-nyna.onrender.com/api/property/get?limit=4&sort=Popularity&order=desc"
        );
        console.log("Popular Properties Response:", popularResponse.data);
        const recentResponse = await axios.get(
          "https://homelink-nyna.onrender.com/api/property/get?limit=4&sort=createdAt&order=desc"
        );
        console.log("Recent Properties Response:", recentResponse.data);

        setPopularProperties(popularResponse.data);
        setRecentProperties(recentResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="">
      <section className="find-a-house">
        <div className="background-image">
          <div className="content text-left m-3">
            <h2>Find A House</h2>
            <h2>That Suits You</h2>
{/*             <p>
              Want to find a home? We are ready to help you find one that suits
              your lifestyle and needs.
            </p> */}
            <Button variant="light">Get Started</Button>
          </div>
        </div>
      </section>

      <section className="most-popular m-5">
        <div className="home-row">
          <h2>Most Popular Properties</h2>
          <Link to="/all-properties">
            <Button variant="outline-dark" size="sm">
              See All
            </Button>
          </Link>
        </div>
        <div className="container-propertycard m-5">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            popularProperties.map((property) => (
              <PropertyCard property={property} />
            ))
          )}
        </div>
      </section>

      <section className="most-recent m-5">
        <div className="home-row">
          <h2>Newest Properties</h2>
          <Link to="/all-properties">
            <Button variant="outline-dark" size="sm">
              See All
            </Button>
          </Link>
        </div>
        <div className="container-propertycard m-5">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            recentProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
