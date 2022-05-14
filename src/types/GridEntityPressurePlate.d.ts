declare interface GridEntityPressurePlate extends GridEntity {
  Reward(): void;

  GreedModeRNG: RNG;
  NextGreedAnimation: string;
  TimerPlate: Sprite;
}
