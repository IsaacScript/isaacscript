/**
 * A collection of common colors that can be reused.
 *
 * Note that if you want to further modify these colors, you should copy them first with the
 * `copyColor` function.
 *
 * The non-standard colors come from:
 * https://htmlcolorcodes.com/color-names/
 */
export const K_COLORS = {
  Black: KColor(0, 0, 0, 1) as Readonly<KColor>,
  Red: KColor(1, 0, 0, 1) as Readonly<KColor>,
  Green: KColor(0, 1, 0, 1) as Readonly<KColor>,
  Blue: KColor(0, 0, 1, 1) as Readonly<KColor>,
  Yellow: KColor(1, 1, 0, 1) as Readonly<KColor>,
  Cyan: KColor(0, 1, 1, 1) as Readonly<KColor>,
  Magenta: KColor(1, 0, 1, 1) as Readonly<KColor>,
  White: KColor(1, 1, 1, 1) as Readonly<KColor>,
  Transparent: KColor(0, 0, 0, 0) as Readonly<KColor>,

  Brown: KColor(0.588, 0.294, 0, 1) as Readonly<KColor>,
  Gray: KColor(0.5, 0.5, 0.5, 1) as Readonly<KColor>,
  Orange: KColor(1, 0.647, 0, 1) as Readonly<KColor>,
  Purple: KColor(0.5, 0, 0.5, 1) as Readonly<KColor>,
} as const;
