import { TSESTree } from "@typescript-eslint/utils";
import { Linter, SourceCode } from "@typescript-eslint/utils/dist/ts-eslint";

/**
 * Returns false for trailing comments like:
 *
 * ```ts
 * const abc = 123; // Foo
 * ```
 */
export function isCommentOnOwnLine(
  sourceCode: SourceCode,
  comment: TSESTree.Comment,
): boolean {
  const startLine = comment.loc.start.line;
  const endLine = comment.loc.end.line;

  const previousToken = sourceCode.getTokenBefore(comment);
  const previousTokenEndLine =
    previousToken === null ? null : previousToken.loc.end.line;
  const nextToken = sourceCode.getTokenAfter(comment);
  const nextTokenStartLine =
    nextToken === null ? null : nextToken.loc.start.line;

  return startLine !== previousTokenEndLine && endLine !== nextTokenStartLine;
}

// TODO: delete
export function isCodeInComment(value: string, parserPath: string): boolean {
  const linter = new Linter();

  // eslint-disable-next-line
  linter.defineParser("parser", require(parserPath) as Linter.ParserModule);
  const output = linter.verify(value, { parser: "parser" });

  return !output.some((msg) => msg.message.includes("Parsing error"));
}
