import type { ProceduralEffectActionType } from "../../../../enums/mods/repentogon/ProceduralEffectActionType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface ProceduralItem {
    GetDamage: () => number;
    GetEffect: (index: int) => ProceduralEffectActionType;
    GetEffectCount: () => int;
    GetFireDelay: () => number;
    GetID: () => int;
    GetItem: () => ItemConfigItem;
    GetLuck: () => number;
    GetRange: () => number;
    GetShotSpeed: () => number;
    GetSpeed: () => number;
    GetTargetItem: () => ItemConfigItem;
  }
}
