import React from "react";
import { Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropertyRowList from "../components/PropertyRowList";
import { useDispatch } from "react-redux";
import { FaRegEdit, FaRegClock, FaRegEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../assets/styles/Style.css";
import { useSelector } from "react-redux";
import PropertyRowListEvacuee from "../components/PropertyRowListEvacuee";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    debugger;
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      localStorage.removeItem("persist:root"); // Delete persist:root from localStorage
      localStorage.removeItem("userId"); // Delete userId from localStorage
      dispatch(deleteUserSuccess(data));
      navigate("/");
      alert("You have successfully signed out.");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <Container className="profile-container">
      <div className="profile-section">
        <div className="profile-part">
          <div className="profile-image">
            <Image
              src={currentUser.avatar}
              width="60"
              height="60"
              alt="profile"
            />
          </div>

          <div className="profile-details">
            <div className="profile-text">
              <h4>{currentUser.username}</h4>
              <Link to={"/edit-profile"}>
                <FaRegEdit />
              </Link>
            </div>
            <p>{currentUser.email}</p>
          </div>
        </div>

        <div className="profile-part">
          <div className="profile-link">
            <FaRegClock />
            <span>Order History</span>
          </div>
        </div>
      </div>

      <div className="profile-list">
        <div className="list-header">
          <h2>Request list</h2>
        </div>
        <div className="list-body">
          <PropertyRowListEvacuee />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          onClick={() => {
            handleSignOut();
          }}
          variant="danger"
          className="ml-2"
          style={{
            width: "200px",
            height: "50px",
            borderRadius: "10px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Sign Out
        </Button>
      </div>
    </Container>
  );
};

export default UserProfile;
