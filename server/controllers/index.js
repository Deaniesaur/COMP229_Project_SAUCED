"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

exports.DisplayRecentPage = exports.DisplaySurveyPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
const survey_1 = __importDefault(require("../models/survey"));

exports.DisplayLoginPage = exports.DisplayRecentPage = exports.DisplaySurveyPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;

function DisplayHomePage(req, res, next) {
    res.render("index", {
        title: "SAUCED | Homepage",
        page: "home",
    });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | About Us",
        page: "about",
    });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplaySurveyPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | New Survey",
        page: "newSurvey",
    });
}
exports.DisplaySurveyPage = DisplaySurveyPage;
function DisplayRecentPage(req, res, next) {
    survey_1.default.find(function (err, surveys) {
        if (err) {
            return console.error(err);
        }
        console.log('Surveys', surveys);
        res.render("index", {
            title: "SAUCED | New Survey",
            page: "recent",
            surveys: surveys
        });
    });
}
exports.DisplayRecentPage = DisplayRecentPage;
function DisplayLoginPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | Login",
        page: "login",
    });
}
exports.DisplayLoginPage = DisplayLoginPage;
//# sourceMappingURL=index.js.map