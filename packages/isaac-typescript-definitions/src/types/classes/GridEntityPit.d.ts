import { PitState } from "../../enums/collections/gridEntityState";

declare global {
  interface GridEntityPit extends GridEntity {
    MakeBridge(bridgeSource?: GridEntity): void;
    SetLadder(value: boolean): void;
    UpdateCollision(): void;

    HasLadder: boolean;
    State: PitState;
  }
}
