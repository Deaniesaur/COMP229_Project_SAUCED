import express from "express";
const router = express.Router();
export default router;

// create an index controller instance
import { DisplayHomePage } from "../controllers/index";

/* GET home page. */
router.get("/", DisplayHomePage);

/* GET home page. */
router.get("/home", DisplayHomePage);
