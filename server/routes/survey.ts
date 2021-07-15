import express from 'express';
const router = express.Router();
export default router;

//Create Survey controller instance

import { DisplayAllSurveys, CreateSurvey, DeleteSurvey, UpdateSurveyById, DisplaySurveyById } from '../controllers/survey';

//GET All Surveys
router.get('/', DisplayAllSurveys);


//GET Display Answer Survey
router.get('/answer/:id', DisplaySurveyById);

//POST Create Survey
router.post('/create', CreateSurvey);

//POST Update Survey By Id
router.post('/update/:id', UpdateSurveyById);

//Todo: Delete Survey
router.post('/delete/:id', DeleteSurvey);

//Add Question Routes
import questionRouter from './question';

router.use('/question', questionRouter);