"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    birthday: String,
    email: String,
    username: String,
    created: {
        type: Date,
        default: Date.now(),
    },
    updated: {
        type: Date,
        default: Date.now(),
    },
}, {
    collection: "users",
});
const Model = mongoose_1.default.model("User", UserSchema);
exports.default = Model;
//# sourceMappingURL=user.js.map