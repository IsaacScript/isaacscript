import { log } from "./log";
import { addSetsToSet, copySet, isLuaDebugEnabled } from "./util";

const DEFAULT_GLOBALS = new Set([
  "ActionTriggers",
  "ActiveSlot",
  "BabySubType",
  "BackdropType",
  "BatterySubType",
  "BedSubType",
  "BitSet128",
  "BombSubType",
  "BombVariant",
  "ButtonAction",
  "CacheFlag",
  "Card",
  "Challenge",
  "ChampionColor",
  "ChestSubType",
  "CoinSubType",
  "CollectibleType",
  "Color",
  "CppContainer",
  "DamageFlag",
  "Difficulty",
  "Direction",
  "DoorSlot",
  "DoorState",
  "DoorVariant",
  "EffectVariant",
  "Entity",
  "EntityBomb",
  "EntityCollisionClass",
  "EntityEffect",
  "EntityFamiliar",
  "EntityFlag",
  "EntityGridCollisionClass",
  "EntityKnife",
  "EntityLaser",
  "EntityNPC",
  "EntityPartition",
  "EntityPickup",
  "EntityPlayer",
  "EntityProjectile",
  "EntityPtr",
  "EntityRef",
  "EntityTear",
  "EntityType",
  "FamiliarVariant",
  "Font",
  "Game",
  "GameStateFlag",
  "GetPtrHash",
  "GridCollisionClass",
  "GridEntity",
  "GridEntityDesc",
  "GridEntityDoor",
  "GridEntityPit",
  "GridEntityPoop",
  "GridEntityPressurePlate",
  "GridEntityRock",
  "GridEntitySpikes",
  "GridEntityTNT",
  "GridEntityType",
  "GridRooms",
  "HUD",
  "HeartSubType",
  "Input",
  "InputHook",
  "Isaac",
  "ItemConfig",
  "ItemPool",
  "ItemPoolType",
  "ItemType",
  "KColor",
  "KeySubType",
  "Keyboard",
  "LaserOffset",
  "LaserSubType",
  "Level",
  "LevelCurse",
  "LevelStage",
  "LevelStateFlag",
  "LocustSubtypes",
  "ModCallbacks",
  "Mouse",
  "Music",
  "MusicManager",
  "NpcState",
  "NullItemID",
  "Options",
  "PathFinder",
  "PickupPrice",
  "PickupVariant",
  "PillColor",
  "PillEffect",
  "PlayerForm",
  "PlayerSpriteLayer",
  "PlayerType",
  "PlayerTypes",
  "PoopPickupSubType",
  "PoopSpellType",
  "ProjectileFlags",
  "ProjectileParams",
  "ProjectileVariant",
  "QueueItemData",
  "REPENTANCE",
  "RNG",
  "Random",
  "RandomVector",
  "RegisterMod",
  "RenderMode",
  "Room",
  "RoomConfig",
  "RoomDescriptor",
  "RoomShape",
  "RoomTransitionAnim",
  "RoomType",
  "SFXManager",
  "SackSubType",
  "SeedEffect",
  "Seeds",
  "ShockwaveParams",
  "SkinColor",
  "SortingLayer",
  "SoundEffect",
  "Sprite",
  "StageType",
  "StartDebug",
  "TearFlags",
  "TearParams",
  "TearVariant",
  "TemporaryEffect",
  "TemporaryEffects",
  "TrinketType",
  "UseFlag",
  "Vector",
  "WeaponType",
  "_G",
  "_VERSION",
  "assert",
  "collectgarbage",
  "coroutine",
  "dofile",
  "error",
  "getmetatable",
  "include",
  "ipairs",
  "load",
  "loadfile",
  "math",
  "next",
  "pairs",
  "pcall",
  "print",
  "rawequal",
  "rawget",
  "rawlen",
  "rawset",
  "require",
  "select",
  "setmetatable",
  "string",
  "table",
  "tonumber",
  "tostring",
  "type",
  "utf8",
  "xpcall",
]);

const LUA_DEBUG_ADDED_GLOBALS = new Set(["debug", "io", "os", "package"]);

const RACING_PLUS_SANDBOX_ADDED_GLOBALS = new Set([
  "sandboxTraceback",
  "sandboxGetTraceback",
  "getParentFunctionDescription",
]);

/**
 * Helper function to get a set containing all of the global variable names that are contained
 * within the Isaac environment by default.
 *
 * Returns a slightly different set depending on whether the "--luadebug" flag is enabled or not.
 */
export function getDefaultGlobals(): Set<string> {
  const defaultGlobals = copySet(DEFAULT_GLOBALS);

  if (isLuaDebugEnabled()) {
    addSetsToSet(defaultGlobals, LUA_DEBUG_ADDED_GLOBALS);
  }

  addSetsToSet(defaultGlobals, RACING_PLUS_SANDBOX_ADDED_GLOBALS);

  return defaultGlobals;
}

/**
 * Helper function to get an array of any added global variables in the Isaac Lua environment.
 * Returns an array of key/value tuples.
 */
export function getNewGlobals() {
  const defaultGlobals = getDefaultGlobals();
  const newGlobals: Array<[AnyNotNil, unknown]> = [];
  for (const [key, value] of pairs(_G)) {
    if (!defaultGlobals.has(key)) {
      const keyValueTuple: [AnyNotNil, unknown] = [key, value];
      newGlobals.push(keyValueTuple);
    }
  }

  newGlobals.sort(twoDimensionalSort);

  return newGlobals;
}

// From: https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
function twoDimensionalSort<T>(a: T[], b: T[]) {
  if (a[0] === b[0]) {
    return 0;
  }

  return a[0] < b[0] ? -1 : 1;
}

export function logNewGlobals() {
  const newGlobals = getNewGlobals();

  log("List of added global variables in the Isaac environment:");
  if (newGlobals.length === 0) {
    log("- n/a (no extra global variables found)");
  }
  for (let i = 0; i < newGlobals.length; i++) {
    const [key, value] = newGlobals[i];
    log(`${i + 1}) ${key} - ${value}`);
  }
}
