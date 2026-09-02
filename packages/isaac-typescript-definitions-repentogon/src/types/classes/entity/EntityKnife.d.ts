import type { TearVariant } from "isaac-typescript-definitions";
import type { SplitTearType } from "../../../enums/SplitTearType";

declare interface EntityKnife extends Entity {
  /** Adds an entity to the knife's hit list. */
  readonly AddToHitList: (entity: Entity) => void;

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
  readonly FireSplitTear: (
    position: Vector,
    velocity: Vector,
    damageMultiplier?: number,
    sizeMultiplier?: number,
    variant?: TearVariant,
    splitTearType?: SplitTearType | string,
  ) => EntityTear;

  readonly GetHitboxParentKnife: () => EntityKnife | undefined;

  /** Returns an array of entity indexes that the knife is currently hitting. */
  readonly GetHitList: () => int[];

  /** Returns whether the knife is performing a spinning attack. */
  readonly GetIsSpinAttack: () => boolean;

  /** Returns whether the entity knife is swinging. */
  readonly GetIsSwinging: () => boolean;

  /** Returns whether the entity is in the knife's hit list. */
  readonly InHitList: (entity: Entity) => boolean;

  /** Returns whether the knife was created through the Multidimensional Baby effect. */
  readonly IsMultidimensionalTouched: () => boolean;

  /** Returns whether the knife was created through the Angelic Prism effect. */
  readonly IsPrismTouched: () => boolean;

  /** Removes an entity from the knife's hit list. */
  readonly RemoveFromHitList: (entity: Entity) => void;

  readonly SetHitboxParentKnife: (parentKnife: EntityKnife | undefined) => void;

  /** Returns whether the entity knife is performing a spin attack. */
  readonly SetIsSpinAttack: (isSpinAttack: boolean) => void;

  /** Sets whether the knife is swinging. */
  readonly SetIsSwinging: (isSwinging: boolean) => void;

  /** Sets whether the knife was created through the Multidimensional Baby effect. */
  readonly SetMultidimensionalTouched: (touched: boolean) => void;

  /** Sets whether the knife was created through the Angelic Prism effect. */
  readonly SetPrismTouched: (touched: boolean) => void;
}
