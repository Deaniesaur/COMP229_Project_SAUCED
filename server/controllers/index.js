"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayAboutPage = exports.DisplayHomePage = void 0;


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
//# sourceMappingURL=index.js.map

function DisplayNewPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | New Survey",
        page: "new",
    });
}
exports.DisplayNewPage = DisplayNewPage;

function DisplayRecentPage(req, res, next) {
    res.render("index", {
        title: "SAUCED | Recent Survey",
        page: "recent",
    });
}
exports.DisplayRecentPage = DisplayRecentPage;
