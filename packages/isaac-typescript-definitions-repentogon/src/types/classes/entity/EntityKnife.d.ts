import type { TearVariant } from "isaac-typescript-definitions";
import type { SplitTearType } from "../../../enums/SplitTearType";

declare interface EntityKnife extends Entity {
  /** Adds an entity to the knife's hit list. */
  AddToHitList: (entity: Entity) => void;

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

  GetHitboxParentKnife: () => EntityKnife | undefined;

  /** Returns an array of entity indexes that the knife is currently hitting. */
  GetHitList: () => int[];

  /** Returns whether the knife is performing a spinning attack. */
  GetIsSpinAttack: () => boolean;

  /** Returns whether the entity knife is swinging. */
  GetIsSwinging: () => boolean;

  /** Returns whether the entity is in the knife's hit list. */
  InHitList: (entity: Entity) => boolean;

  /** Returns whether the knife was created through the Multidimensional Baby effect. */
  IsMultidimensionalTouched: () => boolean;

  /** Returns whether the knife was created through the Angelic Prism effect. */
  IsPrismTouched: () => boolean;

  /** Removes an entity from the knife's hit list. */
  RemoveFromHitList: (entity: Entity) => void;

  SetHitboxParentKnife: (parentKnife: EntityKnife | undefined) => void;

  /** Returns whether the entity knife is performing a spin attack. */
  SetIsSpinAttack: (isSpinAttack: boolean) => void;

  /** Sets whether the knife is swinging. */
  SetIsSwinging: (isSwinging: boolean) => void;

  /** Sets whether the knife was created through the Multidimensional Baby effect. */
  SetMultidimensionalTouched: (touched: boolean) => void;

  /** Sets whether the knife was created through the Angelic Prism effect. */
  SetPrismTouched: (touched: boolean) => void;
}
