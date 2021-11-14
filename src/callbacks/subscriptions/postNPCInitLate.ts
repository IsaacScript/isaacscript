export type PostNPCInitLateCallbackType = (npc: EntityNPC) => void;

const subscriptions: Array<[PostNPCInitLateCallbackType, int | undefined]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostNPCInitLateCallbackType,
  npcVariant?: int,
): void {
  subscriptions.push([callback, npcVariant]);
}

export function fire(npc: EntityNPC): void {
  for (const [callback, npcVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (npcVariant !== undefined && npcVariant !== npc.Variant) {
      continue;
    }

    callback(npc);
  }
}
