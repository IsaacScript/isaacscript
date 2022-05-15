import { TSESLint, TSESTree } from "@typescript-eslint/utils";

/**
 * Returns false for trailing comments like:
 *
 * ```ts
 * const abc = 123; // Foo
 * ```
 */
export function isCommentOnOwnLine(
  sourceCode: TSESLint.SourceCode,
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

export function isEnumBlockLabel(text: string): boolean {
  text = text.trim();

  return (
    // e.g. CollectibleType.SAD_ONION
    /^\w+\.\w+$/.test(text) ||
    // e.g. CollectibleType.SAD_ONION (1)
    /^\w+\.\w+ \(\d+\)$/.test(text) ||
    // e.g. CacheFlag.FIRE_DELAY (1 << 1)
    /^\w+\.\w+ \(\d+ << \d+\)$/.test(text)
  );
}

export function isSpecialComment(text: string): boolean {
  text = text.trim();

  return (
    text.startsWith("eslint-enable") ||
    text.startsWith("eslint-disable") ||
    text.startsWith("cspell:") ||
    text.startsWith("ts-prune-") ||
    text.startsWith("@ts-")
  );
}

export function startsWithExample(text: string): boolean {
  const trimmedText = text.trim();

  return (
    // e.g. "e.g. Foo"
    trimmedText.startsWith("e.g. ") ||
    // e.g. "(e.g. Foo)"
    trimmedText.startsWith("(e.g. ") ||
    // e.g. "i.e. Foo"
    trimmedText.startsWith("i.e. ") ||
    // e.g. "(i.e. Foo)"
    trimmedText.startsWith("(i.e. ")
    // e.g. "e.g. Foo"
  );
}
