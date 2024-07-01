import express from "express";
import {
  getProperty,
  getProperties,
  createProperty,
  getPropertiesByUserId,
  updateProperty,
  getPropertyById,
  deleteProperty,
} from "../controllers/property.controller.js";

const router = express.Router();

router.get("/get/:id", getProperty);
router.get("/getByNum/:Id", getPropertyById);

router.get("/get", getProperties);
router.get("/user/:userId", getPropertiesByUserId);
router.post("/create", createProperty);
router.put("/update/:id", updateProperty);
router.delete("/delete/:id", deleteProperty);

export default router;
