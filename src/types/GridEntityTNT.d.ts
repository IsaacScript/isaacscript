import { TNTState } from "../enums/collections/gridEntityState";

declare global {
  interface GridEntityTNT extends GridEntity {
    FrameCnt: int;
    State: TNTState;
  }
}
