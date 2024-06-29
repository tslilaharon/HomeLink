import express from "express";
import {
  createTenant,
  getTenant,
  getTenants,
  updateTenant,
  deleteTenant,
} from "../controllers/tenant.controller.js";

const router = express.Router();

router.post("/create", createTenant);
router.get("/:id", getTenant);
router.get("/", getTenants);
router.put("/:id", updateTenant);
router.delete("/:id", deleteTenant);

export default router;
