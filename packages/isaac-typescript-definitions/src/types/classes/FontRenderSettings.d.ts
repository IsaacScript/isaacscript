import type { DrawStringAlignment } from "../../enums/DrawStringAlignment";

declare global {
  function FontRenderSettings(this: void): FontRenderSettings;

  /** Added in Repentance+. */
  interface FontRenderSettings extends IsaacAPIClass {
    EnableAutoWrap: (enabled: boolean) => void;
    EnableTruncation: (enabled: boolean) => void;
    GetAlignment: () => DrawStringAlignment;
    GetLineHeightModifier: () => float;
    GetMaxCharacters: () => int;
    GetMissingCharacterOverride: () => int;
    IsAutoWrapEnabled: () => boolean;
    IsTruncationEnabled: () => boolean;
    SetAlignment: (drawStringAlignment: DrawStringAlignment) => void;
    SetLineHeightModifier: (value: float) => void;
    SetMaxCharacters: (maxChars: int) => void;

    /**
     * Sets the character that will be used when a missing character in the font needs to be
     * rendered. This overrides previous `Font:SetMissingCharacter` settings.
     */
    SetMissingCharacterOverride: (character: int) => void;
  }
}
