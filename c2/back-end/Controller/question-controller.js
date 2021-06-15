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
exports.getAllQuestionsLikedByGivenUser = exports.getAllQuestionsGivenByUser = exports.getQuestionsByText = exports.getQuestionsByCategory = exports.getQuestionByID = exports.addNewQuestion = exports.upVoteOrDownVote = exports.getAllQuestions = void 0;
var questions_1 = require("../Model/questions");
var getAllQuestions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var questions, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, questions_1.questionsModel.find()];
            case 1:
                questions = _a.sent();
                res.status(200).send(questions);
                return [2 /*return*/, questions];
            case 2:
                err_1 = _a.sent();
                res.status(404).send("could not find questions");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllQuestions = getAllQuestions;
var addNewQuestion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newQuestion, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newQuestion = new questions_1.questionsModel();
                newQuestion = {
                    question: req.body.question,
                    categories: req.body.categories,
                    userID: req.user._id,
                };
                return [4 /*yield*/, questions_1.questionsModel.create(newQuestion)];
            case 1:
                result = _a.sent();
                res.status(201).send(result);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(403).send("unable to add a question " + err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addNewQuestion = addNewQuestion;
var getQuestionByID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, question, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, questions_1.questionsModel.find({ _id: id })];
            case 1:
                question = _a.sent();
                res.status(200).send(question);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(404).send("could not find the question, " + err_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getQuestionByID = getQuestionByID;
var getQuestionsByCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, questions, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                category = req.params.category;
                return [4 /*yield*/, questions_1.questionsModel.find({
                        categories: { $regex: category, $options: "i" },
                    })];
            case 1:
                questions = _a.sent();
                res.status(200).send(questions);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(404).send("Could not find questions, " + err_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getQuestionsByCategory = getQuestionsByCategory;
var getQuestionsByText = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, questions, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                text = req.params.text;
                return [4 /*yield*/, questions_1.questionsModel.find({
                        question: { $regex: text, $options: "i" },
                    })];
            case 1:
                questions = _a.sent();
                res.status(200).send(questions);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(404).send("Could not find questions, " + err_5.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getQuestionsByText = getQuestionsByText;
var upVoteOrDownVote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Question, option, user, updateObject, result, user, updateObject, result, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 13, , 14]);
                id = req.params.id;
                return [4 /*yield*/, questions_1.questionsModel.findOne({ _id: id })];
            case 1:
                Question = _a.sent();
                if (!Question) return [3 /*break*/, 11];
                option = req.body;
                if (!(option.type === "upVote")) return [3 /*break*/, 6];
                return [4 /*yield*/, questions_1.questionsModel.findOne({ $and: [{ _id: Question._id }, { upVotes: req.user._id.toString() }] })];
            case 2:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 4];
                updateObject = new questions_1.questionsModel();
                Question.upVotes.push(req.user._id.toString());
                updateObject = {
                    question: Question.question,
                    userID: Question.userID,
                    downVotes: Question.downVotes,
                    categories: Question.categories,
                    upVotes: Question.upVotes,
                };
                return [4 /*yield*/, questions_1.questionsModel.findByIdAndUpdate(id, updateObject, {
                        new: true,
                    })];
            case 3:
                result = _a.sent();
                res.status(200).send(result);
                console.log(updateObject);
                return [3 /*break*/, 5];
            case 4:
                res.status(404).send("You already voted");
                _a.label = 5;
            case 5: return [3 /*break*/, 10];
            case 6:
                if (!(option.type === "downVote")) return [3 /*break*/, 10];
                return [4 /*yield*/, questions_1.questionsModel.findOne({ $and: [{ _id: Question._id }, { downVotes: req.user._id.toString() }] })];
            case 7:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 9];
                updateObject = new questions_1.questionsModel();
                Question.downVotes.push(req.user._id.toString());
                updateObject = {
                    question: Question.question,
                    userID: Question.userID,
                    categories: Question.categories,
                    upVotes: Question.upVotes,
                    downVotes: Question.downVotes.toString(),
                };
                return [4 /*yield*/, questions_1.questionsModel.findByIdAndUpdate(id, updateObject, {
                        new: true,
                    })];
            case 8:
                result = _a.sent();
                res.status(200).send(result);
                return [3 /*break*/, 10];
            case 9:
                res.status(404).send("You already voted");
                _a.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                res.status(404).send("question id not found");
                _a.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                err_6 = _a.sent();
                res.status(404).send("Could not find questions, " + err_6.message);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.upVoteOrDownVote = upVoteOrDownVote;
var getAllQuestionsGivenByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, questions, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userID = req.params.userid;
                console.log(userID);
                return [4 /*yield*/, questions_1.questionsModel.find({ userID: userID })];
            case 1:
                questions = _a.sent();
                res.status(200).send(questions);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(404).send(err_7.messgae);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllQuestionsGivenByUser = getAllQuestionsGivenByUser;
var getAllQuestionsLikedByGivenUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, likedQuestions, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userID = req.params.userid;
                return [4 /*yield*/, questions_1.questionsModel.find({ upVotes: { $elemMatch: { $eq: userID } } })];
            case 1:
                likedQuestions = _a.sent();
                res.status(200).send(likedQuestions);
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                res.status(404).send(err_8.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllQuestionsLikedByGivenUser = getAllQuestionsLikedByGivenUser;
