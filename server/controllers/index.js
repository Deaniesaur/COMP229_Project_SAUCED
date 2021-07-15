"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayLoginPage = exports.DisplayNewSurveyPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
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
function DisplayNewSurveyPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | New Survey",
        page: "newSurvey",
    });
}
exports.DisplayNewSurveyPage = DisplayNewSurveyPage;
function DisplayLoginPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | Login",
        page: "login",
    });
}
exports.DisplayLoginPage = DisplayLoginPage;
//# sourceMappingURL=index.js.map