import type { Direction } from "../../../enums/Direction";
import type { WeaponType } from "../../../enums/WeaponType";
import type { CollectibleType } from "../../../enums/collections/subTypes";
import type { WeaponModifier } from "../../../enums/mods/repentogon/flags/WeaponModifier";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface Weapon {
    ClearItemAnim: (item: CollectibleType) => void;
    GetCharge: () => int;
    GetDirection: () => Vector;
    GetFireDelay: () => int;
    GetMaxFireDelay: () => int;
    GetModifiers: () => int;
    GetNumFired: () => int;
    GetOwner: () => Entity;
    GetWeaponType: () => WeaponType;
    IsAxisAligned: () => boolean;
    IsItemAnimFinished: (item: CollectibleType) => boolean;
    PlayItemAnim: (
      item: CollectibleType,
      aimDirection: Direction,
      position: Vector,
      charge: int,
    ) => void;
    SetCharge: (charge: int) => void;
    SetFireDelay: (fireDelay: int) => void;
    SetHeadLockTime: (lockTime: int) => void;
    SetModifiers: (modifiers: BitFlags<WeaponModifier>) => void;
  }
}
