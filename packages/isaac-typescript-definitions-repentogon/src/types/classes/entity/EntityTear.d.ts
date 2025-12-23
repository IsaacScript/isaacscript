import type { TearVariant } from "isaac-typescript-definitions";
import type { SplitTearType } from "../../../enums/SplitTearType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface EntityTear extends Entity {
    /** Adds an entity to the tear's hit list. */
    AddToHitList: (entity: Entity) => void;

    /** Clears the tear's hit list. */
    ClearHitList: () => void;

    /**
     * Fires a split tear.
     *
     * @param position
     * @param velocity
     * @param damageMultiplier Optional. Default is 0.5.
     * @param sizeMultiplier Optional. Default is 0.6.
     * @param variant Optional. Default is `TearVariant.BLUE`.
     * @param splitTearType Optional. Default is `SplitTearType.GENERIC`. Custom split tear effects
     *                      can be implemented by passing in a string instead.
     */
    FireSplitTear: (
      position: Vector,
      velocity: Vector,
      damageMultiplier?: number,
      sizeMultiplier?: number,
      variant?: TearVariant,
      splitTearType?: SplitTearType | string,
    ) => EntityTear;

    /**
     * Returns the intensity value of the tear as a result of the Dead Eye collectible. The
     * intensity is between 0 and 1.
     */
    GetDeadEyeIntensity: () => float;

    /** Returns the hit list indices of all entities the tear has hit. */
    GetHitList: () => int[];

    /**
     * Copies the tear and applies the Multidimensional Baby tear effect to it. Returns the copied
     * tear.
     */
    MakeMultidimensionalCopy: () => EntityTear;

    /** Returns the red aura sprite used by Dead Eye. */
    GetDeadEyeSprite: () => Sprite;

    /**
     * Returns the effect sprite used by numerous tear variants such as Fire Mind and Mysterious
     * Liquid.
     */
    GetTearEffectSprite: () => Sprite;

    /** Returns the aura sprite used by Godhead tears. */
    GetTearHaloSprite: () => Sprite;

    /** Returns whether the entity is in the tear's hit list. */
    InHitList: (entity: Entity) => boolean;

    /** Returns whether the tear was created through the Multidimensional Baby effect. */
    IsMultidimensionalTouched: () => boolean;

    /** Returns whether the tear was created through the Angelic Prism effect. */
    IsPrismTouched: () => boolean;

    /** Removes an entity from the tear's hit list. */
    RemoveFromHitList: (entity: Entity) => void;

    /**
     * Repentogon's modified `EntityTear.ResetSpriteScale` method.
     *
     * Behaves the same as `EntityTear.ResetSpriteScale` except you can now choose to have it
     * re-evaluate which scale animation to play.
     *
     * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
     * definitions. However, when the project compiles the method's name will change to what it's
     * supposed to be.
     *
     * @param force Optional. Default is false.
     * @customName ResetSpriteScale
     */
    ResetSpriteScaleEx: (force?: boolean) => void;

    /** Sets whether the tear was created through the Multidimensional Baby effect. */
    SetMultidimensionalTouched: (touched: boolean) => void;

    /** Sets whether the tear was created through the Angelic Prism effect. */
    SetPrismTouched: (touched: boolean) => void;
  }
}
