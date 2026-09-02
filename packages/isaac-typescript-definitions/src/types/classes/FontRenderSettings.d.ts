import type { DrawStringAlignment } from "../../enums/DrawStringAlignment";

declare global {
  /** Added in Repentance+. */
  interface FontRenderSettings extends IsaacAPIClass {
    readonly EnableAutoWrap: (enabled: boolean) => void;
    readonly EnableTruncation: (enabled: boolean) => void;
    readonly GetAlignment: () => DrawStringAlignment;
    readonly GetLineHeightModifier: () => float;
    readonly GetMaxCharacters: () => int;
    readonly GetMissingCharacterOverride: () => int;
    readonly IsAutoWrapEnabled: () => boolean;
    readonly IsTruncationEnabled: () => boolean;
    readonly SetAlignment: (drawStringAlignment: DrawStringAlignment) => void;
    readonly SetLineHeightModifier: (value: float) => void;
    readonly SetMaxCharacters: (maxChars: int) => void;

    /**
     * Sets the character that will be used when a missing character in the font needs to be
     * rendered. This overrides previous `Font:SetMissingCharacter` settings.
     */
    readonly SetMissingCharacterOverride: (character: int) => void;
  }

  function FontRenderSettings(this: void): FontRenderSettings;
}
