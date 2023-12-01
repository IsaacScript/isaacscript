import {
  EntityFlag,
  EntityType,
  ProjectilesMode,
} from "isaac-typescript-definitions";
import { getFilteredNewEntities } from "./entities";
import { getProjectiles, spawnNPC } from "./entitiesSpecific";

/**
 * Helper function to make an NPC fire one or more projectiles. Returns the fired projectile(s).
 *
 * Use this function instead of the `EntityNPC.FireProjectiles` method if you need to modify or
 * access the `EntityProjectile` objects after they are fired, since this function returns the
 * objects in an array.
 *
 * @param npc The NPC to fire the projectile(s) from. You can also pass undefined if you do not want
 *            the projectile(s) to come from anything in particular.
 * @param position The staring position of the projectile(s).
 * @param velocity The starting velocity of the projectile(s).
 * @param projectilesMode Optional. The mode of the projectile(s). Default is
 *                        `ProjectilesMode.ONE_PROJECTILE`.
 * @param projectileParams Optional. The parameters of the projectile(s). Default is
 *                         `ProjectileParams()`.
 * @returns The fired projectile(s).
 */
export function fireProjectiles(
  npc: EntityNPC | undefined,
  position: Vector,
  velocity: Vector,
  projectilesMode: ProjectilesMode = ProjectilesMode.ONE_PROJECTILE,
  projectileParams: ProjectileParams = ProjectileParams(),
): readonly EntityProjectile[] {
  const oldProjectiles = getProjectiles(projectileParams.Variant);

  let spawnedFly = false;
  if (npc === undefined) {
    // Since the `EntityNPC.FireProjectiles` method is not static, we arbitrarily spawn a fly.
    spawnedFly = true;
    npc = spawnNPC(EntityType.FLY, 0, 0, position);
    npc.Visible = false;
    npc.ClearEntityFlags(EntityFlag.APPEAR);
  }

  npc.FireProjectiles(position, velocity, projectilesMode, projectileParams);
  const newProjectiles = getProjectiles(projectileParams.Variant);

  if (spawnedFly) {
    npc.Remove();
  }

  return getFilteredNewEntities(oldProjectiles, newProjectiles);
}

/**
 * Helper function to spawn projectiles in a circle around a position. Under the hood, this
 * leverages `ProjectileMode.N_PROJECTILES_IN_CIRCLE`.
 *
 * @param npc The NPC to fire the projectile(s) from. You can also pass undefined if you do not want
 *            the projectile(s) to come from anything in particular.
 * @param position The staring position of the projectile(s).
 * @param speed The speed of the projectile(s).
 * @param numProjectiles The amount of projectiles to spawn.
 * @returns The fired projectile(s).
 */
export function fireProjectilesInCircle(
  npc: EntityNPC | undefined,
  position: Vector,
  speed: float,
  numProjectiles: int,
): readonly EntityProjectile[] {
  const velocity = Vector(speed, numProjectiles);
  return fireProjectiles(
    npc,
    position,
    velocity,
    ProjectilesMode.N_PROJECTILES_IN_CIRCLE,
  );
}
