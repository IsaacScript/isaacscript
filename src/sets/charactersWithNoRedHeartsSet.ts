/**
 * The set of characters where red heart containers will be turned into soul hearts (e.g. Blue
 * Baby). This includes The Lost and Tainted Lost. This does not include Keeper or Tainted Keeper.
 */
export const CHARACTERS_WITH_NO_RED_HEARTS_SET: ReadonlySet<PlayerType> =
  new Set([
    PlayerType.PLAYER_BLUEBABY, // 4
    PlayerType.PLAYER_THELOST, // 10
    PlayerType.PLAYER_BLACKJUDAS, // 12
    PlayerType.PLAYER_JUDAS_B, // 24
    PlayerType.PLAYER_BLUEBABY_B, // 25
    PlayerType.PLAYER_THELOST_B, // 31
    PlayerType.PLAYER_THEFORGOTTEN_B, // 35
    PlayerType.PLAYER_BETHANY_B, // 36
  ]);
