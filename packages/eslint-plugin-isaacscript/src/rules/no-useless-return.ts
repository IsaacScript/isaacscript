/* eslint-disable */
// @ts-nocheck
// cspell:ignore Katz

/**
 * This rule is slightly modified from the original ESLint version in order to never apply the fix:
 * https://github.com/eslint/eslint/blob/main/lib/rules/no-useless-return.js
 *
 * We disable type-checking, linting, and formatting in this file in order to keep the code as close
 * as possible to the original.
 */

import { createRule } from "../utils.js";

/**
 * @fileoverview Disallow redundant return statements
 * @author Teddy Katz
 */
"use strict";

//------------------------------------------------------------------------------
// External code (copy pasted from elsewhere in the ESLint repository)
//------------------------------------------------------------------------------

// A set of node types that can contain a list of statements
const STATEMENT_LIST_PARENTS = new Set(["Program", "BlockStatement", "StaticBlock", "SwitchCase"]);

const anyFunctionPattern = /^(?:Function(?:Declaration|Expression)|ArrowFunctionExpression)$/u;
const anyLoopPattern = /^(?:DoWhile|For|ForIn|ForOf|While)Statement$/u;

/**
 * Checks whether a given node is a function node or not.
 * The following types are function nodes:
 *
 * - ArrowFunctionExpression
 * - FunctionDeclaration
 * - FunctionExpression
 * @param {ASTNode|null} node A node to check.
 * @returns {boolean} `true` if the node is a function node.
 */
function isFunction(node) {
    return Boolean(node && anyFunctionPattern.test(node.type));
}

/**
 * Checks whether a given node is a loop node or not.
 * The following types are loop nodes:
 *
 * - DoWhileStatement
 * - ForInStatement
 * - ForOfStatement
 * - ForStatement
 * - WhileStatement
 * @param {ASTNode|null} node A node to check.
 * @returns {boolean} `true` if the node is a loop node.
 */
function isLoop(node) {
    return Boolean(node && anyLoopPattern.test(node.type));
}

/**
 * Checks whether the given node is in a loop or not.
 * @param {ASTNode} node The node to check.
 * @returns {boolean} `true` if the node is in a loop.
 */
function isInLoop(node) {
    for (let currentNode = node; currentNode && !isFunction(currentNode); currentNode = currentNode.parent) {
        if (isLoop(currentNode)) {
            return true;
        }
    }

    return false;
}

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Removes the given element from the array.
 * @param {Array} array The source array to remove.
 * @param {any} element The target item to remove.
 * @returns {void}
 */
function remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

/**
 * Checks whether it can remove the given return statement or not.
 * @param {ASTNode} node The return statement node to check.
 * @returns {boolean} `true` if the node is removable.
 */
function isRemovable(node) {
    return STATEMENT_LIST_PARENTS.has(node.parent.type);
}

/**
 * Checks whether the given return statement is in a `finally` block or not.
 * @param {ASTNode} node The return statement node to check.
 * @returns {boolean} `true` if the node is in a `finally` block.
 */
function isInFinally(node) {
    for (
        let currentNode = node;
        currentNode && currentNode.parent && !isFunction(currentNode);
        currentNode = currentNode.parent
    ) {
        if (currentNode.parent.type === "TryStatement" && currentNode.parent.finalizer === currentNode) {
            return true;
        }
    }

    return false;
}

/**
 * Checks all segments in a set and returns true if any are reachable.
 * @param {Set<CodePathSegment>} segments The segments to check.
 * @returns {boolean} True if any segment is reachable; false otherwise.
 */
