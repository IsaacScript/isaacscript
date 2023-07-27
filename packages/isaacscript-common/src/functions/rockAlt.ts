import {
  CollectibleType,
  EntityType,
  TrinketType,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import type { RockAltType } from "../enums/RockAltType";
import { BACKDROP_TYPE_TO_ROCK_ALT_TYPE } from "../objects/backdropTypeToRockAltType";
import { getNPCs } from "./entitiesSpecific";
import { removeEntitiesSpawnedFromGridEntity } from "./gridEntities";
import { getCoins, getCollectibles, getTrinkets } from "./pickupsSpecific";

/**
 * Helper function to get the alternate rock type (i.e. urn, mushroom, etc.) that the current room
 * will have.
 *
 * The rock type is based on the backdrop of the room.
 *
 * For example, if you change the backdrop of the starting room of the run to `BackdropType.CAVES`,
 * and then spawn `GridEntityType.ROCK_ALT`, it will be a mushroom instead of an urn. Additionally,
 * if it is destroyed, it will generate mushroom-appropriate rewards.
 *
 * On the other hand, if an urn is spawned first before the backdrop is changed to
 * `BackdropType.CAVES`, the graphic of the urn will not switch to a mushroom. However, when
 * destroyed, the urn will still generate mushroom-appropriate rewards.
 */
export function getRockAltType(): RockAltType {
  const room = game.GetRoom();
  const backdropType = room.GetBackdropType();

  return BACKDROP_TYPE_TO_ROCK_ALT_TYPE[backdropType];
}

/**
 * Helper function to remove all coins, trinkets, and so on that spawned from breaking an urn.
 *
 * The rewards are based on the ones from the wiki:
 * https://bindingofisaacrebirth.fandom.com/wiki/Rocks#Urns
 */
export function removeUrnRewards(gridEntity: GridEntity): void {
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
