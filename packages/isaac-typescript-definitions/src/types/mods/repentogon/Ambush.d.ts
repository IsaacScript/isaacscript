/**
 * Constructs a new capsule class.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace Ambush {
  /** Returns the current wave number of the current challenge room or boss rush room. */
  function GetCurrentWave(): int;

  /**
   * Returns the maximum amount of boss rush waves.
   *
   * By default, the maximum amount of boss rush waves are 15. It's important to note that mods can
   * modify the maximum amount of boss rush waves.
   */
  function GetMaxBossrushWaves(): int;

  /**
   * Returns the maximum amount of challenge room waves.
   *
   * By default, the maximum amount of challenge room waves are 3. It's important to note that mods
   * can modify the maximum amount of challenge room waves.
   */
  function GetMaxChallengeWaves(): int;

  /**
   * Returns the RoomConfigRoom of the next challenge room wave. Calling this function outside of a
   * challenge room will result in an error.
   */
  function GetNextWave(): RoomConfig;

  /** Returns an array containing the RoomConfigRoom of the next challenge room waves. */
  function GetNextWaves(): RoomConfig[];

  /** Sets the maximum amount of boss rush waves. As of now, there is a maximum cap of 25 waves. */
  function SetMaxBossrushWaves(waves: int): void;

  /**
   * Sets the maximum amount of challenge room waves.
   *
   * This function is currently bugged as the value is not reset on game restart.
   */
  function SetMaxChallengeWaves(waves: int): void;

  /**
   * Spawns a boss rush wave in the current room.
   *
   * This function is currently bugged. It will not work unless a boss rush has been spawned at
   * least once during the current game session.
   */
  function SpawnBossrushWave(): void;

  /**
   * Spawns a challenge room wave associated with the current floor.
   *
   * Calling this function while the current difficulty is Greed or Greedier will crash the game.
   * The game will also crash if the current floor is Blue Womb.
   */
  function SpawnWave(): void;

  /**
   * Triggers the challenge room or boss rush.
   *
   * Calling this function outside of the boss rush room or a challenge room will do nothing except
   * permanently close the doors, resulting in a softlock.
   */
  function StartChallenge(): void;
}
