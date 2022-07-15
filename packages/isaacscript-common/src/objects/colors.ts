/**
 * A collection of common colors that can be reused.
 *
 * Note that if you want to further modify these colors, you should copy them first with the
 * `copyColor` function.
 *
 * The non-standard colors come from:
 * https://htmlcolorcodes.com/color-names/
 */
export const COLORS = {
  Black: Color(0, 0, 0) as Readonly<Color>,
  Red: Color(1, 0, 0) as Readonly<Color>,
  Green: Color(0, 1, 0) as Readonly<Color>,
  Blue: Color(0, 0, 1) as Readonly<Color>,
  Yellow: Color(1, 1, 0) as Readonly<Color>,
  Pink: Color(1, 0, 1) as Readonly<Color>,
  Cyan: Color(0, 1, 1) as Readonly<Color>,
  White: Color(1, 1, 1) as Readonly<Color>,

  Brown: Color(0.588, 0.294, 0) as Readonly<Color>,
  Gray: Color(0.5, 0.5, 0.5) as Readonly<Color>,
  Orange: Color(1, 0.647, 0) as Readonly<Color>,
  Purple: Color(0.5, 0, 0.5) as Readonly<Color>,
} as const;
