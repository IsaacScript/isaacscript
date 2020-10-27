"use strict";
/* eslint-disable import/prefer-default-export */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = void 0;
const moment_1 = __importDefault(require("moment"));
function getTime() {
    return moment_1.default().format("h:mm:ss A"); // e.g. "1:23:45 AM"
}
exports.getTime = getTime;
