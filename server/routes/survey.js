"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const survey_1 = require("../controllers/survey");
router.get("/", survey_1.DisplayRecentSurveys);
router.get("/answer/:id", survey_1.DisplaySurveyById);
router.post("/answer/:id", survey_1.SubmitResponse);
router.post("/create", survey_1.UpsertSurvey);
router.get("/create", survey_1.DisplayNewSurveyPage);
router.get("/edit/:id", survey_1.DisplayUpdateSurveyPage);
router.post("/edit/:id", survey_1.UpsertSurvey);
router.get("/delete/:id", survey_1.DeleteSurvey);
//# sourceMappingURL=survey.js.map