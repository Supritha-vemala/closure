"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var users_controller_1 = require("../Controller/users-controller");
router.post('/register', function (req, res) {
    users_controller_1.registerUser(req, res);
});
router.post("/login", function (req, res) {
    users_controller_1.loginUser(req, res);
});
exports.default = router;
