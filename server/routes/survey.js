"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const survey_1 = require("../controllers/survey");
router.get('/', survey_1.DisplayAllSurveys);
router.post('/create', survey_1.CreateSurvey);
router.post('/update/:id', survey_1.UpdateSurvey);
router.post('/delete/:id', survey_1.DeleteSurvey);
//# sourceMappingURL=survey.js.map