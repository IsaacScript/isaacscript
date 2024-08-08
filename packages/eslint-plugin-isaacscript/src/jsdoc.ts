import { TSESTree } from "@typescript-eslint/utils";

export function getJSDocComments(
  comments: readonly TSESTree.Comment[],
): readonly TSESTree.Comment[] {
  return comments.filter(
    (comment) =>
      comment.type === TSESTree.AST_TOKEN_TYPES.Block && // i.e. a "/*" comment
      comment.value.startsWith("*"), // i.e. a "/**" comment
  );
}

export function getTextFromJSDocComment(comment: string): string {
  comment = comment.trim();

  const lines = comment.split("\n");
  const linesWithRemovedAsterisks = lines.map((line) => {
    // First, if the line contains only spaces and/or asterisks, it can be deleted.
    if (/^[\s*]*$/.test(line)) {
      return "";
    }

    // We have to be careful not to trim all of the whitespace from the line here because whitespace
    // must be preserved while inside of code blocks.
    line = line.replace(/^\s*\* /, "");

    // Remove any duplicate asterisks, like "* * Foo".
    while (line.startsWith("* ")) {
      line = line.replace(/^\* /, "");
    }

    return line;
  });

  return linesWithRemovedAsterisks.join("\n").trim();
}
