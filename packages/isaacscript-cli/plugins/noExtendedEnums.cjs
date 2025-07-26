"use strict";
/**
 * This plugin prevents transpiled enums from using global variables as a base (if present).
 *
 * For example, by default, the following enum:
 *
 * ```ts
 * export enum Foo {
 *   Value1,
 *   Value2,
 * }
 * ```
 *
 * Will be transpiled to this:
 *
 * ```lua
 * local ____exports = {}
 * ____exports.Foo = Foo or ({})
 * ____exports.Foo.Value1 = 0
 * ____exports.Foo[____exports.Foo.Value1] = "Value1"
 * ____exports.Foo.Value2 = 1
 * ____exports.Foo[____exports.Foo.Value2] = "Value2"
 * return ____exports
 * ```
 *
 * As we can see, the first line uses the existing global variable of "Foo" as a base, if present.
 * The reason it does this is because TSTL needs to support the TypeScript feature of combining
 * enums, like this:
 *
 * ```ts
 * enum Foo {
 *   Value1,
 * }
 *
 * enum Foo {
 *   Value2,
 * }
 * ```
 *
 * Unfortunately, this design decision means that local enums will essentially turn into global
 * variables. This plugin removes this behavior, always making enums local variables.
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
const tstl = __importStar(require("typescript-to-lua"));
const plugin = {
    visitors: {
        [ts.SyntaxKind.EnumDeclaration]: (node, context) => {
            // Call the normal TSTL enum transpilation method.
            const statements = context.superTransformStatements(node);
            // Get the first element, which will be equal to something like:
            // ```lua
            // local Foo = Foo or ({})
            // ```
            // Or, if exported:
            // ```lua
            // local ____exports.Foo = Foo or ({})
            // ```
            const oldDeclaration = statements[0];
            if (oldDeclaration !== undefined
                && (tstl.isAssignmentStatement(oldDeclaration)
                    || tstl.isVariableDeclarationStatement(oldDeclaration))) {
                // Replace the right side of the assignment with a blank Lua table, e.g.
                // ```lua
                // local ____exports.Foo = {}
                // ```
                const blankTable = tstl.createTableExpression();
                oldDeclaration.right = [blankTable];
            }
            return statements;
        },
    },
};
exports.default = plugin;
