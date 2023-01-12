declare interface QueueItemData extends IsaacAPIClass {
  Charge: int;

  // This must be marked explicitly as `ItemConfigItem | undefined` instead of using the optional
  // property since end-users should be able to assign undefined to it in order to clear the queue.
  Item: ItemConfigItem | undefined;

  Touched: boolean;
}
