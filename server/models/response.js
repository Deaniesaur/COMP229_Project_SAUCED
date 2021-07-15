"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = __importDefault(require("mongodb"));
const Schema = mongoose_1.default.Schema;
const ResponseSchema = new Schema({
    surveyId: mongodb_1.default.ObjectId,
    surveyOwner: String,
    answers: [],
    created: Date
}, {
    collection: 'responses'
});
ResponseSchema.index({ surveyId: 1, surveyOwner: 1 });
const Model = mongoose_1.default.model('Response', ResponseSchema);
exports.default = Model;
//# sourceMappingURL=response.js.map