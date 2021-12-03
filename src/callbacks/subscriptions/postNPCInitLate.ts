/** @internal */
export type PostNPCInitLateCallbackType = (npc: EntityNPC) => void;

const subscriptions: Array<[PostNPCInitLateCallbackType, int | undefined]> = [];

/** @internal */
export function postNPCInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postNPCInitLateRegister(
  callback: PostNPCInitLateCallbackType,
  entityType?: EntityType,
): void {
  subscriptions.push([callback, entityType]);
}

/** @internal */
export function postNPCInitLateFire(npc: EntityNPC): void {
  for (const [callback, entityType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (entityType !== undefined && entityType !== npc.Type) {
      continue;
    }

    callback(npc);
  }
}
