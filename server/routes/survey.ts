import express from "express";
const router = express.Router();
export default router;

//Create Survey controller instance

import {
  DisplayPublicSurveys,
  DisplayPrivateSurveys,
  UpsertSurvey,
  DeleteSurvey,
  DisplaySurveyById,
  DisplayNewSurveyPage,
  DisplayUpdateSurveyPage,
  SubmitResponse,
  DisplaySurveyAnalysis,
  CreateSurveyAnalysis,
  DownloadPDF,
} from "../controllers/survey";

import { AuthGuard } from "../util";

//GET Private Surveys
router.get("/public", DisplayPublicSurveys);

//GET Private Surveys
router.get("/private", AuthGuard, DisplayPrivateSurveys);

//GET Display Answer Survey
router.get("/answer/:id", DisplaySurveyById);

//POST Create Survey Response
router.post("/answer/:id", SubmitResponse);

//GET Create Survey
router.get("/create", AuthGuard, DisplayNewSurveyPage);

//POST Create Survey
router.post("/create", AuthGuard, UpsertSurvey);

//GET Update Survey By Id
router.get("/edit/:id", AuthGuard, DisplayUpdateSurveyPage);

//POST Update Survey By Id
router.post("/edit/:id", AuthGuard, UpsertSurvey);

//GET Delete Survey
router.get("/delete/:id", AuthGuard, DeleteSurvey);

//GET Display Survey Analysis
router.get("/analysis/:id", AuthGuard, DisplaySurveyAnalysis);

//POST Create Survey Analysis
router.post("/analysis/:id", AuthGuard, CreateSurveyAnalysis);

//GET Download Survey Analysis
router.post("/download/:id", AuthGuard, DownloadPDF);