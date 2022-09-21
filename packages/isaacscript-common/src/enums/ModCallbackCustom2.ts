/** TODO */
export enum ModCallbackCustom2 {
  /**
   * Fires from the `POST_UPDATE` callback when a Challenge Room or Boss Rush is started.
   * Specifically, this happens on the first frame that `Room.IsAmbushDone` is true.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method, you can provide
   * an optional third argument that will make the callback only fire if it matches the `AmbushType`
   * provided.
   *
   * ```ts
   * function postAmbushFinished(ambushType: AmbushType): void {}
   * ```
   */
  POST_AMBUSH_FINISHED,

  /**
   * Fires from the `POST_UPDATE` callback when a Challenge Room or Boss Rush is completed.
   * Specifically, this happens on the first frame that `Room.IsAmbushActive` is true.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method, you can provide
   * an optional third argument that will make the callback only fire if it matches the `AmbushType`
   * provided.
   *
   * ```ts
   * function postAmbushStarted(ambushType: AmbushType): void {}
   * ```
   */
  POST_AMBUSH_STARTED,

  POST_NEW_ROOM_EARLY,
  POST_PIT_RENDER,
  POST_SPIKES_RENDER,
}
