import type { DamageFlag } from "isaac-typescript-definitions";
import type { WaterClipFlag } from "../../../enums/flags/WaterClipFlag";

declare global {
  interface GridEntity extends IsaacAPIClass {
    /** Returns the grid's render position. */
    GetRenderPosition: () => Vector;

    GetWaterClipFlags: () => BitFlags<WaterClipFlag>;

    /** Forces the grid entity to hurt the provided entity. */
    HurtDamage: (
      entity: Entity,
      damage: int,
      damageFlags: DamageFlag | BitFlags<DamageFlag>,
      enemyDamage: number,
      ignoreGridCollision: boolean,
    ) => void;

    HurtSurroundings: (
      enemyDistance: number,
      playerDistance: number,
      enemyDamage: number,
      playerDamage: number,
      damageFlags: BitFlags<DamageFlag>,
      ignoreGridCollisions: boolean,
    ) => void;

    /** Returns whether the grid entity is a breakable rock. */
    IsBreakableRock: () => boolean;

    ResetWaterClipFlags: () => void;
    SetWaterClipFlags: (flags: BitFlags<WaterClipFlag>) => void;
  }
}
