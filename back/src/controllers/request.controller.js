import Request from "../models/request.model.js";
import Property from "../models/propertyOwner.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

// Send a new request
export const sendRequest = async (req, res, next) => {
  console.log("Request body for sending request:", req.body);
  const { propertyId, recipientId, message, startDate, endDate, senderId } =
    req.body;

  try {
    const property = await Property.findById(propertyId); // Use Id for lookup
    console.log("Property:", property);
    if (!property) {
      return next(errorHandler(404, "Property not found!"));
    }

    const newRequest = new Request({
      sender: senderId,
      recipient: recipientId,
      property: propertyId, // Use the ObjectId from the found property
      message,
      startDate,
      endDate,
    });
    console.log("New request:", newRequest);
    await newRequest.save();
    res.status(201).json("Request sent successfully!");
  } catch (error) {
    next(error);
  }
};

// Get a specific request by ID
export const getRequest = async (req, res, next) => {
  console.log("Request body for getting request:", req.body);
  try {
    const request = await Request.findById(req.params.id)
      .populate("sender", "username email avatar")
      .populate("recipient", "username email avatar")
      .populate("property", "name address");

    if (!request) {
      return next(errorHandler(404, "Request not found!"));
    }

    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

// Update a specific request by ID
export const updateRequest = async (req, res, next) => {
  const { status, startDate, endDate } = req.body;
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      {
        status,
        startDate,
        endDate,
      },
      { new: true }
    );

    if (!updatedRequest) {
      return next(errorHandler(404, "Request not found!"));
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    next(error);
  }
};

// Get all requests by a specific user
export const getRequestsByUser = async (req, res, next) => {
  console.log("Request body for getting requests by user:", req.params);
  const userId = new mongoose.Types.ObjectId(req.params.userId);

  console.log("User ID:", userId);
  try {
    const request = await Request.findOne({ sender: userId })
      .populate("property", "name address imageUrls")
      .populate("recipient", "username email");

    if (!request) {
      return next(errorHandler(404, "No requests found for this user!"));
    }

    console.log("Request:", request);
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};
// Delete a specific request by ID
export const deleteRequest = async (req, res, next) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json("Request has been deleted!");
  } catch (error) {
    next(error);
  }
};
