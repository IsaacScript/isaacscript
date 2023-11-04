import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

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
    /^\w+\.\w+ \(\d+ << \d+\)$/.test(text) ||
    // e.g. 1
    /^\d+$/.test(text) ||
    // e.g. 1.0
    /^\d+\.\d+$/.test(text) ||
    // e.g. 1 << 1
    /^\d+ << \d+$/.test(text) ||
    // e.g. 1, 2, 3, 4, 5
    /^\d+, \d+$/.test(text) ||
    /^\d+, \d+, \d+$/.test(text) ||
    /^(?:\d+, ){3}\d+$/.test(text) ||
    /^(?:\d+, ){4}\d+$/.test(text) ||
    // e.g. 1.0, 2.0, 3.0, 4.0, 5.0
    /^\d+\.\d+, \d+\.\d+$/.test(text) ||
    /^(?:\d+\.\d+, ){2}\d+\.\d+$/.test(text) ||
    /^(?:\d+\.\d+, ){3}\d+\.\d+$/.test(text) ||
    /^(?:\d+\.\d+, ){4}\d+\.\d+$/.test(text)
  );
}

/**
 * A "separator" line is a line with all hyphens like the following:
 *
 * ```ts
 * // ----------------
 * // Getter functions
 * // ----------------
 * ```
 */
export function isSeparatorLine(text: string): boolean {
  return /^\s*-+\s*$/.test(text);
}

export function isSpecialComment(text: string): boolean {
  text = text.trim();

  return (
    text.startsWith("eslint-") ||
    text.startsWith("prettier-") ||
    text.startsWith("cspell:") ||
    text.startsWith("ts-prune-") || // e.g. ts-prune-ignore-next
    text.startsWith("@ts-") ||
    text.startsWith("TODO:") ||
    text.startsWith("FIXME:") ||
    text === "TODO" ||
    text === "FIXME"
  );
}
