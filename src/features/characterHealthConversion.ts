import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { isRedHeart } from "../functions/pickups";
import { ensureAllCases } from "../functions/utils";

const FEATURE_NAME = "character health manager";

type ConversionHeartSubType =
  | HeartSubType.HEART_SOUL
  | HeartSubType.HEART_BLACK;

const characterHealthReplacementMap = new Map<
  PlayerType,
  ConversionHeartSubType
>();

/** @internal */
export function characterStatsInit(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_PEFFECT_UPDATE, postPEffectUpdate); // 4
  mod.AddCallback(
    ModCallbacks.MC_PRE_PICKUP_COLLISION,
    prePickupCollisionHeart,
    PickupVariant.PICKUP_HEART,
  ); // 38
}

// ModCallbacks.MC_POST_PEFFECT_UPDATE (4)
function postPEffectUpdate(player: EntityPlayer) {
  const character = player.GetPlayerType();
  const conversionHeartSubType = characterHealthReplacementMap.get(character);
  if (conversionHeartSubType === undefined) {
    return;
  }

  convertRedHeartContainers(player, conversionHeartSubType);
  removeRedHearts(player);
}

function convertRedHeartContainers(
  player: EntityPlayer,
  heartSubType: ConversionHeartSubType,
) {
  const maxHearts = player.GetMaxHearts();
  if (maxHearts === 0) {
    return;
  }

  player.AddMaxHearts(maxHearts * -1, false);

  switch (heartSubType) {
    case HeartSubType.HEART_SOUL: {
      player.AddSoulHearts(maxHearts);
      return;
    }

    case HeartSubType.HEART_BLACK: {
      player.AddBlackHearts(maxHearts);
      return;
    }

    default: {
      ensureAllCases(heartSubType);
    }
  }
}

/**
 * We also have to check for normal red hearts, so that the player is not able to fill bone hearts
 * (by e.g. picking up a healing item like Breakfast).
 */
function removeRedHearts(player: EntityPlayer) {
  const hearts = player.GetHearts();
  if (hearts > 0) {
    player.AddHearts(hearts * -1);
  }
}

// ModCallbacks.MC_PRE_PICKUP_COLLISION (38)
// PickupVariant.PICKUP_HEART (10)
function prePickupCollisionHeart(pickup: EntityPickup, collider: Entity) {
  if (!isRedHeart(pickup)) {
    return undefined;
  }

  const player = collider.ToPlayer();
  if (player === undefined) {
    return undefined;
  }

  const character = player.GetPlayerType();
  const conversionHeartSubType = characterHealthReplacementMap.get(character);
  if (conversionHeartSubType === undefined) {
    return undefined;
  }

  // Prevent internal code from running, which will prevent the player from picking up the heart,
  // but will still allow the heart to bounce off of the player
  return false;
}

/**
 * Helper function to make a character that has the same health mechanic as Blue Baby (red heart
 * containers --> soul hearts) or Dark Judas (red heart containers --> black hearts).
 *
 * Call this function once at the beginning of your mod to declare the health conversion type.
 */
export function registerCharacterHealthConversion(
  playerType: PlayerType | int,
  conversionHeartSubType: ConversionHeartSubType,
): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  characterHealthReplacementMap.set(playerType, conversionHeartSubType);
}
