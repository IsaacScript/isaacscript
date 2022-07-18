import { RockState } from "../../enums/collections/gridEntityState";
import { RockVariant } from "../../enums/collections/gridEntityVariants";

declare global {
  interface GridEntityRock extends GridEntity {
    GetBigRockFrame(): int;
    GetRubbleAnim(): string;
    GetVariant(): RockVariant;
    SetBigRockFrame(frame: int): void;
    UpdateAnimFrame(): void;

    Anim: string;
    FrameCnt: int;
    RubbleAnim: string;
    State: RockState;
  }
}
