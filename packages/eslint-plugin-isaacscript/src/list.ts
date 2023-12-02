/**
 * A description of the kind of list that is currently being iterated over. For example, the
 * following text is a list:
 *
 * ```text
 * 1. Apple
 * 2. Banana
 * 3. Pear
 * ```
 */
export interface List {
  kind: ListKind;

  // eslint-disable-next-line isaacscript/format-jsdoc-comments
  /**
   * The size of the whitespace prior to the marker.
   * e.g. "  1. Foo" would be 2.
   */
  numLeadingSpaces: number;

  /**
   * The size of the characters that make up the bullet point.
   * e.g. "1. Foo" would be 3.
   */
  markerSize: number;

  /**
   * The contents of JSDoc tag header, if any.
   * e.g. "@param foo This is foo." would be "@param foo".
   */
  jsDocTagName?: string;
}

export enum ListKind {
  Hyphen = "Hyphen",
  NumberParenthesis = "NumberParenthesis",
  NumberPeriod = "NumberPeriod",
  JSDocTag = "JSDocTag",
}

/**
 * When using the `getList` function, the returned list may not be accurate if this is a line that
 * is continuing from the previous line. For example:
 *
 * ```text
 * This method will crash the game if you provide it an invalid number, such as 10000000000000000 or
 * 43. (Using 0 will not cause a crash.)
 * ```
 *
 * Here, "43. " is incorrectly interpreted as the beginning of a list. In order to work around this
 * problem, use the `getAdjustedList` function instead.
 */
// eslint-disable-next-line isaacscript/strict-undefined-functions
export function getAdjustedList(
  line: string,
  previousLineWasBlank: boolean,
  previousLineEndedInColon: boolean,
  insideList: List | undefined,
): List | undefined {
  const list = getList(line);
  if (list === undefined) {
    return undefined;
  }

  switch (list.kind) {
    case ListKind.Hyphen: {
      return list;
    }

    case ListKind.NumberPeriod:
    case ListKind.NumberParenthesis: {
      // If we are already inside of a numbered list, then do not require blank lines in between the
      // bullets.
      if (list.kind === insideList?.kind) {
        return list;
      }

      // If the previous line had a colon, then do not require blank lines in between the bullets.
      if (previousLineEndedInColon) {
        return list;
      }

      // Otherwise, only interpret this as a bulleted list if the previous line was blank.
      return previousLineWasBlank ? list : undefined;
    }

    case ListKind.JSDocTag: {
      return list;
    }
  }
}

function getList(line: string): List | undefined {
  const originalLength = line.length;
  line = line.trimStart();
  const trimmedLength = line.length;
  const numLeadingSpaces = originalLength - trimmedLength;

  // e.g. "- A bullet point can start with a hyphen."
  if (line.startsWith("- ")) {
    return {
      kind: ListKind.Hyphen,
      numLeadingSpaces,
      markerSize: "- ".length,
    };
  }

  /** e.g. "1. A bullet point can start with a number and a period." */
  const numberPeriodMatch = line.match(/^(\d+)\. /);
  if (
    numberPeriodMatch !== null &&
    numberPeriodMatch[1] !== undefined &&
    numberPeriodMatch[1] !== "0"
  ) {
    return {
      kind: ListKind.NumberPeriod,
      numLeadingSpaces,
      markerSize: numberPeriodMatch[1].length + ". ".length,
    };
  }

  /** e.g. "1) A bullet point can start with a number and a parenthesis." */
  const numberParenthesisMatch = line.match(/^(\d+)\) /);
  if (
    numberParenthesisMatch !== null &&
    numberParenthesisMatch[1] !== undefined &&
    numberParenthesisMatch[1] !== "0"
  ) {
    return {
      kind: ListKind.NumberParenthesis,
      numLeadingSpaces,
      markerSize: numberParenthesisMatch[1].length + ") ".length,
    };
  }

  const jsDocTagName = getJSDocTagName(line);
  if (jsDocTagName !== undefined) {
    return {
      kind: ListKind.JSDocTag,
      numLeadingSpaces,
      markerSize: jsDocTagName.length + " ".length,
      jsDocTagName,
    };
  }

  return undefined;
}

/**
 * Returns a string containing the param header, if any. For example, "@returns Foo" would return
 * "@returns".
 *
 * For "@param" tags, the returned tag string will include the variable name, if any. For example,
 * "@param foo Foo" would return "@param foo".
 */
function getJSDocTagName(text: string): string | undefined {
  text = text.trimStart();

  if (!text.startsWith("@")) {
    return undefined;
  }

  const tagMatch = text.match(/^@(?<tagName>\w+)/);
  if (tagMatch === null || tagMatch.groups === undefined) {
    return undefined;
  }

  const { tagName } = tagMatch.groups;
  if (tagName === undefined) {
    return undefined;
  }

  // Specific JSDoc tags have words after them that should be part of the tag for indenting
  // purposes.
  if (tagName === "param") {
    const paramMatch = text.match(/^(?<tagWithVariableName>@\w+ \w+)/);
    if (paramMatch === null || paramMatch.groups === undefined) {
      return "@param";
    }

    const { tagWithVariableName } = paramMatch.groups;
    if (tagWithVariableName === undefined) {
      return "@param";
    }

    return tagWithVariableName;
  }

  return `@${tagName}`;
}

/**
 * When iterating over lines of text, by default, we want to keep the existing list object, if any.
 */
export function reachedNewList(
  insideList: List | undefined,
  list: List | undefined,
): boolean {
  if (list === undefined) {
    return false;
  }

  return (
    insideList === undefined || // Going from a non-list to list
    insideList.numLeadingSpaces !== list.numLeadingSpaces || // Going from a list to a sub-list
    insideList.jsDocTagName !== list.jsDocTagName // Going from a JSDoc to a different JSDoc tag
  );
}
