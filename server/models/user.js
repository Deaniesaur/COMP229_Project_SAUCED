"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
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
UserSchema.plugin(passport_local_mongoose_1.default, {
    usernameQueryFields: ['username', 'email']
});
const Model = mongoose_1.default.model('User', UserSchema);
exports.default = Model;
//# sourceMappingURL=user.js.map