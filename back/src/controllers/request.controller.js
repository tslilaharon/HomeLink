import Request from "../models/request.model.js";
import PropertyOwner from "../models/propertyOwner.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

// שליחת בקשה חדשה
export const sendRequest = async (req, res, next) => {
  console.log("Request body for sending request:", req.body);
  const { propertyId, recipientId, message, startDate, endDate, senderId } =
    req.body;

  try {
    const property = await PropertyOwner.findById(propertyId);
    console.log("Property:", property);
    if (!property) {
      return next(errorHandler(404, "Property not found!"));
    }

    const newRequest = new Request({
      sender: senderId,
      recipient: recipientId,
      property: propertyId,
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

// קבלת בקשה ספציפית לפי ID
export const getRequest = async (req, res, next) => {
  console.log("Request body for getting request:", req.body);
  try {
    const request = await Request.findById(req.params.id)
      .populate("sender", "username email avatar")
      .populate("recipient", "username email avatar")
      .populate("property", "title address");

    if (!request) {
      return next(errorHandler(404, "Request not found!"));
    }

    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

// עדכון בקשה ספציפית לפי ID
export const updateRequest = async (req, res, next) => {
  const { status, startDate, endDate } = req.body;
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status, startDate, endDate },
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

// קבלת כל הבקשות לפי משתמש ספציפי
export const getRequestsByUser = async (req, res, next) => {
  console.log("Request body for getting requests by user:", req.params);
  const userId = new mongoose.Types.ObjectId(req.params.userId);

  console.log("User ID:", userId);
  try {
    const requests = await Request.find({ sender: userId })
      .populate("property", "title address imageUrls")
      .populate("recipient", "username email");

    if (!requests || requests.length === 0) {
      return next(errorHandler(404, "No requests found for this user!"));
    }

    console.log("Requests:", requests);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

// קבלת כל הבקשות לפי נכס ספציפי
export const getRequestsByProperty = async (req, res, next) => {
  console.log("Request body for getting requests by property:", req.params);
  const propertyId = new mongoose.Types.ObjectId(req.params.propertyId);

  console.log("Property ID:", propertyId);
  try {
    const requests = await Request.find({ property: propertyId })
      .populate("sender", "username email")
      .populate("recipient", "username email");

    if (!requests || requests.length === 0) {
      return next(errorHandler(404, "No requests found for this property!"));
    }

    console.log("Requests:", requests);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

// קבלת כל הבקשות לנכסים של משתמש ספציפי
export const getRequestsByUserProperties = async (req, res, next) => {
  console.log(
    "Request body for getting requests by user properties:",
    req.params
  );
  const userId = new mongoose.Types.ObjectId(req.params.userId);

  try {
    // מצא את כל הנכסים של המשתמש
    const properties = await PropertyOwner.find({ userId: userId });
    const propertyIds = properties.map((property) => property._id);

    // מצא את כל הבקשות עבור הנכסים האלה
    const requests = await Request.find({ property: { $in: propertyIds } })
      .populate("sender", "username email")
      .populate("recipient", "username email")
      .populate("property", "title address");

    if (!requests || requests.length === 0) {
      return next(
        errorHandler(404, "No requests found for properties of this user!")
      );
    }

    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

// מחיקת בקשה ספציפית לפי ID
export const deleteRequest = async (req, res, next) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json("Request has been deleted!");
  } catch (error) {
    next(error);
  }
};
