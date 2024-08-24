/**
 * Do not call the functions of this class outside of callbacks as the daily challenge may have not
 * loaded yet.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 * @noSelf
 */
declare namespace DailyChallenge {
  /** Returns the `ChallengeParams` associated with the current daily challenge. */
  function GetChallengeParams(): ChallengeParams;
}
