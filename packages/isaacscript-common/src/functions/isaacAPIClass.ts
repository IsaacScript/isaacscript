import { trimPrefix } from "./string";
import { isString, isUserdata } from "./types";

/**
 * Helper function to get the name of a class from the Isaac API. This is contained within the
 * "__type" metatable key.
 *
 * For example, a `Vector` class is has a name of "Vector".
 *
 * Returns undefined if the object is not of type `userdata` or if the "__type" metatable key does
 * not exist.
 *
 * In some cases, Isaac classes can be a read-only. If this is the case, the "__type" field will be
 * prepended with "const ". This function will always strip this prefix, if it exists. For example,
 * the class name returned for "const Vector" will be "Vector".
 */
export function getIsaacAPIClassName(object: unknown): string | undefined {
  if (!isUserdata(object)) {
    return undefined;
  }

  const metatable = getmetatable(object) as
    | LuaMap<AnyNotNil, unknown>
    | undefined;
  if (metatable === undefined) {
    return undefined;
  }

  const classType = metatable.get("__type");
  if (!isString(classType)) {
    return undefined;
  }

  return trimPrefix(classType, "const ");
}

/** Helper function to detect if a variable is of type `EntityBomb`. */
export function isBomb(variable: unknown): variable is EntityBomb {
  return getIsaacAPIClassName(variable) === "EntityBomb";
}

/** Helper function to detect if a variable is of type `GridEntityDoor`. */
export function isDoor(variable: unknown): variable is GridEntityDoor {
  return getIsaacAPIClassName(variable) === "GridEntityDoor";
}

/** Helper function to detect if a variable is of type `EntityEffect`. */
export function isEffect(variable: unknown): variable is EntityEffect {
  return getIsaacAPIClassName(variable) === "EntityEffect";
}

/**
 * Helper function to detect if a variable is of type `Entity`. This will return false for child
 * classes such as `EntityPlayer` or `EntityTear`.
 */
export function isEntity(variable: unknown): variable is Entity {
  return getIsaacAPIClassName(variable) === "Entity";
}

/** Helper function to detect if a variable is of type `EntityFamiliar`. */
export function isFamiliar(variable: unknown): variable is EntityFamiliar {
  return getIsaacAPIClassName(variable) === "EntityEffect";
}

/** Helper function to detect if a variable is of type `GridEntity`. */
export function isGridEntity(variable: unknown): variable is GridEntity {
  return getIsaacAPIClassName(variable) === "GridEntity";
}

/**
 * Helper function to check if something is an instantiated class from the Isaac API. (All classes
 * from the Isaac API have a type of "userdata" in Lua with a metatable key of "__type" equal to the
 * name of the class.)
 */
export function isIsaacAPIClass(object: unknown): object is IsaacAPIClass {
  const isaacAPIClassType = getIsaacAPIClassName(object);
  return isaacAPIClassType !== undefined;
}

export function isIsaacAPIClassOfType(
  object: unknown,
  classType: string,
): boolean {
  const isaacAPIClassType = getIsaacAPIClassName(object);
  return (
    isaacAPIClassType === classType ||
    isaacAPIClassType === `const ${classType}`
  );
}

/** Helper function to detect if a variable is of type `EntityKnife`. */
export function isKnife(variable: unknown): variable is EntityKnife {
  return getIsaacAPIClassName(variable) === "EntityKnife";
}

/** Helper function to detect if a variable is of type `EntityLaser`. */
export function isLaser(variable: unknown): variable is EntityLaser {
  return getIsaacAPIClassName(variable) === "EntityLaser";
}

/** Helper function to detect if a variable is of type `EntityNPC`. */
export function isNPC(variable: unknown): variable is EntityNPC {
  return getIsaacAPIClassName(variable) === "EntityNPC";
}

/** Helper function to detect if a variable is of type `EntityPickup`. */
export function isPickup(variable: unknown): variable is EntityPickup {
  return getIsaacAPIClassName(variable) === "EntityPickup";
}

/** Helper function to detect if a variable is of type `GridEntityPit`. */
export function isPit(variable: unknown): variable is GridEntityPit {
  return getIsaacAPIClassName(variable) === "GridEntityPit";
}

/** Helper function to detect if a variable is of type `EntityPlayer`. */
export function isPlayer(variable: unknown): variable is EntityPlayer {
  return getIsaacAPIClassName(variable) === "EntityPlayer";
}

/** Helper function to detect if a variable is of type `GridEntityPoop`. */
export function isPoop(variable: unknown): variable is GridEntityPoop {
  return getIsaacAPIClassName(variable) === "GridEntityPoop";
}

/** Helper function to detect if a variable is of type `GridEntityPressurePlate`. */
export function isPressurePlate(
  variable: unknown,
): variable is GridEntityPressurePlate {
  return getIsaacAPIClassName(variable) === "GridEntityPressurePlate";
}

/** Helper function to detect if a variable is of type `EntityProjectile`. */
export function isProjectile(variable: unknown): variable is EntityProjectile {
  return getIsaacAPIClassName(variable) === "EntityProjectile";
}

/** Helper function to detect if a variable is of type `GridEntityRock`. */
export function isRock(variable: unknown): variable is GridEntityRock {
  return getIsaacAPIClassName(variable) === "GridEntityRock";
}

/** Helper function to detect if a variable is of type `GridEntitySpikes`. */
export function isSpikes(variable: unknown): variable is GridEntitySpikes {
  return getIsaacAPIClassName(variable) === "GridEntitySpikes";
}

/** Helper function to detect if a variable is of type `GridEntityTNT`. */
export function isTNT(variable: unknown): variable is GridEntityTNT {
  return getIsaacAPIClassName(variable) === "GridEntityTNT";
}

/** Helper function to detect if a variable is of type `EntityTear`. */
export function isTear(variable: unknown): variable is EntityTear {
  return getIsaacAPIClassName(variable) === "EntityTear";
}

/**
 * Helper function to check if an instantiated Isaac API class is equal to another one of the same
 * type. You must provide the list of keys to check for.
 */
export function isaacAPIClassEquals(
  object1: unknown,
  object2: unknown,
  keys: readonly string[],
): boolean {
  const table1 = object1 as LuaMap<AnyNotNil, unknown>;
  const table2 = object2 as LuaMap<AnyNotNil, unknown>;

  return keys.every((key) => table1.get(key) === table2.get(key));
}
