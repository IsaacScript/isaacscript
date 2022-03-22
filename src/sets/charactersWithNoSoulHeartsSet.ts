/**
 * The set of characters where soul hearts will be automatically stripped away (e.g. Bethany). This
 * includes The Lost and Tainted Lost.
 */
export const CHARACTERS_WITH_NO_SOUL_HEARTS_SET: ReadonlySet<PlayerType> =
  new Set([
    PlayerType.PLAYER_THELOST, // 10
    PlayerType.PLAYER_KEEPER, // 14
    PlayerType.PLAYER_BETHANY, // 18
    PlayerType.PLAYER_THELOST_B, // 31
    PlayerType.PLAYER_KEEPER_B, // 33
  ]);
