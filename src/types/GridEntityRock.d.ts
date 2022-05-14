declare interface GridEntityRock extends GridEntity {
  GetBigRockFrame(): int;
  GetRubbleAnim(): string;
  SetBigRockFrame(frame: int): void;
  UpdateAnimFrame(): void;

  Anim: string;
  FrameCnt: int;
  RubbleAnim: string;
}
