import PropertyOwner from "../models/propertyOwner.model.js";
import { errorHandler } from "../utils/error.js";

export const getProperty = async (req, res, next) => {
  console.log("Fetching property...");
  try {
    const property = await PropertyOwner.findById(req.params.id);
    if (!property) {
      return next(errorHandler(404, "Property not found!"));
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};
export const getPropertyById = async (req, res, next) => {
  try {
    const property = await PropertyOwner.findOne({ Id: req.params.Id });
    if (!property) {
      return next(errorHandler(404, "Property not found!"));
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const property = await PropertyOwner.findByIdAndDelete(req.params.id);
    if (!property) {
      console.log("Property not found!");
      return next(errorHandler(404, "Property not found!"));
    }

    console.log("Property deleted successfully!");
    res.status(200).json({ message: "Property deleted successfully!" });
  } catch (error) {
    console.error("Error deleting property:", error);
    next(error);
  }
};

export const getProperties = async (req, res, next) => {
  try {
    console.log("Fetching properties...");

    const properties = await PropertyOwner.find(); 

    console.log("Properties fetched:", properties);

    res.status(200).json(properties);
  } catch (error) {
    console.log("Error fetching properties:", error);
    next(error);
  }
};
export const getPropertiesByUserId = async (req, res, next) => {
  try {
    const properties = await PropertyOwner.find({ userId: req.params.userId });
    if (!properties) {
      return next(errorHandler(404, "Properties not found!"));
    }
    res.status(200).json(properties);
  } catch (error) {
    console.log("Error fetching properties by user ID:", error);
    next(error);
  }
};

export const createProperty = async (req, res, next) => {
  console.log("Request body for creating property:", req.body); // Log the request body

  const {
    userId,
    title,
    description,
    Id,
    Area,
    HouseType,
    City,
    Street,
    HouseNumber,
    NumberOfRooms,
    NumberOfBeds,
    Balcony,
    Disability,
    Elevator,
    Furnished,
    Parking,
    AirCondition,
    SecureSpace,
    interiorImages,
    exteriorImage,
    Popularity,
  } = req.body;

  const newProperty = new PropertyOwner({
    userId,
    title,
    description,
    Id,
    Area,
    HouseType,
    City,
    Street,
    HouseNumber,
    NumberOfRooms,
    NumberOfBeds,
    Balcony,
    Disability,
    Elevator,
    Furnished,
    Parking,
    AirCondition,
    SecureSpace,
    interiorImages,
    exteriorImage,
    Popularity,
  });

  try {
    const savedProperty = await newProperty.save();
    console.log("Property saved successfully:", savedProperty); // Log the saved property
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Error saving property:", error); // Log the error
    next(error);
  }
};
export const updateProperty = async (req, res, next) => {
  try {
    const property = await PropertyOwner.findById(req.params.id);
    if (!property) {
      return next(errorHandler(404, "Property not found!"));
    }

    const updatedProperty = await PropertyOwner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    console.log("Property updated successfully:", updatedProperty); // Log the updated property
    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error); // Log the error
    next(error);
  }
};
