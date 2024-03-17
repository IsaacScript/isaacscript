import type {
  CollectibleType,
  Direction,
  WeaponType,
} from "isaac-typescript-definitions";
import type { WeaponModifierFlag } from "../../enums/flags/WeaponModifierFlag";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface Weapon extends IsaacAPIClass {
    ClearItemAnim: (collectible: CollectibleType) => void;
    GetCharge: () => int;
    GetDirection: () => Vector;
    GetFireDelay: () => int;
    GetMaxFireDelay: () => int;
    GetModifiers: () => BitFlags<WeaponModifierFlag>;
    GetNumFired: () => int;
    GetOwner: () => Entity | undefined;
    GetWeaponType: () => WeaponType;
    IsAxisAligned: () => boolean;
    IsItemAnimFinished: (collectible: CollectibleType) => boolean;
    PlayItemAnim: (
      collectible: CollectibleType,
      aimDirection: Direction,
      position: Vector,
      charge: int,
    ) => void;
    SetCharge: (charge: int) => void;
    SetFireDelay: (delay: int) => void;
    SetHeadLockTime: (time: int) => void;
    SetModifiers: (modifiers: BitFlags<WeaponModifierFlag>) => void;
  }
}
