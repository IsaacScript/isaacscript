import {
  CollectibleType,
  EntityType,
  TrinketType,
} from "isaac-typescript-definitions";
import { DecorationVariant } from "../../enums/DecorationVariant";
import { removeEntities } from "../../functions/entity";
import { getNPCs } from "../../functions/entitySpecific";
import {
  getCoins,
  getCollectibles,
  getTrinkets,
} from "../../functions/pickups";
import { vectorEquals } from "../../functions/vector";
import { CustomStage } from "../../interfaces/CustomStage";

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

  // Ignore custom grid entities. (They are represented as decorations with a non-zero variant.)
  const variant = gridEntity.GetVariant();
  if (variant !== (DecorationVariant.VANILLA_DECORATION as int)) {
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

  const sprite = gridEntity.GetSprite();
  const fileName = sprite.GetFilename();
  if (fileName === "gfx/grid/grid_pit.anm2") {
    sprite.ReplaceSpritesheet(0, customStage.pitsPNGPath);
    sprite.LoadGraphics();
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

  // Spiders
  const spiders = getNPCs(EntityType.SPIDER);
  removeEntitiesSpawnedFromGridEntity(spiders, gridEntity);

  // Coins
  const coins = getCoins();
  removeEntitiesSpawnedFromGridEntity(coins, gridEntity);

  // A Quarter
  const quarters = getCollectibles(CollectibleType.QUARTER);
  removeEntitiesSpawnedFromGridEntity(quarters, gridEntity);

  // Swallowed Penny
  const swallowedPennies = getTrinkets(TrinketType.SWALLOWED_PENNY);
  removeEntitiesSpawnedFromGridEntity(swallowedPennies, gridEntity);
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
