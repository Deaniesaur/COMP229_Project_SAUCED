import express from "express";
const router = express.Router();
export default router;

// create an index controller instance
import {
  DisplayAboutPage,
  DisplayHomePage,
  DisplayLoginPage,
  DisplaySignUpPage,
} from "../controllers/index";

/* GET home page. */
router.get("/", DisplayHomePage);

/* GET home page. */
router.get("/home", DisplayHomePage);

/* GET about page. */
router.get("/about", DisplayAboutPage);

/* GET Login Page. */
router.get("/login", DisplayLoginPage);

/* GET Login Page. */
router.get("/signup", DisplaySignUpPage);