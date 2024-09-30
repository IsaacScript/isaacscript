declare interface EntityKnife extends Entity {
  /** Returns an array of entity indexes that the knife is currently hitting. */
  GetHitList: () => int[];

  /** Returns whether the knife is performing a spinning attack. */
  GetIsSpinAttack: () => boolean;

  /** Returns whether the entity knife is swinging. */
  GetIsSwinging: () => boolean;

  /** Returns whether the knife was created through the Multidimensional Baby effect. */
  IsMultidimensionalTouched: () => boolean;

  /** Returns whether the knife was created through the Angelic Prism effect. */
  IsPrismTouched: () => boolean;

  /** Returns whether the entity knife is performing a spin attack. */
  SetIsSpinAttack: (isSpinAttack: boolean) => void;

  /** Sets whether the knife is swinging. */
  SetIsSwinging: (isSwinging: boolean) => void;

  /** Sets whether the knife was created through the Multidimensional Baby effect. */
  SetMultidimensionalTouched: (touched: boolean) => void;

  /** Sets whether the knife was created through the Angelic Prism effect. */
  SetPrismTouched: (touched: boolean) => void;
}
