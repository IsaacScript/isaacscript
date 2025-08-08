/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @noSelf
 * @see https://repentogon.com/
 */
declare namespace StageTransition {
  /**
   * Returns whether the stage transition screen displays Isaac's head moving from one stage to the
   * other.
   */
  function GetSameStage(): boolean;

  /**
   * Sets whether the stage transition screen will display Isaac's head moving from one stage to the
   * other.
   *
   * This method is useful if you want to move the player to the first stage, or if you want to
   * repeat the last stage on the progress bar of the transition screen and have it be less jarring.
   *
   * Calling this method before the current stage transition has called `Level.SetNextStage` will
   * override the transition itself. This means that instead of merely displaying Isaac's head not
   * moving, it will actually change whether the next stage will be a repeat of the current one, or
   * the actual next stage. Ideally, you should use this function in the
   * `ModCallback.PRE_LEVEL_SELECT`callback.
   *
   * @param sameStage Determines if the stage transition screen will display Isaac's head moving to
   *                  the next floor or not.
   */
  function SetSameStage(sameStage: boolean): void;
}
