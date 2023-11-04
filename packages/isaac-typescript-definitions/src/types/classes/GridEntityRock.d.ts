import type { RockState } from "../../enums/collections/gridEntityStates";

declare global {
  /**
   * Grid entities of the following types can be converted to this class with the
   * `GridEntity.ToRock` method:
   *
   * - `GridEntityType.ROCK` (2)
   * - `GridEntityType.BLOCK` (3)
   * - `GridEntityType.ROCK_TINTED` (4)
   * - `GridEntityType.ROCK_BOMB` (5)
   * - `GridEntityType.ROCK_ALT` (6)
   * - `GridEntityType.ROCK_SUPER_SPECIAL` (22)
   * - `GridEntityType.PILLAR` (24)
   * - `GridEntityType.ROCK_SPIKED` (25)
   * - `GridEntityType.ROCK_ALT_2` (26)
   * - `GridEntityType.ROCK_GOLD` (27)
   */
  interface GridEntityRock extends GridEntity {
    GetBigRockFrame: () => int;
    GetRubbleAnim: () => string;

    // There is no `GridEntityRock.GetVariant` method because `RockVariant` only applies to
    // `GridEntityType.ROCK`, and grid entity types other than `GridEntityRock.GetVariant` can be
    // converted to the `GridEntityRock` class. See the `GridEntityType` enum for more details.

    SetBigRockFrame: (frame: int) => void;
    UpdateAnimFrame: () => void;

    Anim: string;
    FrameCnt: int;
    RubbleAnim: string;
    State: RockState;
  }
}
