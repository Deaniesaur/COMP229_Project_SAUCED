import express from "express";
const router = express.Router();
export default router;

// create an index controller instance
import {
  DisplayAboutPage,
  DisplayHomePage,
  DisplayLoginPage,
  DisplaySignUpPage,
  ProcessSignUp,
  ProcessLogin,
  Logout,
} from "../controllers/index";

/* GET home page. */
router.get("/", DisplayHomePage);

/* GET home page. */
router.get("/home", DisplayHomePage);

/* GET about page. */
router.get("/about", DisplayAboutPage);

/* GET Login Page. */
router.get("/login", DisplayLoginPage);

/* GET Sign Up Page. */
router.get("/signup", DisplaySignUpPage);

/* GET Logout Page. */
router.get("/logout", Logout);

/* POST Login Page. */
router.post("/login", DisplaySignUpPage);

/* POST Login Page. */
router.post("/login", ProcessLogin);

/* POST Sign Up Page. */
router.post("/signup", ProcessSignUp);