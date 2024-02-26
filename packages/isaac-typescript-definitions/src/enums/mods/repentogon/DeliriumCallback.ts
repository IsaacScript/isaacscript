/**
 * These callbacks are exclusive to Delirium. They live under a different namespace due to being too
 * specific when compared to more general callbacks found in `ModCallback.
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export enum DeliriumCallback {
  /**
   * Fires before Delirium transforms into a boss or back to its normal form.
   *
   * Return true to force the transformation. Return false to prevent the transformation from
   * happening. Return an array containing an EntityType and a variant to override what Delirium
   * transforms to.
   *
   * ```ts
   * function preDeliriumTransformation(
   *   delirium: EntityDelirium,
   *   entityType: EntityType,
   *   variant: int,
   *   force: boolean,
   * ): boolean | [EntityType, int?] | undefined {}
   * ```
   */
  PRE_TRANSFORMATION = "DeliriumPreTransformation",

  /**
   * Fires after Delirium transforms into a boss or back to its normal form. This callback will
   * still fire if Delirium transforms into the same boss it currently is.
   *
   * ```ts
   * function postDeliriumTransformation(delirium: EntityDelirium): void {}
   * ```
   */
  POST_TRANSFORMATION = "DeliriumPostTransformation",
}
