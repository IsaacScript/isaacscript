import {
  CollectibleType,
  EntityType,
  GridEntityType,
  LevelStage,
  TrinketType,
} from "isaac-typescript-definitions";
import { removeEntities } from "../../functions/entities";
import { getNPCs } from "../../functions/entitiesSpecific";
import { removeGridEntity } from "../../functions/gridEntities";
import {
  getCoins,
  getCollectibles,
  getTrinkets,
} from "../../functions/pickupsSpecific";
import { calculateStageType } from "../../functions/stage";
import { vectorEquals } from "../../functions/vector";
import { CustomStage } from "../../interfaces/private/CustomStage";
import { isCustomGridEntity } from "../customGridEntity";
import {
  spawnCustomTrapdoor,
  spawnCustomTrapdoorToVanilla,
} from "../customTrapdoor/exports";
import { DEFAULT_BASE_STAGE } from "./exports";
import v from "./v";

/** For `GridEntityType.DECORATION` (1) */
export function setCustomDecorationGraphics(
  customStage: CustomStage,
  gridEntity: GridEntity,
): void {
  // If the end-user did not specify custom decoration graphics, default to Basement graphics. (We
  // don't have to adjust anything for this case.)
  if (customStage.decorationsPNGPath === undefined) {
    return;
  }

  if (isCustomGridEntity(gridEntity)) {
    return;
  }

  const gridEntityType = gridEntity.GetType();
  if (gridEntityType !== GridEntityType.DECORATION) {
    return;
  }

  const sprite = gridEntity.GetSprite();
  const fileName = sprite.GetFilename();
  // On Windows, this is: gfx/grid/Props_01_Basement.anm2
  if (fileName.toLowerCase() === "gfx/grid/props_01_basement.anm2") {
    sprite.ReplaceSpritesheet(0, customStage.decorationsPNGPath);
    sprite.LoadGraphics();
  }
}

/** For `GridEntityType.ROCK` (2) */
export function setCustomRockGraphics(
  customStage: CustomStage,
  gridEntity: GridEntity,
): void {
  // If the end-user did not specify custom rock graphics, default to Basement graphics. (We don't
  // have to adjust anything for this case.)
  if (customStage.rocksPNGPath === undefined) {
    return;
  }

  if (isCustomGridEntity(gridEntity)) {
    return;
  }

  const gridEntityRock = gridEntity.ToRock();
  if (gridEntityRock === undefined) {
    return;
  }

  const sprite = gridEntity.GetSprite();
  const fileName = sprite.GetFilename();
  if (fileName === "gfx/grid/grid_rock.anm2") {
    sprite.ReplaceSpritesheet(0, customStage.rocksPNGPath);
    sprite.LoadGraphics();
  } else if (fileName === "gfx/grid/grid_pit.anm2") {
    sprite.ReplaceSpritesheet(1, customStage.rocksPNGPath);
    sprite.LoadGraphics();
  }
}

/** For `GridEntityType.PIT` (7) */
export function setCustomPitGraphics(
  customStage: CustomStage,
  gridEntity: GridEntity,
): void {
  // If the end-user did not specify custom pit graphics, default to Basement graphics. (We don't
  // have to adjust anything for this case.)
  if (customStage.pitsPNGPath === undefined) {
    return;
  }

  if (isCustomGridEntity(gridEntity)) {
    return;
  }

  const gridEntityPit = gridEntity.ToPit();
  if (gridEntityPit === undefined) {
    return;
  }

  const sprite = gridEntity.GetSprite();
  const fileName = sprite.GetFilename();
  if (fileName === "gfx/grid/grid_pit.anm2") {
    sprite.ReplaceSpritesheet(0, customStage.pitsPNGPath);
    sprite.LoadGraphics();
  }
}

/** For GridEntityType.DOOR (16) */
export function setCustomDoorGraphics(
  customStage: CustomStage,
  gridEntity: GridEntity,
): void {
  // If the end-user did not specify custom pit graphics, default to Basement graphics. (We don't
  // have to adjust anything for this case.)
  if (customStage.doorPNGPaths === undefined) {
    return;
  }

  if (isCustomGridEntity(gridEntity)) {
    return;
  }

  const gridEntityDoor = gridEntity.ToDoor();
  if (gridEntityDoor === undefined) {
    return;
  }

  const sprite = gridEntity.GetSprite();
  const fileName = sprite.GetFilename();
  const doorPNGPath = getNewDoorPNGPath(customStage, fileName);
  if (doorPNGPath !== undefined) {
    sprite.ReplaceSpritesheet(0, doorPNGPath);
    sprite.LoadGraphics();
  }
}

