"use strict";
/* eslint-disable import/prefer-default-export */
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeToCamel = void 0;
// From: https://hisk.io/javascript-snake-to-camel/
function snakeToCamel(str) {
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));
}
exports.snakeToCamel = snakeToCamel;
