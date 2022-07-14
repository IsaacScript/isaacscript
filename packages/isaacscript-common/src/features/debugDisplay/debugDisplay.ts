import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "../../classes/ModUpgraded";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isReflectionRender } from "../../functions/utils";
import { saveDataManager } from "../saveDataManager/exports";
import v, { debugDisplayTextCallbacks, setDebugDisplayEnabled } from "./v";

/**
 * The debug display feature is only initialized when the extra console commands feature is
 * initialized.
 */
export function debugDisplayInit(mod: ModUpgraded): void {
  setDebugDisplayEnabled();
  saveDataManager("debugDisplay", v, () => false);

  mod.AddCallback(ModCallback.POST_FAMILIAR_RENDER, postFamiliarRender); // 25
  mod.AddCallback(ModCallback.POST_NPC_RENDER, postNPCRender); // 28
  mod.AddCallback(ModCallback.POST_PLAYER_RENDER, postPlayerRender); // 32
  mod.AddCallback(ModCallback.POST_PICKUP_RENDER, postPickupRender); // 36
  mod.AddCallback(ModCallback.POST_TEAR_RENDER, postTearRender); // 41
  mod.AddCallback(ModCallback.POST_PROJECTILE_RENDER, postProjectileRender); // 45
  mod.AddCallback(ModCallback.POST_LASER_RENDER, postLaserRender); // 49
  mod.AddCallback(ModCallback.POST_KNIFE_RENDER, postKnifeRender); // 52
  mod.AddCallback(ModCallback.POST_EFFECT_RENDER, postEffectRender); // 56
  mod.AddCallback(ModCallback.POST_BOMB_RENDER, postBombRender); // 59
  mod.AddCallbackCustom(ModCallbackCustom.POST_SLOT_RENDER, postSlotRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_ROCK_RENDER, postRockRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_PIT_RENDER, postPitRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_SPIKES_RENDER, postSpikesRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_TNT_RENDER, postTNTRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_POOP_RENDER, postPoopRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_DOOR_RENDER, postDoorRender);
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PRESSURE_PLATE_RENDER,
    postPressurePlateRender,
  );
}

function renderTextOnEntity(entity: Entity | GridEntity, text: string) {
  if (isReflectionRender()) {
    return;
  }

  const position = Isaac.WorldToScreen(entity.Position);
  Isaac.RenderText(text, position.X, position.Y, 1, 1, 1, 1);
}

// ModCallback.POST_FAMILIAR_RENDER (25)
function postFamiliarRender(familiar: EntityFamiliar) {
  if (!v.run.familiar) {
    return;
  }

  const text = debugDisplayTextCallbacks.familiar(familiar);
  renderTextOnEntity(familiar, text);
}

// ModCallback.POST_NPC_RENDER (28)
function postNPCRender(npc: EntityNPC) {
  if (!v.run.npc) {
    return;
  }

  const text = debugDisplayTextCallbacks.npc(npc);
  renderTextOnEntity(npc, text);
}

// ModCallback.POST_PLAYER_RENDER (32)
function postPlayerRender(player: EntityPlayer) {
  if (!v.run.player) {
    return;
  }

  const text = debugDisplayTextCallbacks.player(player);
  renderTextOnEntity(player, text);
}

// ModCallback.POST_PICKUP_RENDER (36)
function postPickupRender(pickup: EntityPickup) {
  if (!v.run.pickup) {
    return;
  }

  const text = debugDisplayTextCallbacks.pickup(pickup);
  renderTextOnEntity(pickup, text);
}

// ModCallback.POST_TEAR_RENDER (41)
function postTearRender(tear: EntityTear) {
  if (!v.run.tear) {
    return;
  }

  const text = debugDisplayTextCallbacks.tear(tear);
  renderTextOnEntity(tear, text);
}

// ModCallback.POST_PROJECTILE_RENDER (45)
function postProjectileRender(projectile: EntityProjectile) {
  if (!v.run.projectile) {
    return;
  }

  const text = debugDisplayTextCallbacks.projectile(projectile);
  renderTextOnEntity(projectile, text);
}

// ModCallback.POST_LASER_RENDER (49)
function postLaserRender(laser: EntityLaser) {
  if (!v.run.laser) {
    return;
  }

  const text = debugDisplayTextCallbacks.laser(laser);
  renderTextOnEntity(laser, text);
}

// ModCallback.POST_KNIFE_RENDER (52)
function postKnifeRender(knife: EntityKnife) {
  if (!v.run.knife) {
    return;
  }

  const text = debugDisplayTextCallbacks.knife(knife);
  renderTextOnEntity(knife, text);
}

// ModCallback.POST_EFFECT_RENDER (56)
function postEffectRender(effect: EntityEffect) {
  if (!v.run.effect) {
    return;
  }

  const text = debugDisplayTextCallbacks.effect(effect);
  renderTextOnEntity(effect, text);
}

// ModCallback.POST_BOMB_RENDER (59)
function postBombRender(bomb: EntityBomb) {
  if (!v.run.bomb) {
    return;
  }

  const text = debugDisplayTextCallbacks.bomb(bomb);
  renderTextOnEntity(bomb, text);
}

// ModCallbackCustom.POST_SLOT_RENDER
function postSlotRender(slot: Entity) {
  if (!v.run.slot) {
    return;
  }

  const text = debugDisplayTextCallbacks.slot(slot);
  renderTextOnEntity(slot, text);
}

// ModCallbackCustom.POST_ROCK_RENDER
function postRockRender(rock: GridEntityRock) {
  if (!v.run.rock) {
    return;
  }

  const text = debugDisplayTextCallbacks.rock(rock);
  renderTextOnEntity(rock, text);
}

// ModCallbackCustom.POST_PIT_RENDER
function postPitRender(pit: GridEntityPit) {
  if (!v.run.pit) {
    return;
  }

  const text = debugDisplayTextCallbacks.pit(pit);
  renderTextOnEntity(pit, text);
}

// ModCallbackCustom.POST_SPIKES_RENDER
function postSpikesRender(spikes: GridEntitySpikes) {
  if (!v.run.spikes) {
    return;
  }

  const text = debugDisplayTextCallbacks.spikes(spikes);
  renderTextOnEntity(spikes, text);
}

// ModCallbackCustom.POST_TNT_RENDER
function postTNTRender(tnt: GridEntityTNT) {
  if (!v.run.tnt) {
    return;
  }

  const text = debugDisplayTextCallbacks.tnt(tnt);
  renderTextOnEntity(tnt, text);
}

// ModCallbackCustom.POST_POOP_RENDER
function postPoopRender(poop: GridEntityPoop) {
  if (!v.run.poop) {
    return;
  }

  const text = debugDisplayTextCallbacks.poop(poop);
  renderTextOnEntity(poop, text);
}

// ModCallbackCustom.POST_DOOR_RENDER
function postDoorRender(door: GridEntityDoor) {
  if (!v.run.door) {
    return;
  }

  const text = debugDisplayTextCallbacks.door(door);
  renderTextOnEntity(door, text);
}

// ModCallbackCustom.POST_PRESSURE_PLATE_RENDER
function postPressurePlateRender(pressurePlate: GridEntityPressurePlate) {
  if (!v.run.pressurePlate) {
    return;
  }

  const text = debugDisplayTextCallbacks.pressurePlate(pressurePlate);
  renderTextOnEntity(pressurePlate, text);
}
