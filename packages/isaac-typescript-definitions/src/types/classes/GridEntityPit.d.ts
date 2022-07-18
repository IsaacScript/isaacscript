import { PitState } from "../../enums/collections/gridEntityState";
import { PitVariant } from "../../enums/collections/gridEntityVariants";

declare global {
  interface GridEntityPit extends GridEntity {
    GetVariant(): PitVariant;
    MakeBridge(bridgeSource?: GridEntity): void;
    SetLadder(value: boolean): void;
    UpdateCollision(): void;

    HasLadder: boolean;
    State: PitState;
  }
}
