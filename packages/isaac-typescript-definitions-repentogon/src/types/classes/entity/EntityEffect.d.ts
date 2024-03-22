/** @noSelf */
declare namespace EntityEffect {
  /**
   * Spawns a light effect.
   *
   * @param position
   * @param scale Optional. Default is a random number between [0, 1].
   * @param lifespan Optional. Default is -1.
   * @param state Optional. Default is 6.
   * @param color Optional. Default is `ColorDefault`.
   */
  function CreateLight(
    position: Vector,
    scale?: number,
    lifespan?: int,
    state?: int,
    color?: Color,
  ): EntityEffect;
}
