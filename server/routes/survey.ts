import express from 'express';
const router = express.Router();
export default router;

//Create Survey controller instance
import { CreateSurvey, DeleteSurvey, UpdateSurveyById, GetSurveyById } from '../controllers/survey';

//POST Create Survey
router.post('/create', CreateSurvey);

//Todo: Read Survey
router.get('/:id', GetSurveyById);

//POST Update Survey By Id
router.post('/update/:id', UpdateSurveyById);

//Todo: Delete Survey
router.post('/delete/:id', DeleteSurvey);

//Add Question Routes
import questionRouter from './question';

router.use('/question', questionRouter);