declare interface EntityKnife extends Entity {
  GetHitList: () => int[];
  GetIsSpinAttack: () => boolean;
  GetIsSwinging: () => boolean;

  /** Returns whether the knife was created through the Multidimensional Baby effect. */
  IsMultidimensionalTouched: () => boolean;

  /** Returns whether the knife was created through the Angelic Prism effect. */
  IsPrismTouched: () => boolean;

  SetIsSpinAttack: (isSpinAttack: boolean) => void;
  SetIsSwinging: (isSwinging: boolean) => void;

  /** Sets whether the knife was created through the Multidimensional Baby effect. */
  SetMultidimensionalTouched: (touched: boolean) => void;

  /** Sets whether the knife was created through the Angelic Prism effect. */
  SetPrismTouched: (touched: boolean) => void;
}
