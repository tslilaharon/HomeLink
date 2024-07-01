import express from "express";
import {
  sendRequest,
  getRequest,
  updateRequest,
  deleteRequest,
  getRequestsByUser,
  getRequestsByProperty,
  getRequestsByUserProperties, // הוסף את הפונקציה החדשה
} from "../controllers/request.controller.js";

const router = express.Router();

// Route to send a new request
router.post("/", sendRequest);

// Route to get a specific request by ID
router.get("/:id", getRequest);

// Route to update a specific request by ID
router.put("/:id", updateRequest);

// Route to delete a specific request by ID
router.delete("/:id", deleteRequest);

// Route to get requests by user ID
router.get("/user/:userId", getRequestsByUser);

router.get("/property/:propertyId", getRequestsByProperty); // Add the new route

router.get("/user/:userId/properties", getRequestsByUserProperties);

export default router;
