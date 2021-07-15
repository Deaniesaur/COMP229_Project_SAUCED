"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const index_1 = require("../controllers/index");
router.get("/", index_1.DisplayHomePage);
router.get("/home", index_1.DisplayHomePage);
router.get("/about", index_1.DisplayAboutPage);
router.get("/recent", index_1.DisplayRecentPage);
router.get("/new-survey", index_1.DisplaySurveyPage);

router.get('/recent', index_1.DisplayRecentPage);

router.get("/login", index_1.DisplayLoginPage);