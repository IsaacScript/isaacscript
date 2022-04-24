export type PostNPCStateChangedCallbackType = (
  npc: EntityNPC,
  previousState: int,
  currentState: int,
) => void;

const subscriptions: Array<
  [PostNPCStateChangedCallbackType, EntityType | int | undefined]
> = [];

/** @internal */
export function postNPCStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postNPCStateChangedRegister(
  callback: PostNPCStateChangedCallbackType,
  entityType?: EntityType | int,
): void {
  subscriptions.push([callback, entityType]);
}

/** @internal */
export function postNPCStateChangedFire(
  npc: EntityNPC,
  previousState: int,
  currentState: int,
): void {
  for (const [callback, entityType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (entityType !== undefined && entityType !== npc.Type) {
      continue;
    }

    callback(npc, previousState, currentState);
  }
}
