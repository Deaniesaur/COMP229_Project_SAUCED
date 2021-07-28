"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.ProcessLogin = exports.ProcessSignUp = exports.DisplaySignUpPage = exports.DisplayLoginPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
const user_1 = __importDefault(require("../models/user"));
const passport_1 = __importDefault(require("passport"));
const util_1 = require("../util");
function DisplayHomePage(req, res, next) {
    res.render("index", {
        title: "SAUCED | Homepage",
        page: "home",
        display: util_1.GetDisplayName(req),
    });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | About Us",
        page: "about",
        display: util_1.GetDisplayName(req),
    });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplayLoginPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | Login",
        page: "login",
        display: util_1.GetDisplayName(req),
    });
}
exports.DisplayLoginPage = DisplayLoginPage;
function DisplaySignUpPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | Login",
        page: "signup",
        display: util_1.GetDisplayName(req),
    });
}
exports.DisplaySignUpPage = DisplaySignUpPage;
function ProcessSignUp(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User already exists');
            }
            req.flash('registerMessage', 'Registration Error');
            return res.redirect('/signup');
        }
        return passport_1.default.authenticate('local')(req, req, () => {
            return res.redirect('/survey/private');
        });
    });
}
exports.ProcessSignUp = ProcessSignUp;
function ProcessLogin(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            console.error('login error', err);
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            console.error('sucess login', err);
            return res.redirect('/survey/private');
        });
    })(req, res, next);
}
exports.ProcessLogin = ProcessLogin;
function Logout(req, res, next) {
    req.logout();
    res.redirect('/login');
}
exports.Logout = Logout;
//# sourceMappingURL=index.js.map