import type { TNTState } from "../../enums/collections/gridEntityStates";

declare global {
  /**
   * Grid entities of type `GridEntityType.TNT` (12) can be converted to this class with the
   * `GridEntity.ToTNT` method.
   */
  interface GridEntityTNT extends GridEntity {
    // There is no `GridEntityTNT.GetVariant` method because there is no corresponding `TNTVariant`.

    FrameCnt: int;
    State: TNTState;
  }
}
