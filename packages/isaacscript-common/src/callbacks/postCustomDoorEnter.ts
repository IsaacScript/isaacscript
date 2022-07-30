import {
  Direction,
  DoorSlot,
  DoorState,
  EffectVariant,
  GridCollisionClass,
  GridEntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { game } from "../core/cachedClasses";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { saveDataManager } from "../features/saveDataManager/exports";
import { directionToVector } from "../functions/direction";
import { doorSlotToDirection } from "../functions/doors";
import { getEffects, spawnEffect } from "../functions/entitiesSpecific";
import { getClosestPlayer } from "../functions/players";
import {
  postCustomDoorEnterFire,
  postCustomDoorEnterHasSubscriptions,
} from "./subscriptions/postCustomDoorEnter";

interface CustomDoorData {
  slot: DoorSlot;
  state: DoorState;
}

const POSITION_OFFSET_MULTIPLIER = -23;

const initializedEffectVariants = new Set<int>();

const v = {
  room: {
    customDoors: new Map<PtrHash, CustomDoorData>(),
    customDoorSlots: new Set<DoorSlot>(),
  },
};

export function postCustomDoorEnterInit(): void {
  saveDataManager("postCustomDoorEnter", v, hasSubscriptions);
}

function hasSubscriptions() {
  return postCustomDoorEnterHasSubscriptions();
}

export function initCustomDoorPrivate(
  mod: ModUpgraded,
  effectVariant: EffectVariant,
): void {
  initializedEffectVariants.add(effectVariant);

  mod.AddCallback(
    ModCallback.POST_EFFECT_UPDATE,
    postEffectUpdaterCustomEntity,
    effectVariant,
  ); // 55

  mod.AddCallback(
    ModCallback.POST_EFFECT_RENDER,
    postEffectRenderCustomEntity,
    effectVariant,
  ); // 56

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ROOM_CLEAR_CHANGED,
    (roomClear: boolean) => {
      postRoomClearChanged(roomClear, effectVariant);
    },
  );
}

// ModCallback.POST_EFFECT_UPDATE (55)
function postEffectUpdaterCustomEntity(effect: EntityEffect) {
  const ptrHash = GetPtrHash(effect);
  const doorData = v.room.customDoors.get(ptrHash);
  if (doorData === undefined) {
    return;
  }

  if (doorData.state === (effect.State as DoorState)) {
    return;
  }
  doorData.state = effect.State as DoorState;

  doorChangedState(effect);
}

function doorChangedState(effect: EntityEffect) {
  const room = game.GetRoom();

  const sprite = effect.GetSprite();
  const animation = getAnimationForCustomDoor(effect);
  sprite.Play(animation, true);

  const gridIndex = room.GetGridIndex(effect.Position);
  const wall = room.GetGridEntity(gridIndex);
  if (wall !== undefined) {
    wall.CollisionClass =
      (effect.State as DoorState) === DoorState.OPEN
        ? GridCollisionClass.WALL_EXCEPT_PLAYER
        : GridCollisionClass.WALL;
  }
}

function getAnimationForCustomDoor(effect: EntityEffect): string {
  const freshlySpawned = effect.FrameCount === 0;

  switch (effect.State as DoorState) {
    case DoorState.OPEN: {
      return freshlySpawned ? "Opened" : "Open";
    }

    case DoorState.CLOSED: {
      return freshlySpawned ? "Closed" : "Close";
    }

    default: {
      return "Opened";
    }
  }
}

// ModCallback.POST_EFFECT_RENDER (56)
function postEffectRenderCustomEntity(effect: EntityEffect) {
  const ptrHash = GetPtrHash(effect);
  const doorData = v.room.customDoors.get(ptrHash);
  if (doorData === undefined) {
    return;
  }

  const direction = doorSlotToDirection(doorData.slot);
  const player = getClosestPlayer(effect.Position);
  if (isPlayerPastDoorThreshold(effect, player, direction)) {
    postCustomDoorEnterFire(player, effect.Variant, doorData.slot, direction);
  }
}

function isPlayerPastDoorThreshold(
  effect: EntityEffect,
  player: EntityPlayer,
  direction: Direction,
) {
  switch (direction) {
    case Direction.NO_DIRECTION: {
      return false;
    }

    // 1
    case Direction.UP: {
      return player.Position.Y <= effect.Position.Y;
    }

    // 2
    case Direction.RIGHT: {
      return player.Position.X >= effect.Position.X;
    }

    // 3
    case Direction.DOWN: {
      return player.Position.Y >= effect.Position.Y;
    }

    // 4
    case Direction.LEFT: {
      return player.Position.X <= effect.Position.X;
    }
  }
}

// ModCallbackCustom.POST_ROOM_CLEAR_CHANGED
function postRoomClearChanged(
  roomClear: boolean,
  effectVariant: EffectVariant,
) {
  const state = roomClear ? DoorState.OPEN : DoorState.CLOSED;
  const customDoors = getEffects(effectVariant);
  for (const customDoor of customDoors) {
    customDoor.State = state;
  }
}

export function spawnCustomDoorInternal(
  effectVariant: EffectVariant,
  doorSlot: DoorSlot,
): EntityEffect {
  if (!initializedEffectVariants.has(effectVariant)) {
    error(
      'In order to spawn custom doors, you must first initialize them with the "initCustomDoor" function at the beginning of your mod.',
    );
  }

  if (v.room.customDoorSlots.has(doorSlot)) {
    error(
      `There is already a custom door initialized on door slot: ${doorSlot}`,
    );
  }

  const room = game.GetRoom();
  const roomClear = room.IsClear();
  const position = room.GetDoorSlotPosition(doorSlot);
  const gridEntity = room.GetGridEntityFromPos(position);
  if (gridEntity === undefined) {
    error(
      `Failed to initialize a custom door at slot ${doorSlot} because the wall on that tile does not exist.`,
    );
  }

  const gridEntityType = gridEntity.GetType();
  if (gridEntityType !== GridEntityType.WALL) {
    error(
      `Failed to initialize a custom door at slot ${doorSlot} because there is another grid entity on that tile with a type of: ${gridEntityType}`,
    );
  }

  const effect = spawnEffect(effectVariant, 0, position);

  // Do initial setup for the door.
  effect.State = roomClear ? DoorState.OPEN : DoorState.CLOSED;
  effect.RenderZOffset = -10000;
  effect.PositionOffset = getPositionOffset(doorSlot);
  const sprite = effect.GetSprite();
  sprite.Rotation = (doorSlot as int) * 90 - 90;

  // Keep track of metadata about this door.
  const ptrHash = GetPtrHash(effect);
  const doorData: CustomDoorData = {
    slot: doorSlot,
    state: effect.State,
  };
  v.room.customDoors.set(ptrHash, doorData);
  v.room.customDoorSlots.add(doorSlot);

  doorChangedState(effect);

  return effect;
}

function getPositionOffset(doorSlot: DoorSlot) {
  const direction = doorSlotToDirection(doorSlot);
  const vector = directionToVector(direction);
  return vector.mul(POSITION_OFFSET_MULTIPLIER);
}
