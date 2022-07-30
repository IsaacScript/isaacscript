import { EntityType } from "isaac-typescript-definitions";

export type PostNPCInitLateRegisterParameters = [
  callback: (npc: EntityNPC) => void,
  entityType?: EntityType,
];

const subscriptions: PostNPCInitLateRegisterParameters[] = [];

export function postNPCInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postNPCInitLateRegister(
  ...args: PostNPCInitLateRegisterParameters
): void {
  subscriptions.push(args);
}

export function postNPCInitLateFire(npc: EntityNPC): void {
  for (const [callback, entityType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (entityType !== undefined && entityType !== npc.Type) {
      continue;
    }

    callback(npc);
  }
}
