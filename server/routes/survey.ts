import express from "express";
const router = express.Router();
export default router;

//Create Survey controller instance

import {
  DisplayRecentSurveys,
  CreateSurvey,
  DeleteSurvey,
  UpdateSurveyById,
  DisplaySurveyById,
  DisplayNewSurveyPage,
} from "../controllers/survey";

//GET All Surveys
router.get("/", DisplayRecentSurveys);

//GET Display Answer Survey
router.get("/answer/:id", DisplaySurveyById);

//POST Create Survey
router.post("/create", CreateSurvey);

//GET Create Survey
router.get("/create", DisplayNewSurveyPage);

//POST Update Survey By Id
router.post("/edit/:id", UpdateSurveyById);

//Todo: Delete Survey
router.get("/delete/:id", DeleteSurvey);

//Add Question Routes
import questionRouter from "./question";

router.use("/question", questionRouter);
