import { game } from "../cachedClasses";
import { saveDataManager } from "../features/saveDataManager/exports";
import { doorSlotToDirection } from "../functions/doors";
import { getEffects } from "../functions/entitySpecific";
import { getClosestPlayer } from "../functions/player";
import { ensureAllCases } from "../functions/utils";
import { directionToVector } from "../functions/vector";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
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

/** @internal */
export function postCustomDoorEnterCallbackInit(): void {
  saveDataManager("postCustomDoorEnter", v, hasSubscriptions);
}

function hasSubscriptions() {
  return postCustomDoorEnterHasSubscriptions();
}

/**
 * `isaacscript-common` provides custom doors that can be spawned where any wall segment is. If you
 * use this feature, you must first call this initialization function at the beginning of your mod.
 *
 * Each kind of custom door that you create must have an entry in the "content/entities2.xml" file,
 * like so:
 *
 * ```xml
 * <entity id="1000" name="Foo Custom Door" anm2path="grid/door_foo.anm2" />
 * ```
 *
 * (Custom door entities must have an id of "1000", which corresponds to an effect. If you do not
 * specify the variant, then the game will automatically assign it.)
 *
 * Next, pass the variant into this function:
 *
 * ```ts
 * const modVanilla = RegisterMod("My Mod", 1);
 * const mod = upgradeMod(modVanilla);
 * const fooEffectVariant = Isaac.GetEntityVariantByName("Foo Custom Door");
 * initCustomDoor(mod, fooEffectVariant);
 * ```
 */
export function initCustomDoor(mod: ModUpgraded, effectVariant: int): void {
  initializedEffectVariants.add(effectVariant);

  mod.AddCallback(
    ModCallbacks.MC_POST_EFFECT_UPDATE,
    postEffectUpdaterCustomEntity,
    effectVariant,
  ); // 55

  mod.AddCallback(
    ModCallbacks.MC_POST_EFFECT_RENDER,
    postEffectRenderCustomEntity,
    effectVariant,
  ); // 56

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_ROOM_CLEAR_CHANGE,
    (roomClear: boolean) => {
      roomClearChange(roomClear, effectVariant);
    },
  );
}

// ModCallbacks.MC_POST_EFFECT_UPDATE (55)
function postEffectUpdaterCustomEntity(effect: EntityEffect) {
  const ptrHash = GetPtrHash(effect);
  const doorData = v.room.customDoors.get(ptrHash);
  if (doorData === undefined) {
    return;
  }

  if (doorData.state === effect.State) {
    return;
  }
  doorData.state = effect.State;

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
      effect.State === DoorState.STATE_OPEN
        ? GridCollisionClass.COLLISION_WALL_EXCEPT_PLAYER
        : GridCollisionClass.COLLISION_WALL;
  }
}

function getAnimationForCustomDoor(effect: EntityEffect): string {
  const freshlySpawned = effect.FrameCount === 0;

  switch (effect.State as DoorState) {
    case DoorState.STATE_OPEN: {
      return freshlySpawned ? "Opened" : "Open";
    }

    case DoorState.STATE_CLOSED: {
      return freshlySpawned ? "Closed" : "Close";
    }

    default: {
      return "Opened";
    }
  }
}

// ModCallbacks.MC_POST_EFFECT_RENDER (56)
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

    default: {
      return ensureAllCases(direction);
    }
  }
}

// ModCallbacksCustom.MC_ROOM_CLEAR_CHANGE
function roomClearChange(roomClear: boolean, effectVariant: int) {
  const state = roomClear ? DoorState.STATE_OPEN : DoorState.STATE_CLOSED;
  const customDoors = getEffects(effectVariant);
  for (const customDoor of customDoors) {
    customDoor.State = state;
  }
}

/**
 * Helper function to spawn a custom door. This is intended to be called from the `MC_POST_NEW_ROOM`
 * callback when the player enters a room that should have a custom door. (You could also call it
 * from another callback if you want the door to appear e.g. after clearing all enemies.)
 *
 * Like other entities, the door is not persistent, so you must spawn it every time when re-entering
 * the room.
 *
 * Handle when a player enters the door by hooking the custom `MC_POST_CUSTOM_DOOR_ENTER` callback.
 *
 * The custom door is an `EntityEffect`. You can manually open or close the door by modifying its
 * state. (The values to use correspond to the `DoorState` enum.)
 *
 * This function will throw a runtime error if:
 * - the door slot already has a vanilla door
 * - the door slot already has a custom door
 * - the tile at the door slot does not have a wall
 *
 * Before using this function, you must first initialize the effect/door variant with the
 * `initCustomDoor` function.
 */
export function spawnCustomDoor(
  effectVariant: int,
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
  if (gridEntityType !== GridEntityType.GRID_WALL) {
    error(
      `Failed to initialize a custom door at slot ${doorSlot} because there is another grid entity on that tile with a type of: ${gridEntityType}`,
    );
  }

  const effect = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    effectVariant,
    0,
    position,
    Vector.Zero,
    undefined,
  ).ToEffect();
  if (effect === undefined) {
    error(`Failed to spawn a custom door with variant: ${effectVariant}`);
  }

  // Do initial setup for the door
  effect.State = roomClear ? DoorState.STATE_OPEN : DoorState.STATE_CLOSED;
  effect.RenderZOffset = -10000;
  effect.PositionOffset = getPositionOffset(doorSlot);
  const sprite = effect.GetSprite();
  sprite.Rotation = doorSlot * 90 - 90;

  // Keep track of metadata about this door
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
