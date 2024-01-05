/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace StageTransition {
  /**
   * Returns true if Isaac's head will move from one stage to the other in the transition screen.
   */
  function GetSameStage(): boolean;

  /**
   * Sets whether the stage transition will display Isaac's head moving from one stage to the other
   * or not.
   *
   * This function is useful if you want to move the player to the first stage, or want to repeat
   * the last stage on the progress bar of the transition screen, and have it be less jarring.
   *
   * If transitioning back to the first floor, and `sameStage` is not set to true, Isaac's head will
   * appear outside of the progress bar. Otherwise, Isaac's head will appear on the first floor.
   *
   * If repeating the last floor, and `sameStage` is not set to true, Isaac's head will move from
   * the previous stage to the last one. Otherwise, Isaac's head will appear on the last floor.
   */
  function SetSameStage(sameStage: boolean): void;
}
