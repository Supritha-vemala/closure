"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_controller_1 = require("../Controller/users-controller");
var router = express_1.default.Router();
var question_controller_1 = require("../Controller/question-controller");
router.get("/", function (req, res) {
    question_controller_1.getAllQuestions(req, res);
});
router.get("/askedby/:userid", function (req, res) {
    console.log("here in routes");
    question_controller_1.getAllQuestionsGivenByUser(req, res);
});
router.post("/", users_controller_1.checkAuthoraiztion, function (req, res) {
    question_controller_1.addNewQuestion(req, res);
});
router.get("/category/:category", function (req, res) {
    question_controller_1.getQuestionsByCategory(req, res);
});
router.get("/simpleSearch/:text", function (req, res) {
    question_controller_1.getQuestionsByText(req, res);
});
router.get("/by/:id", function (req, res) {
    question_controller_1.getQuestionByID(req, res);
});
router.patch("/:id", users_controller_1.checkAuthoraiztion, function (req, res) {
    question_controller_1.upVoteOrDownVote(req, res);
});
router.get("/upvotedby/user/:userid", function (req, res) {
    question_controller_1.getAllQuestionsLikedByGivenUser(req, res);
});
exports.default = router;
