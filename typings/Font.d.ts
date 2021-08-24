declare function Font(this: void): Font;

declare interface Font {
  /**
   * @param str
   * @param positionX
   * @param positionY
   * @param renderColor
   * @param boxWidth Default is 0.
   * @param center Default is false.
   */
  DrawString(
    str: string,
    positionX: float,
    positionY: float,
    renderColor: KColor,
    boxWidth?: int,
    center?: boolean,
  ): void;
  /**
   * @param str
   * @param positionX
   * @param positionY
   * @param scaleX
   * @param scaleY
   * @param renderColor
   * @param boxWidth Default is 0.
   * @param center Default is false.
   */
  DrawStringScaled(
    str: string,
    positionX: float,
    positionY: float,
    scaleX: float,
    scaleY: float,
    renderColor: KColor,
    boxWidth?: int,
    center?: boolean,
  ): void;
  DrawStringScaledUTF8(
    str: string,
    positionX: float,
    positionY: float,
    scaleX: float,
    scaleY: float,
    renderColor: KColor,
    boxWidth: int,
    center: boolean,
  ): void;
  /**
   * @param str
   * @param positionX
   * @param positionY
   * @param renderColor
   * @param boxWidth Default is 0.
   * @param center Default is false.
   */
  DrawStringUTF8(
    str: string,
    positionX: float,
    positionY: float,
    renderColor: KColor,
    boxWidth?: int,
    center?: boolean,
  ): void;
  GetBaselineHeight(): int;
  GetCharacterWidth(character: string): int;
  GetLineHeight(): int;
  GetStringWidth(str: string): int;
  GetStringWidthUTF8(str: string): int;
  IsLoaded(): boolean;
  Load(filePath: string): boolean;
  SetMissingCharacter(missingCharacter: int): void;
  Unload(): void;
}
