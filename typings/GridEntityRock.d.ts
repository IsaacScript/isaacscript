declare class GridEntityRock extends GridEntity {
  GetBigRockFrame(): int;
  GetRubbleAnim(): string;
  GetSprite(): Readonly<Sprite>;
  SetBigRockFrame(frame: int): void;
  UpdateAnimFrame(): void;

  Anim: string;
  FrameCnt: int;
  RubbleAnim: string;
}
