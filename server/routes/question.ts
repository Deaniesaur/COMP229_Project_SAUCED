import express from 'express';
const router = express.Router();
export default router;

//Create Question controller instance
import { AddQuestionWithSurveyId, GetQuestionsBySurveyId, UpdateQuestionWithId, DeleteQuestionWithId } from '../controllers/question';

//GET All Questions
router.get('/:id', GetQuestionsBySurveyId);

//POST Create Question
router.post('/add/:id', AddQuestionWithSurveyId);

//POST Update Question
router.post('/update/:id', UpdateQuestionWithId);

//POST Delete Question
router.post('/delete/:id', DeleteQuestionWithId);
