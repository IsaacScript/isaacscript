"use strict";
/**
 * When you write code that causes the game to crash, it can be difficult to find the exact line of
 * code that is causing the crash.
 *
 * In these situations, you can enable this plugin, which will add a log statement in between every
 * line of Lua code with a randomly-generated UUID. That way, you can cause the crash, and then look
 * at the bottom of the "log.txt" for the final UUID that shows up.
 *
 * Next, you can Ctrl + f in the "main.lua" file for the matching UUID, which will bring you to the
 * exact point in the code where the crash happened.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = __importDefault(require("node:crypto"));
const tstl = __importStar(require("typescript-to-lua"));
class CustomPrinter extends tstl.LuaPrinter {
    printStatement(statement) {
        const uuid = node_crypto_1.default.randomUUID();
        const debugLineToInsert = `Isaac.DebugString("CRASH DEBUG ${uuid}")\n`;
        const originalResult = super.printStatement(statement);
        return this.createSourceNode(statement, [
            debugLineToInsert,
            originalResult,
        ]);
    }
}
const plugin = {
    printer: (program, emitHost, fileName, file) => new CustomPrinter(emitHost, program, fileName).print(file),
};
exports.default = plugin;
