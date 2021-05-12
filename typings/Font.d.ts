declare function Font(this: void): Font;

declare class Font {
  DrawString(
    str: string,
    positionX: float,
    positionY: float,
    renderColor: KColor,
    boxWidth?: int, // Default is 0
    center?: boolean, // Default is false
  ): void;
  DrawStringScaled(
    str: string,
    positionX: float,
    positionY: float,
    scaleX: float,
    scaleY: float,
    renderColor: KColor,
    boxWidth?: int, // Default is 0
    center?: boolean, // Default is false
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
  DrawStringUTF8(
    str: string,
    positionX: float,
    positionY: float,
    renderColor: KColor,
    boxWidth?: int, // Default is 0
    center?: boolean, // Default is false
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
