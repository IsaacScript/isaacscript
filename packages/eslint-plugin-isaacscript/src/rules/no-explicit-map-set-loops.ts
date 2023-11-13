import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import { getTypeName } from "../typeUtils";
import { createRule } from "../utils";

type Options = [];
type MessageIds = "noExplicitMap" | "noExplicitSet";

export const noExplicitMapSetLoops = createRule<Options, MessageIds>({
  name: "no-explicit-map-set-loops",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows explicit iteration for maps and sets",
      recommended: "recommended",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      noExplicitMap:
        'Explicit iteration over maps is disallowed. (Get rid of the ".entries()".)',
      noExplicitSet:
        'Explicit iteration over sets is disallowed. (Get rid of the ".values()".)',
    },
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      ForOfStatement(node) {
        const callExpression = node.right;
        if (callExpression.type !== AST_NODE_TYPES.CallExpression) {
          return;
        }

        const memberExpression = callExpression.callee;
        if (memberExpression.type !== AST_NODE_TYPES.MemberExpression) {
          return;
        }

        const potentialMapOrSet = memberExpression.object;
        const potentialMapOrSetTSNode =
          parserServices.esTreeNodeToTSNodeMap.get(potentialMapOrSet);
        const potentialMapOrSetType = checker.getTypeAtLocation(
          potentialMapOrSetTSNode,
        );

        const potentialMapOrSetName = getTypeName(potentialMapOrSetType);
        if (potentialMapOrSetName === undefined) {
          return;
        }

        const typeTuple = getTypeTuple(potentialMapOrSetName);
        if (typeTuple === undefined) {
          return;
        }
        const [messageId, expectedMethodName] = typeTuple;

        const methodIdentifier = memberExpression.property;
        if (methodIdentifier.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const methodName = methodIdentifier.name;
        if (methodName !== expectedMethodName) {
          return;
        }

        const callExpressionEnd = callExpression.range[1];
        const replacementStart =
          callExpressionEnd - `.${expectedMethodName}()`.length;
        const replacementEnd = callExpressionEnd;

        context.report({
          loc: methodIdentifier.loc,
          messageId,
          fix: (fixer) =>
            fixer.replaceTextRange([replacementStart, replacementEnd], ""),
        });
      },
    };
  },
});

function getTypeTuple(
  typeName: string,
): [messageId: MessageIds, expectedMethodName: string] | undefined {
  if (typeName === "Map" || typeName === "ReadonlyMap") {
    return ["noExplicitMap", "entries"];
  }

  if (typeName === "Set" || typeName === "ReadonlySet") {
    return ["noExplicitSet", "values"];
  }

  return undefined;
}