function isAnySegmentReachable(segments) {

    for (const segment of segments) {
        if (segment.reachable) {
            return true;
        }
    }

    return false;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export const noUselessReturn = createRule({
    name: "no-useless-return", // Added
    defaultOptions: [], // Added; necessary for the `ruleCreator` helper function

    meta: {
        type: "suggestion",

        docs: {
            description: "Disallow redundant return statements (with no autofixer)", // Changed to add extra description
            recommended: "recommended", // Changed from true
            // url: "https://eslint.org/docs/latest/rules/no-useless-return"
        },

        // fixable: "code",
        schema: [],

        messages: {
            unnecessaryReturn: "Unnecessary return statement."
        }
    },

    create(context) {
        const segmentInfoMap = new WeakMap();
        const sourceCode = context.sourceCode;
        let scopeInfo = null;

        /**
         * Checks whether the given segment is terminated by a return statement or not.
         * @param {CodePathSegment} segment The segment to check.
         * @returns {boolean} `true` if the segment is terminated by a return statement, or if it's still a part of unreachable.
         */
        function isReturned(segment) {
            const info = segmentInfoMap.get(segment);

            return !info || info.returned;
        }

        /**
         * Collects useless return statements from the given previous segments.
         *
         * A previous segment may be an unreachable segment.
         * In that case, the information object of the unreachable segment is not
         * initialized because `onCodePathSegmentStart` event is not notified for
         * unreachable segments.
         * This goes to the previous segments of the unreachable segment recursively
         * if the unreachable segment was generated by a return statement. Otherwise,
         * this ignores the unreachable segment.
         *
         * This behavior would simulate code paths for the case that the return
         * statement does not exist.
         * @param {ASTNode[]} uselessReturns The collected return statements.
         * @param {CodePathSegment[]} prevSegments The previous segments to traverse.
         * @param {WeakSet<CodePathSegment>} [providedTraversedSegments] A set of segments that have already been traversed in this call
         * @returns {ASTNode[]} `uselessReturns`.
         */
        function getUselessReturns(uselessReturns, prevSegments, providedTraversedSegments) {
            const traversedSegments = providedTraversedSegments || new WeakSet();

            for (const segment of prevSegments) {
                if (!segment.reachable) {
                    if (!traversedSegments.has(segment)) {
                        traversedSegments.add(segment);
                        getUselessReturns(
                            uselessReturns,
                            segment.allPrevSegments.filter(isReturned),
                            traversedSegments
                        );
                    }
                    continue;
                }

                if (segmentInfoMap.has(segment)) {
                    uselessReturns.push(...segmentInfoMap.get(segment).uselessReturns);
                }
            }

            return uselessReturns;
        }

        /**
         * Removes the return statements on the given segment from the useless return
         * statement list.
         *
         * This segment may be an unreachable segment.
         * In that case, the information object of the unreachable segment is not
         * initialized because `onCodePathSegmentStart` event is not notified for
         * unreachable segments.
         * This goes to the previous segments of the unreachable segment recursively
         * if the unreachable segment was generated by a return statement. Otherwise,
         * this ignores the unreachable segment.
         *
         * This behavior would simulate code paths for the case that the return
         * statement does not exist.
         * @param {CodePathSegment} segment The segment to get return statements.
         * @param {Set<CodePathSegment>} usedUnreachableSegments A set of segments that have already been traversed in this call.
         * @returns {void}
         */
        function markReturnStatementsOnSegmentAsUsed(segment, usedUnreachableSegments) {
            if (!segment.reachable) {
                usedUnreachableSegments.add(segment);
                segment.allPrevSegments
                    .filter(isReturned)
                    .filter(prevSegment => !usedUnreachableSegments.has(prevSegment))
                    .forEach(prevSegment => markReturnStatementsOnSegmentAsUsed(prevSegment, usedUnreachableSegments));
                return;
            }

            const info = segmentInfoMap.get(segment);

            if (!info) {
                return;
            }

            info.uselessReturns = info.uselessReturns.filter(node => {
                if (scopeInfo.traversedTryBlockStatements && scopeInfo.traversedTryBlockStatements.length > 0) {
                    const returnInitialRange = node.range[0];
                    const returnFinalRange = node.range[1];

                    const areBlocksInRange = scopeInfo.traversedTryBlockStatements.some(tryBlockStatement => {
                        const blockInitialRange = tryBlockStatement.range[0];
                        const blockFinalRange = tryBlockStatement.range[1];

                        return (
                            returnInitialRange >= blockInitialRange &&
                            returnFinalRange <= blockFinalRange
                        );
                    });

                    if (areBlocksInRange) {
                        return true;
                    }
                }

                remove(scopeInfo.uselessReturns, node);
                return false;
            });
        }

        /**
         * Removes the return statements on the current segments from the useless
         * return statement list.
         *
         * This function will be called at every statement except FunctionDeclaration,
         * BlockStatement, and BreakStatement.
         *
         * - FunctionDeclarations are always executed whether it's returned or not.
         * - BlockStatements do nothing.
         * - BreakStatements go the next merely.
         * @returns {void}
         */
        function markReturnStatementsOnCurrentSegmentsAsUsed() {
            scopeInfo
                .currentSegments
                .forEach(segment => markReturnStatementsOnSegmentAsUsed(segment, new Set()));
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            // Makes and pushes a new scope information.
            onCodePathStart(codePath) {
                scopeInfo = {
                    upper: scopeInfo,
                    uselessReturns: [],
                    traversedTryBlockStatements: [],
                    codePath,
                    currentSegments: new Set()
                };
            },

            // Reports useless return statements if exist.
            onCodePathEnd() {
                for (const node of scopeInfo.uselessReturns) {
                    context.report({
                        node,
                        loc: node.loc,
                        messageId: "unnecessaryReturn",
                    });
                }

                scopeInfo = scopeInfo.upper;
            },

            /*
             * Initializes segments.
             * NOTE: This event is notified for only reachable segments.
             */
            onCodePathSegmentStart(segment) {
                scopeInfo.currentSegments.add(segment);

                const info = {
                    uselessReturns: getUselessReturns([], segment.allPrevSegments),
                    returned: false
                };

                // Stores the info.
                segmentInfoMap.set(segment, info);
            },

            onUnreachableCodePathSegmentStart(segment) {
                scopeInfo.currentSegments.add(segment);
            },

            onUnreachableCodePathSegmentEnd(segment) {
                scopeInfo.currentSegments.delete(segment);
            },

            onCodePathSegmentEnd(segment) {
                scopeInfo.currentSegments.delete(segment);
            },

            // Adds ReturnStatement node to check whether it's useless or not.
            ReturnStatement(node) {
                if (node.argument) {
                    markReturnStatementsOnCurrentSegmentsAsUsed();
                }
                if (
                    node.argument ||
                    isInLoop(node) ||
                    isInFinally(node) ||

                    // Ignore `return` statements in unreachable places (https://github.com/eslint/eslint/issues/11647).
                    !isAnySegmentReachable(scopeInfo.currentSegments)
                ) {
                    return;
                }

                for (const segment of scopeInfo.currentSegments) {
                    const info = segmentInfoMap.get(segment);

                    if (info) {
                        info.uselessReturns.push(node);
                        info.returned = true;
                    }
                }
                scopeInfo.uselessReturns.push(node);
            },

            "TryStatement > BlockStatement.block:exit"(node) {
                scopeInfo.traversedTryBlockStatements.push(node);
            },

            "TryStatement:exit"() {
                scopeInfo.traversedTryBlockStatements.pop();
            },

            /*
             * Registers for all statement nodes except FunctionDeclaration, BlockStatement, BreakStatement.
             * Removes return statements of the current segments from the useless return statement list.
             */
            ClassDeclaration: markReturnStatementsOnCurrentSegmentsAsUsed,
            ContinueStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            DebuggerStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            DoWhileStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            EmptyStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            ExpressionStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            ForInStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            ForOfStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            ForStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            IfStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            ImportDeclaration: markReturnStatementsOnCurrentSegmentsAsUsed,
            LabeledStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            SwitchStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            ThrowStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            TryStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            VariableDeclaration: markReturnStatementsOnCurrentSegmentsAsUsed,
            WhileStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            WithStatement: markReturnStatementsOnCurrentSegmentsAsUsed,
            ExportNamedDeclaration: markReturnStatementsOnCurrentSegmentsAsUsed,
            ExportDefaultDeclaration: markReturnStatementsOnCurrentSegmentsAsUsed,
            ExportAllDeclaration: markReturnStatementsOnCurrentSegmentsAsUsed
        };
    }
});
