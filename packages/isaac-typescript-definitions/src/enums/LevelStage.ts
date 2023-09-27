export enum LevelStage {
  /**
   * This is the same as `LevelStage.BASEMENT_GREED_MODE` (1). Only use this if your code has
   * validated that the game is not in Greed Mode.
   */
  BASEMENT_1 = 1,

  /**
   * This is the same as `LevelStage.CAVES_GREED_MODE` (2). Only use this if your code has validated
   * that the game is not in Greed Mode.
   */
  BASEMENT_2 = 2,

  /**
   * This is the same as `LevelStage.DEPTHS_GREED_MODE` (3). Only use this if your code has
   * validated that the game is not in Greed Mode.
   */
  CAVES_1 = 3,

  /**
   * This is the same as `LevelStage.WOMB_GREED_MODE` (4). Only use this if your code has validated
   * that the game is not in Greed Mode.
   */
  CAVES_2 = 4,

  /**
   * This is the same as `LevelStage.SHEOL_GREED_MODE` (5). Only use this if your code has validated
   * that the game is not in Greed Mode.
   */
  DEPTHS_1 = 5,

  /**
   * This is the same as `LevelStage.SHOP_GREED_MODE` (6). Only use this if your code has validated
   * that the game is not in Greed Mode.
   */
  DEPTHS_2 = 6,

  /**
   * This is the same as `LevelStage.ULTRA_GREED_GREED_MODE` (7). Only use this if your code has
   * validated that the game is not in Greed Mode.
   */
  WOMB_1 = 7,

  WOMB_2 = 8,
  BLUE_WOMB = 9,
  SHEOL_CATHEDRAL = 10,
  DARK_ROOM_CHEST = 11,
  VOID = 12,
  HOME = 13,

  /**
   * This is the same as `LevelStage.BASEMENT_1` (1). Only use this if your code has validated that
   * the player is playing in Greed Mode.
   */
  BASEMENT_GREED_MODE = 1, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values

  /**
   * This is the same as `LevelStage.BASEMENT_2` (2). Only use this if your code has validated that
   * the player is playing in Greed Mode.
   */
  CAVES_GREED_MODE = 2, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values

  /**
   * This is the same as `LevelStage.CAVES_1` (3). Only use this if your code has validated that the
   * player is playing in Greed Mode.
   */
  DEPTHS_GREED_MODE = 3, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values

  /**
   * This is the same as `LevelStage.CAVES_2` (4). Only use this if your code has validated that the
   * player is playing in Greed Mode.
   */
  WOMB_GREED_MODE = 4, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values

  /**
   * This is the same as `LevelStage.DEPTHS_1` (5). Only use this if your code has validated that
   * the player is playing in Greed Mode.
   */
  SHEOL_GREED_MODE = 5, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values

  /**
   * This refers to the floor called "The Shop" which is after Sheol and before the Ultra Greed
   * floor.
   *
   * This is the same as `LevelStage.DEPTHS_2` (6). Only use this if your code has validated that
   * the player is playing in Greed Mode.
   */
  SHOP_GREED_MODE = 6, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values

  /**
   * This refers to the final floor of Greed Mode or Greedier Mode that holds the Ultra Greed or
   * Ultra Greedier boss.
   *
   * This is the same as `LevelStage.WOMB_1` (7). Only use this if your code has validated that the
   * player is playing in Greed Mode.
   */
  ULTRA_GREED_GREED_MODE = 7, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values
}
