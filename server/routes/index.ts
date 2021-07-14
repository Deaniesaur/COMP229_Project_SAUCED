import express from "express";
const router = express.Router();
export default router;

// create an index controller instance
import {
  DisplayAboutPage,
  DisplayHomePage,
  DisplaySurveyPage,
  DisplayLoginPage,
  DisplayRecentPage,
} from "../controllers/index";

/* GET home page. */
router.get("/", DisplayHomePage);

/* GET home page. */
router.get("/home", DisplayHomePage);

/* GET about page. */
router.get("/about", DisplayAboutPage);

/* GET Recent Page. */
router.get("/recent", DisplayRecentPage);

/* GET new survey page. */
router.get("/new-survey", DisplaySurveyPage);

/* GET Login Page. */
router.get("/login", DisplayLoginPage);

