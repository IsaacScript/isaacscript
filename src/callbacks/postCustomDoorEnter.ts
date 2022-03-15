import { game } from "../cachedClasses";
import { saveDataManager } from "../features/saveDataManager/exports";
import { doorSlotToDirection, getDoors } from "../functions/doors";
import { directionToVector } from "../functions/vector";
import {
  postCustomDoorEnterFire,
  postCustomDoorEnterHasSubscriptions,
} from "./subscriptions/postCustomDoorEnter";

interface CustomDoorData {
  state: DoorState;
}

const POSITION_OFFSET_MULTIPLIER = 23;

const initializedEffectVariants = new Set<int>();

const v = {
  room: {
    doors: new Map<DoorSlot, CustomDoorData>(),
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
export function initCustomDoor(mod: Mod, effectVariant: int): void {
  initializedEffectVariants.add(effectVariant);

  mod.AddCallback(
    ModCallbacks.MC_POST_EFFECT_RENDER,
    postEffectRenderCustomEntity,
    effectVariant,
  ); // 56
}

// ModCallbacks.MC_POST_EFFECT_RENDER (56)
function postEffectRenderCustomEntity() {
  if (!hasSubscriptions()) {
    return;
  }

  const doors = getDoors();
  if (doors.length === 0) {
    return;
  }

  const door = doors[0];
  postCustomDoorEnterFire(door);
}

/**
 * Helper function to spawn a custom door. Handle when a player enters the door by hooking the
 * custom `MC_POST_CUSTOM_DOOR_ENTER` callback.
 *
 * Before using this function, you must first initialize it with the `initCustomDoor` function.
 */
export function spawnCustomDoor(effectVariant: int, doorSlot: DoorSlot): void {
  if (!initializedEffectVariants.has(effectVariant)) {
    error(
      'In order to spawn custom doors, you must first initialize them with the "initCustomDoor" function at the beginning of your mod.',
    );
  }

  const room = game.GetRoom();
  const roomClear = room.IsClear();
  const position = room.GetDoorSlotPosition(doorSlot);
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

  effect.State = roomClear ? DoorState.STATE_OPEN : DoorState.STATE_CLOSED;

  effect.RenderZOffset = -10000;
  effect.PositionOffset = getPositionOffset(doorSlot);

  const sprite = effect.GetSprite();
  const animation = getAnimation(effect);
  sprite.Play(animation, true);
  sprite.Rotation = doorSlot * 90 - 90;

  if (effect.State === DoorState.STATE_OPEN) {
    const gridIndex = room.GetGridIndex(position);
    const wall = room.GetGridEntity(gridIndex);
    if (wall !== undefined) {
      wall.CollisionClass = GridCollisionClass.COLLISION_WALL_EXCEPT_PLAYER;
    }
  }
}

function getPositionOffset(doorSlot: DoorSlot) {
  const direction = doorSlotToDirection(doorSlot);
  const vector = directionToVector(direction);
  return vector.mul(POSITION_OFFSET_MULTIPLIER);
}

function getAnimation(effect: EntityEffect): string {
  switch (effect.State as DoorState) {
    case DoorState.STATE_OPEN: {
      return "Opened";
    }

    case DoorState.STATE_CLOSED: {
      return "Closed";
    }

    default: {
      return "Opened";
    }
  }
}
