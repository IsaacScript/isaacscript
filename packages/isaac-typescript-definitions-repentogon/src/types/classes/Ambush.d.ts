/**
 * The `Ambush` class is used to manage Challenge Room and Boss Rush functionality.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 * @noSelf
 */
declare namespace Ambush {
  /** Returns the current wave for the ongoing ambush. */
  function GetCurrentWave(): int;

  /**
   * Returns the maximum amount of Boss Challenge Room waves.
   *
   * The maximum amount of Boss Challenge Room waves can be modified through the
   * `Ambush.SetMaxBossChallengeWaves` method.
   */
  function GetMaxBossChallengeWaves(): int;

  /**
   * Returns the amount of waves that the boss rush has.
   *
   * The maximum amount of Boss Rush waves can be modified through the `Ambush.SetMaxBossrushWaves`
   * method.
   */
  function GetMaxBossrushWaves(): int;

  /**
   * Returns the maximum amount of challenge room waves.
   *
   * The maximum amount of Challenge Room waves can be modified through the
   * `Ambush.SetMaxChallengeWaves` method.
   */
  function GetMaxChallengeWaves(): int;

  /**
   * Returns the `RoomConfig` of the next Challenge Room wave to spawn.
   *
   * Calling this method will error if the current room's type is not`RoomType.CHALLENGE`.
   */
  function GetNextWave(): RoomConfig;

  /**
   * Returns an array containing the `RoomConfig` of the next Challenge Room waves.
   *
   * Calling this method will error if the current room's type is not`RoomType.CHALLENGE`.
   */
  function GetNextWaves(): RoomConfig[];

  /**
   * Sets the maximum amount of Boss Challenge Room waves.
   *
   * The maximum amount of Boss Challenge Room waves will persist until the game restarts. If this
   * behavior is not desired, use Isaacscript Common's save manager to keep track of the original
   * number of waves and reset it when appropriate.
   */
  function SetMaxBossChallengeWaves(waves: int): void;

  /**
   * Sets the maximum amount of Boss Rush waves. This is currently capped at 25 waves.
   *
   * The maximum amount of Boss Rush waves will persist until the game restarts. If this behavior is
   * is not desired, use Isaacscript Common's save manager to keep track of the original number of
   * waves and reset it when appropriate.
   */
  function SetMaxBossrushWaves(waves: int): void;

  /**
   * Sets the maximum amount of Challenge Room waves.
   *
   * The maximum amount of Challenge Room waves will persist until the game restarts. If this
   * behavior is not desired, use Isaacscript Common's save manager to keep track of the original
   * number of waves and reset it when appropriate.
   */
  function SetMaxChallengeWaves(waves: int): void;

  // SpawnBossrushWave is currently bugged to the point it can not really be utilized at all.

  /**
   * Spawns a Challenge Room wave associated with the current floor.
   *
   * Calling this method crashes if there is no Challenge Rooms in the current floor's STB file.
   * Under normal circumstances, the only floors to not have any Challenge rooms in their STB file
   * is every Greed/Greedier Mode floor and Blue Womb.
   */
  function SpawnWave(): void;

  /**
   * Starts the Challenge or Boss Rush if the player is in a Challenge Room or Boss Rush room
   * respectively.
   *
   * Calling this method outside of these rooms will permanently close the doors and not spawn any
   * waves, resulting in a softlock.
   */
  function StartChallenge(): void;
}
