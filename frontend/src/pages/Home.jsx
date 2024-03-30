import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, CardGroup, Button } from 'react-bootstrap';
import PropertyCard from '../components/PropertyCard'
import '../assets/styles/Style.css';


const Home = () => {
  return (
    <div className="">
      <section className="find-a-house">
        <div className="background-image">
          <div className="content text-left">
            <h2>Find A House</h2>
            <h2>That Suits You</h2>
            <p>
              Want to find a home? We are ready to help you find
              one that suits your lifestyle and needs.
            </p>
            <Button variant="light">Get Started</Button>
          </div>
        </div>
      </section>

      <section className="most-popular mt-5">
        <div className="home-row">
          <h2>Most Popular Properties</h2>
          <Button variant="outline-dark" size="sm">See All</Button>
        </div>
        <CardGroup>
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </CardGroup>

      </section>

      <section className="most-recent mt-5">
        <div className="home-row">
          <h2>Newest Properties</h2>
          <Button variant="outline-dark" size="sm">See All</Button>
        </div>
        <CardGroup>
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </CardGroup>
      </section>
    </div>
  );
};

export default Home;
