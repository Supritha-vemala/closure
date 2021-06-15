"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionsModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var questionsSchema = new mongoose_1.default.Schema({
    question: {
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
    categories: {
        type: Array,
        required: true
    }
});
var questionsModel = mongoose_1.default.model("questions", questionsSchema);
exports.questionsModel = questionsModel;
