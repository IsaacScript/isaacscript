/** @noSelf */
declare function Font(): Font;

declare class Font {
  Load(filePath: string): boolean;
  Unload(): void;
  IsLoaded(): boolean;
  DrawString(
    str: string,
    positionX: float,
    positionY: float,
    renderColor: KColor,
    boxWidth: int,
    center: boolean,
  ): void;
  DrawStringScaled(
    str: string,
    positionX: float,
    positionY: float,
    scaleX: float,
    scaleY: float,
    RenderColor: KColor,
    boxWidth: int,
    center: boolean,
  ): void;
  DrawStringUTF8(
    str: string,
    positionX: float,
    positionY: float,
    renderColor: KColor,
    boxWidth: int,
    center: boolean,
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
  GetCharacterWidth(character: string): int;
  GetBaselineHeight(): int;
  GetLineHeight(): int;
  GetStringWidth(str: string): int;
  GetStringWidthUTF8(str: string): int;
  SetMissingCharacter(missingCharacter: int): void;
}
