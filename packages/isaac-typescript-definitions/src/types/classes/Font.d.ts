declare interface Font extends IsaacAPIClass {
  /**
   * Converts UTF-8 to UTF16, then draws the string on screen.
   *
   * The `boxWidth` and `center` parameters can be used for aligning the text. Note that:
   *
   * - If `boxWidth` is zero, the text will be left-aligned and the `center` parameter will be
   *   ignored.
   * - If `boxWidth` is not zero and the `center` parameter is false, then the text will be
   *   right-aligned inside the `boxWidth` size.
   * - If `boxWidth` is not zero, and the `center` parameter is true, then the text will be centered
   *   inside the `boxWidth` size.
   *
   * Repentance+ added a separate overload for drawing a string with a custom size.
   *
   * @param str
   * @param positionX
   * @param positionY
   * @param renderColor
   * @param boxWidth Default is 0.
   * @param center Default is false.
   */
  readonly DrawString: ((
    str: string,
    positionX: float,
    positionY: float,
    renderColor: KColor,
    boxWidth?: int,
    center?: boolean,
  ) => void)
    & ((
      str: string,
      positionX: float,
      positionY: float,
      sizeX: float,
      sizeY: float,
      renderColor: KColor,
      fontRenderSettings: FontRenderSettings,
    ) => void);

  /**
   * Converts UTF-8 to UTF16, then draws the scaled string on the screen.
   *
   * This method is similar to the `Font.DrawString` method; see the documentation for that function
   * for more details.
   *
   * @param str
   * @param positionX
   * @param positionY
   * @param scaleX
   * @param scaleY
   * @param renderColor
   * @param boxWidth Default is 0.
   * @param center Default is false.
   */
  readonly DrawStringScaled: (
    str: string,
    positionX: float,
    positionY: float,
    scaleX: float,
    scaleY: float,
    renderColor: KColor,
    boxWidth?: int,
    center?: boolean,
  ) => void;

  /**
   * Draws a scaled string of Unicode text on the screen.
   *
   * This method is similar to the `Font.DrawString` method; see the documentation for that function
   * for more details.
   *
   * @param str
   * @param positionX
   * @param positionY
   * @param scaleX
   * @param scaleY
   * @param renderColor
   * @param boxWidth
   * @param center
   */
  readonly DrawStringScaledUTF8: (
    str: string,
    positionX: float,
    positionY: float,
    scaleX: float,
    scaleY: float,
    renderColor: KColor,
    boxWidth: int,
    center: boolean,
  ) => void;

  /**
   * Draws a string of Unicode text on the screen.
   *
   * This method is similar to the `Font.DrawString` method; see the documentation for that function
   * for more details.
   *
   * @param str
   * @param positionX
   * @param positionY
   * @param renderColor
   * @param boxWidth Default is 0.
   * @param center Default is false.
   */
  readonly DrawStringUTF8: (
    str: string,
    positionX: float,
    positionY: float,
    renderColor: KColor,
    boxWidth?: int,
    center?: boolean,
  ) => void;

  /**
   * Returns the number of pixels from the absolute top of the line to the base of the characters.
   */
  readonly GetBaselineHeight: () => int;

  /** Returns the width of a specific character. */
  readonly GetCharacterWidth: (character: string) => int;

  /** Returns the distance in pixels between each line of text. */
  readonly GetLineHeight: () => int;

  /** Converts a string from UTF-8 to UTF16, and returns the string's width. */
  readonly GetStringWidth: (str: string) => int;

  /** Returns the string width of a Unicode text. */
  readonly GetStringWidthUTF8: (str: string) => int;

  readonly IsLoaded: () => boolean;
  readonly Load: (filePath: string) => boolean;

  /** Sets the character that will be used when a missing character is encountered by the font. */
  readonly SetMissingCharacter: (missingCharacter: int) => void;

  /** Unloads the font from memory. */
  readonly Unload: () => void;
}

declare function Font(this: void): Font;
