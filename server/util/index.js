"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = exports.GetDisplayName = void 0;
function GetDisplayName(req) {
    if (req.user) {
        let user = req.user;
        return user.firstName.toString();
    }
    return '';
}
exports.GetDisplayName = GetDisplayName;
function AuthGuard(req, res, next) {
    console.log("Check Authentication");
    if (!req.isAuthenticated()) {
        console.log("Not Authenticated");
        return res.redirect('/login');
    }
    next();
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=index.js.map