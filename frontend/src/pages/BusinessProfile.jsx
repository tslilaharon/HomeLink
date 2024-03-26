import React from 'react';
import { Container, Button } from 'react-bootstrap';
import '../assets/styles/Style.css';
import { useSelector } from 'react-redux';

const BusinessProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <Container className="profile-container">
            <div className="profile-section">
                <div className="profile-part">
                    <div className="profile-image">
                    </div>
                    <div className="profile-details">
                        <h2>{currentUser.username}</h2>
                        <p>oshribar@gmail.com</p>
                    </div>
                    <div className="edit-icon">
                    </div>
                </div>
            </div>
            <div className="profile-section">
                <div className="profile-part">
                    <div className="icon">
                    </div>
                    <div className="profile-details">
                        <p>Order History</p>
                    </div>
                </div>
            </div>
            <div className="profile-section">
                <div className="profile-part">
                    <div className="icon">
                    </div>
                    <div className="profile-details">
                        <p>Requests</p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default BusinessProfile;
