"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadPDF = exports.CreateSurveyAnalysis = exports.DisplaySurveyAnalysis = exports.DeleteSurvey = exports.SubmitResponse = exports.DisplaySurveyById = exports.UpsertSurvey = exports.DisplayUpdateSurveyPage = exports.DisplayNewSurveyPage = exports.DisplayPrivateSurveys = exports.DisplayPublicSurveys = void 0;
const survey_1 = __importDefault(require("../models/survey"));
const response_1 = __importDefault(require("../models/response"));
const mongoose_1 = __importDefault(require("mongoose"));
const pdf_creator_node_1 = __importDefault(require("pdf-creator-node"));
const ejs_1 = __importDefault(require("ejs"));
const util_1 = require("../util");
function DisplayPublicSurveys(req, res, next) {
    let today = new Date().toISOString().slice(0, 10);
    let filter = {
        expiry: { $gte: today },
        startDate: { $lte: today },
        active: true,
    };
    survey_1.default.find(filter, function (err, surveys) {
        if (err) {
            return console.error(err);
        }
        res.render("index", {
            title: "SAUCED | Public Surveys",
            page: "surveys",
            surveys: surveys,
            display: util_1.GetDisplayName(req),
        });
    });
}
exports.DisplayPublicSurveys = DisplayPublicSurveys;
function DisplayPrivateSurveys(req, res, next) {
    let user = req.user;
    let filter = {
        owner: user.username,
    };
    survey_1.default.find(filter, function (err, surveys) {
        if (err) {
            return console.error(err);
        }
        res.render("index", {
            title: "SAUCED | My Surveys",
            page: "surveys",
            surveys: surveys,
            display: util_1.GetDisplayName(req),
        });
    });
}
exports.DisplayPrivateSurveys = DisplayPrivateSurveys;
function DisplayNewSurveyPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | New Survey",
        page: "newSurvey",
        display: util_1.GetDisplayName(req),
    });
}
exports.DisplayNewSurveyPage = DisplayNewSurveyPage;
function DisplayUpdateSurveyPage(req, res, next) {
    let surveyId = req.params.id;
    let surveyFound;
    let user = req.user;
    survey_1.default.findOne({ _id: surveyId, owner: user.username }, function (err, survey) {
        if (err) {
            return console.error(err);
        }
        console.log(survey);
        if (survey === null) {
            res.redirect("../public");
        }
        else {
            surveyFound = survey.toObject();
            res.render("index", {
                title: "SAUCED | Edit Survey",
                page: "editSurvey",
                survey: surveyFound,
                sid: surveyId,
                display: util_1.GetDisplayName(req),
            });
        }
    });
}
exports.DisplayUpdateSurveyPage = DisplayUpdateSurveyPage;
function UpsertSurvey(req, res, next) {
    let surveyId = mongoose_1.default.Types.ObjectId(req.params.id);
    let today = new Date();
    let user = req.user;
    let surveyThumbnail = null;
    let survey = new survey_1.default({
        title: req.body.title,
        description: req.body.description,
        thumbnail: surveyThumbnail,
        owner: user.username,
        questions: req.body.questions,
        created: today,
        updated: today,
        expiry: req.body.expiry,
        startDate: req.body.startDate,
        active: req.body.active,
    });
    if (req.body.create == true) {
        survey_1.default.create(survey, (err, survey) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            console.log("CREATED", survey._id);
        });
    }
    else {
        survey_1.default.updateOne({ _id: surveyId }, survey.toObject(), {}, (err, survey) => {
            if (err) {
                console.error(err);
                res.end();
            }
            console.log("UPDATED", survey._id);
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
            display: util_1.GetDisplayName(req),
        });
    });
}
exports.DisplaySurveyById = DisplaySurveyById;
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
    res.redirect("/survey/public");
}
exports.SubmitResponse = SubmitResponse;
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
            res.redirect("/survey/private");
        });
    });
}
exports.DeleteSurvey = DeleteSurvey;
function DisplaySurveyAnalysis(req, res, next) {
    let surveyId = req.params.id;
    res.render("index", {
        title: "SAUCED | Analysis",
        page: "analysis",
        surveyId: surveyId,
        display: util_1.GetDisplayName(req),
    });
}
exports.DisplaySurveyAnalysis = DisplaySurveyAnalysis;
function CreateSurveyAnalysis(req, res, next) {
    let getAnalysisList = getSurveyAnalysisData(req, res, next);
    getAnalysisList.then((analysis) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(analysis));
    });
}
exports.CreateSurveyAnalysis = CreateSurveyAnalysis;
function DownloadPDF(req, res, next) {
    const options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Author: SAUCED</div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page',
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
                last: 'Last Page'
            }
        }
    };
    let user = req.user;
    let path = "output/" + user.username + "/" + "analysis.pdf";
    let getAnalysisList = getSurveyAnalysisData(req, res, next);
    getAnalysisList.then((completeAnalysis) => {
        ejs_1.default.renderFile('template.ejs', {
            title: completeAnalysis.title,
            description: completeAnalysis.description,
            analysis: completeAnalysis.analysis,
            count: completeAnalysis.responseCount,
        }, function (err, data) {
            if (err) {
                console.log('error', err);
            }
            let document = {
                html: data,
                data: {},
                path: "./" + path,
                type: "",
            };
            pdf_creator_node_1.default
                .create(document, options)
                .then((pdfRes) => {
                console.log(pdfRes);
                let filePath = `${__dirname}/../../${path}`;
                res.download(filePath, 'analysis.pdf', (err) => {
                    if (err) {
                        res.status(500).send({
                            message: "Could not download the file. " + err,
                        });
                    }
                });
            })
                .catch((pdfError) => {
                console.error(pdfError);
                res.status(500).send({
                    message: "Could not download the file. " + err,
                });
            });
        });
    });
}
exports.DownloadPDF = DownloadPDF;
function getSurveyAnalysisData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let surveyId = req.params.id;
        let completeAnalysis = {};
        let analysisList = [];
        let survey = yield survey_1.default.findOne({ _id: surveyId });
        let responses = yield response_1.default.find({ surveyId: surveyId });
        let isShortAnswer = [];
        let questions = survey.questions;
        completeAnalysis['title'] = survey.title;
        completeAnalysis['description'] = survey.description;
        completeAnalysis['responseCount'] = responses.length;
        questions.forEach((question) => {
            let analysis = {};
            let answers = {};
            analysis['question'] = question.question;
            analysis['type'] = question.type;
            if (question.type == 'Short Answer') {
                isShortAnswer.push(true);
                answers = [];
            }
            else {
                isShortAnswer.push(false);
                let options = question.choices;
                options.forEach((option) => {
                    answers[option] = 0;
                });
            }
            analysis['answers'] = answers;
            analysisList.push(analysis);
        });
        responses.forEach((response) => {
            let answers = response.answers;
            for (let i = 0; i < answers.length; i++) {
                if (isShortAnswer[i]) {
                    analysisList[i]['answers'].push(answers[i]);
                }
                else {
                    analysisList[i]['answers'][answers[i]] += 1;
                }
            }
        });
        completeAnalysis['analysis'] = analysisList;
        return completeAnalysis;
    });
}
//# sourceMappingURL=survey.js.map