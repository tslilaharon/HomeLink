import React from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../assets/styles/Style.css';
import { useSelector } from 'react-redux';
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";

const BusinessProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <Container className="profile-container">
            <div className="profile-section">
                <div className="profile-part">
                    <div className="profile-image">
                        <Image src={currentUser.avatar}
                            width="60"
                            height="60"
                            alt='profile' />
                    </div>
                    <div className="profile-details">
                        <div className="profile-text">
                            <h4>{currentUser.username}</h4>
                            <Link to={"/edit-business-profile"}>
                                <FaPenSquare />
                            </Link>

                        </div>
                        <p>{currentUser.email}</p>
                    </div>
                    <div className="edit-icon">
                    </div>
                </div>
                <div className="profile-part">
                    <div className="icon">
                    </div>
                    <div className="profile-details">
                        <p>Order History</p>
                    </div>
                </div>
                <div className="profile-part">
                    <div className="icon"></div>
                    <div className="profile-details">
                        <p>Requests</p>
                    </div>
                </div>
            </div>
            <div className="profile-list">
                <div className="list-header">
                    <h2>Properties list</h2>
                    <Button variant="dark">Add Property</Button>
                </div>
                <div className="list-body">
                    <div className="list-row">
                        <Image
                            className="list-img"
                            src="https://images.unsplash.com/photo-1571742422028-0f7ca4b37d49?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            width="100"
                            height="100"
                            alt={currentUser.username} />
                        <div className="list-text">
                            <h5>17 Haven Street, Tel Aviv, Israel</h5>
                            <p>4-room apartment in central Tel Aviv provides a serene retreat amidst the city's bustling. </p>
                        </div>
                        <div className="list-labels">
                            <Button variant="outline-dark" size="sm" disabled >Gush Dan</Button>
                            <Button variant="outline-dark" size="sm" disabled >Tel Aviv</Button>
                            <Button variant="outline-dark" size="sm" disabled >2 Beds</Button>
                            <Button variant="outline-dark" size="sm" disabled >Pet</Button>
                        </div>
                        <div className="list-changes">
                            <Button variant="outline-dark"><FaPenSquare /></Button>
                            <Button variant="outline-dark"><FaTrashAlt /></Button>
                        </div>

                    </div>
                </div>
            </div>

        </Container>
    );
};

export default BusinessProfile;
