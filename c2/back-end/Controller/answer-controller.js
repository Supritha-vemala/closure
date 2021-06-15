"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAnswersLikedByUser = exports.getAllAnswersByParticularUser = exports.upVoteOrDownVote = exports.getAnswersByQuestionID = exports.addNewAnswer = void 0;
var questions_1 = require("../Model/questions");
var answers_1 = require("../Model/answers");
var getAnswersByQuestionID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Question, answers, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = req.params.id;
                return [4 /*yield*/, questions_1.questionsModel.findOne({ _id: id })];
            case 1:
                Question = _a.sent();
                if (!Question) return [3 /*break*/, 3];
                return [4 /*yield*/, answers_1.answersModel.find({ questionID: id })];
            case 2:
                answers = _a.sent();
                res.status(200).send(answers);
                return [3 /*break*/, 4];
            case 3:
                res.status(404).send("question not found");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                res.status(404).send("could not find answers for the question " + err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getAnswersByQuestionID = getAnswersByQuestionID;
var addNewAnswer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Question, newAnswer, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = req.params.id;
                return [4 /*yield*/, questions_1.questionsModel.findOne({ _id: id })];
            case 1:
                Question = _a.sent();
                if (!Question) return [3 /*break*/, 3];
                newAnswer = new answers_1.answersModel();
                newAnswer = {
                    questionID: id,
                    answer: req.body.answer,
                    userID: req.user._id,
                };
                return [4 /*yield*/, answers_1.answersModel.create(newAnswer)];
            case 2:
                result = _a.sent();
                res.status(201).send(result);
                return [3 /*break*/, 4];
            case 3:
                res.status(404).send("could not find the question");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                res.status(403).send("unable to add an answer " + err_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addNewAnswer = addNewAnswer;
var upVoteOrDownVote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Answer, option, user, updateObject, result, user, updateObject, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 13, , 14]);
                id = req.params.answerid;
                return [4 /*yield*/, answers_1.answersModel.findOne({ _id: id })];
            case 1:
                Answer = _a.sent();
                if (!Answer) return [3 /*break*/, 11];
                option = req.body;
                if (!(option.type === "upVote")) return [3 /*break*/, 6];
                return [4 /*yield*/, answers_1.answersModel.findOne({ $and: [{ _id: Answer._id }, { upVotes: req.user._id.toString() }] })];
            case 2:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 4];
                Answer.upVotes.push(req.user._id.toString());
                updateObject = new answers_1.answersModel();
                updateObject = {
                    questionID: Answer.questionID,
                    userID: Answer.userID,
                    downVotes: Answer.downVotes,
                    answer: Answer.answer,
                    upVotes: Answer.upVotes,
                };
                return [4 /*yield*/, answers_1.answersModel.findByIdAndUpdate(id, updateObject, {
                        new: true,
                    })];
            case 3:
                result = _a.sent();
                res.status(200).send(result);
                return [3 /*break*/, 5];
            case 4:
                res.status(404).send("you voted already");
                _a.label = 5;
            case 5: return [3 /*break*/, 10];
            case 6: return [4 /*yield*/, answers_1.answersModel.findOne({ $and: [{ _id: Answer._id }, { downVotes: req.user._id.toString() }] })];
            case 7:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 9];
                Answer.downVotes.push(req.user._id.toString());
                updateObject = new answers_1.answersModel();
                updateObject = {
                    questionID: Answer.questionID,
                    userID: Answer.userID,
                    answer: Answer.answer,
                    upVotes: Answer.upVotes,
                    downVotes: Answer.downVotes,
                };
                return [4 /*yield*/, answers_1.answersModel.findByIdAndUpdate(id, updateObject, {
                        new: true,
                    })];
            case 8:
                result = _a.sent();
                res.status(200).send(result);
                return [3 /*break*/, 10];
            case 9:
                res.status(404).send("you voted already");
                _a.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                res.status(404).send("answer id not found");
                _a.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                err_3 = _a.sent();
                res.status(404).send("Could not find answer, " + err_3.message);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.upVoteOrDownVote = upVoteOrDownVote;
var getAllAnswersByParticularUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, answers, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userid = req.params.userID;
                return [4 /*yield*/, answers_1.answersModel.find({ userID: userid })];
            case 1:
                answers = _a.sent();
                res.status(200).send(answers);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(404).send(err_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllAnswersByParticularUser = getAllAnswersByParticularUser;
var getAllAnswersLikedByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, likedAnswers, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userid = req.params.userid;
                return [4 /*yield*/, answers_1.answersModel.find({ upVotes: { $elemMatch: { $eq: userid } } })];
            case 1:
                likedAnswers = _a.sent();
                console.log(likedAnswers);
                res.status(200).send(likedAnswers);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(404).send(err_5.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllAnswersLikedByUser = getAllAnswersLikedByUser;
