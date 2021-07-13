"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = __importDefault(require("mongodb"));
const Schema = mongoose_1.default.Schema;
const QuestionSchema = new Schema({
    surveyId: mongodb_1.default.ObjectId,
    question: String,
    type: String,
    choices: [],
    created: Date,
    updated: Date
}, {
    collection: 'questions'
});
QuestionSchema.index({ surveyId: 1 });
const Model = mongoose_1.default.model('Question', QuestionSchema);
exports.default = Model;
//# sourceMappingURL=question.js.map