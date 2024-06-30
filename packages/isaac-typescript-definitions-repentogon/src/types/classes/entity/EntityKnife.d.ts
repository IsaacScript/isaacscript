declare interface EntityKnife extends Entity {
  GetHitList: () => int[];
  GetIsSpinAttack: () => boolean;
  GetIsSwinging: () => boolean;
  SetIsSpinAttack: (isSpinAttack: boolean) => void;
  SetIsSwinging: (isSwinging: boolean) => void;
}
