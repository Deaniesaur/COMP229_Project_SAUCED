import express from "express";
const router = express.Router();
export default router;

//Create Survey controller instance

import {
  DisplayRecentSurveys,
  UpsertSurvey,
  DeleteSurvey,
  DisplaySurveyById,
  DisplayNewSurveyPage,
  DisplayUpdateSurveyPage,
  SubmitResponse,
} from "../controllers/survey";

//GET All Surveys
router.get("/", DisplayRecentSurveys);

//GET Display Answer Survey
router.get("/answer/:id", DisplaySurveyById);

//POST Create Survey Response
router.post("/answer/:id", SubmitResponse);

//POST Create Survey
router.post("/create", UpsertSurvey);

//GET Create Survey
router.get("/create", DisplayNewSurveyPage);

//GET Update Survey By Id
router.get("/edit/:id", DisplayUpdateSurveyPage);

//POST Update Survey By Id
router.post("/edit/:id", UpsertSurvey);

//Todo: Delete Survey
router.get("/delete/:id", DeleteSurvey);
