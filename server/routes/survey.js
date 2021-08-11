"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const survey_1 = require("../controllers/survey");
const util_1 = require("../util");
router.get("/public", survey_1.DisplayPublicSurveys);
router.get("/private", util_1.AuthGuard, survey_1.DisplayPrivateSurveys);
router.get("/answer/:id", survey_1.DisplaySurveyById);
router.post("/answer/:id", survey_1.SubmitResponse);
router.get("/create", util_1.AuthGuard, survey_1.DisplayNewSurveyPage);
router.post("/create", util_1.AuthGuard, survey_1.UpsertSurvey);
router.get("/edit/:id", util_1.AuthGuard, survey_1.DisplayUpdateSurveyPage);
router.post("/edit/:id", util_1.AuthGuard, survey_1.UpsertSurvey);
router.get("/delete/:id", util_1.AuthGuard, survey_1.DeleteSurvey);
router.get("/analysis/:id", util_1.AuthGuard, survey_1.DisplaySurveyAnalysis);
router.post("/analysis/:id", util_1.AuthGuard, survey_1.CreateSurveyAnalysis);
router.post("/download/:id", util_1.AuthGuard, survey_1.DownloadPDF);
//# sourceMappingURL=survey.js.map