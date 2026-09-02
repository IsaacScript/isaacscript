import type { CollectibleType, EntityType } from "isaac-typescript-definitions";
import type { ProceduralEffectActionType } from "../../../enums/ProceduralEffectActionType";
import type { ProceduralEffectConditionType } from "../../../enums/ProceduralEffectConditionType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface ProceduralEffect {
    /**
     * Returns a set of properties describing the effect.The available properties depends on the
     * effect's `ProceduralEffectActionType`.
     */
    readonly GetActionProperty: () => {
      id?: CollectibleType;
      type?: EntityType;
      variant?: int;
      fromType?: int;
      fromVariant?: int;
      toType?: EntityType;
      toVariant?: int;
      radius?: number;
      damage?: number;
      scale?: number;
    };

    /**
     * Returns the effect's `ProceduralEffectActionType`, which describes what the effect does when
     * triggered.
     */
    readonly GetActionType: () => ProceduralEffectActionType;

    readonly GetConditionProperty: () => { type?: EntityType; variant?: int };

    /**
     * Returns the effect's `ProceduralEffectConditionType`, which describes the conditions to
     * trigger the effect.
     */
    readonly GetConditionType: () => ProceduralEffectConditionType;

    readonly GetScore: () => number;

    /** Returns the chance (between 0 and 1) for the effect to be triggered. */
    readonly GetTriggerChance: () => float;

    readonly GetTriggerChanceScale: () => number;
  }
}
