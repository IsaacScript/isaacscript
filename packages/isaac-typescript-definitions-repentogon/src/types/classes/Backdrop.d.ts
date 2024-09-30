/**
 * The `Backdrop` class is used to modify the appearance of the room's backdrop and similar visual
 * elements. You can get this class through the `Room.GetBackdrop` method.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface Backdrop {
  /**
   * Returns the sprite of the player controls that are displayed on the starting room's floor at
   * the start of the run.
   */
  GetControlsANM2: () => Sprite;

  /**
   * Returns the sprite of the buttons tied to the player's controls that are displayed on the
   * starting room's floor at the start of the run.
   */
  GetControlsButtonsANM2: () => Sprite;

  /**
   * Returns the sprite of the backdrop's details.
   *
   * The backdrop's details are not the same as the randomly spawning details on the ground as the
   * latter is a GridEntity (`GridEntityType.DECORATION`).
   */
  GetDetailANM2: () => Sprite;

  /**
   * Returns the ANM2 of the fake backdrop used to render extremely small room. This can only be
   * seen in the small closet room in Home.
   */
  GetFloorANM2: () => Sprite;

  // GetWallImage and GetFloorImage are not implemented due to the Image buffer class not being
  // implemented yet.
}
