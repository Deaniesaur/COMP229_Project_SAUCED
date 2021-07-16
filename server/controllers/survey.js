"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitResponse = exports.DisplayNewSurveyPage = exports.DeleteSurvey = exports.DisplayUpdateSurveyPage = exports.DisplaySurveyById = exports.UpsertSurvey = exports.DisplayRecentSurveys = void 0;
const survey_1 = __importDefault(require("../models/survey"));
const response_1 = __importDefault(require("../models/response"));
const mongoose_1 = __importDefault(require("mongoose"));
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
function UpsertSurvey(req, res, next) {
    let surveyId = mongoose_1.default.Types.ObjectId(req.params.id);
    let today = new Date();
    let expiryDate = new Date();
    expiryDate.setDate(today.getDate() + 30);
    let surveyThumbnail = null;
    let newSurvey = {
        title: req.body.title,
        description: req.body.description,
        owner: "User",
        questions: req.body.questions,
        created: today,
        updated: today,
        expiry: expiryDate,
    };
    if (req.body.create == true) {
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
            console.log("CREATED", survey._id);
        });
    }
    else {
        survey_1.default.updateOne({ _id: surveyId }, newSurvey, {}, (err, survey) => {
            if (err) {
                console.error(err);
                res.end();
            }
            console.log("UPDATED");
        });
    }
    res.redirect("/");
}
exports.UpsertSurvey = UpsertSurvey;
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
function DisplayUpdateSurveyPage(req, res, next) {
    let surveyId = req.params.id;
    let surveyFound;
    survey_1.default.findOne({ _id: surveyId }, function (err, survey) {
        if (err) {
            return console.error(err);
        }
        surveyFound = survey.toObject();
        res.render("index", {
            title: "SAUCED | Edit Survey",
            page: "editSurvey",
            survey: surveyFound,
            sid: surveyId,
        });
    });
}
exports.DisplayUpdateSurveyPage = DisplayUpdateSurveyPage;
function DeleteSurvey(req, res, next) {
    let id = req.params.id;
    survey_1.default.deleteOne({ _id: id }, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    }).then(() => {
        response_1.default.deleteMany({ surveyId: id }, {}, (err) => {
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
        created: new Date(),
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