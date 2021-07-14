"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayRecentPage = exports.DisplaySurveyPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
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
    res.render("index", {
        title: "SAUCED | Recent Survey",
        page: "recent",
    });
}
exports.DisplayRecentPage = DisplayRecentPage;
//# sourceMappingURL=index.js.map