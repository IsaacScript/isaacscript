import { EntityType } from "isaac-typescript-definitions";

export type PostNPCInitLateRegisterParameters = [
  callback: (npc: EntityNPC) => void,
  entityType?: EntityType | int,
];

const subscriptions: PostNPCInitLateRegisterParameters[] = [];

/** @internal */
export function postNPCInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postNPCInitLateRegister(
  ...args: PostNPCInitLateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postNPCInitLateFire(npc: EntityNPC): void {
  for (const [callback, entityType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (entityType !== undefined && entityType !== npc.Type) {
      continue;
    }

    callback(npc);
  }
}
