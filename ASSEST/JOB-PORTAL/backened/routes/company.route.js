// export default router;
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Register a new company
router.route("/register").post(isAuthenticated, registerCompany);

// Get all companies for the authenticated user
router.route("/get").get(isAuthenticated, getCompany);

// Get a specific company by ID
router.route("/get/:id").get(isAuthenticated, getCompanyById);

// Update company details by ID
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);

export default router;
