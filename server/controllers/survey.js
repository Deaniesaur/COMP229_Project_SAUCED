"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSurvey = exports.UpdateSurveyById = exports.DisplaySurveyById = exports.CreateSurvey = exports.DisplayAllSurveys = void 0;
const survey_1 = __importDefault(require("../models/survey"));
const question_1 = __importDefault(require("../models/question"));
function DisplayAllSurveys(req, res, next) {
    survey_1.default.find(function (err, surveys) {
        if (err) {
            return console.error(err);
        }
        console.log(surveys);
        return surveys;
    });
    return null;
}
exports.DisplayAllSurveys = DisplayAllSurveys;
function CreateSurvey(req, res, next) {
    let today = new Date();
    let expiryDate = new Date();
    expiryDate.setDate(today.getDate() + 2);
    let surveyThumbnail = null;
    let newSurvey = new survey_1.default({
        title: req.body.title,
        description: req.body.description,
        thumbnail: surveyThumbnail,
        owner: "User",
        created: today,
        updated: today,
        expiry: expiryDate
    });
    survey_1.default.create(newSurvey, (err, survey) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(survey._id);
        res.end();
    });
}
exports.CreateSurvey = CreateSurvey;
function DisplaySurveyById(req, res, next) {
    let surveyId = req.params.id;
    let surveyFound;
    survey_1.default.findOne({ _id: surveyId }, function (err, survey) {
        if (err) {
            return console.error(err);
        }
        surveyFound = survey.toObject();
    }).then(() => {
        question_1.default.find({ surveyId: surveyId }, function (err, questions) {
            if (err) {
                return console.error(err);
            }
            surveyFound.questions = questions;
            console.log('Survey', surveyFound);
            res.render("index", {
                title: "SAUCED | Answer Survey",
                page: "respondSurvey",
                survey: surveyFound
            });
        });
    });
}
exports.DisplaySurveyById = DisplaySurveyById;
function UpdateSurveyById(req, res, next) {
    let id = req.params.id;
    let update = {
        title: req.body.title,
        updated: new Date(),
    };
    survey_1.default.updateOne({ _id: id }, update, {}, (err, survey) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(survey._id);
        res.end();
    });
}
exports.UpdateSurveyById = UpdateSurveyById;
function DeleteSurvey(req, res, next) {
    let id = req.params.id;
    survey_1.default.deleteOne({ _id: id }, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    }).then(() => {
        question_1.default.deleteMany({ surveyId: id }, {}, (err) => {
            if (err) {
                res.end();
            }
            console.log(`Survey: ${id} DELETED`);
            res.redirect('/recent');
        });
    });
}
exports.DeleteSurvey = DeleteSurvey;
//# sourceMappingURL=survey.js.map