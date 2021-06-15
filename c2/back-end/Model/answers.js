"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answersModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var answersSchema = new mongoose_1.default.Schema({
    answer: {
        type: String,
        required: true,
    },
    questionID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    upVotes: {
        type: Array
    },
    downVotes: {
        type: Array
    },
});
var answersModel = mongoose_1.default.model("answers", answersSchema);
exports.answersModel = answersModel;
