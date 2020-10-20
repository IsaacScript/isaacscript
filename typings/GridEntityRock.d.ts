declare class GridEntityRock extends GridEntity {
  GetSprite(): Readonly<Sprite>;
  GetRubbleAnim(): string;
  SetBigRockFrame(frame: int): void;
  GetBigRockFrame(): int;
  UpdateAnimFrame(): void;

  Anim: string;
  RubbleAnim: string;
  FrameCnt: int;
}
