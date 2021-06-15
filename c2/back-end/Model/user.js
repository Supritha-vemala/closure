"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var usersSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    }
});
var usersModel = mongoose_1.default.model("users", usersSchema);
exports.usersModel = usersModel;
