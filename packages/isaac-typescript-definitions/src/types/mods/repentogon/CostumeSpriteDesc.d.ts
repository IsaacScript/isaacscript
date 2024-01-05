import type { SkinColor } from "../../../enums/SkinColor";
import type { PlayerType } from "../../../enums/collections/subTypes";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  interface CostumeSpriteDesc {
    CanOverwriteColor: () => boolean;
    GetBodyColor: () => SkinColor;
    GetHeadColor: () => SkinColor;
    GetItemConfig: () => ItemConfigItem;
    GetPlayerType: () => PlayerType;
    GetPriority: () => int;
    GetSprite: () => Sprite;
    HasSkinAlt: () => boolean;
    IsFlying: () => boolean;
    IsItemAnimPlaying: () => boolean;
    IsItemStateOnly: () => boolean;
  }
}
