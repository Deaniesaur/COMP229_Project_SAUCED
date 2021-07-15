import express from "express";
const router = express.Router();
export default router;

//Create Survey controller instance
import {
  DisplayAllSurveys,
  CreateSurvey,
  DeleteSurvey,
  UpdateSurvey,
} from "../controllers/survey";

//GET All Surveys
router.get("/", DisplayAllSurveys);

//POST Create Survey
router.post("/create", CreateSurvey);

//Todo: Read Survey

//Todo: Update Survey
router.post("/update/:id", UpdateSurvey);

//Todo: Delete Survey
router.post("/delete/:id", DeleteSurvey);

//Add Question Routes
import questionRouter from "./question";

router.use("/question", questionRouter);
