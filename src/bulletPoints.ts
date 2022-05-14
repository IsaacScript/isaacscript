import { ensureAllCases } from "./utils";

export enum BulletPointKind {
  NonBulletPoint,
  Hyphen,
  NumberParenthesis,
  NumberPeriod,
}

/**
 * The bullet point reported may not be accurate if this is a line that is continuing from the
 * previous line. For example:
 *
 * ```ts
 * /**
 *  * This method will crash the game if you provide it an invalid collectible type, such as or
 *  * 43. (Using 0 will not cause a crash.) Thus, it is safer to use the \`RemoveCostume\`
 *  * method instead.
 *  * /
 * ```
 *
 * In this example, "43. " is incorrectly interpreted as a bullet point.
 */
export function getAdjustedBulletPointKind(
  line: string,
  previousLineWasBlank: boolean,
  previousLineEndedInColon: boolean,
  insideBulletedListKind: BulletPointKind,
): BulletPointKind {
  const rawBulletPointKind = getBulletPointKind(line);

  switch (rawBulletPointKind) {
    case BulletPointKind.NonBulletPoint: {
      return BulletPointKind.NonBulletPoint;
    }

    case BulletPointKind.Hyphen: {
      return BulletPointKind.Hyphen;
    }

    case BulletPointKind.NumberPeriod:
    case BulletPointKind.NumberParenthesis: {
      // If we are already inside of a numbered list, then do not require blank lines in between the
      // bullets.
      if (rawBulletPointKind === insideBulletedListKind) {
        return rawBulletPointKind;
      }

      // If the previous line had a colon, then do not require blank lines in between the bullets.
      if (previousLineEndedInColon) {
        return rawBulletPointKind;
      }

      // Otherwise, only interpret this as a bulleted list if the previous line was blank.
      return previousLineWasBlank
        ? rawBulletPointKind
        : BulletPointKind.NonBulletPoint;
    }

    default: {
      return ensureAllCases(rawBulletPointKind);
    }
  }
}

export function getBulletPointKind(text: string): BulletPointKind {
  const trimmedText = text.trim();

  // e.g. "- A bullet point can start with a hyphen."
  if (trimmedText.startsWith("- ")) {
    return BulletPointKind.Hyphen;
  }

  // e.g. "1. A bullet point can start with a number and a period."
  if (/^\d+\. /.test(trimmedText)) {
    return BulletPointKind.NumberPeriod;
  }

  // e.g. "1) A bullet point can start with a number and a parenthesis."
  if (/^\d+\) /.test(trimmedText)) {
    return BulletPointKind.NumberParenthesis;
  }

  return BulletPointKind.NonBulletPoint;
}

/** In this context, a string with a hyphen represents a bullet point. */
export function getSpacesBeforeBulletPoint(text: string): string {
  const match = text.match(/^( *)-/);
  if (match === null) {
    return "";
  }

  const spaces = match[1];
  if (spaces === undefined) {
    return "";
  }

  return spaces;
}
