import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
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
        <h2>Most Popular Properties</h2>
      </section>

      <section className="most-recent mt-5">
        <h2>Newest Properties</h2>
      </section>
    </div>
  );
};

export default Home;
