"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const question_1 = require("../controllers/question");
router.get('/:id', question_1.GetQuestionsBySurveyId);
router.post('/add/:id', question_1.AddQuestionWithSurveyId);
//# sourceMappingURL=question.js.map