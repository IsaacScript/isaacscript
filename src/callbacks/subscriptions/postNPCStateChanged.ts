export type PostNPCStateChangedCallbackType = (
  npc: EntityNPC,
  previousState: int,
  currentState: int,
) => void;

const subscriptions: Array<
  [
    PostNPCStateChangedCallbackType,
    EntityType | int | undefined,
    int | undefined,
  ]
> = [];

/** @internal */
export function postNPCStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postNPCStateChangedRegister(
  callback: PostNPCStateChangedCallbackType,
  entityType?: EntityType | int,
  variant?: int,
): void {
  subscriptions.push([callback, entityType, variant]);
}

/** @internal */
export function postNPCStateChangedFire(
  npc: EntityNPC,
  previousState: int,
  currentState: int,
): void {
  for (const [callback, entityType, variant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (entityType !== undefined && entityType !== npc.Type) {
      continue;
    }

    // Handle the optional 3rd callback argument
    if (variant !== undefined && variant !== npc.Variant) {
      continue;
    }

    callback(npc, previousState, currentState);
  }
}
