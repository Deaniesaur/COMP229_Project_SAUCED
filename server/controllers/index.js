"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplaySignUpPage = exports.DisplayLoginPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
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
function DisplayLoginPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | Login",
        page: "login",
    });
}
exports.DisplayLoginPage = DisplayLoginPage;
function DisplaySignUpPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | Login",
        page: "signup",
    });
}
exports.DisplaySignUpPage = DisplaySignUpPage;
//# sourceMappingURL=index.js.map