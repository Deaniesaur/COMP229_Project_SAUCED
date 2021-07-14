"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const survey_1 = require("../controllers/survey");
router.post('/create', survey_1.CreateSurvey);
router.get('/:id', survey_1.GetSurveyById);
router.post('/update/:id', survey_1.UpdateSurveyById);
router.post('/delete/:id', survey_1.DeleteSurvey);
const question_1 = __importDefault(require("./question"));
router.use('/question', question_1.default);
//# sourceMappingURL=survey.js.map