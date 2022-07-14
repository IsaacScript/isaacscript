import { getEntityID } from "../../functions/entity";
import { getGridEntityID } from "../../functions/gridEntity";

let debugDisplayEnabled = false;

export function setDebugDisplayEnabled(): void {
  debugDisplayEnabled = true;
}

export function errorIfDebugDisplayNotInitialized(): void {
  if (!debugDisplayEnabled) {
    error(
      'The "debugDisplay" feature is not initialized. You must run the "enableExtraConsoleCommands" function once at the beginning of your mod in order for this feature to work.',
    );
  }
}

const v = {
  run: {
    player: false, // 1
    tear: false, // 2
    familiar: false, // 3
    bomb: false, // 4
    pickup: false, // 5
    slot: false, // 6
    laser: false, // 7
    knife: false, // 8
    projectile: false, // 9
    effect: false, // 1000
    npc: false,

    rock: false, // 2, 3, 4, 5, 6, 22, 24, 25, 26, 27
    pit: false, // 7
    spikes: false, // 8, 9
    tnt: false, // 12
    poop: false, // 14
    door: false, // 16
    pressurePlate: false, // 20
  },
};
export default v;

export const debugDisplayTextCallbacks = {
  player: defaultEntityDisplayCallback as (player: EntityPlayer) => string, // 1
  tear: defaultEntityDisplayCallback as (tear: EntityTear) => string, // 2
  familiar: defaultEntityDisplayCallback as (
    familiar: EntityFamiliar,
  ) => string, // 3
  bomb: defaultEntityDisplayCallback as (bomb: EntityBomb) => string, // 4
  pickup: defaultEntityDisplayCallback as (pickup: EntityPickup) => string, // 5
  slot: defaultEntityDisplayCallback as (familiar: Entity) => string, // 6
  laser: defaultEntityDisplayCallback as (laser: EntityLaser) => string, // 7
  knife: defaultEntityDisplayCallback as (knife: EntityKnife) => string, // 8
  projectile: defaultEntityDisplayCallback as (
    projectile: EntityProjectile,
  ) => string, // 9
  effect: defaultEntityDisplayCallback as (effect: EntityEffect) => string, // 1000
  npc: defaultEntityDisplayCallback as (effect: EntityNPC) => string,

  rock: defaultGridEntityDisplayCallback as (rock: GridEntityRock) => string, // 2, 3, 4, 5, 6, 22, 24, 25, 26, 27
  pit: defaultGridEntityDisplayCallback as (pit: GridEntityPit) => string, // 7
  spikes: defaultGridEntityDisplayCallback as (
    spikes: GridEntitySpikes,
  ) => string, // 8, 9
  tnt: defaultGridEntityDisplayCallback as (tnt: GridEntityTNT) => string, // 12
  poop: defaultGridEntityDisplayCallback as (poop: GridEntityPoop) => string, // 14
  door: defaultGridEntityDisplayCallback as (door: GridEntityDoor) => string, // 16
  pressurePlate: defaultGridEntityDisplayCallback as (
    pressurePlate: GridEntityPressurePlate,
  ) => string, // 20
};

function defaultEntityDisplayCallback(entity: Entity) {
  return getEntityID(entity);
}

function defaultGridEntityDisplayCallback(gridEntity: GridEntity) {
  return getGridEntityID(gridEntity);
}