function getNewDoorPNGPath(
  customStage: CustomStage,
  fileName: string,
): string | undefined {
  switch (fileName) {
    case "gfx/grid/door_01_normaldoor.anm2": {
      return customStage.doorPNGPaths?.normal;
    }

    case "gfx/grid/door_02_treasureroomdoor.anm2": {
      return customStage.doorPNGPaths?.treasureRoom;
    }

    case "gfx/grid/door_03_ambushroomdoor.anm2": {
      return customStage.doorPNGPaths?.normalChallengeRoom;
    }

    case "gfx/grid/door_04_selfsacrificeroomdoor.anm2": {
      return customStage.doorPNGPaths?.curseRoom;
    }

    case "gfx/grid/door_05_arcaderoomdoor.anm2": {
      return customStage.doorPNGPaths?.arcade;
    }

    case "gfx/grid/door_07_devilroomdoor.anm2": {
      return customStage.doorPNGPaths?.devilRoom;
    }

    case "gfx/grid/door_07_holyroomdoor.anm2": {
      return customStage.doorPNGPaths?.angelRoom;
    }

    case "gfx/grid/door_08_holeinwall.anm2": {
      return customStage.doorPNGPaths?.secretRoom;
    }

    case "gfx/grid/door_09_bossambushroomdoor.anm2": {
      return customStage.doorPNGPaths?.bossChallengeRoom;
    }

    case "gfx/grid/door_10_bossroomdoor.anm2": {
      return customStage.doorPNGPaths?.bossRoom;
    }

    case "gfx/grid/door_15_bossrushdoor.anm2": {
      return customStage.doorPNGPaths?.bossRush;
    }
  }

  return undefined;
}

export function convertVanillaTrapdoors(
  customStage: CustomStage,
  gridEntity: GridEntity,
): void {
  const gridEntityType = gridEntity.GetType();
  if (gridEntityType !== GridEntityType.TRAPDOOR) {
    return;
  }

  removeGridEntity(gridEntity, true);

  if (v.run.firstFloor) {
    // If we are on the first floor of a custom stage, then the destination will be the second floor
    // of the custom stage. (e.g. Caves 1 to Caves 2)
    spawnCustomTrapdoor(gridEntity.Position, customStage.name, 2);
  } else {
    // If we are on the second floor of a custom stage, then the destination will be the vanilla
    // floor equivalent to 2 floors after the floor used as a basis for the custom stage.
    const baseStage =
      customStage.baseStage === undefined
        ? DEFAULT_BASE_STAGE
        : customStage.baseStage;
    const stage = (baseStage + 2) as LevelStage;
    const stageType = calculateStageType(stage);

    spawnCustomTrapdoorToVanilla(gridEntity.Position, stage, stageType);
  }
}

/**
 * The rewards are based on the ones from the wiki:
 * https://bindingofisaacrebirth.fandom.com/wiki/Rocks#Urns
 *
 * On the bugged stage of -1, only urns will spawn, so we do not have to handle the case of mushroom
 * rewards, skull rewards, and so on.
 */
export function removeUrnRewards(
  customStage: CustomStage,
  gridEntity: GridEntity,
): void {
  // Assume that if the end-user does not have custom rock graphics specified, they want to keep the
  // vanilla urn reward functionality.
  if (customStage.rocksPNGPath === undefined) {
    return;
  }

  // Coins
  const coins = getCoins();
  removeEntitiesSpawnedFromGridEntity(coins, gridEntity);

  // A Quarter
  const quarters = getCollectibles(CollectibleType.QUARTER);
  removeEntitiesSpawnedFromGridEntity(quarters, gridEntity);

  // Swallowed Penny
  const swallowedPennies = getTrinkets(TrinketType.SWALLOWED_PENNY);
  removeEntitiesSpawnedFromGridEntity(swallowedPennies, gridEntity);

  // Spiders
  const spiders = getNPCs(EntityType.SPIDER);
  removeEntitiesSpawnedFromGridEntity(spiders, gridEntity);
}

function removeEntitiesSpawnedFromGridEntity(
  entities: Entity[],
  gridEntity: GridEntity,
) {
  const entitiesFromGridEntity = entities.filter(
    (entity) =>
      entity.FrameCount === 0 &&
      vectorEquals(entity.Position, gridEntity.Position),
  );
  removeEntities(entitiesFromGridEntity);
}
