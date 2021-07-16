"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitResponse = exports.DisplayNewSurveyPage = exports.DeleteSurvey = exports.UpdateSurveyById = exports.DisplaySurveyById = exports.CreateSurvey = exports.DisplayRecentSurveys = void 0;
const survey_1 = __importDefault(require("../models/survey"));
const question_1 = __importDefault(require("../models/question"));
const response_1 = __importDefault(require("../models/response"));
function DisplayRecentSurveys(req, res, next) {
    survey_1.default.find(function (err, surveys) {
        if (err) {
            return console.error(err);
        }
        res.render("index", {
            title: "SAUCED | Recent Surveys",
            page: "recent",
            surveys: surveys,
        });
    });
}
exports.DisplayRecentSurveys = DisplayRecentSurveys;
function CreateSurvey(req, res, next) {
    let today = new Date();
    let expiryDate = new Date();
    expiryDate.setDate(today.getDate() + 2);
    let surveyThumbnail = null;
    console.log(req.body.title);
    let newSurvey = new survey_1.default({
        title: req.body.title,
        description: req.body.description,
        thumbnail: surveyThumbnail,
        owner: "User",
        questions: req.body.questions,
        created: today,
        updated: today,
        expiry: expiryDate,
    });
    survey_1.default.create(newSurvey, (err, survey) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    });
    res.redirect("/");
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
        res.render("index", {
            title: "SAUCED | Answer Survey",
            page: "respondSurvey",
            survey: surveyFound,
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
            res.redirect("/survey");
        });
    });
}
exports.DeleteSurvey = DeleteSurvey;
function DisplayNewSurveyPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | New Survey",
        page: "newSurvey",
    });
}
exports.DisplayNewSurveyPage = DisplayNewSurveyPage;
function SubmitResponse(req, res, next) {
    let surveyId = req.params.id;
    let answers = [];
    let count = 0;
    while (true) {
        let value = req.body["question" + count];
        if (value == undefined)
            break;
        console.log(`Questions ${count}`, value);
        answers.push(value);
        count++;
    }
    let newResponse = new response_1.default({
        surveyId: surveyId,
        surveyOwner: "User",
        answers: answers,
        created: new Date()
    });
    response_1.default.create(newResponse, (err, response) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    });
    res.redirect("/survey");
}
exports.SubmitResponse = SubmitResponse;
//# sourceMappingURL=survey.js.map