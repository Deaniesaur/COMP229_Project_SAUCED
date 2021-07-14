"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQuestionWithId = exports.UpdateQuestionWithId = exports.AddQuestionWithSurveyId = exports.GetQuestionsBySurveyId = void 0;
const question_1 = __importDefault(require("../models/question"));
function GetQuestionsBySurveyId(req, res, next) {
    let surveyId = req.params.id;
    question_1.default.find({ surveyId: surveyId }, function (err, questions) {
        if (err) {
            return console.error(err);
        }
        console.log(questions);
        res.end();
    });
}
exports.GetQuestionsBySurveyId = GetQuestionsBySurveyId;
function AddQuestionWithSurveyId(req, res, next) {
    let surveyId = req.params.id;
    let newQuestion = new question_1.default({
        surveyId: surveyId,
        question: req.body.question,
        type: req.body.type,
        choices: [],
        created: new Date(),
        updated: new Date()
    });
    question_1.default.create(newQuestion, (err, question) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(question._id);
        res.end();
    });
}
exports.AddQuestionWithSurveyId = AddQuestionWithSurveyId;
function UpdateQuestionWithId(req, res, next) {
    let id = req.params.id;
    let update = {
        question: req.body.question,
        type: req.body.type,
        updated: new Date()
    };
    question_1.default.updateOne({ _id: id }, update, {}, (err, question) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(question._id);
        res.end();
    });
}
exports.UpdateQuestionWithId = UpdateQuestionWithId;
function DeleteQuestionWithId(req, res, next) {
    let id = req.params.id;
    question_1.default.deleteOne({ _id: id }, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(`Question: ${id} DELETED`);
        res.end();
    });
}
exports.DeleteQuestionWithId = DeleteQuestionWithId;
//# sourceMappingURL=question.js.map