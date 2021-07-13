import express from 'express';
const router = express.Router();
export default router;

//Create Survey controller instance
import { AddQuestionWithSurveyId, GetQuestionsBySurveyId } from '../controllers/question';

//GET All Surveys
router.get('/:id', GetQuestionsBySurveyId);

//POST Create Survey
router.post('/add/:id', AddQuestionWithSurveyId);