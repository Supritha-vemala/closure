"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_controller_1 = require("../Controller/users-controller");
var router = express_1.default.Router();
var answer_controller_1 = require("../Controller/answer-controller");
router.post("/forquestion/:id", users_controller_1.checkAuthoraiztion, function (req, res) {
    answer_controller_1.addNewAnswer(req, res);
});
router.get("/upvotedby/user/:userid", function (req, res) {
    answer_controller_1.getAllAnswersLikedByUser(req, res);
});
router.get("/ofquestion/:id", function (req, res) {
    answer_controller_1.getAnswersByQuestionID(req, res);
});
router.patch("/:answerid", users_controller_1.checkAuthoraiztion, function (req, res) {
    answer_controller_1.upVoteOrDownVote(req, res);
});
router.get("/givenby/:userID", function (req, res) {
    answer_controller_1.getAllAnswersByParticularUser(req, res);
});
exports.default = router;
