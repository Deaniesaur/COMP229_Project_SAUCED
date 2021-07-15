import express from "express";
const router = express.Router();
export default router;

// create an index controller instance
import {
  DisplayAboutPage,
  DisplayHomePage,
  DisplayNewSurveyPage,
  DisplayLoginPage,
} from "../controllers/index";

/* GET home page. */
router.get("/", DisplayHomePage);

/* GET home page. */
router.get("/home", DisplayHomePage);

/* GET about page. */
router.get("/about", DisplayAboutPage);

/* GET new survey page. */
router.get("/survey/create", DisplayNewSurveyPage);

/* GET Login Page. */
router.get("/login", DisplayLoginPage);
