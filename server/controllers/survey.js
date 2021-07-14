"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSurvey = exports.UpdateSurvey = exports.CreateSurvey = exports.DisplayAllSurveys = void 0;
const survey_1 = __importDefault(require("../models/survey"));
function DisplayAllSurveys(req, res, next) {
    survey_1.default.find(function (err, surveys) {
        if (err) {
            return console.error(err);
        }
        console.log(surveys);
        res.end();
    });
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
function UpdateSurvey(req, res, next) {
    let id = req.params.id;
    let update = {
        title: req.body.title,
        updated: new Date()
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
exports.UpdateSurvey = UpdateSurvey;
function DeleteSurvey(req, res, next) {
    let id = req.params.id;
    survey_1.default.deleteOne({ _id: id }, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(`Survey: ${id} DELETED`);
        res.end();
    });
}
exports.DeleteSurvey = DeleteSurvey;
//# sourceMappingURL=survey.js.map