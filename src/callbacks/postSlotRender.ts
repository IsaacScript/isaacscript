import * as postSlotRender from "./subscriptions/postSlotRender";

export function postSlotRenderCallbackInit(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return postSlotRender.hasSubscriptions();
}

// ModCallbacks.MC_POST_UPDATE (1)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  const slots = Isaac.FindByType(EntityType.ENTITY_SLOT);
  for (const slot of slots) {
    postSlotRender.fire(slot);
  }
}
