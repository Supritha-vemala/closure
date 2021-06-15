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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthoraiztion = exports.registerUser = exports.loginUser = void 0;
var user_1 = require("../Model/user");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function findUserByuserName(username, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_1.usersModel.findOne({ userName: username })];
                case 1:
                    user = _a.sent();
                    if (user)
                        return [2 /*return*/, user];
                    else
                        return [2 /*return*/, true];
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.send(err_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var addedUser_1, _a, password_1, username_1, email_1, name_1, newUser_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, password_1 = _a.password, username_1 = _a.username, email_1 = _a.email, name_1 = _a.name;
                return [4 /*yield*/, findUserByuserName(username_1, res)];
            case 1:
                if ((_b.sent()) === true) {
                    newUser_1 = new user_1.usersModel();
                    bcrypt_1.default.hash(password_1, 8, function (err, hash) { return __awaiter(void 0, void 0, void 0, function () {
                        var err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        console.log(err.message);
                                        return [2 /*return*/, false];
                                    }
                                    password_1 = hash;
                                    newUser_1 = { email: email_1, password: password_1, userName: username_1, name: name_1 };
                                    console.log(newUser_1);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, user_1.usersModel.create(newUser_1)];
                                case 2:
                                    addedUser_1 = _a.sent();
                                    res.writeHead(201, { "content-type": "application/json" });
                                    res.end(JSON.stringify(addedUser_1));
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_2 = _a.sent();
                                    res.status(404).send("Failure, username already exists. Try sign in or use different email");
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                else {
                    res.status(409).end("Failure, username already exists. Try sign in or use different username");
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.status(406).end(error_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, password, user, match, token, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, username = _a.username, password = _a.password;
                    return [4 /*yield*/, findUserByuserName(username, res)];
                case 1:
                    user = _b.sent();
                    console.log(user);
                    if (!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    match = _b.sent();
                    if (match) {
                        token = jsonwebtoken_1.default.sign({ userId: user._id }, "" + process.env.JWT_SECRET, { expiresIn: "1d" });
                        res.status(200).json({ token: token, user: user });
                    }
                    else {
                        res.end("password incorrect");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    res.status(404).end("User not not found.Sign up");
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _b.sent();
                    res.status(404).end(error_2.message);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.loginUser = loginUser;
function checkAuthoraiztion(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, decode, user, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!(req.headers && req.headers.authorization)) return [3 /*break*/, 2];
                    token = req.headers.authorization;
                    decode = jsonwebtoken_1.default.verify(token, "" + process.env.JWT_SECRET);
                    return [4 /*yield*/, user_1.usersModel.findById(decode.userId)];
                case 1:
                    user = _a.sent();
                    try {
                        if (!user) {
                            return [2 /*return*/, res.json({
                                    success: false,
                                    message: "Unauthorized Access",
                                })];
                        }
                        req.user = user;
                        next();
                    }
                    catch (error) {
                        if (error.name === "JsonWebTokenError") {
                            return [2 /*return*/, res.json({
                                    success: false,
                                    message: "Unauthorized Access",
                                })];
                        }
                        if (error.name === "TokenExpiredError") {
                            return [2 /*return*/, res.json({
                                    success: false,
                                    message: "Session Expired Please Try Sign in Again",
                                })];
                        }
                        return [2 /*return*/, res.json({
                                success: false,
                                message: "Couldnt Sign In Try Again",
                            })];
                    }
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    console.log("Error in Authorization ", err_3.message);
                    return [2 /*return*/, res.json({ success: false, message: "Invalid token" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.checkAuthoraiztion = checkAuthoraiztion;
