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

import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

const plugin: tstl.Plugin = {
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
      if (
        oldDeclaration !== undefined
        && (tstl.isAssignmentStatement(oldDeclaration)
          || tstl.isVariableDeclarationStatement(oldDeclaration))
      ) {
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

export default plugin;
