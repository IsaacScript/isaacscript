import { GridEntityType, LevelStage } from "isaac-typescript-definitions";
import { removeGridEntity } from "../../../../functions/gridEntities";
import { calculateStageType } from "../../../../functions/stage";
import { removeCharactersBefore } from "../../../../functions/string";
import type { CustomStage } from "../../../../interfaces/private/CustomStage";
import type { CustomTrapdoors } from "../CustomTrapdoors";
import { DEFAULT_BASE_STAGE } from "./constants";

/** For `GridEntityType.DECORATION` (1). */
export function setCustomDecorationGraphics(
  customStage: CustomStage,
  gridEntity: GridEntity,
): void {
  // If the end-user did not specify custom decoration graphics, default to Basement graphics. (We
  // don't have to adjust anything for this case.)
  if (
    customStage.decorationsPNGPath === undefined &&
    customStage.decorationsANM2Path === undefined
  ) {
    return;
  }

  const gridEntityType = gridEntity.GetType();
  if (gridEntityType !== GridEntityType.DECORATION) {
    return;
  }

  const sprite = gridEntity.GetSprite();
  const fileName = sprite.GetFilename();
  // On Windows, this is: gfx/grid/Props_01_Basement.anm2
  if (fileName.toLowerCase() !== "gfx/grid/props_01_basement.anm2") {
    return;
  }

  if (customStage.decorationsANM2Path !== undefined) {
    const anm2Path = removeCharactersBefore(
      customStage.decorationsANM2Path,
      "gfx/",
    );
    sprite.Load(anm2Path, true);
  } else if (customStage.decorationsPNGPath !== undefined) {
    const pngPath = removeCharactersBefore(
      customStage.decorationsPNGPath,
      "gfx/",
    );
    sprite.ReplaceSpritesheet(0, pngPath);
    sprite.LoadGraphics();
  }
}

/** For `GridEntityType.ROCK` (2). */
export function setCustomRockGraphics(
  customStage: CustomStage,
  gridEntity: GridEntity,
): void {
  // If the end-user did not specify custom rock graphics, default to Basement graphics. (We don't
  // have to adjust anything for this case.)
  if (
    customStage.rocksPNGPath === undefined &&
    customStage.rocksANM2Path === undefined
  ) {
    return;
  }

  const gridEntityRock = gridEntity.ToRock();
  if (gridEntityRock === undefined) {
    return;
  }

  const sprite = gridEntity.GetSprite();
  const fileName = sprite.GetFilename();

  switch (fileName) {
    case "gfx/grid/grid_rock.anm2": {
      // The normal case of a rock.
      if (customStage.rocksANM2Path !== undefined) {
        const anm2Path = removeCharactersBefore(
          customStage.rocksANM2Path,
          "gfx/",
        );
        sprite.Load(anm2Path, true);
      } else if (customStage.rocksPNGPath !== undefined) {
        const pngPath = removeCharactersBefore(
          customStage.rocksPNGPath,
          "gfx/",
        );
        sprite.ReplaceSpritesheet(0, pngPath);
        sprite.LoadGraphics();
      }

      break;
    }

    case "gfx/grid/grid_pit.anm2": {
      // The case of when a rock is blown on a pit to make a bridge.
      if (customStage.rocksPNGPath !== undefined) {
        const pngPath = removeCharactersBefore(
          customStage.rocksPNGPath,
          "gfx/",
        );
        sprite.ReplaceSpritesheet(1, pngPath);
        sprite.LoadGraphics();
      }

      break;
    }

    default: {
      break;
    }
  }
}

/** For `GridEntityType.PIT` (7). */
export function setCustomPitGraphics(
  customStage: CustomStage,
  gridEntity: GridEntity,
): void {
  // If the end-user did not specify custom pit graphics, default to Basement graphics. (We don't
  // have to adjust anything for this case.)
  if (customStage.pitsPNGPath === undefined) {
    return;
  }

  const pngPath = removeCharactersBefore(customStage.pitsPNGPath, "gfx/");

  const gridEntityPit = gridEntity.ToPit();
  if (gridEntityPit === undefined) {
    return;
  }

  const sprite = gridEntity.GetSprite();
  const fileName = sprite.GetFilename();
  if (fileName === "gfx/grid/grid_pit.anm2") {
    sprite.ReplaceSpritesheet(0, pngPath);
    sprite.LoadGraphics();
  }
}

/** For `GridEntityType.DOOR` (16). */
export function setCustomDoorGraphics(
  customStage: CustomStage,
  gridEntity: GridEntity,
): void {
  // If the end-user did not specify custom pit graphics, default to Basement graphics. (We don't
  // have to adjust anything for this case.)
  if (customStage.doorPNGPaths === undefined) {
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
    const fixedPath = removeCharactersBefore(doorPNGPath, "gfx/");
    sprite.ReplaceSpritesheet(0, fixedPath);
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

    default: {
      return undefined;
    }
  }
}

export function convertVanillaTrapdoors(
  customStage: CustomStage,
  gridEntity: GridEntity,
  isFirstFloor: boolean,
  customTrapdoors: CustomTrapdoors,
): void {
  const gridEntityType = gridEntity.GetType();
  if (gridEntityType !== GridEntityType.TRAPDOOR) {
    return;
  }

  removeGridEntity(gridEntity, true);

  if (isFirstFloor) {
    // If we are on the first floor of a custom stage, then the destination will be the second floor
    // of the custom stage. (e.g. Caves 1 to Caves 2)
    customTrapdoors.spawnCustomTrapdoor(
      gridEntity.Position,
      customStage.name,
      LevelStage.BASEMENT_2,
    );
  } else {
    // If we are on the second floor of a custom stage, then the destination will be the vanilla
    // floor equivalent to 2 floors after the floor used as a basis for the custom stage.
    const baseStage = customStage.baseStage ?? DEFAULT_BASE_STAGE;
    const destinationStage = (baseStage + 2) as LevelStage;
    const destinationStageType = calculateStageType(destinationStage);

    customTrapdoors.spawnCustomTrapdoor(
      gridEntity.Position,
      undefined,
      destinationStage,
      destinationStageType,
    );
  }
}
