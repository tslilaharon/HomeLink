import Tenant from "../models/tenant.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new tenant
export const createTenant = async (req, res, next) => {
  const {
    userId,
    familySize,
    preferredArea,
    rooms,
    children,
    adults,
    babies,
    pet,
  } = req.body;

  console.log("Request body for creating tenant:", req.body); // Log the request body

  const newTenant = new Tenant({
    userId,
    familySize,
    preferredArea,
    rooms,
    children,
    adults,
    babies,
    pet,
  });

  try {
    const savedTenant = await newTenant.save();
    res.status(201).json(savedTenant);
  } catch (error) {
    console.error("Error saving tenant:", error); // Log the error
    next(errorHandler(500, "Error saving tenant"));
  }
};

// Get a tenant by ID
export const getTenant = async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return next(errorHandler(404, "Tenant not found!"));
    }
    res.status(200).json(tenant);
  } catch (error) {
    next(errorHandler(500, "Error retrieving tenant"));
  }
};

// Get all tenants
export const getTenants = async (req, res, next) => {
  try {
    const tenants = await Tenant.find();
    res.status(200).json(tenants);
  } catch (error) {
    next(errorHandler(500, "Error retrieving tenants"));
  }
};

// Update a tenant by ID
export const updateTenant = async (req, res, next) => {
  const { familySize, preferredArea, rooms, children, adults, babies, pet } =
    req.body;

  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      {
        familySize,
        preferredArea,
        rooms,
        children,
        adults,
        babies,
        pet,
      },
      { new: true }
    );

    if (!updatedTenant) return next(errorHandler(404, "Tenant not found!"));

    res.status(200).json(updatedTenant);
  } catch (error) {
    next(errorHandler(500, "Error updating tenant"));
  }
};

// Delete a tenant by ID
export const deleteTenant = async (req, res, next) => {
  try {
    await Tenant.findByIdAndDelete(req.params.id);
    res.status(200).json("Tenant has been deleted.");
  } catch (error) {
    next(errorHandler(500, "Error deleting tenant"));
  }
};
