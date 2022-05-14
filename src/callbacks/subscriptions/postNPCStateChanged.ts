import { EntityType } from "isaac-typescript-definitions";

export type PostNPCStateChangedRegisterParameters = [
  callback: (npc: EntityNPC, previousState: int, currentState: int) => void,
  entityType?: EntityType | int,
  variant?: int,
];

const subscriptions: PostNPCStateChangedRegisterParameters[] = [];

/** @internal */
export function postNPCStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postNPCStateChangedRegister(
  ...args: PostNPCStateChangedRegisterParameters
): void {
  subscriptions.push(args);
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
